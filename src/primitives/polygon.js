import {
	BufferAttribute,
	BufferGeometry,
	DoubleSide,
	Mesh,
	RawShaderMaterial,
	Vector3
} from '../../vendors/three.js';

import earcut from '../../vendors/earcut.js';

import { getPopulatedCoordinateBuffer } from '../bufferUtils.js';
import { scaleCoordinate } from '../coordinateUtils.js';

// Get the unit normal vector from the 1st, 2nd and last coordinate
// (these numbers were choosen because the vectors 1st->2nd and last->2nd
// have different directions, what is necessary for some calculations)
// Note: a "better" way to do this is compute an approximation plane
// by taking linear least squares, but that would be way slower and
// there would be only difference for very specific polygons.
// (see https://en.wikipedia.org/wiki/Linear_least_squares)
function getNormalVector(coordinates, extent) {
	const vectorA = new Vector3(
		...coordinates[0][0] ?? scaleCoordinate(coordinates[0][1], extent)
	);
	const vectorB = new Vector3(
		...coordinates[1][0] ?? scaleCoordinate(coordinates[1][1], extent)
	);
	const vectorC = new Vector3(
		...coordinates[coordinates.length - 1][0] ?? scaleCoordinate(coordinates[coordinates.length - 1][1], extent)
	);

	// cross product of 2 vectors with different directions in the plane
	// (A - B) x (C - B)
	return vectorA.sub(vectorB).cross(vectorC.sub(vectorB)).normalize();
}

// Test if the coordinates are coplanar by checking if the distance
// of each coordinate to the plane is less than a threshold.
// We don't need to do `coordinate -= distance to the plane`
// because earcut returns the same indices for small differences.
// (the indices of different objects are the same if they have the same shape)
function isCoplanar(coordinates, extent) {
	// normal = ⟨A, B, C⟩
	const normalVector = getNormalVector(coordinates, extent);

	// P = ⟨a, b, c⟩
	const pointP = new Vector3(
		...coordinates[0][0] ?? scaleCoordinate(coordinates[0][1], extent)
	);

	// D = unit normal vector ⋅ P
	const D = normalVector.dot(pointP);

	const threshold = 1e-2;

	for (let i = 0; i < coordinates.length; i++) {
		const [x, y, z] = coordinates[i][0] ?? scaleCoordinate(coordinates[i][1], extent);

		// Given a point ⟨x, y, z⟩, the distance between the point
		// and the plane is: A x + B y + C z - D
		// We take the absolute value because the point can be under or
		// over the plane.
		if (Math.abs(normalVector.x * x + normalVector.y * y + normalVector.z * z - D) > threshold) {
			return false;
		}
	}

	return true;
}

// See the comments from primitives/index.js for more information about the
// shape of a primitive function.
// See https://reference.wolfram.com/language/ref/Polygon
// for the high-level description of what is being rendered.
export default function ({ color = [1, 1, 1], coords, opacity = 1 }, uniforms, extent) {
	let geometry;

	if (coords.length === 3) { // triangle
		geometry = new BufferGeometry().setAttribute(
			'position',
			new BufferAttribute(new Float32Array([
				...(coords[0][0] ?? scaleCoordinate(coords[0][1], extent)),
				...(coords[1][0] ?? scaleCoordinate(coords[1][1], extent)),
				...(coords[2][0] ?? scaleCoordinate(coords[2][1], extent))
			]), 3)
		);
	} else { // not a triangle
		if (isCoplanar(coords, extent)) {
			// We use earcut to "break" the polygon into multiple triangles.
			// We can't draw if we don't do it.
			// The problem is that earcut doesn't deals well with
			// coplanar polygons.
			// The good news is that it has a 2d mode.
			// The really good news is that if we pass just pass the x and y
			// values from the coordinates earcut returns the correct indices.

			const coordinates2d = new Float32Array(coords.length * 2);

			for (let i = 0; i < coords.length; i++) {
				coordinates2d[i * 2] = coords[i * 3];
				coordinates2d[i * 2 + 1] = coords[i * 3 + 1];
			}

			geometry = new BufferGeometry()
				.setAttribute(
					'position',
					new BufferAttribute(
						getPopulatedCoordinateBuffer(coords, extent),
						3
					)
				)
				.setIndex(earcut(coordinates2d, 2));
		} else {
			// We use earcut to "break" the polygon into multiple triangles. We can't draw if we don't do it.

			const coordinates = getPopulatedCoordinateBuffer(coords, extent);

			geometry = new BufferGeometry()
				.setAttribute(
					'position',
					new BufferAttribute(
						coordinates,
						3
					)
				)
				.setIndex(earcut(coordinates));
		}
	}

	return new Mesh(
		geometry,
		new RawShaderMaterial({
			side: DoubleSide,
			depthWrite: opacity === 1,
			transparent: opacity !== 1,
			uniforms,
			vertexShader: `#version 300 es
				precision mediump float;

				in vec3 normal;
				in vec3 position;

				uniform mat4 modelViewMatrix;
				uniform mat4 projectionMatrix;

				out vec3 vViewPosition;

				void main() {
					vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

					gl_Position = projectionMatrix * mvPosition;

					vViewPosition = -mvPosition.xyz;
				}
			`,
			fragmentShader: `#version 300 es
				precision mediump float;
		
				in vec3 vViewPosition;
				in vec3 vNormal;

				uniform vec3 ambientLightColor;
				uniform vec3 diffuse;
				uniform float opacity;
				
				out vec4 pc_fragColor;

				#define saturate(a) clamp(a, 0.0, 1.0)

				struct IncidentLight {
					vec3 color;
					vec3 direction;
				};

				${uniforms.directionalLights.value.length > 0 ? `
					uniform IncidentLight directionalLights[${uniforms.directionalLights.value.length}];
				` : ''}
				${uniforms.pointLights.value.length > 0 ? `
					struct PointLight {
						vec3 color;
						vec3 position;
					};

					uniform PointLight pointLights[${uniforms.pointLights.value.length}];

					void getPointLightInfo(const in PointLight pointLight, out IncidentLight light) {
						light.direction = normalize(pointLight.position + vViewPosition);
						light.color = pointLight.color;
					}
				` : ''}

				${uniforms.spotLights.value.length > 0 ? `
					struct SpotLight {
						vec3 color;
						float coneCos;
						vec3 direction;
						vec3 position;
					};

					uniform SpotLight spotLights[${uniforms.spotLights.value.length}];

					void getSpotLightInfo(const in SpotLight spotLight, out IncidentLight light) {
						light.direction = normalize(spotLight.position + vViewPosition);

						light.color = spotLight.color * max(smoothstep(spotLight.coneCos, spotLight.coneCos, dot(light.direction, spotLight.direction)), 0.0);
					}
				` : ''}

				void main() {
					vec3 reflectedLight = ambientLightColor;

					vec3 normal = normalize(cross(dFdx(vViewPosition), dFdy(vViewPosition)));

					IncidentLight directLight;

					${uniforms.directionalLights.value.length > 0 ? `
						for (int i = 0; i < ${uniforms.directionalLights.value.length}; i++) {
							reflectedLight += saturate(dot(normal, directionalLights[i].direction)) * directionalLights[i].color;
						}
					` : ''}
					${uniforms.pointLights.value.length > 0 ? `
						for (int i = 0; i < ${uniforms.pointLights.value.length}; i++) {
							getPointLightInfo(pointLights[i], directLight);
							reflectedLight += saturate(dot(normal, directLight.direction)) * directLight.color;
						}
					` : ''}
					${uniforms.spotLights.value.length > 0 ? `
						for (int i = 0; i < ${uniforms.spotLights.value.length}; i++) {
							getSpotLightInfo(spotLight, spotLights[i]);
							reflectedLight += saturate(dot(normal, directLight.direction)) * directLight.color;
						}
					` : ''}

					pc_fragColor = vec4(
						reflectedLight * vec3(${color[0]}, ${color[1]}, ${color[2]}),
						${opacity}
					);
				}
			`
		})
	);
}

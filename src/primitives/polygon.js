import {
	BufferAttribute,
	BufferGeometry,
	DoubleSide,
	Group,
	Mesh,
	Quaternion,
	RawShaderMaterial,
	ShaderMaterial,
	UniformsLib,
	Vector3
} from '../../vendors/three.js';

import {
	copyArray3IntoBuffer,
	getPopulatedCoordinateBuffer
} from '../bufferUtils.js';

import earcut from '../../vendors/earcut.js';
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
// This function also returns the normal because otherwise
// `getNormalVector` would be called twice.
// We don't need to do `coordinate = coordinate - Δ` because the
// converting function (applyQuaternion(...)) is just going to return a bit
// displaced 2d coordinate (what would also happen if we subtract Δ)
// (no errors appear if the coordinates are not perfectly coplanar)
// Note: Δ is the distance between the coordinate and the plane
function getCoplanarityAndNormal(coordinates, extent) {
	// normal = ⟨A, B, C⟩
	const normalVector = getNormalVector(coordinates, extent);

	// P = ⟨a, b, c⟩
	const pointP = new Vector3(
		...coordinates[0][0] ?? scaleCoordinate(coordinates[0][1], extent)
	);

	// D = unit normal ⋅ P
	const D = normalVector.dot(pointP);

	const threshold = 1e-2;

	for (let i = 0; i < coordinates.length; i++) {
		const [x, y, z] = coordinates[i][0] ?? scaleCoordinate(coordinates[i][1], extent);

		// Given a point P = ⟨x, y, z⟩, the distance between P and the plane is:
		// (A x + B y + C z - D) / normal vector length
		// normal vector length is 1 as the normal vector is a unit vector
		// We take the module because the point can be under and over the plane.
		if (Math.abs(normalVector.x * x + normalVector.y * y + normalVector.z * z - D) > threshold) {
			return [false, normalVector];
		}
	}

	return [true, normalVector];
}

// See https://reference.wolfram.com/language/ref/Polygon
// for the high-level description of what is being rendered.
export default function ({ color = [1, 1, 1], coords, edgeForm = {}, opacity = 1, vertexNormals = {} }, extent) {
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
		const [isCoplanar, normalVector] = getCoplanarityAndNormal(coords, extent);

		if (isCoplanar) {
			// We use earcut to "break" the polygon into multiple triangles.
			// We can't draw if we don't do it.
			// The problem is that earcut doesn't deals well with
			// coplanar polygons.
			// The good news is that it has a 2d mode, so we convert our 3d
			// coordinates into 2d by appling a quaternion.

			const quaternion = new Quaternion().setFromUnitVectors(
				normalVector,
				new Vector3(0, 0, 1) // z normal
			);

			const coordinates2d = new Float32Array(coords.length * 2);

			for (let i = 0; i < coords.length; i++) {
				const vector = new Vector3(
					coords[i * 3],
					coords[i * 3 + 1],
					coords[i * 3 + 2]
				).applyQuaternion(quaternion);

				coordinates2d[i * 2] = vector.x;
				coordinates2d[i * 2 + 1] = vector.y;
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

	// Contains elements from vertexNormals and NaNs for the other
	// elements if normals.length > vertexNormals.length
	// When the value is NaN, it is going to be re-calculated
	// in the vertex shader (we can't do it here because each pixel
	// may have a different normal value).
	const normals = new Float32Array(geometry.attributes.position.count * 3);

	for (let i = 0; i < normals.length / 3; i++) {
		copyArray3IntoBuffer(
			normals,
			vertexNormals[i] ?? [NaN, NaN, NaN],
			i
		);
	}

	geometry.setAttribute('normal', new BufferAttribute(normals, 3));

	const polygon = new Mesh(
		geometry,
		new ShaderMaterial({
			lights: true,
			side: DoubleSide,
			depthWrite: opacity === 1,
			transparent: opacity !== 1,
			uniforms: {
				...UniformsLib.lights,
				diffuse: { value: color },
				opacity: { value: opacity }
			},
			vertexShader: `
				out vec3 vViewPosition;
				out vec3 vNormal;

				void main() {
					vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

					gl_Position = projectionMatrix * mvPosition;

					vViewPosition = -mvPosition.xyz;
					vNormal = normal;
				}
			`,
			fragmentShader: `
				in vec3 vViewPosition;
				in vec3 vNormal;

				uniform vec3 diffuse;
				uniform float opacity;
				uniform vec3 ambientLightColor;

				#define RECIPROCAL_PI 0.3183098861837907
				#define saturate(a) clamp(a, 0.0, 1.0)

				struct IncidentLight {
					vec3 color;
					vec3 direction;
				};

				#if NUM_DIR_LIGHTS > 0
					uniform IncidentLight directionalLights[NUM_DIR_LIGHTS];
				#endif
				#if NUM_POINT_LIGHTS > 0
					struct PointLight {
						vec3 color;
						vec3 position;
					};

					uniform PointLight pointLights[NUM_POINT_LIGHTS];

					void getPointLightInfo(const in PointLight pointLight, out IncidentLight light) {
						light.direction = normalize(pointLight.position + vViewPosition);
						light.color = pointLight.color;
					}
				#endif
				#if NUM_SPOT_LIGHTS > 0
					struct SpotLight {
						vec3 color;
						float coneCos;
						vec3 direction;
						vec3 position;
					};

					uniform SpotLight spotLights[NUM_SPOT_LIGHTS];

					void getSpotLightInfo(const in SpotLight spotLight, out IncidentLight light) {
						light.direction = normalize(spotLight.position + vViewPosition);
						light.color = spotLight.color * max(smoothstep(spotLight.coneCos, spotLight.coneCos, dot(light.direction, spotLight.direction)), 0.0);
					}
				#endif

				vec3 RE_Direct(const in IncidentLight directLight, const in vec3 normal) {
					float dotNL = saturate(dot(normal, directLight.direction));

					return dotNL * directLight.color * RECIPROCAL_PI * diffuse;
				}

				void main() {
					// If x is NaN, then y and z are also NaN.
					vec3 normal = isnan(vNormal.x) ? normalize(cross(dFdx(vViewPosition), dFdy(vViewPosition))) : vNormal;

					vec3 reflectedLight = vec3(0.0);

					IncidentLight directLight;

					#if NUM_DIR_LIGHTS > 0
						for (int i = 0; i < NUM_DIR_LIGHTS; i++) {
							reflectedLight += RE_Direct(directionalLights[i], normal);
						}
					#endif
					#if NUM_POINT_LIGHTS > 0
						for (int i = 0; i < NUM_POINT_LIGHTS; i++) {
							getPointLightInfo(pointLights[i], directLight);
							reflectedLight += RE_Direct(directLight, normal);
						}
					#endif
					#if NUM_SPOT_LIGHTS > 0
						for (int i = 0; i < NUM_SPOT_LIGHTS; i++) {
							getSpotLightInfo(spotLight, spotLights[i]);
							reflectedLight += RE_Direct(directLight, normal);
						}
					#endif

					pc_fragColor = vec4(
						reflectedLight + ambientLightColor * diffuse * RECIPROCAL_PI,
						opacity
					);
				}
			`
		})
	);

	// Differently from cuboids and other primitives, the polygons
	// DON'T have edges by default.
	if (edgeForm.showEdges !== true) {
		// If the edges aren't shown the work is done.
		return polygon;
	}

	const group = new Group();

	group.add(polygon);

	// Differently from polyhedrons, polygons use a Mesh and a material
	// with "wirefram: true". This is slower than LineSegments, but
	// creating a new BufferGeometry is also slow and uses more RAM
	// (LineSegments don't support indexed BufferGeometries).
	group.add(new Mesh(
		geometry,
		new RawShaderMaterial({
			wireframe: true,
			uniforms: {
				color: { value: edgeForm.color ?? [0, 0, 0] }
			},
			vertexShader: `#version 300 es
				in vec3 position;

				uniform mat4 projectionMatrix;
				uniform mat4 modelViewMatrix;

				void main() {
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
				}
			`,
			fragmentShader: `#version 300 es
				uniform lowp vec3 color;

				out lowp vec4 pc_fragColor;

				void main() {
					pc_fragColor = vec4(color, 1.0);
				}
			`
		})
	));

	return group;
}

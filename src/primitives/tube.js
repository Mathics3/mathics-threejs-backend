import {
	Matrix4,
	Mesh,
	RawShaderMaterial,
	Vector3
} from '../../vendors/three.js';

import { scaleCoordinate } from '../coordinateUtils.js';
import { getCentripetalCurve } from '../curve.js';
import {
	mergeBufferGeometries,
	getSphereGeometry,
	getTubeGeometry
} from '../geometry.js';

// See the comments from primitives/index.js for more information about the
// shape of a primitive function.
// See https://reference.wolfram.com/language/ref/Tube.html
// for the high-level description of what is being rendered.
export default function ({ color = [1, 1, 1], coords, opacity = 1, radius = 1 }, uniforms, extent) {
	// We use getCentripetalCurve to convert an list of coordinates
	// into a continuous curve.
	// curve.getPoint receives a float between 0 and 1,
	// where 0 is the 1st coordinate and 1 is the last.
	const curve = getCentripetalCurve(coords, extent);

	const halfSphereGeometry = getSphereGeometry(radius, false, true);

	const geometries = [
		getTubeGeometry(radius, curve),
		// 1st end cap
		halfSphereGeometry
			.clone()
			.applyMatrix4(
				new Matrix4()
					.setPosition(curve.getPoint(0))
					// Rotate the end cap, so it "continues" the tube.
					// If it don't be done, there'll be a half sphere floating by there and a hollow tube.
					.lookAt(
						curve.getPoint(0), // eye
						new Vector3(...(coords[1][0] ?? scaleCoordinate(coords[1][1], extent))), // target
						new Vector3(1, 0, 0) // up
					)
			),
		// 2nd end cap, almost the same as above
		halfSphereGeometry
			// We don't need to clone the geometry here.
			.applyMatrix4(
				new Matrix4()
					.setPosition(curve.getPoint(1))
					.lookAt(
						curve.getPoint(1),
						new Vector3(...(coords[coords.length - 2][0] ?? scaleCoordinate(coords[coords.length - 2][1], extent))),
						new Vector3(1, 0, 0)
					)
			)
	];

	return new Mesh(
		mergeBufferGeometries(geometries),
		new RawShaderMaterial({
			transparent: opacity !== 1,
			depthWrite: opacity === 1,
			uniforms,
			vertexShader: `#version 300 es
				in vec3 normal;
				in vec3 position;

				uniform vec3 ambientLightColor;
				uniform mat4 modelViewMatrix;
				uniform mat3 normalMatrix;
				uniform mat4 projectionMatrix;

				out vec4 vColor;

				#define saturate(a) clamp(a, 0.0, 1.0)

				struct IncidentLight {
					vec3 color;
					vec3 direction;
				};

				struct GeometricContext {
					vec3 position;
					vec3 normal;
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

					void getPointLightInfo(const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light) {
						light.direction = normalize(spotLight.position - geometry.position);
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

					void getSpotLightInfo(const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light) {
						light.direction = normalize(spotLight.position - geometry.position);

						light.color = spotLight.color * max(smoothstep(spotLight.coneCos, spotLight.coneCos, dot(light.direction, spotLight.direction)), 0.0);
					}
				` : ''}

				void main() {
					vec4 mvPosition = modelViewMatrix * vec4(position, 1);

					gl_Position = projectionMatrix * mvPosition;

					GeometricContext geometry = GeometricContext(
						mvPosition.xyz,
						normalize(normalMatrix * normal)
					);

					vec3 light = ambientLightColor;

					IncidentLight directLight;

					${uniforms.directionalLights.value.length > 0 ? `
						for (int i = 0; i < ${uniforms.directionalLights.value.length}; i++) {
							light += saturate(dot(geometry.normal, directionalLights[i].direction)) * directionalLights[i].color;
						}
					` : ''}

					${uniforms.pointLights.value.length > 0 ? `
						for (int i = 0; i < ${uniforms.pointLights.value.length}; i++) {
							getPointLightInfo(pointLights[i], geometry, directLight);

							light += saturate(dot(geometry.normal, directLight.direction)) * directLight.color;
						}
					` : ''}

					${uniforms.spotLights.value.length > 0 ? `
						for (int i = 0; i < ${uniforms.spotLights.value.length}; i++) {
							getSpotLightInfo(spotLights[i], geometry, directLight);

							light += saturate(dot(geometry.normal, directLight.direction)) * directLight.color;
						}
					` : ''}

					vColor = vec4(light * vec3(${color[0]}, ${color[1]}, ${color[2]}), ${opacity});
				}
			`,
			fragmentShader: `#version 300 es
				in lowp vec4 vColor;

				out lowp vec4 pc_fragColor;

				void main() {
					pc_fragColor = vColor;
				}
			`
		})
	);
}

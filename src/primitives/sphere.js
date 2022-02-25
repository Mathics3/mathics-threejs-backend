import {
	InstancedBufferAttribute,
	Mesh,
	RawShaderMaterial
} from '../../vendors/three.js';

import { getPopulatedCoordinateBuffer } from '../bufferUtils.js';
import { getSphereGeometry } from '../geometry.js';

// See the comments from primitives/index.js for more information about the
// shape of a primitive function.
// See https://reference.wolfram.com/language/ref/Sphere
// for the high-level description of what is being rendered.
export default function ({ color = [1, 1, 1], coords, opacity = 1, radius = 1 }, uniforms, extent) {
	const sphereGeometry = getSphereGeometry(radius, true)
		// Set the spheres centers.
		.setAttribute(
			'sphereCenter',
			new InstancedBufferAttribute(
				getPopulatedCoordinateBuffer(coords, extent),
				3
			)
		);

	sphereGeometry.instanceCount = coords.length;

	const spheres = new Mesh(
		sphereGeometry,
		new RawShaderMaterial({
			transparent: opacity !== 1,
			depthWrite: opacity === 1,
			uniforms,
			vertexShader: `#version 300 es
				in vec3 normal;
				in vec3 position;
				in vec3 sphereCenter;

				uniform vec3 ambientLightColor;
				uniform vec3 diffuse;
				uniform float opacity;
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
						light.direction = normalize(pointLight.position - geometry.position);
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
					vec4 mvPosition = modelViewMatrix * vec4(position + sphereCenter, 1);

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

	spheres.frustumCulled = false;

	return spheres;
}

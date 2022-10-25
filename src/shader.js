// @ts-check

import { RawShaderMaterial } from '../vendors/three.js';

/**
 * Create a material with a shader that uses 2 attributes:
 * objectBegin and objectEnd.
 * In the case of the cones, objectEnd must be the cone tip.
 * @param {[number, number, number]} color
 * @param {number} opacity
 * @param {import('./uniforms.js').UniformsBuffer} uniforms
 * @returns the created material
 */
export function get2CoordinatesMaterial(color, opacity, uniforms) {
	return new RawShaderMaterial({
		transparent: opacity !== 1,
		depthWrite: opacity === 1,
		uniforms,
		vertexShader: `#version 300 es
			in vec3 objectBegin;
			in vec3 objectEnd;
			in vec3 normal;
			in vec3 position;

			uniform vec3 ambientLightColor;
			uniform mat3 normalMatrix;
			uniform mat4 projectionMatrix;
			uniform mat4 modelViewMatrix;

			out vec4 vColor;

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
			` : ''}

			${uniforms.spotLights.value.length > 0 ? `
				struct SpotLight {
					vec3 color;
					float coneCos;
					vec3 direction;
					vec3 position;
				};

				uniform SpotLight spotLights[${uniforms.spotLights.value.length}];
			` : ''}

			void main() {
				vec3 z = normalize(objectBegin - objectEnd);
				// if z.z is 0 the cylinder doesn't appear
				z.z += 0.0001;

				vec3 x = normalize(cross(vec3(0, 1, 0), z));
				vec3 y = cross(z, x);

				float height = distance(objectBegin, objectEnd);

				// position, rotate and scale the cylinder
				mat4 cylinderMatrix = mat4(
					x, 0,            // row 0
					y, 0,            // row 1
					z * height, 0,   // row 2
					objectBegin, 1 // row 3
				);

				vec4 mvPosition = modelViewMatrix * cylinderMatrix * vec4(position, 1);

				gl_Position = projectionMatrix * mvPosition;

				vec3 position = mvPosition.xyz;
				vec3 normal = normalize(normalMatrix * normal);

				vec3 light = ambientLightColor;

				${uniforms.directionalLights.value.length > 0 ? `
					for (int i = 0; i < ${uniforms.directionalLights.value.length}; i++) {
						light += saturate(dot(normal, directionalLights[i].direction)) * directionalLights[i].color;
					}
				` : ''}

				${uniforms.pointLights.value.length > 0 ? `
					for (int i = 0; i < ${uniforms.pointLights.value.length}; i++) {
						light += saturate(dot(
							normal,
							normalize(pointLights[i].position - position))
						) * pointLights[i].color;
					}
				` : ''}

				${uniforms.spotLights.value.length > 0 ? `
					vec3 direction;

					for (int i = 0; i < ${uniforms.spotLights.value.length}; i++) {
						direction = normalize(spotLights[i].position - position);

						light += saturate(dot(normal, direction))
						* spotLights[i].color
						* max(dot(direction, spotLights[i].direction), 0.0);
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
	});
}

/**
 * @param {[number, number, number]} color
 * @param {number} opacity
 * @returns a material that ignores lighting so have all pixels
 * of the same color.
 */
export function getBasicMaterial(color, opacity) {
	return new RawShaderMaterial({
		opacity,
		transparent: opacity !== 1,
		vertexShader: `#version 300 es
			in vec3 position;

			uniform mat4 projectionMatrix;
			uniform mat4 modelViewMatrix;

			void main() {
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
			}
		`,
		fragmentShader: `#version 300 es
			out lowp vec4 pc_fragColor;

			void main() {
				pc_fragColor = vec4(${color[0]}, ${color[1]}, ${color[2]}, ${opacity});
			}
		`
	});
}

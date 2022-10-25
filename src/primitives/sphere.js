// @ts-check

import {
	InstancedBufferAttribute,
	Mesh,
	RawShaderMaterial
} from '../../vendors/three.js';

import { getPopulatedCoordinateBuffer } from '../bufferUtils.js';
import { getSphereGeometry } from '../geometry.js';

/**
 * See {@link PrimitiveFunction} for more information about the
 * shape of a primitive function.
 * See {@link https://mathics3.github.io/mathics-threejs-backend/primitives/sphere}
 * for the high-level description of what is being rendered.
 * @type {import('./index.js').PrimitiveFunction}
 */
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

	// @ts-expect-error: InstancedBufferGeometry have that attribute
	sphereGeometry.instanceCount = coords.length;

	const spheres = new Mesh(
		sphereGeometry,
		// @ts-expect-error: bad three.js typing
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

				${uniforms.directionalLights.value.length > 0 ? `
					struct IncidentLight {
						vec3 color;
						vec3 direction;
					};

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
					vec4 mvPosition = modelViewMatrix * vec4(position + sphereCenter, 1);

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
							light += saturate(dot(normal, normalize(pointLights[i].position - position))) * pointLights[i].color;
						}
					` : ''}
					
					${uniforms.spotLights.value.length > 0 ? `
						vec3 direction;

						for (int i = 0; i < ${uniforms.spotLights.value.length}; i++) {
							direction = normalize(spotLights[i].position - position);

							light += saturate(dot(normal, direction))
							* spotLights[i].color
							* max(
								smoothstep(
									spotLights[i].coneCos,
									spotLights[i].coneCos,
									dot(direction, spotLights[i].direction)
								),
								0.0
							);
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

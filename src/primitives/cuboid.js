// @ts-check

import {
	BufferAttribute,
	InstancedBufferAttribute,
	InstancedBufferGeometry,
	Mesh,
	RawShaderMaterial
} from '../../vendors/three.js';

import { get2PopulatedCoordinateBuffers } from '../bufferUtils.js';

/**
 * See {@link PrimitiveFunction} for more information about the
 * shape of a primitive function.
 * See {@link https://mathics3.github.io/mathics-threejs-backend/primitives/cuboid}
 * for the high-level description of what is being rendered.
 * @type {import('./index.js').PrimitiveFunction}
 */
export default function ({ color = [1, 1, 1], coords, edgeForm = {}, opacity = 1 }, uniforms, extent) {
	// The edges of the cuboids are drawn in the fragment shader; doing this is faster than putting the edges in a different object.

	const [cuboidsBegin, cuboidsEnd] = get2PopulatedCoordinateBuffers(coords, extent);

	const cuboidGeometry = new InstancedBufferGeometry()
		.setAttribute(
			'position',
			new BufferAttribute(new Float32Array([
				1, 1, 1,
				1, 1, 0,
				1, 0, 1,
				1, 0, 0,
				0, 1, 0,
				0, 1, 1,
				0, 0, 0,
				0, 0, 1,
				0, 1, 0,
				1, 1, 0,
				0, 1, 1,
				1, 1, 1,
				0, 0, 1,
				1, 0, 1,
				0, 0, 0,
				1, 0, 0,
				0, 1, 1,
				1, 1, 1,
				0, 0, 1,
				1, 0, 1,
				1, 1, 0,
				0, 1, 0,
				1, 0, 0,
				0, 0, 0
			]), 3)
		)
		.setAttribute(
			'uv',
			new BufferAttribute(new Float32Array([
				0, 1,
				1, 1,
				0, 0,
				1, 0,
				0, 1,
				1, 1,
				0, 0,
				1, 0,
				0, 1,
				1, 1,
				0, 0,
				1, 0,
				0, 1,
				1, 1,
				0, 0,
				1, 0,
				0, 1,
				1, 1,
				0, 0,
				1, 0,
				0, 1,
				1, 1,
				0, 0,
				1, 0
			]), 2)
		)
		.setAttribute(
			'cuboidBegin',
			new InstancedBufferAttribute(cuboidsBegin, 3)
		)
		.setAttribute(
			'cuboidEnd',
			new InstancedBufferAttribute(cuboidsEnd, 3)
		)
		.setIndex([
			0, 2, 1,
			2, 3, 1,
			4, 6, 5,
			6, 7, 5,
			8, 10, 9,
			10, 11, 9,
			12, 14, 13,
			14, 15, 13,
			16, 18, 17,
			18, 19, 17,
			20, 22, 21,
			22, 23, 21
		]);

	cuboidGeometry.instanceCount = coords.length / 2;

	edgeForm.color ??= [0, 0, 0];

	const cuboids = new Mesh(
		cuboidGeometry,
		// @ts-expect-error: bad three.js typing
		new RawShaderMaterial({
			transparent: opacity !== 1,
			depthWrite: opacity === 1,
			uniforms,
			vertexShader: `#version 300 es
				precision mediump float;

				in vec3 cuboidBegin;
				in vec3 cuboidEnd;
				in vec3 position;
				in vec2 uv;

				uniform mat4 modelViewMatrix;
				uniform mat4 projectionMatrix;

				out vec2 vUv;
				out vec3 vViewPosition;

				void main() {
					// position and scale the cuboid
					mat4 cuboidMatrix = mat4(
						cuboidEnd.x - cuboidBegin.x, 0, 0, 0, // row 0
						0, cuboidEnd.y - cuboidBegin.y, 0, 0, // row 1
						0, 0, cuboidEnd.z - cuboidBegin.z, 0, // row 2
						cuboidBegin, 1                        // row 3
					);

					vec4 mvPosition = modelViewMatrix * cuboidMatrix * vec4(position, 1);

					gl_Position = projectionMatrix * mvPosition;

					vViewPosition = -mvPosition.xyz;
					vUv = uv;
				}
			`,
			fragmentShader: `#version 300 es
				precision mediump float;

				in vec3 position;
				in vec3 vViewPosition;
				in vec2 vUv;

				uniform vec3 ambientLightColor;

				out vec4 pc_fragColor;

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
					${(edgeForm.showEdges ?? true) ? `
						vec2 grid = abs(fract(vUv - 0.5) - 0.5) / fwidth(vUv);

						float factor = min(min(grid.x, grid.y), 1.0);

						vec3 edgeColor = vec3(${edgeForm.color[0]}, ${edgeForm.color[1]}, ${edgeForm.color[2]});

						vec3 diffuseColor = (vec3(${color[0]}, ${color[1]}, ${color[2]}) - edgeColor) * factor + edgeColor;
					` : `
						vec3 diffuseColor = vec3(${color[0]}, ${color[1]}, ${color[2]});
					`}

					vec3 normal = normalize(cross(dFdx(vViewPosition), dFdy(vViewPosition)));

					vec3 reflectedLight = ambientLightColor;

					${uniforms.directionalLights.value.length > 0 ? `
						for (int i = 0; i < ${uniforms.directionalLights.value.length}; i++) {
							reflectedLight += saturate(dot(normal, directionalLights[i].direction)) * directionalLights[i].color;
						}
					` : ''}
					${uniforms.pointLights.value.length > 0 ? `
						for (int i = 0; i < ${uniforms.pointLights.value.length}; i++) {
							reflectedLight += saturate(dot(
								normal,
								normalize(pointLights[i].position + vViewPosition))
							) * pointLights[i].color;
						}
					` : ''}
					${uniforms.spotLights.value.length > 0 ? `
						for (int i = 0; i < ${uniforms.spotLights.value.length}; i++) {
							float angleCos = dot(
								normalize(spotLights[i].position + vViewPosition),
								spotLights[i].direction
							);
	
							reflectedLight += saturate(dot(
								normal,
								normalize(spotLights[i].position + vViewPosition))
							) * spotLights[i].color * max(angleCos, 0.0);
						}
					` : ''}
	
					pc_fragColor = vec4(
						reflectedLight * diffuseColor,
						${opacity}
					);
				}
			`
		})
	);

	cuboids.frustumCulled = false;

	return cuboids;
}

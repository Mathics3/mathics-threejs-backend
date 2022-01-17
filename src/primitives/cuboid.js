import {
	BufferAttribute,
	InstancedBufferAttribute,
	InstancedBufferGeometry,
	Mesh,
	ShaderMaterial,
	UniformsLib
} from '../../vendors/three.js';

import { get2PopulatedCoordinateBuffers } from '../bufferUtils.js';

// See https://reference.wolfram.com/language/ref/Cuboid
// for the high-level description of what is being rendered.
export default function ({ color, coords, edgeForm = {}, opacity = 1 }, extent) {
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

	const cuboids = new Mesh(
		cuboidGeometry,
		new ShaderMaterial({
			transparent: opacity !== 1,
			depthWrite: opacity === 1,
			lights: true,
			uniforms: {
				...UniformsLib.lights,
				diffuse: { value: color },
				edgeColor: { value: edgeForm.color ?? [0, 0, 0] },
				opacity: { value: opacity },
				showEdges: { value: edgeForm.showEdges ?? true }
			},
			vertexShader: `
				in vec3 cuboidBegin;
				in vec3 cuboidEnd;

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
			fragmentShader: `
				in vec3 vViewPosition;
				in vec2 vUv;

				uniform vec3 diffuse;
				uniform vec3 edgeColor;
				uniform float opacity;
				uniform bool showEdges;
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
						light.color = pointLight.color + 1.0;
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

						float angleCos = dot(light.direction, spotLight.direction);

						if (angleCos > 0.0) {
							light.color = spotLight.color * angleCos + 1.0;
						} else {
							light.color = vec3(0.0);
						}
					}
				#endif

				vec3 RE_Direct(const in IncidentLight directLight, const in vec3 normal, const in vec3 diffuseColor) {
					float dotNL = saturate(dot(normal, directLight.direction));
					return dotNL * directLight.color * diffuseColor * RECIPROCAL_PI;
				}

				void main() {
					vec3 diffuseColor;

					if (showEdges) {
						vec2 grid = abs(fract(vUv - 0.5) - 0.5) / fwidth(vUv);

						float factor = min(min(grid.x, grid.y), 1.0);

						diffuseColor = (diffuse - edgeColor) * factor + edgeColor;
					} else {
						diffuseColor = diffuse;
					}

					vec3 normal = normalize(cross(dFdx(vViewPosition), dFdy(vViewPosition)));

					vec3 reflectedLight = vec3(0.0);

					IncidentLight directLight;

					#if NUM_DIR_LIGHTS > 0
						for (int i = 0; i < NUM_DIR_LIGHTS; i++) {
							reflectedLight += RE_Direct(directionalLights[i], normal, diffuseColor);
						}
					#endif
					#if NUM_POINT_LIGHTS > 0
						for (int i = 0; i < NUM_POINT_LIGHTS; i++) {
							getPointLightInfo(pointLights[i], directLight);
							reflectedLight += RE_Direct(directLight, normal, diffuseColor);
						}
					#endif
					#if NUM_SPOT_LIGHTS > 0
						for (int i = 0; i < NUM_SPOT_LIGHTS; i++) {
							getSpotLightInfo(spotLights[i], directLight);
							reflectedLight += RE_Direct(directLight, normal, diffuseColor);
						}
					#endif
	
					reflectedLight += ambientLightColor * diffuseColor * RECIPROCAL_PI;

					pc_fragColor = vec4(
						reflectedLight,
						opacity
					);
				}
			`
		})
	);

	cuboids.frustumCulled = false;

	return cuboids;
}

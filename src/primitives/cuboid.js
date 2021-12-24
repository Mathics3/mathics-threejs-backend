import {
	BoxGeometry,
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

	const cuboidGeometry = new InstancedBufferGeometry().copy(
		new BoxGeometry().translate(0.5, 0.5, 0.5), // translate the geometry so we don't need to calculate the middle of each coordinates-pair
	);

	cuboidGeometry.instanceCount = coords.length / 2;

	cuboidGeometry.setAttribute(
		'cuboidBegin',
		new InstancedBufferAttribute(cuboidsBegin, 3)
	);

	cuboidGeometry.setAttribute(
		'cuboidEnd',
		new InstancedBufferAttribute(cuboidsEnd, 3)
	);

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

				float getDistanceAttenuation(const in float lightDistance, const in float cutoffDistance, const in float decayExponent) {
					if (cutoffDistance > 0.0 && decayExponent > 0.0) {
						return pow(saturate(-lightDistance / cutoffDistance + 1.0), decayExponent);
					}
					return 1.0;
				}

				#if NUM_DIR_LIGHTS > 0
					struct DirectionalLight {
						vec3 direction;
						vec3 color;
					};

					uniform DirectionalLight directionalLights[NUM_DIR_LIGHTS];

					void getDirectionalLightInfo(const in DirectionalLight directionalLight, out IncidentLight light) {
						light.color = directionalLight.color;
						light.direction = directionalLight.direction;
					}
				#endif
				#if NUM_POINT_LIGHTS > 0
					struct PointLight {
						vec3 position;
						vec3 color;
						float distance;
						float decay;
					};

					uniform PointLight pointLights[NUM_POINT_LIGHTS];

					void getPointLightInfo(const in PointLight pointLight, out IncidentLight light) {
						vec3 lVector = pointLight.position + vViewPosition;

						light.direction = normalize(lVector);
						light.color = pointLight.color + getDistanceAttenuation(length(lVector), pointLight.distance, pointLight.decay);
					}
				#endif
				#if NUM_SPOT_LIGHTS > 0
					struct SpotLight {
						vec3 position;
						vec3 direction;
						vec3 color;
						float distance;
						float decay;
						float coneCos;
						float penumbraCos;
					};

					float getSpotAttenuation(const in float coneCosine, const in float penumbraCosine, const in float angleCosine) {
						return smoothstep(coneCosine, penumbraCosine, angleCosine);
					}

					uniform SpotLight spotLights[NUM_SPOT_LIGHTS];

					void getSpotLightInfo(const in SpotLight spotLight, out IncidentLight light) {
						vec3 lVector = spotLight.position + vViewPosition;
						light.direction = normalize(lVector);

						float angleCos = dot(light.direction, spotLight.direction);
						float spotAttenuation = getSpotAttenuation(spotLight.coneCos, spotLight.penumbraCos, angleCos);

						if (spotAttenuation > 0.0) {
							light.color = spotLight.color * spotAttenuation + getDistanceAttenuation(length(lVector), spotLight.distance, spotLight.decay);
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
					#if NUM_POINT_LIGHTS > 0
						PointLight pointLight;
						for (int i = 0; i < NUM_POINT_LIGHTS; i++) {
							pointLight = pointLights[i];
							getPointLightInfo(pointLight, directLight);
							reflectedLight += RE_Direct(directLight, normal, diffuseColor);
						}
					#endif
					#if NUM_SPOT_LIGHTS > 0
						SpotLight spotLight;
						for (int i = 0; i < NUM_SPOT_LIGHTS; i++) {
							spotLight = spotLights[i];
							getSpotLightInfo(spotLight, directLight);
							reflectedLight += RE_Direct(directLight, normal, diffuseColor);
						}
					#endif
					#if NUM_DIR_LIGHTS > 0
						DirectionalLight directionalLight;
						for (int i = 0; i < NUM_DIR_LIGHTS; i++) {
							directionalLight = directionalLights[i];
							getDirectionalLightInfo(directionalLight, directLight);
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

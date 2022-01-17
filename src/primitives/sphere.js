import {
	InstancedBufferAttribute,
	InstancedBufferGeometry,
	Mesh,
	ShaderMaterial,
	SphereGeometry,
	UniformsLib
} from '../../vendors/three.js';

import { getPopulatedCoordinateBuffer } from '../bufferUtils.js';

// See https://reference.wolfram.com/language/ref/Sphere
// for the high-level description of what is being rendered.
export default function ({ color, coords, opacity = 1, radius = 1 }, extent) {
	const sphereGeometry = new InstancedBufferGeometry().copy(
		new SphereGeometry(radius, 48, 48)
	);

	sphereGeometry.instanceCount = coords.length;

	// Set the spheres centers.
	sphereGeometry.setAttribute(
		'sphereCenter',
		new InstancedBufferAttribute(
			getPopulatedCoordinateBuffer(coords, extent),
			3
		)
	);

	const spheres = new Mesh(
		sphereGeometry,
		new ShaderMaterial({
			lights: true,
			transparent: opacity !== 1,
			depthWrite: opacity === 1,
			uniforms: {
				...UniformsLib.lights,
				diffuse: { value: color },
				opacity: { value: opacity }
			},
			vertexShader: `
				in vec3 sphereCenter;

				uniform vec3 ambientLightColor;
				uniform vec3 diffuse;
				uniform float opacity;

				out vec4 vColor;

				#define RECIPROCAL_PI 0.3183098861837907
				#define saturate(a) clamp(a, 0.0, 1.0)

				struct IncidentLight {
					vec3 color;
					vec3 direction;
				};

				struct GeometricContext {
					vec3 position;
					vec3 normal;
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

					void getPointLightInfo(const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light) {
						light.direction = normalize(pointLight.position - geometry.position);
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

					void getSpotLightInfo(const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light) {
						light.direction = normalize(spotLight.position - geometry.position);
						light.color = spotLight.color * max(dot(light.direction, spotLight.direction), 0.0);
					}
				#endif

				void main() {
					vec4 mvPosition = modelViewMatrix * vec4(position + sphereCenter, 1);

					gl_Position = projectionMatrix * mvPosition;

					GeometricContext geometry = GeometricContext(
						mvPosition.xyz,
						normalize(normalMatrix * normal)
					);

					vec3 light = ambientLightColor;

					IncidentLight directLight;

					#if NUM_DIR_LIGHTS > 0
						for (int i = 0; i < NUM_DIR_LIGHTS; i++) {
							light += saturate(dot(geometry.normal, directionalLights[i].direction)) * directionalLights[i].color;
						}
					#endif
					#if NUM_POINT_LIGHTS > 0
						for (int i = 0; i < NUM_POINT_LIGHTS; i++) {
							getPointLightInfo(pointLights[i], geometry, directLight);

							light += saturate(dot(geometry.normal, directLight.direction)) * directLight.color;
						}
					#endif
					#if NUM_SPOT_LIGHTS > 0
						for (int i = 0; i < NUM_SPOT_LIGHTS; i++) {
							getSpotLightInfo(spotLights[i], geometry, directLight);

							light += saturate(dot(geometry.normal, directLight.direction)) * directLight.color;
						}
					#endif

					vColor = vec4(light * diffuse * RECIPROCAL_PI, opacity);
				}
			`,
			fragmentShader: `
				in lowp vec4 vColor;

				void main() {
					pc_fragColor = vColor;
				}
			`
		})
	);

	spheres.frustumCulled = false;

	return spheres;
}

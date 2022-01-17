import {
	RawShaderMaterial,
	ShaderMaterial,
	UniformsLib
} from '../vendors/three.js';

// returns a material with a shader that uses 2 attributes:
// objectBegin and objectEnd.
// In the case of the cones, objectEnd must be the cone tip.
export function get2CoordinatesMaterial(color, opacity) {
	return new ShaderMaterial({
		transparent: opacity !== 1,
		depthWrite: opacity === 1,
		lights: true,
		uniforms: {
			...UniformsLib.lights,
			diffuse: { value: color },
			opacity: { value: opacity }
		},
		vertexShader: `
			in vec3 objectBegin;
			in vec3 objectEnd;

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
	});
}

// returns a material that ignores lighting and
// has the same color for all its pixels.
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
	})
}

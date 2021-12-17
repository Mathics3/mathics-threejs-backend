import {
	BufferAttribute,
	BufferGeometry,
	DoubleSide,
	Mesh,
	Quaternion,
	ShaderMaterial,
	Shape,
	ShapeGeometry,
	UniformsLib,
	Vector3
} from '../../vendors/three.js';

import { getPopulatedCoordinateBuffer } from '../bufferUtils.js';

import earcut from '../../vendors/earcut.js';
import scaleCoordinate from '../scaleCoordinate.js';

// See https://reference.wolfram.com/language/ref/Polygon
// for the high-level description of what is being rendered.
export default function ({ color, coords, opacity = 1 }, extent) {
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
		// boolean variables
		let isXCoplanar = 1, isYCoplanar = 1, isZCoplanar = 1;

		coords.forEach((coordinate) => {
			coordinate[0] ??= scaleCoordinate(coordinate[1], extent);

			if (coordinate[0][0] !== coords[0][0][0]) {
				isXCoplanar = 0;
			}
			if (coordinate[0][1] !== coords[0][0][1]) {
				isYCoplanar = 0;
			}
			if (coordinate[0][2] !== coords[0][0][2]) {
				isZCoplanar = 0;
			}
		});

		if (isXCoplanar || isYCoplanar || isZCoplanar) {
			const normalVector = new Vector3(
				isXCoplanar,
				isYCoplanar,
				isZCoplanar
			), normalZVector = new Vector3(0, 0, 1);

			// apply the quaternion "zero" all z values, we can't draw a shape with non-zero z values
			geometry = new ShapeGeometry(new Shape(
				coords.map((coordinate) =>
					new Vector3(
						...(coordinate[0] ?? scaleCoordinate(coordinate[1], extent))
					).applyQuaternion(
						new Quaternion().setFromUnitVectors(
							normalVector,
							normalZVector
						)
					)
				)
			));

			for (let i = 0; i < coords.length; i++) {
				// apply the "revert" quaternion so we respect original z values
				const temporaryVector = new Vector3(
					geometry.attributes.position.array[i * 3],
					geometry.attributes.position.array[i * 3 + 1],
					0
				).applyQuaternion(
					new Quaternion().setFromUnitVectors(
						normalZVector,
						normalVector
					)
				);

				// copy the temporary vector to the "position" buffer
				geometry.attributes.position.array[i * 3] = temporaryVector.x;
				geometry.attributes.position.array[i * 3 + 1] = temporaryVector.y;
				geometry.attributes.position.array[i * 3 + 2] = temporaryVector.z;
			}
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

	return new Mesh(
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
				varying vec3 vViewPosition;

				void main() {
					vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

					gl_Position = projectionMatrix * mvPosition;

					vViewPosition = -mvPosition.xyz;
				}
			`,
			fragmentShader: `
				uniform vec3 diffuse;
				uniform float roughness;
				uniform float opacity;
				uniform vec3 ambientLightColor;
				uniform vec3 lightProbe[9];

				varying vec3 vViewPosition;

				#define RECIPROCAL_PI 0.3183098861837907
				#define saturate(a) clamp(a, 0.0, 1.0)

				struct IncidentLight {
					vec3 color;
					vec3 direction;
					bool visible;
				};

				struct ReflectedLight {
					vec3 directDiffuse;
					vec3 directSpecular;
					vec3 indirectDiffuse;
					vec3 indirectSpecular;
				};

				struct GeometricContext {
					vec3 position;
					vec3 normal;
					vec3 viewDir;
				};

				vec3 BRDF_Lambert(const in vec3 diffuseColor) {
					return RECIPROCAL_PI * diffuseColor;
				}

				float getDistanceAttenuation(const in float lightDistance, const in float cutoffDistance, const in float decayExponent) {
					if (cutoffDistance > 0.0 && decayExponent > 0.0) {
						return pow(saturate(- lightDistance / cutoffDistance + 1.0), decayExponent);
					}
					return 1.0;
				}

				float getSpotAttenuation(const in float coneCosine, const in float penumbraCosine, const in float angleCosine) {
					return smoothstep(coneCosine, penumbraCosine, angleCosine);
				}

				#if NUM_DIR_LIGHTS > 0
					struct DirectionalLight {
						vec3 direction;
						vec3 color;
					};

					uniform DirectionalLight directionalLights[NUM_DIR_LIGHTS];

					void getDirectionalLightInfo(const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light) {
						light.color = directionalLight.color;
						light.direction = directionalLight.direction;
						light.visible = true;
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

					void getPointLightInfo(const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light) {
						vec3 lVector = pointLight.position - geometry.position;
						light.direction = normalize(lVector);
						float lightDistance = length(lVector);
						light.color = pointLight.color;
						light.color *= getDistanceAttenuation(lightDistance, pointLight.distance, pointLight.decay);
						light.visible = (light.color != vec3(0.0));
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

					uniform SpotLight spotLights[NUM_SPOT_LIGHTS];

					void getSpotLightInfo(const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light) {
						vec3 lVector = spotLight.position - geometry.position;
						light.direction = normalize(lVector);
						float angleCos = dot(light.direction, spotLight.direction);
						float spotAttenuation = getSpotAttenuation(spotLight.coneCos, spotLight.penumbraCos, angleCos);
						if (spotAttenuation > 0.0) {
							float lightDistance = length(lVector);
							light.color = spotLight.color * spotAttenuation;
							light.color *= getDistanceAttenuation(lightDistance, spotLight.distance, spotLight.decay);
							light.visible = (light.color != vec3(0.0));
						} else {
							light.color = vec3(0.0);
							light.visible = false;
						}
					}
				#endif

				struct PhysicalMaterial {
					vec3 diffuseColor;
					float roughness;
					vec3 specularColor;
				};

				void RE_Direct(const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
					float dotNL = saturate(dot(geometry.normal, directLight.direction));
					vec3 irradiance = dotNL * directLight.color;
					reflectedLight.directDiffuse += irradiance * BRDF_Lambert(material.diffuseColor);
				}
				void main() {
					vec4 diffuseColor = vec4(diffuse, opacity);
					ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
					float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
					vec3 fdx = vec3(dFdx(vViewPosition.x), dFdx(vViewPosition.y), dFdx(vViewPosition.z));
					vec3 fdy = vec3(dFdy(vViewPosition.x), dFdy(vViewPosition.y), dFdy(vViewPosition.z));
					vec3 normal = normalize(cross(fdx, fdy));
					vec3 geometryNormal = normal;
					PhysicalMaterial material;
					material.diffuseColor = diffuseColor.rgb;
					vec3 dxy = max(abs(dFdx(geometryNormal)), abs(dFdy(geometryNormal)));
					GeometricContext geometry;
					geometry.position = -vViewPosition;
					geometry.normal = normal;
					geometry.viewDir = normalize(vViewPosition);
					IncidentLight directLight;
					#if (NUM_POINT_LIGHTS > 0)
						PointLight pointLight;
						#pragma unroll_loop_start
						for (int i = 0; i < NUM_POINT_LIGHTS; i++) {
							pointLight = pointLights[i];
							getPointLightInfo(pointLight, geometry, directLight);
							RE_Direct(directLight, geometry, material, reflectedLight);
						}
						#pragma unroll_loop_end
					#endif
					#if (NUM_SPOT_LIGHTS > 0)
						SpotLight spotLight;
						#pragma unroll_loop_start
						for (int i = 0; i < NUM_SPOT_LIGHTS; i++) {
							spotLight = spotLights[i];
							getSpotLightInfo(spotLight, geometry, directLight);
							RE_Direct(directLight, geometry, material, reflectedLight);
						}
						#pragma unroll_loop_end
					#endif
					#if (NUM_DIR_LIGHTS > 0)
						DirectionalLight directionalLight;
						#pragma unroll_loop_start
						for (int i = 0; i < NUM_DIR_LIGHTS; i++) {
							directionalLight = directionalLights[i];
							getDirectionalLightInfo(directionalLight, geometry, directLight);
							RE_Direct(directLight, geometry, material, reflectedLight);
						}
						#pragma unroll_loop_end
					#endif

					gl_FragColor = vec4(
						reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + ambientLightColor * BRDF_Lambert(material.diffuseColor),
						diffuseColor.a
					);
				}
			`
		})
	);
}

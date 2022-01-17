import {
	BufferAttribute,
	BufferGeometry,
	CatmullRomCurve3,
	Matrix4,
	Mesh,
	ShaderMaterial,
	SphereGeometry,
	TubeGeometry,
	UniformsLib,
	Vector3
} from '../../vendors/three.js';

import { scaleCoordinate } from '../coordinateUtils.js';

// Modified from three.js' BufferGeometryUtils.
function mergeBufferAttributes(attributes) {
	let arrayLength = 0;

	for (let i = 0; i < attributes.length; ++i) {
		arrayLength += attributes[i].array.length;
	}

	const array = new attributes[0].array.constructor(arrayLength);

	for (let i = 0, offset = 0; i < attributes.length; ++i) {
		array.set(attributes[i].array, offset);

		offset += attributes[i].array.length;
	}

	return new BufferAttribute(array, 3);
}

// Modified from three.js' BufferGeometryUtils.
function mergeBufferGeometries(geometries) {
	const mergedIndex = [];
	const attributes = {};
	const mergedGeometry = new BufferGeometry();

	for (let i = 0, indexOffset = 0; i < geometries.length; ++i) {
		for (const name in geometries[i].attributes) {
			if (attributes[name] === undefined) attributes[name] = [];

			attributes[name].push(geometries[i].attributes[name]);
		}

		for (let j = 0; j < geometries[i].index.count; ++j) {
			mergedIndex.push(geometries[i].index.getX(j) + indexOffset);
		}

		indexOffset += geometries[i].attributes.position.count;
	}

	mergedGeometry.setIndex(mergedIndex);

	for (const name in attributes) {
		mergedGeometry.setAttribute(
			name,
			mergeBufferAttributes(attributes[name])
		);
	}

	return mergedGeometry;
}

// See https://reference.wolfram.com/language/ref/Tube.html
// for the high-level description of what is being rendered.
export default function ({ color, coords, opacity = 1, radius = 1 }, extent) {
	// TubeGeometry receives a Curve, but Mathics' Tube recives an array of coordinates, so we use CatmullRomCurve3 to convert the coordinates into a Curve.
	// Curve.getPoint receives a flot between 0 and 1, where 0 is the 1st coordinate and 1 is the last.
	const curve = new CatmullRomCurve3(
		// It isn't using getCoordinatesBuffer because CatmullRomCurve3 receives an array of Vector3s.
		coords.map((coordinate) => new Vector3(
			...(coordinate[0] ?? scaleCoordinate(coordinate[1], extent))
		))
	);

	const geometries = [
		new TubeGeometry(
			curve,
			64, // tubular segments
			radius,
			64 // radial segments
		),
		// 1st end cap
		new SphereGeometry(
			radius,
			48,
			48,
			0, // phi start
			Math.PI // phi end. 2π is a whole sphere, π is half sphere.
		)
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
		new SphereGeometry(radius, 48, 48, 0, Math.PI)
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

						float angleCos = dot(light.direction, spotLight.direction);

						if (angleCos > 0.0) {
							light.color = spotLight.color * max(dot(light.direction, spotLight.direction), 0.0);
						} else {
							light.color = vec3(0.0);
						}
					}
				#endif

				void main() {
					vec4 mvPosition = modelViewMatrix * vec4(position, 1);

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
				in vec4 vColor;

				void main() {
					pc_fragColor = vColor;
				}
			`
		})
	);
}

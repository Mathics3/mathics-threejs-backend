import {
	BufferAttribute,
	CylinderGeometry,
	Group,
	InstancedBufferAttribute,
	InstancedBufferGeometry,
	LineSegments,
	Mesh,
	ShaderMaterial,
	RawShaderMaterial,
	UniformsLib
} from '../../vendors/three.js';

import { get2PopulatedCoordinateBuffers } from '../bufferUtils.js';

// See https://reference.wolfram.com/language/ref/Cylinder
// for the high-level description of what is being rendered.
export default function ({ color, coords, edgeForm = {}, opacity = 1, radius = 1 }, extent) {
	const [cylindersBegin, cylindersEnd] = get2PopulatedCoordinateBuffers(coords, extent);

	const cylinderGeometry = new InstancedBufferGeometry().copy(
		new CylinderGeometry(radius, radius, 1, 24)
			.translate(0, -0.5, 0) // translate the geometry so we don't need to calculate the middle of each coordinates-pair
			.rotateX(Math.PI / 2) // rotate the cylinder 90 degrees to lookAt work
	);

	cylinderGeometry.instanceCount = coords.length / 2;

	cylinderGeometry.setAttribute(
		'cylinderBegin',
		new InstancedBufferAttribute(cylindersBegin, 3)
	);

	cylinderGeometry.setAttribute(
		'cylinderEnd',
		new InstancedBufferAttribute(cylindersEnd, 3)
	);

	const cylinders = new Mesh(
		cylinderGeometry,
		new ShaderMaterial({
			transparent: opacity !== 1,
			depthWrite: opacity === 1,
			lights: true,
			uniforms: {
				...UniformsLib.lights,
				diffuse: { value: color },
				opacity: { value: opacity }
			},
			vertexShader: `
				in vec3 cylinderBegin;
				in vec3 cylinderEnd;

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

				float getDistanceAttenuation(const in float lightDistance, const in float cutoffDistance, const in float decayExponent) {
					if (cutoffDistance > 0.0 && decayExponent > 0.0) {
						return pow(saturate(- lightDistance / cutoffDistance + 1.0), decayExponent);
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

					void getPointLightInfo(const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light) {
						vec3 lVector = pointLight.position - geometry.position;

						light.direction = normalize(lVector);
						light.color = pointLight.color * getDistanceAttenuation(length(lVector), pointLight.distance, pointLight.decay);
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

					float getSpotAttenuation(const in float coneCosine, const in float penumbraCosine, const in float angleCosine) {
						return smoothstep(coneCosine, penumbraCosine, angleCosine);
					}

					void getSpotLightInfo(const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light) {
						vec3 lVector = spotLight.position - geometry.position;

						light.direction = normalize(lVector);

						float angleCos = dot(light.direction, spotLight.direction);

						float spotAttenuation = getSpotAttenuation(spotLight.coneCos, spotLight.penumbraCos, angleCos);

						if (spotAttenuation > 0.0) {
							light.color = spotLight.color * spotAttenuation * getDistanceAttenuation(length(lVector), spotLight.distance, spotLight.decay);
						} else {
							light.color = vec3(0.0);
						}
					}
				#endif

				void main() {
					vec3 z = normalize(cylinderBegin - cylinderEnd);
					// if z.z is 0 the cylinder doesn't appear
					z.z += 0.0001;

					vec3 x = normalize(cross(vec3(0, 1, 0), z));
					vec3 y = cross(z, x);

					float height = distance(cylinderBegin, cylinderEnd);

					// position, rotate and scale the cylinder
					mat4 cylinderMatrix = mat4(
						x, 0,            // row 0
						y, 0,            // row 1
						z * height, 0,   // row 2
						cylinderBegin, 1 // row 3
					);

					vec4 mvPosition = modelViewMatrix * cylinderMatrix * vec4(position, 1);

					gl_Position = projectionMatrix * mvPosition;

					GeometricContext geometry = GeometricContext(
						mvPosition.xyz,
						normalize(normalMatrix * normal)
					);

					vec3 light = ambientLightColor;

					IncidentLight directLight;

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
					#if NUM_DIR_LIGHTS > 0
						for (int i = 0; i < NUM_DIR_LIGHTS; i++) {
							getDirectionalLightInfo(directionalLights[i], directLight);

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

	cylinders.frustumCulled = false;

	if (edgeForm.showEdges === false) {
		// If the edges aren't shown the work is done.
		return cylinders;
	}

	const group = new Group();

	group.add(cylinders);

	// Differently from cuboid's edges, the cylinders' ones are in a different object. It is very hard or maybe impossible to draw edges with complex shapes in the fragment shader.

	// The lines below are the edges' vertices' positions.
	// The magic numbers below are modified from the position attribute of a three.js EdgesGeometry of the cylinder.
	// To get them: console.log(new EdgesGeometry(cylinderGeometry).attributes.position.array)

	const edgesGeometry = new InstancedBufferGeometry()
		.setAttribute(
			'position',
			new BufferAttribute(
				new Float32Array([
					// first circle

					0, -1, 0,
					0.258819043636322, -0.9659258127212524, 0,

					0.258819043636322, -0.9659258127212524, 0,
					0.5, -0.8660253882408142, 0,

					0.5, -0.8660253882408142, 0,
					0.7071067690849304, -0.7071067690849304, 0,

					0.7071067690849304, -0.7071067690849304, 0,
					0.8660253882408142, -0.5, 0,

					0.8660253882408142, -0.5, 0,
					0.9659258127212524, -0.258819043636322, 0,

					0.9659258127212524, -0.258819043636322, 0,
					1, 0, 0,

					1, 0, 0,
					0.9659258127212524, 0.258819043636322, 0,

					0.9659258127212524, 0.258819043636322, 0,
					0.8660253882408142, 0.5, 0,

					0.8660253882408142, 0.5, 0,
					0.7071067690849304, 0.7071067690849304, 0,

					0.7071067690849304, 0.7071067690849304, 0,
					0.5, 0.8660253882408142, 0,

					0.5, 0.8660253882408142, 0,
					0.258819043636322, 0.9659258127212524, 0,

					0.258819043636322, 0.9659258127212524, 0,
					0, 1, 0,

					0, 1, 0,
					-0.258819043636322, 0.9659258127212524, 0,

					-0.258819043636322, 0.9659258127212524, 0,
					-0.5, 0.8660253882408142, 0,

					-0.5, 0.8660253882408142, 0,
					-0.7071067690849304, 0.7071067690849304, 0,

					-0.7071067690849304, 0.7071067690849304, 0,
					-0.8660253882408142, 0.5, 0,

					-0.8660253882408142, 0.5, 0,
					-0.9659258127212524, 0.258819043636322, 0,

					-0.9659258127212524, 0.258819043636322, 0,
					-1, 0, 0,

					-1, 0, 0,
					-0.9659258127212524, -0.258819043636322, 0,

					-0.9659258127212524, -0.258819043636322, 0,
					-0.8660253882408142, -0.5, 0,

					-0.8660253882408142, -0.5, 0,
					-0.7071067690849304, -0.7071067690849304, 0,

					-0.7071067690849304, -0.7071067690849304, 0,
					-0.5, -0.8660253882408142, 0,

					-0.5, -0.8660253882408142, 0,
					-0.258819043636322, -0.9659258127212524, 0,

					-0.258819043636322, -0.9659258127212524, 0,
					0, -1, 0,

					// second circle

					0.258819043636322, -0.9659258127212524, -1,
					0, -1, -1,

					0.5, -0.8660253882408142, -1,
					0.258819043636322, -0.9659258127212524, -1,

					0.7071067690849304, -0.7071067690849304, -1,
					0.5, -0.8660253882408142, -1,

					0.8660253882408142, -0.5, -1,
					0.7071067690849304, -0.7071067690849304, -1,

					0.9659258127212524, -0.258819043636322, -1,
					0.8660253882408142, -0.5, -1,

					1, 0, -1,
					0.9659258127212524, -0.258819043636322, -1,

					0.9659258127212524, 0.258819043636322, -1,
					1, 0, -1,

					0.8660253882408142, 0.5, -1,
					0.9659258127212524, 0.258819043636322, -1,

					0.7071067690849304, 0.7071067690849304, -1,
					0.8660253882408142, 0.5, -1,

					0.5, 0.8660253882408142, -1,
					0.7071067690849304, 0.7071067690849304, -1,

					0.258819043636322, 0.9659258127212524, -1,
					0.5, 0.8660253882408142, -1,

					0, 1, -1,
					0.258819043636322, 0.9659258127212524, -1,

					-0.258819043636322, 0.9659258127212524, -1,
					0, 1, -1,

					-0.5, 0.8660253882408142, -1,
					-0.258819043636322, 0.9659258127212524, -1,

					-0.7071067690849304, 0.7071067690849304, -1,
					-0.5, 0.8660253882408142, -1,

					-0.8660253882408142, 0.5, -1,
					-0.7071067690849304, 0.7071067690849304, -1,

					-0.9659258127212524, 0.258819043636322, -1,
					-0.8660253882408142, 0.5, -1,

					-1, 0, -1,
					-0.9659258127212524, 0.258819043636322, -1,

					-0.9659258127212524, -0.258819043636322, -1,
					-1, 0, -1,

					-0.8660253882408142, -0.5, -1,
					-0.9659258127212524, -0.258819043636322, -1,

					-0.7071067690849304, -0.7071067690849304, -1,
					-0.8660253882408142, -0.5, -1,

					-0.5, -0.8660253882408142, -1,
					-0.7071067690849304, -0.7071067690849304, -1,

					-0.258819043636322, -0.9659258127212524, -1,
					-0.5, -0.8660253882408142, -1,

					0, -1, -1,
					-0.258819043636322, -0.9659258127212524, -1
				]),
				3
			)
		)
		// If we don't scale x and y the edge is smaller than the cylinder, scaling z changes the position of the edges.
		.scale(radius, radius, 1);

	edgesGeometry.instanceCount = coords.length / 2;

	edgesGeometry.setAttribute(
		'cylinderBegin',
		new InstancedBufferAttribute(cylindersBegin, 3)
	);

	edgesGeometry.setAttribute(
		'cylinderEnd',
		new InstancedBufferAttribute(cylindersEnd, 3)
	);

	const edges = new LineSegments(
		edgesGeometry,
		new RawShaderMaterial({
			uniforms: {
				color: { value: edgeForm.color ?? [0, 0, 0] }
			},
			vertexShader: `#version 300 es
				in vec3 position;
				in vec3 cylinderBegin;
				in vec3 cylinderEnd;

				uniform mat4 projectionMatrix;
				uniform mat4 modelViewMatrix;

				void main() {
					vec3 z = normalize(cylinderBegin - cylinderEnd);
					// If z.z is 0 the edges doesn't appear.
					z.z += 0.0001;

					vec3 x = normalize(cross(vec3(0, 1, 0), z));
					vec3 y = cross(z, x);

					float height = distance(cylinderBegin, cylinderEnd);

					// position, rotate and scale the edges
					mat4 cylinderMatrix = mat4(
						x, 0,            // row 0
						y, 0,            // row 1
						z * height, 0,   // row 2
						cylinderBegin, 1 // row 3
					);

					gl_Position = projectionMatrix * modelViewMatrix * cylinderMatrix * vec4(position, 1);
				}
			`,
			fragmentShader: `#version 300 es
				uniform lowp vec3 color;

				out lowp vec4 pc_fragColor;

				void main() {
					pc_fragColor = vec4(color, 1.0);
				}
			`
		})
	);

	edges.frustumCulled = false;

	group.add(edges);

	return group;
}

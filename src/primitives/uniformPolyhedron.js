import {
	BufferAttribute,
	EdgesGeometry,
	Group,
	InstancedBufferAttribute,
	InstancedBufferGeometry,
	LineSegments,
	Mesh,
	ShaderMaterial,
	RawShaderMaterial,
	UniformsLib
} from '../../vendors/three.js';

import { getPopulatedCoordinateBuffer } from '../bufferUtils.js';

// See https://reference.wolfram.com/language/ref/UniformPolyhedron
// for the high-level description of what is being rendered.
export default function ({ color, coords, edgeForm = {}, edgeLength = 1, opacity = 1, subType }, extent) {
	let polyhedronGeometry;

	// The magic numbers in the code bellow were captured multipling √(3/8) (see https://en.wikipedia.org/wiki/Tetrahedron#Coordinates_for_a_regular_tetrahedron) by each number of the respective three.js geometry's position and divided by 0.5773502588272095 (the unique number in three.js TetrahedronGeometry's position).

	switch (subType) {
		case 'tetrahedron': {
			const vertexPosition = 0.6123 * edgeLength;

			polyhedronGeometry = new InstancedBufferGeometry().setAttribute(
				'position',
				new BufferAttribute(new Float32Array([
					-vertexPosition, -vertexPosition, vertexPosition,
					vertexPosition, vertexPosition, vertexPosition,
					-vertexPosition, vertexPosition, -vertexPosition,

					vertexPosition, -vertexPosition, -vertexPosition,
					-vertexPosition, vertexPosition, -vertexPosition,
					vertexPosition, vertexPosition, vertexPosition,

					vertexPosition, -vertexPosition, -vertexPosition,
					vertexPosition, vertexPosition, vertexPosition,
					-vertexPosition, -vertexPosition, vertexPosition,

					vertexPosition, -vertexPosition, -vertexPosition,
					-vertexPosition, -vertexPosition, vertexPosition,
					-vertexPosition, vertexPosition, -vertexPosition
				]), 3)
			);

			break;
		}
		case 'octahedron': {
			polyhedronGeometry = new InstancedBufferGeometry().setAttribute(
				'position',
				new BufferAttribute(new Float32Array([
					0, edgeLength, 0,
					0, 0, edgeLength,
					edgeLength, 0, 0,

					0, 0, edgeLength,
					0, -edgeLength, 0,
					edgeLength, 0, 0,

					0, -edgeLength, 0,
					0, 0, -edgeLength,
					edgeLength, 0, 0,

					0, 0, -edgeLength,
					0, edgeLength, 0,
					edgeLength, 0, 0,

					0, edgeLength, 0,
					0, 0, -edgeLength,
					-edgeLength, 0, 0,

					0, 0, -edgeLength,
					0, -edgeLength, 0,
					-edgeLength, 0, 0,

					0, -edgeLength, 0,
					0, 0, edgeLength,
					-edgeLength, 0, 0,

					0, 0, edgeLength,
					0, edgeLength, 0,
					-edgeLength, 0, 0
				]), 3)
			);

			break;
		}
		case 'dodecahedron': {
			const vertexPosition0 = 0.6123 * edgeLength,
				vertexPosition1 = 0.3784 * edgeLength,
				vertexPosition2 = 0.9908 * edgeLength;

			polyhedronGeometry = new InstancedBufferGeometry().setAttribute(
				'position',
				new BufferAttribute(new Float32Array([
					0, vertexPosition1, vertexPosition2,
					vertexPosition0, vertexPosition0, vertexPosition0,
					-vertexPosition0, vertexPosition0, vertexPosition0,

					vertexPosition0, vertexPosition0, vertexPosition0,
					vertexPosition1, vertexPosition2, 0,
					-vertexPosition0, vertexPosition0, vertexPosition0,

					vertexPosition1, vertexPosition2, 0,
					-vertexPosition1, vertexPosition2, 0,
					-vertexPosition0, vertexPosition0, vertexPosition0,

					vertexPosition2, 0, vertexPosition1,
					vertexPosition2, 0, -vertexPosition1,
					vertexPosition0, vertexPosition0, vertexPosition0,

					vertexPosition2, 0, -vertexPosition1,
					vertexPosition0, vertexPosition0, -vertexPosition0,
					vertexPosition0, vertexPosition0, vertexPosition0,

					vertexPosition0, vertexPosition0, -vertexPosition0,
					vertexPosition1, vertexPosition2, 0,
					vertexPosition0, vertexPosition0, vertexPosition0,

					vertexPosition0, -vertexPosition0, -vertexPosition0,
					0, -vertexPosition1, -vertexPosition2,
					vertexPosition2, 0, -vertexPosition1,

					0, -vertexPosition1, -vertexPosition2,
					0, vertexPosition1, -vertexPosition2,
					vertexPosition2, 0, -vertexPosition1,

					0, vertexPosition1, -vertexPosition2,
					vertexPosition0, vertexPosition0, -vertexPosition0,
					vertexPosition2, 0, -vertexPosition1,

					-vertexPosition0, -vertexPosition0, -vertexPosition0,
					-vertexPosition2, 0, -vertexPosition1,
					0, -vertexPosition1, -vertexPosition2,

					-vertexPosition2, 0, -vertexPosition1,
					-vertexPosition0, vertexPosition0, -vertexPosition0,
					0, -vertexPosition1, -vertexPosition2,

					-vertexPosition0, vertexPosition0, -vertexPosition0,
					0, vertexPosition1, -vertexPosition2,
					0, -vertexPosition1, -vertexPosition2,

					-vertexPosition1, -vertexPosition2, 0,
					-vertexPosition0, -vertexPosition0, vertexPosition0,
					-vertexPosition0, -vertexPosition0, -vertexPosition0,

					-vertexPosition0, -vertexPosition0, vertexPosition0,
					-vertexPosition2, 0, vertexPosition1,
					-vertexPosition0, -vertexPosition0, -vertexPosition0,

					-vertexPosition2, 0, vertexPosition1,
					-vertexPosition2, 0, -vertexPosition1,
					-vertexPosition0, -vertexPosition0, -vertexPosition0,

					0, vertexPosition1, -vertexPosition2,
					-vertexPosition0, vertexPosition0, -vertexPosition0,
					vertexPosition0, vertexPosition0, -vertexPosition0,

					-vertexPosition0, vertexPosition0, -vertexPosition0,
					-vertexPosition1, vertexPosition2, 0,
					vertexPosition0, vertexPosition0, -vertexPosition0,

					-vertexPosition1, vertexPosition2, 0,
					vertexPosition1, vertexPosition2, 0,
					vertexPosition0, vertexPosition0, -vertexPosition0,

					-vertexPosition2, 0, -vertexPosition1,
					-vertexPosition2, 0, vertexPosition1,
					-vertexPosition0, vertexPosition0, -vertexPosition0,

					-vertexPosition2, 0, vertexPosition1,
					-vertexPosition0, vertexPosition0, vertexPosition0,
					-vertexPosition0, vertexPosition0, -vertexPosition0,

					-vertexPosition0, vertexPosition0, vertexPosition0,
					-vertexPosition1, vertexPosition2, 0,
					-vertexPosition0, vertexPosition0, -vertexPosition0,

					-vertexPosition0, -vertexPosition0, vertexPosition0,
					0, -vertexPosition1, vertexPosition2,
					-vertexPosition2, 0, vertexPosition1,

					0, -vertexPosition1, vertexPosition2,
					0, vertexPosition1, vertexPosition2,
					-vertexPosition2, 0, vertexPosition1,

					0, vertexPosition1, vertexPosition2,
					-vertexPosition0, vertexPosition0, vertexPosition0,
					-vertexPosition2, 0, vertexPosition1,

					vertexPosition1, -vertexPosition2, 0,
					-vertexPosition1, -vertexPosition2, 0,
					vertexPosition0, -vertexPosition0, -vertexPosition0,

					-vertexPosition1, -vertexPosition2, 0,
					-vertexPosition0, -vertexPosition0, -vertexPosition0,
					vertexPosition0, -vertexPosition0, -vertexPosition0,

					-vertexPosition0, -vertexPosition0, -vertexPosition0,
					0, -vertexPosition1, -vertexPosition2,
					vertexPosition0, -vertexPosition0, -vertexPosition0,

					0, -vertexPosition1, vertexPosition2,
					vertexPosition0, -vertexPosition0, vertexPosition0,
					0, vertexPosition1, vertexPosition2,

					vertexPosition0, -vertexPosition0, vertexPosition0,
					vertexPosition2, 0, vertexPosition1,
					0, vertexPosition1, vertexPosition2,

					vertexPosition2, 0, vertexPosition1,
					vertexPosition0, vertexPosition0, vertexPosition0,
					0, vertexPosition1, vertexPosition2,

					vertexPosition0, -vertexPosition0, vertexPosition0,
					vertexPosition1, -vertexPosition2, 0,
					vertexPosition2, 0, vertexPosition1,

					vertexPosition1, -vertexPosition2, 0,
					vertexPosition0, -vertexPosition0, -vertexPosition0,
					vertexPosition2, 0, vertexPosition1,

					vertexPosition0, -vertexPosition0, -vertexPosition0,
					vertexPosition2, 0, -vertexPosition1,
					vertexPosition2, 0, vertexPosition1,

					-vertexPosition1, -vertexPosition2, 0,
					vertexPosition1, -vertexPosition2, 0,
					-vertexPosition0, -vertexPosition0, vertexPosition0,

					vertexPosition1, -vertexPosition2, 0,
					vertexPosition0, -vertexPosition0, vertexPosition0,
					-vertexPosition0, -vertexPosition0, vertexPosition0,

					vertexPosition0, -vertexPosition0, vertexPosition0,
					0, -vertexPosition1, vertexPosition2,
					-vertexPosition0, -vertexPosition0, vertexPosition0
				]), 3)
			);

			break;
		}
		case 'icosahedron': {
			const vertexPosition0 = 0.5576 * edgeLength,
				vertexPosition1 = 0.9022 * edgeLength;

			polyhedronGeometry = new InstancedBufferGeometry().setAttribute(
				'position',
				new BufferAttribute(new Float32Array([
					-vertexPosition1, 0, vertexPosition0,
					0, vertexPosition0, vertexPosition1,
					-vertexPosition0, vertexPosition1, 0,

					0, vertexPosition0, vertexPosition1,
					vertexPosition0, vertexPosition1, 0,
					-vertexPosition0, vertexPosition1, 0,

					vertexPosition0, vertexPosition1, 0,
					0, vertexPosition0, -vertexPosition1,
					-vertexPosition0, vertexPosition1, 0,

					0, vertexPosition0, -vertexPosition1,
					-vertexPosition1, 0, -vertexPosition0,
					-vertexPosition0, vertexPosition1, 0,

					-vertexPosition1, 0, -vertexPosition0,
					-vertexPosition1, 0, vertexPosition0,
					-vertexPosition0, vertexPosition1, 0,

					0, vertexPosition0, vertexPosition1,
					vertexPosition1, 0, vertexPosition0,
					vertexPosition0, vertexPosition1, 0,

					-vertexPosition1, 0, vertexPosition0,
					0, -vertexPosition0, vertexPosition1,
					0, vertexPosition0, vertexPosition1,

					-vertexPosition1, 0, -vertexPosition0,
					-vertexPosition0, -vertexPosition1, 0,
					-vertexPosition1, 0, vertexPosition0,

					0, vertexPosition0, -vertexPosition1,
					0, -vertexPosition0, -vertexPosition1,
					-vertexPosition1, 0, -vertexPosition0,

					vertexPosition0, vertexPosition1, 0,
					vertexPosition1, 0, -vertexPosition0,
					0, vertexPosition0, -vertexPosition1,

					vertexPosition1, 0, vertexPosition0,
					0, -vertexPosition0, vertexPosition1,
					vertexPosition0, -vertexPosition1, 0,

					0, -vertexPosition0, vertexPosition1,
					-vertexPosition0, -vertexPosition1, 0,
					vertexPosition0, -vertexPosition1, 0,

					-vertexPosition0, -vertexPosition1, 0,
					0, -vertexPosition0, -vertexPosition1,
					vertexPosition0, -vertexPosition1, 0,

					0, -vertexPosition0, -vertexPosition1,
					vertexPosition1, 0, -vertexPosition0,
					vertexPosition0, -vertexPosition1, 0,

					vertexPosition1, 0, -vertexPosition0,
					vertexPosition1, 0, vertexPosition0,
					vertexPosition0, -vertexPosition1, 0,

					vertexPosition1, 0, vertexPosition0,
					0, vertexPosition0, vertexPosition1,
					0, -vertexPosition0, vertexPosition1,

					0, -vertexPosition0, vertexPosition1,
					-vertexPosition1, 0, vertexPosition0,
					-vertexPosition0, -vertexPosition1, 0,

					-vertexPosition0, -vertexPosition1, 0,
					-vertexPosition1, 0, -vertexPosition0,
					0, -vertexPosition0, -vertexPosition1,

					0, -vertexPosition0, -vertexPosition1,
					0, vertexPosition0, -vertexPosition1,
					vertexPosition1, 0, -vertexPosition0,

					vertexPosition1, 0, -vertexPosition0,
					vertexPosition0, vertexPosition1, 0,
					vertexPosition1, 0, vertexPosition0
				]), 3)
			);

			break;
		}
	}

	const polyhedronsCenters = getPopulatedCoordinateBuffer(coords, extent);

	polyhedronGeometry.instanceCount = coords.length;

	polyhedronGeometry.setAttribute(
		'polyhedronCenter',
		new InstancedBufferAttribute(polyhedronsCenters, 3)
	);

	const polyhedrons = new Mesh(
		polyhedronGeometry,
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
				in vec3 polyhedronCenter;

				out vec3 vViewPosition;

				void main() {
					vec4 mvPosition = modelViewMatrix * vec4(position + polyhedronCenter, 1);

					vViewPosition = -mvPosition.xyz;

					gl_Position = projectionMatrix * mvPosition;
				}
			`,
			fragmentShader: `
				in vec3 vViewPosition;

				uniform vec3 diffuse;
				uniform float opacity;
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

				float getSpotAttenuation(const in float coneCosine, const in float penumbraCosine, const in float angleCosine) {
					return smoothstep(coneCosine, penumbraCosine, angleCosine);
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
						float lightDistance = length(lVector);
						light.color = pointLight.color * getDistanceAttenuation(lightDistance, pointLight.distance, pointLight.decay);
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

					void getSpotLightInfo(const in SpotLight spotLight, out IncidentLight light) {
						vec3 lVector = spotLight.position + vViewPosition;
						light.direction = normalize(lVector);
						float angleCos = dot(light.direction, spotLight.direction);
						float spotAttenuation = getSpotAttenuation(spotLight.coneCos, spotLight.penumbraCos, angleCos);
						if (spotAttenuation > 0.0) {
							float lightDistance = length(lVector);
							light.color = spotLight.color * spotAttenuation * getDistanceAttenuation(lightDistance, spotLight.distance, spotLight.decay);
						} else {
							light.color = vec3(0.0);
						}
					}
				#endif

				vec3 RE_Direct(const in IncidentLight directLight, const in vec3 normal) {
					float dotNL = saturate(dot(normal, directLight.direction));

					return dotNL * directLight.color * RECIPROCAL_PI * diffuse;
				}

				void main() {
					// If x is NaN, then y and z are also NaN.
					vec3 normal = normalize(cross(dFdx(vViewPosition), dFdy(vViewPosition)));

					vec3 reflectedLight = vec3(0.0);

					IncidentLight directLight;

					#if NUM_POINT_LIGHTS > 0
						PointLight pointLight;
						for (int i = 0; i < NUM_POINT_LIGHTS; i++) {
							pointLight = pointLights[i];
							getPointLightInfo(pointLight, directLight);
							reflectedLight += RE_Direct(directLight, normal);
						}
					#endif
					#if NUM_SPOT_LIGHTS > 0
						SpotLight spotLight;
						for (int i = 0; i < NUM_SPOT_LIGHTS; i++) {
							spotLight = spotLights[i];
							getSpotLightInfo(spotLight, directLight);
							reflectedLight += RE_Direct(directLight, normal);
						}
					#endif
					#if NUM_DIR_LIGHTS > 0
						DirectionalLight directionalLight;
						for (int i = 0; i < NUM_DIR_LIGHTS; i++) {
							directionalLight = directionalLights[i];
							getDirectionalLightInfo(directionalLight, directLight);
							reflectedLight += RE_Direct(directLight, normal);
						}
					#endif

					pc_fragColor = vec4(
						reflectedLight + ambientLightColor * diffuse * RECIPROCAL_PI,
						opacity
					);
				}
			`
		})
	);

	polyhedrons.frustumCulled = false;

	if (edgeForm.showEdges === false) {
		// If the edges aren't shown the work is done.
		return polyhedrons;
	}

	const group = new Group();

	group.add(polyhedrons);

	// The polyhedrons' edges are basicaly the same as the cylinders' ones.

	const edgesGeometry = new InstancedBufferGeometry().copy(
		new EdgesGeometry(polyhedronGeometry) // "calculate" the edges of the desired polyhedron
	);

	edgesGeometry.instanceCount = coords.length;

	edgesGeometry.setAttribute(
		'polyhedronCenter',
		new InstancedBufferAttribute(polyhedronsCenters, 3)
	);

	const edges = new LineSegments(
		edgesGeometry,
		new RawShaderMaterial({
			uniforms: {
				color: { value: edgeForm.color ?? [0, 0, 0] }
			},
			vertexShader: `#version 300 es
				in vec3 position;
				in vec3 polyhedronCenter;

				uniform mat4 projectionMatrix;
				uniform mat4 modelViewMatrix;

				void main() {
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position + polyhedronCenter, 1);
				}
			`,
			fragmentShader: `#version 300 es
				uniform lowp vec3 color;

				out lowp vec4 pc_fragColor;

				void main() {
					pc_fragColor = vec4(color, 1);
				}
			`
		})
	);

	edges.frustumCulled = false;

	group.add(edges);

	return group;
}

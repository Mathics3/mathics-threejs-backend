import {
	BufferAttribute,
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
export default function ({ color = [1, 1, 1], coords, edgeForm = {}, edgeLength = 1, opacity = 1, subType }, extent) {
	const polyhedronGeometry = new InstancedBufferGeometry();

	// The magic numbers below are modified from the position attribute of,
	// respectively, TetrahedronBufferGeometry, OctahedronBufferGeometry,
	// DodecahedronBufferGeometry and IcosahedronBufferGeometry.
	// Each number is multiplied by 1.06066019082 (otherwise the radius of the
	// polyhedrons won't be "the same" of a sphere with edgeLength radius).
	// To get them: console.log(new GeometryName().attributes.position.array)

	switch (subType) {
		case 'tetrahedron': {
			const vertexPosition = 0.6123 * edgeLength;

			polyhedronGeometry.setAttribute(
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
			polyhedronGeometry.setAttribute(
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
			const vertexPosition0 = 0.3784 * edgeLength,
				vertexPosition1 = 0.6123 * edgeLength,
				vertexPosition2 = 0.9908 * edgeLength;

			polyhedronGeometry.setAttribute(
				'position',
				new BufferAttribute(new Float32Array([
					0, vertexPosition0, vertexPosition2,
					vertexPosition1, vertexPosition1, vertexPosition1,
					-vertexPosition1, vertexPosition1, vertexPosition1,

					vertexPosition1, vertexPosition1, vertexPosition1,
					vertexPosition0, vertexPosition2, 0,
					-vertexPosition1, vertexPosition1, vertexPosition1,

					vertexPosition0, vertexPosition2, 0,
					-vertexPosition0, vertexPosition2, 0,
					-vertexPosition1, vertexPosition1, vertexPosition1,

					vertexPosition2, 0, vertexPosition0,
					vertexPosition2, 0, -vertexPosition0,
					vertexPosition1, vertexPosition1, vertexPosition1,

					vertexPosition2, 0, -vertexPosition0,
					vertexPosition1, vertexPosition1, -vertexPosition1,
					vertexPosition1, vertexPosition1, vertexPosition1,

					vertexPosition1, vertexPosition1, -vertexPosition1,
					vertexPosition0, vertexPosition2, 0,
					vertexPosition1, vertexPosition1, vertexPosition1,

					vertexPosition1, -vertexPosition1, -vertexPosition1,
					0, -vertexPosition0, -vertexPosition2,
					vertexPosition2, 0, -vertexPosition0,

					0, -vertexPosition0, -vertexPosition2,
					0, vertexPosition0, -vertexPosition2,
					vertexPosition2, 0, -vertexPosition0,

					0, vertexPosition0, -vertexPosition2,
					vertexPosition1, vertexPosition1, -vertexPosition1,
					vertexPosition2, 0, -vertexPosition0,

					-vertexPosition1, -vertexPosition1, -vertexPosition1,
					-vertexPosition2, 0, -vertexPosition0,
					0, -vertexPosition0, -vertexPosition2,

					-vertexPosition2, 0, -vertexPosition0,
					-vertexPosition1, vertexPosition1, -vertexPosition1,
					0, -vertexPosition0, -vertexPosition2,

					-vertexPosition1, vertexPosition1, -vertexPosition1,
					0, vertexPosition0, -vertexPosition2,
					0, -vertexPosition0, -vertexPosition2,

					-vertexPosition0, -vertexPosition2, 0,
					-vertexPosition1, -vertexPosition1, vertexPosition1,
					-vertexPosition1, -vertexPosition1, -vertexPosition1,

					-vertexPosition1, -vertexPosition1, vertexPosition1,
					-vertexPosition2, 0, vertexPosition0,
					-vertexPosition1, -vertexPosition1, -vertexPosition1,

					-vertexPosition2, 0, vertexPosition0,
					-vertexPosition2, 0, -vertexPosition0,
					-vertexPosition1, -vertexPosition1, -vertexPosition1,

					0, vertexPosition0, -vertexPosition2,
					-vertexPosition1, vertexPosition1, -vertexPosition1,
					vertexPosition1, vertexPosition1, -vertexPosition1,

					-vertexPosition1, vertexPosition1, -vertexPosition1,
					-vertexPosition0, vertexPosition2, 0,
					vertexPosition1, vertexPosition1, -vertexPosition1,

					-vertexPosition0, vertexPosition2, 0,
					vertexPosition0, vertexPosition2, 0,
					vertexPosition1, vertexPosition1, -vertexPosition1,

					-vertexPosition2, 0, -vertexPosition0,
					-vertexPosition2, 0, vertexPosition0,
					-vertexPosition1, vertexPosition1, -vertexPosition1,

					-vertexPosition2, 0, vertexPosition0,
					-vertexPosition1, vertexPosition1, vertexPosition1,
					-vertexPosition1, vertexPosition1, -vertexPosition1,

					-vertexPosition1, vertexPosition1, vertexPosition1,
					-vertexPosition0, vertexPosition2, 0,
					-vertexPosition1, vertexPosition1, -vertexPosition1,

					-vertexPosition1, -vertexPosition1, vertexPosition1,
					0, -vertexPosition0, vertexPosition2,
					-vertexPosition2, 0, vertexPosition0,

					0, -vertexPosition0, vertexPosition2,
					0, vertexPosition0, vertexPosition2,
					-vertexPosition2, 0, vertexPosition0,

					0, vertexPosition0, vertexPosition2,
					-vertexPosition1, vertexPosition1, vertexPosition1,
					-vertexPosition2, 0, vertexPosition0,

					vertexPosition0, -vertexPosition2, 0,
					-vertexPosition0, -vertexPosition2, 0,
					vertexPosition1, -vertexPosition1, -vertexPosition1,

					-vertexPosition0, -vertexPosition2, 0,
					-vertexPosition1, -vertexPosition1, -vertexPosition1,
					vertexPosition1, -vertexPosition1, -vertexPosition1,

					-vertexPosition1, -vertexPosition1, -vertexPosition1,
					0, -vertexPosition0, -vertexPosition2,
					vertexPosition1, -vertexPosition1, -vertexPosition1,

					0, -vertexPosition0, vertexPosition2,
					vertexPosition1, -vertexPosition1, vertexPosition1,
					0, vertexPosition0, vertexPosition2,

					vertexPosition1, -vertexPosition1, vertexPosition1,
					vertexPosition2, 0, vertexPosition0,
					0, vertexPosition0, vertexPosition2,

					vertexPosition2, 0, vertexPosition0,
					vertexPosition1, vertexPosition1, vertexPosition1,
					0, vertexPosition0, vertexPosition2,

					vertexPosition1, -vertexPosition1, vertexPosition1,
					vertexPosition0, -vertexPosition2, 0,
					vertexPosition2, 0, vertexPosition0,

					vertexPosition0, -vertexPosition2, 0,
					vertexPosition1, -vertexPosition1, -vertexPosition1,
					vertexPosition2, 0, vertexPosition0,

					vertexPosition1, -vertexPosition1, -vertexPosition1,
					vertexPosition2, 0, -vertexPosition0,
					vertexPosition2, 0, vertexPosition0,

					-vertexPosition0, -vertexPosition2, 0,
					vertexPosition0, -vertexPosition2, 0,
					-vertexPosition1, -vertexPosition1, vertexPosition1,

					vertexPosition0, -vertexPosition2, 0,
					vertexPosition1, -vertexPosition1, vertexPosition1,
					-vertexPosition1, -vertexPosition1, vertexPosition1,

					vertexPosition1, -vertexPosition1, vertexPosition1,
					0, -vertexPosition0, vertexPosition2,
					-vertexPosition1, -vertexPosition1, vertexPosition1
				]), 3)
			);

			break;
		}
		case 'icosahedron': {
			const vertexPosition0 = 0.5576 * edgeLength,
				vertexPosition1 = 0.9022 * edgeLength;

			polyhedronGeometry.setAttribute(
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

					void getSpotLightInfo(const in SpotLight spotLight, out IncidentLight light) {
						light.direction = normalize(spotLight.position + vViewPosition);
						light.color = spotLight.color * max(smoothstep(spotLight.coneCos, spotLight.coneCos, dot(light.direction, spotLight.direction)), 0.0);
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

					#if NUM_DIR_LIGHTS > 0
						for (int i = 0; i < NUM_DIR_LIGHTS; i++) {
							reflectedLight += RE_Direct(directionalLights[i], normal);
						}
					#endif
					#if NUM_POINT_LIGHTS > 0
						for (int i = 0; i < NUM_POINT_LIGHTS; i++) {
							getPointLightInfo(pointLights[i], directLight);
							reflectedLight += RE_Direct(directLight, normal);
						}
					#endif
					#if NUM_SPOT_LIGHTS > 0
						for (int i = 0; i < NUM_SPOT_LIGHTS; i++) {
							getSpotLightInfo(spotLights[i], directLight);
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

	const edgesGeometry = new InstancedBufferGeometry();

	// The magic numbers below are modified from the position attribute of a
	// three.js EdgesGeometry of the polyhedron.
	// Each number is multiplied by 1.06066019082 (the same multiplier is
	// used in polyhedronGeometry).
	// To get them: console.log(new EdgesGeometry(polyhedronGeometry).attributes.position.array)

	switch (subType) {
		case 'tetrahedron': {
			const vertexPosition = 0.6123 * edgeLength;

			edgesGeometry.setAttribute('position', new BufferAttribute(
				new Float32Array([
					-vertexPosition, vertexPosition, -vertexPosition,
					vertexPosition, vertexPosition, vertexPosition,

					vertexPosition, -vertexPosition, -vertexPosition,
					vertexPosition, vertexPosition, vertexPosition,

					vertexPosition, vertexPosition, vertexPosition,
					-vertexPosition, -vertexPosition, vertexPosition,

					vertexPosition, -vertexPosition, -vertexPosition,
					-vertexPosition, -vertexPosition, vertexPosition,

					-vertexPosition, -vertexPosition, vertexPosition,
					-vertexPosition, vertexPosition, -vertexPosition,

					-vertexPosition, vertexPosition, -vertexPosition,
					vertexPosition, -vertexPosition, -vertexPosition
				]),
				3
			));

			break;
		}
		case 'octahedron': {
			edgesGeometry.setAttribute('position', new BufferAttribute(
				new Float32Array([
					edgeLength, 0, 0,
					0, 0, edgeLength,

					edgeLength, 0, 0,
					0, -edgeLength, 0,

					0, edgeLength, 0,
					edgeLength, 0, 0,

					edgeLength, 0, 0,
					0, 0, -edgeLength,

					0, edgeLength, 0,
					0, 0, -edgeLength,

					0, 0, -edgeLength,
					0, -edgeLength, 0,

					-edgeLength, 0, 0,
					0, 0, -edgeLength,

					0, -edgeLength, 0,
					0, 0, edgeLength,

					-edgeLength, 0, 0,
					0, -edgeLength, 0,

					0, 0, edgeLength,
					0, edgeLength, 0,

					0, edgeLength, 0,
					-edgeLength, 0, 0,

					-edgeLength, 0, 0,
					0, 0, edgeLength
				]),
				3
			));

			break;
		}
		case 'dodecahedron': {
			const vertexPosition0 = 0.3784 * edgeLength,
				vertexPosition1 = 0.6123 * edgeLength,
				vertexPosition2 = 0.9908 * edgeLength;

			edgesGeometry.setAttribute('position', new BufferAttribute(
				new Float32Array([
					vertexPosition0, vertexPosition2, 0,
					vertexPosition1, vertexPosition1, vertexPosition1,

					vertexPosition1, vertexPosition1, -vertexPosition1,
					vertexPosition2, 0, -vertexPosition0,

					0, vertexPosition0, -vertexPosition2,
					0, -vertexPosition0, -vertexPosition2,

					-vertexPosition2, 0, -vertexPosition0,
					-vertexPosition1, -vertexPosition1, -vertexPosition1,

					0, vertexPosition0, -vertexPosition2,
					-vertexPosition1, vertexPosition1, -vertexPosition1,

					vertexPosition1, vertexPosition1, -vertexPosition1,
					0, vertexPosition0, -vertexPosition2,

					-vertexPosition0, vertexPosition2, 0,
					vertexPosition0, vertexPosition2, 0,

					vertexPosition0, vertexPosition2, 0,
					vertexPosition1, vertexPosition1, -vertexPosition1,

					-vertexPosition2, 0, -vertexPosition0,
					-vertexPosition2, 0, vertexPosition0,

					-vertexPosition1, vertexPosition1, -vertexPosition1,
					-vertexPosition2, 0, -vertexPosition0,

					-vertexPosition1, vertexPosition1, vertexPosition1,
					-vertexPosition0, vertexPosition2, 0,

					-vertexPosition0, vertexPosition2, 0,
					-vertexPosition1, vertexPosition1, -vertexPosition1,

					-vertexPosition2, 0, vertexPosition0,
					-vertexPosition1, -vertexPosition1, vertexPosition1,

					0, vertexPosition0, vertexPosition2,
					-vertexPosition1, vertexPosition1, vertexPosition1,

					-vertexPosition1, vertexPosition1, vertexPosition1,
					-vertexPosition2, 0, vertexPosition0,

					-vertexPosition0, -vertexPosition2, 0,
					-vertexPosition1, -vertexPosition1, -vertexPosition1,

					-vertexPosition1, -vertexPosition1, -vertexPosition1,
					0, -vertexPosition0, -vertexPosition2,

					0, -vertexPosition0, -vertexPosition2,
					vertexPosition1, -vertexPosition1, -vertexPosition1,

					0, vertexPosition0, vertexPosition2,
					0, -vertexPosition0, vertexPosition2,

					vertexPosition2, 0, vertexPosition0,
					vertexPosition1, vertexPosition1, vertexPosition1,

					vertexPosition1, vertexPosition1, vertexPosition1,
					0, vertexPosition0, vertexPosition2,

					vertexPosition2, 0, vertexPosition0,
					vertexPosition1, -vertexPosition1, vertexPosition1,

					vertexPosition0, -vertexPosition2, 0,
					vertexPosition1, -vertexPosition1, -vertexPosition1,

					vertexPosition1, -vertexPosition1, -vertexPosition1,
					vertexPosition2, 0, -vertexPosition0,

					vertexPosition2, 0, -vertexPosition0,
					vertexPosition2, 0, vertexPosition0,

					-vertexPosition0, -vertexPosition2, 0,
					vertexPosition0, -vertexPosition2, 0,

					-vertexPosition1, -vertexPosition1, vertexPosition1,
					-vertexPosition0, -vertexPosition2, 0,

					vertexPosition0, -vertexPosition2, 0,
					vertexPosition1, -vertexPosition1, vertexPosition1,

					vertexPosition1, -vertexPosition1, vertexPosition1,
					0, -vertexPosition0, vertexPosition2,

					0, -vertexPosition0, vertexPosition2,
					-vertexPosition1, -vertexPosition1, vertexPosition1
				]),
				3
			));

			break;
		}
		case 'icosahedron': {
			const vertexPosition0 = 0.5576 * edgeLength,
				vertexPosition1 = 0.9022 * edgeLength;

			edgesGeometry.setAttribute('position', new BufferAttribute(
				new Float32Array([
					-vertexPosition0, vertexPosition1, 0,
					0, vertexPosition0, vertexPosition1,

					-vertexPosition0, vertexPosition1, 0,
					vertexPosition0, vertexPosition1, 0,

					-vertexPosition0, vertexPosition1, 0,
					0, vertexPosition0, -vertexPosition1,

					-vertexPosition1, 0, vertexPosition0,
					-vertexPosition0, vertexPosition1, 0,

					-vertexPosition0, vertexPosition1, 0,
					-vertexPosition1, 0, -vertexPosition0,

					vertexPosition0, vertexPosition1, 0,
					0, vertexPosition0, vertexPosition1,

					0, vertexPosition0, vertexPosition1,
					-vertexPosition1, 0, vertexPosition0,

					-vertexPosition1, 0, vertexPosition0,
					-vertexPosition1, 0, -vertexPosition0,

					-vertexPosition1, 0, -vertexPosition0,
					0, vertexPosition0, -vertexPosition1,

					0, vertexPosition0, -vertexPosition1,
					vertexPosition0, vertexPosition1, 0,

					vertexPosition0, -vertexPosition1, 0,
					0, -vertexPosition0, vertexPosition1,

					vertexPosition0, -vertexPosition1, 0,
					-vertexPosition0, -vertexPosition1, 0,

					vertexPosition0, -vertexPosition1, 0,
					0, -vertexPosition0, -vertexPosition1,

					vertexPosition1, 0, vertexPosition0,
					vertexPosition0, -vertexPosition1, 0,

					vertexPosition0, -vertexPosition1, 0,
					vertexPosition1, 0, -vertexPosition0,

					vertexPosition1, 0, vertexPosition0,
					0, vertexPosition0, vertexPosition1,

					0, vertexPosition0, vertexPosition1,
					0, -vertexPosition0, vertexPosition1,

					0, -vertexPosition0, vertexPosition1,
					vertexPosition1, 0, vertexPosition0,

					0, -vertexPosition0, vertexPosition1,
					-vertexPosition1, 0, vertexPosition0,

					-vertexPosition1, 0, vertexPosition0,
					-vertexPosition0, -vertexPosition1, 0,

					-vertexPosition0, -vertexPosition1, 0,
					0, -vertexPosition0, vertexPosition1,

					-vertexPosition0, -vertexPosition1, 0,
					-vertexPosition1, 0, -vertexPosition0,

					-vertexPosition1, 0, -vertexPosition0,
					0, -vertexPosition0, -vertexPosition1,

					0, -vertexPosition0, -vertexPosition1,
					-vertexPosition0, -vertexPosition1, 0,

					0, -vertexPosition0, -vertexPosition1,
					0, vertexPosition0, -vertexPosition1,

					0, vertexPosition0, -vertexPosition1,
					vertexPosition1, 0, -vertexPosition0,

					vertexPosition1, 0, -vertexPosition0,
					0, -vertexPosition0, -vertexPosition1,

					vertexPosition1, 0, -vertexPosition0,
					vertexPosition0, vertexPosition1, 0,

					vertexPosition0, vertexPosition1, 0,
					vertexPosition1, 0, vertexPosition0,

					vertexPosition1, 0, vertexPosition0,
					vertexPosition1, 0, -vertexPosition0

				]),
				3
			));

			break;
		}
	}

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

import {
	BufferAttribute,
	EdgesGeometry,
	Group,
	InstancedBufferAttribute,
	InstancedBufferGeometry,
	LineSegments,
	Mesh,
	ShaderMaterial,
	UniformsLib
} from '../../vendors/three.js';

import { getPopulatedCoordinateBuffer } from '../bufferUtils.js';

// See https://reference.wolfram.com/language/ref/UniformPolyhedron
// for the high-level description of what is being rendered.
export default function({ color, coords, edgeForm = {}, edgeLength = 1, opacity = 1, subType }, extent) {
	let polyhedronGeometry;

	// The magic numbers in the code bellow were captured multipling √(3/8) (see https://en.wikipedia.org/wiki/Tetrahedron#Coordinates_for_a_regular_tetrahedron) by each number of the respective three.js geometry's position and divided by 0.5773502588272095 (the unique number in three.js TetrahedronGeometry's position).

	switch (subType) {
		case 'tetrahedron': {
			const vertexPosition = 0.61237243569 * edgeLength;

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
			const vertexPosition0 = 0.61237243569 * edgeLength,
				vertexPosition1 = 0.37846700013 * edgeLength,
				vertexPosition2 = 0.99083940421 * edgeLength;

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
			const vertexPosition0 = 0.55762203476 * edgeLength,
				vertexPosition1 = 0.90225142642 * edgeLength;

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
					attribute vec3 polyhedronCenter;

					varying vec3 vViewPosition;

					void main() {
						vec4 mvPosition = modelViewMatrix * vec4(position + polyhedronCenter, 1);

						vViewPosition = -mvPosition.xyz;

						gl_Position = projectionMatrix * mvPosition;
					}
				`,
			fragmentShader: `
					#define FLAT_SHADED

					uniform vec3 diffuse;
					uniform vec3 emissive;
					uniform float roughness;
					uniform float metalness;
					uniform float opacity;
					varying vec3 vViewPosition;

					#include <common>
					#include <bsdfs>
					#include <lights_pars_begin>
					#include <lights_physical_pars_fragment>

					void main() {
						vec4 diffuseColor = vec4(diffuse, opacity);
						ReflectedLight reflectedLight = ReflectedLight(vec3(0), vec3(0), vec3(0), vec3(0));

						vec3 totalEmissiveRadiance = emissive;

						#include <roughnessmap_fragment>
						#include <metalnessmap_fragment>
						#include <normal_fragment_begin>
						#include <lights_physical_fragment>
						#include <lights_fragment_begin>
						#include <lights_fragment_maps>
						#include <lights_fragment_end>

						gl_FragColor = vec4(reflectedLight.directDiffuse + reflectedLight.indirectDiffuse, diffuseColor.a);
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
		new ShaderMaterial({
			uniforms: {
				color: { value: edgeForm.color ?? [0, 0, 0] }
			},
			vertexShader: `
					attribute vec3 polyhedronCenter;

					void main() {
						gl_Position = projectionMatrix * modelViewMatrix * vec4(position + polyhedronCenter, 1);
					}
				`,
			fragmentShader: `
					uniform vec3 color;

					void main() {
						gl_FragColor = vec4(color, 1);
					}
				`
		})
	);

	edges.frustumCulled = false;

	group.add(edges);

	return group;
};

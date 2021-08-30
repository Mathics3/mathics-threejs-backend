import {
	BufferAttribute,
	CylinderGeometry,
	Group,
	InstancedBufferAttribute,
	InstancedBufferGeometry,
	LineSegments,
	Mesh,
	ShaderMaterial,
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
					attribute vec3 cylinderBegin;
					attribute vec3 cylinderEnd;

					varying vec3 vLightFront;
					varying vec3 vIndirectFront;

					#include <common>
					#include <bsdfs>
					#include <lights_pars_begin>

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

						vec3 transformedNormal = normalMatrix * normal;

						#include <lights_lambert_vertex>
					}
				`,
			fragmentShader: `
					uniform vec3 diffuse;
					uniform float opacity;

					varying vec3 vLightFront;
					varying vec3 vIndirectFront;

					#include <common>
					#include <bsdfs>

					void main() {
						gl_FragColor = vec4(
							vLightFront * BRDF_Diffuse_Lambert(diffuse) + vIndirectFront * BRDF_Diffuse_Lambert(diffuse),
							opacity
						);
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

	// Differently from cuboid's edges, the cylinders's ones are in a different object. It is very hard or maybe impossible to draw edges with complex shapes in the fragment shader.

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
		new ShaderMaterial({
			uniforms: {
				color: { value: edgeForm.color ?? [0, 0, 0] }
			},
			vertexShader: `
					attribute vec3 cylinderBegin;
					attribute vec3 cylinderEnd;

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
}

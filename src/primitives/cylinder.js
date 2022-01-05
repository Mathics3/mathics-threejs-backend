import {
	BufferAttribute,
	CylinderGeometry,
	Group,
	InstancedBufferAttribute,
	InstancedBufferGeometry,
	LineSegments,
	Mesh,
	RawShaderMaterial
} from '../../vendors/three.js';

import { get2PopulatedCoordinateBuffers } from '../bufferUtils.js';
import { get2CoordinatesMaterial } from '../shader.js';

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
		'objectBegin',
		new InstancedBufferAttribute(cylindersBegin, 3)
	);

	cylinderGeometry.setAttribute(
		'objectEnd',
		new InstancedBufferAttribute(cylindersEnd, 3)
	);

	const cylinders = new Mesh(
		cylinderGeometry,
		get2CoordinatesMaterial(color, opacity)
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
					0.2588, -0.9659, 0,

					0.2588, -0.9659, 0,
					0.5, -0.866, 0,

					0.5, -0.866, 0,
					0.7071, -0.7071, 0,

					0.7071, -0.7071, 0,
					0.866, -0.5, 0,

					0.866, -0.5, 0,
					0.9659, -0.2588, 0,

					0.9659, -0.2588, 0,
					1, 0, 0,

					1, 0, 0,
					0.9659, 0.2588, 0,

					0.9659, 0.2588, 0,
					0.866, 0.5, 0,

					0.866, 0.5, 0,
					0.7071, 0.7071, 0,

					0.7071, 0.7071, 0,
					0.5, 0.866, 0,

					0.5, 0.866, 0,
					0.2588, 0.9659, 0,

					0.2588, 0.9659, 0,
					0, 1, 0,

					0, 1, 0,
					-0.2588, 0.9659, 0,

					-0.2588, 0.9659, 0,
					-0.5, 0.866, 0,

					-0.5, 0.866, 0,
					-0.7071, 0.7071, 0,

					-0.7071, 0.7071, 0,
					-0.866, 0.5, 0,

					-0.866, 0.5, 0,
					-0.9659, 0.2588, 0,

					-0.9659, 0.2588, 0,
					-1, 0, 0,

					-1, 0, 0,
					-0.9659, -0.2588, 0,

					-0.9659, -0.2588, 0,
					-0.866, -0.5, 0,

					-0.866, -0.5, 0,
					-0.7071, -0.7071, 0,

					-0.7071, -0.7071, 0,
					-0.5, -0.866, 0,

					-0.5, -0.866, 0,
					-0.2588, -0.9659, 0,

					-0.2588, -0.9659, 0,
					0, -1, 0,

					// second circle

					0.2588, -0.9659, -1,
					0, -1, -1,

					0.5, -0.866, -1,
					0.2588, -0.9659, -1,

					0.7071, -0.7071, -1,
					0.5, -0.866, -1,

					0.866, -0.5, -1,
					0.7071, -0.7071, -1,

					0.9659, -0.2588, -1,
					0.866, -0.5, -1,

					1, 0, -1,
					0.9659, -0.2588, -1,

					0.9659, 0.2588, -1,
					1, 0, -1,

					0.866, 0.5, -1,
					0.9659, 0.2588, -1,

					0.7071, 0.7071, -1,
					0.866, 0.5, -1,

					0.5, 0.866, -1,
					0.7071, 0.7071, -1,

					0.2588, 0.9659, -1,
					0.5, 0.866, -1,

					0, 1, -1,
					0.2588, 0.9659, -1,

					-0.2588, 0.9659, -1,
					0, 1, -1,

					-0.5, 0.866, -1,
					-0.2588, 0.9659, -1,

					-0.7071, 0.7071, -1,
					-0.5, 0.866, -1,

					-0.866, 0.5, -1,
					-0.7071, 0.7071, -1,

					-0.9659, 0.2588, -1,
					-0.866, 0.5, -1,

					-1, 0, -1,
					-0.9659, 0.2588, -1,

					-0.9659, -0.2588, -1,
					-1, 0, -1,

					-0.866, -0.5, -1,
					-0.9659, -0.2588, -1,

					-0.7071, -0.7071, -1,
					-0.866, -0.5, -1,

					-0.5, -0.866, -1,
					-0.7071, -0.7071, -1,

					-0.2588, -0.9659, -1,
					-0.5, -0.866, -1,

					0, -1, -1,
					-0.2588, -0.9659, -1
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

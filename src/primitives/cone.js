import {
	BufferAttribute,
	Group,
	InstancedBufferAttribute,
	InstancedBufferGeometry,
	Line,
	Mesh,
	RawShaderMaterial
} from '../../vendors/three.js';

import { get2PopulatedCoordinateBuffers } from '../bufferUtils.js';
import { get2CoordinatesMaterial } from '../shader.js';

// See the comments from primitives/index.js for more information about the
// shape of a primitive function.
// See https://reference.wolfram.com/language/ref/Cone
// for the high-level description of what is being rendered.
export default function ({ color = [1, 1, 1], coords, edgeForm = {}, opacity = 1, radius = 1 }, uniforms, extent) {
	const [coneBases, coneTips] = get2PopulatedCoordinateBuffers(coords, extent);

	const vertexPosition0 = 0.2588 * radius,
		vertexPosition1 = 0.5 * radius,
		vertexPosition2 = 0.7071 * radius,
		vertexPosition3 = 0.866 * radius,
		vertexPosition4 = 0.9659 * radius;

	const coneGeometry = new InstancedBufferGeometry()
		.setAttribute(
			'position',
			new BufferAttribute(new Float32Array([
				// cone tip
				0, 0, -1,

				// base
				0, -radius, 0,
				vertexPosition0, -vertexPosition4, 0,
				vertexPosition1, -vertexPosition3, 0,
				vertexPosition2, -vertexPosition2, 0,
				vertexPosition3, -vertexPosition1, 0,
				vertexPosition4, -vertexPosition0, 0,
				radius, 0, 0,
				vertexPosition4, vertexPosition0, 0,
				vertexPosition3, vertexPosition1, 0,
				vertexPosition2, vertexPosition2, 0,
				vertexPosition1, vertexPosition3, 0,
				vertexPosition0, vertexPosition4, 0,
				0, radius, 0,
				-vertexPosition0, vertexPosition4, 0,
				-vertexPosition1, vertexPosition3, 0,
				-vertexPosition2, vertexPosition2, 0,
				-vertexPosition3, vertexPosition1, 0,
				-vertexPosition4, vertexPosition0, 0,
				-radius, 0, 0,
				-vertexPosition4, -vertexPosition0, 0,
				-vertexPosition3, -vertexPosition1, 0,
				-vertexPosition2, -vertexPosition2, 0,
				-vertexPosition1, -vertexPosition3, 0,
				-vertexPosition0, -vertexPosition4, 0
			]), 3)
		)
		.setAttribute(
			'normal',
			new BufferAttribute(new Float32Array([
				// cone body
				0, -0.7070, 0.7070,
				0.1759, -0.7071, 0.6849,
				0.3407, -0.7071, 0.6196,
				0.4841, -0.7071, 0.5155,
				0.5969, -0.7071, 0.3791,
				0.6725, -0.7071, 0.2185,
				0.7057, -0.7071, 0.04438,
				0.6945, -0.7071, -0.1327,
				0.6398, -0.7071, -0.3011,
				0.5448, -0.7071, -0.4508,
				0.4156, -0.7071, -0.5720,
				0.2603, -0.7071, -0.6575,
				0.08867, -0.7071, -0.7015,
				-0.08867, -0.7071, -0.7015,
				-0.2603, -0.7071, -0.6575,
				-0.4156, -0.7071, -0.5720,
				-0.5448, -0.7071, -0.4508,
				-0.6398, -0.7071, -0.3011,
				-0.6945, -0.7071, -0.1327,
				-0.7057, -0.7071, 0.04438,
				-0.6725, -0.7071, 0.2185,
				-0.5969, -0.7071, 0.3791,
				-0.4841, -0.7071, 0.5155,
				-0.3407, -0.7071, 0.6196,
				-0.1759, -0.7071, 0.6849,
				0, -0.7070, 0.7070,

				// cone base
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0
			]), 3)
		)
		.setAttribute(
			'objectBegin',
			new InstancedBufferAttribute(coneBases, 3)
		)
		.setAttribute(
			'objectEnd',
			new InstancedBufferAttribute(coneTips, 3)
		)
		.setIndex([
			// cone base
			2, 3, 4,
			4, 5, 6,
			4, 6, 8,
			6, 7, 8,
			8, 9, 10,
			8, 10, 12,
			8, 12, 16,
			10, 11, 12,
			12, 13, 14,
			12, 14, 16,
			14, 15, 16,
			16, 17, 18,
			16, 18, 20,
			16, 20, 24,
			18, 19, 20,
			20, 21, 22,
			20, 22, 24,
			22, 23, 24,
			24, 1, 2,
			24, 2, 4,
			24, 4, 8,
			24, 8, 16,

			// cone body
			0, 2, 1,
			0, 3, 2,
			0, 4, 3,
			0, 5, 4,
			0, 6, 5,
			0, 7, 6,
			0, 8, 7,
			0, 9, 8,
			0, 10, 9,
			0, 11, 10,
			0, 12, 11,
			0, 13, 12,
			0, 14, 13,
			0, 15, 14,
			0, 16, 15,
			0, 17, 16,
			0, 18, 17,
			0, 19, 18,
			0, 20, 19,
			0, 21, 20,
			0, 22, 21,
			0, 23, 22,
			0, 24, 23,
			0, 1, 24
		]);

	coneGeometry.instanceCount = coords.length / 2;

	const cones = new Mesh(
		coneGeometry,
		get2CoordinatesMaterial(color, opacity, uniforms)
	);

	cones.frustumCulled = false;

	if (edgeForm.showEdges === false) {
		// If the edges aren't shown the work is done.
		return cones;
	}

	const group = new Group();

	group.add(cones);

	// Differently from cuboid's edges, the cones' ones are in a different object. It is very hard or maybe impossible to draw edges with complex shapes in the fragment shader.

	// The lines below are the cone base edges' vertices' positions.
	// The magic numbers below are modified from the position attribute of a three.js EdgesGeometry of the cone.
	// Differently from cylinders' edges, the cones' ones are drawed through Line, now LineSegments, so before putting them in the code we need to remove the repeated numbers. This saves RAM and increases the performance.
	// To get them: console.log(new EdgesGeometry(coneGeometry).attributes.position.array)

	const edgesGeometry = new InstancedBufferGeometry()
		.setAttribute(
			'position',
			new BufferAttribute(
				new Float32Array([
					0, -radius, 0,
					vertexPosition0, -vertexPosition4, 0,
					vertexPosition1, -vertexPosition3, 0,
					vertexPosition2, -vertexPosition2, 0,
					vertexPosition3, -vertexPosition1, 0,
					vertexPosition4, -vertexPosition0, 0,
					radius, 0, 0,
					vertexPosition4, vertexPosition0, 0,
					vertexPosition3, vertexPosition1, 0,
					vertexPosition2, vertexPosition2, 0,
					vertexPosition1, vertexPosition3, 0,
					vertexPosition0, vertexPosition4, 0,
					0, radius, 0,
					-vertexPosition0, vertexPosition4, 0,
					-vertexPosition1, vertexPosition3, 0,
					-vertexPosition2, vertexPosition2, 0,
					-vertexPosition3, vertexPosition1, 0,
					-vertexPosition4, vertexPosition0, 0,
					-radius, 0, 0,
					-vertexPosition4, -vertexPosition0, 0,
					-vertexPosition3, -vertexPosition1, 0,
					-vertexPosition2, -vertexPosition2, 0,
					-vertexPosition1, -vertexPosition3, 0,
					-vertexPosition0, -vertexPosition4, 0,
					0, -radius, 0
				]),
				3
			)
		)
		.setAttribute(
			'coneBase',
			new InstancedBufferAttribute(coneBases, 3)
		)
		.setAttribute(
			'coneTip',
			new InstancedBufferAttribute(coneTips, 3)
		);

	edgesGeometry.instanceCount = coords.length / 2;

	edgeForm.color ??= [0, 0, 0];

	const edges = new Line(
		edgesGeometry,
		new RawShaderMaterial({
			vertexShader: `#version 300 es
				in vec3 position;
				in vec3 coneBase;
				in vec3 coneTip;

				uniform mat4 projectionMatrix;
				uniform mat4 modelViewMatrix;

				void main() {
					vec3 z = normalize(coneBase - coneTip);
					// If z.z is 0 the edges doesn't appear.
					z.z += 0.0001;

					vec3 x = normalize(cross(vec3(0, 1, 0), z));
					vec3 y = cross(z, x);

					// position and rotate the edges
					mat4 coneMatrix = mat4(
						x, 0,       // row 0
						y, 0,       // row 1
						z, 0,       // row 2
						coneBase, 1 // row 3
					);

					gl_Position = projectionMatrix * modelViewMatrix * coneMatrix * vec4(position, 1);
				}
			`,
			fragmentShader: `#version 300 es
				out lowp vec4 pc_fragColor;

				void main() {
					pc_fragColor = vec4(
						${edgeForm.color[0]},
						${edgeForm.color[1]},
						${edgeForm.color[2]},
						1
					);
				}
			`
		})
	);

	edges.frustumCulled = false;

	group.add(edges);

	return group;
}

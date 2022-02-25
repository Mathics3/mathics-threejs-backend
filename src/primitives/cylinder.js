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
// See https://mathics3.github.io/mathics-threejs-backend/primitives/cylinder
// for the high-level description of what is being rendered.
export default function ({ color = [1, 1, 1], coords, edgeForm = {}, opacity = 1, radius = 1 }, uniforms, extent) {
	const [cylindersBegin, cylindersEnd] = get2PopulatedCoordinateBuffers(coords, extent);

	const vertexPosition0 = 0.2588 * radius,
		vertexPosition1 = 0.5 * radius,
		vertexPosition2 = 0.7071 * radius,
		vertexPosition3 = 0.866 * radius,
		vertexPosition4 = 0.9659 * radius;

	// There can be only 1 normal per vertex, so we need to duplicate the
	// vertices bellow as the normal of the cylinder's bottom/top is different
	// from the normal of the cylinder body.

	const cylinderGeometry = new InstancedBufferGeometry()
		.setAttribute(
			'position',
			new BufferAttribute(new Float32Array([
				// bottom
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

				// top
				0, -radius, -1,
				vertexPosition0, -vertexPosition4, -1,
				vertexPosition1, -vertexPosition3, -1,
				vertexPosition2, -vertexPosition2, -1,
				vertexPosition3, -vertexPosition1, -1,
				vertexPosition4, -vertexPosition0, -1,
				radius, 0, -1,
				vertexPosition4, vertexPosition0, -1,
				vertexPosition3, vertexPosition1, -1,
				vertexPosition2, vertexPosition2, -1,
				vertexPosition1, vertexPosition3, -1,
				vertexPosition0, vertexPosition4, -1,
				0, radius, -1,
				-vertexPosition0, vertexPosition4, -1,
				-vertexPosition1, vertexPosition3, -1,
				-vertexPosition2, vertexPosition2, -1,
				-vertexPosition3, vertexPosition1, -1,
				-vertexPosition4, vertexPosition0, -1,
				-radius, 0, -1,
				-vertexPosition4, -vertexPosition0, -1,
				-vertexPosition3, -vertexPosition1, -1,
				-vertexPosition2, -vertexPosition2, -1,
				-vertexPosition1, -vertexPosition3, -1,
				-vertexPosition0, -vertexPosition4, -1,

				// body bottom
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

				// body top
				0, -radius, -1,
				vertexPosition0, -vertexPosition4, -1,
				vertexPosition1, -vertexPosition3, -1,
				vertexPosition2, -vertexPosition2, -1,
				vertexPosition3, -vertexPosition1, -1,
				vertexPosition4, -vertexPosition0, -1,
				radius, 0, -1,
				vertexPosition4, vertexPosition0, -1,
				vertexPosition3, vertexPosition1, -1,
				vertexPosition2, vertexPosition2, -1,
				vertexPosition1, vertexPosition3, -1,
				vertexPosition0, vertexPosition4, -1,
				0, radius, -1,
				-vertexPosition0, vertexPosition4, -1,
				-vertexPosition1, vertexPosition3, -1,
				-vertexPosition2, vertexPosition2, -1,
				-vertexPosition3, vertexPosition1, -1,
				-vertexPosition4, vertexPosition0, -1,
				-radius, 0, -1,
				-vertexPosition4, -vertexPosition0, -1,
				-vertexPosition3, -vertexPosition1, -1,
				-vertexPosition2, -vertexPosition2, -1,
				-vertexPosition1, -vertexPosition3, -1,
				-vertexPosition0, -vertexPosition4, -1
			]), 3)
		)
		.setAttribute(
			'normal',
			new BufferAttribute(new Float32Array([
				// To get the magic numbers uncomment the lines bellow.
				// cylinderGeometry.computeVertexNormals();
				// console.log(cylinderGeometry.attributes.normal);
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, -1,
				0, 0, 0,
				0, 0, -1,
				-0.0438, -0.999, 0,
				0.2163, -0.9763, 0,
				0.4615, -0.8871, 0,
				0.6754, -0.7374, 0,
				0.8433, -0.5374, 0,
				0.9536, -0.3009, 0,
				0.999, -0.0438, 0,
				0.9763, 0.2163, 0,
				0.8871, 0.4615, 0,
				0.7374, 0.6754, 0,
				0.5374, 0.8433, 0,
				0.3009, 0.9536, 0,
				0.0438, 0.999, 0,
				-0.2163, 0.9763, 0,
				-0.4615, 0.8871, 0,
				-0.6754, 0.7374, 0,
				-0.8433, 0.5374, 0,
				-0.9536, 0.3009, 0,
				-0.999, 0.0438, 0,
				-0.9763, -0.2163, 0,
				-0.8871, -0.4615, 0,
				-0.7374, -0.6754, 0,
				-0.5374, -0.8433, 0,
				-0.3009, -0.9536, 0,
				0.0438, -0.999, 0,
				0.3009, -0.9536, 0,
				0.5374, -0.8433, 0,
				0.7374, -0.6754, 0,
				0.8871, -0.4615, 0,
				0.9763, -0.2163, 0,
				0.999, 0.0438, 0,
				0.9536, 0.3009, 0,
				0.8433, 0.5374, 0,
				0.6754, 0.7374, 0,
				0.4615, 0.8871, 0,
				0.2163, 0.9763, 0,
				-0.0438, 0.999, 0,
				-0.3009, 0.9536, 0,
				-0.5374, 0.8433, 0,
				-0.7374, 0.6754, 0,
				-0.8871, 0.4615, 0,
				-0.9763, 0.2163, 0,
				-0.999, -0.0438, 0,
				-0.9536, -0.3009, 0,
				-0.8433, -0.5374, 0,
				-0.6754, -0.7374, 0,
				-0.4615, -0.8871, 0,
				-0.2163, -0.9763, 0
			]), 3)
		)
		.setAttribute(
			'objectBegin',
			new InstancedBufferAttribute(cylindersBegin, 3)
		)
		.setAttribute(
			'objectEnd',
			new InstancedBufferAttribute(cylindersEnd, 3)
		)
		.setIndex([
			// cylinder bottom
			1, 2, 3,
			3, 4, 5,
			3, 5, 7,
			5, 6, 7,
			7, 8, 9,
			7, 9, 11,
			7, 11, 15,
			9, 10, 11,
			11, 12, 13,
			11, 13, 15,
			13, 14, 15,
			15, 16, 17,
			15, 17, 19,
			15, 19, 23,
			17, 18, 19,
			19, 20, 21,
			19, 21, 23,
			21, 22, 23,
			23, 0, 1,
			23, 1, 3,
			23, 3, 7,
			23, 7, 15,

			// cylinder top
			27, 26, 25,
			29, 28, 27,
			31, 29, 27,
			31, 30, 29,
			33, 32, 31,
			35, 33, 31,
			39, 35, 31,
			35, 34, 33,
			37, 36, 35,
			39, 37, 35,
			39, 38, 37,
			41, 40, 39,
			43, 41, 39,
			47, 43, 39,
			43, 42, 41,
			45, 44, 43,
			47, 45, 43,
			47, 46, 46,
			45, 25, 24,
			47, 27, 25,
			47, 31, 27,
			47, 39, 31,

			// cylinder body
			49, 72, 73,
			72, 49, 48,

			50, 73, 74,
			73, 50, 49,

			51, 74, 75,
			74, 51, 50,

			52, 75, 76,
			75, 52, 51,

			53, 76, 77,
			76, 53, 52,

			54, 77, 78,
			77, 54, 53,

			55, 78, 79,
			78, 55, 54,

			56, 79, 80,
			79, 56, 55,

			57, 80, 81,
			80, 57, 56,

			58, 81, 82,
			81, 58, 57,

			59, 82, 83,
			82, 59, 58,

			60, 83, 84,
			83, 60, 59,

			61, 84, 85,
			84, 61, 60,

			62, 85, 86,
			85, 62, 61,

			63, 86, 87,
			86, 63, 62,

			64, 87, 88,
			87, 64, 63,

			65, 88, 89,
			88, 65, 64,

			66, 89, 90,
			89, 66, 65,

			67, 90, 91,
			90, 67, 66,

			68, 91, 92,
			91, 68, 67,

			69, 92, 93,
			92, 69, 68,

			70, 93, 94,
			93, 70, 69,

			71, 94, 95,
			94, 71, 70,

			48, 95, 72,
			95, 48, 71
		]);

	cylinderGeometry.instanceCount = coords.length / 2;

	const cylinders = new Mesh(
		cylinderGeometry,
		get2CoordinatesMaterial(color, opacity, uniforms)
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
					0, -radius, 0,

					// There will be a line passing through the cylinder if we
					// don't place NaNs here.
					NaN, NaN, NaN,

					// second circle
					0, -radius, -1,
					vertexPosition0, -vertexPosition4, -1,
					vertexPosition1, -vertexPosition3, -1,
					vertexPosition2, -vertexPosition2, -1,
					vertexPosition3, -vertexPosition1, -1,
					vertexPosition4, -vertexPosition0, -1,
					radius, 0, -1,
					vertexPosition4, vertexPosition0, -1,
					vertexPosition3, vertexPosition1, -1,
					vertexPosition2, vertexPosition2, -1,
					vertexPosition1, vertexPosition3, -1,
					vertexPosition0, vertexPosition4, -1,
					0, radius, -1,
					-vertexPosition0, vertexPosition4, -1,
					-vertexPosition1, vertexPosition3, -1,
					-vertexPosition2, vertexPosition2, -1,
					-vertexPosition3, vertexPosition1, -1,
					-vertexPosition4, vertexPosition0, -1,
					-radius, 0, -1,
					-vertexPosition4, -vertexPosition0, -1,
					-vertexPosition3, -vertexPosition1, -1,
					-vertexPosition2, -vertexPosition2, -1,
					-vertexPosition1, -vertexPosition3, -1,
					-vertexPosition0, -vertexPosition4, -1,
					0, -radius, -1
				]),
				3
			)
		);

	edgesGeometry.instanceCount = coords.length / 2;

	edgesGeometry.setAttribute(
		'cylinderBegin',
		new InstancedBufferAttribute(cylindersBegin, 3)
	);

	edgesGeometry.setAttribute(
		'cylinderEnd',
		new InstancedBufferAttribute(cylindersEnd, 3)
	);

	edgeForm.color ??= [0, 0, 0];

	const edges = new Line(
		edgesGeometry,
		new RawShaderMaterial({
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

					// position and rotate the edges
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

import {
	BufferAttribute,
	BufferGeometry,
	Group,
	Line,
	Matrix4,
	Mesh,
	Vector3
} from '../../vendors/three.js';

import { getPopulatedCoordinateBuffer } from '../bufferUtils.js';
import { scaleCoordinate } from '../coordinateUtils.js';
import { getBasicMaterial } from '../shader.js';

// See the comments from primitives/index.js for more information about the
// shape of a primitive function.
// See https://reference.wolfram.com/language/ref/Arrow
// for the high-level description of what is being rendered.
export default function ({ color = [0, 0, 0], coords, opacity = 1 }, uniforms, extent) {
	const material = getBasicMaterial(color, opacity);

	const group = new Group();

	// last coordinate but one
	const startCoordinate = new Vector3(
		...(coords[coords.length - 2][0] ?? scaleCoordinate(coords[coords.length - 2][1], extent))
	);

	// last coordinate
	const endCoordinate = new Vector3(
		...(coords[coords.length - 1][0] ?? scaleCoordinate(coords[coords.length - 1][1], extent))
	);

	const arrowHeadHeight = 0.2 * startCoordinate.distanceTo(endCoordinate);

	const vertexPosition0 = 0.2 * arrowHeadHeight,
		vertexPosition1 = 0.1414 * arrowHeadHeight;

	// arrow head
	group.add(new Mesh(
		new BufferGeometry()
			.setAttribute(
				'position',
				new BufferAttribute(new Float32Array([
					// arrow tip
					0, 0, 0,

					// arrow tip base
					vertexPosition0, 0, -arrowHeadHeight,
					vertexPosition1, vertexPosition1, -arrowHeadHeight,
					0, vertexPosition0, -arrowHeadHeight,
					-vertexPosition1, vertexPosition1, -arrowHeadHeight,
					-vertexPosition0, 0, -arrowHeadHeight,
					-vertexPosition1, -vertexPosition1, -arrowHeadHeight,
					0, -vertexPosition0, -arrowHeadHeight,
					vertexPosition1, -vertexPosition1, -arrowHeadHeight
				]), 3)
			)
			.applyMatrix4(
				new Matrix4()
					.setPosition(endCoordinate)
					.lookAt(
						endCoordinate,
						startCoordinate,
						new Vector3(0, 1, 0)
					)
			)
			.setIndex([
				// arrow tip base
				2, 1, 8,
				4, 3, 2,
				6, 5, 4,
				8, 7, 6,
				4, 2, 8,
				8, 6, 4,

				// arrow tip body
				0, 1, 2,
				0, 2, 3,
				0, 3, 4,
				0, 4, 5,
				0, 5, 6,
				0, 6, 7,
				0, 7, 8,
				0, 8, 1
			]),
		material
	));

	// arrow body
	group.add(
		new Line(
			new BufferGeometry().setAttribute(
				'position',
				new BufferAttribute(
					getPopulatedCoordinateBuffer(coords, extent),
					3
				)
			),
			material
		)
	);

	return group;
}

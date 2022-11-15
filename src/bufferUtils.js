// @ts-check

import { scaleCoordinate } from './coordinateUtils.js';

/** @typedef {import('./coordinateUtils.js').Coordinate} Coordinate */

/**
 * Copy a 3-element array into a buffer given an index.
 * The 1st element will go into index * 3.
 * The 2nd element will go into index * 3 + 1.
 * The 3rd element will go into index * 3 + 2.
 * This is usually used to copy a coordinate into a coordinate buffer.
 * The coordinates buffers are preallocated for efficiency on GPUs.
 * Also, WebGL only accepts a typed array as an attribute.
 *
 * @param {{ [index: number]: number }} buffer
 * @param {import('./coordinateUtils.js').Coordinate} array
 * @param {number} index
 */
export function copyArray3IntoBuffer(buffer, array, index) {
	buffer[index * 3] = array[0];
	buffer[index * 3 + 1] = array[1];
	buffer[index * 3 + 2] = array[2];
}

/**
 * Copy a Vector3 into a buffer given an index.
 * The x value will go into index * 3.
 * The y value will go into index * 3 + 1.
 * The z value will go into index * 3 + 2.
 * The same as {@link copyArray3IntoBuffer}, but with
 * a Vector3 instead of a 3-element array.
 * @param {{ [index: number]: number }} buffer
 * @param {import('../vendors/three.js').Vector3} vector
 * @param {number} index
 */
export function copyVector3IntoBuffer(buffer, vector, index) {
	buffer[index * 3] = vector.x;
	buffer[index * 3 + 1] = vector.y;
	buffer[index * 3 + 2] = vector.z;
}

/**
 * Create a coordinate buffer and copy the coordinates from coords to it.
 * @param {Array<[Coordinate, null] | [null, Coordinate]>} coords
 * @param {import('./extent.js').Extent} extent
 * @returns a coordinate buffer populated with the coordinates from coords
 */
export function getPopulatedCoordinateBuffer(coords, extent) {
	const coordinateBuffer = new Float32Array(coords.length * 3);

	// The coordinates are in the form [[x, y, z]] or [null, [x, y, z]]
	// and copyIntoCoordinateBuffer receives a list, so we need to:
	// - transform [null, [x, y, z]] into [x, y, z].
	//   This is done through scaleCoordinate.
	// - transform [[x, y, z]] into [x, y, z].
	//   This is done taking the first element of the list.

	coords.forEach((coordinate, i) =>
		copyArray3IntoBuffer(
			coordinateBuffer,
			coordinate[0] ?? scaleCoordinate(coordinate[1], extent),
			i
		)
	);

	return coordinateBuffer;
}

/**
 * Create 2 coordinate buffers and copy the even-numbered coordinates from
 * coords to the 1st coordinate buffer and the odd-numbered ones to the 2nd.
 * This is useful when the primitive have a begin and a end coordinate.
 * Both can't be in the same BufferAttribute.
 * @param {Array<[Coordinate, null] | [null, Coordinate]>} coords
 * @param {import('./extent.js').Extent} extent
 * @returns an array with the 2 coordinate buffers
 */
export function get2PopulatedCoordinateBuffers(coords, extent) {
	// number of vertices per coordinate / number of coordinates per primitive = 3 / 2
	const coordinateBuffer1 = new Float32Array(coords.length * 1.5);
	const coordinateBuffer2 = new Float32Array(coords.length * 1.5);

	for (let i = 0; i < coords.length / 2; i++) {
		copyArray3IntoBuffer(
			coordinateBuffer1,
			coords[i * 2][0] ?? scaleCoordinate(
				/** @type {Coordinate} */(coords[i * 2][1]),
				extent
			),
			i
		);

		copyArray3IntoBuffer(
			coordinateBuffer2,
			coords[i * 2 + 1][0] ?? scaleCoordinate(
				/** @type {Coordinate} */(coords[i * 2 + 1][1]),
				extent
			),
			i
		);
	}

	return [coordinateBuffer1, coordinateBuffer2];
}

import scaleCoordinate from './scaleCoordinate.js';

// coordinateBuffer is preallocated for efficiency on GPUs. Also, WebGL only accepts a typed array as an attribute.
function copyIntoCoordinateBuffer(coordinateBuffer, coordinate, index) {
	coordinateBuffer[index * 3] = coordinate[0];
	coordinateBuffer[index * 3 + 1] = coordinate[1];
	coordinateBuffer[index * 3 + 2] = coordinate[2];
}

// Create a coordinate buffer and copy the coordinates from coords to it.
// The coordinates are in the form [[x, y, z]] or [null, [x, y, z]] and copyIntoCoordinateBuffer receives a list, so we need to:
// - transform [null, [x, y, z]] into [x, y, z]. This is done through scaleCoordinate.
// - transform [[x, y, z]] into [x, y, z]. This is done taking the first element of the list.
export function getPopulatedCoordinateBuffer(coords, extent) {
	const coordinateBuffer = new Float32Array(coords.length * 3);

	coords.forEach((coordinate, i) =>
		copyIntoCoordinateBuffer(
			coordinateBuffer,
			coordinate[0] ?? scaleCoordinate(coordinate[1], extent),
			i
		)
	);

	return coordinateBuffer;
}

// Create 2 coordinate buffers and copy the even-numbered coordinates from coords to the 1st coordinate buffer and the odd-numbered ones to the 2nd.
// This is usuful when the primitive have a begin and a end coordinate. Both can't be in the same BufferAttribute.
// Returns an array with the 2 coordinate buffers
export function get2PopulatedCoordinateBuffers(coords, extent) {
	// number of vertices per coordinate / number of coordinates per primitive = 3 / 2
	const coordinateBuffer1 = new Float32Array(coords.length * 1.5);
	const coordinateBuffer2 = new Float32Array(coords.length * 1.5);

	for (let i = 0; i < coords.length / 2; i++) {
		copyIntoCoordinateBuffer(
			coordinateBuffer1,
			coords[i * 2][0] ?? scaleCoordinate(coords[i * 2][1], extent),
			i
		);

		copyIntoCoordinateBuffer(
			coordinateBuffer2,
			coords[i * 2 + 1][0] ?? scaleCoordinate(coords[i * 2 + 1][1], extent),
			i
		);
	}

	return [coordinateBuffer1, coordinateBuffer2];
}

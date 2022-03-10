// @ts-check

/** @typedef {[number, number, number]} Coordinate */

/**
 * Scale a coordinate (usually the 2nd element of a higher-order coordinate)
 * to the size of the bounding box. e.g.:
 * (0, 0, 0) is the lower-front-left of the bounding box.
 * (1, 1, 1) is the upper-back-right of the bounding box.
 * @param {Coordinate} coordinate
 * @param {import('./extent').Extent} extent
 * @returns {Coordinate}
 */
export function scaleCoordinate(coordinate, extent) {
	return [
		coordinate[0] * (extent.xmax - extent.xmin) + extent.xmin,
		coordinate[1] * (extent.ymax - extent.ymin) + extent.ymin,
		coordinate[2] * (extent.zmax - extent.zmin) + extent.zmin
	];
}

/**
 * i is 0 for x, 1 for y and 2 for z.
 * @param {number} partialCoordinate
 * @param {0 | 1 | 2} i
 * @param {import('./extent').Extent} extent
 * @returns partialCoordinate * (extent.imax - extent.imin) + extent.imin
 */
export function scalePartialCoordinate(partialCoordinate, i, extent) {
	if (i === 0) {
		return partialCoordinate * (extent.xmax - extent.xmin) + extent.xmin;
	} else if (i === 1) {
		return partialCoordinate * (extent.ymax - extent.ymin) + extent.ymin;
	} else { // i === 2
		return partialCoordinate * (extent.zmax - extent.zmin) + extent.zmin;
	}
}

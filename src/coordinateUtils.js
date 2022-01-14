export function scaleCoordinate(coordinate, extent) {
	return [
		coordinate[0] * (extent.xmax - extent.xmin) + extent.xmin,
		coordinate[1] * (extent.ymax - extent.ymin) + extent.ymin,
		coordinate[2] * (extent.zmax - extent.zmin) + extent.zmin
	];
}

// Multiply partialCoordinate by (extent.`i`max - extent.`i`min) and add
// extent.`i`min.
// i is 0 for x, 1 for y and 2 for z.
export function scalePartialCoordinate(partialCoordinate, i, extent) {
	if (i === 0) {
		return partialCoordinate * (extent.xmax - extent.xmin) + extent.xmin;
	} else if (i === 1) {
		return partialCoordinate * (extent.ymax - extent.ymin) + extent.ymin;
	} else { // i === 2
		return partialCoordinate * (extent.zmax - extent.zmin) + extent.zmin;
	}
}

export default function (elements) {
	const extent = {
		xmin: 0,
		ymin: 0,
		zmin: 0,
		xmax: 1,
		ymax: 1,
		zmax: 1
	};

	let isFirstCoordinate = true;

	elements.forEach((element) => {
		if (
			element.type === 'arrow' ||
			element.type === 'cuboid' ||
			element.type === 'line' ||
			element.type === 'polygon'
		) {
			element.coords.forEach(((coordinate) => {
				if (coordinate[0]) {
					if (isFirstCoordinate) {
						extent.xmin = coordinate[0][0];
						extent.xmax = coordinate[0][0];
						extent.ymin = coordinate[0][1];
						extent.ymax = coordinate[0][1];
						extent.zmin = coordinate[0][2];
						extent.zmax = coordinate[0][2];

						isFirstCoordinate = false;
					} else {
						if (coordinate[0][0] < extent.xmin) {
							extent.xmin = coordinate[0][0];
						} else if (coordinate[0][0] > extent.xmax) {
							extent.xmax = coordinate[0][0];
						}

						if (coordinate[0][1] < extent.ymin) {
							extent.ymin = coordinate[0][1];
						} else if (coordinate[0][1] > extent.ymax) {
							extent.ymax = coordinate[0][1];
						}

						if (coordinate[0][2] < extent.zmin) {
							extent.zmin = coordinate[0][2];
						} else if (coordinate[0][2] > extent.zmax) {
							extent.zmax = coordinate[0][2];
						}
					}
				}
			}));
		} else {
			// The extent isn't calculated correctly for cylinders, their extent should be transformationVector * radius.
			// The calculated extent for polyhedrons is approximated.
			// The calculated extent for tubes is approximated.

			const radius = element.radius ?? element.pointSize ?? element.edgeLength ?? 1;

			element.coords.forEach((coordinate => {
				if (coordinate[0]) {
					if (isFirstCoordinate) {
						extent.xmin = coordinate[0][0] - radius;
						extent.xmax = coordinate[0][0] + radius;
						extent.ymin = coordinate[0][1] - radius;
						extent.ymax = coordinate[0][1] + radius;
						extent.zmin = coordinate[0][2] - radius;
						extent.zmax = coordinate[0][2] + radius;

						isFirstCoordinate = false;
					} else {
						if (coordinate[0][0] - radius < extent.xmin) {
							extent.xmin = coordinate[0][0] - radius;
						}
						if (coordinate[0][0] + radius > extent.xmax) {
							extent.xmax = coordinate[0][0] + radius;
						}

						if (coordinate[0][1] - radius < extent.ymin) {
							extent.ymin = coordinate[0][1] - radius;
						}
						if (coordinate[0][1] + radius > extent.ymax) {
							extent.ymax = coordinate[0][1] + radius;
						}

						if (coordinate[0][2] - radius < extent.zmin) {
							extent.zmin = coordinate[0][2] - radius;
						}
						if (coordinate[0][2] + radius > extent.zmax) {
							extent.zmax = coordinate[0][2] + radius;
						}
					}
				}
			}));
		}
	});

	// The comments bellow are also valid for ymin/ymax and zmin/zmax.
	if (extent.xmin > extent.xmax) {
		// xmin should be smaller than xmax, swap them.
		[extent.xmin, extent.xmax] = [extent.xmax, extent.xmin];
	} else if (extent.xmin === extent.xmax) {
		// There is only one non-scaled coordinate, so we transform this extent
		// into another, otherwise nothing would appear in the screen.
		if (extent.xmin < 0) {
			[extent.xmin, extent.xmax] = [2 * extent.xmin, 0];
		} else if (extent.xmin > 0) {
			[extent.xmin, extent.xmax] = [0, 2 * extent.xmin];
		} else { // xmin === xmax === 0
			[extent.xmin, extent.xmax] = [-1, 1];
		}
	}

	if (extent.ymin > extent.ymax) {
		[extent.ymin, extent.ymax] = [extent.ymax, extent.ymin];
	} else if (extent.ymin === extent.ymax) {
		if (extent.ymin < 0) {
			[extent.ymin, extent.ymax] = [2 * extent.ymin, 0];
		} else if (extent.ymin > 0) {
			[extent.ymin, extent.ymax] = [0, 2 * extent.ymin];
		} else {
			[extent.ymin, extent.ymax] = [-1, 1];
		}
	}

	if (extent.zmin > extent.zmax) {
		[extent.zmin, extent.zmax] = [extent.zmax, extent.zmin];
	} else if (extent.zmin === extent.zmax) {
		if (extent.zmin < 0) {
			[extent.zmin, extent.zmax] = [2 * extent.zmin, 0];
		} else if (extent.zmin > 0) {
			[extent.zmin, extent.zmax] = [0, 2 * extent.zmin];
		} else {
			[extent.zmin, extent.zmax] = [-1, 1];
		}
	}

	return extent;
}

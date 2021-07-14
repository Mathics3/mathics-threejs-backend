export default function (elements) {
	const extent = {
		xmin: 0,
		xmax: 0,
		ymin: 0,
		ymax: 0,
		zmin: 0,
		zmax: 0
	};

	elements.forEach((element) => {
		if (
			element.type === 'arrow' ||
			element.type === 'cuboid' ||
			element.type === 'line' ||
			element.type === 'polygon'
		) {
			element.coords.forEach((coordinate => {
				if (coordinate[0]) {
					if (coordinate[0][0] < extent.xmin) {
						extent.xmin = coordinate[0][0];
					} else if (coordinate[0][0] > extent.xmax)
						extent.xmax = coordinate[0][0];

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
			}));
		} else if (
			// the extent isn't calculated correctly for cylinders, their extent should be transformationVector * Radius
			element.type === 'cylinder' ||
			element.type === 'point' ||
			element.type === 'sphere'
		) {
			const radius = element.radius ?? element.pointSize;

			element.coords.forEach((coordinate => {
				if (coordinate[0]) {
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
			}));
		}
	});

	if (extent.xmin > extent.xmax) {
		[extent.xmin, extent.xmax] = [extent.xmax, extent.xmin];
	} else if (extent.xmin === extent.xmax) {
		if (extent.xmin < 0) {
			[extent.xmin, extent.xmax] = [2 * extent.xmin, 0];
		} else if (extent.xmin > 0) {
			[extent.xmin, extent.xmax] = [0, 2 * extent.xmin];
		} else {
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

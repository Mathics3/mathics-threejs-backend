// @ts-check

import { scaleCoordinate } from './coordinateUtils.js';

/** @typedef {import('./coordinateUtils.js').Coordinate} Coordinate */

/** @typedef {ReturnType<extent>} Extent */

/**
 * Get the extent (bounding box size) for the elements
 * @param {import('./primitives/index.js').PrimitiveElement[]} elements
 */
export default function extent(elements) {
	const extent = {
		xmin: 0,
		ymin: 0,
		zmin: 0,
		xmax: 1,
		ymax: 1,
		zmax: 1
	};

	let isFirstCoordinate = true;
	let needs2ndPass = false;

	// 1st pass.
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
		} else if (element.type !== 'text') {
			// Texts don't change the extent.

			// The comments bellow are also valid for the 2nd pass.
			// The extent isn't calculated correctly for cylinders, their extent should be transformationVector * radius.
			// The calculated extent for polyhedrons is approximated.
			// The calculated extent for tubes is approximated.

			const radius = element.radius ?? element.pointSize ?? element.edgeLength ?? 1;

			element.coords.forEach(((coordinate) => {
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
				} else {
					needs2ndPass = true;
				}
			}));
		}
	});

	if (needs2ndPass) {
		// 2nd pass, necessary for primitives with scaled coordinates and
		// radius > extent.
		elements.forEach((element) => {
			if (
				// arrows, cuboids, lines and polygons have no radius.
				element.type !== 'arrow' &&
				element.type !== 'cuboid' &&
				element.type !== 'line' &&
				element.type !== 'polygon'
			) {
				const radius = element.radius ?? element.pointSize ?? element.edgeLength ?? 1;

				element.coords.forEach(((coordinate) => {
					if (!coordinate[0]) {
						// We are changing the type of coordinate[0] from null
						// to Coordinate, TypeScript gives a warning here if we
						// don't cast coordinate[0] to unknown.
						/** @type {unknown} */(coordinate[0]) = scaleCoordinate(coordinate[1], extent);

						if (
							/** @type {Coordinate} */(
								/** @type {unknown} */(coordinate[0])
							)[0] - radius < extent.xmin
						) {
							extent.xmin = /** @type {Coordinate} */(
								/** @type {unknown} */(coordinate[0])
							)[0] - radius;
						}
						if (
							/** @type {Coordinate} */(
								/** @type {unknown} */(coordinate[0])
							)[0] + radius > extent.xmax
						) {
							extent.xmax = /** @type {Coordinate} */(
								/** @type {unknown} */(coordinate[0])
							)[0] + radius;
						}

						if (
							/** @type {Coordinate} */(
								/** @type {unknown} */(coordinate[0])
							)[1] - radius < extent.ymin
						) {
							extent.ymin = /** @type {Coordinate} */(
								/** @type {unknown} */(coordinate[0])
							)[1] - radius;
						}
						if (
							/** @type {Coordinate} */(
								/** @type {unknown} */(coordinate[0])
							)[1] + radius > extent.ymax
						) {
							extent.ymax = /** @type {Coordinate} */(
								/** @type {unknown} */(coordinate[0])
							)[1] + radius;
						}

						if (
							/** @type {Coordinate} */(
								/** @type {unknown} */(coordinate[0])
							)[2] - radius < extent.zmin
						) {
							extent.zmin = /** @type {Coordinate} */(
								/** @type {unknown} */(coordinate[0])
							)[2] - radius;
						}
						if (
							/** @type {Coordinate} */(
								/** @type {unknown} */(coordinate[0])
							)[2] + radius > extent.zmax
						) {
							extent.zmax = /** @type {Coordinate} */(
								/** @type {unknown} */(coordinate[0])
							)[2] + radius;
						}
					}
				}));
			}
		});
	}

	return extent;
}

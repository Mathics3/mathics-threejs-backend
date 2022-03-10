// @ts-check

import { Matrix4, Vector3 } from '../vendors/three.js';

import { scalePartialCoordinate } from './coordinateUtils.js';

/**
 * Get information about a tick given its position, camera, and container.
 * For a better performance, this changes the value of position.
 * @param {Vector3} position
 * @param {import('../vendors/three.js').Camera} camera
 * @param {HTMLElement} container
 */
function getTickInformation(position, camera, container) {
	position.applyMatrix4(
		new Matrix4().multiplyMatrices(
			camera.projectionMatrix,
			camera.matrixWorldInverse
		)
	);

	const { width, height } = getComputedStyle(container);

	const tickPosition = [
		(position.x + 1) * 0.5
		// scale by currentWidth
		* parseInt(width),
		(1 - position.y) * 0.5
		// scale by currentHeight
		* parseInt(height)
	];

	return {
		position: tickPosition,
		insideCanvas:
			tickPosition[0] < 5
			|| tickPosition[1] < 5
			|| tickPosition[0] > parseInt(width) - 5
			|| tickPosition[1] > parseInt(height) - 5
	};
}

/**
 * Get the tick direction given the radius of the scene.
 * i is 0 for x, 1 for y, and 2 for z.
 * This is a 3d coordinate, but as the z value of this function is
 * always 0, we can return just the 2 first values.
 * @param {0 | 1 | 2} i
 * @param {number} radius
 * @returns [x, y]
 */
function getTickDirection(i, radius) {
	const tickLength = 0.005 * radius;

	if (i === 0) {
		return [0, -tickLength];
	} else { // i === 1 || i === 2
		return [tickLength, 0];
	}
}

/** @typedef {import('../vendors/three.js').LineSegments} LineSegments */

/**
 * Re-position the tick numbers after its initial position has been set.
 * @todo re-position ticksSmall too.
 * @param {[boolean, boolean, boolean]} hasAxes
 * @param {[HTMLElement[], HTMLElement[], HTMLElement[]]} tickNumbers
 * @param {[LineSegments, LineSegments, LineSegments]} ticks
 * @param {import('../vendors/three.js').Camera} camera
 * @param {HTMLElement} container
 */
export function positionTickNumbers(
	hasAxes,
	tickNumbers,
	ticks,
	camera,
	container
) {
	for (let i = 0; i < 3; i++) {
		if (hasAxes[i]) {
			for (let j = 0; j < tickNumbers[i].length; j++) {
				const tickInformation = getTickInformation(
					// The code bellow moves the tick numbers so they aren't
					// over the tick marks.
					new Vector3(
						// @ts-ignore: we are sure this attribute is there
						ticks[i].geometry.attributes.position.array[j * 6] * 7 - ticks[i].geometry.attributes.position.array[j * 6 + 3] * 6,

						// @ts-ignore: same as above
						ticks[i].geometry.attributes.position.array[j * 6 + 1] * 7 - ticks[i].geometry.attributes.position.array[j * 6 + 4] * 6,

						// tickDirection.z is always 0, so
						// position.array[j * 6] is the same as
						// position.array[j * 6 + 5].
						// x * 7 - x * 6 = x
						// @ts-ignore: same as above
						ticks[i].geometry.attributes.position.array[j * 6 + 2]
					),
					camera,
					container
				);

				if (tickInformation.insideCanvas) {
					tickNumbers[i][j].style.display = 'none';
				} else {
					tickNumbers[i][j].style.left = `${tickInformation.position[0]}px`;
					tickNumbers[i][j].style.top = `${tickInformation.position[1]}px`;
					tickNumbers[i][j].style.display = '';
				}
			}
		}
	}
}

/**
 * @param {[boolean, boolean, boolean]} hasAxes
 * @param {import('./index.js').ConcreteAxes} axes
 * @param {[LineSegments, LineSegments, LineSegments]} ticks
 * @param {[LineSegments, LineSegments, LineSegments]} ticksSmall
 * @param {{ [index: number]: number }} axesVerticesPosition
 * @param {number} radius
 * @param {import('./extent.js').Extent} extent
 */
export function setTicksInitialPosition(
	hasAxes,
	axes,
	ticks,
	ticksSmall,
	axesVerticesPosition,
	radius,
	extent
) {
	for (let i = 0; i < 3; i++) {
		if (hasAxes[i]) {
			const tickDirection = getTickDirection(
				/** @type {0 | 1 | 2} */(i),
				radius
			);

			axes.ticks[i][0].forEach((value, j) => {
				const partialCoordinate = scalePartialCoordinate(
					value,
					/** @type {0 | 1 | 2} */(i),
					extent
				);

				// Initialize the "position" buffer.
				// @ts-ignore: we are sure this attribute is there
				ticks[i].geometry.attributes.position.array[j * 6] = axesVerticesPosition[0];

				// @ts-ignore: same as above
				ticks[i].geometry.attributes.position.array[j * 6 + 1] = axesVerticesPosition[1];

				// @ts-ignore: same as above
				ticks[i].geometry.attributes.position.array[j * 6 + 2] = axesVerticesPosition[2];

				// @ts-ignore: same as above
				ticks[i].geometry.attributes.position.array[j * 6 + 3] = axesVerticesPosition[0] + tickDirection[0];

				// @ts-ignore: same as above
				ticks[i].geometry.attributes.position.array[j * 6 + 4] = axesVerticesPosition[1] + tickDirection[1];

				// tickDirection.z is always 0.
				// @ts-ignore: same as above
				ticks[i].geometry.attributes.position.array[j * 6 + 5] = axesVerticesPosition[2];

				if (i === 0) {
					// @ts-ignore: same as above
					ticks[i].geometry.attributes.position.array[j * 6] = partialCoordinate;
					// @ts-ignore: same as above
					ticks[i].geometry.attributes.position.array[j * 6 + 3] = partialCoordinate;
				} else if (i === 1) {
					// @ts-ignore: same as above
					ticks[i].geometry.attributes.position.array[j * 6 + 1] = partialCoordinate;
					// @ts-ignore: same as above
					ticks[i].geometry.attributes.position.array[j * 6 + 4] = partialCoordinate;
				} else {
					// @ts-ignore: same as above
					ticks[i].geometry.attributes.position.array[j * 6 + 2] = partialCoordinate;
					// @ts-ignore: same as above
					ticks[i].geometry.attributes.position.array[j * 6 + 5] = partialCoordinate;
				}
			});

			axes.ticks[i][1].forEach((value, j) => {
				const partialCoordinate = scalePartialCoordinate(
					value,
					/** @type {0 | 1 | 2} */(i),
					extent
				);

				// Initialize the "position" buffer.
				// @ts-ignore: same as above
				ticksSmall[i].geometry.attributes.position.array[j * 6] = axesVerticesPosition[0];

				// @ts-ignore: same as above
				ticksSmall[i].geometry.attributes.position.array[j * 6 + 1] = axesVerticesPosition[1];

				// @ts-ignore: same as above
				ticksSmall[i].geometry.attributes.position.array[j * 6 + 2] = axesVerticesPosition[2];

				// @ts-ignore: same as above
				ticksSmall[i].geometry.attributes.position.array[j * 6 + 3] = axesVerticesPosition[0] + tickDirection[0] / 2;

				// @ts-ignore: same as above
				ticksSmall[i].geometry.attributes.position.array[j * 6 + 4] = axesVerticesPosition[1] + tickDirection[1] / 2;

				// tickDirection.z is always 0.
				// @ts-ignore: same as above
				ticksSmall[i].geometry.attributes.position.array[j * 6 + 5] = axesVerticesPosition[2];

				if (i === 0) {
					// @ts-ignore: same as above
					ticksSmall[i].geometry.attributes.position.array[j * 6] = partialCoordinate;
					// @ts-ignore: same as above
					ticksSmall[i].geometry.attributes.position.array[j * 6 + 3] = partialCoordinate;
				} else if (i === 1) {
					// @ts-ignore: same as above
					ticksSmall[i].geometry.attributes.position.array[j * 6 + 1] = partialCoordinate;
					// @ts-ignore: same as above
					ticksSmall[i].geometry.attributes.position.array[j * 6 + 4] = partialCoordinate;
				} else {
					// @ts-ignore: same as above
					ticksSmall[i].geometry.attributes.position.array[j * 6 + 2] = partialCoordinate;
					// @ts-ignore: same as above
					ticksSmall[i].geometry.attributes.position.array[j * 6 + 5] = partialCoordinate;
				}
			});
		}
	}
}

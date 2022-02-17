import {
	Matrix4,
	Vector3
} from '../vendors/three.js';

import { scalePartialCoordinate } from './coordinateUtils.js';

function getTickInformation(position, camera, container) {
	const temporaryPosition = position.clone().applyMatrix4(
		new Matrix4().multiplyMatrices(
			camera.projectionMatrix,
			camera.matrixWorldInverse
		)
	);

	const { width, height } = getComputedStyle(container);

	const tickPosition = [
		(temporaryPosition.x + 1) * 0.5
		// scale by maxWidth / currentWidth
		* parseInt(width),
		(1 - temporaryPosition.y) * 0.5
		// scale by maxHeight / currentHeight
		* parseInt(height)
	];

	return {
		position: tickPosition,
		insideCanvas:
			tickPosition[0] < 5
			|| tickPosition[1] < 5
			|| tickPosition[0] > parseInt(container.style.maxWidth) - 5
			|| tickPosition[1] > parseInt(container.style.maxHeight) - 5
	};
}

// i is 0, 1 or 2.
function getTickDirection(i, radius) {
	const tickLength = 0.005 * radius;

	if (i === 0) {
		return [0, -tickLength, 0];
	} else { // i === 1 || i === 2
		return [tickLength, 0, 0];
	}
}

export function positionTickNumbers(hasAxes, tickNumbers, ticks, camera, container) {
	for (let i = 0; i < 3; i++) {
		if (hasAxes[i]) {
			for (let j = 0; j < tickNumbers[i].length; j++) {
				const tickInformation = getTickInformation(
					// The code bellow moves the tick numbers so they aren't
					// over the tick marks.
					new Vector3(
						ticks[i].geometry.attributes.position.array[j * 6] * 7 - ticks[i].geometry.attributes.position.array[j * 6 + 3] * 6,

						ticks[i].geometry.attributes.position.array[j * 6 + 1] * 7 - ticks[i].geometry.attributes.position.array[j * 6 + 4] * 6,

						ticks[i].geometry.attributes.position.array[j * 6 + 2] * 7 - ticks[i].geometry.attributes.position.array[j * 6 + 5] * 6
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

export function setTicksInitialPosition(hasAxes, axes, ticks, ticksSmall, axesGeometry, radius, extent) {
	for (let i = 0; i < 3; i++) {
		if (hasAxes[i]) {
			const tickDirection = getTickDirection(i, radius);

			axes.ticks[i][0].forEach((value, j) => {
				const partialCoordinate = scalePartialCoordinate(value, i, extent);

				// set the "position" buffer
				ticks[i].geometry.attributes.position.array[j * 6] = axesGeometry[i].attributes.position.array[0];

				ticks[i].geometry.attributes.position.array[j * 6 + 1] = axesGeometry[i].attributes.position.array[1];

				ticks[i].geometry.attributes.position.array[j * 6 + 2] = axesGeometry[i].attributes.position.array[2];

				ticks[i].geometry.attributes.position.array[j * 6 + 3] = axesGeometry[i].attributes.position.array[0] + tickDirection[0];

				ticks[i].geometry.attributes.position.array[j * 6 + 4] = axesGeometry[i].attributes.position.array[1] + tickDirection[1];

				ticks[i].geometry.attributes.position.array[j * 6 + 5] = axesGeometry[i].attributes.position.array[2] + tickDirection[2];

				if (i === 0) {
					ticks[i].geometry.attributes.position.array[j * 6] = partialCoordinate;
					ticks[i].geometry.attributes.position.array[j * 6 + 3] = partialCoordinate;
				} else if (i === 1) {
					ticks[i].geometry.attributes.position.array[j * 6 + 1] = partialCoordinate;
					ticks[i].geometry.attributes.position.array[j * 6 + 4] = partialCoordinate;
				} else {
					ticks[i].geometry.attributes.position.array[j * 6 + 2] = partialCoordinate;
					ticks[i].geometry.attributes.position.array[j * 6 + 5] = partialCoordinate;
				}
			});

			axes.ticks[i][1].forEach((value, j) => {
				const partialCoordinate = scalePartialCoordinate(value, i, extent);

				// set the "position" buffer
				ticksSmall[i].geometry.attributes.position.array[j * 6] = axesGeometry[i].attributes.position.array[0];

				ticksSmall[i].geometry.attributes.position.array[j * 6 + 1] = axesGeometry[i].attributes.position.array[1];

				ticksSmall[i].geometry.attributes.position.array[j * 6 + 2] = axesGeometry[i].attributes.position.array[2];

				ticksSmall[i].geometry.attributes.position.array[j * 6 + 3] = axesGeometry[i].attributes.position.array[0] + tickDirection[0] / 2;

				ticksSmall[i].geometry.attributes.position.array[j * 6 + 4] = axesGeometry[i].attributes.position.array[1] + tickDirection[1] / 2;

				ticksSmall[i].geometry.attributes.position.array[j * 6 + 5] = axesGeometry[i].attributes.position.array[2] + tickDirection[2] / 2;

				if (i === 0) {
					ticksSmall[i].geometry.attributes.position.array[j * 6] = partialCoordinate;
					ticksSmall[i].geometry.attributes.position.array[j * 6 + 3] = partialCoordinate;
				} else if (i === 1) {
					ticksSmall[i].geometry.attributes.position.array[j * 6 + 1] = partialCoordinate;
					ticksSmall[i].geometry.attributes.position.array[j * 6 + 4] = partialCoordinate;
				} else {
					ticksSmall[i].geometry.attributes.position.array[j * 6 + 2] = partialCoordinate;
					ticksSmall[i].geometry.attributes.position.array[j * 6 + 5] = partialCoordinate;
				}
			});
		}
	}
}

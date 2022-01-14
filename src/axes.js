import {
	Matrix4,
	Vector3
} from '../vendors/three.js';

import { scalePartialCoordinate } from './coordinateUtils.js';

function toCanvasCoords(position, camera) {
	const temporaryPosition = position.clone().applyMatrix4(
		new Matrix4().multiplyMatrices(
			camera.projectionMatrix,
			camera.matrixWorldInverse
		)
	);

	return new Vector3(
		(temporaryPosition.x + 1) * 200,
		(1 - temporaryPosition.y) * 200,
		0
	);
}

// i is 0, 1 or 2.
function getTickDirection(i, radius) {
	const tickLength = 0.005 * radius;

	if (i === 0) {
		return new Vector3(0, -tickLength, 0);
	} else { // i === 1 || i === 2
		return new Vector3(tickLength, 0, 0);
	}
}

export function positionTickNumbers(hasAxes, tickNumbers, ticks, camera, canvasSize, maxSize) {
	for (let i = 0; i < 3; i++) {
		if (hasAxes[i]) {
			for (let j = 0; j < tickNumbers[i].length; j++) {
				const tickPosition = toCanvasCoords(
					new Vector3(
						ticks[i].geometry.attributes.position.array[j * 6] * 7 - ticks[i].geometry.attributes.position.array[j * 6 + 3] * 6,

						ticks[i].geometry.attributes.position.array[j * 6 + 1] * 7 - ticks[i].geometry.attributes.position.array[j * 6 + 4] * 6,

						ticks[i].geometry.attributes.position.array[j * 6 + 2] * 7 - ticks[i].geometry.attributes.position.array[j * 6 + 5] * 6
					),
					camera
				).multiplyScalar(canvasSize / maxSize);

				tickNumbers[i][j].style.position = `absolute`;
				tickNumbers[i][j].style.left = `${tickPosition.x}px`;
				tickNumbers[i][j].style.top = `${tickPosition.y}px`;

				if (tickPosition.x < 5 || tickPosition.x > 395 || tickPosition.y < 5 || tickPosition.y > 395) {
					tickNumbers[i][j].style.display = 'none';
				} else {
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

				ticks[i].geometry.attributes.position.array[j * 6 + 3] = axesGeometry[i].attributes.position.array[0] + tickDirection.x;

				ticks[i].geometry.attributes.position.array[j * 6 + 4] = axesGeometry[i].attributes.position.array[1] + tickDirection.y;

				ticks[i].geometry.attributes.position.array[j * 6 + 5] = axesGeometry[i].attributes.position.array[2] + tickDirection.z;

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

				ticksSmall[i].geometry.attributes.position.array[j * 6 + 3] = axesGeometry[i].attributes.position.array[0] + tickDirection.x / 2;

				ticksSmall[i].geometry.attributes.position.array[j * 6 + 4] = axesGeometry[i].attributes.position.array[1] + tickDirection.y / 2;

				ticksSmall[i].geometry.attributes.position.array[j * 6 + 5] = axesGeometry[i].attributes.position.array[2] + tickDirection.z / 2;

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

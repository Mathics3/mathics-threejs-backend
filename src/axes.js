import {
	Matrix4,
	Vector3
} from '../vendors/three.js';

export const axesIndices = [
	[[0, 5], [1, 4], [2, 7], [3, 6]],
	[[0, 2], [1, 3], [4, 6], [5, 7]],
	[[0, 1], [2, 3], [4, 5], [6, 7]]
]

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

function getTickDirection(i, radius, theta, phi, axesGeometry, boundingBox) {
	const tickDirection = new Vector3();
	const tickLength = 0.005 * radius;

	if (i === 0) {
		if (0.25 * Math.PI < theta < 0.75 * Math.PI) {
			if (axesGeometry[0].attributes.position.array[2] > boundingBox.position.z) {
				tickDirection.setZ(-tickLength);
			} else {
				tickDirection.setZ(tickLength);
			}
		} else {
			if (axesGeometry[0].attributes.position.array[1] > boundingBox.position.y) {
				tickDirection.setY(-tickLength);
			} else {
				tickDirection.setY(tickLength);
			}
		}
	} else if (i === 1) {
		if (0.25 * Math.PI < theta < 0.75 * Math.PI) {
			if (axesGeometry[1].attributes.position.array[2] > boundingBox.position.z) {
				tickDirection.setZ(-tickLength);
			} else {
				tickDirection.setZ(tickLength);
			}
		} else {
			if (axesGeometry[1].attributes.position.array[0] > boundingBox.position.x) {
				tickDirection.setX(-tickLength);
			} else {
				tickDirection.setX(tickLength);
			}
		}
	} else if (i === 2) {
		if ((0.25 * Math.PI < phi < 0.75 * Math.PI) || (1.25 * Math.PI < phi < 1.75 * Math.PI)) {
			if (axesGeometry[2].attributes.position.array[0] > boundingBox.position.x) {
				tickDirection.setX(-tickLength);
			} else {
				tickDirection.setX(tickLength);
			}
		} else {
			if (axesGeometry[2].attributes.position.array[1] > boundingBox.position.y) {
				tickDirection.setY(-tickLength);
			} else {
				tickDirection.setY(tickLength);
			}
		}
	}

	return tickDirection;
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

export function updateAxes(hasAxes, axes, ticks, ticksSmall, axesGeometry, boundingBox, radius, theta, phi) {
	for (let i = 0; i < 3; i++) {
		if (hasAxes[i]) {
			const tickDirection = getTickDirection(i, radius, theta, phi, axesGeometry, boundingBox);

			axes.ticks[i][0].forEach((value, j) => {
				// set the "position" buffer to its initial values
				ticks[i].geometry.attributes.position.array[j * 6] = axesGeometry[i].attributes.position.array[0];

				ticks[i].geometry.attributes.position.array[j * 6 + 1] = axesGeometry[i].attributes.position.array[1];

				ticks[i].geometry.attributes.position.array[j * 6 + 2] = axesGeometry[i].attributes.position.array[2];

				ticks[i].geometry.attributes.position.array[j * 6 + 3] = axesGeometry[i].attributes.position.array[0] + tickDirection.x;

				ticks[i].geometry.attributes.position.array[j * 6 + 4] = axesGeometry[i].attributes.position.array[1] + tickDirection.y;

				ticks[i].geometry.attributes.position.array[j * 6 + 5] = axesGeometry[i].attributes.position.array[2] + tickDirection.z;

				if (i === 0) {
					ticks[i].geometry.attributes.position.array[j * 6] = value;
					ticks[i].geometry.attributes.position.array[j * 6 + 3] = value;
				} else if (i === 1) {
					ticks[i].geometry.attributes.position.array[j * 6 + 1] = value;
					ticks[i].geometry.attributes.position.array[j * 6 + 4] = value;
				} else if (i === 2) {
					ticks[i].geometry.attributes.position.array[j * 6 + 2] = value;
					ticks[i].geometry.attributes.position.array[j * 6 + 5] = value;
				}
			});

			axes.ticks[i][1].forEach((value, j) => {
				// set the "position" buffer to its initial values
				ticksSmall[i].geometry.attributes.position.array[j * 6] = axesGeometry[i].attributes.position.array[0];

				ticksSmall[i].geometry.attributes.position.array[j * 6 + 1] = axesGeometry[i].attributes.position.array[1];

				ticksSmall[i].geometry.attributes.position.array[j * 6 + 2] = axesGeometry[i].attributes.position.array[2];

				ticksSmall[i].geometry.attributes.position.array[j * 6 + 3] = axesGeometry[i].attributes.position.array[0] + tickDirection.x / 2;

				ticksSmall[i].geometry.attributes.position.array[j * 6 + 4] = axesGeometry[i].attributes.position.array[1] + tickDirection.y / 2;

				ticksSmall[i].geometry.attributes.position.array[j * 6 + 5] = axesGeometry[i].attributes.position.array[2] + tickDirection.z / 2;

				if (i === 0) {
					ticksSmall[i].geometry.attributes.position.array[j * 6 + 0] = value;
					ticksSmall[i].geometry.attributes.position.array[j * 6 + 3] = value;
				} else if (i === 1) {
					ticksSmall[i].geometry.attributes.position.array[j * 6 + 1] = value;
					ticksSmall[i].geometry.attributes.position.array[j * 6 + 4] = value;
				} else if (i === 2) {
					ticksSmall[i].geometry.attributes.position.array[j * 6 + 2] = value;
					ticksSmall[i].geometry.attributes.position.array[j * 6 + 5] = value;
				}
			});
		}
	}
}

export function positionAxes(hasAxes, radius, axesGeometry, boundingBox, camera) {
	// automatic axes placement
	let nearJ, nearLength = 10 * radius, farJ, farLength = 0;

	const temporaryVector = new Vector3();

	for (let i = 0; i < 8; i++) {
		temporaryVector.set(
			boundingBox.geometry.attributes.position.array[i * 3]
			+ boundingBox.position.x - camera.position.x,
			boundingBox.geometry.attributes.position.array[i * 3 + 1]
			+ boundingBox.position.y - camera.position.y,
			boundingBox.geometry.attributes.position.array[i * 3 + 2]
			+ boundingBox.position.z - camera.position.z
		);

		const temporaryVectorLength = temporaryVector.length();

		if (temporaryVectorLength < nearLength) {
			nearLength = temporaryVectorLength;
			nearJ = i;
		} else if (temporaryVectorLength > farLength) {
			farLength = temporaryVectorLength;
			farJ = i;
		}
	}
	for (let i = 0; i < 3; i++) {
		if (hasAxes[i]) {
			let maxJ, maxLength = 0;

			for (let j = 0; j < 4; j++) {
				if (axesIndices[i][j][0] !== nearJ &&
					axesIndices[i][j][1] !== nearJ &&
					axesIndices[i][j][0] !== farJ &&
					axesIndices[i][j][1] !== farJ
				) {
					const edge = toCanvasCoords(new Vector3(
						...boundingBox.geometry.attributes.position.array.slice(axesIndices[i][j][0] * 3, axesIndices[i][j][0] * 3 + 3)
					), camera).sub(toCanvasCoords(new Vector3(
						...boundingBox.geometry.attributes.position.array.slice(axesIndices[i][j][1] * 3, axesIndices[i][j][1] * 3 + 3)
					), camera));

					if (edge.length() > maxLength) {
						maxLength = edge.length();
						maxJ = j;
					}
				}
			}

			axesGeometry[i].attributes.position.array[0] = boundingBox.geometry.attributes.position.array[(axesIndices[i][maxJ] ?? [0])[0] * 3] + boundingBox.position.x;

			axesGeometry[i].attributes.position.array[1] = boundingBox.geometry.attributes.position.array[(axesIndices[i][maxJ] ?? [0])[0] * 3 + 1] + boundingBox.position.y;

			axesGeometry[i].attributes.position.array[2] = boundingBox.geometry.attributes.position.array[(axesIndices[i][maxJ] ?? [0])[0] * 3 + 2] + boundingBox.position.z;

			axesGeometry[i].attributes.position.array[3] = boundingBox.geometry.attributes.position.array[(axesIndices[i][maxJ] ?? [0, 0])[1] * 3] + boundingBox.position.x;

			axesGeometry[i].attributes.position.array[4] = boundingBox.geometry.attributes.position.array[(axesIndices[i][maxJ] ?? [0, 0])[1] * 3 + 1] + boundingBox.position.y;

			axesGeometry[i].attributes.position.array[5] = boundingBox.geometry.attributes.position.array[(axesIndices[i][maxJ] ?? [0, 0])[1] * 3 + 2] + boundingBox.position.z;
		}
	}
}

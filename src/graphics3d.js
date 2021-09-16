import {
	BufferAttribute,
	BufferGeometry,
	Color,
	LineBasicMaterial,
	LineSegments,
	Matrix4,
	PerspectiveCamera,
	Scene,
	Vector3,
	WebGLRenderer
} from '../vendors/three.js';

import calculateExtent from './extent.js';
import lightFunctions from './lights.js';
import primitiveFunctions from './primitives/index.js';
import scaleCoordinate from './scaleCoordinate.js';

// The camera position calculing is based in spherical polar coordinates
// See https://en.wikipedia.org/wiki/Spherical_coordinate_system
// θ = theta
// φ = phi

export default function (
	container,
	{
		axes = {},
		elements = [],
		lighting = [],
		viewpoint
	},
	maxSize = 400,
	innerWidthMultiplier = 0.65
) {
	// TODO: shading, handling of VertexNormals

	axes.hasaxes ??= false;

	let isCtrlDown, isShiftDown, onMouseDownFocus, onCtrlDownFov,
		hasAxes, isMouseDown = false,
		theta, onMouseDownTheta, phi, onMouseDownPhi,
		canvasSize = Math.min(maxSize, window.innerWidth * innerWidthMultiplier),
		autoRescale = true;

	container.style.width = canvasSize + 'px';
	// to avoid overflow when a tick numbers is out of the parent element
	container.style.height = canvasSize + 10 + 'px';

	const extent = calculateExtent(elements);

	// where the camera is looking (initialized on center of the scene)
	const focus = new Vector3(
		0.5 * (extent.xmin + extent.xmax),
		0.5 * (extent.ymin + extent.ymax),
		0.5 * (extent.zmin + extent.zmax)
	);

	const viewPoint = new Vector3(...viewpoint)
		.multiplyScalar(
			// scale the viewpoint so the camera isn't inside the bounding box
			Math.max(
				extent.xmax - extent.xmin,
				extent.ymax - extent.ymin,
				extent.zmax - extent.zmin
			)
		)
		.sub(focus);

	const radius = viewPoint.length();

	onMouseDownTheta = theta = Math.acos(viewPoint.z / radius);
	onMouseDownPhi = phi = Math.atan2(viewPoint.y, viewPoint.x) % (2 * Math.PI);

	const scene = new Scene(),
		camera = new PerspectiveCamera(
			35,           // field of view
			1,            // aspect ratio
			0.1 * radius, // near plane
			1000 * radius // far plane
		);

	function updateCameraPosition() {
		// We are adding the focus because we don't consider it in the camera position.
		// Doing it, the rotation isn't around (0, 0, 0), but around the scene center.
		camera.position.set(
			// Convert the polar coordinates into absolute ones.
			radius * Math.sin(theta) * Math.cos(phi),
			radius * Math.sin(theta) * Math.sin(phi),
			radius * Math.cos(theta)
		).add(focus);

		camera.lookAt(focus);
	}

	updateCameraPosition();
	camera.up.set(0, 0, 1);

	scene.add(camera);

	function getInitialLightPosition(coordinate) {
		// initial light position in spherical polar coordinates
		const temporaryPosition = new Vector3(
			...(coordinate[0] ?? scaleCoordinate(coordinate[1], extent))
		);

		const result = {
			radius: radius * temporaryPosition.length(),
			phi: 0,
			theta: 0
		};

		if (temporaryPosition.length() !== 0) {
			result.phi = Math.atan2(temporaryPosition.y, temporaryPosition.x) % (2 * Math.PI);
			result.theta = Math.asin(temporaryPosition.z / result.radius);
		}

		return result;
	}

	const lights = [], initialLightPosition = [];

	lighting.forEach((element) => {
		const light = lightFunctions[element.type](element, extent);

		if (element.type === 'directional') {
			lights.push(light);
			initialLightPosition.push(getInitialLightPosition(element.coords));
		}

		scene.add(light);
	});

	function positionLights() {
		lights.forEach((light, i) => {
			light.position.set(
				initialLightPosition[i].radius * Math.sin(theta + initialLightPosition[i].theta) * Math.cos(phi + initialLightPosition[i].phi),
				initialLightPosition[i].radius * Math.sin(theta + initialLightPosition[i].theta) * Math.sin(phi + initialLightPosition[i].phi),
				initialLightPosition[i].radius * Math.cos(theta + initialLightPosition[i].theta)
			).add(focus);
		});
	}

	const boundingBox = new LineSegments(
		new BufferGeometry().setAttribute(
			'position',
			new BufferAttribute(new Float32Array([
				extent.xmin, extent.ymax, extent.zmin,
				extent.xmin, extent.ymax, extent.zmax,

				extent.xmax, extent.ymax, extent.zmax,
				extent.xmax, extent.ymax, extent.zmin,

				extent.xmin, extent.ymin, extent.zmax,
				extent.xmin, extent.ymin, extent.zmin,

				extent.xmax, extent.ymin, extent.zmin,
				extent.xmax, extent.ymin, extent.zmax,

				extent.xmin, extent.ymax, extent.zmax,
				extent.xmin, extent.ymin, extent.zmax,

				extent.xmax, extent.ymax, extent.zmax,
				extent.xmin, extent.ymax, extent.zmax,

				extent.xmin, extent.ymin, extent.zmax,
				extent.xmax, extent.ymin, extent.zmax,

				extent.xmax, extent.ymin, extent.zmax,
				extent.xmax, extent.ymax, extent.zmax,

				extent.xmax, extent.ymax, extent.zmin,
				extent.xmax, extent.ymin, extent.zmin,

				extent.xmin, extent.ymax, extent.zmin,
				extent.xmax, extent.ymax, extent.zmin,

				extent.xmax, extent.ymin, extent.zmin,
				extent.xmin, extent.ymin, extent.zmin,

				extent.xmin, extent.ymin, extent.zmin,
				extent.xmin, extent.ymax, extent.zmin,
			]), 3)
		),
		new LineBasicMaterial({ color: 0x666666 })
	);

	scene.add(boundingBox);

	// draw the axes
	if (axes.hasaxes instanceof Array) {
		hasAxes = [...axes.hasaxes];
	} else {
		hasAxes = [axes.hasaxes, axes.hasaxes, axes.hasaxes];
	}

	const axesGeometry = [],
		axesIndexes = [
			[[0, 5], [1, 4], [2, 7], [3, 6]],
			[[0, 2], [1, 3], [4, 6], [5, 7]],
			[[0, 1], [2, 3], [4, 5], [6, 7]]
		],
		axesVertices = new Float32Array(6);

	for (let i = 0; i < 3; i++) {
		if (hasAxes[i]) {
			axesVertices[0] = boundingBox.geometry.attributes.position.array[axesIndexes[i][0][0] * 3] + boundingBox.position.x;

			axesVertices[1] = boundingBox.geometry.attributes.position.array[axesIndexes[i][0][0] * 3 + 1] + boundingBox.position.y;

			axesVertices[2] = boundingBox.geometry.attributes.position.array[axesIndexes[i][0][0] * 3 + 2] + boundingBox.position.z;

			axesVertices[3] = boundingBox.geometry.attributes.position.array[axesIndexes[i][0][1] * 3] + boundingBox.position.x;

			axesVertices[4] = boundingBox.geometry.attributes.position.array[axesIndexes[i][0][1] * 3 + 1] + boundingBox.position.y;

			axesVertices[5] = boundingBox.geometry.attributes.position.array[axesIndexes[i][0][1] * 3 + 2] + boundingBox.position.z;

			axesGeometry[i] = new BufferGeometry().setAttribute(
				'position',
				new BufferAttribute(axesVertices, 3)
			);

			scene.add(new LineSegments(
				axesGeometry[i],
				new LineBasicMaterial({
					color: 0x000000,
					linewidth: 1.5
				})
			));
		}
	}

	function positionAxes() {
		// automatic axes placement
		let nearJ, nearLength = 10 * radius, farJ, farLength = 0;

		const temporaryVector = new Vector3();

		for (let i = 0; i < 8; i++) {
			temporaryVector.set(
				boundingBox.geometry.attributes.position.array[i * 3],
				boundingBox.geometry.attributes.position.array[i * 3 + 1],
				boundingBox.geometry.attributes.position.array[i * 3 + 2]
			).add(boundingBox.position).sub(camera.position);

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
					if (axesIndexes[i][j][0] !== nearJ &&
						axesIndexes[i][j][1] !== nearJ &&
						axesIndexes[i][j][0] !== farJ &&
						axesIndexes[i][j][1] !== farJ
					) {
						const edge = toCanvasCoords(new Vector3(
							...boundingBox.geometry.attributes.position.array.slice(axesIndexes[i][j][0] * 3, axesIndexes[i][j][0] * 3 + 3)
						)).sub(toCanvasCoords(new Vector3(
							...boundingBox.geometry.attributes.position.array.slice(axesIndexes[i][j][1] * 3, axesIndexes[i][j][1] * 3 + 3)
						)));

						if (edge.length() > maxLength) {
							maxLength = edge.length();
							maxJ = j;
						}
					}
				}

				axesGeometry[i].attributes.position.array[0] = boundingBox.geometry.attributes.position.array[(axesIndexes[i][maxJ] ?? [0])[0] * 3] + boundingBox.position.x;

				axesGeometry[i].attributes.position.array[1] = boundingBox.geometry.attributes.position.array[(axesIndexes[i][maxJ] ?? [0])[0] * 3 + 1] + boundingBox.position.y;

				axesGeometry[i].attributes.position.array[2] = boundingBox.geometry.attributes.position.array[(axesIndexes[i][maxJ] ?? [0])[0] * 3 + 2] + boundingBox.position.z;

				axesGeometry[i].attributes.position.array[3] = boundingBox.geometry.attributes.position.array[(axesIndexes[i][maxJ] ?? [0, 0])[1] * 3] + boundingBox.position.x;

				axesGeometry[i].attributes.position.array[4] = boundingBox.geometry.attributes.position.array[(axesIndexes[i][maxJ] ?? [0, 0])[1] * 3 + 1] + boundingBox.position.y;

				axesGeometry[i].attributes.position.array[5] = boundingBox.geometry.attributes.position.array[(axesIndexes[i][maxJ] ?? [0, 0])[1] * 3 + 2] + boundingBox.position.z;
			}
		}

		updateAxes();
	}

	// axes ticks
	const
		tickMaterial = new LineBasicMaterial({
			color: 0x000000,
			linewidth: 1.2
		}),
		ticks = new Array(3),
		ticksSmall = new Array(3),
		tickLength = 0.005 * radius;

	for (let i = 0; i < 3; i++) {
		if (hasAxes[i]) {
			ticks[i] = new LineSegments(
				new BufferGeometry().setAttribute(
					'position',
					new BufferAttribute(
						new Float32Array(6 * axes.ticks[i][0].length),
						3
					)
				),
				tickMaterial
			);

			scene.add(ticks[i]);

			ticksSmall[i] = new LineSegments(
				new BufferGeometry().setAttribute(
					'position',
					new BufferAttribute(
						new Float32Array(6 * axes.ticks[i][1].length),
						3
					)
				),
				tickMaterial
			);

			scene.add(ticksSmall[i]);
		}
	}

	function getTickDirection(i) {
		const tickDirection = new Vector3();

		if (i === 0) {
			if (0.25 * Math.PI < theta && theta < 0.75 * Math.PI) {
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
			if (0.25 * Math.PI < theta && theta < 0.75 * Math.PI) {
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
			if ((0.25 * Math.PI < phi && phi < 0.75 * Math.PI) || (1.25 * Math.PI < phi && phi < 1.75 * Math.PI)) {
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

	function updateAxes() {
		for (let i = 0; i < 3; i++) {
			if (hasAxes[i]) {
				const tickDirection = getTickDirection(i);

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

	updateAxes();

	// axes numbering using divs
	const tickNumbers = new Array(3);

	for (let i = 0; i < 3; i++) {
		if (hasAxes[i]) {
			tickNumbers[i] = new Array(axes.ticks[i][0].length);

			for (let j = 0; j < tickNumbers[i].length; j++) {
				let color = 'black';

				if (i < axes.ticks_style?.length) {
					color = new Color(...axes.ticks_style[i]).getStyle();
				}

				tickNumbers[i][j] = document.createElement('div');
				tickNumbers[i][j].innerHTML = axes.ticks[i][2][j]
					.replace('0.', '.');

				// handle minus signs
				if (axes.ticks[i][0][j] >= 0) {
					tickNumbers[i][j].style.paddingLeft = '0.5em';
				} else {
					tickNumbers[i][j].style.paddingLeft = 0;
				}

				tickNumbers[i][j].style.position = 'absolute';
				tickNumbers[i][j].style.fontSize = '0.8em';
				tickNumbers[i][j].style.color = color;

				container.appendChild(tickNumbers[i][j]);
			}
		}
	}

	function toCanvasCoords(position) {
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

	function positionTickNumbers() {
		for (let i = 0; i < 3; i++) {
			if (hasAxes[i]) {
				for (let j = 0; j < tickNumbers[i].length; j++) {
					const tickPosition = toCanvasCoords(
						new Vector3(
							ticks[i].geometry.attributes.position.array[j * 6] * 7 - ticks[i].geometry.attributes.position.array[j * 6 + 3] * 6,

							ticks[i].geometry.attributes.position.array[j * 6 + 1] * 7 - ticks[i].geometry.attributes.position.array[j * 6 + 4] * 6,

							ticks[i].geometry.attributes.position.array[j * 6 + 2] * 7 - ticks[i].geometry.attributes.position.array[j * 6 + 5] * 6
						)
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

	// plot the primitives
	elements.forEach((element) => {
		scene.add(primitiveFunctions[element.type](element, extent, canvasSize));
	});

	const renderer = new WebGLRenderer({
		antialias: true,
		alpha: true
	});

	renderer.setSize(canvasSize, canvasSize);
	renderer.setPixelRatio(window.devicePixelRatio);
	container.appendChild(renderer.domElement);

	function render() {
		positionLights();
		renderer.render(scene, camera);
	}

	function scaleInView() {
		camera.updateMatrixWorld(); // without this scaleInView doesn't work

		const proj2d = new Vector3();

		let temporaryFOV = 0;

		for (let i = 0; i < 8; i++) {
			proj2d.set(
				boundingBox.geometry.attributes.position.array[i * 3] + boundingBox.position.x,
				boundingBox.geometry.attributes.position.array[i * 3 + 1] + boundingBox.position.y,
				boundingBox.geometry.attributes.position.array[i * 3 + 2] + boundingBox.position.z
			).applyMatrix4(camera.matrixWorldInverse);

			temporaryFOV = Math.max(
				temporaryFOV,
				114.59 * Math.abs(Math.atan(proj2d.y / proj2d.z))
			);
		}

		camera.fov = temporaryFOV + 5;
		camera.updateProjectionMatrix();
	}

	function onDocumentMouseDown(event) {
		event.preventDefault();

		isMouseDown = true;
		isShiftDown = false;
		isCtrlDown = false;

		onMouseDownTheta = theta;
		onMouseDownPhi = phi;

		onMouseDownPosition[0] = event.clientX;
		onMouseDownPosition[1] = event.clientY;

		onMouseDownFocus = focus.clone();
	}

	function onDocumentMouseMove(event) {
		event.preventDefault();

		if (isMouseDown) {
			positionTickNumbers();

			if (event.shiftKey) { // pan
				if (!isShiftDown) {
					isShiftDown = true;
					onMouseDownPosition[0] = event.clientX;
					onMouseDownPosition[1] = event.clientY;
					autoRescale = false;
					container.style.cursor = 'move';
				}

				const cameraX = new Vector3(
					-radius * Math.cos(theta) * Math.sin(phi) * (theta < 0.5 * Math.PI ? 1 : -1),
					radius * Math.cos(theta) * Math.cos(phi) * (theta < 0.5 * Math.PI ? 1 : -1),
					0
				).normalize();

				const cameraY = new Vector3()
					.subVectors(focus, camera.position)
					.normalize()
					.cross(cameraX);

				focus.x = onMouseDownFocus.x + (radius / canvasSize) * (cameraX.x * (onMouseDownPosition[0] - event.clientX) + cameraY.x * (onMouseDownPosition[1] - event.clientY));
				focus.y = onMouseDownFocus.y + (radius / canvasSize) * (cameraX.y * (onMouseDownPosition[0] - event.clientX) + cameraY.y * (onMouseDownPosition[1] - event.clientY));
				focus.z = onMouseDownFocus.z + (radius / canvasSize) * (cameraY.z * (onMouseDownPosition[1] - event.clientY));

				updateCameraPosition();
			} else if (event.ctrlKey) { // zoom
				if (!isCtrlDown) {
					isCtrlDown = true;
					onCtrlDownFov = camera.fov;
					onMouseDownPosition[0] = event.clientX;
					onMouseDownPosition[1] = event.clientY;
					autoRescale = false;
					container.style.cursor = 'crosshair';
				}

				camera.fov = Math.max(
					1,
					Math.min(
						onCtrlDownFov + 20 * Math.atan((event.clientY - onMouseDownPosition[1]) / 50),
						150
					)
				);

				camera.updateProjectionMatrix();
			} else { // spin
				if (isCtrlDown || isShiftDown) {
					onMouseDownPosition[0] = event.clientX;
					onMouseDownPosition[1] = event.clientY;
					isShiftDown = false;
					isCtrlDown = false;
					container.style.cursor = 'pointer';
				}

				phi = (2 * Math.PI * (onMouseDownPosition[0] - event.clientX) / canvasSize + onMouseDownPhi) % (2 * Math.PI);
				theta = 2 * Math.PI * (onMouseDownPosition[1] - event.clientY) / canvasSize + onMouseDownTheta;

				// 1e-12 prevents spinnging from getting stuck
				theta = Math.max(
					Math.min(
						Math.PI - 1e-12,
						2 * Math.PI * (onMouseDownPosition[1] - event.clientY) / canvasSize + onMouseDownTheta
					),
					1e-12
				);

				updateCameraPosition();
			}

			render();
		} else {
			container.style.cursor = 'pointer';
		}
	}

	function onDocumentMouseUp(event) {
		event.preventDefault();

		isMouseDown = false;
		container.style.cursor = 'pointer';

		if (autoRescale) {
			scaleInView();
		}

		positionAxes();
		positionTickNumbers();
		render();
	}

	// bind mouse events
	container.addEventListener('mousemove', onDocumentMouseMove);
	container.addEventListener('mousedown', onDocumentMouseDown);
	container.addEventListener('mouseup', onDocumentMouseUp);

	window.addEventListener('resize', () => {
		canvasSize = Math.min(maxSize, window.innerWidth * innerWidthMultiplier);
		container.style.width = canvasSize + 'px';
		// to avoid overflow when a tick numbers is out of the parent element
		container.style.height = canvasSize + 10 + 'px';

		renderer.setSize(canvasSize, canvasSize);
		renderer.setPixelRatio(window.devicePixelRatio);

		positionTickNumbers();
	});

	const onMouseDownPosition = new Int16Array(2);

	updateCameraPosition();
	positionAxes();
	scaleInView();
	render();
	positionTickNumbers();
}

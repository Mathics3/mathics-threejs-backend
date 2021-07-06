import {
	BoxGeometry,
	Color,
	DirectionalLight,
	EdgesGeometry,
	Geometry,
	Line,
	LineBasicMaterial,
	LineSegments,
	Matrix4,
	Mesh,
	PerspectiveCamera,
	Scene,
	Vector3,
	WebGLRenderer
} from '../vendors/threejs/three.min.js';

import primitiveFunctions from './primitives.js';
import lightFunctions from './lights.js';
import calculateExtent from './extent.js';

function drawGraphics3d(
	container,
	{ axes, elements, lighting, viewpoint },
	maxSize,
	innerWidthMultiplier
) {
	// TODO: add a mechanism to update the enclosing <mspace>
	// TODO: shading, handling of VertexNormals

	maxSize ||= 400;
	innerWidthMultiplier ||= 0.65;

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

	// scale the viewpoint so the camera doesn't be inside the bounding box
	const viewPointScale = Math.max(
		extent.xmax - extent.xmin,
		extent.ymax - extent.ymin,
		extent.zmax - extent.zmin
	);

	const viewPoint = new Vector3(...viewpoint)
		.multiplyScalar(viewPointScale)
		.sub(focus);

	const radius = viewPoint.length();

	onMouseDownTheta = theta = Math.acos(viewPoint.z / radius);
	onMouseDownPhi = phi = (Math.atan2(viewPoint.y, viewPoint.x) + 2 * Math.PI) % (2 * Math.PI);

	const scene = new Scene();

	const camera = new PerspectiveCamera(
		35,           // field of view
		1,            // aspect ratio
		0.1 * radius, // near plane
		1000 * radius // far plane
	);

	function updateCameraPosition() {
		camera.position.set(
			radius * Math.sin(theta) * Math.cos(phi),
			radius * Math.sin(theta) * Math.sin(phi),
			radius * Math.cos(theta)
		).add(focus);

		camera.lookAt(focus);
	}

	updateCameraPosition();
	camera.up.set(0, 0, 1);

	scene.add(camera);

	function getInitialLightPosition({ coords }) {
		if (!(coords instanceof Array)) {
			return;
		}

		// initial light position in spherical polar coordinates
		const temporaryPosition = new Vector3(...coords[0]);

		const result = {
			radius: radius * temporaryPosition.length(),
			phi: 0,
			theta: 0
		};

		if (temporaryPosition.lenght !== 0) {
			result.phi = (Math.atan2(temporaryPosition.y, temporaryPosition.x) + 2 * Math.PI) % (2 * Math.PI);
			result.theta = Math.asin(temporaryPosition.z / result.radius);
		}

		return result;
	}

	const lights = new Array(lighting.length);
	const initialLightPosition = new Array(lighting.length);

	lighting.forEach((light, i) => {
		initialLightPosition[i] = getInitialLightPosition(light);

		lights[i] = lightFunctions[light.type](light, radius);

		scene.add(lights[i]);
	});

	function positionLights() {
		lights.forEach((light, i) => {
			if (light instanceof DirectionalLight) {
				light.position.set(
					initialLightPosition[i].radius * Math.sin(theta + initialLightPosition[i].theta) * Math.cos(phi + initialLightPosition[i].phi),
					initialLightPosition[i].radius * Math.sin(theta + initialLightPosition[i].theta) * Math.sin(phi + initialLightPosition[i].phi),
					initialLightPosition[i].radius * Math.cos(theta + initialLightPosition[i].theta)
				).add(focus);
			}
		});
	}

	const boundingBox = new Mesh(new BoxGeometry(
		extent.xmax - extent.xmin,
		extent.ymax - extent.ymin,
		extent.zmax - extent.zmin
	));

	boundingBox.position.copy(focus);

	const boundingBoxEdges = new LineSegments(
		new EdgesGeometry(boundingBox.geometry),
		new LineBasicMaterial({ color: 0x666666 })
	);

	boundingBoxEdges.position.copy(focus);

	scene.add(boundingBoxEdges);

	// draw the axes
	if (axes.hasaxes instanceof Array) {
		hasAxes = new Array(axes.hasaxes[0], axes.hasaxes[1], axes.hasaxes[2]);
	} else if (axes.hasaxes instanceof Boolean) {
		if (axes) {
			hasAxes = new Array(true, true, true);
		} else {
			hasAxes = new Array(false, false, false);
		}
	} else {
		hasAxes = new Array(false, false, false);
	}

	const axesGeometry = [];
	const axesIndexes = [
		[[0, 5], [1, 4], [2, 7], [3, 6]],
		[[0, 2], [1, 3], [4, 6], [5, 7]],
		[[0, 1], [2, 3], [4, 5], [6, 7]]
	];
	const axesLines = new Array(3);

	for (let i = 0; i < 3; i++) {
		if (hasAxes[i]) {
			axesGeometry[i] = new Geometry();

			axesGeometry[i].vertices.push(new Vector3().addVectors(
				boundingBox.geometry.vertices[axesIndexes[i][0][0]], boundingBox.position
			));
			axesGeometry[i].vertices.push(new Vector3().addVectors(
				boundingBox.geometry.vertices[axesIndexes[i][0][1]], boundingBox.position
			));

			axesLines[i] = new Line(
				axesGeometry[i],
				new LineBasicMaterial({
					color: 0x000000,
					linewidth: 1.5
				})
			);

			scene.add(axesLines[i]);
		}
	}

	function positionAxes() {
		// automatic axes placement
		let nearJ, nearLenght = 10 * radius, farJ, farLenght = 0;

		const temporaryVector = new Vector3();
		for (let i = 0; i < 8; i++) {
			temporaryVector.addVectors(
				boundingBox.geometry.vertices[i],
				boundingBox.position
			).sub(camera.position);

			const temporaryLenght = temporaryVector.length();

			if (temporaryLenght < nearLenght) {
				nearLenght = temporaryLenght;
				nearJ = i;
			} else if (temporaryLenght > farLenght) {
				farLenght = temporaryLenght;
				farJ = i;
			}
		}
		for (let i = 0; i < 3; i++) {
			if (hasAxes[i]) {
				let maxJ, maxLenght = 0;

				for (let j = 0; j < 4; j++) {
					if (axesIndexes[i][j][0] !== nearJ &&
						axesIndexes[i][j][1] !== nearJ &&
						axesIndexes[i][j][0] !== farJ &&
						axesIndexes[i][j][1] !== farJ
					) {
						const edge = new Vector3().subVectors(
							toCanvasCoords(boundingBox.geometry.vertices[axesIndexes[i][j][0]]),
							toCanvasCoords(boundingBox.geometry.vertices[axesIndexes[i][j][1]])
						);
						edge.z = 0;

						if (edge.length() > maxLenght) {
							maxLenght = edge.length();
							maxJ = j;
						}
					}
				}
				axesLines[i].geometry.vertices[0].addVectors(
					boundingBox.geometry.vertices[axesIndexes[i][maxJ][0]],
					boundingBox.position
				);
				axesLines[i].geometry.vertices[1].addVectors(
					boundingBox.geometry.vertices[axesIndexes[i][maxJ][1]],
					boundingBox.position
				);
				axesLines[i].geometry.verticesNeedUpdate = true;
			}
		}

		updateAxes();
	}

	// axes ticks
	const tickMaterial = new LineBasicMaterial({
		color: 0x000000,
		linewidth: 1.2
	});
	const ticks = new Array(3),
		ticksSmall = new Array(3),
		tickLength = 0.005 * radius;

	for (let i = 0; i < 3; i++) {
		if (hasAxes[i]) {
			ticks[i] = [];

			for (let j = 0; j < axes.ticks[i][0].length; j++) {
				const tickGeometry = new Geometry();

				tickGeometry.vertices.push(new Vector3());
				tickGeometry.vertices.push(new Vector3());

				ticks[i].push(new Line(tickGeometry, tickMaterial));

				scene.add(ticks[i][j]);
			}

			ticksSmall[i] = [];

			for (let j = 0; j < axes.ticks[i][1].length; j++) {
				const tickGeometry = new Geometry();

				tickGeometry.vertices.push(new Vector3());
				tickGeometry.vertices.push(new Vector3());

				ticksSmall[i].push(new Line(tickGeometry, tickMaterial));

				scene.add(ticksSmall[i][j]);
			}
		}
	}

	function getTickDir(i) {
		const tickDir = new Vector3();

		if (i === 0) {
			if (0.25 * Math.PI < theta && theta < 0.75 * Math.PI) {
				if (axesGeometry[0].vertices[0].z > boundingBox.position.z) {
					tickDir.setZ(-tickLength);
				} else {
					tickDir.setZ(tickLength);
				}
			} else {
				if (axesGeometry[0].vertices[0].y > boundingBox.position.y) {
					tickDir.setY(-tickLength);
				} else {
					tickDir.setY(tickLength);
				}
			}
		} else if (i === 1) {
			if (0.25 * Math.PI < theta && theta < 0.75 * Math.PI) {
				if (axesGeometry[1].vertices[0].z > boundingBox.position.z) {
					tickDir.setZ(-tickLength);
				} else {
					tickDir.setZ(tickLength);
				}
			} else {
				if (axesGeometry[1].vertices[0].x > boundingBox.position.x) {
					tickDir.setX(-tickLength);
				} else {
					tickDir.setX(tickLength);
				}
			}
		} else if (i === 2) {
			if ((0.25 * Math.PI < phi && phi < 0.75 * Math.PI) || (1.25 * Math.PI < phi && phi < 1.75 * Math.PI)) {
				if (axesGeometry[2].vertices[0].x > boundingBox.position.x) {
					tickDir.setX(-tickLength);
				} else {
					tickDir.setX(tickLength);
				}
			} else {
				if (axesGeometry[2].vertices[0].y > boundingBox.position.y) {
					tickDir.setY(-tickLength);
				} else {
					tickDir.setY(tickLength);
				}
			}
		}

		return tickDir;
	}

	function updateAxes() {
		for (let i = 0; i < 3; i++) {
			if (hasAxes[i]) {
				let tickDir = getTickDir(i);

				for (let j = 0; j < axes.ticks[i][0].length; j++) {
					let value = axes.ticks[i][0][j];

					ticks[i][j].geometry.vertices[0].copy(axesGeometry[i].vertices[0]);
					ticks[i][j].geometry.vertices[1].addVectors(
						axesGeometry[i].vertices[0],
						tickDir
					);

					if (i === 0) {
						ticks[i][j].geometry.vertices[0].x = value;
						ticks[i][j].geometry.vertices[1].x = value;
					} else if (i === 1) {
						ticks[i][j].geometry.vertices[0].y = value;
						ticks[i][j].geometry.vertices[1].y = value;
					} else if (i === 2) {
						ticks[i][j].geometry.vertices[0].z = value;
						ticks[i][j].geometry.vertices[1].z = value;
					}

					ticks[i][j].geometry.verticesNeedUpdate = true;
				}

				for (let j = 0; j < axes.ticks[i][1].length; j++) {
					let value = axes.ticks[i][1][j];

					ticksSmall[i][j].geometry.vertices[0].copy(axesGeometry[i].vertices[0]);
					ticksSmall[i][j].geometry.vertices[1].addVectors(
						axesGeometry[i].vertices[0],
						tickDir.clone().multiplyScalar(0.5)
					);

					if (i === 0) {
						ticksSmall[i][j].geometry.vertices[0].x = value;
						ticksSmall[i][j].geometry.vertices[1].x = value;
					} else if (i === 1) {
						ticksSmall[i][j].geometry.vertices[0].y = value;
						ticksSmall[i][j].geometry.vertices[1].y = value;
					} else if (i === 2) {
						ticksSmall[i][j].geometry.vertices[0].z = value;
						ticksSmall[i][j].geometry.vertices[1].z = value;
					}

					ticksSmall[i][j].geometry.verticesNeedUpdate = true;
				}
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

				if (i < axes.ticks_style.length) {
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
			(temporaryPosition.z + 1) * 200
		);
	}

	function positionTickNumbers() {
		for (let i = 0; i < 3; i++) {
			if (hasAxes[i]) {
				for (let j = 0; j < tickNumbers[i].length; j++) {
					const tickPosition = toCanvasCoords(
						ticks[i][j].geometry.vertices[0].clone().add(
							new Vector3().subVectors(
								ticks[i][j].geometry.vertices[0],
								ticks[i][j].geometry.vertices[1]
							).multiplyScalar(6)
						)
					).multiplyScalar(canvasSize / maxSize);

					// distance of the bounding box
					tickPosition.setX(tickPosition.x - 10);
					tickPosition.setY(tickPosition.y + 8);

					tickNumbers[i][j].style.position = `absolute`;
					tickNumbers[i][j].style.left = `${tickPosition.x}px`;
					tickNumbers[i][j].style.top = `${tickPosition.y}px`;

					if (tickPosition.x < 5 || tickPosition.x > 395 || tickPosition.y < 5 || tickPosition.y > 395) {
						tickNumbers[i][j].style.display = 'none';
					}
					else {
						tickNumbers[i][j].style.display = '';
					}
				}
			}
		}
	}

	// plot the primatives
	elements.forEach((element) => {
		scene.add(primitiveFunctions[element.type](element, canvasSize));
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
			proj2d.addVectors(
				boundingBox.geometry.vertices[i],
				boundingBox.position
			).applyMatrix4(camera.matrixWorldInverse);

			temporaryFOV = Math.max(
				temporaryFOV,
				114.59 * Math.max(
					Math.abs(Math.atan(proj2d.x / proj2d.z) / camera.aspect),
					Math.abs(Math.atan(proj2d.y / proj2d.z))
				)
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

		onMouseDownFocus = new Vector3().copy(focus);
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
					- radius * Math.cos(theta) * Math.sin(phi) * (theta < 0.5 * Math.PI ? 1 : -1),
					radius * Math.cos(theta) * Math.cos(phi) * (theta < 0.5 * Math.PI ? 1 : -1),
					0
				).normalize();

				const cameraY = new Vector3().crossVectors(
					new Vector3()
						.subVectors(focus, camera.position)
						.normalize(),
					cameraX
				);

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

				phi = 2 * Math.PI * (onMouseDownPosition[0] - event.clientX) / canvasSize + onMouseDownPhi;
				phi = (phi + 2 * Math.PI) % (2 * Math.PI);
				theta = 2 * Math.PI * (onMouseDownPosition[1] - event.clientY) / canvasSize + onMouseDownTheta;
				const epsilon = 1e-12; // prevents spinnging from getting stuck
				theta = Math.max(Math.min(Math.PI - epsilon, theta), epsilon);

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

window.drawGraphics3d = drawGraphics3d;

export default drawGraphics3d;

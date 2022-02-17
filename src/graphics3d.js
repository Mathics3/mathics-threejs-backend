import {
	BufferAttribute,
	BufferGeometry,
	LineSegments,
	PerspectiveCamera,
	Scene,
	Vector3,
	WebGLRenderer
} from '../vendors/three.js';

import calculateExtent from './extent.js';
import { positionTickNumbers, setTicksInitialPosition } from './axes.js';
import lightFunctions, { getInitialLightPosition, positionLights } from './lights.js';
import primitiveFunctions from './primitives/index.js';
import { getBasicMaterial } from './shader.js';

export default function (
	container,
	{
		axes = {},
		autoRescale = true,
		extent,
		elements = [],
		lighting = [],
		viewpoint = [1.3, -2.4, 2]
	},
	maxSize = 400,
	innerWidthMultiplier = 0.65
) {
	axes.hasaxes ??= false;
	extent ??= calculateExtent(elements);

	let isCtrlDown, isShiftDown, onMouseDownFocus, onCtrlDownFov,
		hasAxes, isMouseDown = false,
		theta, onMouseDownTheta, phi, onMouseDownPhi,
		canvasSize = Math.min(maxSize, window.innerWidth * innerWidthMultiplier);

	container.style.width = canvasSize + 'px';
	// to avoid overflow when a tick numbers is out of the parent element
	container.style.height = canvasSize + 10 + 'px';

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
		camera.position.set(
			radius * Math.sin(theta) * Math.cos(phi),
			radius * Math.sin(theta) * Math.sin(phi),
			radius * Math.cos(theta)
		).add(focus);

		camera.lookAt(focus);
	}

	// Without this the initial axes postion is wrong.
	updateCameraPosition();
	camera.up.set(0, 0, 1);

	scene.add(camera);

	const lights = [];

	lighting.forEach((element) => {
		const light = lightFunctions[element.type](element, extent);

		if (element.type === 'directional') {
			const position = getInitialLightPosition(element.coords, radius, extent);
			light.radius = position.radius;
			light.theta = position.theta;
			light.phi = position.phi;
			lights.push(light);
		}

		scene.add(light);
	});

	const grayBasicMaterial = getBasicMaterial([0.4, 0.4, 0.4], 1);

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
				extent.xmin, extent.ymax, extent.zmin
			]), 3)
		),
		grayBasicMaterial
	);

	scene.add(boundingBox);

	// draw the axes
	if (axes.hasaxes instanceof Array) {
		hasAxes = axes.hasaxes;
	} else {
		hasAxes = [axes.hasaxes, axes.hasaxes, axes.hasaxes];
	}

	const axesGeometry = [],
		axesVerticesPosition = new BufferAttribute(new Float32Array([
			boundingBox.geometry.attributes.position.array[0],
			boundingBox.geometry.attributes.position.array[1],
			boundingBox.geometry.attributes.position.array[2],
			boundingBox.geometry.attributes.position.array[3],
			boundingBox.geometry.attributes.position.array[4],
			boundingBox.geometry.attributes.position.array[5]
		]), 3);

	// axes ticks
	const ticks = new Array(3), ticksSmall = new Array(3);

	for (let i = 0; i < 3; i++) {
		if (hasAxes[i]) {
			axesGeometry[i] = new BufferGeometry().setAttribute(
				'position',
				axesVerticesPosition
			);
		}
	}

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
				grayBasicMaterial
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
				grayBasicMaterial
			);

			scene.add(ticksSmall[i]);
		}
	}

	setTicksInitialPosition(hasAxes, axes, ticks, ticksSmall, axesGeometry, radius, extent);

	// axes numbering using divs
	const tickNumbers = new Array(3);

	for (let i = 0; i < 3; i++) {
		if (hasAxes[i]) {
			tickNumbers[i] = new Array(axes.ticks[i][0].length);

			for (let j = 0; j < tickNumbers[i].length; j++) {
				let color = 'black';

				if (i < axes.ticks_style?.length) {
					color = `rgb(${axes.ticks_style[i][0] * 255}, ${axes.ticks_style[i][1] * 255}, ${axes.ticks_style[i][2] * 255})`;
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
		positionLights(lights, theta, phi, focus);
		renderer.render(scene, camera);
	}

	function scaleInView() {
		camera.updateMatrixWorld(); // without this scaleInView doesn't work

		const proj2d = new Vector3();

		let temporaryFOV = 0;

		// The loop bellow finds the smallest FOV that allows the
		// bounding box to be fully shown.
		for (let i = 0; i < 8; i++) {
			proj2d.set(
				boundingBox.geometry.attributes.position.array[i * 3],
				boundingBox.geometry.attributes.position.array[i * 3 + 1],
				boundingBox.geometry.attributes.position.array[i * 3 + 2]
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
			positionTickNumbers(hasAxes, tickNumbers, ticks, camera, canvasSize, maxSize);

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
			positionTickNumbers(hasAxes, tickNumbers, ticks, camera, canvasSize, maxSize);
			render();
		}
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

		positionTickNumbers(hasAxes, tickNumbers, ticks, camera, canvasSize, maxSize);
	});

	const onMouseDownPosition = new Int16Array(2);

	updateCameraPosition();
	scaleInView();
	render();
	positionTickNumbers(hasAxes, tickNumbers, ticks, camera, canvasSize, maxSize);
}

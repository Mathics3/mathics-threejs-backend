// @ts-check

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
import lightFunctions from './lights.js';
import primitiveFunctions from './primitives/index.js';
import { getBasicMaterial } from './shader.js';
import { getUniformsBuffer } from './uniforms.js';
import { clamp } from './math.js';

/**
 * @typedef {import('./index.js').AxesTicks} AxesTicks
 * @typedef {import('./index.js').Axes} Axes
 * @typedef {import('./index.js').ConcreteAxes} ConcreteAxes
 * @typedef {import('./index.js').TicksStyle} TicksStyle
 */

/**
 * Set the default CSS for the container
 * @param {HTMLElement} container
 */
function setDefaultContainerStyle(container) {
	const style = getComputedStyle(container);

	// This must be block, otherwise the height will be 0 and nothing will be
	// shown.
	container.style.display = 'block';
	if (!style.width || style.width === '0px') container.style.width = '65vw';
	if (!style.maxWidth) container.style.maxWidth = '400px';
	if (!style.height || style.height === '0px') container.style.height = '65vw';
	if (!style.maxHeight) container.style.maxHeight = '400px';
	// Avoid overflow when a tick numbers is out of the parent element.
	if (!style.paddingTop) container.style.paddingTop = '5px';
	if (!style.paddingBottom) container.style.paddingBottom = '5px';
	// Currently the axes labels are drawn using HTML elements with
	// `position: absolute` so the graphics container must have
	// `position: relative` to draw the axes labels.
	// We don't overwrite it because the user may want to make the container
	// have an absolute position.
	if (!style.position) container.style.position = 'relative';
	if (!style.cursor) container.style.cursor = 'pointer';
}

/**
 * Plot the data
 * @param {HTMLElement} container
 * @param {{
 *     axes?: Axes,
 *     autoRescale?: boolean,
 *     extent?: import('./extent.js').Extent,
 *     elements?: import('./primitives/index.js').PrimitiveElement[],
 *     lighting?: { type: import('./lights.js').LightType }[],
 *     viewpoint?: import('./coordinateUtils.js').Coordinate
 * }} data
 */
export default function (
	container,
	{
		axes = {},
		autoRescale = true,
		extent,
		elements = [],
		lighting = [],
		viewpoint = [1.3, -2.4, 2]
	}
) {
	axes.hasaxes ??= false;
	extent ??= calculateExtent(elements);

	let /** @type {boolean} */ isCtrlDown,
		/** @type {boolean} */ isShiftDown,
		/** @type {Vector3} */ onMouseDownFocus,
		/** @type {number} */ onCtrlDownFov,
		/** @type {[boolean, boolean, boolean]} */ hasAxes,
		/** @type {boolean} */ isMouseDown = false,
		/** @type {number} */ theta,
		/** @type {number} */ onMouseDownTheta,
		/** @type {number} */ phi,
		/** @type {number} */ onMouseDownPhi,
		/** @type {number} */ onTouchStartFingersDistance;

	const onMouseDownPosition = new Int16Array(2);

	setDefaultContainerStyle(container);

	const defaultCursor = container.style.cursor;

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

	theta = Math.acos(viewPoint.z / radius);
	phi = Math.atan2(viewPoint.y, viewPoint.x);

	const scene = new Scene(),
		camera = new PerspectiveCamera(
			35,           // field of view
			1,            // aspect ratio
			0.1 * radius, // near plane
			1000 * radius // far plane
		);

	function updateCameraPosition() {
		// @ts-expect-error: bad three.js typing
		camera.position.set(
			radius * Math.sin(theta) * Math.cos(phi),
			radius * Math.sin(theta) * Math.sin(phi),
			radius * Math.cos(theta)
		).add(focus);

		camera.lookAt(focus);
	}

	// Without this the initial axes position is wrong.
	updateCameraPosition();
	camera.up.set(0, 0, 1);

	scene.add(camera);

	const uniforms = getUniformsBuffer();

	lighting.forEach(
		(element) => lightFunctions[element.type](element, uniforms, extent)
	);

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

	// axes ticks
	const ticks = /** @type {[LineSegments, LineSegments, LineSegments]} */(new Array(3)),
		ticksSmall = /** @type {[LineSegments, LineSegments, LineSegments]} */(new Array(3));

	for (let i = 0; i < 3; i++) {
		if (hasAxes[i]) {
			ticks[i] = new LineSegments(
				new BufferGeometry().setAttribute(
					'position',
					new BufferAttribute(
						new Float32Array(
							6 * /** @type {AxesTicks} */(axes.ticks)[i][0].length
						),
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
						new Float32Array(
							6 * /** @type {AxesTicks} */(axes.ticks)[i][1].length
						),
						3
					)
				),
				grayBasicMaterial
			);

			scene.add(ticksSmall[i]);
		}
	}

	setTicksInitialPosition(
		hasAxes,
		/** @type {ConcreteAxes} */(axes),
		ticks,
		ticksSmall,
		// @ts-expect-error: we are sure this attribute is in there
		boundingBox.geometry.attributes.position.array,
		radius,
		extent
	);

	const tickNumbers = /** @type {[HTMLElement[], HTMLElement[], HTMLElement[]]} */(new Array(3));

	for (let i = 0; i < 3; i++) {
		if (hasAxes[i]) {
			tickNumbers[i] = new Array(
				/** @type {AxesTicks} */(axes.ticks)[i][0].length
			);

			for (let j = 0; j < tickNumbers[i].length; j++) {
				let color = 'black';

				if (i < (axes.ticks_style?.length ?? 0)) {
					color = `rgb(
						${/** @type {TicksStyle} */(axes.ticks_style)[i][0] * 255},
						${/** @type {TicksStyle} */(axes.ticks_style)[i][1] * 255},
						${/** @type {TicksStyle} */(axes.ticks_style)[i][2] * 255}
					)`;
				}

				tickNumbers[i][j] = document.createElement('div');
				tickNumbers[i][j].innerHTML =
					/** @type {AxesTicks} */(axes.ticks)[i][2][j]
						.startsWith('0.')
						? /** @type {AxesTicks} */(axes.ticks)[i][2][j].replace('0.', '.')
						: /** @type {AxesTicks} */(axes.ticks)[i][2][j];

				// handle minus signs
				if (/** @type {AxesTicks} */(axes.ticks)[i][0][j] >= 0) {
					tickNumbers[i][j].style.paddingLeft = '0.5em';
				} else {
					tickNumbers[i][j].style.paddingLeft = '0px';
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
		const sceneElement = primitiveFunctions[element.type](
			element,
			uniforms,
			/** @type {import('./extent.js').Extent} */(extent),
			container
		);
		// Primitives like https://mathics3.github.io/mathics-threejs-backend/primitives/text
		// don't add anything to the scene, but to the container.
		if (sceneElement) scene.add(sceneElement);
	});

	const renderer = new WebGLRenderer({
		antialias: true,
		alpha: true
	});

	renderer.setSize(
		parseInt(getComputedStyle(container).width),
		parseInt(getComputedStyle(container).height)
	);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.domElement.style.width = '100%';
	renderer.domElement.style.height = '100%';
	container.appendChild(renderer.domElement);

	function render() {
		uniforms.pointLights.value.forEach((light) => {
			light.position = light.basePosition.clone().applyMatrix4(camera.matrixWorldInverse);
		});

		uniforms.spotLights.value.forEach((light) => {
			light.direction = light.baseDirection.clone().transformDirection(camera.matrixWorldInverse);
			light.position = light.basePosition.clone().applyMatrix4(camera.matrixWorldInverse);
		});

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
				// @ts-expect-error: we are sure this attribute is in there
				boundingBox.geometry.attributes.position.array[i * 3],
				// @ts-expect-error: the same as above
				boundingBox.geometry.attributes.position.array[i * 3 + 1],
				// @ts-expect-error: the same as above
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

	/**
	 * @param {MouseEvent | TouchEvent} event
	 * @param {boolean} touch whether the event is with touch instead of mouse.
	 */
	function onMouseDown(event, touch) {
		event.preventDefault();

		isMouseDown = true;
		isShiftDown = false;
		isCtrlDown = false;

		onMouseDownTheta = theta;
		onMouseDownPhi = phi;

		onMouseDownPosition[0] = touch
			? /** @type {TouchEvent} */(event).touches[0].clientX
			: /** @type {MouseEvent} */(event).clientX;
		onMouseDownPosition[1] = touch
			? /** @type {TouchEvent} */(event).touches[0].clientY
			: /** @type {MouseEvent} */(event).clientY;

		onMouseDownFocus = focus.clone();
	}

	/**
	 * @param {MouseEvent | TouchEvent} event
	 * @param {boolean} touch whether the event is with touch instead of mouse.
	 */
	function onMouseMove(event, touch) {
		event.preventDefault();

		if (!isMouseDown) return;

		const clientX = touch
			? /** @type {TouchEvent} */(event).touches[0].clientX
			: /** @type {MouseEvent} */(event).clientX;
		const clientY = touch
			? /** @type {TouchEvent} */(event).touches[0].clientY
			: /** @type {MouseEvent} */(event).clientY;

		positionTickNumbers(hasAxes, tickNumbers, ticks, camera, container);

		if (event.shiftKey) { // pan with mouse
			if (!isShiftDown) {
				isShiftDown = true;
				onMouseDownPosition[0] = clientX;
				onMouseDownPosition[1] = clientY;
				autoRescale = false;
				container.style.cursor = 'move';
			}

			const cameraX = new Vector3(
				-radius * Math.cos(theta) * Math.sin(phi),
				radius * Math.cos(theta) * Math.cos(phi),
				0
			).normalize();

			const cameraY = new Vector3()
				// @ts-expect-error: bad three.js typing
				.subVectors(focus, camera.position)
				.normalize()
				.cross(cameraX);

			const { width } = getComputedStyle(container);

			focus.x = onMouseDownFocus.x + (radius / parseInt(width)) * (cameraX.x * (onMouseDownPosition[0] - clientX) + cameraY.x * (onMouseDownPosition[1] - clientY));
			focus.y = onMouseDownFocus.y + (radius / parseInt(width)) * (cameraX.y * (onMouseDownPosition[0] - clientX) + cameraY.y * (onMouseDownPosition[1] - clientY));
			focus.z = onMouseDownFocus.z + (radius / parseInt(width)) * (cameraY.z * (onMouseDownPosition[1] - clientY));

			updateCameraPosition();
		} else if (
			event.ctrlKey
			|| (touch && /** @type {TouchEvent} */(event).touches.length === 2)
		) { // zoom
			if (!isCtrlDown) {
				isCtrlDown = true;
				onCtrlDownFov = camera.fov;
				onMouseDownPosition[0] = clientX;
				onMouseDownPosition[1] = clientY;
				autoRescale = false;
				container.style.cursor = 'crosshair';

				if (touch) {
					onTouchStartFingersDistance = Math.hypot(
						clientX - /** @type {TouchEvent} */(event).touches[1].clientX,
						clientY - /** @type {TouchEvent} */(event).touches[1].clientY
					);
				}
			}

			let fov = onCtrlDownFov;

			if (touch) {
				fov -= (Math.hypot(
					clientX - /** @type {TouchEvent} */(event).touches[1].clientX,
					clientY - /** @type {TouchEvent} */(event).touches[1].clientY
				) - onTouchStartFingersDistance) / 25;
			} else {
				fov += 20 * Math.atan((clientY - onMouseDownPosition[1]) / 50);
			}

			// Keeps the FOV between 1 and 150.
			camera.fov = Math.max(1, Math.min(150, fov));

			camera.updateProjectionMatrix();
		} else { // spin
			if (isCtrlDown || isShiftDown) {
				onMouseDownPosition[0] = clientX;
				onMouseDownPosition[1] = clientY;
				isShiftDown = false;
				isCtrlDown = false;
			}

			container.style.cursor = 'grabbing';

			const { width, height } = getComputedStyle(container);

			phi = onMouseDownPhi + 2 * Math.PI * (
				onMouseDownPosition[0] - /** @type {MouseEvent} */(event).clientX
			) / parseInt(width);

			theta = onMouseDownTheta + 2 * Math.PI * (
				onMouseDownPosition[1] - /** @type {MouseEvent} */(event).clientY
			) / parseInt(height);

			// This prevents spinning over the poles by keeping the angle
			// in the range [1e-12, Pi - 1e-12].
			// Angles too close to 0 or Pi problems.
			theta = clamp(theta, 1e-12, Math.PI - 1e-12);

			updateCameraPosition();
		}

		render();
	}

	/**
	 * @param {MouseEvent | TouchEvent} event
	 */
	function onMouseUp(event) {
		event.preventDefault();

		isMouseDown = false;
		container.style.cursor = defaultCursor;

		if (autoRescale) {
			scaleInView();
			positionTickNumbers(hasAxes, tickNumbers, ticks, camera, container);
			render();
		}
	}

	// bind mouse events
	container.addEventListener('mousemove', (event) => onMouseMove(event, false));
	container.addEventListener('touchmove', (event) => onMouseMove(event, true));

	container.addEventListener('mousedown', (event) => onMouseDown(event, false));
	container.addEventListener('touchstart', (event) => onMouseDown(event, true));

	container.addEventListener('mouseup', onMouseUp);
	container.addEventListener('touchend', onMouseUp);

	new ResizeObserver(() => {
		const { width, height } = getComputedStyle(container);

		renderer.setSize(parseInt(width), parseInt(height));

		render();

		positionTickNumbers(hasAxes, tickNumbers, ticks, camera, container);
	}).observe(container);

	updateCameraPosition();
	scaleInView();
	render();
	positionTickNumbers(hasAxes, tickNumbers, ticks, camera, container);
}

// @ts-check

import drawGraphics3d from './graphics3d.js';

/**
 * @typedef {[number[], number[], string[]]} AxesTick
 * @typedef {[AxesTick, AxesTick, AxesTick]} AxesTicks
 * @typedef {[number, number, number]} TickStyle
 * @typedef {[TickStyle, TickStyle, TickStyle]} TicksStyle
 * @typedef {{
 *     hasaxes?: boolean | [boolean, boolean, boolean],
 *     ticks?: AxesTicks,
 *     ticks_style?: TicksStyle
 * }} Axes
 * @typedef {{
 *     hasaxes: boolean | [boolean, boolean, boolean],
 *     ticks: AxesTicks,
 *     ticks_style?: TicksStyle
 * }} ConcreteAxes
 */

/**
 * Translate deprecated code into running code.
 * @param {HTMLElement} container
 * @param {{
 *     axes?: Axes,
 *     autoRescale?: boolean,
 *     extent?: import('./extent.js').Extent,
 *     elements?: any[],
 *     lighting?: any[],
 *     protocol?: string,
 *     viewpoint?: import('./coordinateUtils.js').Coordinate
 * }} data data
 * @param {number} maxSize
 * @param {number} innerWidthMultiplier
 */
function translationLayer(container, data, maxSize, innerWidthMultiplier) {
	maxSize ??= 400;
	innerWidthMultiplier ??= 0.65;

	if (data.protocol) {
		// protocol version is X.Y, so it is an array of two elements: major version and minor version
		const versionArray = data.protocol.match(/\d/g);

		if (parseInt(/** @type {RegExpMatchArray} */(versionArray)[0]) !== 1) {
			const warning = document.createElement('p');

			warning.style.color = 'yellow';
			warning.innerText = `The major revision version of mathics-threejs-backend is 1, but it was expected to be ${/** @type {RegExpMatchArray} */(versionArray)[0]}. Trying to draw the graphics.`;

			container.appendChild(warning);
		} else if (parseInt(/** @type {RegExpMatchArray} */(versionArray)[1]) > 3) {
			const warning = document.createElement('p');

			warning.style.color = 'yellow';
			warning.innerText = `The minor revision version of mathics-threejs-backend is 3, but it was expected to be at least ${/** @type {RegExpMatchArray} */(versionArray)[1]}. Trying to draw the graphics.`;

			container.appendChild(warning);
		}
	}

	data.elements?.forEach((/** @type {*} */primitive) => {
		if (primitive.faceColor) {
			primitive.color = primitive.faceColor;
		}

		primitive.color = primitive.color.slice(0, 3);
	});

	data.lighting?.forEach((/** @type {*} */light) => {
		if (light.position) {
			light.coords = [light.position];
		}

		light.type = light.type.toLowerCase();
	});

	container.style.maxWidth = maxSize + 'px';
	container.style.width = 100 * innerWidthMultiplier + 'vw';
	container.style.maxHeight = maxSize + 'px';
	container.style.height = 100 * innerWidthMultiplier + 'vw';

	return drawGraphics3d(container, data);
}

// @ts-expect-error: drawGraphics3d ins't a property of window.
window.drawGraphics3d = translationLayer;

export default drawGraphics3d;

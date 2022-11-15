// @ts-check

/**
 * See {@link PrimitiveFunction} for more information about the
 * shape of a primitive function.
 * See {@link https://mathics3.github.io/mathics-threejs-backend/primitives/text}
 * for the high-level description of what is being rendered.
 * @type {import('./index.js').PrimitiveFunction}
 *
 * Note that this is one of the few primitives (in the time of writing
 * the only) that accepts only "relative" coordinates.
 * Also note that differently from WL's {@link https://reference.wolfram.com/language/ref/Text.html Text}
 * where the coordinates go from -1 to 1 (and the center is 0), here
 * the coordinates go from 0 to 1 (and the center is 0.5).
 *
 * The zIndex of the text is a linear function of the z coordinates.
 * zIdex may have a default, in our case it has the default 0.
 */
export default function ({
	color = [0, 0, 0],
	coords = [[[null, [0, 0, 0]]]],
	texts,
	textSize = 20
}, uniforms, extent, container) {
	texts?.forEach((text, index) => {
		// Go to the next text if the coordinate is invalid.
		if (coords[index].length < 2 || !coords[index][1]) return;

		const coord = /** @type import('../coordinateUtils').Coordinate */(coords[index][1]);

		const textElement = document.createElement('span');
		textElement.innerText = text;
		textElement.style.position = 'absolute';
		// The text shouldn't be selected neither the "editing" cursor
		// should appear when hovering it.
		textElement.style.pointerEvents = 'none';
		// We default zIndex to 0.
		textElement.style.zIndex = `${coord[2] ?? 0}`;
		textElement.style.color = `rgb(
			${color[0] * 255},
			${color[1] * 255},
			${color[2] * 255}
		)`;
		textElement.style.fontSize = `${textSize}px`;

		// This needs to be done BEFORE the CSS hack because we need the
		// element's dimensions.
		container.appendChild(textElement);

		// The CSS hack bellow centers the text at its coordinate.
		textElement.style.left = `calc(${coord[0] * 100}% - ${textElement.offsetWidth / 2}px)`;
		textElement.style.bottom = `calc(${coord[0] * 100}% - ${textElement.offsetHeight / 2}px)`;
	});

	return null;
}

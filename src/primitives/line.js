import {
	BufferAttribute,
	BufferGeometry,
	Color,
	Line,
	LineBasicMaterial
} from '../../vendors/three.js';

import { getPopulatedCoordinateBuffer } from '../bufferUtils.js';

// See https://reference.wolfram.com/language/ref/Line
// for the high-level description of what is being rendered.
export default function ({ color, coords, opacity = 1 }, extent) {
	return new Line(
		new BufferGeometry().setAttribute(
			'position',
			new BufferAttribute(
				getPopulatedCoordinateBuffer(coords, extent),
				3
			)
		),
		new LineBasicMaterial({
			color: new Color(...color),
			opacity,
			transparent: opacity !== 1
		})
	);
}
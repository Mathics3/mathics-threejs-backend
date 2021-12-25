import {
	BufferAttribute,
	BufferGeometry,
	Line,
	RawShaderMaterial
} from '../../vendors/three.js';

import { getPopulatedCoordinateBuffer } from '../bufferUtils.js';
import { getBasicMaterial } from '../shader.js';

// See https://reference.wolfram.com/language/ref/Line
// for the high-level description of what is being rendered.
// Differently from WL's Line, our lines aren't affected by
// lightning and therefore don't have VertexNormals.
export default function ({ color, coords, opacity = 1 }, extent) {
	return new Line(
		new BufferGeometry().setAttribute(
			'position',
			new BufferAttribute(
				getPopulatedCoordinateBuffer(coords, extent),
				3
			)
		),
		getBasicMaterial(color, opacity)
	);
}

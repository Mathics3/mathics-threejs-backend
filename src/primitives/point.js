import {
	BufferAttribute,
	BufferGeometry,
	Points,
	ShaderMaterial
} from '../../vendors/three.js';

import { getPopulatedCoordinateBuffer } from '../bufferUtils.js';

// See https://reference.wolfram.com/language/ref/Point
// for the high-level description of what is being rendered.
export default function ({ color, coords, opacity = 1, pointSize }, extent, canvasSize) {
	return new Points(
		new BufferGeometry().setAttribute(
			'position',
			new BufferAttribute(
				getPopulatedCoordinateBuffer(coords, extent),
				3
			)
		),
		new ShaderMaterial({
			transparent: true,
			depthWrite: false,
			uniforms: {
				size: { value: pointSize * canvasSize },
				color: { value: [...color, opacity] }
			},
			vertexShader: `
				uniform float size;

				void main() {
					gl_PointSize = size;
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
				}
			`,
			fragmentShader: `
				uniform vec4 color;

				void main() {
					if (length(gl_PointCoord - vec2(0.5)) > 0.5) discard;

					gl_FragColor = color;
				}
			`
		})
	);
}

import {
	BufferAttribute,
	BufferGeometry,
	Line,
	RawShaderMaterial
} from '../../vendors/three.js';

import { getPopulatedCoordinateBuffer } from '../bufferUtils.js';

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
		new RawShaderMaterial({
			opacity,
			transparent: opacity !== 1,
			uniforms: {
				color: { value: [...color, opacity] }
			},
			vertexShader: `#version 300 es
				in vec3 position;

				uniform mat4 projectionMatrix;
				uniform mat4 modelViewMatrix;

				void main() {
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
				}
			`,
			fragmentShader: `#version 300 es
				uniform lowp vec4 color;

				out lowp vec4 pc_fragColor;

				void main() {
					pc_fragColor = color;
				}
			`
		})
	);
}

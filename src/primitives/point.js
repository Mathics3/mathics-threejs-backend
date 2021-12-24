import {
	BufferAttribute,
	BufferGeometry,
	Points,
	RawShaderMaterial
} from '../../vendors/three.js';

import { getPopulatedCoordinateBuffer } from '../bufferUtils.js';

// See https://reference.wolfram.com/language/ref/Point
// for the high-level description of what is being rendered.
// Differently from WL's Point, our points aren't affected by
// lightning and therefore don't have VertexNormals.
export default function ({ color, coords, opacity = 1, pointSize }, extent, canvasSize) {
	return new Points(
		new BufferGeometry().setAttribute(
			'position',
			new BufferAttribute(
				getPopulatedCoordinateBuffer(coords, extent),
				3
			)
		),
		new RawShaderMaterial({
			transparent: true,
			depthWrite: false,
			uniforms: {
				size: { value: pointSize * canvasSize },
				color: { value: [...color, opacity] }
			},
			vertexShader: `#version 300 es
				in vec3 position;

				uniform mat4 projectionMatrix;
				uniform mat4 modelViewMatrix;
				uniform float size;

				void main() {
					gl_PointSize = size;
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
				}
			`,
			fragmentShader: `#version 300 es
				uniform lowp vec4 color;

				out lowp vec4 pc_fragColor;

				void main() {
					if (length(gl_PointCoord - vec2(0.5)) > 0.5) discard;

					pc_fragColor = color;
				}
			`
		})
	);
}

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
export default function ({ color, coords, dashed = false, gapSize = 10, opacity = 1 }, extent, canvasSize) {
	return new Line(
		new BufferGeometry().setAttribute(
			'position',
			new BufferAttribute(
				getPopulatedCoordinateBuffer(coords, extent),
				3
			)
		),
		dashed
			? new RawShaderMaterial({
				opacity,
				transparent: opacity !== 1,
				uniforms: {
					resolution: { value: [canvasSize, canvasSize] },
					quadrupleGapInverse: { value: 1 / (4 * gapSize) }
				},
				vertexShader: `#version 300 es
					in vec3 position;

					uniform mat4 projectionMatrix;
					uniform mat4 modelViewMatrix;

					flat out vec2 startPosition;
					out vec2 vertexPosition;

					void main() {
						gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);

						vertexPosition = (gl_Position.xyz / gl_Position.w).xy;
						startPosition = vertexPosition;
					}
				`,
				fragmentShader: `#version 300 es
					precision mediump float;

					flat in vec2 startPosition;
					in vec2 vertexPosition;

					uniform vec2 resolution;
					uniform float quadrupleGapInverse;

					out vec4 pc_fragColor;

					void main() {
						float doubleDistance = length((vertexPosition - startPosition) * resolution);

						if (fract(doubleDistance * quadrupleGapInverse) > 0.5) discard;

						pc_fragColor = vec4(${color[0]}, ${color[1]}, ${color[2]}, ${opacity});
					}
				`
			})
			: getBasicMaterial(color, opacity)
	);
}

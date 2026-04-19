// @ts-check

import {
	BufferAttribute,
	BufferGeometry,
	GLSL3,
	Points,
	RawShaderMaterial
} from '../../vendors/three.js';

import { getPopulatedCoordinateBuffer } from '../bufferUtils.js';

/**
 * See {@link PrimitiveFunction} for more information about the
 * shape of a primitive function.
 * See {@link https://mathics3.github.io/mathics-threejs-backend/primitives/point}
 * for the high-level description of what is being rendered.
 * Differently from WL's Point, our points aren't affected by
 * lightning and therefore don't have VertexNormals.
 *
 * @type {import('./index.js').PrimitiveFunction}
 */

export default function (
	{ color = [0, 0, 0], coords, opacity = 1, pointSize = 1 },
	uniforms,
	extent
) {
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
			glslVersion: GLSL3,
			uniforms,
			vertexShader: `
                in vec3 position;
                uniform mat4 projectionMatrix;
                uniform mat4 modelViewMatrix;
                uniform vec2 viewportSize;

                void main() {
                    gl_PointSize = viewportSize.x * ${pointSize};
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
                }
            `,
			fragmentShader: `
                out lowp vec4 pc_fragColor;
                void main() {
                    if (length(gl_PointCoord - 0.5) > 0.5) discard;
                    pc_fragColor = vec4(${color[0]}, ${color[1]}, ${color[2]}, ${opacity});
                }
            `
		})
	);
}

// @ts-check

import {
	BufferAttribute,
	BufferGeometry,
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
	extent,
	container
) {
	const containerWidth = parseInt(getComputedStyle(container).width);
	const safeWidth =
		isNaN(containerWidth) || containerWidth <= 0 ? 500 : containerWidth;

	const validatedSize = isNaN(pointSize) || pointSize <= 0 ? 1.0 : pointSize;
	const finalPointSize = (validatedSize * safeWidth).toFixed(4);

	return new Points(
		new BufferGeometry().setAttribute(
			'position',
			new BufferAttribute(
				getPopulatedCoordinateBuffer(coords, extent),
				3
			)
		),
		// We are passing a PointsMaterial when we should be passing a RawShaderMaterial.
		// rocky doesn't know how to properly fix this. So...
		// @ts-ignore
		new RawShaderMaterial({
			transparent: true,
			depthWrite: false,
			vertexShader: `#version 300 es
                in vec3 position;
                uniform mat4 projectionMatrix;
                uniform mat4 modelViewMatrix;

                void main() {
                    gl_PointSize = ${finalPointSize};
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
                }
            `,
			fragmentShader: `#version 300 es
                out lowp vec4 pc_fragColor;
                void main() {
                    if (length(gl_PointCoord - 0.5) > 0.5) discard;
                    pc_fragColor = vec4(${color[0]}, ${color[1]}, ${color[2]}, ${opacity});
                }
            `
		})
	);
}

import {
	BufferAttribute,
	BufferGeometry,
	InstancedBufferGeometry,
	Vector3
} from '../vendors/three.js';

import { copyArray3IntoBuffer, copyVector3IntoBuffer } from './bufferUtils.js';

// This is used in spheres and in tubes' end caps.
export function getSphereGeometry(radius, instanced = false, halfSphere = false) {
	const phiEnd = halfSphere ? Math.PI : Math.PI * 2;

	const vector = new Vector3();

	// heightSegments + 1
	const grid = new Array(49);
	// (heightSegments + 1) * (widthSegments + 1) * 3 = 49 * 49 * 3
	const position = new Float32Array(7203);
	// (heightSegments + 1) * (widthSegments + 1) * 3 = 49 * 49 * 3
	const normal = new Float32Array(7203);
	// widthSegments * 3 + (heightSegments - 1) * widthSegments * 6
	// = 48 * 3 + 47 * 48 * 6
	const indices = new Uint16Array(13680);

	// heightSegments
	for (let iy = 0, index = 0; iy <= 48; iy++) {
		const v = iy * Math.PI / 48;

		// "Typing" this array makes this slower.
		// const verticesRow = new Float32Array(widthSegments + 1);
		const verticesRow = [];

		// widthSegments
		for (let ix = 0; ix <= 48; ix++) {
			const u = ix * phiEnd / 48;

			vector.set(
				-radius * Math.cos(u) * Math.sin(v),
				radius * Math.cos(v),
				radius * Math.sin(u) * Math.sin(v)
			);

			copyVector3IntoBuffer(position, vector, index);
			copyVector3IntoBuffer(normal, vector.normalize(), index);

			verticesRow.push(index++);
		}

		grid[iy] = verticesRow;
	}

	for (let iy = 0, index = 0; iy < 48; iy++) {
		for (let ix = 0; ix < 48; ix++) {
			const a = grid[iy][ix + 1];
			const b = grid[iy][ix];
			const c = grid[iy + 1][ix];
			const d = grid[iy + 1][ix + 1];

			copyArray3IntoBuffer(indices, [b, c, d], index++);
			if (iy !== 0) {
				copyArray3IntoBuffer(indices, [a, b, d], index++);
			}
		}
	}

	const geometry = instanced
		? new InstancedBufferGeometry()
		: new BufferGeometry();

	geometry
		.setIndex(new BufferAttribute(indices, 1))
		.setAttribute('position', new BufferAttribute(position, 3))
		.setAttribute('normal', new BufferAttribute(normal, 3));

	return geometry;
}

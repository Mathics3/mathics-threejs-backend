import {
	BufferAttribute,
	BufferGeometry,
	Color,
	DoubleSide,
	Mesh,
	MeshStandardMaterial,
	Quaternion,
	Shape,
	ShapeGeometry,
	Vector3
} from '../../vendors/three.js';

import { getPopulatedCoordinateBuffer } from '../bufferUtils.js';

import earcut from '../../vendors/earcut.js';
import scaleCoordinate from '../scaleCoordinate.js';

// See https://reference.wolfram.com/language/ref/Polygon
// for the high-level description of what is being rendered.
export default function ({ color, coords, opacity = 1 }, extent) {
	let geometry;

	if (coords.length === 3) { // triangle
		geometry = new BufferGeometry().setAttribute(
			'position',
			new BufferAttribute(new Float32Array([
				...(coords[0][0] ?? scaleCoordinate(coords[0][1], extent)),
				...(coords[1][0] ?? scaleCoordinate(coords[1][1], extent)),
				...(coords[2][0] ?? scaleCoordinate(coords[2][1], extent))
			]), 3)
		);
	} else { // not a triangle
		// boolean variables
		let isXCoplanar = 1, isYCoplanar = 1, isZCoplanar = 1;

		coords.forEach((coordinate) => {
			coordinate[0] ??= scaleCoordinate(coordinate[1], extent);

			if (coordinate[0][0] !== coords[0][0][0]) {
				isXCoplanar = 0;
			}
			if (coordinate[0][1] !== coords[0][0][1]) {
				isYCoplanar = 0;
			}
			if (coordinate[0][2] !== coords[0][0][2]) {
				isZCoplanar = 0;
			}
		});

		if (isXCoplanar || isYCoplanar || isZCoplanar) {
			const normalVector = new Vector3(
				isXCoplanar,
				isYCoplanar,
				isZCoplanar
			), normalZVector = new Vector3(0, 0, 1);

			// apply the quaternion "zero" all z values, we can't draw a shape with non-zero z values
			geometry = new ShapeGeometry(new Shape(
				coords.map((coordinate) =>
					new Vector3(
						...(coordinate[0] ?? scaleCoordinate(coordinate[1], extent))
					).applyQuaternion(
						new Quaternion().setFromUnitVectors(
							normalVector,
							normalZVector
						)
					)
				)
			));

			for (let i = 0; i < coords.length; i++) {
				// apply the "revert" quaternion so we respect original z values
				const temporaryVector = new Vector3(
					geometry.attributes.position.array[i * 3],
					geometry.attributes.position.array[i * 3 + 1],
					0
				).applyQuaternion(
					new Quaternion().setFromUnitVectors(
						normalZVector,
						normalVector
					)
				);

				// copy the temporary vector to the "position" buffer
				geometry.attributes.position.array[i * 3] = temporaryVector.x;
				geometry.attributes.position.array[i * 3 + 1] = temporaryVector.y;
				geometry.attributes.position.array[i * 3 + 2] = temporaryVector.z;
			}
		} else {
			// We use earcut to "break" the polygon into multiple triangles. We can't draw if we don't do it.

			const coordinates = getPopulatedCoordinateBuffer(coords, extent);

			geometry = new BufferGeometry()
				.setAttribute(
					'position',
					new BufferAttribute(
						coordinates,
						3
					)
				)
				.setIndex(earcut(
					coordinates,
					[], // hole indices (we have no holes, so an empty array)
					3 // dimension
				));
		}
	};

	return new Mesh(
		geometry,
		new MeshStandardMaterial({
			color: new Color(...color),
			opacity,
			transparent: opacity !== 1,
			flatShading: true,
			side: DoubleSide
		})
	);
};

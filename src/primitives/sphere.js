import {
	Color,
	InstancedMesh,
	Matrix4,
	MeshLambertMaterial,
	SphereGeometry
} from '../../vendors/three.js';

import scaleCoordinate from '../scaleCoordinate.js';

// See https://reference.wolfram.com/language/ref/Sphere
// for the high-level description of what is being rendered.
export default function ({ color, coords, opacity = 1, radius }, extent) {
	const spheres = new InstancedMesh(
		new SphereGeometry(radius, 48, 48),
		new MeshLambertMaterial({
			color: new Color(...color),
			opacity,
			transparent: opacity !== 1,
			depthWrite: opacity === 1
		}),
		coords.length
	);

	// Set the spheres centers.
	coords.forEach((coordinate, i) =>
		spheres.setMatrixAt(
			i,
			new Matrix4().setPosition(...(coordinate[0] ?? scaleCoordinate(coordinate[1], extent)))
		)
	);

	return spheres;
};

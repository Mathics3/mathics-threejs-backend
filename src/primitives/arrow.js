import {
	BufferAttribute,
	BufferGeometry,
	Color,
	CylinderGeometry,
	Group,
	Line,
	LineBasicMaterial,
	Matrix4,
	Mesh,
	ShaderMaterial,
	Vector3
} from '../../vendors/three.js';

import { getPopulatedCoordinateBuffer } from '../bufferUtils.js';

import scaleCoordinate from '../scaleCoordinate.js';

// See https://reference.wolfram.com/language/ref/Arrow
// for the high-level description of what is being rendered.
export default function ({ color, coords, opacity = 1 }, extent) {
	const group = new Group();

	// last coordinate but one
	const startCoordinate = new Vector3(
		...(coords[coords.length - 2][0] ?? scaleCoordinate(coords[coords.length - 2][1], extent))
	);

	// last coordinate
	const endCoordinate = new Vector3(
		...(coords[coords.length - 1][0] ?? scaleCoordinate(coords[coords.length - 1][1], extent))
	);

	const arrowHeadHeight = 0.2 * startCoordinate.distanceTo(endCoordinate);

	// arrow head
	group.add(new Mesh(
		new CylinderGeometry(
			0, // radius top, as it is a cone we let it be 0
			0.2 * arrowHeadHeight, // radius bottom
			arrowHeadHeight, // height
			8 // radial segments
		)
			// move to the left so setPosition works
			.translate(0, -arrowHeadHeight / 2, 0)
			// rotate the cylinder 90 degrees to lookAt works
			.rotateX(Math.PI / 2)
			.applyMatrix4(
				new Matrix4()
					.setPosition(endCoordinate)
					.lookAt(
						endCoordinate,
						startCoordinate,
						new Vector3(0, 1, 0)
					)
			),
		new ShaderMaterial({
			transparent: opacity !== 1,
			uniforms: {
				color: { value: [...color, opacity] }
			},
			vertexShader: `
				void main() {
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
				}
			`,
			fragmentShader: `
				uniform vec4 color;

				void main() {
					gl_FragColor = color;
				}
			`
		})
	));

	// arrow body
	group.add(
		new Line(
			new BufferGeometry().setAttribute(
				'position',
				new BufferAttribute(
					getPopulatedCoordinateBuffer(coords, extent),
					3
				)
			),
			new LineBasicMaterial({
				color: new Color(...color),
				opacity,
				transparent: opacity !== 1
			})
		)
	);

	return group;
}

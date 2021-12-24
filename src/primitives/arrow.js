import {
	BufferAttribute,
	BufferGeometry,
	CylinderGeometry,
	Group,
	Line,
	Matrix4,
	Mesh,
	RawShaderMaterial,
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
		new RawShaderMaterial({
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
		)
	);

	return group;
}

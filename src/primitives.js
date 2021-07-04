import {
	ArrowHelper,
	BoxGeometry,
	BufferAttribute,
	BufferGeometry,
	Color,
	CylinderGeometry,
	DoubleSide,
	Face3,
	Geometry,
	Group,
	InstancedMesh,
	Line,
	LineBasicMaterial,
	Matrix4,
	Mesh,
	MeshLambertMaterial,
	Points,
	Quaternion,
	ShaderMaterial,
	Shape,
	ShapeGeometry,
	SphereGeometry,
	Vector3,
	Vector4
} from '../vendors/threejs/three.min.js';

import earcut from '../vendors/earcut/earcut.min.js';

// TODO: the one-element arrays should be two-element arrays, where the 2nd element is the "scaled" part of the coordinates that depend on the size of the final graphics (see Mathematica's Scaled)

export default {
	Arrow: ({ color, coords }) => {
		const group = new Group();

		const colorHex = new Color(...color).getHex();

		const startCoordinate = new Vector3(
			...coords[coords.length - 2][0]
		);

		const endCoordinate = new Vector3(
			...coords[coords.length - 1][0]
		);

		group.add(
			new ArrowHelper(
				endCoordinate.clone().sub(startCoordinate).normalize(),
				startCoordinate,
				startCoordinate.distanceTo(endCoordinate),
				colorHex
			)
		);

		const points = new Float32Array(coords.length * 3 - 3);

		for (let i = 0; i < points.length / 3; i++) {
			points[i * 3] = coords[i][0][0];
			points[i * 3 + 1] = coords[i][0][1];
			points[i * 3 + 2] = coords[i][0][2];
		}

		const linesGeometry = new BufferGeometry();

		linesGeometry.setAttribute(
			'position',
			new BufferAttribute(points, 3)
		);

		group.add(
			new Line(
				linesGeometry,
				new LineBasicMaterial({ color: colorHex })
			)
		);

		return group;
	},
	Cuboid: ({ color, coords }) => {
		const group = new Group();

		for (let i = 0; i < coords.length / 2; i++) {
			const startCoordinate = new Vector3(...coords[i * 2][0]);
			const endCoordinate = new Vector3(...coords[i * 2 + 1][0]);

			const cuboid = new Mesh(
				new BoxGeometry(
					...endCoordinate.clone().sub(startCoordinate).toArray()
				),
				new MeshLambertMaterial({
					color: new Color(...color).getHex()
				})
			);

			cuboid.position.set(
				// mean of the start and end coordinates, the center of the cuboid
				...startCoordinate
					.add(endCoordinate)
					.multiplyScalar(0.5)
					.toArray()
			);

			group.add(cuboid);
		}

		return group;
	},
	Cylinder: ({ color, coords, radius }) => {
		const group = new Group();

		for (let i = 0; i < coords.length / 2; i++) {
			const startCoordinate = new Vector3(
				...coords[i * 2][0]
			);

			const endCoordinate = new Vector3(
				...coords[i * 2 + 1][0]
			);

			const cylinder = new Mesh(
				new CylinderGeometry(
					radius,
					radius,
					startCoordinate.distanceTo(endCoordinate), // the height of the cylinder
					24
				).applyMatrix4(
					// rotate the cylinder 90 degrees to lookAt work;
					new Matrix4().makeRotationX(1.5707963267948966)
				),
				new MeshLambertMaterial({
					color: new Color(...color).getHex()
				})
			);

			// mean of the start and end coordinates, the center of the cylinder
			cylinder.position.addVectors(startCoordinate, endCoordinate)
				.multiplyScalar(0.5);

			cylinder.lookAt(endCoordinate);

			group.add(cylinder);
		}

		return group;
	},
	Line: ({ color, coords }) => {
		const geometry = new BufferGeometry();
		const points = new Float32Array(coords.length * 3);

		coords.forEach((coordinate, i) => {
			points[i * 3] = coordinate[0][0];
			points[i * 3 + 1] = coordinate[0][1];
			points[i * 3 + 2] = coordinate[0][2];
		});

		geometry.setAttribute('position', new BufferAttribute(points, 3));

		return new Line(
			geometry,
			new LineBasicMaterial({
				color: new Color(...color).getHex()
			})
		);
	},
	Point: ({ color, coords, pointSize }, canvasSize) => {
		const geometry = new BufferGeometry();

		const points = new Float32Array(coords.length * 3);

		coords.forEach((coordinate, i) => {
			points[i * 3] = coordinate[0][0];
			points[i * 3 + 1] = coordinate[0][1];
			points[i * 3 + 2] = coordinate[0][2];
		});

		geometry.setAttribute('position', new BufferAttribute(points, 3));

		return new Points(
			geometry,
			new ShaderMaterial({
				transparent: true,
				uniforms: {
					size: { value: pointSize * canvasSize * 0.5 },
					color: { value: new Vector4(...color, 1) },
				},
				vertexShader: `
					uniform float size;

					void main() {
						#include <begin_vertex>
						#include <project_vertex>

						gl_PointSize = size;
					}
				`,
				fragmentShader: `
					uniform vec4 color;

					void main() {
						if (length(gl_PointCoord - vec2(0.5)) > 0.5) discard;

						gl_FragColor = color;
					}
				`
			})
		);
	},
	Polygon: ({ color, coords }) => {
		let geometry;

		if (coords.length === 3) { // triangle
			geometry = new BufferGeometry();

			geometry.setAttribute(
				'position',
				new BufferAttribute(new Float32Array([
					...coords[0][0],
					...coords[1][0],
					...coords[2][0]
				]), 3)
			);

			geometry.computeVertexNormals();
		} else {
			// boolean variables
			let isXCoplanar = 1, isYCoplanar = 1, isZCoplanar = 1;

			coords.forEach((coordinate) => {
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
				);

				const normalZVector = new Vector3(0, 0, 1);

				const points = coords.map((coordinate) =>
					new Vector3(...coordinate[0])
						.applyQuaternion(
							new Quaternion().setFromUnitVectors(
								normalVector,
								normalZVector
							)
						)
				);

				geometry = new ShapeGeometry(new Shape(points));

				geometry.vertices = geometry.vertices.map(
					(vertex) => vertex.applyQuaternion(
						new Quaternion().setFromUnitVectors(
							normalZVector,
							normalVector
						)
					)
				);
			} else {
				geometry = new Geometry();

				const coordinates = [];

				coords.forEach((coordinate) => {
					coordinates.push(...coordinate[0]);
					geometry.vertices.push(new Vector3(...coordinate[0]));
				});

				const triangles = earcut(coordinates);

				for (let i = 0; i < triangles.length; i += 3) {
					geometry.faces.push(new Face3(
						triangles[i],
						triangles[i + 1],
						triangles[i + 2]
					));
				}
			}

			geometry.computeFaceNormals();
		};

		return new Mesh(geometry, new MeshLambertMaterial({
			color: new Color(...color).getHex(),
			side: DoubleSide
		}));
	},
	Sphere: ({ color, coords, radius }) => {
		const spheres = new InstancedMesh(
			new SphereGeometry(radius, 48, 48),
			new MeshLambertMaterial({
				color: new Color(...color).getHex()
			}),
			coords.length
		);

		coords.forEach((coordinate, i) =>
			spheres.setMatrixAt(
				i,
				new Matrix4().setPosition(new Vector3(...coordinate[0]))
			)
		);

		return spheres;
	}
};

import {
	ArrowHelper,
	BoxBufferGeometry,
	BufferAttribute,
	BufferGeometry,
	Color,
	CylinderBufferGeometry,
	DoubleSide,
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
	SphereBufferGeometry,
	Vector3,
	Vector4
} from '../vendors/threejs/three.min.js';

import earcut from '../vendors/earcut/earcut.min.js';
import scaleCoordinate from './scaleCoordinate.js';

export default {
	Arrow: ({ Coords, RGBColor }, extent) => {
		const group = new Group();

		const color = new Color(...RGBColor).getHex();

		const startCoordinate = new Vector3(
			...(Coords[Coords.length - 2][0] ?? scaleCoordinate(Coords[Coords.length - 2][1], extent))
		);

		const endCoordinate = new Vector3(
			...(Coords[Coords.length - 1][0] ?? scaleCoordinate(Coords[Coords.length - 1][1], extent))
		);

		group.add(
			new ArrowHelper(
				endCoordinate.clone().sub(startCoordinate).normalize(),
				startCoordinate,
				startCoordinate.distanceTo(endCoordinate),
				color
			)
		);

		const points = new Float32Array(Coords.length * 3 - 3);

		for (let i = 0; i < points.length / 3; i++) {
			Coords[i][0] ??= scaleCoordinate(Coords[i][1], extent);

			points[i * 3] = Coords[i][0][0];
			points[i * 3 + 1] = Coords[i][0][1];
			points[i * 3 + 2] = Coords[i][0][2];
		}

		const linesGeometry = new BufferGeometry();

		linesGeometry.setAttribute(
			'position',
			new BufferAttribute(points, 3)
		);

		group.add(
			new Line(
				linesGeometry,
				new LineBasicMaterial({ color })
			)
		);

		return group;
	},
	Cuboid: ({ Coords, Opacity, RGBColor }, extent) => {
		const group = new Group();

		for (let i = 0; i < Coords.length / 2; i++) {
			const startCoordinate = new Vector3(
				...(Coords[i * 2][0] ?? scaleCoordinate(Coords[i * 2][1], extent))
			);
			const endCoordinate = new Vector3(
				...(Coords[i * 2 + 1][0] ?? scaleCoordinate(Coords[i * 2 + 1][1], extent))
			);

			const cuboid = new Mesh(
				new BoxBufferGeometry(
					...endCoordinate.clone().sub(startCoordinate).toArray()
				),
				new MeshLambertMaterial({
					color: new Color(...RGBColor).getHex(),
					opacity: Opacity ?? 1,
					transparent: (Opacity ?? 1) !== 1
				})
			);

			// mean of the start and end coordinates, the center of the cuboid
			cuboid.position.copy(
				startCoordinate.add(endCoordinate).multiplyScalar(0.5)
			);

			group.add(cuboid);
		}

		return group;
	},
	Cylinder: ({ Coords, Opacity, Radius, RGBColor }, extent) => {
		const group = new Group();

		for (let i = 0; i < Coords.length / 2; i++) {
			const startCoordinate = new Vector3(
				...(Coords[i * 2][0] ?? scaleCoordinate(Coords[i * 2][1], extent))
			);
			const endCoordinate = new Vector3(
				...(Coords[i * 2 + 1][0] ?? scaleCoordinate(Coords[i * 2][1], extent))
			);

			const cylinder = new Mesh(
				new CylinderBufferGeometry(
					Radius,
					Radius,
					startCoordinate.distanceTo(endCoordinate), // the height of the cylinder
					24
				).applyMatrix4(
					// rotate the cylinder 90 degrees to lookAt work;
					new Matrix4().makeRotationX(1.5707963267948966)
				),
				new MeshLambertMaterial({
					color: new Color(...RGBColor).getHex(),
					opacity: Opacity ?? 1,
					transparent: (Opacity ?? 1) !== 1
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
	Line: ({ Coords, Opacity, RGBColor }, extent) => {
		const geometry = new BufferGeometry();
		const points = new Float32Array(Coords.length * 3);

		Coords.forEach((coordinate, i) => {
			coordinate[0] ??= scaleCoordinate(coordinate[1], extent);

			points[i * 3] = coordinate[0][0];
			points[i * 3 + 1] = coordinate[0][1];
			points[i * 3 + 2] = coordinate[0][2];
		});

		geometry.setAttribute('position', new BufferAttribute(points, 3));

		return new Line(
			geometry,
			new LineBasicMaterial({
				color: new Color(...RGBColor).getHex(),
				opacity: Opacity ?? 1,
				transparent: (Opacity ?? 1) !== 1
			})
		);
	},
	Point: ({ Coords, Opacity, PointSize, RGBColor }, extent, canvasSize) => {
		const geometry = new BufferGeometry();

		const points = new Float32Array(Coords.length * 3);

		Coords.forEach((coordinate, i) => {
			coordinate[0] ??= scaleCoordinate(coordinate[1], extent);

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
					size: { value: PointSize * canvasSize * 0.5 },
					color: { value: new Vector4(...RGBColor, Opacity) },
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
	Polygon: ({ Coords, Opacity, RGBColor }, extent) => {
		let geometry;

		if (Coords.length === 3) { // triangle
			geometry = new BufferGeometry();

			geometry.setAttribute(
				'position',
				new BufferAttribute(new Float32Array([
					...(Coords[0][0] ?? scaleCoordinate(Coords[0][1], extent)),
					...(Coords[1][0] ?? scaleCoordinate(Coords[1][1], extent)),
					...(Coords[2][0] ?? scaleCoordinate(Coords[2][1], extent))
				]), 3)
			);

			geometry.computeVertexNormals();
		} else {
			// boolean variables
			let isXCoplanar = 1, isYCoplanar = 1, isZCoplanar = 1;

			Coords.forEach((coordinate) => {
				coordinate[0] ??= scaleCoordinate(coordinate[1], extent);

				if (coordinate[0][0] !== Coords[0][0][0]) {
					isXCoplanar = 0;
				}
				if (coordinate[0][1] !== Coords[0][0][1]) {
					isYCoplanar = 0;
				}
				if (coordinate[0][2] !== Coords[0][0][2]) {
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

				const points = Coords.map((coordinate) =>
					new Vector3(
						...(coordinate[0] ?? scaleCoordinate(coordinate[1], extent))
					).applyQuaternion(
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

				geometry.computeFaceNormals();
			} else {
				geometry = new BufferGeometry();

				const coordinates = new Float32Array(Coords.length * 3);

				Coords.forEach((coordinate, i) => {
					coordinate[0] ??= scaleCoordinate(coordinate[1], extent);

					coordinates[i * 3] = coordinate[0][0];
					coordinates[i * 3 + 1] = coordinate[0][1];
					coordinates[i * 3 + 2] = coordinate[0][2];
				});

				geometry.setAttribute(
					'position',
					new BufferAttribute(coordinates, 3)
				);

				geometry.setIndex(earcut(coordinates));

				geometry.computeVertexNormals();
			}
		};

		return new Mesh(geometry, new MeshLambertMaterial({
			color: new Color(...RGBColor).getHex(),
			opacity: Opacity ?? 1,
			transparent: (Opacity ?? 1) !== 1,
			side: DoubleSide
		}));
	},
	Sphere: ({ Coords, Opacity, Radius, RGBColor }, extent) => {
		const spheres = new InstancedMesh(
			new SphereBufferGeometry(Radius, 48, 48),
			new MeshLambertMaterial({
				color: new Color(...RGBColor).getHex(),
				opacity: Opacity ?? 1,
				transparent: (Opacity ?? 1) !== 1
			}),
			Coords.length
		);

		Coords.forEach((coordinate, i) =>
			spheres.setMatrixAt(
				i,
				new Matrix4().setPosition(...(coordinate[0] ?? scaleCoordinate(coordinate[1], extent)))
			)
		);

		return spheres;
	}
};

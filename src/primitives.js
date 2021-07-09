import {
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
	MeshBasicMaterial,
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
	arrow: ({ color, coords, opacity }, extent) => {
		const group = new Group();

		const colorHex = new Color(...color).getHex();

		const startCoordinate = new Vector3(
			...(coords[coords.length - 2][0] ?? scaleCoordinate(coords[coords.length - 2][1], extent))
		);

		const endCoordinate = new Vector3(
			...(coords[coords.length - 1][0] ?? scaleCoordinate(coords[coords.length - 1][1], extent))
		);

		const arrowHead = new Mesh(
			new CylinderBufferGeometry(
				0,
				0.04 * startCoordinate.distanceTo(endCoordinate),
				0.2 * startCoordinate.distanceTo(endCoordinate)
			).rotateX(Math.PI / 2),
			new MeshBasicMaterial({
				color: colorHex,
				opacity: opacity ?? 1,
				transparent: (opacity ?? 1) !== 1
			})
		);

		// set the position to 1/10 far from the end coordinate so lookAt work
		arrowHead.position.copy(
			endCoordinate.clone()
				.multiplyScalar(9)
				.add(startCoordinate)
				.multiplyScalar(0.1)
		);

		arrowHead.lookAt(endCoordinate);

		group.add(arrowHead);

		const coordinates = new Float32Array(coords.length * 3);

		for (let i = 0; i < coordinates.length / 3; i++) {
			coords[i][0] ??= scaleCoordinate(coords[i][1], extent);

			coordinates[i * 3] = coords[i][0][0];
			coordinates[i * 3 + 1] = coords[i][0][1];
			coordinates[i * 3 + 2] = coords[i][0][2];
		}

		const linesGeometry = new BufferGeometry();

		linesGeometry.setAttribute(
			'position',
			new BufferAttribute(coordinates, 3)
		);

		group.add(
			new Line(
				linesGeometry,
				new LineBasicMaterial({
					color: colorHex,
					opacity: opacity ?? 1,
					transparent: (opacity ?? 1) !== 1
				})
			)
		);

		return group;
	},
	cuboid: ({ color, coords, opacity }, extent) => {
		const group = new Group();

		for (let i = 0; i < coords.length / 2; i++) {
			const startCoordinate = new Vector3(
				...(coords[i * 2][0] ?? scaleCoordinate(coords[i * 2][1], extent))
			);
			const endCoordinate = new Vector3(
				...(coords[i * 2 + 1][0] ?? scaleCoordinate(coords[i * 2 + 1][1], extent))
			);

			const cuboid = new Mesh(
				new BoxBufferGeometry(
					...endCoordinate.clone().sub(startCoordinate).toArray()
				),
				new MeshLambertMaterial({
					color: new Color(...color).getHex(),
					opacity: opacity ?? 1,
					transparent: (opacity ?? 1) !== 1
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
	cylinder: ({ color, coords, opacity, radius }, extent) => {
		const group = new Group();

		for (let i = 0; i < coords.length / 2; i++) {
			const startCoordinate = new Vector3(
				...(coords[i * 2][0] ?? scaleCoordinate(coords[i * 2][1], extent))
			);
			const endCoordinate = new Vector3(
				...(coords[i * 2 + 1][0] ?? scaleCoordinate(coords[i * 2][1], extent))
			);

			const cylinder = new Mesh(
				new CylinderBufferGeometry(
					radius,
					radius,
					startCoordinate.distanceTo(endCoordinate), // the height of the cylinder
					24
				).applyMatrix4(
					// rotate the cylinder 90 degrees to lookAt work;
					new Matrix4().makeRotationX(1.5707963267948966)
				),
				new MeshLambertMaterial({
					color: new Color(...color).getHex(),
					opacity: opacity ?? 1,
					transparent: (opacity ?? 1) !== 1
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
	line: ({ color, coords, opacity }, extent) => {
		const geometry = new BufferGeometry();
		const coordinates = new Float32Array(coords.length * 3);

		coords.forEach((coordinate, i) => {
			coordinate[0] ??= scaleCoordinate(coordinate[1], extent);

			coordinates[i * 3] = coordinate[0][0];
			coordinates[i * 3 + 1] = coordinate[0][1];
			coordinates[i * 3 + 2] = coordinate[0][2];
		});

		geometry.setAttribute('position', new BufferAttribute(coordinates, 3));

		return new Line(
			geometry,
			new LineBasicMaterial({
				color: new Color(...color).getHex(),
				opacity: opacity ?? 1,
				transparent: (opacity ?? 1) !== 1
			})
		);
	},
	point: ({ color, coords, opacity, pointSize }, extent, canvasSize) => {
		const geometry = new BufferGeometry();

		const coordinates = new Float32Array(coords.length * 3);

		coords.forEach((coordinate, i) => {
			coordinate[0] ??= scaleCoordinate(coordinate[1], extent);

			coordinates[i * 3] = coordinate[0][0];
			coordinates[i * 3 + 1] = coordinate[0][1];
			coordinates[i * 3 + 2] = coordinate[0][2];
		});

		geometry.setAttribute('position', new BufferAttribute(coordinates, 3));

		return new Points(
			geometry,
			new ShaderMaterial({
				transparent: true,
				depthWrite: false,
				uniforms: {
					size: { value: pointSize * canvasSize * 0.5 },
					color: { value: new Vector4(...color, opacity) },
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
	polygon: ({ color, coords, opacity }, extent) => {
		let geometry;

		if (coords.length === 3) { // triangle
			geometry = new BufferGeometry();

			geometry.setAttribute(
				'position',
				new BufferAttribute(new Float32Array([
					...(coords[0][0] ?? scaleCoordinate(coords[0][1], extent)),
					...(coords[1][0] ?? scaleCoordinate(coords[1][1], extent)),
					...(coords[2][0] ?? scaleCoordinate(coords[2][1], extent))
				]), 3)
			);

			geometry.computeVertexNormals();
		} else {
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
				);

				const normalZVector = new Vector3(0, 0, 1);

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

				const coordinates = new Float32Array(coords.length * 3);

				coords.forEach((coordinate, i) => {
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
			color: new Color(...color).getHex(),
			opacity: opacity ?? 1,
			transparent: (opacity ?? 1) !== 1,
			side: DoubleSide
		}));
	},
	sphere: ({ color, coords, opacity, radius }, extent) => {
		const spheres = new InstancedMesh(
			new SphereBufferGeometry(radius, 48, 48),
			new MeshLambertMaterial({
				color: new Color(...color).getHex(),
				opacity: opacity ?? 1,
				transparent: (opacity ?? 1) !== 1
			}),
			coords.length
		);

		coords.forEach((coordinate, i) =>
			spheres.setMatrixAt(
				i,
				new Matrix4().setPosition(...(coordinate[0] ?? scaleCoordinate(coordinate[1], extent)))
			)
		);

		return spheres;
	}
};

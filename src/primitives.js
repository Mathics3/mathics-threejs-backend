import {
	BufferAttribute,
	BufferGeometry,
	Color,
	CylinderGeometry,
	DodecahedronGeometry,
	DoubleSide,
	Group,
	IcosahedronGeometry,
	InstancedMesh,
	Line,
	LineBasicMaterial,
	Matrix4,
	Mesh,
	MeshBasicMaterial,
	MeshLambertMaterial,
	MeshStandardMaterial,
	OctahedronGeometry,
	Points,
	Quaternion,
	ShaderMaterial,
	Shape,
	ShapeGeometry,
	SphereGeometry,
	TetrahedronGeometry,
	Vector3
} from '../vendors/threejs/three.js';

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
			new CylinderGeometry(
				0,
				0.04 * startCoordinate.distanceTo(endCoordinate),
				0.2 * startCoordinate.distanceTo(endCoordinate)
			).rotateX(Math.PI / 2), // rotate the cylinder 90 degrees to lookAt work
			new MeshBasicMaterial({
				color: colorHex,
				opacity: opacity ?? 1,
				transparent: (opacity ?? 1) !== 1
			})
		);

		// set the position to 1/10 far from the end coordinate so lookAt work
		arrowHead.position.copy(
			endCoordinate
				.clone()
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
		const geometry = new BufferGeometry();

		// vertices per cuboid * 3 / 2
		const coordinates = new Float32Array(12 * coords.length);
		// polygons per cuboid * 3 / 2
		const indices = new Array(18 * coords.length);

		for (let i = 0; i < coords.length / 2; i++) {
			const startCoordinate = coords[i * 2][0] ?? scaleCoordinate(coords[i * 2][1], extent);
			const endCoordinate = coords[i * 2 + 1][0] ?? scaleCoordinate(coords[i * 2 + 1][1], extent);

			// vertex 0
			coordinates[i * 24] = startCoordinate[0];
			coordinates[i * 24 + 1] = startCoordinate[1];
			coordinates[i * 24 + 2] = startCoordinate[2];
			// vextex 1
			coordinates[i * 24 + 3] = endCoordinate[0];
			coordinates[i * 24 + 4] = startCoordinate[1];
			coordinates[i * 24 + 5] = startCoordinate[2];
			// vextex 2
			coordinates[i * 24 + 6] = startCoordinate[0];
			coordinates[i * 24 + 7] = endCoordinate[1];
			coordinates[i * 24 + 8] = startCoordinate[2];
			// vextex 3
			coordinates[i * 24 + 9] = endCoordinate[0];
			coordinates[i * 24 + 10] = endCoordinate[1];
			coordinates[i * 24 + 11] = startCoordinate[2];
			// vextex 4
			coordinates[i * 24 + 12] = startCoordinate[0];
			coordinates[i * 24 + 13] = startCoordinate[1];
			coordinates[i * 24 + 14] = endCoordinate[2];
			// vextex 5
			coordinates[i * 24 + 15] = endCoordinate[0];
			coordinates[i * 24 + 16] = startCoordinate[1];
			coordinates[i * 24 + 17] = endCoordinate[2];
			// vextex 6
			coordinates[i * 24 + 18] = startCoordinate[0];
			coordinates[i * 24 + 19] = endCoordinate[1];
			coordinates[i * 24 + 20] = endCoordinate[2];
			// vextex 7
			coordinates[i * 24 + 21] = endCoordinate[0];
			coordinates[i * 24 + 22] = endCoordinate[1];
			coordinates[i * 24 + 23] = endCoordinate[2];

			// the orther of the indices matter: clockwise is one side and counterclockwise the other side
			// if the front isn't really the front is because of the camera position

			// front polygon 0
			indices[i * 36] = i * 8 + 3;
			indices[i * 36 + 1] = i * 8 + 1;
			indices[i * 36 + 2] = i * 8;
			// front polygon 1
			indices[i * 36 + 3] = i * 8 + 2;
			indices[i * 36 + 4] = i * 8 + 3;
			indices[i * 36 + 5] = i * 8;
			// back polygon 0
			indices[i * 36 + 6] = i * 8 + 4;
			indices[i * 36 + 7] = i * 8 + 5;
			indices[i * 36 + 8] = i * 8 + 7;
			// back polygon 1
			indices[i * 36 + 9] = i * 8 + 4;
			indices[i * 36 + 10] = i * 8 + 7;
			indices[i * 36 + 11] = i * 8 + 6;
			// top polygon 0
			indices[i * 36 + 12] = i * 8 + 2;
			indices[i * 36 + 13] = i * 8 + 6;
			indices[i * 36 + 14] = i * 8 + 3;
			// top polygon 1
			indices[i * 36 + 15] = i * 8 + 6;
			indices[i * 36 + 16] = i * 8 + 7;
			indices[i * 36 + 17] = i * 8 + 3;
			// bottom polygon 0
			indices[i * 36 + 18] = i * 8 + 1;
			indices[i * 36 + 19] = i * 8 + 5;
			indices[i * 36 + 20] = i * 8;
			// bottom polygon 1
			indices[i * 36 + 21] = i * 8 + 5;
			indices[i * 36 + 22] = i * 8 + 4;
			indices[i * 36 + 23] = i * 8;
			// right polygon 0
			indices[i * 36 + 24] = i * 8 + 1;
			indices[i * 36 + 25] = i * 8 + 7;
			indices[i * 36 + 26] = i * 8 + 5;
			// right polygon 1
			indices[i * 36 + 27] = i * 8 + 1;
			indices[i * 36 + 28] = i * 8 + 3;
			indices[i * 36 + 29] = i * 8 + 7;
			// left polygon 0
			indices[i * 36 + 30] = i * 8 + 4;
			indices[i * 36 + 31] = i * 8 + 2;
			indices[i * 36 + 32] = i * 8;
			// left polygon 1
			indices[i * 36 + 33] = i * 8 + 4;
			indices[i * 36 + 34] = i * 8 + 6;
			indices[i * 36 + 35] = i * 8 + 2;
		}

		geometry.setAttribute(
			'position',
			new BufferAttribute(coordinates, 3)
		);

		geometry.setIndex(indices);

		geometry.computeVertexNormals();

		return new Mesh(
			geometry,
			new MeshStandardMaterial({
				color: new Color(...color).getHex(),
				opacity: opacity ?? 1,
				transparent: (opacity ?? 1) !== 1,
				depthWrite: false,
				flatShading: true
			})
		);
	},
	cylinder: ({ color, coords, opacity, radius }, extent) => {
		const cylinders = new InstancedMesh(
			new CylinderGeometry(
				radius,
				radius,
				1,
				24
			).rotateX(Math.PI / 2), // rotate the cylinder 90 degrees to lookAt work
			new MeshLambertMaterial({
				color: new Color(...color).getHex(),
				opacity: opacity ?? 1,
				transparent: (opacity ?? 1) !== 1,
				depthWrite: false
			}),
			coords.length
		);

		for (let i = 0; i < coords.length / 2; i++) {
			const startCoordinate = new Vector3(
				...(coords[i * 2][0] ?? scaleCoordinate(coords[i * 2][1], extent))
			);

			const endCoordinate = new Vector3(
				...(coords[i * 2 + 1][0] ?? scaleCoordinate(coords[i * 2][1], extent))
			);

			cylinders.setMatrixAt(
				i,
				new Matrix4()
					.setPosition(
						startCoordinate
							.clone()
							.add(endCoordinate)
							.multiplyScalar(0.5)
					)
					.lookAt(
						startCoordinate,
						endCoordinate,
						new Vector3(0, 1, 0)
					)
					.scale(
						new Vector3(
							1,
							1,
							// the height of the cylinder
							startCoordinate.distanceTo(endCoordinate),
						)
					)
			);
		};

		return cylinders;
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
					color: { value: [...color, opacity] },
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

				for (let i = 0; i < geometry.attributes.position.count / 3; i++) {
					// apply "revert" quaternion so we respect original z values
					const temporaryVector = new Vector3(
						...geometry.attributes.position.array.slice(i * 3, i * 3 + 2)
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

		return new Mesh(
			geometry,
			new MeshStandardMaterial({
				color: new Color(...color).getHex(),
				opacity: opacity ?? 1,
				transparent: (opacity ?? 1) !== 1,
				flatShading: true,
				side: DoubleSide
			})
		);
	},
	polyhedron: ({ color, coords, opacity, subType }, extent) => {
		let geometry;

		switch (subType) {
			case 'tetrahedron':
				geometry = new TetrahedronGeometry();
				break;
			case 'octahedron':
				geometry = new OctahedronGeometry();
				break;
			case 'dodecahedron':
				geometry = new DodecahedronGeometry();
				break;
			case 'icosahedron':
				geometry = new IcosahedronGeometry();
				break;
		}

		const polyhedrons = new InstancedMesh(
			geometry,
			new MeshStandardMaterial({
				color: new Color(...color).getHex(),
				opacity: opacity ?? 1,
				transparent: (opacity ?? 1) !== 1,
				flatShading: true
			}),
			coords.length
		);

		coords.forEach((coordinate, i) =>
			polyhedrons.setMatrixAt(
				i,
				new Matrix4().setPosition(...(coordinate[0] ?? scaleCoordinate(coordinate[1], extent)))
			)
		);

		return polyhedrons;
	},
	sphere: ({ color, coords, opacity, radius }, extent) => {
		const spheres = new InstancedMesh(
			new SphereGeometry(radius, 48, 48),
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

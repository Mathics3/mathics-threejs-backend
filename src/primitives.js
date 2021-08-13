import {
	BoxGeometry,
	BufferAttribute,
	BufferGeometry,
	Color,
	CylinderGeometry,
	DoubleSide,
	Group,
	InstancedMesh,
	Line,
	LineBasicMaterial,
	Matrix4,
	Mesh,
	MeshBasicMaterial,
	MeshLambertMaterial,
	MeshStandardMaterial,
	Points,
	Quaternion,
	ShaderMaterial,
	Shape,
	ShapeGeometry,
	SphereGeometry,
	Vector3
} from '../vendors/three.js';

import earcut from '../vendors/earcut.js';
import scaleCoordinate from './scaleCoordinate.js';

export default {
	arrow: ({ color, coords, opacity = 1 }, extent) => {
		const group = new Group();

		const colorHex = new Color(...color).getHex();

		const startCoordinate = new Vector3(
			...(coords[coords.length - 2][0] ?? scaleCoordinate(coords[coords.length - 2][1], extent))
		);

		const endCoordinate = new Vector3(
			...(coords[coords.length - 1][0] ?? scaleCoordinate(coords[coords.length - 1][1], extent))
		);

		const arrowHeadHeight = 0.2 * startCoordinate.distanceTo(endCoordinate);

		group.add(
			new Mesh(
				new CylinderGeometry(
					0, // radius top
					0.04 * startCoordinate.distanceTo(endCoordinate), // radius bottom
					arrowHeadHeight
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

				new MeshBasicMaterial({
					color: colorHex,
					opacity,
					transparent: opacity !== 1
				})
			)
		);

		const coordinates = new Float32Array(coords.length * 3);

		coords.forEach((coordinate, i) => {
			coordinate[0] ??= scaleCoordinate(coordinate[1], extent);

			coordinates[i * 3] = coordinate[0][0];
			coordinates[i * 3 + 1] = coordinate[0][1];
			coordinates[i * 3 + 2] = coordinate[0][2];
		});

		group.add(
			new Line(
				new BufferGeometry().setAttribute(
					'position',
					new BufferAttribute(coordinates, 3)
				),
				new LineBasicMaterial({
					color: colorHex,
					opacity,
					transparent: opacity !== 1
				})
			)
		);

		return group;
	},
	cuboid: ({ color, coords, edgeForm = {}, opacity = 1 }, extent) => {
		const cuboids = new InstancedMesh(
			new BoxGeometry().translate(0.5, 0.5, 0.5), // translate the geometry so we don't need to calculate the middle of each coordinates-pair
			new MeshStandardMaterial({
				color: new Color(...color).getHex(),
				opacity,
				transparent: opacity !== 1,
				depthWrite: opacity === 1,
				flatShading: true,
				onBeforeCompile: (shader) => {
					shader.uniforms.showEdges = { value: edgeForm.showEdges ?? true };
					shader.uniforms.edgeColor = { value: edgeForm.color ?? [0, 0, 0] };

					shader.vertexShader = `
						varying vec2 vUv;
						varying vec3 vViewPosition;

						void main() {
							#include <begin_vertex>
							#include <project_vertex>

							vViewPosition = -mvPosition.xyz;
							vUv = uv;
						}
				  	`;

					shader.fragmentShader = `
						uniform vec3 diffuse;
						uniform vec3 emissive;
						uniform vec3 edgeColor;
						uniform float roughness;
						uniform float metalness;
						uniform float opacity;
						uniform bool showEdges;

						varying vec3 vViewPosition;
						varying vec3 vNormal;
						varying vec2 vUv;

						#include <common>
						#include <bsdfs>
						#include <lights_pars_begin>
						#include <lights_physical_pars_fragment>

						void main() {
							vec4 diffuseColor;

							if (showEdges) {
								vec2 grid = abs(fract(vUv - 0.5) - 0.5) / fwidth(vUv);

								float factor = min(min(grid.x, grid.y), 1.0);

								diffuseColor = vec4(diffuse * factor + edgeColor * (1.0 - factor), opacity);
							} else {
								diffuseColor = vec4(diffuse, opacity);
							}
						
							ReflectedLight reflectedLight = ReflectedLight(vec3(0), vec3(0), vec3(0), vec3(0));

							#include <roughnessmap_fragment>
							#include <metalnessmap_fragment>
							#include <normal_fragment_begin>
							#include <lights_physical_fragment>
							#include <lights_fragment_begin>
							#include <lights_fragment_maps>
							#include <lights_fragment_end>

							gl_FragColor = vec4(
								reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + emissive,
								diffuseColor.a
							);
						}
					`;
				}
			}),
			coords.length / 2
		);

		for (let i = 0; i < coords.length / 2; i++) {
			const startCoordinate = new Vector3(
				...(coords[i * 2][0] ?? scaleCoordinate(coords[i * 2][1], extent))
			);

			const endCoordinate = new Vector3(
				...(coords[i * 2 + 1][0] ?? scaleCoordinate(coords[i * 2 + 1][1], extent))
			);

			cuboids.setMatrixAt(
				i,
				new Matrix4()
					.setPosition(startCoordinate)
					.scale(endCoordinate.sub(startCoordinate))
			);
		};

		return cuboids;
	},
	cylinder: ({ color, coords, opacity = 1, radius }, extent) => {
		const cylinders = new InstancedMesh(
			new CylinderGeometry(radius, radius, 1, 24)
				.translate(0, -0.5, 0) // translate the geometry so we don't need to calculate the middle of each coordinates-pair
				.rotateX(Math.PI / 2), // rotate the cylinder 90 degrees to lookAt work
			new MeshLambertMaterial({
				color: new Color(...color).getHex(),
				opacity,
				transparent: opacity !== 1,
				depthWrite: opacity === 1
			}),
			coords.length / 2
		);

		for (let i = 0; i < coords.length / 2; i++) {
			const startCoordinate = new Vector3(
				...(coords[i * 2][0] ?? scaleCoordinate(coords[i * 2][1], extent))
			);

			const endCoordinate = new Vector3(
				...(coords[i * 2 + 1][0] ?? scaleCoordinate(coords[i * 2 + 1][1], extent))
			);

			cylinders.setMatrixAt(
				i,
				new Matrix4()
					.setPosition(startCoordinate)
					.lookAt(
						startCoordinate,
						endCoordinate,
						cylinders.up
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
	line: ({ color, coords, opacity = 1 }, extent) => {
		const coordinates = new Float32Array(coords.length * 3);

		coords.forEach((coordinate, i) => {
			coordinate[0] ??= scaleCoordinate(coordinate[1], extent);

			coordinates[i * 3] = coordinate[0][0];
			coordinates[i * 3 + 1] = coordinate[0][1];
			coordinates[i * 3 + 2] = coordinate[0][2];
		});

		return new Line(
			new BufferGeometry().setAttribute(
				'position',
				new BufferAttribute(coordinates, 3)
			),
			new LineBasicMaterial({
				color: new Color(...color).getHex(),
				opacity,
				transparent: opacity !== 1
			})
		);
	},
	point: ({ color, coords, opacity = 1, pointSize }, extent, canvasSize) => {
		const coordinates = new Float32Array(coords.length * 3);

		coords.forEach((coordinate, i) => {
			coordinate[0] ??= scaleCoordinate(coordinate[1], extent);

			coordinates[i * 3] = coordinate[0][0];
			coordinates[i * 3 + 1] = coordinate[0][1];
			coordinates[i * 3 + 2] = coordinate[0][2];
		});

		return new Points(
			new BufferGeometry().setAttribute(
				'position',
				new BufferAttribute(coordinates, 3)
			),
			new ShaderMaterial({
				transparent: true,
				depthWrite: false,
				uniforms: {
					size: { value: pointSize * canvasSize },
					color: { value: [...color, opacity] },
				},
				vertexShader: `
					uniform float size;

					void main() {
						gl_PointSize = size;
						gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
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
	polygon: ({ color, coords, opacity = 1 }, extent) => {
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
				const coordinates = new Float32Array(coords.length * 3);

				coords.forEach((coordinate, i) => {
					coordinate[0] ??= scaleCoordinate(coordinate[1], extent);

					coordinates[i * 3] = coordinate[0][0];
					coordinates[i * 3 + 1] = coordinate[0][1];
					coordinates[i * 3 + 2] = coordinate[0][2];
				});

				geometry = new BufferGeometry()
					.setAttribute(
						'position',
						new BufferAttribute(coordinates, 3)
					)
					.setIndex(earcut(coordinates));
			}
		};

		return new Mesh(
			geometry,
			new MeshStandardMaterial({
				color: new Color(...color).getHex(),
				opacity,
				transparent: opacity !== 1,
				flatShading: true,
				side: DoubleSide
			})
		);
	},
	sphere: ({ color, coords, opacity = 1, radius }, extent) => {
		const spheres = new InstancedMesh(
			new SphereGeometry(radius, 48, 48),
			new MeshLambertMaterial({
				color: new Color(...color).getHex(),
				opacity,
				transparent: opacity !== 1,
				depthWrite: opacity === 1
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
	},
	uniformPolyhedron: ({ color, coords, edgeLength = 1, opacity = 1, subType }, extent) => {
		let geometry;

		// the magic numbers in the code bellow were captured multipling √(3/8) (see https://en.wikipedia.org/wiki/Tetrahedron#Coordinates_for_a_regular_tetrahedron) by each number of the respective three.js geometry's position and divided by 0.5773502588272095 (the unique number in three.js TetrahedronGeometry's position)

		switch (subType) {
			case 'tetrahedron': {
				const vertexPosition = 0.61237243569 * edgeLength;

				geometry = new BufferGeometry().setAttribute(
					'position',
					new BufferAttribute(new Float32Array([
						-vertexPosition,
						-vertexPosition,
						vertexPosition,
						vertexPosition,
						vertexPosition,
						vertexPosition,
						-vertexPosition,
						vertexPosition,
						-vertexPosition,
						vertexPosition,
						-vertexPosition,
						-vertexPosition,
						-vertexPosition,
						vertexPosition,
						-vertexPosition,
						vertexPosition,
						vertexPosition,
						vertexPosition,
						vertexPosition,
						-vertexPosition,
						-vertexPosition,
						vertexPosition,
						vertexPosition,
						vertexPosition,
						-vertexPosition,
						-vertexPosition,
						vertexPosition,
						vertexPosition,
						-vertexPosition,
						-vertexPosition,
						-vertexPosition,
						-vertexPosition,
						vertexPosition,
						-vertexPosition,
						vertexPosition,
						-vertexPosition
					]), 3)
				);

				break;
			}
			case 'octahedron': {
				geometry = new BufferGeometry().setAttribute(
					'position',
					new BufferAttribute(new Float32Array([
						0,
						edgeLength,
						0,
						0,
						0,
						edgeLength,
						edgeLength,
						0,
						0,
						0,
						0,
						edgeLength,
						0,
						-edgeLength,
						0,
						edgeLength,
						0,
						0,
						0,
						-edgeLength,
						0,
						0,
						0,
						-edgeLength,
						edgeLength,
						0,
						0,
						0,
						0,
						-edgeLength,
						0,
						edgeLength,
						0,
						edgeLength,
						0,
						0,
						0,
						edgeLength,
						0,
						0,
						0,
						-edgeLength,
						-edgeLength,
						0,
						0,
						0,
						0,
						-edgeLength,
						0,
						-edgeLength,
						0,
						-edgeLength,
						0,
						0,
						0,
						-edgeLength,
						0,
						0,
						0,
						edgeLength,
						-edgeLength,
						0,
						0,
						0,
						0,
						edgeLength,
						0,
						edgeLength,
						0,
						-edgeLength,
						0,
						0,
					]), 3)
				);

				break;
			}
			case 'dodecahedron': {
				const vertexPosition0 = 0.61237243569 * edgeLength,
					vertexPosition1 = 0.37846700013 * edgeLength,
					vertexPosition2 = 0.99083940421 * edgeLength;

				geometry = new BufferGeometry().setAttribute(
					'position',
					new BufferAttribute(new Float32Array([
						0,
						vertexPosition1,
						vertexPosition2,
						vertexPosition0,
						vertexPosition0,
						vertexPosition0,
						-vertexPosition0,
						vertexPosition0,
						vertexPosition0,
						vertexPosition0,
						vertexPosition0,
						vertexPosition0,
						vertexPosition1,
						vertexPosition2,
						0,
						-vertexPosition0,
						vertexPosition0,
						vertexPosition0,
						vertexPosition1,
						vertexPosition2,
						0,
						-vertexPosition1,
						vertexPosition2,
						0,
						-vertexPosition0,
						vertexPosition0,
						vertexPosition0,
						vertexPosition2,
						0,
						vertexPosition1,
						vertexPosition2,
						0,
						-vertexPosition1,
						vertexPosition0,
						vertexPosition0,
						vertexPosition0,
						vertexPosition2,
						0,
						-vertexPosition1,
						vertexPosition0,
						vertexPosition0,
						-vertexPosition0,
						vertexPosition0,
						vertexPosition0,
						vertexPosition0,
						vertexPosition0,
						vertexPosition0,
						-vertexPosition0,
						vertexPosition1,
						vertexPosition2,
						0,
						vertexPosition0,
						vertexPosition0,
						vertexPosition0,
						vertexPosition0,
						-vertexPosition0,
						-vertexPosition0,
						0,
						-vertexPosition1,
						-vertexPosition2,
						vertexPosition2,
						0,
						-vertexPosition1,
						0,
						-vertexPosition1,
						-vertexPosition2,
						0,
						vertexPosition1,
						-vertexPosition2,
						vertexPosition2,
						0,
						-vertexPosition1,
						0,
						vertexPosition1,
						-vertexPosition2,
						vertexPosition0,
						vertexPosition0,
						-vertexPosition0,
						vertexPosition2,
						0,
						-vertexPosition1,
						-vertexPosition0,
						-vertexPosition0,
						-vertexPosition0,
						-vertexPosition2,
						0,
						-vertexPosition1,
						0,
						-vertexPosition1,
						-vertexPosition2,
						-vertexPosition2,
						0,
						-vertexPosition1,
						-vertexPosition0,
						vertexPosition0,
						-vertexPosition0,
						0,
						-vertexPosition1,
						-vertexPosition2,
						-vertexPosition0,
						vertexPosition0,
						-vertexPosition0,
						0,
						vertexPosition1,
						-vertexPosition2,
						0,
						-vertexPosition1,
						-vertexPosition2,
						-vertexPosition1,
						-vertexPosition2,
						0,
						-vertexPosition0,
						-vertexPosition0,
						vertexPosition0,
						-vertexPosition0,
						-vertexPosition0,
						-vertexPosition0,
						-vertexPosition0,
						-vertexPosition0,
						vertexPosition0,
						-vertexPosition2,
						0,
						vertexPosition1,
						-vertexPosition0,
						-vertexPosition0,
						-vertexPosition0,
						-vertexPosition2,
						0,
						vertexPosition1,
						-vertexPosition2,
						0,
						-vertexPosition1,
						-vertexPosition0,
						-vertexPosition0,
						-vertexPosition0,
						0,
						vertexPosition1,
						-vertexPosition2,
						-vertexPosition0,
						vertexPosition0,
						-vertexPosition0,
						vertexPosition0,
						vertexPosition0,
						-vertexPosition0,
						-vertexPosition0,
						vertexPosition0,
						-vertexPosition0,
						-vertexPosition1,
						vertexPosition2,
						0,
						vertexPosition0,
						vertexPosition0,
						-vertexPosition0,
						-vertexPosition1,
						vertexPosition2,
						0,
						vertexPosition1,
						vertexPosition2,
						0,
						vertexPosition0,
						vertexPosition0,
						-vertexPosition0,
						-vertexPosition2,
						0,
						-vertexPosition1,
						-vertexPosition2,
						0,
						vertexPosition1,
						-vertexPosition0,
						vertexPosition0,
						-vertexPosition0,
						-vertexPosition2,
						0,
						vertexPosition1,
						-vertexPosition0,
						vertexPosition0,
						vertexPosition0,
						-vertexPosition0,
						vertexPosition0,
						-vertexPosition0,
						-vertexPosition0,
						vertexPosition0,
						vertexPosition0,
						-vertexPosition1,
						vertexPosition2,
						0,
						-vertexPosition0,
						vertexPosition0,
						-vertexPosition0,
						-vertexPosition0,
						-vertexPosition0,
						vertexPosition0,
						0,
						-vertexPosition1,
						vertexPosition2,
						-vertexPosition2,
						0,
						vertexPosition1,
						0,
						-vertexPosition1,
						vertexPosition2,
						0,
						vertexPosition1,
						vertexPosition2,
						-vertexPosition2,
						0,
						vertexPosition1,
						0,
						vertexPosition1,
						vertexPosition2,
						-vertexPosition0,
						vertexPosition0,
						vertexPosition0,
						-vertexPosition2,
						0,
						vertexPosition1,
						vertexPosition1,
						-vertexPosition2,
						0,
						-vertexPosition1,
						-vertexPosition2,
						0,
						vertexPosition0,
						-vertexPosition0,
						-vertexPosition0,
						-vertexPosition1,
						-vertexPosition2,
						0,
						-vertexPosition0,
						-vertexPosition0,
						-vertexPosition0,
						vertexPosition0,
						-vertexPosition0,
						-vertexPosition0,
						-vertexPosition0,
						-vertexPosition0,
						-vertexPosition0,
						0,
						-vertexPosition1,
						-vertexPosition2,
						vertexPosition0,
						-vertexPosition0,
						-vertexPosition0,
						0,
						-vertexPosition1,
						vertexPosition2,
						vertexPosition0,
						-vertexPosition0,
						vertexPosition0,
						0,
						vertexPosition1,
						vertexPosition2,
						vertexPosition0,
						-vertexPosition0,
						vertexPosition0,
						vertexPosition2,
						0,
						vertexPosition1,
						0,
						vertexPosition1,
						vertexPosition2,
						vertexPosition2,
						0,
						vertexPosition1,
						vertexPosition0,
						vertexPosition0,
						vertexPosition0,
						0,
						vertexPosition1,
						vertexPosition2,
						vertexPosition0,
						-vertexPosition0,
						vertexPosition0,
						vertexPosition1,
						-vertexPosition2,
						0,
						vertexPosition2,
						0,
						vertexPosition1,
						vertexPosition1,
						-vertexPosition2,
						0,
						vertexPosition0,
						-vertexPosition0,
						-vertexPosition0,
						vertexPosition2,
						0,
						vertexPosition1,
						vertexPosition0,
						-vertexPosition0,
						-vertexPosition0,
						vertexPosition2,
						0,
						-vertexPosition1,
						vertexPosition2,
						0,
						vertexPosition1,
						-vertexPosition1,
						-vertexPosition2,
						0,
						vertexPosition1,
						-vertexPosition2,
						0,
						-vertexPosition0,
						-vertexPosition0,
						vertexPosition0,
						vertexPosition1,
						-vertexPosition2,
						0,
						vertexPosition0,
						-vertexPosition0,
						vertexPosition0,
						-vertexPosition0,
						-vertexPosition0,
						vertexPosition0,
						vertexPosition0,
						-vertexPosition0,
						vertexPosition0,
						0,
						-vertexPosition1,
						vertexPosition2,
						-vertexPosition0,
						-vertexPosition0,
						vertexPosition0,
					]), 3)
				);

				break;
			}
			case 'icosahedron': {
				const vertexPosition0 = 0.55762203476 * edgeLength,
					vertexPosition1 = 0.90225142642 * edgeLength;

				geometry = new BufferGeometry().setAttribute(
					'position',
					new BufferAttribute(new Float32Array([
						-vertexPosition1,
						0,
						vertexPosition0,
						0,
						vertexPosition0,
						vertexPosition1,
						-vertexPosition0,
						vertexPosition1,
						0,
						0,
						vertexPosition0,
						vertexPosition1,
						vertexPosition0,
						vertexPosition1,
						0,
						-vertexPosition0,
						vertexPosition1,
						0,
						vertexPosition0,
						vertexPosition1,
						0,
						0,
						vertexPosition0,
						-vertexPosition1,
						-vertexPosition0,
						vertexPosition1,
						0,
						0,
						vertexPosition0,
						-vertexPosition1,
						-vertexPosition1,
						0,
						-vertexPosition0,
						-vertexPosition0,
						vertexPosition1,
						0,
						-vertexPosition1,
						0,
						-vertexPosition0,
						-vertexPosition1,
						0,
						vertexPosition0,
						-vertexPosition0,
						vertexPosition1,
						0,
						0,
						vertexPosition0,
						vertexPosition1,
						vertexPosition1,
						0,
						vertexPosition0,
						vertexPosition0,
						vertexPosition1,
						0,
						-vertexPosition1,
						0,
						vertexPosition0,
						0,
						-vertexPosition0,
						vertexPosition1,
						0,
						vertexPosition0,
						vertexPosition1,
						-vertexPosition1,
						0,
						-vertexPosition0,
						-vertexPosition0,
						-vertexPosition1,
						0,
						-vertexPosition1,
						0,
						vertexPosition0,
						0,
						vertexPosition0,
						-vertexPosition1,
						0,
						-vertexPosition0,
						-vertexPosition1,
						-vertexPosition1,
						0,
						-vertexPosition0,
						vertexPosition0,
						vertexPosition1,
						0,
						vertexPosition1,
						0,
						-vertexPosition0,
						0,
						vertexPosition0,
						-vertexPosition1,
						vertexPosition1,
						0,
						vertexPosition0,
						0,
						-vertexPosition0,
						vertexPosition1,
						vertexPosition0,
						-vertexPosition1,
						0,
						0,
						-vertexPosition0,
						vertexPosition1,
						-vertexPosition0,
						-vertexPosition1,
						0,
						vertexPosition0,
						-vertexPosition1,
						0,
						-vertexPosition0,
						-vertexPosition1,
						0,
						0,
						-vertexPosition0,
						-vertexPosition1,
						vertexPosition0,
						-vertexPosition1,
						0,
						0,
						-vertexPosition0,
						-vertexPosition1,
						vertexPosition1,
						0,
						-vertexPosition0,
						vertexPosition0,
						-vertexPosition1,
						0,
						vertexPosition1,
						0,
						-vertexPosition0,
						vertexPosition1,
						0,
						vertexPosition0,
						vertexPosition0,
						-vertexPosition1,
						0,
						vertexPosition1,
						0,
						vertexPosition0,
						0,
						vertexPosition0,
						vertexPosition1,
						0,
						-vertexPosition0,
						vertexPosition1,
						0,
						-vertexPosition0,
						vertexPosition1,
						-vertexPosition1,
						0,
						vertexPosition0,
						-vertexPosition0,
						-vertexPosition1,
						0,
						-vertexPosition0,
						-vertexPosition1,
						0,
						-vertexPosition1,
						0,
						-vertexPosition0,
						0,
						-vertexPosition0,
						-vertexPosition1,
						0,
						-vertexPosition0,
						-vertexPosition1,
						0,
						vertexPosition0,
						-vertexPosition1,
						vertexPosition1,
						0,
						-vertexPosition0,
						vertexPosition1,
						0,
						-vertexPosition0,
						vertexPosition0,
						vertexPosition1,
						0,
						vertexPosition1,
						0,
						vertexPosition0,
					]), 3)
				);

				break;
			}
		}

		const polyhedrons = new InstancedMesh(
			geometry,
			new MeshStandardMaterial({
				color: new Color(...color).getHex(),
				opacity,
				transparent: opacity !== 1,
				flatShading: true,
				depthWrite: opacity === 1
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
	}
};

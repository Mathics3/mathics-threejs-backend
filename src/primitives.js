import {
	BoxGeometry,
	BufferAttribute,
	BufferGeometry,
	Color,
	CylinderGeometry,
	DoubleSide,
	EdgesGeometry,
	Group,
	InstancedBufferAttribute,
	InstancedBufferGeometry,
	InstancedMesh,
	Line,
	LineBasicMaterial,
	LineSegments,
	Matrix4,
	Mesh,
	MeshLambertMaterial,
	MeshStandardMaterial,
	Points,
	Quaternion,
	ShaderMaterial,
	Shape,
	ShapeGeometry,
	SphereGeometry,
	UniformsLib,
	Vector3
} from '../vendors/three.js';

import earcut from '../vendors/earcut.js';
import scaleCoordinate from './scaleCoordinate.js';

// "depthWrite: opacity === 1" fix a bug that when you rotate the camera, the transparency is removed from the object

export default {
	arrow: ({ color, coords, opacity = 1 }, extent) => {
		const group = new Group();

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
				new ShaderMaterial({
					transparent: opacity !== 1,
					uniforms: {
						color: { value: [...color, opacity] }
					},
					vertexShader: `
						void main() {
							gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
						}
					`,
					fragmentShader: `
						uniform vec4 color;

						void main() {
							gl_FragColor = color;
						}
					`
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
					color: new Color(...color),
					opacity,
					transparent: opacity !== 1
				})
			)
		);

		return group;
	},
	cuboid: ({ color, coords, edgeForm = {}, opacity = 1 }, extent) => {
		// the edges of the cuboids are drawn in the fragment shader, doing this is faster than putting the edges in a different object

		const cuboids = new InstancedMesh(
			new BoxGeometry().translate(0.5, 0.5, 0.5), // translate the geometry so we don't need to calculate the middle of each coordinates-pair
			new ShaderMaterial({
				transparent: opacity !== 1,
				depthWrite: opacity === 1,
				lights: true,
				uniforms: {
					...UniformsLib.lights,
					diffuse: { value: color },
					edgeColor: { value: edgeForm.color ?? [0, 0, 0] },
					roughness: { value: 1.0 },
					metalness: { value: 0.0 },
					opacity: { value: opacity },
					showEdges: { value: edgeForm.showEdges ?? true }
				},
				vertexShader: `
					varying vec2 vUv;
					varying vec3 vViewPosition;

					void main() {
						#include <begin_vertex>
						#include <project_vertex>

						vViewPosition = -mvPosition.xyz;
						vUv = uv;
					}
				`,
				fragmentShader: `
					#define FLAT_SHADED

					uniform vec3 diffuse;
					uniform vec3 edgeColor;
					uniform float roughness;
					uniform float metalness;
					uniform float opacity;
					uniform bool showEdges;

					varying vec3 vViewPosition;
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
						#include <lights_fragment_end>

						gl_FragColor = vec4(
							reflectedLight.directDiffuse + reflectedLight.indirectDiffuse,
							diffuseColor.a
						);
					}
				`
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
	cylinder: ({ color, coords, edgeForm = {}, opacity = 1, radius = 1 }, extent) => {
		// number of vertex per coordinate / number of coordinates per cylinder = 3 / 2
		const cylindersBegin = new Float32Array(coords.length * 1.5);
		const cylindersEnd = new Float32Array(coords.length * 1.5);

		for (let i = 0; i < coords.length / 2; i++) {
			const startCoordinate = coords[i * 2][0] ?? scaleCoordinate(coords[i * 2][1], extent);

			const endCoordinate = coords[i * 2 + 1][0] ?? scaleCoordinate(coords[i * 2 + 1][1], extent);

			cylindersBegin[i * 3] = startCoordinate[0];
			cylindersBegin[i * 3 + 1] = startCoordinate[1];
			cylindersBegin[i * 3 + 2] = startCoordinate[2];

			cylindersEnd[i * 3] = endCoordinate[0];
			cylindersEnd[i * 3 + 1] = endCoordinate[1];
			cylindersEnd[i * 3 + 2] = endCoordinate[2];
		}

		const cylinderGeometry = new InstancedBufferGeometry().copy(
			new CylinderGeometry(radius, radius, 1, 24)
				.translate(0, -0.5, 0) // translate the geometry so we don't need to calculate the middle of each coordinates-pair
				.rotateX(Math.PI / 2) // rotate the cylinder 90 degrees to lookAt work
		);

		cylinderGeometry.instanceCount = coords.length / 2;

		cylinderGeometry.setAttribute(
			'cylinderBegin',
			new InstancedBufferAttribute(cylindersBegin, 3)
		);

		cylinderGeometry.setAttribute(
			'cylinderEnd',
			new InstancedBufferAttribute(cylindersEnd, 3)
		);

		const cylinders = new Mesh(
			cylinderGeometry,
			new ShaderMaterial({
				transparent: opacity !== 1,
				depthWrite: opacity === 1,
				lights: true,
				uniforms: {
					...UniformsLib.lights,
					diffuse: { value: color },
					opacity: { value: opacity },
				},
				vertexShader: `
					attribute vec3 cylinderBegin;
					attribute vec3 cylinderEnd;

					varying vec3 vLightFront;
					varying vec3 vIndirectFront;

					#include <common>
					#include <lights_pars_begin>

					void main() {
						#include <beginnormal_vertex>
						#include <defaultnormal_vertex>

						vec3 z = normalize(cylinderBegin - cylinderEnd);
						// if z.z is 0 the cylinder doesn't appear
						z.z += 0.0001;

						vec3 x = normalize(cross(vec3(0, 1, 0), z));
						vec3 y = cross(z, x);

						float height = distance(cylinderBegin, cylinderEnd);

						// position, rotate and scale the cylinder
						mat4 cylinderMatrix = mat4(x, 0, y, 0, z * height, 0, cylinderBegin, 1);

						vec4 mvPosition = modelViewMatrix * cylinderMatrix * vec4(position, 1);

						gl_Position = projectionMatrix * mvPosition;

						#include <lights_lambert_vertex>
					}
				`,
				fragmentShader: `
					uniform vec3 diffuse;
					uniform float opacity;

					varying vec3 vLightFront;
					varying vec3 vIndirectFront;

					#include <common>
					#include <bsdfs>

					void main() {
						ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));

						reflectedLight.indirectDiffuse = vIndirectFront * BRDF_Diffuse_Lambert(diffuse);

						reflectedLight.directDiffuse = vLightFront * BRDF_Diffuse_Lambert(diffuse);

						gl_FragColor = vec4(reflectedLight.directDiffuse + reflectedLight.indirectDiffuse, opacity);
					}
				`
			})
		);

		// without this the cylinders disappear when the zoom is big
		cylinders.frustumCulled = false;

		if (edgeForm.showEdges === false) {
			// if the edges aren't shown the work is done
			return cylinders;
		}

		const group = new Group();

		group.add(cylinders);

		// differently from cuboid's edges, the cylinders's ones are in a different object. It is very hard or maybe impossible to draw edges with complex shapes in the fragment shader

		const edgesGeometry = new InstancedBufferGeometry()
			.setAttribute(
				'position',
				new BufferAttribute(
					new Float32Array([
						0, -1, 0,
						0.258819043636322, -0.9659258127212524, 0,

						0.258819043636322, -0.9659258127212524, 0,
						0.5, -0.8660253882408142, 0,

						0.5, -0.8660253882408142, 0,
						0.7071067690849304, -0.7071067690849304, 0,

						0.7071067690849304, -0.7071067690849304, 0,
						0.8660253882408142, -0.5, 0,

						0.8660253882408142, -0.5, 0,
						0.9659258127212524, -0.258819043636322, 0,

						0.9659258127212524, -0.258819043636322, 0,
						1, 0, 0,

						1, 0, 0,
						0.9659258127212524, 0.258819043636322, 0,

						0.9659258127212524, 0.258819043636322, 0,
						0.8660253882408142, 0.5, 0,

						0.8660253882408142, 0.5, 0,
						0.7071067690849304, 0.7071067690849304, 0,

						0.7071067690849304, 0.7071067690849304, 0,
						0.5, 0.8660253882408142, 0,

						0.5, 0.8660253882408142, 0,
						0.258819043636322, 0.9659258127212524, 0,

						0.258819043636322, 0.9659258127212524, 0,
						0, 1, 0,

						0, 1, 0,
						-0.258819043636322, 0.9659258127212524, 0,

						-0.258819043636322, 0.9659258127212524, 0,
						-0.5, 0.8660253882408142, 0,

						-0.5, 0.8660253882408142, 0,
						-0.7071067690849304, 0.7071067690849304, 0,

						-0.7071067690849304, 0.7071067690849304, 0,
						-0.8660253882408142, 0.5, 0,

						-0.8660253882408142, 0.5, 0,
						-0.9659258127212524, 0.258819043636322, 0,

						-0.9659258127212524, 0.258819043636322, 0,
						-1, 0, 0,

						-1, 0, 0,
						-0.9659258127212524, -0.258819043636322, 0,

						-0.9659258127212524, -0.258819043636322, 0,
						-0.8660253882408142, -0.5, 0,

						-0.8660253882408142, -0.5, 0,
						-0.7071067690849304, -0.7071067690849304, 0,

						-0.7071067690849304, -0.7071067690849304, 0,
						-0.5, -0.8660253882408142, 0,

						-0.5, -0.8660253882408142, 0,
						-0.258819043636322, -0.9659258127212524, 0,

						-0.258819043636322, -0.9659258127212524, 0,
						0, -1, 0,

						0.258819043636322, -0.9659258127212524, -1,
						0, -1, -1,

						0.5, -0.8660253882408142, -1,
						0.258819043636322, -0.9659258127212524, -1,

						0.7071067690849304, -0.7071067690849304, -1,
						0.5, -0.8660253882408142, -1,

						0.8660253882408142, -0.5, -1,

						0.7071067690849304, -0.7071067690849304, -1,
						0.9659258127212524, -0.258819043636322, -1,

						0.8660253882408142, -0.5, -1,

						1, 0, -1,
						0.9659258127212524, -0.258819043636322, -1,

						0.9659258127212524, 0.258819043636322, -1,
						1, 0, -1,

						0.8660253882408142, 0.5, -1,
						0.9659258127212524, 0.258819043636322, -1,

						0.7071067690849304, 0.7071067690849304, -1,
						0.8660253882408142, 0.5, -1,

						0.5, 0.8660253882408142, -1,
						0.7071067690849304, 0.7071067690849304, -1,

						0.258819043636322, 0.9659258127212524, -1,
						0.5, 0.8660253882408142, -1,

						0, 1, -1,
						0.258819043636322, 0.9659258127212524, -1,

						-0.258819043636322, 0.9659258127212524, -1,
						0, 1, -1,

						-0.5, 0.8660253882408142, -1,
						-0.258819043636322, 0.9659258127212524, -1,

						-0.7071067690849304, 0.7071067690849304, -1,
						-0.5, 0.8660253882408142, -1,

						-0.8660253882408142, 0.5, -1,
						-0.7071067690849304, 0.7071067690849304, -1,

						-0.9659258127212524, 0.258819043636322, -1,
						-0.8660253882408142, 0.5, -1,

						-1, 0, -1,
						-0.9659258127212524, 0.258819043636322, -1,

						-0.9659258127212524, -0.258819043636322, -1,
						-1, 0, -1,

						-0.8660253882408142, -0.5, -1,
						-0.9659258127212524, -0.258819043636322, -1,

						-0.7071067690849304, -0.7071067690849304, -1,
						-0.8660253882408142, -0.5, -1,

						-0.5, -0.8660253882408142, -1,
						-0.7071067690849304, -0.7071067690849304, -1,

						-0.258819043636322, -0.9659258127212524, -1,
						-0.5, -0.8660253882408142, -1,

						0, -1, -1,
						-0.258819043636322, -0.9659258127212524, -1
					]),
					3
				)
			)
			// scaling z changes the position of the edges
			.scale(radius, radius, 1);

		edgesGeometry.instanceCount = coords.length / 2;

		edgesGeometry.setAttribute(
			'cylinderBegin',
			new InstancedBufferAttribute(cylindersBegin, 3)
		);

		edgesGeometry.setAttribute(
			'cylinderEnd',
			new InstancedBufferAttribute(cylindersEnd, 3)
		);

		const edges = new LineSegments(
			edgesGeometry,
			new ShaderMaterial({
				uniforms: {
					color: { value: edgeForm.color ?? [0, 0, 0] }
				},
				vertexShader: `
					attribute vec3 cylinderBegin;
					attribute vec3 cylinderEnd;

					void main() {
						vec3 z = normalize(cylinderBegin - cylinderEnd);
						// if z.z is 0 the edges doesn't appear
						z.z += 0.0001;

						vec3 x = normalize(cross(vec3(0.0, 1.0, 0.0), z));
						vec3 y = cross(z, x);

						float height = distance(cylinderBegin, cylinderEnd);

						// position, rotate and scale the cylinder
						mat4 cylinderMatrix = mat4(x, 0, y, 0, z * height, 0, cylinderBegin, 1);

						gl_Position = projectionMatrix * modelViewMatrix * cylinderMatrix * vec4(position, 1.0);
					}
				`,
				fragmentShader: `
					uniform vec3 color;

					void main() {
						gl_FragColor = vec4(color, 1.0);
					}
				`
			})
		);

		// without this the edges disappear when the zoom is big
		edges.frustumCulled = false;

		group.add(edges);

		return group;
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
	uniformPolyhedron: ({ color, coords, edgeForm = {}, edgeLength = 1, opacity = 1, subType }, extent) => {
		let polyhedronGeometry;

		// the magic numbers in the code bellow were captured multipling √(3/8) (see https://en.wikipedia.org/wiki/Tetrahedron#Coordinates_for_a_regular_tetrahedron) by each number of the respective three.js geometry's position and divided by 0.5773502588272095 (the unique number in three.js TetrahedronGeometry's position)

		switch (subType) {
			case 'tetrahedron': {
				const vertexPosition = 0.61237243569 * edgeLength;

				polyhedronGeometry = new InstancedBufferGeometry().setAttribute(
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
				polyhedronGeometry = new InstancedBufferGeometry().setAttribute(
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

				polyhedronGeometry = new InstancedBufferGeometry().setAttribute(
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

				polyhedronGeometry = new InstancedBufferGeometry().setAttribute(
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

		const polyhedronsCenters = new Float32Array(coords.length * 3);

		coords.forEach((coordinate, i) => {
			coordinate[0] ??= scaleCoordinate(coordinate[1], extent);

			polyhedronsCenters[i * 3] = coordinate[0][0];
			polyhedronsCenters[i * 3 + 1] = coordinate[0][1];
			polyhedronsCenters[i * 3 + 2] = coordinate[0][2];
		});

		polyhedronGeometry.instanceCount = coords.length;

		polyhedronGeometry.setAttribute(
			'offset',
			new InstancedBufferAttribute(polyhedronsCenters, 3)
		);

		const polyhedrons = new Mesh(
			polyhedronGeometry,
			new ShaderMaterial({
				transparent: opacity !== 1,
				depthWrite: opacity === 1,
				lights: true,
				uniforms: {
					...UniformsLib.lights,
					diffuse: { value: color },
					opacity: { value: opacity }
				},
				vertexShader: `
					attribute vec3 offset;

					varying vec3 vViewPosition;

					void main() {
						vec4 mvPosition = modelViewMatrix * vec4(vec3(position) + offset, 1.0);

						vViewPosition = -mvPosition.xyz;

						gl_Position = projectionMatrix * mvPosition;
					}
				`,
				fragmentShader: `
					#define FLAT_SHADED

					uniform vec3 diffuse;
					uniform vec3 emissive;
					uniform float roughness;
					uniform float metalness;
					uniform float opacity;
					varying vec3 vViewPosition;

					#include <common>
					#include <bsdfs>
					#include <lights_pars_begin>
					#include <lights_physical_pars_fragment>

					void main() {
						vec4 diffuseColor = vec4(diffuse, opacity);
						ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));

						vec3 totalEmissiveRadiance = emissive;

						#include <roughnessmap_fragment>
						#include <metalnessmap_fragment>
						#include <normal_fragment_begin>
						#include <lights_physical_fragment>
						#include <lights_fragment_begin>
						#include <lights_fragment_maps>
						#include <lights_fragment_end>

						gl_FragColor = vec4(reflectedLight.directDiffuse + reflectedLight.indirectDiffuse, diffuseColor.a);
					}
				`
			})
		);

		// without this the polyhedrons disappear when the zoom is big
		polyhedrons.frustumCulled = false;

		if (edgeForm.showEdges === false) {
			// if the edges aren't shown the work is done
			return polyhedrons;
		}

		const group = new Group();

		group.add(polyhedrons);

		// the polyhedrons' edges are basicaly the same as the cylinders' ones

		const edgesGeometry = new InstancedBufferGeometry().copy(
			new EdgesGeometry(polyhedronGeometry) // "calculate" the edges of the desired polyhedron
		);

		edgesGeometry.instanceCount = coords.length;

		edgesGeometry.setAttribute(
			'offset',
			new InstancedBufferAttribute(polyhedronsCenters, 3)
		);

		const edges = new LineSegments(
			edgesGeometry,
			new ShaderMaterial({
				uniforms: {
					color: { value: edgeForm.color ?? [0, 0, 0] }
				},
				vertexShader: `
					attribute vec3 offset;

					void main() {
						gl_Position = projectionMatrix * modelViewMatrix * vec4(vec3(position) + offset, 1.0);
					}
				`,
				fragmentShader: `
					uniform vec3 color;

					void main() {
						gl_FragColor = vec4(color, 1.0);
					}
				`
			})
		);

		// without this the edges disappear when the zoom is big
		edges.frustumCulled = false;

		group.add(edges);

		return group;
	}
};

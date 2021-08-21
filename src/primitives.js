// This file contains implmentations using three.js of Mathematica and
// Mathics Graphics3D primitives like "Sphere", or "Cuboid, etc.
//
// A full list of primitives that this might grow to can be found at:
// https://reference.wolfram.com/language/ref/Graphics3D.html
//
// Note that Graphics3D includes a number of 1D and 2D kinds of
// objects, like Point, Line, Arrow, or Polygon which are extended
// into 3D.
//
// Also note that in contrast to he Mathematica/Mathics name, we
// downcase the first letter of the corresponding name.  For example,
// we use the function name "sphere" and "uniformPolyhedron", not
// "Sphere" and "UnformPolyhedron".

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

// usually the vertices are stored in the attribute "position"

// the vertex shader is executed for each vertex
// e.g.:, if we have an attribute "position" with 3 vertices, each with 3 values: x, y and z, the vertex shader would be executed 3 times
// all the attributes need to have the same number of elements
// if a geometry has an attribute "position" with 3 vertices and an attribute "color" with 3 colors, the vertex shader would be executed 3 times

// the BufferAttributes are shared for all InstancedBufferGeometry instances
// the InstancedBufferAttributes are shared for vertices of a instance InstancedBufferGeometry instance

// the fragment shader is executed for every pixel in the primitive

// "depthWrite: opacity === 1" fixes a bug that occurs when you rotate the camera and the transparency is removed from the primitive

// "transparent: opacity !== 1" just lets transparent the primitives that have opacity different than 100%, thus improving the performance of opaque primitives

// fillInCoord adds "coordinate" coordBuffer[index].  coordBuffer is
// preallocated for efficiency on GPUs. Also, WebGL only accepts a
// typed array as an attribute.
function fillInCoord(coordBuffer, coordinate, index) {
	coordBuffer[index * 3] = coordinate[0];
	coordBuffer[index * 3 + 1] = coordinate[1];
	coordBuffer[index * 3 + 2] = coordinate[2];
}

export default {
	// See https://reference.wolfram.com/language/ref/Arrow
	// for the high-level description of what is being rendered.
	arrow: ({ color, coords, opacity = 1 }, extent) => {
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

		group.add(new Mesh(
			new CylinderGeometry(
				0, // radius top, as it is a cone we let it be 0
				0.2 * arrowHeadHeight, // radius bottom
				arrowHeadHeight // height
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

		const coordinates = new Float32Array(coords.length * 3);

		coords.forEach((coordinate, i) =>
		       fillInCoord(
				coordinates,
				coordinate[0] ?? scaleCoordinate(coordinate[1], extent),
				i
			)
		);

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
	// See https://reference.wolfram.com/language/ref/Cuboid
	// for the high-level description of what is being rendered.
	cuboid: ({ color, coords, edgeForm = {}, opacity = 1 }, extent) => {
		// the edges of the cuboids are drawn in the fragment shader; doing this is faster than putting the edges in a different object

		// number of vertex per coordinate / number of coordinates per cuboid = 3 / 2
		const cuboidsBegin = new Float32Array(coords.length * 1.5);
		const cuboidsEnd = new Float32Array(coords.length * 1.5);

		for (let i = 0; i < coords.length / 2; i++) {
			fillInCoord(
				cuboidsBegin,
				coords[i * 2][0] ?? scaleCoordinate(coords[i * 2][1], extent),
				i
			);

			fillInCoord(
				cuboidsEnd,
				coords[i * 2 + 1][0] ?? scaleCoordinate(coords[i * 2 + 1][1], extent),
				i
			);
		}

		const cuboidGeometry = new InstancedBufferGeometry().copy(
			new BoxGeometry().translate(0.5, 0.5, 0.5), // translate the geometry so we don't need to calculate the middle of each coordinates-pair
		);

		cuboidGeometry.instanceCount = coords.length / 2;

		cuboidGeometry.setAttribute(
			'cuboidBegin',
			new InstancedBufferAttribute(cuboidsBegin, 3)
		);

		cuboidGeometry.setAttribute(
			'cuboidEnd',
			new InstancedBufferAttribute(cuboidsEnd, 3)
		);

		const cuboids = new Mesh(
			cuboidGeometry,
			new ShaderMaterial({
				transparent: opacity !== 1,
				depthWrite: opacity === 1,
				lights: true,
				uniforms: {
					...UniformsLib.lights,
					diffuse: { value: color },
					edgeColor: { value: edgeForm.color ?? [0, 0, 0] },
					opacity: { value: opacity },
					showEdges: { value: edgeForm.showEdges ?? true }
				},
				vertexShader: `
					attribute vec3 cuboidBegin;
					attribute vec3 cuboidEnd;

					varying vec2 vUv;
					varying vec3 vViewPosition;

					void main() {
						// position and scale the cuboid
						mat4 cuboidMatrix = mat4(
							cuboidEnd.x - cuboidBegin.x, 0, 0, 0, // row 0
							0, cuboidEnd.y - cuboidBegin.y, 0, 0, // row 1
							0, 0, cuboidEnd.z - cuboidBegin.z, 0, // row 2
							cuboidBegin, 1                        // row 3
						);

						vec4 mvPosition = modelViewMatrix * cuboidMatrix * vec4(position, 1);

						gl_Position = projectionMatrix * mvPosition;

						vViewPosition = -mvPosition.xyz;
						vUv = uv;
					}
				`,
				fragmentShader: `
					#define FLAT_SHADED

					uniform vec3 diffuse;
					uniform vec3 edgeColor;
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

						vec3 normal = normalize(cross(
							vec3(dFdx(vViewPosition.x), dFdx(vViewPosition.y), dFdx(vViewPosition.z)),
							vec3(dFdy(vViewPosition.x), dFdy(vViewPosition.y), dFdy(vViewPosition.z))
						));

						PhysicalMaterial material;
						material.diffuseColor = diffuseColor.rgb;

						#include <lights_fragment_begin>
						#include <lights_fragment_end>

						gl_FragColor = vec4(
							reflectedLight.directDiffuse + reflectedLight.indirectDiffuse,
							diffuseColor.a
						);
					}
				`
			})
		);

		// without this the cuboids disappear when the zoom is big
		cuboids.frustumCulled = false;

		return cuboids;



	},
	// See https://reference.wolfram.com/language/ref/Cylinder
	// for the high-level description of what is being rendered.
	cylinder: ({ color, coords, edgeForm = {}, opacity = 1, radius = 1 }, extent) => {
		// number of vertex per coordinate / number of coordinates per cylinder = 3 / 2
		const cylindersBegin = new Float32Array(coords.length * 1.5);
		const cylindersEnd = new Float32Array(coords.length * 1.5);

		for (let i = 0; i < coords.length / 2; i++) {
			fillInCoord(
				cylindersBegin,
				coords[i * 2][0] ?? scaleCoordinate(coords[i * 2][1], extent),
				i
			);

			fillInCoord(
				cylindersEnd,
				coords[i * 2 + 1][0] ?? scaleCoordinate(coords[i * 2 + 1][1], extent),
				i
			);
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
						mat4 cylinderMatrix = mat4(
							x, 0,            // row 0
							y, 0,            // row 1
							z * height, 0,   // row 2
							cylinderBegin, 1 // row 3
						);

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
						gl_FragColor = vec4(
							vLightFront * BRDF_Diffuse_Lambert(diffuse) + vIndirectFront * BRDF_Diffuse_Lambert(diffuse),
							opacity
						);
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

		// the lines below are the edges' vertices' positions
		// the magic numbers below are modified from the position attribute of a three.js EdgesGeometry of the cylinder
		// to get them: console.log(new EdgesGeometry(cylinderGeometry).attributes.position.array)

		const edgesGeometry = new InstancedBufferGeometry()
			.setAttribute(
				'position',
				new BufferAttribute(
					new Float32Array([
						// first circle

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

						// second circle

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
			// if we don't scale x and y the edge is smaller than the cylinder, scaling z changes the position of the edges
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

						vec3 x = normalize(cross(vec3(0, 1, 0), z));
						vec3 y = cross(z, x);

						float height = distance(cylinderBegin, cylinderEnd);

						// position, rotate and scale the edges
						mat4 cylinderMatrix = mat4(
							x, 0,            // row 0
							y, 0,            // row 1
							z * height, 0,   // row 2
							cylinderBegin, 1 // row 3
						);

						gl_Position = projectionMatrix * modelViewMatrix * cylinderMatrix * vec4(position, 1);
					}
				`,
				fragmentShader: `
					uniform vec3 color;

					void main() {
						gl_FragColor = vec4(color, 1);
					}
				`
			})
		);

		// without this the edges disappear when the zoom is big
		edges.frustumCulled = false;

		group.add(edges);

		return group;
	},
	// See https://reference.wolfram.com/language/ref/Line
	// for the high-level description of what is being rendered.
	line: ({ color, coords, opacity = 1 }, extent) => {
		const coordinates = new Float32Array(coords.length * 3);

		coords.forEach((coordinate, i) =>
			fillInCoord(
				coordinates,
				coordinate[0] ?? scaleCoordinate(coordinate[1], extent),
				i
			)
		);

		return new Line(
			new BufferGeometry().setAttribute(
				'position',
				new BufferAttribute(coordinates, 3)
			),
			new LineBasicMaterial({
				color: new Color(...color),
				opacity,
				transparent: opacity !== 1
			})
		);
	},
	// See https://reference.wolfram.com/language/ref/Point
	// for the high-level description of what is being rendered.
	point: ({ color, coords, opacity = 1, pointSize }, extent, canvasSize) => {
		const coordinates = new Float32Array(coords.length * 3);

		coords.forEach((coordinate, i) =>
			fillInCoord(
				coordinates,
				coordinate[0] ?? scaleCoordinate(coordinate[1], extent),
				i
			)
		);

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
						gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
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
	// See https://reference.wolfram.com/language/ref/Polygon
	// for the high-level description of what is being rendered.
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
				// we use earcut to "break" the polygon into multiple triangles

				const coordinates = new Float32Array(coords.length * 3);

				coords.forEach((coordinate, i) =>
					fillInCoord(
						coordinates,
						coordinate[0] ?? scaleCoordinate(coordinate[1], extent),
						i
					)
				);

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
				color: new Color(...color),
				opacity,
				transparent: opacity !== 1,
				flatShading: true,
				side: DoubleSide
			})
		);
	},
	// See https://reference.wolfram.com/language/ref/Sphere
	// for the high-level description of what is being rendered.
	sphere: ({ color, coords, opacity = 1, radius }, extent) => {
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

		coords.forEach((coordinate, i) =>
			spheres.setMatrixAt(
				i,
				new Matrix4().setPosition(...(coordinate[0] ?? scaleCoordinate(coordinate[1], extent)))
			)
		);

		return spheres;
	},
	// See https://reference.wolfram.com/language/ref/UniformPolyhedron
	// for the high-level description of what is being rendered.
	uniformPolyhedron: ({ color, coords, edgeForm = {}, edgeLength = 1, opacity = 1, subType }, extent) => {
		let polyhedronGeometry;

		// the magic numbers in the code bellow were captured multipling √(3/8) (see https://en.wikipedia.org/wiki/Tetrahedron#Coordinates_for_a_regular_tetrahedron) by each number of the respective three.js geometry's position and divided by 0.5773502588272095 (the unique number in three.js TetrahedronGeometry's position)

		switch (subType) {
			case 'tetrahedron': {
				const vertexPosition = 0.61237243569 * edgeLength;

				polyhedronGeometry = new InstancedBufferGeometry().setAttribute(
					'position',
					new BufferAttribute(new Float32Array([
						-vertexPosition, -vertexPosition, vertexPosition,
						vertexPosition, vertexPosition, vertexPosition,
						-vertexPosition, vertexPosition, -vertexPosition,

						vertexPosition, -vertexPosition, -vertexPosition,
						-vertexPosition, vertexPosition, -vertexPosition,
						vertexPosition, vertexPosition, vertexPosition,

						vertexPosition, -vertexPosition, -vertexPosition,
						vertexPosition, vertexPosition, vertexPosition,
						-vertexPosition, -vertexPosition, vertexPosition,

						vertexPosition, -vertexPosition, -vertexPosition,
						-vertexPosition, -vertexPosition, vertexPosition,
						-vertexPosition, vertexPosition, -vertexPosition
					]), 3)
				);

				break;
			}
			case 'octahedron': {
				polyhedronGeometry = new InstancedBufferGeometry().setAttribute(
					'position',
					new BufferAttribute(new Float32Array([
						0, edgeLength, 0,
						0, 0, edgeLength,
						edgeLength, 0, 0,

						0, 0, edgeLength,
						0, -edgeLength, 0,
						edgeLength, 0, 0,

						0, -edgeLength, 0,
						0, 0, -edgeLength,
						edgeLength, 0, 0,

						0, 0, -edgeLength,
						0, edgeLength, 0,
						edgeLength, 0, 0,

						0, edgeLength, 0,
						0, 0, -edgeLength,
						-edgeLength, 0, 0,

						0, 0, -edgeLength,
						0, -edgeLength, 0,
						-edgeLength, 0, 0,

						0, -edgeLength, 0,
						0, 0, edgeLength,
						-edgeLength, 0, 0,

						0, 0, edgeLength,
						0, edgeLength, 0,
						-edgeLength, 0, 0
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
						0, vertexPosition1, vertexPosition2,
						vertexPosition0, vertexPosition0, vertexPosition0,
						-vertexPosition0, vertexPosition0, vertexPosition0,

						vertexPosition0, vertexPosition0, vertexPosition0,
						vertexPosition1, vertexPosition2, 0,
						-vertexPosition0, vertexPosition0, vertexPosition0,

						vertexPosition1, vertexPosition2, 0,
						-vertexPosition1, vertexPosition2, 0,
						-vertexPosition0, vertexPosition0, vertexPosition0,

						vertexPosition2, 0, vertexPosition1,
						vertexPosition2, 0, -vertexPosition1,
						vertexPosition0, vertexPosition0, vertexPosition0,

						vertexPosition2, 0, -vertexPosition1,
						vertexPosition0, vertexPosition0, -vertexPosition0,
						vertexPosition0, vertexPosition0, vertexPosition0,

						vertexPosition0, vertexPosition0, -vertexPosition0,
						vertexPosition1, vertexPosition2, 0,
						vertexPosition0, vertexPosition0, vertexPosition0,

						vertexPosition0, -vertexPosition0, -vertexPosition0,
						0, -vertexPosition1, -vertexPosition2,
						vertexPosition2, 0, -vertexPosition1,

						0, -vertexPosition1, -vertexPosition2,
						0, vertexPosition1, -vertexPosition2,
						vertexPosition2, 0, -vertexPosition1,

						0, vertexPosition1, -vertexPosition2,
						vertexPosition0, vertexPosition0, -vertexPosition0,
						vertexPosition2, 0, -vertexPosition1,

						-vertexPosition0, -vertexPosition0, -vertexPosition0,
						-vertexPosition2, 0, -vertexPosition1,
						0, -vertexPosition1, -vertexPosition2,

						-vertexPosition2, 0, -vertexPosition1,
						-vertexPosition0, vertexPosition0, -vertexPosition0,
						0, -vertexPosition1, -vertexPosition2,

						-vertexPosition0, vertexPosition0, -vertexPosition0,
						0, vertexPosition1, -vertexPosition2,
						0, -vertexPosition1, -vertexPosition2,

						-vertexPosition1, -vertexPosition2, 0,
						-vertexPosition0, -vertexPosition0, vertexPosition0,
						-vertexPosition0, -vertexPosition0, -vertexPosition0,

						-vertexPosition0, -vertexPosition0, vertexPosition0,
						-vertexPosition2, 0, vertexPosition1,
						-vertexPosition0, -vertexPosition0, -vertexPosition0,

						-vertexPosition2, 0, vertexPosition1,
						-vertexPosition2, 0, -vertexPosition1,
						-vertexPosition0, -vertexPosition0, -vertexPosition0,

						0, vertexPosition1, -vertexPosition2,
						-vertexPosition0, vertexPosition0, -vertexPosition0,
						vertexPosition0, vertexPosition0, -vertexPosition0,

						-vertexPosition0, vertexPosition0, -vertexPosition0,
						-vertexPosition1, vertexPosition2, 0,
						vertexPosition0, vertexPosition0, -vertexPosition0,

						-vertexPosition1, vertexPosition2, 0,
						vertexPosition1, vertexPosition2, 0,
						vertexPosition0, vertexPosition0, -vertexPosition0,

						-vertexPosition2, 0, -vertexPosition1,
						-vertexPosition2, 0, vertexPosition1,
						-vertexPosition0, vertexPosition0, -vertexPosition0,

						-vertexPosition2, 0, vertexPosition1,
						-vertexPosition0, vertexPosition0, vertexPosition0,
						-vertexPosition0, vertexPosition0, -vertexPosition0,

						-vertexPosition0, vertexPosition0, vertexPosition0,
						-vertexPosition1, vertexPosition2, 0,
						-vertexPosition0, vertexPosition0, -vertexPosition0,

						-vertexPosition0, -vertexPosition0, vertexPosition0,
						0, -vertexPosition1, vertexPosition2,
						-vertexPosition2, 0, vertexPosition1,

						0, -vertexPosition1, vertexPosition2,
						0, vertexPosition1, vertexPosition2,
						-vertexPosition2, 0, vertexPosition1,

						0, vertexPosition1, vertexPosition2,
						-vertexPosition0, vertexPosition0, vertexPosition0,
						-vertexPosition2, 0, vertexPosition1,

						vertexPosition1, -vertexPosition2, 0,
						-vertexPosition1, -vertexPosition2, 0,
						vertexPosition0, -vertexPosition0, -vertexPosition0,

						-vertexPosition1, -vertexPosition2, 0,
						-vertexPosition0, -vertexPosition0, -vertexPosition0,
						vertexPosition0, -vertexPosition0, -vertexPosition0,

						-vertexPosition0, -vertexPosition0, -vertexPosition0,
						0, -vertexPosition1, -vertexPosition2,
						vertexPosition0, -vertexPosition0, -vertexPosition0,

						0, -vertexPosition1, vertexPosition2,
						vertexPosition0, -vertexPosition0, vertexPosition0,
						0, vertexPosition1, vertexPosition2,

						vertexPosition0, -vertexPosition0, vertexPosition0,
						vertexPosition2, 0, vertexPosition1,
						0, vertexPosition1, vertexPosition2,

						vertexPosition2, 0, vertexPosition1,
						vertexPosition0, vertexPosition0, vertexPosition0,
						0, vertexPosition1, vertexPosition2,

						vertexPosition0, -vertexPosition0, vertexPosition0,
						vertexPosition1, -vertexPosition2, 0,
						vertexPosition2, 0, vertexPosition1,

						vertexPosition1, -vertexPosition2, 0,
						vertexPosition0, -vertexPosition0, -vertexPosition0,
						vertexPosition2, 0, vertexPosition1,

						vertexPosition0, -vertexPosition0, -vertexPosition0,
						vertexPosition2, 0, -vertexPosition1,
						vertexPosition2, 0, vertexPosition1,

						-vertexPosition1, -vertexPosition2, 0,
						vertexPosition1, -vertexPosition2, 0,
						-vertexPosition0, -vertexPosition0, vertexPosition0,

						vertexPosition1, -vertexPosition2, 0,
						vertexPosition0, -vertexPosition0, vertexPosition0,
						-vertexPosition0, -vertexPosition0, vertexPosition0,

						vertexPosition0, -vertexPosition0, vertexPosition0,
						0, -vertexPosition1, vertexPosition2,
						-vertexPosition0, -vertexPosition0, vertexPosition0
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
						-vertexPosition1, 0, vertexPosition0,
						0, vertexPosition0, vertexPosition1,
						-vertexPosition0, vertexPosition1, 0,

						0, vertexPosition0, vertexPosition1,
						vertexPosition0, vertexPosition1, 0,
						-vertexPosition0, vertexPosition1, 0,

						vertexPosition0, vertexPosition1, 0,
						0, vertexPosition0, -vertexPosition1,
						-vertexPosition0, vertexPosition1, 0,

						0, vertexPosition0, -vertexPosition1,
						-vertexPosition1, 0, -vertexPosition0,
						-vertexPosition0, vertexPosition1, 0,

						-vertexPosition1, 0, -vertexPosition0,
						-vertexPosition1, 0, vertexPosition0,
						-vertexPosition0, vertexPosition1, 0,

						0, vertexPosition0, vertexPosition1,
						vertexPosition1, 0, vertexPosition0,
						vertexPosition0, vertexPosition1, 0,

						-vertexPosition1, 0, vertexPosition0,
						0, -vertexPosition0, vertexPosition1,
						0, vertexPosition0, vertexPosition1,

						-vertexPosition1, 0, -vertexPosition0,
						-vertexPosition0, -vertexPosition1, 0,
						-vertexPosition1, 0, vertexPosition0,

						0, vertexPosition0, -vertexPosition1,
						0, -vertexPosition0, -vertexPosition1,
						-vertexPosition1, 0, -vertexPosition0,

						vertexPosition0, vertexPosition1, 0,
						vertexPosition1, 0, -vertexPosition0,
						0, vertexPosition0, -vertexPosition1,

						vertexPosition1, 0, vertexPosition0,
						0, -vertexPosition0, vertexPosition1,
						vertexPosition0, -vertexPosition1, 0,

						0, -vertexPosition0, vertexPosition1,
						-vertexPosition0, -vertexPosition1, 0,
						vertexPosition0, -vertexPosition1, 0,

						-vertexPosition0, -vertexPosition1, 0,
						0, -vertexPosition0, -vertexPosition1,
						vertexPosition0, -vertexPosition1, 0,

						0, -vertexPosition0, -vertexPosition1,
						vertexPosition1, 0, -vertexPosition0,
						vertexPosition0, -vertexPosition1, 0,

						vertexPosition1, 0, -vertexPosition0,
						vertexPosition1, 0, vertexPosition0,
						vertexPosition0, -vertexPosition1, 0,

						vertexPosition1, 0, vertexPosition0,
						0, vertexPosition0, vertexPosition1,
						0, -vertexPosition0, vertexPosition1,

						0, -vertexPosition0, vertexPosition1,
						-vertexPosition1, 0, vertexPosition0,
						-vertexPosition0, -vertexPosition1, 0,

						-vertexPosition0, -vertexPosition1, 0,
						-vertexPosition1, 0, -vertexPosition0,
						0, -vertexPosition0, -vertexPosition1,

						0, -vertexPosition0, -vertexPosition1,
						0, vertexPosition0, -vertexPosition1,
						vertexPosition1, 0, -vertexPosition0,

						vertexPosition1, 0, -vertexPosition0,
						vertexPosition0, vertexPosition1, 0,
						vertexPosition1, 0, vertexPosition0
					]), 3)
				);

				break;
			}
		}

		const polyhedronsCenters = new Float32Array(coords.length * 3);

		coords.forEach((coordinate, i) =>
			fillInCoord(
				polyhedronsCenters,
				coordinate[0] ?? scaleCoordinate(coordinate[1], extent),
				i
			)
		);

		polyhedronGeometry.instanceCount = coords.length;

		polyhedronGeometry.setAttribute(
			'polyhedronCenter',
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
					attribute vec3 polyhedronCenter;

					varying vec3 vViewPosition;

					void main() {
						vec4 mvPosition = modelViewMatrix * vec4(position + polyhedronCenter, 1);

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
						ReflectedLight reflectedLight = ReflectedLight(vec3(0), vec3(0), vec3(0), vec3(0));

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

		// without this, the polyhedrons disappear when the zoom is big
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
			'polyhedronCenter',
			new InstancedBufferAttribute(polyhedronsCenters, 3)
		);

		const edges = new LineSegments(
			edgesGeometry,
			new ShaderMaterial({
				uniforms: {
					color: { value: edgeForm.color ?? [0, 0, 0] }
				},
				vertexShader: `
					attribute vec3 polyhedronCenter;

					void main() {
						gl_Position = projectionMatrix * modelViewMatrix * vec4(position + polyhedronCenter, 1);
					}
				`,
				fragmentShader: `
					uniform vec3 color;

					void main() {
						gl_FragColor = vec4(color, 1);
					}
				`
			})
		);

		// without this, the edges disappear when the zoom is big
		edges.frustumCulled = false;

		group.add(edges);

		return group;
	}
};

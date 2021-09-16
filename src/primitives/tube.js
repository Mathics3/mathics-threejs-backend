import {
	BufferAttribute,
	BufferGeometry,
	CatmullRomCurve3,
	Matrix4,
	Mesh,
	ShaderMaterial,
	SphereGeometry,
	TubeGeometry,
	UniformsLib,
	Vector3
} from '../../vendors/three.js';

import scaleCoordinate from '../scaleCoordinate.js';

// Modified from three.js' BufferGeometryUtils.
function mergeBufferAttributes(attributes) {
	let arrayLength = 0;

	for (let i = 0; i < attributes.length; ++i) {
		arrayLength += attributes[i].array.length;
	}

	const array = new attributes[0].array.constructor(arrayLength);

	for (let i = 0, offset = 0; i < attributes.length; ++i) {
		array.set(attributes[i].array, offset);

		offset += attributes[i].array.length;
	}

	return new BufferAttribute(array, 3);
}

// Modified from three.js' BufferGeometryUtils.
function mergeBufferGeometries(geometries) {
	const mergedIndex = [];
	const attributes = {};
	const mergedGeometry = new BufferGeometry();

	for (let i = 0, indexOffset = 0; i < geometries.length; ++i) {
		for (const name in geometries[i].attributes) {
			if (attributes[name] === undefined) attributes[name] = [];

			attributes[name].push(geometries[i].attributes[name]);
		}

		for (let j = 0; j < geometries[i].index.count; ++j) {
			mergedIndex.push(geometries[i].index.getX(j) + indexOffset);
		}

		indexOffset += geometries[i].attributes.position.count;
	}

	mergedGeometry.setIndex(mergedIndex);

	for (const name in attributes) {
		mergedGeometry.setAttribute(
			name,
			mergeBufferAttributes(attributes[name])
		);
	}

	return mergedGeometry;
}

// See https://reference.wolfram.com/language/ref/Tube.html
// for the high-level description of what is being rendered.
export default function ({ color, coords, opacity = 1, radius = 1 }, extent) {
	// TubeGeometry receives a Curve, but Mathics' Tube recives an array of coordinates, so we use CatmullRomCurve3 to convert the coordinates into a Curve.
	// Curve.getPoint receives a flot between 0 and 1, where 0 is the 1st coordinate and 1 is the last.
	const curve = new CatmullRomCurve3(
		// It isn't using getCoordinatesBuffer because CatmullRomCurve3 receives an array of Vector3s.
		coords.map((coordinate) => new Vector3(
			...(coordinate[0] ?? scaleCoordinate(coordinate[1], extent))
		))
	);

	const geometries = [
		new TubeGeometry(
			curve,
			64, // tubular segments
			radius,
			64 // radial segments
		),
		// 1st end cap
		new SphereGeometry(
			radius,
			48,
			48,
			0, // phi start
			Math.PI // phi end. 2π is a whole sphere, π is half sphere.
		)
			.applyMatrix4(
				new Matrix4()
					.setPosition(curve.getPoint(0))
					// Rotate the end cap, so it "continues" the tube.
					// If it don't be done, there'll be a half sphere floating by there and a hollow tube.
					.lookAt(
						curve.getPoint(0), // eye
						new Vector3(...(coords[1][0] ?? scaleCoordinate(coords[1][1], extent))), // target
						new Vector3(1, 0, 0) // up
					)
			),
		// 2nd end cap, almost the same as above
		new SphereGeometry(radius, 48, 48, 0, Math.PI)
			.applyMatrix4(
				new Matrix4()
					.setPosition(curve.getPoint(1))
					.lookAt(
						curve.getPoint(1),
						new Vector3(...(coords[coords.length - 2][0] ?? scaleCoordinate(coords[coords.length - 2][1], extent))),
						new Vector3(1, 0, 0)
					)
			)
	];

	return new Mesh(
		mergeBufferGeometries(geometries),
		new ShaderMaterial({
			lights: true,
			transparent: opacity !== 1,
			depthWrite: opacity === 1,
			uniforms: {
				...UniformsLib.lights,
				diffuse: { value: color },
				opacity: { value: opacity }
			},
			vertexShader: `
				varying vec3 vLightFront;
				varying vec3 vIndirectFront;

				#include <common>
				#include <bsdfs>
				#include <lights_pars_begin>

				void main() {
					vec4 mvPosition = modelViewMatrix * vec4(position, 1);

					gl_Position = projectionMatrix * mvPosition;

					vec3 transformedNormal = normalMatrix * normal;
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
						(vLightFront + vIndirectFront) * BRDF_Lambert(diffuse),
						opacity
					);
				}
			`
		})
	);
}

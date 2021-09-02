import {
	BoxGeometry,
	InstancedBufferAttribute,
	InstancedBufferGeometry,
	Mesh,
	ShaderMaterial,
	UniformsLib
} from '../../vendors/three.js';

import { get2PopulatedCoordinateBuffers } from '../bufferUtils.js';

// See https://reference.wolfram.com/language/ref/Cuboid
// for the high-level description of what is being rendered.
export default function ({ color, coords, edgeForm = {}, opacity = 1 }, extent) {
	// The edges of the cuboids are drawn in the fragment shader; doing this is faster than putting the edges in a different object.

	const [cuboidsBegin, cuboidsEnd] = get2PopulatedCoordinateBuffers(coords, extent);

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
						opacity
					);
				}
			`
		})
	);

	cuboids.frustumCulled = false;

	return cuboids;
};

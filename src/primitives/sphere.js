import {
	InstancedBufferAttribute,
	InstancedBufferGeometry,
	Mesh,
	ShaderMaterial,
	SphereGeometry,
	UniformsLib
} from '../../vendors/three.js';

import { getPopulatedCoordinateBuffer } from '../bufferUtils.js';

// See https://reference.wolfram.com/language/ref/Sphere
// for the high-level description of what is being rendered.
export default function ({ color, coords, opacity = 1, radius = 1 }, extent) {
	const sphereGeometry = new InstancedBufferGeometry().copy(
		new SphereGeometry(radius, 48, 48)
	);

	sphereGeometry.instanceCount = coords.length;

	// Set the spheres centers.
	sphereGeometry.setAttribute(
		'sphereCenter',
		new InstancedBufferAttribute(
			getPopulatedCoordinateBuffer(coords, extent),
			3
		)
	);

	const spheres = new Mesh(
		sphereGeometry,
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
				attribute vec3 sphereCenter;

				varying vec3 vLightFront;
				varying vec3 vIndirectFront;

				#include <common>
				#include <bsdfs>
				#include <lights_pars_begin>

				void main() {
					vec4 mvPosition = modelViewMatrix * vec4(position + sphereCenter, 1);

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

	spheres.frustumCulled = false;

	return spheres;
}

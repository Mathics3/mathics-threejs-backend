// @ts-check

// Unlike the primitives, all lights are in the same file.
// Each light function takes 2 parameters and returns a three.js object.
// The 1st parameter is the light object (an element of the lighting array)
// and the 2nd parameter is the extent, it's used in some lights to calculate
// the light's position.

import { Vector3 } from '../vendors/three.js';

import { scaleCoordinate } from './coordinateUtils.js';

// Each light function takes 3 parameters and returns a three.js
// object.

// The 1st parameter is the light object (an element of
// the lighting array).

// The 2nd parameter is the uniforms buffer, read the comments from
// src/uniforms.js for more information.

// The 3rd parameter is the extent, it is used in e.g. scaleCoordinate.

/** @typedef {import('./coordinateUtils.js').Coordinate} Coordinate */

/** @typedef {'ambient' | 'directional' | 'point' | 'spot'} LightType */

/** @type {{ [key in LightType]: Function }} */
export default {
	/**
	 * See {@link https://mathics3.github.io/mathics-threejs-backend/lights/ambient}
	 * for the high-level description of what is being rendered.
	 * @param {{ color: [number, number, number] }} light
	 * @param {import('./uniforms.js').UniformsBuffer} uniforms
	 */
	ambient: ({ color = [1, 1, 1] }, uniforms) => {
		uniforms.ambientLightColor.value[0] += color[0];
		uniforms.ambientLightColor.value[1] += color[1];
		uniforms.ambientLightColor.value[2] += color[2];
	},
	/**
	 * See {@link https://mathics3.github.io/mathics-threejs-backend/lights/directional}
	 * for the high-level description of what is being rendered.
	 * @param {{
	 *     color: [number, number, number],
	 *     coords: [Coordinate, null] | [null, Coordinate]
	 * }} light
	 * @param {import('./uniforms.js').UniformsBuffer} uniforms
	 * @param {import('./extent.js').Extent} extent
	 */
	directional: ({ color = [1, 1, 1], coords }, uniforms, extent) => {
		const direction = new Vector3(
			...(coords[0] ?? scaleCoordinate(coords[1], extent))
		).sub(new Vector3(
			(extent.xmax + extent.xmin) / 2,
			(extent.ymax + extent.ymin) / 2,
			(extent.zmax + extent.zmin) / 2
		)).normalize();

		uniforms.directionalLights.value.push({
			color,
			direction
		});
	},
	/**
	 * See {@link https://mathics3.github.io/mathics-threejs-backend/lights/point}
	 * for the high-level description of what is being rendered.
	 * @param {{
	 *     color: [number, number, number],
	 *     coords: [Coordinate, null] | [null, Coordinate]
	 * }} light
	 * @param {import('./uniforms.js').UniformsBuffer} uniforms
	 * @param {import('./extent.js').Extent} extent
	 */
	point: ({ color = [1, 1, 1], coords }, uniforms, extent) => {
		uniforms.pointLights.value.push({
			color,
			basePosition: new Vector3(...coords[0] ?? scaleCoordinate(coords[1], extent))
		});
	},
	/**
	 * See {@link https://mathics3.github.io/mathics-threejs-backend/lights/spot}
	 * for the high-level description of what is being rendered.
	 * The default angle is π/2.
	 * @param {{
	 *     angle: number,
	 *     color: [number, number, number],
	 *     coords: [Coordinate, null] | [null, Coordinate],
	 *     target: [Coordinate, null] | [null, Coordinate]
	 * }} light
	 * @param {import('./uniforms.js').UniformsBuffer} uniforms
	 * @param {import('./extent.js').Extent} extent
	 */
	spot: ({ angle = 1.57079632679, color = [1, 1, 1], coords, target }, uniforms, extent) => {
		const basePosition = new Vector3(
			...(coords[0] ?? scaleCoordinate(coords[1], extent))
		);

		const baseDirection = basePosition.clone().sub(new Vector3(
			...(target[0] ?? scaleCoordinate(target[1], extent))
		)).normalize();

		uniforms.spotLights.value.push({
			color,
			baseDirection,
			basePosition,
			coneCos: Math.cos(angle)
		});
	}
};

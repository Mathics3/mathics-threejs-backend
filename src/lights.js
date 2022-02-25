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

export default {
	// See https://mathics3.github.io/mathics-threejs-backend/lights/ambient
	// for the high-level description of what is being rendered.
	ambient: ({ color = [1, 1, 1] }, lights) => {
		lights.ambientLightColor.value[0] += color[0];
		lights.ambientLightColor.value[1] += color[1];
		lights.ambientLightColor.value[2] += color[2];
	},
	// See https://mathics3.github.io/mathics-threejs-backend/lights/directional
	// for the high-level description of what is being rendered.
	directional: ({ color = [1, 1, 1], coords }, lights, extent) => {
		const direction = new Vector3(
			...(coords[0] ?? scaleCoordinate(coords[1], extent))
		).sub(new Vector3(
			(extent.xmax + extent.xmin) / 2,
			(extent.ymax + extent.ymin) / 2,
			(extent.zmax + extent.zmin) / 2
		)).normalize();

		lights.directionalLights.value.push({
			color,
			direction
		});
	},
	// See https://mathics3.github.io/mathics-threejs-backend/lights/point
	// for the high-level description of what is being rendered.
	point: ({ color = [1, 1, 1], coords }, lights, extent) => {
		lights.pointLights.value.push({
			color,
			basePosition: new Vector3(...coords[0] ?? scaleCoordinate(coords[1], extent))
		});
	},
	// See https://mathics3.github.io/mathics-threejs-backend/lights/spot
	// for the high-level description of what is being rendered.
	// The default angle is π/2.
	spot: ({ angle = 1.57079632679, color = [1, 1, 1], coords, target }, lights, extent) => {
		const basePosition = new Vector3(
			...(coords[0] ?? scaleCoordinate(coords[1], extent))
		);

		const baseDirection = basePosition.clone().sub(new Vector3(
			...(target[0] ?? scaleCoordinate(target[1], extent))
		)).normalize();

		lights.spotLights.value.push({
			color,
			baseDirection,
			basePosition,
			coneCos: Math.cos(angle)
		});
	}
};

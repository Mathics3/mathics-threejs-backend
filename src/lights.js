// Unlike the primitives, all lights are in the same file.
// Each light function takes 2 parameters and returns a three.js object.
// The 1st parameter is the light object (an element of the lighting array)
// and the 2nd parameter is the extent, it's used in some lights to calculate
// the light's position.

import { Vector3 } from '../vendors/three.js';

import { scaleCoordinate } from './coordinateUtils.js';

export default {
	ambient: ({ color = [1, 1, 1] }, lights) => {
		lights.ambientLightColor.value[0] += color[0];
		lights.ambientLightColor.value[1] += color[1];
		lights.ambientLightColor.value[2] += color[2];
	},
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
	point: ({ color = [1, 1, 1], coords }, lights, extent) => {
		lights.pointLights.value.push({
			color,
			basePosition: new Vector3(...coords[0] ?? scaleCoordinate(coords[1], extent))
		});
	},
	// The default angle is π/2.
	// See https://mathics3.github.io/mathics-threejs-backend/lights/spot
	// for a more details.
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

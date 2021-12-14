import {
	AmbientLight,
	Color,
	DirectionalLight,
	Group,
	PointLight,
	SpotLight,
	Vector3
} from '../vendors/three.js';

import scaleCoordinate from './scaleCoordinate.js';

export function getInitialLightPosition(coordinate, radius, extent) {
	// initial light position in spherical polar coordinates
	const temporaryPosition = new Vector3(
		...(coordinate[0] ?? scaleCoordinate(coordinate[1], extent))
	);

	const result = {
		radius: radius * temporaryPosition.length(),
		phi: 0,
		theta: 0
	};

	if (temporaryPosition.length() !== 0) {
		// This code is here to avoid 0/0 division.
		result.phi = Math.atan2(temporaryPosition.y, temporaryPosition.x) % (2 * Math.PI);
		result.theta = Math.asin(temporaryPosition.z / result.radius);
	}

	return result;
}

export function positionLights(lights, theta, phi, focus) {
	lights.forEach((light) =>
		light.position.set(
			light.radius * Math.sin(theta + light.theta) * Math.cos(phi + light.phi) + focus.x,
			light.radius * Math.sin(theta + light.theta) * Math.sin(phi + light.phi) + focus.y,
			light.radius * Math.cos(theta + light.theta) + focus.z
		)
	);
}

export default {
	ambient: ({ color }) => {
		return new AmbientLight(new Color(...color).getHex());
	},
	directional: ({ color }) => {
		return new DirectionalLight(new Color(...color).getHex());
	},
	spot: ({ angle = 1.57079632679, color, coords, target }, extent) => {
		const light = new SpotLight(new Color(...color).getHex());

		light.position.set(
			...(coords[0] ?? scaleCoordinate(coords[1], extent))
		);

		light.angle = angle;

		light.target.position.set(
			...(target[0] ?? scaleCoordinate(target[1], extent))
		);

		const group = new Group();

		group.add(light);
		// We need to add the target to the scene so the its matrixWorld is updated in every camera move.
		group.add(light.target);

		return group;
	},
	point: ({ color, coords }, extent) => {
		const light = new PointLight(new Color(...color).getHex());

		light.position.set(
			...(coords[0] ?? scaleCoordinate(coords[1], extent))
		);

		return light;
	}
};

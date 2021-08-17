import {
	AmbientLight,
	Color,
	DirectionalLight,
	Group,
	Mesh,
	PointLight,
	ShaderMaterial,
	SphereGeometry,
	SpotLight
} from '../vendors/three.js';

import scaleCoordinate from './scaleCoordinate.js';

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

		light.target.updateMatrixWorld();

		return light;
	},
	point: ({ color, coords }, extent) => {
		const light = new PointLight(new Color(...color).getHex());

		light.position.set(
			...(coords[0] ?? scaleCoordinate(coords[1], extent))
		);

		return light;
	}
};

import {
	AmbientLight,
	Color,
	DirectionalLight,
	Group,
	Mesh,
	MeshBasicMaterial,
	PointLight,
	SphereGeometry,
	SpotLight
} from '../vendors/three.js';

import scaleCoordinate from './scaleCoordinate.js';

export default {
	ambient: ({ color }) => {
		return new AmbientLight(new Color(...color).getHex());
	},
	directional: ({ color }) => {
		return new DirectionalLight(new Color(...color).getHex(), 1);
	},
	spot: ({ angle, color, coords, target }, extent) => {
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
	point: ({ color, coords }, extent, radius) => {
		const group = new Group();

		const colorHex = new Color(...color).getHex();

		const light = new PointLight(colorHex);
		light.position.set(
			...(coords[0] ?? scaleCoordinate(coords[1], extent))
		);
		group.add(light);

		// add visible light sphere
		const lightSphere = new Mesh(
			new SphereGeometry(0.007 * radius, 16, 8),
			new MeshBasicMaterial({ color: colorHex })
		);
		lightSphere.position.copy(light.position);

		group.add(lightSphere);

		return group;
	}
};

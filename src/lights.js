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
} from '../vendors/threejs/three.min.js';

export default {
	Ambient: ({ color }) => {
		return new AmbientLight(new Color(...color).getHex());
	},
	Directional: ({ color }) => {
		return new DirectionalLight(new Color(...color).getHex(), 1);
	},
	Spot: ({ angle, color, coords, target }) => {
		const group = new Group();

		const light = new SpotLight(new Color(...color).getHex());
		light.position.set(...coords[0]);
		light.angle = angle;
		group.add(light);

		light.target.position.set(...target[0]);
		group.add(light.target);

		return group;
	},
	Point: ({ color, coords }, radius) => {
		const group = new Group();

		const colorHex = new Color(...color).getHex();

		const light = new PointLight(colorHex);
		light.position.set(...coords[0]);
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

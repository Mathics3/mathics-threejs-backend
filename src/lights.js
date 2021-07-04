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
	Ambient: ({ RGBAColor }) => {
		return new AmbientLight(new Color(...RGBAColor).getHex());
	},
	Directional: ({ RGBAColor }) => {
		return new DirectionalLight(new Color(...RGBAColor).getHex(), 1);
	},
	Spot: ({ Angle, Coords, RGBAColor, Target }) => {
		const group = new Group();

		const light = new SpotLight(new Color(...RGBAColor).getHex());
		light.position.set(...Coords[0]);
		light.angle = Angle;
		group.add(light);

		light.target.position.set(...Target[0]);
		group.add(light.target);

		return group;
	},
	Point: ({ Coords, RGBAColor }, radius) => {
		const group = new Group();

		const color = new Color(...RGBAColor).getHex();

		const light = new PointLight(color);
		light.position.set(...Coords[0]);
		group.add(light);

		// add visible light sphere
		const lightSphere = new Mesh(
			new SphereGeometry(0.007 * radius, 16, 8),
			new MeshBasicMaterial({ color })
		);
		lightSphere.position.copy(light.position);

		group.add(lightSphere);

		return group;
	}
};

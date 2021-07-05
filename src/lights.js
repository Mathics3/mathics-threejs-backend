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
	Ambient: ({ RGBColor }) => {
		return new AmbientLight(new Color(...RGBColor).getHex());
	},
	Directional: ({ RGBColor }) => {
		return new DirectionalLight(new Color(...RGBColor).getHex(), 1);
	},
	Spot: ({ Angle, Coords, RGBColor, Target }) => {
		const light = new SpotLight(new Color(...RGBColor).getHex());
		light.position.set(...Coords[0]);
		light.angle = Angle;

		light.target.position.set(...Target[0]);
		light.target.updateMatrixWorld();

		return light;
	},
	Point: ({ Coords, RGBColor }, radius) => {
		const group = new Group();

		const color = new Color(...RGBColor).getHex();

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

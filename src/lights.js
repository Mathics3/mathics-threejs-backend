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
		return new DirectionalLight(new Color(...color).getHex(), 1);
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
	point: ({ color, coords }, extent, radius) => {
		const group = new Group();

		const light = new PointLight(new Color(...color).getHex());
		light.position.set(
			...(coords[0] ?? scaleCoordinate(coords[1], extent))
		);
		group.add(light);

		// add visible light sphere
		const lightSphere = new Mesh(
			new SphereGeometry(0.007 * radius, 16, 8),
			new ShaderMaterial({
				uniforms: {
					color: { value: color }
				},
				vertexShader: `
					void main() {
						gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
					}
				`,
				fragmentShader: `
					uniform vec3 color;

					void main() {
						gl_FragColor = vec4(color, 1.0);
					}
				`
			})
		);
		lightSphere.position.copy(light.position);

		group.add(lightSphere);

		return group;
	}
};

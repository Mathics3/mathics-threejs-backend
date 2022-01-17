// TODO: convert it to a real uniforms buffer
export function getUniformsBuffer() {
	return {
		ambientLightColor: { value: [0, 0, 0] },
		directionalLights: {
			value: [],
			properties: {
				color: {},     // vec3
				direction: {}  // vec3
			}
		},
		pointLights: {
			value: [],
			properties: {
				color: {},   // vec3
				position: {} // vec3
			}
		},
		spotLights: {
			value: [],
			properties: {
				color: {},     // vec3
				coneCos: {},   // float
				direction: {}, // vec3
				position: {}   // vec3
			}
		}
	};
}

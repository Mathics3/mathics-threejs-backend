// @ts-check

/**
 * @typedef {{
 *     ambientLightColor: { value: [number, number, number] }
 *     directionalLights: { value: {
 *         color: [number, number, number],
 *         direction: import('../vendors/three.js').Vector3
 *     }[] },
 *     pointLights: { value: {
 *         color: [number, number, number],
 *         basePosition: import('../vendors/three.js').Vector3,
 *         position?: import('../vendors/three.js').Vector3
 *     }[] },
 *     spotLights: { value: {
 *         color: [number, number, number],
 *         baseDirection: import('../vendors/three.js').Vector3,
 *         basePosition: import('../vendors/three.js').Vector3,
 *         coneCos: number,
 *         direction?: import('../vendors/three.js').Vector3,
 *         position?: import('../vendors/three.js').Vector3
 *     }[] }
 * }} UniformsBuffer
 */

/**
 * Factory method for uniforms buffer.
 * @todo convert this to a real uniforms buffer.
 * @returns {UniformsBuffer}
 */
export function getUniformsBuffer() {
	return {
		ambientLightColor: { value: [0, 0, 0] },
		directionalLights: { value: [] },
		pointLights: { value: [] },
		spotLights: { value: [] }
	};
}

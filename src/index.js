import drawGraphics3d from './graphics3d.js';

// it'll be removed on Mathics Core update
function translationLayer(div, object) {
	object.elements.forEach((primitive) => {
		if (primitive.faceColor) {
			primitive.color = primitive.faceColor;
		}
	});

	object.lighting.forEach((light) => {
		if (light.position) {
			light.coords = [light.position];
		}

		light.type = light.type.toLowerCase();
	});

	return drawGraphics3d(div, object);
}

window.drawGraphics3d = translationLayer;

export default translationLayer;

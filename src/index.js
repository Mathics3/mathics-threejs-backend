import drawGraphics3d from './graphics3d.js';

function translationLayer(div, object) {
	if (object.protocol) {
		// protocol version is X.Y, so it is an array of two elements: major version and minor version
		const versionArray = object.protocol.match(/\d/g);

		if (versionArray[0] != 1) {
			container.style.color = 'red';
			container.innerText = `The major version of mathics-threejs-backend is 1, but it was expected to be ${majorVerion}.`;

			return;
		}

		if (versionArray[1] < 0) {
			container.style.color = 'red';
			container.innerText = `The minor version of mathics-threejs-backend is 0, but it was expected to be ${minorVerion}.`;

			return;
		}
	}

	object.elements.forEach((primitive) => {
		if (primitive.faceColor) {
			primitive.color = primitive.faceColor;
		}

		primitive.color = primitive.color.slice(0, 3);
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

export default drawGraphics3d;

import drawGraphics3d from './graphics3d.js';

function translationLayer(container, object, maxSize, innerWidthMultiplier) {
	if (object.protocol) {
		// protocol version is X.Y, so it is an array of two elements: major version and minor version
		const versionArray = object.protocol.match(/\d/g);

		if (parseInt(versionArray[0]) !== 1) {
			const warning = document.createElement('p');

			warning.style.color = 'yellow';
			warning.innerText = `The major revision version of mathics-threejs-backend is 1, but it was expected to be ${versionArray[0]}. Trying to draw the graphics.`;

			container.appendChild(warning);
		} else if (parseInt(versionArray[1]) > 2) {
			const warning = document.createElement('p');

			warning.style.color = 'yellow';
			warning.innerText = `The minor revision version of mathics-threejs-backend is 1, but it was expected to be at least ${versionArray[1]}. Trying to draw the graphics.`;

			container.appendChild(warning);
		}
	}

	object.elements?.forEach((primitive) => {
		if (primitive.faceColor) {
			primitive.color = primitive.faceColor;
		}

		primitive.color = primitive.color.slice(0, 3);
	});

	object.lighting?.forEach((light) => {
		if (light.position) {
			light.coords = [light.position];
		}

		light.type = light.type.toLowerCase();
	});

	container.style.maxWidth = maxSize + 'px';
	container.style.width = (100 * innerWidthMultiplier) + 'vw';
	container.style.maxHeight = maxSize + 'px';
	container.style.width = 100 * innerWidthMultiplier + 'vw';

	console.log(container.style);

	return drawGraphics3d(container, object);
}

window.drawGraphics3d = translationLayer;

export default drawGraphics3d;

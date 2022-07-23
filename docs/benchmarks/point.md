<style>
	input,
	button,
	main,
	p,
	label {
		display: block;
		margin: 0 auto;
		text-align: center;
	}

	input {
		width: 100%;
	}

	#time {
		margin-bottom: 20px;
	}
</style>

<div id="container">
	<label for="grid-size">Size of the grid:</label>
	<input type="number" id="grid-size" placeholder="100" value="100" />
	<button id="run-test">Run the test</button>
</div>

<div id="time-container"></div>

<script>
	document.getElementById('run-test').addEventListener('click', () => {
		document.querySelector('main')?.remove();
		document.getElementById('container').appendChild(document.createElement('main'));

		const gridSize = document.getElementById('grid-size').value;

		const coords = new Array(gridSize ** 3);

		for (let i = 0; i < gridSize; i++) {
			for (let j = 0; j < gridSize; j++) {
				for (let k = 0; k < gridSize; k++) {
					coords[i * gridSize ** 2 + j * gridSize + k] = [[i, j, k]];
				}
			}
		}

		const startTime = performance.now();

		drawGraphics3d(
			document.querySelector('main'),
			{
				elements: [
					{
						type: 'point',
						color: [0, 0, 0],
						coords,
						pointSize: 0.01
					}
				],
				viewpoint: [2, -4, 4]
			},
			200
		);

		const duration = performance.now() - startTime;

		let timeElement = document.getElementById('time');

		if (!timeElement) {
			timeElement = document.createElement('p');
			timeElement.id = 'time';
			document.getElementById('time-container').appendChild(timeElement);
		}

		timeElement.innerText = `Time taken to draw ${gridSize ** 3} points: ${duration / 1000} seconds`;
	});
</script>

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
	<input type="number" id="grid-size" placeholder="30" value="30" />
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
					coords[2 * i * gridSize ** 2 + 2 * j * gridSize + 2 * k] = [[i, j, k]];
					coords[2 * i * gridSize ** 2 + 2 * j * gridSize + 2 * k + 1] = [[i + 0.5, j + 0.5, k + 0.5]];
				}
			}
		}

		const startTime = performance.now();

		drawGraphics3d(
			document.querySelector('main'),
			{
				elements: [
					{
						type: 'cuboid',
						color: [1, 1, 1],
						coords,
						edgeForm: { showEdges: false }
					}
				],
				lighting: [
					{
						type: 'spot',
						angle: 1,
						color: [1, 0, 0],
						coords: [null, [1, 1, 1]],
						target: [null, [0.5, 0.5, 0.5]]
					},
					{
						type: 'spot',
						angle: 1,
						color: [0, 1, 0],
						coords: [null, [0, 0, 0]],
						target: [null, [0.5, 0.5, 0.5]]
					},
					{
						type: 'spot',
						angle: 1,
						color: [0, 0, 1],
						coords: [null, [0, 1, 1]],
						target: [null, [0.5, 0.5, 0.5]]
					}
				],
				viewpoint: [2, 2, 2]
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

		timeElement.innerText = `Time taken to draw ${gridSize ** 3} cuboids: ${duration / 1000} seconds`;
	});
</script>

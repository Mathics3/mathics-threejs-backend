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
	<label for="elements-number">Number of points:</label>
	<input type="number" id="elements-number" placeholder="10000" value="10000" />
	<button id="run-test">Run the test</button>
</div>

<div id="time-container"></div>

<script>
	document.getElementById('run-test').addEventListener('click', () => {
		document.querySelector('main')?.remove();
		document.getElementById('container').appendChild(document.createElement('main'));

		const numberOfPoints = Math.floor(document.getElementById('elements-number').value / 10) * 10;

		const coords = new Array(numberOfPoints);

		for (let i = 0; i < numberOfPoints / 7; i++) {
			coords[i * 10] = [[0, 0, 0]];
			coords[i * 10 + 1] = [[0, 0, i * 1024]];
			coords[i * 10 + 2] = [[1, 1, i * 1024]];
			coords[i * 10 + 3] = [[0, i * 1024, 0]];
			coords[i * 10 + 4] = [[1, i * 1024, 1]];
			coords[i * 10 + 5] = [[i * 1024, 0, 0]];
			coords[i * 10 + 6] = [[i * 1024, 1, 1]];
			coords[i * 10 + 7] = [[i * 1024, 0, i * 1024]];
			coords[i * 10 + 8] = [[i * 1024, i * 1024, 0]];
			coords[i * 10 + 9] = [[i * 1024, i * 1024, i * 1024]];
		}

		const startTime = performance.now();

		drawGraphics3d(
			document.querySelector('main'),
			{
				elements: [
					{
						type: 'line',
						color: [0, 0, 0],
						coords
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

		timeElement.innerText = `Time taken to draw a line crossing ${numberOfPoints} points: ${duration / 1000} seconds`;
	});
</script>

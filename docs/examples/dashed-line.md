<div class='center' id='graphics-container'></div>

<script>
	drawGraphics3d(
		document.getElementById('graphics-container'),
		{
			elements: [
				{
					type: 'line',
					dashed: true,
					gapSize: 20,
					color: [1, 0, 1],
					coords: [
						[[0, 0, 0]],
						[[1, 1, 1]],
						[[0, 1, 1]],
						[[1, 0, 0]],
						[[1, 1, 0]],
						[[0, 0, 1]],
						[[0, 1, 1]],
						[[1, 0, 0]],
					]
				}
			],
			viewpoint: [2, -4, 4]
		}
	);
</script>

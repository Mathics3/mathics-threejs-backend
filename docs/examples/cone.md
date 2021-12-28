<div class='center' id='graphics-container'></div>

<script>
	drawGraphics3d(
		document.getElementById('graphics-container'),
		{
			elements: [
				{
					type: 'cone',
					color: [1, 1, 1],
					coords: [
						[[0, 0, 0]],
						[[1, 1, 1]]
					],
					edgeForm: { showEdges: false }
				}
			],
			lighting: [
				{
					type: 'spot',
					color: [1, 0, 1],
					coords: [null, [1, 0, 0]],
					target: [[0, 0, 0]]
				}
			],
			viewpoint: [2, -2, 2]
		}
	);
</script>

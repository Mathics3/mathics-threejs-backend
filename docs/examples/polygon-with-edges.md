<div class='center' id='graphics-container'></div>

<script>
	drawGraphics3d(
		document.getElementById('graphics-container'),
		{
			elements: [
				{
					type: 'polygon',
					color: [0, 0.5, 0.5],
					coords: [
						[[0, 0, 0]],
						[[0, 1, 1]],
						[[1, 1, 1]],
						[[1, 0, 1]]
					],
					opacity: 0.1,
					edgeForm: {
						showEdges: true,
						color: [0, 0, 0]
					}
				}
			],
			lighting: [
				{
					type: 'ambient',
					color: [0.5, 0.5, 0.5]
				},
				{
					type: 'directional',
					color: [1, 1, 1],
					coords: [null, [1, 1, 1]]
				}
			],
			viewpoint: [2, -4, 4]
		}
	);
</script>

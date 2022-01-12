<div class='center' id='graphics-container'></div>

<script>
	drawGraphics3d(
		document.getElementById('graphics-container'),
		{
			elements: [
				{
					type: 'sphere',
					color: [1, 1, 1],
					radius: 1,
					coords: [[[0, 0, 0]]]
				}
			],
			lighting: [
				{
					type: 'directional',
					color: [1, 1, 1],
					coords: [[2, 2, 2]]
				}
			],
			viewpoint: [1.3, -2.4, 2]
		}
	);
</script>

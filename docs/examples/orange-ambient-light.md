<div class='center' id='graphics-container'></div>

<script>
	drawGraphics3d(
		document.getElementById('graphics-container'),
		{
			elements: [
				{
					type: 'sphere',
					color: [1, 1, 1],
					coords: [
						[[0, 0, 0]]
					],
					radius: 1
				}
			],
			lighting: [
				{
					type: 'ambient',
					color: [1, 0.5, 0] // add orange light to the scene
				}
			],
			viewpoint: [1.3, -2.4, 2]
		}
	);
</script>

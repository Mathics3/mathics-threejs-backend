This polygon should have shadows in its upper side.
It doesn't have because we are setting custom vertex normals.

<div class='center' id='graphics-container'></div>

<script>
	drawGraphics3d(
		document.getElementById('graphics-container'),
		{
			elements: [
				{
					type: 'polygon',
					color: [1, 1, 1],
					coords: [
						[[0, 0, 0]],
						[[1, 1, 1]],
						[[0, 1, 1]]
					],
					vertexNormals: [
						[1, -1, 1],
						[1, -1, 1],
						[1, -1, 1]
					]
				}
			],
			lighting: [
				{
					type: 'point',
					color: [1, 1, 1],
					coords: [[1, 0, 1]]
				}
			],
			viewpoint: [2, -4, 4]
		}
	);
</script>

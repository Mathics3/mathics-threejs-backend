Properties:
- `color` (type: [color](/mathics-threejs-backend/types/color))
- `coords` (type: [coord[]](/mathics-threejs-backend/types/coord)) — array of line-segment coordinates
- `dashed` (type: bool) — whether the line is dashed, default: `false`
- `gapSize` (type: number) — the size of the gaps in pixels, default: `10`
- `opacity` (type: number) — default: `1`

Draw a line from the first coordinate to the last one.

## Examples
- ```json
  {
      "type": "line",
      "color": [1, 1, 0],
      "coords": [
          [[0, 0, 0]],
          [[1, 1, 1]]
      ]
  }
  ```
  <div class='center' id='graphics-container-1'></div>
  <script>
  	drawGraphics3d(
  		document.getElementById('graphics-container-1'),
  		{
  			elements: [
  				{
  					type: 'line',
  					color: [1, 1, 0],
  					coords: [
  						[[0, 0, 0]],
  						[[1, 1, 1]]
  					]
  				}
  			],
  			viewpoint: [2, -4, 4]
  		}
  	);
  </script>
- ```json
  {
      "type": "line",
      "color": [1, 1, 0],
      "coords": [
          [[0, 0, 0]],
          [[1, 1, 1]]
      ],
	  "dashed": true
  }
  ```
  <div class='center' id='graphics-container-2'></div>
  <script>
  	drawGraphics3d(
  		document.getElementById('graphics-container-2'),
  		{
  			elements: [
  				{
  					type: 'line',
  					color: [1, 1, 0],
  					coords: [
  						[[0, 0, 0]],
  						[[1, 1, 1]]
  					],
  					dashed: true
  				}
  			],
  			viewpoint: [2, -4, 4]
  		}
  	);
  </script>

## Notes
-  Differently from WL's Line, our lines aren't affected by lightning and therefore don't have VertexNormals.

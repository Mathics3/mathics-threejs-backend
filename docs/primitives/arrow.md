Properties:
- `color` (type: [color](/mathics-threejs-backend/types/color))
- `coords` (type: [coord[]](/mathics-threejs-backend/types/coord)) — array of arrow line-segment coordinates
- `opacity` (type: number) — default: `1`

Draw an arrow with line segments from the first coordinate to the last one. The arrow's head ends on the last coordinate.

## Examples
- ```jsonc
  {
      "type": "arrow",
      "color": [1, 0, 0],
      "coords": [
          [[0, 0, 0]],
          [[1, 0, 0]],
          [[1, 1, 0]],
          [[1, 1, 1]]
      ],
      "opacity": 0.5, // 50% of opacity
  }
  ```
  <div class='center' id='graphics-container'></div>
  <script>
  	drawGraphics3d(
  		document.getElementById('graphics-container'),
  		{
  			elements: [
  				{
  					type: 'arrow',
  					color: [1, 0, 0],
  					coords: [
  						[[0, 0, 0]],
  						[[1, 0, 0]],
  						[[1, 1, 0]],
  						[[1, 1, 1]]
  					],
  					opacity: 0.5, // 50% of opacity
  				}
  			],
  			viewpoint: [2, -4, 4]
  		}
  	);
  </script>

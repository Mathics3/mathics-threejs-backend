Properties:
- `angle` (type: number) —  the maximum angle in radians of light dispersion (upper bound is pi/2), default: pi/2
- `color` (type: [color](/mathics-threejs-backend/types/color))
- `coords` (type: [coord](/mathics-threejs-backend/types/coord))
- `target` (type: [coord](/mathics-threejs-backend/types/coord))

Add a spotlight to the scene.

## Examples
- ```json
  {
      "type": "spot",
      "color": [1, 1, 0],
      "coords": [[2, 2, 2]],
      "target": [[0, 0, 0]]
  }
  ```
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
  					type: 'spot',
  					color: [1, 1, 0],
  					coords: [[2, 2, 2]],
  					target: [[0, 0, 0]]
  				}
  			],
  			viewpoint: [1.3, -2.4, 2]
  		}
  	);
  </script>

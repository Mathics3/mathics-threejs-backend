Properties:
- `color` (type: [color](documentation/types/color))
- `coords` (type: [coord[]](documentation/types/coord)) — array of the cuboids' begins and ends
- `edgeForm` (type: object) — default: `{}`, object with the following properties:
  - `color` (type: [color](documentation/types/color)) — edges' color, default: `[0, 0, 0]` (black edges)
  - `showEdges` (type: bool) — default: `true`
- `opacity` (type: number) — default: `1`

Draw cubes/parallelepipeds from the even-numbered positions to the odd ones.

## Examples
- ```jsonc
  {
      "type": "cuboid",
      "color": [1, 1, 1],
      "coords": [
          [[-1, -1, -1]], // cube begin
          [[0, 0, 0]],    // cube end
          [[0, 0, 0]],    // parallelepiped begin
          [[1, 2, 1]]     // parallelepiped end
      ],
      "edgeForm": { "showEdges": false }
  }
  ```
  <div class='center' id='graphics-container-1'></div>
  <script>
  	drawGraphics3d(
  		document.getElementById('graphics-container-1'),
  		{
  			elements: [
  				{
  					type: 'cuboid',
  					color: [1, 1, 1],
  					coords: [
  						[[-1, -1, -1]], // cube begin
  						[[0, 0, 0]],    // cube end
  						[[0, 0, 0]],    // parallelepiped begin
  						[[1, 2, 1]]     // parallelepiped end
  					],
  					edgeForm: { showEdges: false }
  				}
  			],
  			lighting: [
  				{
  					type: 'directional',
  					color: [1, 1, 1],
  					coords: [[1, 1, 1]]
  				}
  			],
  			viewpoint: [2, -4, 4]
  		}
  	);
  </script>
- ```jsonc
  {
      "type": "cuboid",
      "color": [0.25, 0, 0],       // dark red
      "coords": [
          [null, [0, 0, 0]],       // lower-left-front corner of the bounding box
          [null, [0.5, 0.5, 0.5]], // center of the bounding box
      ],
      "edgeForm": {
          "color": [0, 0, 1]       // blue
      },
      "opacity": 0.9               // 90% of opacity
  }
  ```
  <div class='center' id='graphics-container'></div>
  <script>
  	drawGraphics3d(
  		document.getElementById('graphics-container'),
  		{
  			elements: [
  				{
  					type: 'cuboid',
  					color: [0.25, 0, 0], // dark red
  					coords: [
  						[null, [0, 0, 0]], // lower-left-front corner of the bounding box
  						[null, [0.5, 0.5, 0.5]], // center of the bounding box
  					],
  					edgeForm: {
  						color: [0, 0, 1] // blue
  					},
  					opacity: 0.9 // 90% of opacity
  				}
  			],
  			lighting: [
  				{
  					type: 'directional',
  					color: [1, 1, 1],
  					coords: [[1, 1, 1]]
  				}
  			],
  			viewpoint: [2, -4, 4]
  		}
  	);
  </script>

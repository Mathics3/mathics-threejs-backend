Properties:
- `color` (type: [color](/mathics-threejs-backend/types/color))
- `coords` (type: [coord[]](/mathics-threejs-backend/types/coord)) — array of ordered points tracing the boundary of the polygon
- `edgeForm` (type: object) — default: `{}`, object with the following properties:
  - `color` (type: [color](/mathics-threejs-backend/types/color)) — edges' color, default: `[0, 0, 0]` (black edges)
  - `showEdges` (type: bool) — default: `true`
- `opacity` (type: number) — default: `1`
- `vertexNormals` (type: number[3][]) — this is not commonly used. This changes the way the polygon reflects the light. If this is smaller than the number of total vertexNormals of the polygon, the other vertexNormals are going to be calculated in the shader. See [vertex normal in Wikipedia](https://en.wikipedia.org/wiki/Vertex_normal). Default: `[]`

Draw a polygon with no holes in it, its vertices are `coords`, it can be non-coplanar and non-triangular.

## Examples
- ```jsonc
  {
      "type": "polygon",
      "color": [1, 1, 1],
      "coords": [
          [[0, 0, 0]],
          [[0, 0, 1]],
          [[0, 1, 1]]
      ],
      "opacity": 0.4 // 40% of opacity
  }
  ```
  <div class='center' id='graphics-container-1'></div>
  <script>
  	drawGraphics3d(
  		document.getElementById('graphics-container-1'),
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
  					opacity: 0.4 // 40% of opacity
  				}
  			],
  			lighting: [
  				{
  					type: 'ambient',
  					color: [1, 1, 0]
  				}
  			],
  			viewpoint: [2, -4, 4]
  		}
  	);
  </script>
- ```json
  {
      "type": "polygon",
      "color": [1, 1, 0],
      "coords": [
          [[0, 0, 0]],
          [[0, 1, 0]],
          [[0, 1, 1]],
          [[0, 0, 1]]
      ]
  }
  ```
  <div class='center' id='graphics-container-2'></div>
  <script>
  	drawGraphics3d(
  		document.getElementById('graphics-container-2'),
  		{
  			elements: [
  				{
  					type: 'polygon',
  					color: [1, 1, 0],
  					coords: [
  						[[0, 0, 0]],
  						[[1, 0, 0]],
  						[[1, 1, 1]],
  						[[0.5, 1.5, 1.5]],
  						[[0, 1, 1]]
  					]
  				}
  			],
  			viewpoint: [2, -4, 4]
  		}
  	);
  </script>
- ```jsonc
  {
      "type": "polygon",
      "color": [0, 0.5, 0.5],
      "coords": [
          [[0, 0, 0]],
          [[0, 1, 1]],
          [[1, 1, 1]],
          [[1, 0, 1]]
      ],
      "opacity": 0.9 // 90% of opacity
  }
  ```
  <div class='center' id='graphics-container-3'></div>
  <script>
  	drawGraphics3d(
  		document.getElementById('graphics-container-3'),
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
  					opacity: 0.9 // 90% of opacity
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
- ```jsonc
  {
      "type": "polygon",
      "color": [0, 1, 1],
      "coords": [
          [[0, 0, 0]],
          [[0, 1, 1]],
          [[1, 1, 1]],
          [[1, 0, 1]]
      ],
      "edgeForm": { "showEdges": true }
  }
  ```
  <div class='center' id='graphics-container-4'></div>
  <script>
  	drawGraphics3d(
  		document.getElementById('graphics-container-4'),
  		{
  			elements: [
  				{
  					type: 'polygon',
  					color: [0, 1, 1],
  					coords: [
  						[[0, 0, 0]],
  						[[0, 1, 1]],
  						[[1, 1, 1]],
  						[[1, 0, 1]]
  					],
  					edgeForm: { showEdges: true }
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
- This polygon should have shadows in its upper side.
  It doesn't have because we are setting custom vertex normals.
  ```jsonc
  {
      "elements": [{
          "type": "polygon",
          "color": [1, 1, 1],
          "coords": [
              [[0, 0, 0]],
              [[1, 1, 1]],
              [[0, 1, 1]]
          ],
          "vertexNormals": [
              [1, -1, 1],
              [1, -1, 1],
              [1, -1, 1]
          ],
      }],
      "lighting": [{
          "type": "point",
          "color": [1, 1, 1],
          "coords": [[1, 0, 1]]
      }],
  }
  ```
  <div class='center' id='graphics-container-5'></div>
  <script>
  	drawGraphics3d(
  		document.getElementById('graphics-container-5'),
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

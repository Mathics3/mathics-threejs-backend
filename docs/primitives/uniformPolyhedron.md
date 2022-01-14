Properties:
- `color` (type: [color](/mathics-threejs-backend/types/color)) — default: white
- `coords` (type: [coord[]](/mathics-threejs-backend/types/coord)) — array of polyhedrons' center
- `edgeForm` (type: object) — default: `{}`, object with the following properties:
  - `color` (type: [color](/mathics-threejs-backend/types/color)) — edges' color, default: black
  - `showEdges` (type: bool) — default: `true`
- `edgeLength` (type: number) — default: `1`
- `opacity` (type: number) — default: `1`
- `subType` (type: string) — it can be one of the following: `'tetrahedron'`, `'octahedron'`, `'dodecahedron'`, or `'icosahedron'`

Draw polyhedrons.

## Examples
- ```jsonc
  {
      "type": "uniformPolyhedron",
      "color": [1, 0.5, 0.5],
      "coords": [
          [[0, 0, 0]]
      ],
      "opacity": 0.5, // 50% of opacity
      "subType": "tetrahedron"
  }
  ```
  <div class='center' id='graphics-container-1'></div>
  <script>
      drawGraphics3d(
          document.getElementById('graphics-container-1'),
          {
              elements: [
                  {
                      type: 'uniformPolyhedron',
                      color: [1, 0.5, 0.5],
                      coords: [
                          [[0, 0, 0]]
                      ],
                      opacity: 0.5, // 50% of opacity
                      subType: 'tetrahedron'
                  }
              ],
              lighting: [
                  {
                      type: 'directional',
                      color: [1, 1, 1],
                      coords: [[1, 1, 1]]
                  }
              ],
              viewpoint: [2, 4, 3]
          }
      );
  </script>
- ```json
  {
      "type": "uniformPolyhedron",
      "color": [1, 0.5, 1],
      "coords": [
          [[0, 0, 0]]
      ],
      "edgeForm": { "showEdges": false },
      "subType": "octahedron"
  }
  ```
  <div class='center' id='graphics-container-2'></div>
  <script>
      drawGraphics3d(
          document.getElementById('graphics-container-2'),
          {
              elements: [
                  {
                      type: 'uniformPolyhedron',
                      color: [1, 0.5, 1],
                      coords: [
                          [[0, 0, 0]]
                      ],
                      edgeForm: { showEdges: false },
                      subType: 'octahedron'
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
      "type": "uniformPolyhedron",
      "color": [0.5, 0.5, 1],
      "coords": [
          [[0, 0, 0]],
          [[2, 2, 2]],
      ],
      "edgeForm": { "showEdges": false },
      "opacity": 0.7, // 70% of opacity
      "subType": "dodecahedron"
  }
  ```
  <div class='center' id='graphics-container-3'></div>
  <script>
      drawGraphics3d(
          document.getElementById('graphics-container-3'),
          {
              elements: [
                  {
                      type: 'uniformPolyhedron',
                      color: [0.5, 0.5, 1],
                      coords: [
                          [[0, 0, 0]],
                          [[2, 2, 2]],
                      ],
                      edgeForm: { showEdges: false },
                      opacity: 0.7, // 70% of opacity
                      subType: 'dodecahedron'
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
- ```json
  {
      "type": "uniformPolyhedron",
      "color": [0, 1, 0.4],
      "coords": [
          [[0, 0, 0]]
      ],
      "edgeForm": { "showEdges": false },
      "subType": "icosahedron"
  }
  ```
  <div class='center' id='graphics-container-4'></div>
  <script>
      drawGraphics3d(
          document.getElementById('graphics-container-4'),
          {
              elements: [
                  {
                      type: 'uniformPolyhedron',
                      color: [0, 1, 0.4],
                      coords: [
                          [[0, 0, 0]]
                      ],
                      edgeForm: { showEdges: false },
                      subType: 'icosahedron'
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
      "type": "uniformPolyhedron",
      "color": [1, 1, 1],
      "coords": [
          [[0, 0, 0]]
      ],
      "edgeForm": { "showEdges": false },
      "edgeLength": 10,
      "subType": "dodecahedron"
  }
  ```
  ![dodecahedron with edge length 10](https://user-images.githubusercontent.com/62714153/127578174-0d049364-b1cc-4ddb-bfe2-8b0de6949110.png)

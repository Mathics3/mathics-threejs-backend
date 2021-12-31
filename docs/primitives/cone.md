Properties:
- `color` (type: [color/mathics-threejs-backend/types/color))
- `coords` (type: [coord[]/mathics-threejs-backend/types/coord)) — array of cylinders' centers
- `edgeForm` (type: object) — default: `{}`, object with the following properties:
  - `color` (type: [color/mathics-threejs-backend/types/color)) — edges' color, default: `[0, 0, 0]` (black edges)
  - `showEdges` (type: bool) — default: `true`
- `radius` (type: number) — default: `1`
- `opacity` (type: number) — default: `1`

Draw cylinders from the even-numbered positions to the odd ones.

## Examples
- ```jsonc
  {
      "type": "cone",
      "color": [1, 1, 1],
      "coords": [
          [[0, 0, 0]],
          [[1, 1, 1]]
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
                      type: 'cone',
                      color: [1, 1, 1],
                      coords: [
                          [[0, 0, 0]],
                          [[1, 1, 1]]
                      ],
                      edgeForm: { showEdges: false }
                  }
              ],
              lighting: [
                  {
                      type: 'spot',
                      color: [1, 0, 1],
                      coords: [null, [1, 0, 0]],
                      target: [[0, 0, 0]]
                  }
              ],
              viewpoint: [2, -2, 2]
          }
      );
  </script>
- ```jsonc
  {
      "type": "cone",
      "color": [1, 1, 1],
      "coords": [
          [[-1, -1, -1]], // first cone begin
          [[0, 0, 0]],    // first cone end
          [[1, 1, 1]],    // second cone begin
          [[0, 0, 0]]     // second cone end
      ],
      "edgeForm": { "color": [1, 0, 0] }
  }
  ```
  <div class='center' id='graphics-container-2'></div>
  <script>
      drawGraphics3d(
          document.getElementById('graphics-container-2'),
          {
              elements: [
                  {
                      type: 'cone',
                      color: [1, 1, 1],
                      coords: [
                          [[-1, -1, -1]], // first cone begin
                          [[0, 0, 0]],    // first cone end
                          [[1, 1, 1]],    // second cone begin
                          [[0, 0, 0]]     // second cone end
                      ],
                      edgeForm: { color: [1, 0, 0] }
                  }
              ],
              lighting: [
                  {
                      type: 'ambient',
                      color: [0.3, 0.2, 0.4]
                  },
                  {
                      type: 'spot',
                      color: [0.8, 0, 0],
                      coords: [[0, 0, 1.1]],
                      target: [[0, 0, 0]]
                  },
                  {
                      type: 'spot',
                      color: [0, 0, 0.8],
                      coords: [[1.1, 0, 0]],
                      target: [[0, 0, 0]]
                  }
              ],
              viewpoint: [-2.5, -2, 2]
          }
      );
  </script>

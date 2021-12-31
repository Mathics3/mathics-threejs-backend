Properties:
- `color` (type: [color](/mathics-threejs-backend/types/color))
- `coords` (type: [coord[]](/mathics-threejs-backend/types/coord)) — array of cylinders' centers
- `edgeForm` (type: object) — default: `{}`, object with the following properties:
  - `color` (type: [color](/mathics-threejs-backend/types/color)) — edges' color, default: `[0, 0, 0]` (black edges)
  - `showEdges` (type: bool) — default: `true`
- `radius` (type: number) — default: `1`
- `opacity` (type: number) — default: `1`

Draw cylinders from the even-numbered positions to the odd ones.

## Examples
- ```jsonc
  {
      "type": "cylinder",
      "color": [0.5, 0.5, 0.5],
      "coords": [
          [[0, 0, 0]],
          [[1, 1, 1]],
      ],
      "opacity": 0.5,
      "edgeForm": { "showEdges": false }
  }
  ```
  ![cylinder with labels](https://user-images.githubusercontent.com/62714153/127582372-001693bf-1c3a-421e-949f-e874ca842a05.png)
- ```jsonc
  {
      "type": "cylinder",
      "color": [1, 1, 1],
      "coords": [
          [[-1, -1, -1]], // first cylinder begin
          [[0, 0, 0]],    // first cylinder end
          [[0, 0, 0]],    // second cylinder begin
          [[1, 1, 1]]     // second cylinder end
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
                      type: 'cylinder',
                      color: [1, 1, 1],
                      coords: [
                          [[-1, -1, -1]], // first cylinder begin
                          [[0, 0, 0]],    // first cylinder end
                          [[0, 0, 0]],    // second cylinder begin
                          [[1, 1, 1]]     // second cylinder end
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
      "type": "cylinder",
      "color": [1, 1, 1],
      "coords": [
          [null, [0.25, 0.25, 0.25]],
          [null, [0.75, 0.75, 0.75]]
      ],
      "edgeForm": { "color": [0, 1, 0] },
      "radius": 0.25
  }
  ```
  <div class='center' id='graphics-container-2'></div>
  <script>
      drawGraphics3d(
          document.getElementById('graphics-container-2'),
          {
              elements: [
                  {
                      type: 'cylinder',
                      color: [1, 1, 1],
                      coords: [
                          [null, [0.25, 0.25, 0.25]],
                          [null, [0.75, 0.75, 0.75]]
                      ],
                      edgeForm: { color: [0, 1, 0] },
                      radius: 0.25
                  }
              ],
              lighting: [
                  {
                      type: 'directional',
                      color: [0.5, 0.5, 0.5],
                      coords: [null, [0, 0, 0]]
                  }
              ],
              viewpoint: [-1, 2, 4]
          }
      );
  </script>

Properties:
- `color` (type: [color](/mathics-threejs-backend/types/color)) — default: white
- `coords` (type: [coord](/mathics-threejs-backend/types/coord)) — point coordinates

Add a light that gets emitted from `coords` in all directions to the scene.

## Examples
- ```json
  {
      "type": "point",
      "color": [0, 1, 0],
      "coords": [[1.5, 1.5, 0]]
  }
  ```
  <div class='center' id='graphics-container-1'></div>
  <script>
      drawGraphics3d(
          document.getElementById('graphics-container-1'),
          {
              elements: [
                  {
                      type: 'sphere',
                      color: [1, 1, 1],
                      radius: 1,
                      coords: [[[0, 0, 0]]]
                  },
                  {
                      type: 'sphere',
                      color: [1, 1, 1],
                      radius: 1,
                      coords: [[[3, 0, 0]]]
                  },
                  {
                      type: 'sphere',
                      color: [1, 1, 1],
                      radius: 1,
                      coords: [[[0, 3, 0]]]
                  },
                  {
                      type: 'sphere',
                      color: [1, 1, 1],
                      radius: 1,
                      coords: [[[3, 3, 0]]]
                  }
              ],
              lighting: [
                  {
                      type: 'point',
                      color: [0, 1, 0],
                      coords: [[1.5, 1.5, 0]]
                  }
              ],
              viewpoint: [2, -4, 4]
          }
      );
  </script>
- ```jsonc
  {
      "type": "point",
      "color": [1, 1, 0], // yellow
      "coords": [null, [1, 1, 1]]
  }
  ```
  <div class='center' id='graphics-container-2'></div>
  <script>
      drawGraphics3d(
          document.getElementById('graphics-container-2'),
          {
              elements: [
                  {
                      type: 'sphere',
                      color: [1, 1, 1],
                      coords: [[[0, 0, 0]]]
                  }
              ],
              lighting: [
                  {
                      type: 'point',
                      color: [1, 1, 0],
                      coords: [null, [1, 1, 1]]
                  }
              ],
              viewpoint: [2, -4, 4]
          }
      );
  </script>

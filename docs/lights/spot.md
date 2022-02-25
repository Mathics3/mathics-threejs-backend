Properties:
- `angle` (type: number) —  the maximum angle in radians of light dispersion (upper bound is π/2), default: π/2
  <img style="display: block; margin: 0 auto;" src="https://user-images.githubusercontent.com/62714153/155711978-7e6e0e54-cf53-44e6-a856-d5e8873f7c72.png" alt="spot light with default angle" />
- `color` (type: [color](/mathics-threejs-backend/types/color)) — default: white
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
- ```json
  {
      "type": "spot",
      "color": [1, 1, 1],
      "coords": [null, [1, 1, 1]],
      "target": [[0, 0, 0]]
  }
  ```
  <div class='center' id='graphics-container-2'></div>
  <script>
      drawGraphics3d(
          document.getElementById('graphics-container-2'),
          {
              elements: [
                  {
                      type: 'cuboid',
                      color: [1, 1, 1],
                      coords: [
                          [[0, 0, 0]],
                          [[1, 1, 1]]
                      ]
                  }
              ],
              lighting: [
                  {
                      type: 'spot',
                      color: [1, 1, 1],
                      coords: [null, [1, 1, 1]],
                      target: [[0, 0, 0]]
                  }
              ],
              viewpoint: [1.3, -2.4, 2]
          }
      );
  </script>

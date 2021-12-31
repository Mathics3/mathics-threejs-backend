Properties:
- `color` (type: [color](/mathics-threejs-backend/types/color))

Add ambient light to the scene.

## Examples
- ```jsonc
  {
      "type": "ambient",
      "color": [1, 0.5, 0] // add orange light to the scene
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
                      coords: [
                          [[0, 0, 0]]
                      ],
                      radius: 1
                  }
              ],
              lighting: [
                  {
                      type: 'ambient',
                      color: [1, 0.5, 0] // add orange light to the scene
                  }
              ],
              viewpoint: [1.3, -2.4, 2]
          }
      );
  </script>
- ```jsonc
  {
      "type": "ambient",
      "color": [1, 0, 1] // add purple light to the scene
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
                      type: 'ambient',
                      color: [1, 0, 1] // add purple light to the scene
                  }
              ],
              viewpoint: [1.3, -2.4, 2]
          }
      );
  </script>

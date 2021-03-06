Properties:
- `color` (type: [color](/mathics-threejs-backend/types/color)) — default: white
- `coords` (type: [coord[]](/mathics-threejs-backend/types/coord)) — array of sphere centers
- `opacity` (type: number) — default: `1`
- `radius` (type: number) — default: `1`

Draw spheres.

## Examples
- ```json
  {
      "type": "sphere",
      "color": [0.6, 0.6, 0.6],
      "coords": [
          [[0, 0, 0]]
      ],
      "radius": 1
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
                      color: [0.6, 0.6, 0.6],
                      coords: [
                          [[0, 0, 0]]
                      ],
                      radius: 1
                  }
              ],
              lighting: [
                  {
                      type: 'ambient',
                      color: [0.3, 0.2, 0.4]
                  }
              ],
              viewpoint: [1.3, -2.4, 2]
          }
      );
  </script>
- ```json
  {
      "type": "sphere",
      "color": [1, 1, 1],
      "coords": [
          [[0, 0, 0]]
      ],
      "opacity": 0.5
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
                      coords: [
                          [[0, 0, 0]]
                      ],
                      opacity: 0.5
                  }
              ],
              lighting: [
                  {
                      type: 'ambient',
                      color: [0.3, 0.2, 0.4]
                  },
                  {
                      type: 'directional',
                      color: [0.8, 0, 0],
                      coords: [[2, 0, 2]]
                  },
                  {
                      type: 'directional',
                      color: [0, 0.8, 0],
                      coords: [[2, 2, 2]]
                  },
                  {
                      type: 'directional',
                      color: [0, 0, 0.8],
                      coords: [[0, 2, 2]]
                  }
              ],
              viewpoint: [1.3, -2.4, 2]
          }
      );
  </script>

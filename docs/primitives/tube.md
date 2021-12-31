Properties:
- `color` (type: [color](/mathics-threejs-backend/types/color))
- `coords` (type: [coord[]](/mathics-threejs-backend/types/coord)) — draw a tube passing through these coordinates
- `opacity` (type: number) — default: `1`
- `radius` (type: number) — default: `1`

Draw a tube.

## Examples
- ```json
  {
      "type": "tube",
      "color": [1, 1, 1],
      "coords": [
          [[0, 0, 0]],
          [[1, 1, 1]]
      ]
  }
  ```
  <div class='center' id='graphics-container-1'></div>
  <script>
      drawGraphics3d(
          document.getElementById('graphics-container-1'),
          {
              elements: [
                  {
                      type: 'tube',
                      color: [1, 1, 1],
                      coords: [
                          [[0, 0, 0]],
                          [[1, 1, 1]]
                      ]
                  }
              ],
              lighting: [
                  {
                      type: 'directional',
                      color: [1, 0, 0],
                      coords: [null, [1, 1, 1]]
                  },
              ],
              viewpoint: [2, -4, 4]
          }
      );
  </script>
- ```json
  {
      "type": "tube",
      "color": [1, 1, 1],
      "coords": [
          [[0, 0, 0]],
          [[1, 0, 0]],
          [[1, 1, 0]],
          [[1, 1, 1]],
          [[1, 0, 1]],
          [[0, 0, 1]],
          [[0, 1, 1]],
          [[0, 1, 0]]
      ],
      "radius": 0.1
  }
  ```
  <div class='center' id='graphics-container-2'></div>
  <script>
      drawGraphics3d(
          document.getElementById('graphics-container-2'),
          {
              elements: [
                  {
                      type: 'tube',
                      color: [1, 1, 1],
                      coords: [
                          [[0, 0, 0]],
                          [[1, 0, 0]],
                          [[1, 1, 0]],
                          [[1, 1, 1]],
                          [[1, 0, 1]],
                          [[0, 0, 1]],
                          [[0, 1, 1]],
                          [[0, 1, 0]]
                      ],
                      radius: 0.1
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
              viewpoint: [-2, -2, 2]
          }
      );
  </script>

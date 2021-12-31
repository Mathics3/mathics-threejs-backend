Properties:
- `color` (type: [color](/mathics-threejs-backend/types/color))
- `coords` (type: [coord](/mathics-threejs-backend/types/coord)) — initial light position in [spherical polar coordinates](https://en.wikipedia.org/wiki/Spherical_coordinate_system)

Add an infinitely far camera-follower light to the scene.

## Examples
- ```json
  {
      "type": "directional",
      "color": [1, 1, 1],
      "coords": [[2, 2, 2]]
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
                      type: 'directional',
                      color: [1, 1, 1],
                      coords: [[2, 2, 2]]
                  }
              ],
              viewpoint: [1.3, -2.4, 2]
          }
      );
  </script>
- ```json
  {
      "type": "directional",
      "color": [1, 0.5, 0],
      "coords": [[1, 1, 1]]
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
                      radius: 1,
                      coords: [[[0, 0, 0]]]
                  },
                  {
                      type: 'cuboid',
                      color: [1, 1, 1],
                      coords: [[[1, 2, -1]], [[2, 3, 1]]],
                      edgeForm: { showEdges: false }
                  },
                  {
                      type: 'uniformPolyhedron',
                      subType: 'dodecahedron',
                      color: [1, 1, 1],
                      coords: [[[3, -1, 0]]]
                  }
              ],
              lighting: [
                  {
                      type: 'directional',
                      color: [1, 0.5, 0],
                      coords: [[1, 1, 1]]
                  }
              ],
              viewpoint: [2, -4, 4]
          }
      );
  </script>

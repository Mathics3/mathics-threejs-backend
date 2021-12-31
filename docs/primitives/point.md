Properties:
- `color` (type: [color](/mathics-threejs-backend/types/color))
- `coords` (type: [coord[]](/mathics-threejs-backend/types/coord)) — array of each point location
- `opacity` (type: number) — default: `1`
- `pointSize` (type: number)

Draw points with the point size being canvas' size times `pointSize`.

## Examples
- ```jsonc
  {
      "type": "point",
      "color": [0, 0, 0],
      "coords": [
          [[0, 0, 0]]
      ],
      "pointSize": 0.5 // 50% of the canvas size
  }
  ```
  <div class='center' id='graphics-container-1'></div>
  <script>
      drawGraphics3d(
          document.getElementById('graphics-container-1'),
          {
              elements: [
                  {
                      type: 'point',
                      color: [0, 0, 0],
                      coords: [
                          [[0, 0, 0]]
                      ],
                      pointSize: 0.5 // 50% of the canvas size
                  }
              ],
              viewpoint: [2, -4, 4]
          }
      );
  </script>
- ```jsonc
  {
      "type": "point",
      "color": [0.5, 0.5, 0.5],
      "coords": [
          [[0, 0, 1]],
          [[0.628319, 0.587785, 0.809017]],
          [[1.25664, 0.951057, 0.309017]],
          [[1.88496, 0.951057, -0.309017]],
          [[2.51327, 0.587785, -0.809017]],
          [[3.14159, 0, -1]],
          [[3.76991, -0.587785, -0.809017]],
          [[4.39823, -0.951057, -0.309017]],
          [[5.02655, -0.951057, 0.309017]],
          [[5.65487, -0.587785, 0.809017]],
          [[6.28319, 0, 1]]
      ],
      "pointSize": 0.02
  }
  ```
  <div class='center' id='graphics-container-2'></div>
  <script>
      drawGraphics3d(
          document.getElementById('graphics-container-2'),
          {
              elements: [
                  {
                      type: 'point',
                      color: [0.5, 0.5, 0.5],
                      coords: [
                          [[0, 0, 1]],
                          [[0.628319, 0.587785, 0.809017]],
                          [[1.25664, 0.951057, 0.309017]],
                          [[1.88496, 0.951057, -0.309017]],
                          [[2.51327, 0.587785, -0.809017]],
                          [[3.14159, 0, -1]],
                          [[3.76991, -0.587785, -0.809017]],
                          [[4.39823, -0.951057, -0.309017]],
                          [[5.02655, -0.951057, 0.309017]],
                          [[5.65487, -0.587785, 0.809017]],
                          [[6.28319, 0, 1]]
                      ],
                      pointSize: 0.02
                  }
              ],
              viewpoint: [2, -4, 4]
          }
      );
  </script>
- Mathics code:
  ```wl
  Graphics3D[{
      Red,
      PointSize[.05],
      Table[Point[{x,y,z}], {x, 10}, {y, 10}, {z, 10}]
  }]
  ```
  ![1000 points](https://user-images.githubusercontent.com/62714153/124356523-ce9b9680-dbec-11eb-87e0-d200ea93f4c0.png)

## Notes
-  Our behavor is different from Wolframs Language's Point, our points aren't affected by lighting and therefore don't have VertexNormals.

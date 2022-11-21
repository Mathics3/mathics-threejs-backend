Properties:
- `color` (type: [color](/mathics-threejs-backend/types/color)) — default: black
- `coords` (type: [coord[]](/mathics-threejs-backend/types/coord)) — this **NEED** to be a relative coordinate. The z value will change the zIndex of the text
- `texts` (type: string[]) — a list with the same size as `coords` containing the texts
- `textSize = 20` (type: number) — the size in pixels of the text font. Default: `20`

Add 2d text captions to the scene.

## Examples
- ```json
  {
      "type": "text",
      "color": [1, 0, 0],
      "coords": [
          [null, [0, 0, 0]],
          [null, [1, 1, 1]]
      ],
      "texts": [
          "Bottom left",
          "Top right"
      ]
  }
  ```
  <div style='position: relative' class='center' id='graphics-container-1'></div>
  <script>
      drawGraphics3d(
          document.getElementById('graphics-container-1'),
          {
              elements: [
                  {
                      type: 'text',
                      color: [1, 0, 0],
                      coords: [
                          [null, [0, 0, 0]],
                          [null, [1, 1, 1]]
                      ],
                      texts: [
                        "Bottom left",
                        "Top right"
                      ]
                  }
              ],
              viewpoint: [2, -4, 4]
          }
      );
  </script>

## Notes
- Currently the text use HTML elements with
  `position: absolute` so the graphics container must have
  `position: relative` if you want to show the text.

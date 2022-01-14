Welcome to the mathics-threejs-backend documentation!

You can use mathics-threejs-backend in 2 ways:
- **production** — a stable release. To use either use the content-development network (CDN) or host the files in your own webserver:
  - to use the CDN:
    ```html
    <script src="https://cdn.jsdelivr.net/npm/@mathicsorg/mathics-threejs-backend"></script>
    ```
  - to host the files yourself:
    1. clone this repository:
       ```sh
       git clone https://github.com/Mathics3/mathics-threejs-backend
       ```
    2. copy the file `bundle/index.js` to your project
    3. import the library from HTML:
       ```html
       <script src="path-to-index.js"></script>
       ```
- **development** — the latest changes in GitHub. To use this version you need to:
  1. clone this repository:
     ```sh
     git clone https://github.com/Mathics3/mathics-threejs-backend
     ```
  2. copy all files from the folder `src` to your project
  3. import the library from JavaScript:
  ```js
  import drawGraphics3d from './path-to-index.js'
  ```

The main function of mathics-threejs-backend is `drawGraphics3d`, takes the following arguments:
- `container` (type: HTMLElement)
- `elements` (type: object) — object with the following properties:
  - `axes` (type: object) — default: `{}`, object with the following properties:
    - `hasaxes` (type: bool\|bool[3]) — default: `false`
    - `ticks` (type: [number[], number[], string[]][3]) — array containing the ticks' information for, respectively, x, y and z axes. The ticks' information is an array of three elements: big ticks' 0-1 coordinates, small ticks' 0-1 coordinates, big ticks' labels. Default: `[]`
    - `ticks_style` (type: [color[3]](/mathics-threejs-backend/types/color)) — array containing the ticks' colors for, respectively, x, y and z axes. Default: `[[0, 0, 0], [0, 0, 0], [0, 0, 0]]` (all ticks are black)
  - `elements` (type: [element[]](/mathics-threejs-backend/types/color) — array of primitives, default: `[]`
  - `extent` (type: object) — the size of the bounding box. This is optional, only use this if you don't want the default behaviour. This is an object with the following properties:
    - `xmin` (type: number)
    - `ymin` (type: number)
    - `zmin` (type: number)
    - `xmax` (type: number)
    - `ymax` (type: number)
    - `zmax` (type: number)
  - `lighting` (type: [element[]](/mathics-threejs-backend/types/element)) — array of lights, default: `[]`
  - `viewpoint` (type: number[3]) — the normalized camera coordinate (normalized means that the coordinate is going to be scaled, e.g. `[1, 1, 1]` is the upper back right corner of the bounding box independently from its size). Default: `[1.3, -2.4, 2]`
  - `protocol` (type: string) — protocol version (current is `1.1`), if it isn't compatible a warning is shown instead of the graphics. Only availiable in production version
- `maxSize` (type: number) — default: `400`
- `innerWidthMultiplier` (type: number) — the multiplier of the window inner width, the effective width is `min(maxSize, innerWidthMultiplier * window.innerWidth)`, default: `0.65`

## Examples
- ```js
  drawGraphics3d(
      document.getElementById('graphics-container'),
      {
          axes: {
              hasaxes: true,
              ticks: [
                  [ // x ticks
                      [0, 0.5, 1], // big ticks
                      [0.05, 0.1, 0.15, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.7, 0.75, 0.85, 0.9, 0.95], // small ticks
                      ['0', '5', '10'] // big ticks labels
                  ],
                  [ // y ticks
                      [0, 0.5, 1], // big ticks
                      [0.05, 0.1, 0.15, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.7, 0.75, 0.85, 0.9, 0.95], // small ticks
                      ['0', '5', '10'] // big ticks labels
                  ],
                  [ // z ticks
                      [0, 0.5, 1], // big ticks
                      [0.05, 0.1, 0.15, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.7, 0.75, 0.85, 0.9, 0.95], // small ticks
                      ['0', '5', '10'] // big ticks labels
                  ],
              ],
              ticks_style: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
          },
          elements: [
              {
                  type: 'sphere',
                  color: [1, 1, 1],
                  coords: [
                      [[0.5, 0.5, 0.5]]
                  ],
                  radius: 0.5
              }
          ],
          lighting: [
              {
                  type: 'ambient',
                  color: [0.5, 0.5, 0.5]
              }
          ],
          viewpoint: [2, -4, 4],
          protocol: '1.1'
      },
      600, // maxSize
      0.75 // innerWidthMultiplier
  );
  ```
  <div style='position: relative;' class='center' id='graphics-container-1'></div>
  <script>
      drawGraphics3d(
          document.getElementById('graphics-container-1'),
          {
              axes: {
                  hasaxes: true,
                  ticks: [
                      [ // x ticks
                          [0, 0.5, 1], // big ticks
                          [0.05, 0.1, 0.15, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.7, 0.75, 0.85, 0.9, 0.95], // small ticks
                          ['0', '5', '10'] // big ticks labels
                      ],
                      [ // y ticks
                          [0, 0.5, 1], // big ticks
                          [0.05, 0.1, 0.15, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.7, 0.75, 0.85, 0.9, 0.95], // small ticks
                          ['0', '5', '10'] // big ticks labels
                      ],
                      [ // z ticks
                          [0, 0.5, 1], // big ticks
                          [0.05, 0.1, 0.15, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.7, 0.75, 0.85, 0.9, 0.95], // small ticks
                          ['0', '5', '10'] // big ticks labels
                      ],
                  ],
                  ticks_style: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
              },
              elements: [
                  {
                      type: 'sphere',
                      color: [1, 1, 1],
                      coords: [
                          [[0.5, 0.5, 0.5]]
                      ],
                      radius: 0.5
                  }
              ],
              lighting: [
                  {
                      type: 'ambient',
                      color: [0.5, 0.5, 0.5]
                  }
              ],
              viewpoint: [2, -4, 4],
              protocol: '1.1'
          },
          600, // maxSize
          0.75 // innerWidthMultiplier
      );
  </script>
- ```js
  drawGraphics3d(
      document.getElementById('graphics-container'),
      { viewpoint: [2, -4, 4] }
  );
  ```
  <div class='center' id='graphics-container-2'></div>
  <script>
      drawGraphics3d(
          document.getElementById('graphics-container-2'),
          { viewpoint: [2, -4, 4] }
      );
  </script>

## Notes
- Currently the axes labels are drawn using HTML elements with
  `position: absolute` so the graphics container must have
  `position: relative` if you want to draw the axes labels and the
  container is not the unique element in the page.

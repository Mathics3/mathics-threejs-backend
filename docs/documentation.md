Welcome to the mathics-threejs-backend documentation!

mathics-threejs-backend have 2 versions:
- **production** — to use this version you can:
  - use the CDN:
    ```html
    <script src="https://cdn.jsdelivr.net/npm/@mathicsorg/mathics-threejs-backend"></script>
    ```
  - host the files yourself:
    1. clone this repository:
       ```sh
       git clone https://github.com/Mathics3/mathics-threejs-backend
       ```
    2. copy the file `bundle/index.js` to your project
    3. import the library from HTML:
       ```html
       <script src="path-to-index.js"></script>
       ```
- **development** — to use this version you need to:
  1. clone this repository:
     ```sh
     git clone https://github.com/Mathics3/mathics-threejs-backend
     ```
  2. copy all files from the folder `src` to your project
  3. import the library from JavaScript:
  ```js
  import drawGraphics3d from './path-to-index.js'
  ```

The main function of mathics-threejs-backend is `drawGraphics3d`, it receives the following properties:
- `container` (type: HTMLElement)
- `elements` (type: object) — object with the following properties:
  - `axes` (type: object) — default: `{}`, object with the following properties:
    - `hasaxes` (type: bool\|bool[3]) — default: `false`
    - `ticks` (type: number[3][3]) — array containing the ticks' information for, respectively, x, y and z axes. The ticks' information is an array of three elements: big ticks' coordinates, small ticks' coordinates, big ticks' labels. Default: `[]`
    - `ticks_style` (type: [color[3]](/mathics-threejs-backend/types/color)) — array containing the ticks' colors for, respectively, x, y and z axes. Default: `[[0, 0, 0], [0, 0, 0], [0, 0, 0]]` (all ticks are black)
  - `elements` (type: [element[]](/mathics-threejs-backend/types/color) — array of primitives, default: `[]`
  - `lighting` (type: [element[]](/mathics-threejs-backend/types/element)) — array of lights, default: `[]`
  - `viewpoint` (type: number[3]) — the normalized coordinates of the camera (normalized means that if the camera is in, e.g. `[2, 2, 2]` and there's an element of any size in that coordinate, the camera won't be inside the element)
  - `protocol` (type: string) — protocol version (current is `1.0`), if it isn't compatible show a warning instead of the graphics. Only availiable in production version
- `maxSize` (type: number) — default: `400`
- `innerWidthMultiplier` (type: number) — the multiplier of the window inner width, the effective width is `min(maxSize, innerWidthMultiplier * window.innerWidth)`, default: `0.65`

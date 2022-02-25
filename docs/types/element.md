It's a 3d element.  
It may be a [primitive](/mathics-threejs-backend/primitives) or a light.  
All elements must have a `type` property with its type.

## Examples
- ```jsonc
  {
      "type": "sphere",
      "coords": [
          [[0, 0, 0]]
      ],
      "color": [1, 1, 1], // white
      "radius": 1
  }
  ```
- ```jsonc
  {
      "type": "ambient", // ambient light
      "color": [0.5, 0.5, 0.5] // gray
  }
  ```

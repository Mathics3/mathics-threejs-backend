It's an array with 1 or 2 elements.

The first element is the absolute coordinate and the second is the "scaled" part.

A scaled coordinate is an array of floats from 0 to 1 relative to the plot range, e.g.: `[1, 1, 0]` is the right upper corner of the plot.

## Examples
- ```jsonc
  [
      [0, 0, 0], // the absolute part
  ]
  ```
- ```jsonc
  [
      null, // the absolute part
      [0, 1, 0] // scaled part: the left upper corner of the plot
  ]
  ```

A color is an array of 3 floats (red, green and blue) in the range 0-1.

To convert a 0-255 number to 0-1 you just need to divide the number by 255.

## Examples
- ```jsonc
  [ // #ffff00
      1, // red
      1, // green
      0, // blue
  ]
  ```
  <img class='center' style='display: block;' alt='yellow' src='https://user-images.githubusercontent.com/62714153/124355174-3c908f80-dbe6-11eb-9af8-1b65150454b6.png' />
- <p style='text-align: center;'>Color picker</p>
  {% include color_picker.html %}

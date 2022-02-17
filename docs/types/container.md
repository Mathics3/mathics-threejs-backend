A HTML element get with `document.getElementById` (or similar).

The canvas will occupy the whole container.

The following CSS properties are added if necessary:
- `display` - default: `block`
- `max-width` — default: `400px`
- `width` — default: `65vw`
- `max-height` — default: `400px`
- `height` — default: `65vw` (yes, `vw` not `vh`)
- `padding-top` — default: `5px`
- `padding-bottom` — default: `5px`

## Notes
- Currently the axes labels are drawn using HTML elements with
  `position: absolute` so the graphics container must have
  `position: relative` if you want to draw the axes labels and the
  container isn't the only element in the page.

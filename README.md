# mathics-threejs-backend

A node.js/Javascript library for rendering [Mathics](https://mathics.org) (and eventually Wolfram-Language) [Graphics3D](https://reference.wolfram.com/language/ref/Graphics3D.html) objects.

This can be used in Mathics front ends like [Mathics-Django](https://pypi.org/project/Mathics-Django/) to handle 3D Graphics. The code may also be useful as a guide for other kinds of Mathics/WL frontends to other kinds of Javascript graphics engines.

## Example:
```js
import drawGraphics3D from 'mathics-threejs-backend/src/index.js';

drawGraphics3D(
    document.getElementById('main'),
    {
        elements: [
            {
                type: 'Sphere',
                Coords: [
                    [[0, 0, 0]]
                ],
                RBGColor: [1, 1, 1]
            }
        ],
        axes: {},
        lighting: [
            {
                type: 'Ambient',
                RBGColor: [1, 1, 1]
            }
        ],
        viewpoint: [2.6, -4.8, 4.0]
    }
)
```

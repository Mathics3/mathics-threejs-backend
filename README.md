# mathics-threejs-backend

Example:
```js
import drawGraphics3D from 'mathics-threejs-backend/src/index.js';

drawGraphics3D(
    document.getElementById('main'),
    {
        elements: [
            {
                type: 'sphere',
                coords: [[[0, 0, 0]]],
                faceColor: [1, 1, 1]
            }
        ],
        axes: {},
        extent: {
            xmin: -1,
            xmax: 1,
            ymin: -1,
            ymax: 1,
            zmin: -1,
            zmax: 1
        },
        lighting: [
            {
                type: 'Ambient',
                color: [1, 1, 1]
            }
        ],
        viewpoint: [2.6, -4.8, 4.0]
    }
)
```

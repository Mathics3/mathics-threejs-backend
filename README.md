# mathics-threejs-backend

A JavaScript library for rendering [Mathics](https://mathics.org) (and eventually Wolfram Language) [Graphics3D](https://reference.wolfram.com/language/ref/Graphics3D.html) objects.

This can be used in Mathics front ends like [Mathics-Django](https://pypi.org/project/Mathics-Django/) and [Symja](https://github.com/axkr/symja_android_library) to handle 3D graphics. The code may also be useful as a guide for other kinds of Mathics/WL frontends to other kinds of JavaScript graphics engines.

## Example:
```js
import drawGraphics3D from 'mathics-threejs-backend/src/index.js';

drawGraphics3D(
    document.getElementById('main'),
    {
        elements: [
            {
                type: 'sphere',
                color: [1, 1, 1],
                coords: [
                    [[0, 0, 0]]
                ]
            }
        ],
        lighting: [
            {
                type: 'ambient',
                color: [1, 1, 1]
            }
        ],
        viewpoint: [2.6, -4.8, 4.0]
    }
)
```

Lots of other examples can be found in the [examples](https://github.com/Mathics3/mathics-threejs-backend/tree/master/examples) directory of this repository.

## Displaying Examples
Install an HTTP server and run it:

```console
$ # Only install the necessary dependencies. Do this only one time.
$ npm install @mathicsorg/mathics-threejs-backend --production
...
added 57 packages, and audited 58 packages in 1s
...
found 0 vulnerabilities
```

The above only needs to be done once to set up an HTTP server to use. If you already have an HTTP server running that is also able to browse local files in this repository, then you probably don't need to do this.

Otherwise, start the HTTP server that was just installed:

```console
$ npm run start-server  # Do this once per session
...
Server running at http://localhost:8080/
See our gallery in http://localhost:8080/examples/

Hit CTRL-C to stop the server
```

Finally, look at a file that you want to see rendered, e.g. http://127.0.0.1:8080/docs/objects-in-directional-light.html

## Documentation and examples
You can see the documentation and more live examples [here](https://mathics3.github.io/mathics-threejs-backend).

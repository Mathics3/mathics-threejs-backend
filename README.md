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

## Displaying Examples

Install an HTTP server and run a HTTP server:

```
$ npm install http-server # Do this only one time.
...
added 30 packages from 40 contributors and audited 30 packages in 1.595s
...
found 0 vulnerabilities
```

The above only needs to be done once to set up an HTTP server to use. If you already have an HTTP server running that is also able to browse local files in this repository, then you probably don't need to do this.

Otherwise, start the HTTP server that was just installed:

```
$ ./node_modules/http-server/bin/http-server  # Do this once per session
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
...
Hit CTRL-C to stop the server
```

Finally, look at a file that you want to see rendered, e.g. http://127.0.0.1:8080/test/axes/axes.html

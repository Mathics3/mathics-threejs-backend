# mathics-threejs-backend

A JavaScript library for rendering [Mathics](https://mathics.org) (and eventually Wolfram Language) [Graphics3D](https://reference.wolfram.com/language/ref/Graphics3D.html) objects.

This can be used in Mathics front ends like [Mathics-Django](https://pypi.org/project/Mathics-Django/) and [Symja](https://github.com/axkr/symja_android_library) to handle 3D graphics. The code may also be useful as a guide for other kinds of Mathics/WL frontends to other kinds of JavaScript graphics engines.

## Example:
```js
import drawGraphics3D from '@mathicsorg/mathics-threejs-backend';

drawGraphics3D(document.getElementById('main'), {
  elements: [
    {
      type: 'tube',
      color: [0.2, 0.2, 0.2],
      coords: [
        [null, [0, 0, 0]],
        [null, [1, 0, 0]],
        [null, [1, 1, 0]],
        [null, [1, 1, 1]],
        [null, [1, 0, 1]],
        [null, [0, 0, 1]],
        [null, [0, 1, 1]],
        [null, [0, 1, 0]]
      ],
      radius: 0.1
    },
    {
      type: 'uniformPolyhedron',
      color: [1, 0.5, 0.5],
      coords: [
        [[0, 0, 0]],
        [[2, 2, 2]]
      ],
      edgeForm: { showEdges: false },
      opacity: 0.5, // 50% of opacity
      subType: 'dodecahedron'
    },
		{
      type: 'sphere',
      color: [0.5, 0.5, 1],
      coords: [
        [[0, 0, 0]],
        [[1, 1, 1]],
        [[2, 2, 2]]
      ],
      edgeForm: { showEdges: false },
      opacity: 0.7, // 70% of opacity
      radius: 0.5,
      subType: 'dodecahedron'
    }
  ],
  lighting: [
    {
      type: 'ambient',
      color: [0.5, 0.5, 0.5]
    },
    {
      type: 'directional',
      color: [0.8, 0, 0],
      coords: [null, [2, 0, 2]]
    },
    {
      type: 'directional',
      color: [0, 0.8, 0],
      coords: [null, [2, 2, 2]]
    },
    {
      type: 'directional',
      color: [0, 0, 0.8],
      coords: [null, [0, 2, 2]]
    }
  ],
  viewpoint: [2, -4, 4]
});
```
<p align="center"><a href="https://mathics3.github.io/mathics-threejs-backend/examples/tube-dodecahedrons-and-spheres"><img alt="demonstration" src="https://user-images.githubusercontent.com/62714153/155851002-13b0200b-7835-40f9-8780-97aefb12bac5.gif" /></a></p>

Lots of other examples can be found in the [examples](https://github.com/Mathics3/mathics-threejs-backend/tree/master/examples) folder of this repository and in the [documentation](https://mathics3.github.io/mathics-threejs-backend/examples).

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
$ npm start  # Do this once per session
...
Server running at http://localhost:8080/
See our gallery in http://localhost:8080/examples/

Hit CTRL-C to stop the server
```

Finally, look at a file that you want to see rendered, e.g. http://127.0.0.1:8080/examples/test/cone.html

For installing the development version from GitHub, see the [documentation](https://mathics3.github.io/mathics-threejs-backend/documentation).

## Documentation and examples
You can see the documentation and more live examples [here](https://mathics3.github.io/mathics-threejs-backend).

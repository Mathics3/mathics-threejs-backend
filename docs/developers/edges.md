The edges can be drawn in 3 ways:
- [inside the primitive's shader](#shader-method)
- [in their own object](#object-method)
- [like a common geometry](#wireframe-true)

# Shader method
This is only possible for simple objects.

This is used in [cuboid](/mathics-threejs-backend/primitives/cuboid).  
The whole cuboid is colored with the following formula:

<p style="align:center">edgeFactor × cuboidColor + (1 - edgeFactor) × edgeColor</p>

When `edgeFactor` is 0 we are drawing the edge.  
If the formula be `edgeFactor == 1 ? edgeColor : diffuse` the edge would be very aliased.  
`edgeFactor` is calculated by a [method](https://jsfiddle.net/prisoner849/96npfk1r/) that [prisoner849](https://discourse.threejs.org/u/prisoner849/summary) posted [here](https://discourse.threejs.org/t/how-to-render-geometry-edges/5745).

# Object method
This is less performant but works for everything.

To draw the edges this way you need to create an `InstancedBufferAttribute`:
```js
const edgesGeometry = new InstancedBufferGeometry()
    .setAttribute(
        'position',
        new BufferAttribute(
            new Float32Array(magicNumbersArray)
        )
    )
```

To get the magic numbers, you print the automatically generated edges and Ctrl+C Ctrl+V.  
We don't use the automatically generated edges because it's slow.  
You can use the following script template to generate the edges:
```js
import { EdgesGeometry, yourObjectGeometryHere } from 'path_to_threejs';

// Generate the geometry.
// Each geometry is generated in a different way.
// See the three.js documentation for more details: https://threejs.org/docs/
const geometry = yourObjectGeometryHere();

console.log(EdgesGeometry(geometry).attributes.position.array);
```

# Wireframe true
This is the easiest way to draw edges, but it is only possible when the
edges should be in every corners, not just the hard-corners.  
e.g.: `wireframe: true` in a dodecahedron would lead to lines passing
through its faces but this works in a
[multi-face polygon](/mathics-threejs-backend/primitives/polygon).

This is slower than the [object method](#object-method) but accepts
a indexed geometry, so in some cases it can be faster, use less RAM
and be simpler than the [object method](#object-method).

This is used in [polygon](/mathics-threejs-backend/primitives/polygon).

To draw the edges this way you need to add the property `wireframe: true`
to the material of the object:
```js
const material = new ShaderMaterial({
	wireframe: true,
	...
});
```

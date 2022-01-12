There are 3 types of polygons:
- [triangular](#triangular)
- [coplanar](#coplanar)
- [non-triangular and non-coplanar, aka. multi-face](#multi-face)

# Triangular
In WebGL almost everything is a triangle, so drawing one is very easy:
```js
const geometry = new BufferGeometry().setAttribute(
    'position',
    new BufferAttribute(new Float32Array([
        ...(coords[0][0] ?? scaleCoordinate(coords[0][1], extent)),
        ...(coords[1][0] ?? scaleCoordinate(coords[1][1], extent)),
        ...(coords[2][0] ?? scaleCoordinate(coords[2][1], extent))
    ]), 3)
);
```

# Coplanar
Coplanar means that all the points of the polygon are in the same plane.  
That *doesn't* implies that all x/y/z values are going to be the same, e.g.: the points (0, 0, 0), (1, 0, 1), (1, 1, 1), (0, 1, 0) are in the same plane, but we aren't considering a polygon made by these point coplanar.  
The good news is that [earcut](https://github.com/mapbox/earcut) deals well with this type of coplanar polygons.

The current implementation also can't draw coplanar polygons with holes. We still need to implement the [even-odd rule](https://en.wikipedia.org/wiki/Even%E2%80%93odd_rule).

Both this and [multi-face](#Multi-face) lets [earcut](https://github.com/mapbox/earcut) divide the polygon into multiple triangles.  
A thing that [earcut](https://github.com/mapbox/earcut) doesn't do very well is diving coplanar 3d polygons into triangles.  
But [earcut](https://github.com/mapbox/earcut) has a 2d mode, so we convert our 3d polygon into a 2d one.

This can be done applying a quaternion:
```js
const normalVector = new Vector3(
    isXCoplanar,
    isYCoplanar,
    isZCoplanar
), normalZVector = new Vector3(0, 0, 1);

coordinate.applyQuaternion(
    new Quaternion().setFromUnitVectors(
        normalVector,
        normalZVector
    )
)
```

The code above converts the 3d coordinates into 2d ones by swapping the z value with the coplanar one.  
e.g.: if the x value is the same in all coordinates, then x and z are swapped.  
**Note**: for 2d the z value is ignored.

three.js `ShapeGeometry` then calls [earcut](https://github.com/mapbox/earcut).  

Then we need to convert the buffer of floats in `Vector3`s (almost all three.js geometries use buffers):

```js
for (let i = 0; i < coords.length; i++) {
    const coordinateVector = new Vector3(
        geometry.attributes.position.array[i * 3],
        geometry.attributes.position.array[i * 3 + 1],
        0
    )
}
```

Then we need to swap the coplanar value with z again:
```js
coordinateVector.applyQuaternion(
    new Quaternion().setFromUnitVectors(
        // See that the order of the vectors is inversed here.
        normalZVector,
        normalVector
    )
)
```

# Multi-face
The `earcut` function returns the indices of the geometry.  
A geometry can be non-indexed or indexed.  
In the 1st case, the triangles are drawn according to the `position` buffer.  
In the 2nd case, the triangles are drawn from the indices of the `position` buffer.  
e.g.: The buffer is the following:
```js
const buffer = [
    0, 0, 0, // 1st coordinate
    1, 1, 0, // 2nd coordinate
    2, 2, 0, // 3rd coordinate
    3, 3, 0, // 4th coordinate
    4, 4, 0, // 5th coordinate
    5, 5, 0  // 6th coordinate
];
```
And the indices:
```js
const indices = [
    0, 1, 2, // 1st triangle
    2, 3, 4  // 2nd triangle
]
```
The visible triangles coordinates would be:
```js
[
    // 1st triangle
    0, 0, 0,
    1, 1, 0,
    2, 2, 0,

    // 2nd triangle
    2, 2, 0,
    3, 3, 0,
    4, 4, 0
]
```
We create an indexed geometry the following way:
```js
geometry = new BufferGeometry()
    .setAttribute(
        'position',
        new BufferAttribute(
            coordinates,
            3
            )
        )
        .setIndex(
            earcut(coordinates) // the indices
        )
```

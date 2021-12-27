CHANGES
=======

dev
---

Improvements:
- Allow setting `maxSize` and `innerWidthMultiplier` from the translation layer. This was only possible to use with the "ES6 module" version of the library
- Allow setting a custom extent (#52)
- Update three.js to r136

Internals:
- Convert all materials to ShaderMaterial/RawShaderMaterial (#53)
- Move some shaders to shader.js (#54)
- Replace BoxGeometry by lower-level BufferGeometry (#56)

1.0.3
---

Improvements:
- Allow non-axis-parallel coplanar polygons. Before mathics-threejs-backend could only handle coplanar polygons with all x, y, or z coordinates the same. Now it can handle all coplanar polygons without holes

Internals:
- Replace MeshStandardMaterial by a custom ShaderMaterial in polygons
- Allow setting the port for the server (npm start-server [port])

Bug fixes:
- Stop hiding polygons behind other polygons

1.0.2
-----

Improvements:
- Update three.js to r135

Internals:
- Update BackstopJS to 6.x
- Remove duplicated error when `npm test` fails (#46)
- Add `build-fast` script for debugging purposes, this doesn't mangle the function and variable names
- Move some functions to lights.js for better organization
- Move some functions to the new axes.js file for better organization

1.0.1
-----

Fix bug in revision checking and improve warning message when revision is wrong.

1.0.0
-----

New features:
- Add `edgeForm` to cylinders (#32)
- Add cones (#38)
- Add tubes (#40)

Improvements:
- Update three.js to r132 (#32)
- Improve package.json (#26, #33)
- Improve the documentation and add live examples without downloading (#37)
- Improve protocol version checking (#41)
- Decrease spheres RAM usage
- Set spheres default radius to 1

Bug fixes:
- Fix bug in camera rotation (introduced in 0.5.2)
- Fix bug in axes
- Fix bug in arrow color
- Fix bug in the spotlight position when moving the camera around
- Remove point light's visible sphere (#24). As @axkr mentioned in #16, it isn't expected

Internals:
- More intensive use of custom shader. Custom shaders are faster and more flexible
- Split primitives.js into multiple files (#28). Thanks to @rocky for the idea
- Replace `InstancedMesh` by the lower-level `InstancedBufferGeometry`

CHANGES
=======

dev
---

Improvements:
- Update three.js to r138 (#96)

Internals:
- Rename branch master to main

1.0.5
-----

Improvements:
- Improve coplanar polygons performance (#87, #88)
- Improve cursor behavior (#90)
- Make directional lights meet Wolfram Language behavior (#69, #77)
- Improve performance of camera rotation (#77)
- Update three.js to r138 (#95)

Internals:
- Rename the script start-server to start
- Replace SphereGeometry with custom code (#81)
- Install ESLint and add "lint" script (#82)
- Replace TubeGeometry with custom code (#83)
- Replace CatmullRomCurve3 with custom code (#83)
- Convert all materials to RawShaderMaterial (#77)
- Use a custom uniform system (#77)

Bug fixes:
- Stop replacing 10.1 by 1.1 in the tick labels (#93)

1.0.4
-----

Improvements:
- Allow setting `maxSize` and `innerWidthMultiplier` from the translation layer. This was only possible to use with the "ES6 module" version of the library
- Allow setting a custom extent (#52)
- Update three.js to r136
- Add default viewpoint (#61)
- Improve performance of `uniformPolyhedron`s' edges (#62)
- Improve performance of coplanar polygons (#63)
- Improve performance of cones by ~6x (#64)
- Improve performance of arrows (#66)
- Improve performance of cylinders (#67)
- Add default colors to primitives and lights (#75)
- Improve performance of shaders by inlining some uniforms (#79)
- Update three.js to r137 (#80)

Internals:
- Convert all materials to ShaderMaterial/RawShaderMaterial (#53)
- Move some shaders to shader.js (#54)
- Replace BoxGeometry by lower-level BufferGeometry (#56)
- Update minify to version 8
- Simplify lighting structs in shaders (#76)

Documentation:
- Move the documentation to this repository and make it more interactive
- Add more examples (#59)

Bug fixes:
- Correctly calculate the bounding box for primitives with scaled coordinates and radius bigger than the bounding box (#60)
- Fix cones lighting (#65)
- Scale axes ticks position (#74)

1.0.3
-----

Improvements:
- Allow non-axis-parallel coplanar polygons. Before mathics-threejs-backend could only handle coplanar polygons with all x, y, or z coordinates the same. Now it can handle all coplanar polygons without holes

Internals:
- Replace MeshStandardMaterial with a custom ShaderMaterial in polygons
- Allow setting the port for the server (npm run start-server [port])

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
- Replace `InstancedMesh` with the lower-level `InstancedBufferGeometry`

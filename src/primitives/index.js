// This file exports implmentations using three.js of Mathematica and
// Mathics Graphics3D primitives like "Sphere", or "Cuboid, etc.

// A full list of primitives that this might grow to can be found at:
// https://reference.wolfram.com/language/ref/Graphics3D.html

// Each primitive function takes 4 parameters and returns a three.js
// object.

// The 1st parameter is the primitive object (an element of
// the elements array).

// The 2nd parameter is the uniforms buffer, read the comments from
// src/uniforms.js for more information.

// The 3rd parameter is the extent, it is used in scaleCoordinate,
// but it can be used for calculating border size, radius, ...

// The 4th parameter is the canvasSize, it is used for e.g. calculating the
// points size.

// Note that Graphics3D includes a number of 1D and 2D kinds of
// objects, like Point, Line, Arrow, or Polygon which are extended
// into 3D.

// Also note that in contrast to he Mathematica/Mathics name, we
// downcase the first letter of the corresponding name.  For example,
// we use the function name "sphere" and "uniformPolyhedron", not
// "Sphere" and "UnformPolyhedron".

// Usually the vertices are stored in the attribute "position".

// The vertex shader is executed for each vertex
// e.g.: if we have an attribute "position" with 3 vertices, each with 3 values: x, y and z, the vertex shader would be executed 3 times.
// All the attributes need to have the same number of elements.
// If a geometry has an attribute "position" with 3 vertices and an attribute "color" with 3 colors, the vertex shader would be executed 3 times.

// The BufferAttributes are shared for all InstancedBufferGeometry instances.
// The InstancedBufferAttributes are shared for vertices of a instance InstancedBufferGeometry instance.

// The fragment shader is executed for every pixel in the primitive.

// "depthWrite: opacity === 1" fixes a bug that occurs when you rotate the camera and the transparency is removed from the primitive.

// "transparent: opacity !== 1" just lets transparent the primitives that have opacity different than 100%, thus improving the performance of opaque primitives.

// "object.frustumCulled = false" without this instanced objects disappear when the zoom is big.

import arrow from './arrow.js';
import cone from './cone.js';
import cuboid from './cuboid.js';
import cylinder from './cylinder.js';
import line from './line.js';
import point from './point.js';
import polygon from './polygon.js';
import sphere from './sphere.js';
import tube from './tube.js';
import uniformPolyhedron from './uniformPolyhedron.js';

export default {
	arrow,
	cone,
	cuboid,
	cylinder,
	line,
	point,
	polygon,
	sphere,
	tube,
	uniformPolyhedron
};

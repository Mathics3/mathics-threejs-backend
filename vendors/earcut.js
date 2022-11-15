export default function (data, dim = 3) {
	let outerNode = linkedList(data, 0, data.length, dim, true), triangles = [];

	earcutLinked(outerNode, triangles, dim);

	return triangles;
}

// create a circular doubly linked list from polygon points in the specified winding order
function linkedList(data, start, end, dim) {
	let i, last;

	if (signedArea(data, start, end, dim) > 0) {
		for (i = start; i < end; i += dim) last = insertNode(i, data[i], data[i + 1], last);
	} else {
		for (i = end - dim; i >= start; i -= dim) last = insertNode(i, data[i], data[i + 1], last);
	}

	if (last && equals(last, last.next)) {
		removeNode(last);
		last = last.next;
	}

	return last;
}

// eliminate colinear or duplicate points
function filterPoints(start, end) {
	if (!start) return start;
	if (!end) end = start;

	let p = start, again;

	do {
		again = false;

		if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
			removeNode(p);
			p = end = p.prev;
			if (p === p.next) break;
			again = true;

		} else {
			p = p.next;
		}
	} while (again || p !== end);

	return end;
}

// main ear slicing loop which triangulates a polygon (given as a linked list)
function earcutLinked(ear, triangles, dim, minX, minY, pass) {
	if (!ear) return;

	let stop = ear, prev, next;

	// iterate through ears, slicing them one by one
	while (ear.prev !== ear.next) {
		prev = ear.prev;
		next = ear.next;

		if (isEar(ear)) {
			// cut off the triangle
			triangles.push(prev.i / dim);
			triangles.push(ear.i / dim);
			triangles.push(next.i / dim);

			removeNode(ear);

			// skipping the next vertex leads to less sliver triangles
			ear = next.next;
			stop = next.next;

			continue;
		}

		ear = next;

		// if we looped through the whole remaining polygon and can't find any more ears
		if (ear === stop) {
			// try filtering points and slicing again
			if (!pass) {
				earcutLinked(filterPoints(ear), triangles, dim, minX, minY, 1);

				// if this didn't work, try curing all small self-intersections locally
			} else if (pass === 1) {
				ear = cureLocalIntersections(filterPoints(ear), triangles, dim);
				earcutLinked(ear, triangles, dim, minX, minY, 2);

				// as a last resort, try splitting the remaining polygon into two
			} else if (pass === 2) {
				splitEarcut(ear, triangles, dim, minX, minY);
			}

			break;
		}
	}
}

// check whether a polygon node forms a valid ear with adjacent nodes
function isEar(ear) {
	let a = ear.prev, b = ear, c = ear.next;

	if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

	// now make sure we don't have other points inside the potential ear
	let p = ear.next.next;

	while (p !== ear.prev) {
		if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
			area(p.prev, p, p.next) >= 0) return false;
		p = p.next;
	}

	return true;
}

// go through all polygon nodes and cure small local self-intersections
function cureLocalIntersections(start, triangles, dim) {
	let p = start;
	do {
		let a = p.prev,
			b = p.next.next;

		if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {

			triangles.push(a.i / dim);
			triangles.push(p.i / dim);
			triangles.push(b.i / dim);

			// remove two nodes involved
			removeNode(p);
			removeNode(p.next);

			p = start = b;
		}
		p = p.next;
	} while (p !== start);

	return filterPoints(p);
}

// try splitting polygon into two and triangulate them independently
function splitEarcut(start, triangles, dim, minX, minY) {
	// look for a valid diagonal that divides the polygon into two
	let a = start;
	do {
		let b = a.next.next;
		while (b !== a.prev) {
			if (a.i !== b.i && isValidDiagonal(a, b)) {
				// split the polygon in two by the diagonal
				let c = splitPolygon(a, b);

				// filter colinear points around the cuts
				a = filterPoints(a, a.next);
				c = filterPoints(c, c.next);

				// run earcut on each half
				earcutLinked(a, triangles, dim, minX, minY);
				earcutLinked(c, triangles, dim, minX, minY);
				return;
			}
			b = b.next;
		}
		a = a.next;
	} while (a !== start);
}

// check if a point lies within a convex triangle
function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
	return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 &&
		(ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 &&
		(bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
}

// check if a diagonal between two polygon nodes is valid (lies in polygon interior)
function isValidDiagonal(a, b) {
	return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) && // doesn't intersect other edges
		(locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b) && // locally visible
			(area(a.prev, a, b.prev) || area(a, b.prev, b)) || // does not create opposite-facing sectors
			equals(a, b) && area(a.prev, a, a.next) > 0 && area(b.prev, b, b.next) > 0); // special zero-length case
}

// signed area of a triangle
function area(p, q, r) {
	return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}

// check if two points are equal
function equals(p1, p2) {
	return p1.x === p2.x && p1.y === p2.y;
}

// check if two segments intersect
function intersects(p1, q1, p2, q2) {
	const o1 = sign(area(p1, q1, p2));
	const o2 = sign(area(p1, q1, q2));
	const o3 = sign(area(p2, q2, p1));
	const o4 = sign(area(p2, q2, q1));

	if (o1 !== o2 && o3 !== o4) return true; // general case

	if (o1 === 0 && onSegment(p1, p2, q1)) return true; // p1, q1 and p2 are collinear and p2 lies on p1q1
	if (o2 === 0 && onSegment(p1, q2, q1)) return true; // p1, q1 and q2 are collinear and q2 lies on p1q1
	if (o3 === 0 && onSegment(p2, p1, q2)) return true; // p2, q2 and p1 are collinear and p1 lies on p2q2
	if (o4 === 0 && onSegment(p2, q1, q2)) return true; // p2, q2 and q1 are collinear and q1 lies on p2q2

	return false;
}

// for collinear points p, q, r, check if point q lies on segment pr
function onSegment(p, q, r) {
	return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
}

function sign(num) {
	return num > 0 ? 1 : num < 0 ? -1 : 0;
}

// check if a polygon diagonal intersects any polygon segments
function intersectsPolygon(a, b) {
	let p = a;

	do {
		if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i &&
			intersects(p, p.next, a, b)) return true;
		p = p.next;
	} while (p !== a);

	return false;
}

// check if a polygon diagonal is locally inside the polygon
function locallyInside(a, b) {
	return area(a.prev, a, a.next) < 0 ?
		area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 :
		area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
}

// check if the middle point of a polygon diagonal is inside the polygon
function middleInside(a, b) {
	let p = a,
		inside = false,
		px = (a.x + b.x) / 2,
		py = (a.y + b.y) / 2;

	do {
		if (((p.y > py) !== (p.next.y > py)) && p.next.y !== p.y &&
			(px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x))
			inside = !inside;
		p = p.next;
	} while (p !== a);

	return inside;
}

// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
// if one belongs to the outer ring and another to a hole, it merges it into a single ring
function splitPolygon(a, b) {
	let a2 = new Node(a.i, a.x, a.y),
		b2 = new Node(b.i, b.x, b.y),
		an = a.next,
		bp = b.prev;

	a.next = b;
	b.prev = a;

	a2.next = an;
	an.prev = a2;

	b2.next = a2;
	a2.prev = b2;

	bp.next = b2;
	b2.prev = bp;

	return b2;
}

// create a node and optionally link it with previous one (in a circular doubly linked list)
function insertNode(i, x, y, last) {
	let p = new Node(i, x, y);

	if (!last) {
		p.prev = p;
		p.next = p;

	} else {
		p.next = last.next;
		p.prev = last;
		last.next.prev = p;
		last.next = p;
	}
	return p;
}

function removeNode(p) {
	p.next.prev = p.prev;
	p.prev.next = p.next;

	if (p.prevZ) p.prevZ.nextZ = p.nextZ;
	if (p.nextZ) p.nextZ.prevZ = p.prevZ;
}

function Node(i, x, y) {
	// vertex index in coordinates array
	this.i = i;

	// vertex coordinates
	this.x = x;
	this.y = y;

	// previous and next vertex nodes in a polygon ring
	this.prev = null;
	this.next = null;

	// z-order curve value
	this.z = null;

	// previous and next nodes in z-order
	this.prevZ = null;
	this.nextZ = null;

	// indicates whether this is a steiner point
	this.steiner = false;
}

function signedArea(data, start, end, dim) {
	let sum = 0;

	for (let i = start, j = end - dim; i < end; i += dim) {
		sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
		j = i;
	}

	return sum;
}

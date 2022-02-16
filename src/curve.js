import {
	Matrix4,
	Vector3
} from '../vendors/three.js';

import { scaleCoordinate } from './coordinateUtils.js';
import { clamp, CubicPoly } from './math.js';

const temporaryVector = new Vector3();

// Modified from three.js CatmullRomCurve3
export function getCentripetalCurve(coordinates) {
	const points = coordinates.map((coordinate) => new Vector3(
		...(coordinate[0] ?? scaleCoordinate(coordinate[1], extent))
	));

	const arcLengths = [0];

	let current, last = getPoint(0);
	let sum = 0;

	for (let p = 1; p <= 200; p++) {
		current = getPoint(p / 200);
		sum += current.distanceTo(last);
		arcLengths.push(sum);
		last = current;
	}

	function getPoint(t) {
		const px = new CubicPoly(), py = new CubicPoly(), pz = new CubicPoly();

		const p = (points.length - 1) * t;
		let intPoint = Math.floor(p);
		let weight = p - intPoint;

		if (weight === 0 && intPoint === points.length - 1) {
			intPoint = points.length - 2;
			weight = 1;
		}

		let p0, p3; // 4 points (p1 & p2 defined below)

		if (intPoint > 0) {
			p0 = points[(intPoint - 1) % points.length];
		} else {
			// Extrapolate first point.
			temporaryVector.subVectors(points[0], points[1]).add(points[0]);
			p0 = temporaryVector;
		}

		const p1 = points[intPoint % points.length];
		const p2 = points[(intPoint + 1) % points.length];

		if (intPoint + 2 < points.length) {
			p3 = points[(intPoint + 2) % points.length];
		} else {
			// Extrapolate last point.
			temporaryVector.subVectors(
				points[points.length - 1],
				points[points.length - 2]
			).add(points[points.length - 1]);

			p3 = temporaryVector;
		}

		// Init centripetal.
		let dt0 = p0.distanceToSquared(p1) ** 0.25;
		let dt1 = p1.distanceToSquared(p2) ** 0.25;
		let dt2 = p2.distanceToSquared(p3) ** 0.25;

		// Safety check for repeated points.
		if (dt1 < 1e-4) dt1 = 1.0;
		if (dt0 < 1e-4) dt0 = dt1;
		if (dt2 < 1e-4) dt2 = dt1;

		px.initNonuniformCatmullRom(p0.x, p1.x, p2.x, p3.x, dt0, dt1, dt2);
		py.initNonuniformCatmullRom(p0.y, p1.y, p2.y, p3.y, dt0, dt1, dt2);
		pz.initNonuniformCatmullRom(p0.z, p1.z, p2.z, p3.z, dt0, dt1, dt2);

		return new Vector3(
			px.calc(weight),
			py.calc(weight),
			pz.calc(weight)
		);
	}

	// Returns a unit vector tangent at t.
	// In case any sub curve does not implement its tangent derivation,
	// 2 points a small delta apart will be used to find its gradient
	// which seems to give a reasonable approximation.
	function getTangent(t) {
		const delta = 0.0001;
		let t1 = t - delta;
		let t2 = t + delta;

		// t1 and t2 must be in the range [0, 1].
		if (t1 < 0) t1 = 0;
		if (t2 > 1) t2 = 1;

		const pt1 = getPoint(t1);
		const pt2 = getPoint(t2);

		return pt2.clone().sub(pt1).normalize();
	}

	function getUtoTmapping(u) {
		let i = 0;

		// the targeted u distance value to get
		const targetArcLength = u * arcLengths[arcLengths.length - 1];

		// Binary search for the index with largest value
		// smaller than target u distance.

		let low = 0, high = arcLengths.length - 1, comparison;

		while (low <= high) {
			i = Math.floor((low + high) / 2);

			comparison = arcLengths[i] - targetArcLength;

			if (comparison < 0) {
				low = i + 1;
			} else if (comparison > 0) {
				high = i - 1;
			} else {
				high = i;
				break;
			}
		}

		if (arcLengths[i] === targetArcLength) {
			return i / (arcLengths.length - 1);
		}

		// We could get finer grain at lengths, or use simple interpolation
		// between two points.
		const lengthBefore = arcLengths[i];
		const lengthAfter = arcLengths[i + 1];

		const segmentLength = lengthAfter - lengthBefore;

		// Determine where we are between the 'before' and 'after' points.
		const segmentFraction = (targetArcLength - lengthBefore) / segmentLength;

		// Add that fractional amount.
		return (i + segmentFraction) / (arcLengths.length - 1);
	}

	return {
		getPoint,
		getPointAt(u) {
			return getPoint(getUtoTmapping(u));
		},
		computeFrenetFrames(segments) {
			const vector = new Vector3();
			const matrix = new Matrix4();

			const tangents = new Array(segments + 1);
			const normals = new Array(segments + 1);
			const binormals = new Array(segments + 1);

			normals[0] = new Vector3();
			binormals[0] = new Vector3();

			// Compute the tangent vectors for each segment on the curve.
			for (let i = 0; i <= segments; i++) {
				tangents[i] = getTangent(getUtoTmapping(i / segments));
			}

			// Select an initial normal vector perpendicular to the 1st
			// tangent vector, and in the direction of the minimum
			// tangent xyz component.
			let min = Number.MAX_VALUE;

			const tx = Math.abs(tangents[0].x);
			const ty = Math.abs(tangents[0].y);
			const tz = Math.abs(tangents[0].z);

			if (tx <= min) {
				min = tx;
				vector.set(1, 0, 0);
			}

			if (ty <= min) {
				min = ty;
				vector.set(0, 1, 0);
			}

			if (tz <= min) {
				vector.set(0, 0, 1);
			}

			vector.crossVectors(tangents[0], vector).normalize();

			normals[0].crossVectors(tangents[0], vector);
			binormals[0].crossVectors(tangents[0], normals[0]);

			// Compute the slowly-varying normal and binormal vectors
			// for each segment on the curve.
			for (let i = 1; i <= segments; i++) {
				normals[i] = normals[i - 1].clone();

				binormals[i] = binormals[i - 1].clone();

				vector.crossVectors(tangents[i - 1], tangents[i]);

				if (vector.length() > Number.EPSILON) {
					const theta = Math.acos(
						// clamp for floating point errors.
						clamp(tangents[i - 1].dot(tangents[i]), -1, 1)
					);

					normals[i].applyMatrix4(
						matrix.makeRotationAxis(vector.normalize(), theta)
					);
				}

				binormals[i].crossVectors(tangents[i], normals[i]);
			}

			return {
				normals: normals,
				binormals: binormals
			};
		}
	};
}

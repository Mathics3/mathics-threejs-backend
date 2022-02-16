export function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
}

export function CubicPoly() {
	let c0 = 0, c1 = 0, c2 = 0, c3 = 0;

	// Compute coefficients for a cubic polynomial
	//  p(s) = c0 + c1 * s + c2 * s^2 + c3 * s^3
	// such that
	//  p(0) = x0, p(1) = x1
	// and
	//  p'(0) = t0, p'(1) = t1.
	function init(x0, x1, t0, t1) {
		c0 = x0;
		c1 = t0;
		c2 = -3 * x0 + 3 * x1 - 2 * t0 - t1;
		c3 = 2 * x0 - 2 * x1 + t0 + t1;
	}

	return {
		initNonuniformCatmullRom: function (x0, x1, x2, x3, dt0, dt1, dt2) {
			// compute tangents when parameterized in [t1, t2]
			let t1 = (x1 - x0) / dt0 - (x2 - x0) / (dt0 + dt1) + (x2 - x1) / dt1;
			let t2 = (x2 - x1) / dt1 - (x3 - x1) / (dt1 + dt2) + (x3 - x2) / dt2;

			// rescale tangents for parametrization in [0, 1]
			t1 *= dt1;
			t2 *= dt1;

			init(x1, x2, t1, t2);
		},
		calc: function (t) {
			const t2 = t * t;
			const t3 = t2 * t;
			return c0 + c1 * t + c2 * t2 + c3 * t3;
		}
	};
}

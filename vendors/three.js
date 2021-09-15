/**
 * @license
 * Copyright 2010-2021 Three.js Authors
 * SPDX-License-Identifier: MIT
 */

import earcut from './earcut.js';

const CullFaceNone = 0;
const CullFaceBack = 1;
const CullFaceFront = 2;
const PCFShadowMap = 1;
const VSMShadowMap = 3;
const FrontSide = 0;
const BackSide = 1;
const DoubleSide = 2;
const NoBlending = 0;
const NormalBlending = 1;
const AdditiveBlending = 2;
const SubtractiveBlending = 3;
const MultiplyBlending = 4;
const CustomBlending = 5;
const AddEquation = 100;
const SubtractEquation = 101;
const ReverseSubtractEquation = 102;
const MinEquation = 103;
const MaxEquation = 104;
const ZeroFactor = 200;
const OneFactor = 201;
const SrcColorFactor = 202;
const OneMinusSrcColorFactor = 203;
const SrcAlphaFactor = 204;
const OneMinusSrcAlphaFactor = 205;
const DstAlphaFactor = 206;
const OneMinusDstAlphaFactor = 207;
const DstColorFactor = 208;
const OneMinusDstColorFactor = 209;
const SrcAlphaSaturateFactor = 210;
const NeverDepth = 0;
const AlwaysDepth = 1;
const LessDepth = 2;
const LessEqualDepth = 3;
const EqualDepth = 4;
const GreaterEqualDepth = 5;
const GreaterDepth = 6;
const NotEqualDepth = 7;
const MultiplyOperation = 0;
const MixOperation = 1;
const AddOperation = 2;
const NoToneMapping = 0;
const LinearToneMapping = 1;
const ReinhardToneMapping = 2;
const CineonToneMapping = 3;
const ACESFilmicToneMapping = 4;
const CustomToneMapping = 5;

const CubeReflectionMapping = 301;
const CubeRefractionMapping = 302;
const CubeUVReflectionMapping = 306;
const CubeUVRefractionMapping = 307;
const RepeatWrapping = 1000;
const ClampToEdgeWrapping = 1001;
const MirroredRepeatWrapping = 1002;
const NearestFilter = 1003;
const NearestMipmapNearestFilter = 1004;
const NearestMipmapLinearFilter = 1005;
const LinearFilter = 1006;
const LinearMipmapNearestFilter = 1007;
const UnsignedByteType = 1009;
const ByteType = 1010;
const ShortType = 1011;
const UnsignedShortType = 1012;
const IntType = 1013;
const UnsignedIntType = 1014;
const FloatType = 1015;
const HalfFloatType = 1016;
const UnsignedShort4444Type = 1017;
const UnsignedShort5551Type = 1018;
const UnsignedShort565Type = 1019;
const UnsignedInt248Type = 1020;
const AlphaFormat = 1021;
const RGBFormat = 1022;
const RGBAFormat = 1023;
const LuminanceFormat = 1024;
const LuminanceAlphaFormat = 1025;
const DepthFormat = 1026;
const DepthStencilFormat = 1027;
const RedFormat = 1028;
const RedIntegerFormat = 1029;
const RGFormat = 1030;
const RGIntegerFormat = 1031;
const RGBIntegerFormat = 1032;
const RGBAIntegerFormat = 1033;

const RGB_S3TC_DXT1_Format = 33776;
const RGBA_S3TC_DXT1_Format = 33777;
const RGBA_S3TC_DXT3_Format = 33778;
const RGBA_S3TC_DXT5_Format = 33779;
const RGB_PVRTC_4BPPV1_Format = 35840;
const RGB_PVRTC_2BPPV1_Format = 35841;
const RGBA_PVRTC_4BPPV1_Format = 35842;
const RGBA_PVRTC_2BPPV1_Format = 35843;
const RGB_ETC1_Format = 36196;
const RGB_ETC2_Format = 37492;
const RGBA_ETC2_EAC_Format = 37496;
const RGBA_ASTC_4x4_Format = 37808;
const RGBA_ASTC_5x4_Format = 37809;
const RGBA_ASTC_5x5_Format = 37810;
const RGBA_ASTC_6x5_Format = 37811;
const RGBA_ASTC_6x6_Format = 37812;
const RGBA_ASTC_8x5_Format = 37813;
const RGBA_ASTC_8x6_Format = 37814;
const RGBA_ASTC_8x8_Format = 37815;
const RGBA_ASTC_10x5_Format = 37816;
const RGBA_ASTC_10x6_Format = 37817;
const RGBA_ASTC_10x8_Format = 37818;
const RGBA_ASTC_10x10_Format = 37819;
const RGBA_ASTC_12x10_Format = 37820;
const RGBA_ASTC_12x12_Format = 37821;
const RGBA_BPTC_Format = 36492;
const SRGB8_ALPHA8_ASTC_4x4_Format = 37840;
const SRGB8_ALPHA8_ASTC_5x4_Format = 37841;
const SRGB8_ALPHA8_ASTC_5x5_Format = 37842;
const SRGB8_ALPHA8_ASTC_6x5_Format = 37843;
const SRGB8_ALPHA8_ASTC_6x6_Format = 37844;
const SRGB8_ALPHA8_ASTC_8x5_Format = 37845;
const SRGB8_ALPHA8_ASTC_8x6_Format = 37846;
const SRGB8_ALPHA8_ASTC_8x8_Format = 37847;
const SRGB8_ALPHA8_ASTC_10x5_Format = 37848;
const SRGB8_ALPHA8_ASTC_10x6_Format = 37849;
const SRGB8_ALPHA8_ASTC_10x8_Format = 37850;
const SRGB8_ALPHA8_ASTC_10x10_Format = 37851;
const SRGB8_ALPHA8_ASTC_12x10_Format = 37852;
const SRGB8_ALPHA8_ASTC_12x12_Format = 37853;
const AdditiveAnimationBlendMode = 2501;
const LinearEncoding = 3000;
const sRGBEncoding = 3001;
const GammaEncoding = 3007;
const RGBEEncoding = 3002;
const LogLuvEncoding = 3003;
const RGBM7Encoding = 3004;
const RGBM16Encoding = 3005;
const RGBDEncoding = 3006;
const TangentSpaceNormalMap = 0;
const ObjectSpaceNormalMap = 1;

const KeepStencilOp = 7680;
const AlwaysStencilFunc = 519;

const StaticDrawUsage = 35044;
const GLSL3 = '300 es';

class EventDispatcher {
	addEventListener(type, listener) {
		if (this._listeners === undefined) {
			this._listeners = {};
		}

		const listeners = this._listeners;

		if (listeners[type] === undefined) {
			listeners[type] = [];
		}

		if (listeners[type].indexOf(listener) === -1) {
			listeners[type].push(listener);
		}
	}

	removeEventListener(type, listener) {

		if (this._listeners === undefined) {
			return;
		}

		const listeners = this._listeners;
		const listenerArray = listeners[type];

		if (listenerArray !== undefined) {

			const index = listenerArray.indexOf(listener);

			if (index !== -1) {

				listenerArray.splice(index, 1);

			}

		}

	}

	dispatchEvent(event) {

		if (this._listeners === undefined) {
			return;
		}

		const listeners = this._listeners;
		const listenerArray = listeners[event.type];

		if (listenerArray !== undefined) {

			event.target = this;

			// Make a copy, in case listeners are removed while iterating.
			const array = listenerArray.slice(0);

			for (let i = 0, l = array.length; i < l; i++) {

				array[i].call(this, event);

			}

			event.target = null;

		}

	}

}

const _lut = [];

for (let i = 0; i < 256; i++) {
	_lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
}

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;

// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
function generateUUID() {
	const d0 = Math.random() * 0xffffffff | 0;
	const d1 = Math.random() * 0xffffffff | 0;
	const d2 = Math.random() * 0xffffffff | 0;
	const d3 = Math.random() * 0xffffffff | 0;
	const uuid = _lut[d0 & 0xff] + _lut[d0 >> 8 & 0xff] + _lut[d0 >> 16 & 0xff] + _lut[d0 >> 24 & 0xff] + '-' +
		_lut[d1 & 0xff] + _lut[d1 >> 8 & 0xff] + '-' + _lut[d1 >> 16 & 0x0f | 0x40] + _lut[d1 >> 24 & 0xff] + '-' +
		_lut[d2 & 0x3f | 0x80] + _lut[d2 >> 8 & 0xff] + '-' + _lut[d2 >> 16 & 0xff] + _lut[d2 >> 24 & 0xff] +
		_lut[d3 & 0xff] + _lut[d3 >> 8 & 0xff] + _lut[d3 >> 16 & 0xff] + _lut[d3 >> 24 & 0xff];

	// .toUpperCase() here flattens concatenated strings to save heap memory space.
	return uuid.toUpperCase();
}

function clamp(value, min, max) {

	return Math.max(min, Math.min(max, value));

}

// https://en.wikipedia.org/wiki/Linear_interpolation
function lerp(x, y, t) {
	return (1 - t) * x + t * y;
}

function isPowerOfTwo(value) {
	return (value & (value - 1)) === 0 && value !== 0;
}

class Vector2 {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	set(x, y) {
		this.x = x;
		this.y = y;

		return this;
	}

	clone() {
		return new this.constructor(this.x, this.y);
	}

	copy(v) {
		this.x = v.x;
		this.y = v.y;

		return this;
	}

	add(v) {
		this.x += v.x;
		this.y += v.y;

		return this;
	}

	sub(v) {
		this.x -= v.x;
		this.y -= v.y;

		return this;
	}

	multiplyScalar(scalar) {
		this.x *= scalar;
		this.y *= scalar;

		return this;
	}

	equals(v) {
		return ((v.x === this.x) && (v.y === this.y));
	}
}

class Matrix3 {
	constructor() {
		this.elements = [

			1, 0, 0,
			0, 1, 0,
			0, 0, 1

		];
	}

	set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
		const te = this.elements;

		te[0] = n11; te[1] = n21; te[2] = n31;
		te[3] = n12; te[4] = n22; te[5] = n32;
		te[6] = n13; te[7] = n23; te[8] = n33;

		return this;
	}

	setFromMatrix4(m) {
		const me = m.elements;

		this.set(
			me[0], me[4], me[8], me[1], me[5], me[9], me[2], me[6], me[10]
		);

		return this;
	}

	multiply(m) {

		return this.multiplyMatrices(this, m);

	}

	invert() {
		const te = this.elements,

			n11 = te[0], n21 = te[1], n31 = te[2],
			n12 = te[3], n22 = te[4], n32 = te[5],
			n13 = te[6], n23 = te[7], n33 = te[8],

			t11 = n33 * n22 - n32 * n23,
			t12 = n32 * n13 - n33 * n12,
			t13 = n23 * n12 - n22 * n13,

			det = n11 * t11 + n21 * t12 + n31 * t13;

		if (det === 0) {
			return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
		}

		const detInv = 1 / det;

		te[0] = t11 * detInv;
		te[1] = (n31 * n23 - n33 * n21) * detInv;
		te[2] = (n32 * n21 - n31 * n22) * detInv;

		te[3] = t12 * detInv;
		te[4] = (n33 * n11 - n31 * n13) * detInv;
		te[5] = (n31 * n12 - n32 * n11) * detInv;

		te[6] = t13 * detInv;
		te[7] = (n21 * n13 - n23 * n11) * detInv;
		te[8] = (n22 * n11 - n21 * n12) * detInv;

		return this;
	}

	transpose() {
		let tmp;
		const m = this.elements;

		tmp = m[1]; m[1] = m[3]; m[3] = tmp;
		tmp = m[2]; m[2] = m[6]; m[6] = tmp;
		tmp = m[5]; m[5] = m[7]; m[7] = tmp;

		return this;
	}

	getNormalMatrix(matrix4) {
		return this.setFromMatrix4(matrix4).invert().transpose();
	}

	fromArray(array, offset = 0) {
		for (let i = 0; i < 9; i++) {

			this.elements[i] = array[i + offset];

		}

		return this;
	}

	clone() {
		return new this.constructor().fromArray(this.elements);
	}
}

class Vector4 {

	constructor(x = 0, y = 0, z = 0, w = 1) {

		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;

	}

	get width() {

		return this.z;

	}

	set width(value) {

		this.z = value;

	}

	get height() {

		return this.w;

	}

	set height(value) {

		this.w = value;

	}

	set(x, y, z, w) {

		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;

		return this;

	}

	setScalar(scalar) {

		this.x = scalar;
		this.y = scalar;
		this.z = scalar;
		this.w = scalar;

		return this;

	}

	setX(x) {

		this.x = x;

		return this;

	}

	setY(y) {

		this.y = y;

		return this;

	}

	setZ(z) {

		this.z = z;

		return this;

	}

	setW(w) {

		this.w = w;

		return this;

	}

	setComponent(index, value) {
		switch (index) {
			case 0: this.x = value; break;
			case 1: this.y = value; break;
			case 2: this.z = value; break;
			case 3: this.w = value; break;
		}

		return this;
	}

	getComponent(index) {

		switch (index) {

			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			case 3: return this.w;
			default: throw new Error('index is out of range: ' + index);

		}

	}

	clone() {

		return new this.constructor(this.x, this.y, this.z, this.w);

	}

	copy(v) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		this.w = (v.w !== undefined) ? v.w : 1;

		return this;

	}

	add(v) {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		this.w += v.w;

		return this;
	}

	addScalar(s) {

		this.x += s;
		this.y += s;
		this.z += s;
		this.w += s;

		return this;

	}

	addVectors(a, b) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;
		this.w = a.w + b.w;

		return this;

	}

	addScaledVector(v, s) {

		this.x += v.x * s;
		this.y += v.y * s;
		this.z += v.z * s;
		this.w += v.w * s;

		return this;

	}

	sub(v) {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		this.w -= v.w;

		return this;

	}

	subScalar(s) {

		this.x -= s;
		this.y -= s;
		this.z -= s;
		this.w -= s;

		return this;

	}

	subVectors(a, b) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
		this.w = a.w - b.w;

		return this;

	}

	multiply(v) {

		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;
		this.w *= v.w;

		return this;

	}

	multiplyScalar(scalar) {

		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;
		this.w *= scalar;

		return this;

	}

	applyMatrix4(m) {

		const x = this.x, y = this.y, z = this.z, w = this.w;
		const e = m.elements;

		this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
		this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
		this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
		this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;

		return this;

	}

	divideScalar(scalar) {

		return this.multiplyScalar(1 / scalar);

	}

	setAxisAngleFromQuaternion(q) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm

		// q is assumed to be normalized

		this.w = 2 * Math.acos(q.w);

		const s = Math.sqrt(1 - q.w * q.w);

		if (s < 0.0001) {

			this.x = 1;
			this.y = 0;
			this.z = 0;

		} else {

			this.x = q.x / s;
			this.y = q.y / s;
			this.z = q.z / s;

		}

		return this;

	}

	setAxisAngleFromRotationMatrix(m) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		let angle, x, y, z; // variables for result
		const epsilon = 0.01,		// margin to allow for rounding errors
			epsilon2 = 0.1,		// margin to distinguish between 0 and 180 degrees

			te = m.elements,

			m11 = te[0], m12 = te[4], m13 = te[8],
			m21 = te[1], m22 = te[5], m23 = te[9],
			m31 = te[2], m32 = te[6], m33 = te[10];

		if ((Math.abs(m12 - m21) < epsilon) &&
			(Math.abs(m13 - m31) < epsilon) &&
			(Math.abs(m23 - m32) < epsilon)) {

			// singularity found
			// first check for identity matrix which must have +1 for all terms
			// in leading diagonal and zero in other terms

			if ((Math.abs(m12 + m21) < epsilon2) &&
				(Math.abs(m13 + m31) < epsilon2) &&
				(Math.abs(m23 + m32) < epsilon2) &&
				(Math.abs(m11 + m22 + m33 - 3) < epsilon2)) {

				// this singularity is identity matrix so angle = 0

				this.set(1, 0, 0, 0);

				return this; // zero angle, arbitrary axis

			}

			// otherwise this singularity is angle = 180

			angle = Math.PI;

			const xx = (m11 + 1) / 2;
			const yy = (m22 + 1) / 2;
			const zz = (m33 + 1) / 2;
			const xy = (m12 + m21) / 4;
			const xz = (m13 + m31) / 4;
			const yz = (m23 + m32) / 4;

			if ((xx > yy) && (xx > zz)) {

				// m11 is the largest diagonal term

				if (xx < epsilon) {

					x = 0;
					y = 0.707106781;
					z = 0.707106781;

				} else {

					x = Math.sqrt(xx);
					y = xy / x;
					z = xz / x;

				}

			} else if (yy > zz) {

				// m22 is the largest diagonal term

				if (yy < epsilon) {

					x = 0.707106781;
					y = 0;
					z = 0.707106781;

				} else {

					y = Math.sqrt(yy);
					x = xy / y;
					z = yz / y;

				}

			} else {

				// m33 is the largest diagonal term so base result on this

				if (zz < epsilon) {

					x = 0.707106781;
					y = 0.707106781;
					z = 0;

				} else {

					z = Math.sqrt(zz);
					x = xz / z;
					y = yz / z;

				}

			}

			this.set(x, y, z, angle);

			return this; // return 180 deg rotation

		}

		// as we have reached here there are no singularities so we can handle normally

		let s = Math.sqrt((m32 - m23) * (m32 - m23) +
			(m13 - m31) * (m13 - m31) +
			(m21 - m12) * (m21 - m12)); // used to normalize

		if (Math.abs(s) < 0.001) {
			s = 1;
		}

		// prevent divide by zero, should not happen if matrix is orthogonal and should be
		// caught by singularity test above, but I've left it in just in case

		this.x = (m32 - m23) / s;
		this.y = (m13 - m31) / s;
		this.z = (m21 - m12) / s;
		this.w = Math.acos((m11 + m22 + m33 - 1) / 2);

		return this;

	}

	min(v) {

		this.x = Math.min(this.x, v.x);
		this.y = Math.min(this.y, v.y);
		this.z = Math.min(this.z, v.z);
		this.w = Math.min(this.w, v.w);

		return this;

	}

	max(v) {

		this.x = Math.max(this.x, v.x);
		this.y = Math.max(this.y, v.y);
		this.z = Math.max(this.z, v.z);
		this.w = Math.max(this.w, v.w);

		return this;

	}

	clamp(min, max) {

		// assumes min < max, componentwise

		this.x = Math.max(min.x, Math.min(max.x, this.x));
		this.y = Math.max(min.y, Math.min(max.y, this.y));
		this.z = Math.max(min.z, Math.min(max.z, this.z));
		this.w = Math.max(min.w, Math.min(max.w, this.w));

		return this;

	}

	clampScalar(minVal, maxVal) {

		this.x = Math.max(minVal, Math.min(maxVal, this.x));
		this.y = Math.max(minVal, Math.min(maxVal, this.y));
		this.z = Math.max(minVal, Math.min(maxVal, this.z));
		this.w = Math.max(minVal, Math.min(maxVal, this.w));

		return this;

	}

	clampLength(min, max) {

		const length = this.length();

		return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));

	}

	floor() {

		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		this.z = Math.floor(this.z);
		this.w = Math.floor(this.w);

		return this;

	}

	ceil() {

		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
		this.z = Math.ceil(this.z);
		this.w = Math.ceil(this.w);

		return this;

	}

	round() {

		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		this.z = Math.round(this.z);
		this.w = Math.round(this.w);

		return this;

	}

	roundToZero() {

		this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
		this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
		this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);
		this.w = (this.w < 0) ? Math.ceil(this.w) : Math.floor(this.w);

		return this;

	}

	negate() {

		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
		this.w = -this.w;

		return this;

	}

	dot(v) {

		return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;

	}

	lengthSq() {

		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;

	}

	length() {

		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);

	}

	manhattanLength() {

		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);

	}

	normalize() {

		return this.divideScalar(this.length() || 1);

	}

	lerp(v, alpha) {

		this.x += (v.x - this.x) * alpha;
		this.y += (v.y - this.y) * alpha;
		this.z += (v.z - this.z) * alpha;
		this.w += (v.w - this.w) * alpha;

		return this;

	}

	lerpVectors(v1, v2, alpha) {

		this.x = v1.x + (v2.x - v1.x) * alpha;
		this.y = v1.y + (v2.y - v1.y) * alpha;
		this.z = v1.z + (v2.z - v1.z) * alpha;
		this.w = v1.w + (v2.w - v1.w) * alpha;

		return this;

	}

	equals(v) {

		return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z) && (v.w === this.w));

	}

	fromArray(array, offset = 0) {

		this.x = array[offset];
		this.y = array[offset + 1];
		this.z = array[offset + 2];
		this.w = array[offset + 3];

		return this;

	}

	toArray(array = [], offset = 0) {

		array[offset] = this.x;
		array[offset + 1] = this.y;
		array[offset + 2] = this.z;
		array[offset + 3] = this.w;

		return array;

	}

	fromBufferAttribute(attribute, index, offset) {

		if (offset !== undefined) {

			console.warn('THREE.Vector4: offset has been removed from .fromBufferAttribute().');

		}

		this.x = attribute.getX(index);
		this.y = attribute.getY(index);
		this.z = attribute.getZ(index);
		this.w = attribute.getW(index);

		return this;

	}

	random() {

		this.x = Math.random();
		this.y = Math.random();
		this.z = Math.random();
		this.w = Math.random();

		return this;

	}

}

class Quaternion {
	constructor(x = 0, y = 0, z = 0, w = 1) {
		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;
	}

	get x() {
		return this._x;
	}

	set x(value) {
		this._x = value;
		this._onChangeCallback();
	}

	get y() {

		return this._y;

	}

	set y(value) {

		this._y = value;
		this._onChangeCallback();

	}

	get z() {

		return this._z;

	}

	set z(value) {

		this._z = value;
		this._onChangeCallback();

	}

	get w() {

		return this._w;

	}

	set w(value) {

		this._w = value;
		this._onChangeCallback();

	}

	set(x, y, z, w) {

		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;

		this._onChangeCallback();

		return this;

	}

	clone() {
		return new this.constructor(this._x, this._y, this._z, this._w);
	}

	setFromRotationMatrix(m) {
		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		const te = m.elements,

			m11 = te[0], m12 = te[4], m13 = te[8],
			m21 = te[1], m22 = te[5], m23 = te[9],
			m31 = te[2], m32 = te[6], m33 = te[10],

			trace = m11 + m22 + m33;

		if (trace > 0) {

			const s = 0.5 / Math.sqrt(trace + 1.0);

			this._w = 0.25 / s;
			this._x = (m32 - m23) * s;
			this._y = (m13 - m31) * s;
			this._z = (m21 - m12) * s;

		} else if (m11 > m22 && m11 > m33) {

			const s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);

			this._w = (m32 - m23) / s;
			this._x = 0.25 * s;
			this._y = (m12 + m21) / s;
			this._z = (m13 + m31) / s;

		} else if (m22 > m33) {

			const s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);

			this._w = (m13 - m31) / s;
			this._x = (m12 + m21) / s;
			this._y = 0.25 * s;
			this._z = (m23 + m32) / s;

		} else {

			const s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);

			this._w = (m21 - m12) / s;
			this._x = (m13 + m31) / s;
			this._y = (m23 + m32) / s;
			this._z = 0.25 * s;

		}

		this._onChangeCallback();

		return this;
	}

	setFromUnitVectors(vFrom, vTo) {

		// assumes direction vectors vFrom and vTo are normalized

		let r = vFrom.dot(vTo) + 1;

		if (r < Number.EPSILON) {

			// vFrom and vTo point in opposite directions

			r = 0;

			if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {

				this._x = -vFrom.y;
				this._y = vFrom.x;
				this._z = 0;
				this._w = r;

			} else {

				this._x = 0;
				this._y = -vFrom.z;
				this._z = vFrom.y;
				this._w = r;

			}

		} else {

			// crossVectors( vFrom, vTo ); // inlined to avoid cyclic dependency on Vector3

			this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
			this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
			this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
			this._w = r;

		}

		return this.normalize();

	}

	angleTo(q) {

		return 2 * Math.acos(Math.abs(clamp(this.dot(q), -1, 1)));

	}

	rotateTowards(q, step) {

		const angle = this.angleTo(q);

		if (angle === 0) {
			return this;
		}

		const t = Math.min(1, step / angle);

		this.slerp(q, t);

		return this;

	}

	identity() {

		return this.set(0, 0, 0, 1);

	}

	invert() {

		// quaternion is assumed to have unit length

		return this.conjugate();

	}

	conjugate() {

		this._x *= -1;
		this._y *= -1;
		this._z *= -1;

		this._onChangeCallback();

		return this;

	}

	dot(v) {

		return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;

	}

	lengthSq() {

		return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;

	}

	length() {

		return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);

	}

	normalize() {

		let l = this.length();

		if (l === 0) {

			this._x = 0;
			this._y = 0;
			this._z = 0;
			this._w = 1;

		} else {

			l = 1 / l;

			this._x *= l;
			this._y *= l;
			this._z *= l;
			this._w *= l;

		}

		this._onChangeCallback();

		return this;

	}

	multiply(q) {
		return this.multiplyQuaternions(this, q);
	}

	premultiply(q) {
		return this.multiplyQuaternions(q, this);
	}

	multiplyQuaternions(a, b) {

		// from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

		const qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
		const qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;

		this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
		this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
		this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
		this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

		this._onChangeCallback();

		return this;

	}

	slerp(qb, t) {

		if (t === 0) {
			return this;
		}
		if (t === 1) {
			return this.copy(qb);
		}

		const x = this._x, y = this._y, z = this._z, w = this._w;

		// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

		let cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

		if (cosHalfTheta < 0) {

			this._w = -qb._w;
			this._x = -qb._x;
			this._y = -qb._y;
			this._z = -qb._z;

			cosHalfTheta = -cosHalfTheta;

		} else {

			this.copy(qb);

		}

		if (cosHalfTheta >= 1.0) {

			this._w = w;
			this._x = x;
			this._y = y;
			this._z = z;

			return this;

		}

		const sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;

		if (sqrSinHalfTheta <= Number.EPSILON) {

			const s = 1 - t;
			this._w = s * w + t * this._w;
			this._x = s * x + t * this._x;
			this._y = s * y + t * this._y;
			this._z = s * z + t * this._z;

			this.normalize();
			this._onChangeCallback();

			return this;

		}

		const sinHalfTheta = Math.sqrt(sqrSinHalfTheta);
		const halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
		const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta,
			ratioB = Math.sin(t * halfTheta) / sinHalfTheta;

		this._w = (w * ratioA + this._w * ratioB);
		this._x = (x * ratioA + this._x * ratioB);
		this._y = (y * ratioA + this._y * ratioB);
		this._z = (z * ratioA + this._z * ratioB);

		this._onChangeCallback();

		return this;

	}

	slerpQuaternions(qa, qb, t) {

		this.copy(qa).slerp(qb, t);

	}

	equals(quaternion) {

		return (quaternion._x === this._x) && (quaternion._y === this._y) && (quaternion._z === this._z) && (quaternion._w === this._w);

	}

	fromArray(array, offset = 0) {

		this._x = array[offset];
		this._y = array[offset + 1];
		this._z = array[offset + 2];
		this._w = array[offset + 3];

		this._onChangeCallback();

		return this;

	}

	toArray(array = [], offset = 0) {

		array[offset] = this._x;
		array[offset + 1] = this._y;
		array[offset + 2] = this._z;
		array[offset + 3] = this._w;

		return array;

	}

	fromBufferAttribute(attribute, index) {

		this._x = attribute.getX(index);
		this._y = attribute.getY(index);
		this._z = attribute.getZ(index);
		this._w = attribute.getW(index);

		return this;

	}

	_onChange(callback) {

		this._onChangeCallback = callback;

		return this;

	}

	_onChangeCallback() { }

}

class Vector3 {

	constructor(x = 0, y = 0, z = 0) {

		this.x = x;
		this.y = y;
		this.z = z;

	}

	set(x, y, z) {

		if (z === undefined) {
			z = this.z;
		}

		this.x = x;
		this.y = y;
		this.z = z;

		return this;

	}

	setScalar(scalar) {

		this.x = scalar;
		this.y = scalar;
		this.z = scalar;

		return this;

	}

	setX(x) {

		this.x = x;

		return this;

	}

	setY(y) {

		this.y = y;

		return this;

	}

	setZ(z) {

		this.z = z;

		return this;

	}

	setComponent(index, value) {

		switch (index) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			case 2: this.z = value; break;
			default: throw new Error('index is out of range: ' + index);

		}

		return this;

	}

	getComponent(index) {

		switch (index) {

			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			default: throw new Error('index is out of range: ' + index);

		}

	}

	clone() {

		return new this.constructor(this.x, this.y, this.z);

	}

	copy(v) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;

		return this;

	}

	add(v) {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;

		return this;
	}

	addScalar(s) {

		this.x += s;
		this.y += s;
		this.z += s;

		return this;

	}

	addVectors(a, b) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;

		return this;

	}

	addScaledVector(v, s) {

		this.x += v.x * s;
		this.y += v.y * s;
		this.z += v.z * s;

		return this;

	}

	sub(v) {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;

		return this;
	}

	subScalar(s) {

		this.x -= s;
		this.y -= s;
		this.z -= s;

		return this;

	}

	subVectors(a, b) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;

		return this;

	}

	multiply(v) {
		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;

		return this;
	}

	multiplyScalar(scalar) {

		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;

		return this;

	}

	multiplyVectors(a, b) {

		this.x = a.x * b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;

		return this;

	}

	applyEuler(euler) {

		return this.applyQuaternion(_quaternion$4.setFromEuler(euler));

	}

	applyAxisAngle(axis, angle) {

		return this.applyQuaternion(_quaternion$4.setFromAxisAngle(axis, angle));

	}

	applyMatrix3(m) {

		const x = this.x, y = this.y, z = this.z;
		const e = m.elements;

		this.x = e[0] * x + e[3] * y + e[6] * z;
		this.y = e[1] * x + e[4] * y + e[7] * z;
		this.z = e[2] * x + e[5] * y + e[8] * z;

		return this;

	}

	applyNormalMatrix(m) {

		return this.applyMatrix3(m).normalize();

	}

	applyMatrix4(m) {

		const x = this.x, y = this.y, z = this.z;
		const e = m.elements;

		const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);

		this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
		this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
		this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;

		return this;

	}

	applyQuaternion(q) {

		const x = this.x, y = this.y, z = this.z;
		const qx = q.x, qy = q.y, qz = q.z, qw = q.w;

		// calculate quat * vector

		const ix = qw * x + qy * z - qz * y;
		const iy = qw * y + qz * x - qx * z;
		const iz = qw * z + qx * y - qy * x;
		const iw = -qx * x - qy * y - qz * z;

		// calculate result * inverse quat

		this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
		this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
		this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

		return this;

	}

	project(camera) {

		return this.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);

	}

	unproject(camera) {

		return this.applyMatrix4(camera.projectionMatrixInverse).applyMatrix4(camera.matrixWorld);

	}

	transformDirection(m) {

		// input: THREE.Matrix4 affine matrix
		// vector interpreted as a direction

		const x = this.x, y = this.y, z = this.z;
		const e = m.elements;

		this.x = e[0] * x + e[4] * y + e[8] * z;
		this.y = e[1] * x + e[5] * y + e[9] * z;
		this.z = e[2] * x + e[6] * y + e[10] * z;

		return this.normalize();

	}

	divide(v) {

		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;

		return this;

	}

	divideScalar(scalar) {

		return this.multiplyScalar(1 / scalar);

	}

	min(v) {

		this.x = Math.min(this.x, v.x);
		this.y = Math.min(this.y, v.y);
		this.z = Math.min(this.z, v.z);

		return this;

	}

	max(v) {

		this.x = Math.max(this.x, v.x);
		this.y = Math.max(this.y, v.y);
		this.z = Math.max(this.z, v.z);

		return this;

	}

	clamp(min, max) {

		// assumes min < max, componentwise

		this.x = Math.max(min.x, Math.min(max.x, this.x));
		this.y = Math.max(min.y, Math.min(max.y, this.y));
		this.z = Math.max(min.z, Math.min(max.z, this.z));

		return this;

	}

	clampScalar(minVal, maxVal) {

		this.x = Math.max(minVal, Math.min(maxVal, this.x));
		this.y = Math.max(minVal, Math.min(maxVal, this.y));
		this.z = Math.max(minVal, Math.min(maxVal, this.z));

		return this;

	}

	clampLength(min, max) {

		const length = this.length();

		return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));

	}

	floor() {

		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		this.z = Math.floor(this.z);

		return this;

	}

	ceil() {

		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
		this.z = Math.ceil(this.z);

		return this;

	}

	round() {

		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		this.z = Math.round(this.z);

		return this;

	}

	roundToZero() {

		this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
		this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
		this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);

		return this;

	}

	negate() {

		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;

		return this;

	}

	dot(v) {

		return this.x * v.x + this.y * v.y + this.z * v.z;

	}

	// TODO lengthSquared?

	lengthSq() {

		return this.x * this.x + this.y * this.y + this.z * this.z;

	}

	length() {

		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);

	}

	manhattanLength() {

		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);

	}

	normalize() {

		return this.divideScalar(this.length() || 1);

	}

	lerp(v, alpha) {

		this.x += (v.x - this.x) * alpha;
		this.y += (v.y - this.y) * alpha;
		this.z += (v.z - this.z) * alpha;

		return this;

	}

	lerpVectors(v1, v2, alpha) {

		this.x = v1.x + (v2.x - v1.x) * alpha;
		this.y = v1.y + (v2.y - v1.y) * alpha;
		this.z = v1.z + (v2.z - v1.z) * alpha;

		return this;

	}

	cross(v) {
		return this.crossVectors(this, v);
	}

	crossVectors(a, b) {
		const ax = a.x, ay = a.y, az = a.z;
		const bx = b.x, by = b.y, bz = b.z;

		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;

		return this;
	}

	projectOnVector(v) {

		const denominator = v.lengthSq();

		if (denominator === 0) {
			return this.set(0, 0, 0);
		}

		const scalar = v.dot(this) / denominator;

		return this.copy(v).multiplyScalar(scalar);

	}

	projectOnPlane(planeNormal) {

		_vector$c.copy(this).projectOnVector(planeNormal);

		return this.sub(_vector$c);

	}

	reflect(normal) {

		// reflect incident vector off plane orthogonal to normal
		// normal is assumed to have unit length

		return this.sub(_vector$c.copy(normal).multiplyScalar(2 * this.dot(normal)));

	}

	angleTo(v) {

		const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());

		if (denominator === 0) {
			return Math.PI / 2;
		}

		const theta = this.dot(v) / denominator;

		// clamp, to handle numerical problems

		return Math.acos(clamp(theta, -1, 1));

	}

	distanceTo(v) {

		return Math.sqrt(this.distanceToSquared(v));

	}

	distanceToSquared(v) {

		const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;

		return dx * dx + dy * dy + dz * dz;

	}

	setFromSpherical(s) {

		return this.setFromSphericalCoords(s.radius, s.phi, s.theta);

	}

	setFromSphericalCoords(radius, phi, theta) {

		const sinPhiRadius = Math.sin(phi) * radius;

		this.x = sinPhiRadius * Math.sin(theta);
		this.y = Math.cos(phi) * radius;
		this.z = sinPhiRadius * Math.cos(theta);

		return this;

	}

	setFromCylindrical(c) {

		return this.setFromCylindricalCoords(c.radius, c.theta, c.y);

	}

	setFromCylindricalCoords(radius, theta, y) {

		this.x = radius * Math.sin(theta);
		this.y = y;
		this.z = radius * Math.cos(theta);

		return this;

	}

	setFromMatrixPosition(m) {

		const e = m.elements;

		this.x = e[12];
		this.y = e[13];
		this.z = e[14];

		return this;

	}

	setFromMatrixScale(m) {

		const sx = this.setFromMatrixColumn(m, 0).length();
		const sy = this.setFromMatrixColumn(m, 1).length();
		const sz = this.setFromMatrixColumn(m, 2).length();

		this.x = sx;
		this.y = sy;
		this.z = sz;

		return this;

	}

	setFromMatrixColumn(m, index) {

		return this.fromArray(m.elements, index * 4);

	}

	setFromMatrix3Column(m, index) {

		return this.fromArray(m.elements, index * 3);

	}

	equals(v) {

		return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z));

	}

	fromArray(array, offset = 0) {

		this.x = array[offset];
		this.y = array[offset + 1];
		this.z = array[offset + 2];

		return this;

	}

	toArray(array = [], offset = 0) {

		array[offset] = this.x;
		array[offset + 1] = this.y;
		array[offset + 2] = this.z;

		return array;

	}

	fromBufferAttribute(attribute, index, offset) {

		if (offset !== undefined) {

			console.warn('THREE.Vector3: offset has been removed from .fromBufferAttribute().');

		}

		this.x = attribute.getX(index);
		this.y = attribute.getY(index);
		this.z = attribute.getZ(index);

		return this;

	}

	random() {

		this.x = Math.random();
		this.y = Math.random();
		this.z = Math.random();

		return this;

	}

}

Vector3.prototype.isVector3 = true;

const _vector$c = new Vector3();
const _quaternion$4 = new Quaternion();

class Box3 {

	constructor(min = new Vector3(Number(Infinity), Number(Infinity), Number(Infinity)), max = new Vector3(-Infinity, -Infinity, -Infinity)) {

		this.min = min;
		this.max = max;

	}

	set(min, max) {

		this.min.copy(min);
		this.max.copy(max);

		return this;

	}

	setFromArray(array) {

		let minX = Number(Infinity);
		let minY = Number(Infinity);
		let minZ = Number(Infinity);

		let maxX = -Infinity;
		let maxY = -Infinity;
		let maxZ = -Infinity;

		for (let i = 0, l = array.length; i < l; i += 3) {

			const x = array[i];
			const y = array[i + 1];
			const z = array[i + 2];

			if (x < minX) {
				minX = x;
			}
			if (y < minY) {
				minY = y;
			}
			if (z < minZ) {
				minZ = z;
			}

			if (x > maxX) {
				maxX = x;
			}
			if (y > maxY) {
				maxY = y;
			}
			if (z > maxZ) {
				maxZ = z;
			}

		}

		this.min.set(minX, minY, minZ);
		this.max.set(maxX, maxY, maxZ);

		return this;

	}

	setFromBufferAttribute(attribute) {

		let minX = Number(Infinity);
		let minY = Number(Infinity);
		let minZ = Number(Infinity);

		let maxX = -Infinity;
		let maxY = -Infinity;
		let maxZ = -Infinity;

		for (let i = 0, l = attribute.count; i < l; i++) {

			const x = attribute.getX(i);
			const y = attribute.getY(i);
			const z = attribute.getZ(i);

			if (x < minX) {
				minX = x;
			}
			if (y < minY) {
				minY = y;
			}
			if (z < minZ) {
				minZ = z;
			}

			if (x > maxX) {
				maxX = x;
			}
			if (y > maxY) {
				maxY = y;
			}
			if (z > maxZ) {
				maxZ = z;
			}

		}

		this.min.set(minX, minY, minZ);
		this.max.set(maxX, maxY, maxZ);

		return this;

	}

	clone() {

		return new this.constructor().copy(this);

	}

	copy(box) {

		this.min.copy(box.min);
		this.max.copy(box.max);

		return this;

	}

	makeEmpty() {

		this.min.x = this.min.y = this.min.z = Number(Infinity);
		this.max.x = this.max.y = this.max.z = -Infinity;

		return this;

	}


	getCenter(target) {
		return target.addVectors(this.min, this.max).multiplyScalar(0.5);
	}

	expandByPoint(point) {

		this.min.min(point);
		this.max.max(point);

		return this;

	}

	expandByVector(vector) {

		this.min.sub(vector);
		this.max.add(vector);

		return this;

	}

	expandByScalar(scalar) {

		this.min.addScalar(-scalar);
		this.max.addScalar(scalar);

		return this;

	}

	expandByObject(object) {

		// Computes the world-axis-aligned bounding box of an object (including its children),
		// accounting for both the object's, and children's, world transforms

		object.updateWorldMatrix(false, false);

		const geometry = object.geometry;

		if (geometry !== undefined) {

			if (geometry.boundingBox === null) {

				geometry.computeBoundingBox();

			}

			_box$3.copy(geometry.boundingBox);
			_box$3.applyMatrix4(object.matrixWorld);

			this.union(_box$3);

		}

		const children = object.children;

		for (let i = 0, l = children.length; i < l; i++) {

			this.expandByObject(children[i]);

		}

		return this;

	}

	containsPoint(point) {

		return !(point.x < this.min.x || point.x > this.max.x ||
			point.y < this.min.y || point.y > this.max.y ||
			point.z < this.min.z || point.z > this.max.z);

	}

	containsBox(box) {

		return this.min.x <= box.min.x && box.max.x <= this.max.x &&
			this.min.y <= box.min.y && box.max.y <= this.max.y &&
			this.min.z <= box.min.z && box.max.z <= this.max.z;

	}

	getParameter(point, target) {

		// This can potentially have a divide by zero if the box
		// has a size dimension of 0.

		return target.set(
			(point.x - this.min.x) / (this.max.x - this.min.x),
			(point.y - this.min.y) / (this.max.y - this.min.y),
			(point.z - this.min.z) / (this.max.z - this.min.z)
		);

	}

	intersectsBox(box) {

		// using 6 splitting planes to rule out intersections.
		return !(box.max.x < this.min.x || box.min.x > this.max.x ||
			box.max.y < this.min.y || box.min.y > this.max.y ||
			box.max.z < this.min.z || box.min.z > this.max.z);

	}

	intersectsSphere(sphere) {

		// Find the point on the AABB closest to the sphere center.
		this.clampPoint(sphere.center, _vector$b);

		// If that point is inside the sphere, the AABB and sphere intersect.
		return _vector$b.distanceToSquared(sphere.center) <= (sphere.radius * sphere.radius);

	}

	intersectsPlane(plane) {

		// We compute the minimum and maximum dot product values. If those values
		// are on the same side (back or front) of the plane, then there is no intersection.

		let min, max;

		if (plane.normal.x > 0) {

			min = plane.normal.x * this.min.x;
			max = plane.normal.x * this.max.x;

		} else {

			min = plane.normal.x * this.max.x;
			max = plane.normal.x * this.min.x;

		}

		if (plane.normal.y > 0) {

			min += plane.normal.y * this.min.y;
			max += plane.normal.y * this.max.y;

		} else {

			min += plane.normal.y * this.max.y;
			max += plane.normal.y * this.min.y;

		}

		if (plane.normal.z > 0) {

			min += plane.normal.z * this.min.z;
			max += plane.normal.z * this.max.z;

		} else {

			min += plane.normal.z * this.max.z;
			max += plane.normal.z * this.min.z;

		}

		return (min <= -plane.constant && max >= -plane.constant);

	}

	intersectsTriangle(triangle) {

		if (this.isEmpty()) {

			return false;

		}

		// compute box center and extents
		this.getCenter(_center);
		_extents.subVectors(this.max, _center);

		// translate triangle to aabb origin
		_v0$2.subVectors(triangle.a, _center);
		_v1$7.subVectors(triangle.b, _center);
		_v2$3.subVectors(triangle.c, _center);

		// compute edge vectors for triangle
		_f0.subVectors(_v1$7, _v0$2);
		_f1.subVectors(_v2$3, _v1$7);
		_f2.subVectors(_v0$2, _v2$3);

		// test against axes that are given by cross product combinations of the edges of the triangle and the edges of the aabb
		// make an axis testing of each of the 3 sides of the aabb against each of the 3 sides of the triangle = 9 axis of separation
		// axis_ij = u_i x f_j (u0, u1, u2 = face normals of aabb = x,y,z axes vectors since aabb is axis aligned)
		let axes = [
			0, -_f0.z, _f0.y, 0, -_f1.z, _f1.y, 0, -_f2.z, _f2.y,
			_f0.z, 0, -_f0.x, _f1.z, 0, -_f1.x, _f2.z, 0, -_f2.x,
			-_f0.y, _f0.x, 0, -_f1.y, _f1.x, 0, -_f2.y, _f2.x, 0
		];
		if (!satForAxes(axes, _v0$2, _v1$7, _v2$3, _extents)) {

			return false;

		}

		// test 3 face normals from the aabb
		axes = [1, 0, 0, 0, 1, 0, 0, 0, 1];
		if (!satForAxes(axes, _v0$2, _v1$7, _v2$3, _extents)) {

			return false;

		}

		// finally testing the face normal of the triangle
		// use already existing triangle edge vectors here
		_triangleNormal.crossVectors(_f0, _f1);
		axes = [_triangleNormal.x, _triangleNormal.y, _triangleNormal.z];

		return satForAxes(axes, _v0$2, _v1$7, _v2$3, _extents);

	}

	clampPoint(point, target) {

		return target.copy(point).clamp(this.min, this.max);

	}

	distanceToPoint(point) {

		const clampedPoint = _vector$b.copy(point).clamp(this.min, this.max);

		return clampedPoint.sub(point).length();

	}

	getBoundingSphere(target) {

		this.getCenter(target.center);

		target.radius = this.getSize(_vector$b).length() * 0.5;

		return target;

	}

	intersect(box) {

		this.min.max(box.min);
		this.max.min(box.max);

		// ensure that if there is no overlap, the result is fully empty, not slightly empty with non-inf/+inf values that will cause subsequence intersects to erroneously return valid values.
		if (this.isEmpty()) {
			this.makeEmpty();
		}

		return this;

	}

	union(box) {

		this.min.min(box.min);
		this.max.max(box.max);

		return this;

	}

	applyMatrix4(matrix) {

		// transform of empty box is an empty box.
		if (this.isEmpty()) {
			return this;
		}

		// NOTE: I am using a binary pattern to specify all 2^3 combinations below
		_points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(matrix); // 000
		_points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(matrix); // 001
		_points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(matrix); // 010
		_points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(matrix); // 011
		_points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(matrix); // 100
		_points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(matrix); // 101
		_points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(matrix); // 110
		_points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix); // 111

		this.setFromPoints(_points);

		return this;

	}

	translate(offset) {

		this.min.add(offset);
		this.max.add(offset);

		return this;

	}

	equals(box) {

		return box.min.equals(this.min) && box.max.equals(this.max);

	}

}

const _points = [
	new Vector3(),
	new Vector3(),
	new Vector3(),
	new Vector3(),
	new Vector3(),
	new Vector3(),
	new Vector3(),
	new Vector3()
];

const _vector$b = new Vector3();

const _box$3 = new Box3();

// triangle centered vertices

const _v0$2 = new Vector3();
const _v1$7 = new Vector3();
const _v2$3 = new Vector3();

// triangle edge vectors

const _f0 = new Vector3();
const _f1 = new Vector3();
const _f2 = new Vector3();

const _center = new Vector3();
const _extents = new Vector3();
const _triangleNormal = new Vector3();
const _testAxis = new Vector3();

function satForAxes(axes, v0, v1, v2, extents) {

	for (let i = 0, j = axes.length - 3; i <= j; i += 3) {

		_testAxis.fromArray(axes, i);
		// project the aabb onto the seperating axis
		const r = extents.x * Math.abs(_testAxis.x) + extents.y * Math.abs(_testAxis.y) + extents.z * Math.abs(_testAxis.z);
		// project all 3 vertices of the triangle onto the seperating axis
		const p0 = v0.dot(_testAxis);
		const p1 = v1.dot(_testAxis);
		const p2 = v2.dot(_testAxis);
		// actual test, basically see if either of the most extreme of the triangle points intersects r
		if (Math.max(-Math.max(p0, p1, p2), Math.min(p0, p1, p2)) > r) {

			// points of the projected triangle are outside the projected half-length of the aabb
			// the axis is seperating and we can exit
			return false;

		}

	}

	return true;

}

class Sphere {
	constructor(center = new Vector3(), radius = -1) {
		this.center = center;
		this.radius = radius;
	}

	copy(sphere) {
		this.center.copy(sphere.center);
		this.radius = sphere.radius;

		return this;
	}


	makeEmpty() {
		this.center.set(0, 0, 0);
		this.radius = -1;

		return this;
	}

	applyMatrix4(matrix) {
		this.center.applyMatrix4(matrix);
		this.radius *= matrix.getMaxScaleOnAxis();

		return this;
	}


}

class Matrix4 {
	constructor() {

		this.elements = [

			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1

		];

	}

	set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {

		const te = this.elements;

		te[0] = n11; te[4] = n12; te[8] = n13; te[12] = n14;
		te[1] = n21; te[5] = n22; te[9] = n23; te[13] = n24;
		te[2] = n31; te[6] = n32; te[10] = n33; te[14] = n34;
		te[3] = n41; te[7] = n42; te[11] = n43; te[15] = n44;

		return this;

	}

	clone() {

		return new Matrix4().fromArray(this.elements);

	}

	copy(m) {

		const te = this.elements;
		const me = m.elements;

		te[0] = me[0]; te[1] = me[1]; te[2] = me[2]; te[3] = me[3];
		te[4] = me[4]; te[5] = me[5]; te[6] = me[6]; te[7] = me[7];
		te[8] = me[8]; te[9] = me[9]; te[10] = me[10]; te[11] = me[11];
		te[12] = me[12]; te[13] = me[13]; te[14] = me[14]; te[15] = me[15];

		return this;

	}

	extractRotation(m) {

		// this method does not support reflection matrices

		const te = this.elements;
		const me = m.elements;

		const scaleX = 1 / _v1$5.setFromMatrixColumn(m, 0).length();
		const scaleY = 1 / _v1$5.setFromMatrixColumn(m, 1).length();
		const scaleZ = 1 / _v1$5.setFromMatrixColumn(m, 2).length();

		te[0] = me[0] * scaleX;
		te[1] = me[1] * scaleX;
		te[2] = me[2] * scaleX;
		te[3] = 0;

		te[4] = me[4] * scaleY;
		te[5] = me[5] * scaleY;
		te[6] = me[6] * scaleY;
		te[7] = 0;

		te[8] = me[8] * scaleZ;
		te[9] = me[9] * scaleZ;
		te[10] = me[10] * scaleZ;
		te[11] = 0;

		te[12] = 0;
		te[13] = 0;
		te[14] = 0;
		te[15] = 1;

		return this;

	}

	lookAt(eye, target, up) {

		const te = this.elements;

		_z.subVectors(eye, target);

		if (_z.lengthSq() === 0) {

			// eye and target are in the same position

			_z.z = 1;

		}

		_z.normalize();
		_x.crossVectors(up, _z);

		if (_x.lengthSq() === 0) {

			// up and z are parallel

			if (Math.abs(up.z) === 1) {

				_z.x += 0.0001;

			} else {

				_z.z += 0.0001;

			}

			_z.normalize();
			_x.crossVectors(up, _z);

		}

		_x.normalize();
		_y.crossVectors(_z, _x);

		te[0] = _x.x; te[4] = _y.x; te[8] = _z.x;
		te[1] = _x.y; te[5] = _y.y; te[9] = _z.y;
		te[2] = _x.z; te[6] = _y.z; te[10] = _z.z;

		return this;

	}

	multiply(m) {
		return this.multiplyMatrices(this, m);
	}

	multiplyMatrices(a, b) {
		const ae = a.elements;
		const be = b.elements;
		const te = this.elements;

		const a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
		const a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
		const a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
		const a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];

		const b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
		const b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
		const b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
		const b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];

		te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
		te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
		te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
		te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

		te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
		te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
		te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
		te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

		te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
		te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
		te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
		te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

		te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
		te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
		te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
		te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

		return this;
	}

	determinant() {
		const te = this.elements;

		const n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12];
		const n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13];
		const n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14];
		const n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];

		// TODO: make this more efficient
		// ( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

		return (
			n41 * (
				Number(n14) * n23 * n32 -
				n13 * n24 * n32 -
				n14 * n22 * n33 +
				n12 * n24 * n33 +
				n13 * n22 * n34 -
				n12 * n23 * n34
			) +
			n42 * (
				Number(n11) * n23 * n34 -
				n11 * n24 * n33 +
				n14 * n21 * n33 -
				n13 * n21 * n34 +
				n13 * n24 * n31 -
				n14 * n23 * n31
			) +
			n43 * (
				Number(n11) * n24 * n32 -
				n11 * n22 * n34 -
				n14 * n21 * n32 +
				n12 * n21 * n34 +
				n14 * n22 * n31 -
				n12 * n24 * n31
			) +
			n44 * (
				-n13 * n22 * n31 -
				n11 * n23 * n32 +
				n11 * n22 * n33 +
				n13 * n21 * n32 -
				n12 * n21 * n33 +
				n12 * n23 * n31
			)

		);
	}

	setPosition(x, y, z) {
		const te = this.elements;

		if (x.isVector3) {
			te[12] = x.x;
			te[13] = x.y;
			te[14] = x.z;
		} else {
			te[12] = x;
			te[13] = y;
			te[14] = z;
		}

		return this;
	}

	invert() {
		// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
		const te = this.elements,

			n11 = te[0], n21 = te[1], n31 = te[2], n41 = te[3],
			n12 = te[4], n22 = te[5], n32 = te[6], n42 = te[7],
			n13 = te[8], n23 = te[9], n33 = te[10], n43 = te[11],
			n14 = te[12], n24 = te[13], n34 = te[14], n44 = te[15],

			t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
			t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
			t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
			t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

		const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

		if (det === 0) {
			return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		}

		const detInv = 1 / det;

		te[0] = t11 * detInv;
		te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
		te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
		te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;

		te[4] = t12 * detInv;
		te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
		te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
		te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;

		te[8] = t13 * detInv;
		te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
		te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
		te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;

		te[12] = t14 * detInv;
		te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
		te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
		te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;

		return this;
	}

	getMaxScaleOnAxis() {
		const te = this.elements;

		const scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
		const scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
		const scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];

		return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
	}

	makeTranslation(x, y, z) {
		this.set(
			1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1
		);

		return this;
	}

	makeRotationX(theta) {
		const c = Math.cos(theta), s = Math.sin(theta);

		this.set(
			1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1
		);

		return this;
	}

	makeRotationAxis(axis, angle) {
		// Based on http://www.gamedev.net/reference/articles/article1199.asp

		const c = Math.cos(angle);
		const s = Math.sin(angle);
		const t = 1 - c;
		const x = axis.x, y = axis.y, z = axis.z;
		const tx = t * x, ty = t * y;

		this.set(

			tx * x + c, tx * y - s * z, tx * z + s * y, 0, tx * y + s * z, ty * y + c, ty * z - s * x, 0, tx * z - s * y, ty * z + s * x, t * z * z + c, 0, 0, 0, 0, 1

		);

		return this;
	}

	makeScale(x, y, z) {
		this.set(
			x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1
		);

		return this;
	}

	compose(position, quaternion, scale) {
		const te = this.elements;

		const x = quaternion._x, y = quaternion._y, z = quaternion._z, w = quaternion._w;
		const x2 = x + x, y2 = y + y, z2 = z + z;
		const xx = x * x2, xy = x * y2, xz = x * z2;
		const yy = y * y2, yz = y * z2, zz = z * z2;
		const wx = w * x2, wy = w * y2, wz = w * z2;

		const sx = scale.x, sy = scale.y, sz = scale.z;

		te[0] = (1 - (yy + zz)) * sx;
		te[1] = (xy + wz) * sx;
		te[2] = (xz - wy) * sx;
		te[3] = 0;

		te[4] = (xy - wz) * sy;
		te[5] = (1 - (xx + zz)) * sy;
		te[6] = (yz + wx) * sy;
		te[7] = 0;

		te[8] = (xz + wy) * sz;
		te[9] = (yz - wx) * sz;
		te[10] = (1 - (xx + yy)) * sz;
		te[11] = 0;

		te[12] = position.x;
		te[13] = position.y;
		te[14] = position.z;
		te[15] = 1;

		return this;
	}

	makePerspective(left, right, top, bottom, near, far) {
		const te = this.elements;
		const x = 2 * near / (right - left);
		const y = 2 * near / (top - bottom);

		const a = (right + left) / (right - left);
		const b = (top + bottom) / (top - bottom);
		const c = -(far + near) / (far - near);
		const d = -2 * far * near / (far - near);

		te[0] = x; te[4] = 0; te[8] = a; te[12] = 0;
		te[1] = 0; te[5] = y; te[9] = b; te[13] = 0;
		te[2] = 0; te[6] = 0; te[10] = c; te[14] = d;
		te[3] = 0; te[7] = 0; te[11] = -1; te[15] = 0;

		return this;
	}
}

const _v1$5 = new Vector3();
const _x = new Vector3();
const _y = new Vector3();
const _z = new Vector3();

class Layers {

	constructor() {

		this.mask = 1 | 0;

	}

	set(channel) {

		this.mask = 1 << channel | 0;

	}

	enable(channel) {

		this.mask |= 1 << channel | 0;

	}

	enableAll() {

		this.mask = 0xffffffff | 0;

	}

	toggle(channel) {

		this.mask ^= 1 << channel | 0;

	}

	disable(channel) {

		this.mask &= ~(1 << channel | 0);

	}

	disableAll() {

		this.mask = 0;

	}

	test(layers) {

		return (this.mask & layers.mask) !== 0;

	}

}

let _object3DId = 0;

const _v1$4 = new Vector3();
const _q1 = new Quaternion();
const _m1$1 = new Matrix4();
const _target = new Vector3();

const _position$3 = new Vector3();
const _scale$2 = new Vector3();
const _quaternion$2 = new Quaternion();

const _xAxis = new Vector3(1, 0, 0);
const _yAxis = new Vector3(0, 1, 0);
const _zAxis = new Vector3(0, 0, 1);

const _addedEvent = { type: 'added' };
const _removedEvent = { type: 'removed' };

class Object3D extends EventDispatcher {

	constructor() {

		super();

		Object.defineProperty(this, 'id', { value: _object3DId++ });

		this.uuid = generateUUID();

		this.name = '';
		this.type = 'Object3D';

		this.parent = null;
		this.children = [];

		this.up = Object3D.DefaultUp.clone();

		const position = new Vector3();
		const quaternion = new Quaternion();
		const scale = new Vector3(1, 1, 1);

		Object.defineProperties(this, {
			position: {
				configurable: true,
				enumerable: true,
				value: position
			},
			quaternion: {
				configurable: true,
				enumerable: true,
				value: quaternion
			},
			scale: {
				configurable: true,
				enumerable: true,
				value: scale
			},
			modelViewMatrix: {
				value: new Matrix4()
			},
			normalMatrix: {
				value: new Matrix3()
			}
		});

		this.matrix = new Matrix4();
		this.matrixWorld = new Matrix4();

		this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate;
		this.matrixWorldNeedsUpdate = false;

		this.layers = new Layers();
		this.visible = true;

		this.castShadow = false;
		this.receiveShadow = false;

		this.frustumCulled = true;
		this.renderOrder = 0;

		this.animations = [];

		this.userData = {};

	}

	onBeforeRender() { }

	onAfterRender() { }

	applyMatrix4(matrix) {

		if (this.matrixAutoUpdate) {
			this.updateMatrix();
		}

		this.matrix.premultiply(matrix);

		this.matrix.decompose(this.position, this.quaternion, this.scale);

	}

	applyQuaternion(q) {

		this.quaternion.premultiply(q);

		return this;

	}

	setRotationFromAxisAngle(axis, angle) {

		// assumes axis is normalized

		this.quaternion.setFromAxisAngle(axis, angle);

	}

	setRotationFromEuler(euler) {

		this.quaternion.setFromEuler(euler, true);

	}

	setRotationFromMatrix(m) {

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		this.quaternion.setFromRotationMatrix(m);

	}

	rotateX(angle) {

		return this.rotateOnAxis(_xAxis, angle);

	}

	rotateY(angle) {

		return this.rotateOnAxis(_yAxis, angle);

	}

	rotateZ(angle) {

		return this.rotateOnAxis(_zAxis, angle);

	}

	translateOnAxis(axis, distance) {

		// translate object by distance along axis in object space
		// axis is assumed to be normalized

		_v1$4.copy(axis).applyQuaternion(this.quaternion);

		this.position.add(_v1$4.multiplyScalar(distance));

		return this;

	}

	translateX(distance) {

		return this.translateOnAxis(_xAxis, distance);

	}

	translateY(distance) {

		return this.translateOnAxis(_yAxis, distance);

	}

	translateZ(distance) {

		return this.translateOnAxis(_zAxis, distance);

	}

	localToWorld(vector) {

		return vector.applyMatrix4(this.matrixWorld);

	}

	worldToLocal(vector) {

		return vector.applyMatrix4(_m1$1.copy(this.matrixWorld).invert());

	}

	lookAt(x, y, z) {

		// This method does not support objects having non-uniformly-scaled parent(s)

		if (x.isVector3) {

			_target.copy(x);

		} else {

			_target.set(x, y, z);

		}

		const parent = this.parent;

		this.updateWorldMatrix(true, false);

		_position$3.setFromMatrixPosition(this.matrixWorld);

		if (this.isCamera || this.isLight) {

			_m1$1.lookAt(_position$3, _target, this.up);

		} else {

			_m1$1.lookAt(_target, _position$3, this.up);

		}

		this.quaternion.setFromRotationMatrix(_m1$1);

		if (parent) {

			_m1$1.extractRotation(parent.matrixWorld);
			_q1.setFromRotationMatrix(_m1$1);
			this.quaternion.premultiply(_q1.invert());

		}

	}

	add(object) {

		if (arguments.length > 1) {

			for (let i = 0; i < arguments.length; i++) {

				this.add(arguments[i]);

			}

			return this;

		}

		if (object.parent !== null) {

			object.parent.remove(object);

		}

		object.parent = this;
		this.children.push(object);

		object.dispatchEvent(_addedEvent);

		return this;

	}

	remove(object) {

		if (arguments.length > 1) {

			for (let i = 0; i < arguments.length; i++) {

				this.remove(arguments[i]);

			}

			return this;

		}

		const index = this.children.indexOf(object);

		if (index !== -1) {

			object.parent = null;
			this.children.splice(index, 1);

			object.dispatchEvent(_removedEvent);

		}

		return this;

	}

	removeFromParent() {

		const parent = this.parent;

		if (parent !== null) {

			parent.remove(this);

		}

		return this;

	}

	clear() {

		for (let i = 0; i < this.children.length; i++) {

			const object = this.children[i];

			object.parent = null;

			object.dispatchEvent(_removedEvent);

		}

		this.children.length = 0;

		return this;


	}

	attach(object) {

		// adds object as a child of this, while maintaining the object's world transform

		this.updateWorldMatrix(true, false);

		_m1$1.copy(this.matrixWorld).invert();

		if (object.parent !== null) {

			object.parent.updateWorldMatrix(true, false);

			_m1$1.multiply(object.parent.matrixWorld);

		}

		object.applyMatrix4(_m1$1);

		this.add(object);

		object.updateWorldMatrix(false, true);

		return this;

	}

	getObjectById(id) {

		return this.getObjectByProperty('id', id);

	}

	getObjectByName(name) {

		return this.getObjectByProperty('name', name);

	}

	getObjectByProperty(name, value) {

		if (this[name] === value) {
			return this;
		}

		for (let i = 0, l = this.children.length; i < l; i++) {

			const child = this.children[i];
			const object = child.getObjectByProperty(name, value);

			if (object !== undefined) {

				return object;

			}

		}

		return undefined;

	}

	getWorldPosition(target) {

		this.updateWorldMatrix(true, false);

		return target.setFromMatrixPosition(this.matrixWorld);

	}

	getWorldQuaternion(target) {

		this.updateWorldMatrix(true, false);

		this.matrixWorld.decompose(_position$3, target, _scale$2);

		return target;

	}

	getWorldScale(target) {

		this.updateWorldMatrix(true, false);

		this.matrixWorld.decompose(_position$3, _quaternion$2, target);

		return target;

	}

	getWorldDirection(target) {

		this.updateWorldMatrix(true, false);

		const e = this.matrixWorld.elements;

		return target.set(e[8], e[9], e[10]).normalize();

	}

	traverse(callback) {

		callback(this);

		const children = this.children;

		for (let i = 0, l = children.length; i < l; i++) {

			children[i].traverse(callback);

		}

	}

	traverseVisible(callback) {

		if (this.visible === false) {
			return;
		}

		callback(this);

		const children = this.children;

		for (let i = 0, l = children.length; i < l; i++) {

			children[i].traverseVisible(callback);

		}

	}

	traverseAncestors(callback) {

		const parent = this.parent;

		if (parent !== null) {

			callback(parent);

			parent.traverseAncestors(callback);

		}

	}

	updateMatrix() {

		this.matrix.compose(this.position, this.quaternion, this.scale);

		this.matrixWorldNeedsUpdate = true;

	}

	updateMatrixWorld(force) {

		if (this.matrixAutoUpdate) {
			this.updateMatrix();
		}

		if (this.matrixWorldNeedsUpdate || force) {

			if (this.parent === null) {

				this.matrixWorld.copy(this.matrix);

			} else {

				this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);

			}

			this.matrixWorldNeedsUpdate = false;

			force = true;

		}

		// update children

		const children = this.children;

		for (let i = 0, l = children.length; i < l; i++) {

			children[i].updateMatrixWorld(force);

		}

	}

	updateWorldMatrix(updateParents, updateChildren) {

		const parent = this.parent;

		if (updateParents === true && parent !== null) {

			parent.updateWorldMatrix(true, false);

		}

		if (this.matrixAutoUpdate) {
			this.updateMatrix();
		}

		if (this.parent === null) {

			this.matrixWorld.copy(this.matrix);

		} else {

			this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);

		}

		// update children

		if (updateChildren === true) {

			const children = this.children;

			for (let i = 0, l = children.length; i < l; i++) {

				children[i].updateWorldMatrix(false, true);

			}

		}

	}

	clone(recursive) {

		return new this.constructor().copy(this, recursive);

	}

	copy(source, recursive = true) {

		this.name = source.name;

		this.up.copy(source.up);

		this.position.copy(source.position);
		this.rotation.order = source.rotation.order;
		this.quaternion.copy(source.quaternion);
		this.scale.copy(source.scale);

		this.matrix.copy(source.matrix);
		this.matrixWorld.copy(source.matrixWorld);

		this.matrixAutoUpdate = source.matrixAutoUpdate;
		this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;

		this.layers.mask = source.layers.mask;
		this.visible = source.visible;

		this.castShadow = source.castShadow;
		this.receiveShadow = source.receiveShadow;

		this.frustumCulled = source.frustumCulled;
		this.renderOrder = source.renderOrder;

		this.userData = JSON.parse(JSON.stringify(source.userData));

		if (recursive === true) {

			for (let i = 0; i < source.children.length; i++) {

				const child = source.children[i];
				this.add(child.clone());

			}

		}

		return this;

	}

}

Object3D.DefaultUp = new Vector3(0, 1, 0);
Object3D.DefaultMatrixAutoUpdate = true;

Object3D.prototype.isObject3D = true;

const _v0$1 = new Vector3();
const _v1$3 = new Vector3();
const _v2$2 = new Vector3();
const _v3$1 = new Vector3();

const _vab = new Vector3();
const _vac = new Vector3();
const _vbc = new Vector3();
const _vap = new Vector3();
const _vbp = new Vector3();
const _vcp = new Vector3();

class Triangle {

	constructor(a = new Vector3(), b = new Vector3(), c = new Vector3()) {

		this.a = a;
		this.b = b;
		this.c = c;

	}

	static getNormal(a, b, c, target) {

		target.subVectors(c, b);
		_v0$1.subVectors(a, b);
		target.cross(_v0$1);

		const targetLengthSq = target.lengthSq();
		if (targetLengthSq > 0) {

			return target.multiplyScalar(1 / Math.sqrt(targetLengthSq));

		}

		return target.set(0, 0, 0);

	}

	// static/instance method to calculate barycentric coordinates
	// based on: http://www.blackpawn.com/texts/pointinpoly/default.html
	static getBarycoord(point, a, b, c, target) {

		_v0$1.subVectors(c, a);
		_v1$3.subVectors(b, a);
		_v2$2.subVectors(point, a);

		const dot00 = _v0$1.dot(_v0$1);
		const dot01 = _v0$1.dot(_v1$3);
		const dot02 = _v0$1.dot(_v2$2);
		const dot11 = _v1$3.dot(_v1$3);
		const dot12 = _v1$3.dot(_v2$2);

		const denom = (dot00 * dot11 - dot01 * dot01);

		// collinear or singular triangle
		if (denom === 0) {

			// arbitrary location outside of triangle?
			// not sure if this is the best idea, maybe should be returning undefined
			return target.set(-2, -1, -1);

		}

		const invDenom = 1 / denom;
		const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
		const v = (dot00 * dot12 - dot01 * dot02) * invDenom;

		// barycentric coordinates must always sum to 1
		return target.set(1 - u - v, v, u);

	}

	static containsPoint(point, a, b, c) {

		this.getBarycoord(point, a, b, c, _v3$1);

		return (_v3$1.x >= 0) && (_v3$1.y >= 0) && ((_v3$1.x + _v3$1.y) <= 1);

	}

	static getUV(point, p1, p2, p3, uv1, uv2, uv3, target) {

		this.getBarycoord(point, p1, p2, p3, _v3$1);

		target.set(0, 0);
		target.addScaledVector(uv1, _v3$1.x);
		target.addScaledVector(uv2, _v3$1.y);
		target.addScaledVector(uv3, _v3$1.z);

		return target;

	}

	static isFrontFacing(a, b, c, direction) {

		_v0$1.subVectors(c, b);
		_v1$3.subVectors(a, b);

		// strictly front facing
		return (_v0$1.cross(_v1$3).dot(direction) < 0);

	}

	set(a, b, c) {

		this.a.copy(a);
		this.b.copy(b);
		this.c.copy(c);

		return this;

	}

	clone() {

		return new this.constructor().copy(this);

	}

	copy(triangle) {

		this.a.copy(triangle.a);
		this.b.copy(triangle.b);
		this.c.copy(triangle.c);

		return this;

	}

	getArea() {

		_v0$1.subVectors(this.c, this.b);
		_v1$3.subVectors(this.a, this.b);

		return _v0$1.cross(_v1$3).length() * 0.5;

	}

	getMidpoint(target) {

		return target.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);

	}

	getNormal(target) {

		return Triangle.getNormal(this.a, this.b, this.c, target);

	}

	getPlane(target) {

		return target.setFromCoplanarPoints(this.a, this.b, this.c);

	}

	getBarycoord(point, target) {

		return Triangle.getBarycoord(point, this.a, this.b, this.c, target);

	}

	getUV(point, uv1, uv2, uv3, target) {

		return Triangle.getUV(point, this.a, this.b, this.c, uv1, uv2, uv3, target);

	}

	containsPoint(point) {

		return Triangle.containsPoint(point, this.a, this.b, this.c);

	}

	isFrontFacing(direction) {

		return Triangle.isFrontFacing(this.a, this.b, this.c, direction);

	}

	intersectsBox(box) {

		return box.intersectsTriangle(this);

	}

	closestPointToPoint(p, target) {

		const a = this.a, b = this.b, c = this.c;
		let v, w;

		// algorithm thanks to Real-Time Collision Detection by Christer Ericson,
		// published by Morgan Kaufmann Publishers, (c) 2005 Elsevier Inc.,
		// under the accompanying license; see chapter 5.1.5 for detailed explanation.
		// basically, we're distinguishing which of the voronoi regions of the triangle
		// the point lies in with the minimum amount of redundant computation.

		_vab.subVectors(b, a);
		_vac.subVectors(c, a);
		_vap.subVectors(p, a);
		const d1 = _vab.dot(_vap);
		const d2 = _vac.dot(_vap);
		if (d1 <= 0 && d2 <= 0) {

			// vertex region of A; barycentric coords (1, 0, 0)
			return target.copy(a);

		}

		_vbp.subVectors(p, b);
		const d3 = _vab.dot(_vbp);
		const d4 = _vac.dot(_vbp);
		if (d3 >= 0 && d4 <= d3) {

			// vertex region of B; barycentric coords (0, 1, 0)
			return target.copy(b);

		}

		const vc = d1 * d4 - d3 * d2;
		if (vc <= 0 && d1 >= 0 && d3 <= 0) {

			v = d1 / (d1 - d3);
			// edge region of AB; barycentric coords (1-v, v, 0)
			return target.copy(a).addScaledVector(_vab, v);

		}

		_vcp.subVectors(p, c);
		const d5 = _vab.dot(_vcp);
		const d6 = _vac.dot(_vcp);
		if (d6 >= 0 && d5 <= d6) {

			// vertex region of C; barycentric coords (0, 0, 1)
			return target.copy(c);

		}

		const vb = d5 * d2 - d1 * d6;
		if (vb <= 0 && d2 >= 0 && d6 <= 0) {

			w = d2 / (d2 - d6);
			// edge region of AC; barycentric coords (1-w, 0, w)
			return target.copy(a).addScaledVector(_vac, w);

		}

		const va = d3 * d6 - d5 * d4;
		if (va <= 0 && (d4 - d3) >= 0 && (d5 - d6) >= 0) {

			_vbc.subVectors(c, b);
			w = (d4 - d3) / ((d4 - d3) + (d5 - d6));
			// edge region of BC; barycentric coords (0, 1-w, w)
			return target.copy(b).addScaledVector(_vbc, w); // edge region of BC

		}

		// face region
		const denom = 1 / (va + vb + vc);
		// u = va * denom
		v = vb * denom;
		w = vc * denom;

		return target.copy(a).addScaledVector(_vab, v).addScaledVector(_vac, w);

	}

	equals(triangle) {

		return triangle.a.equals(this.a) && triangle.b.equals(this.b) && triangle.c.equals(this.c);

	}

}

let materialId = 0;

class Material extends EventDispatcher {

	constructor() {

		super();

		Object.defineProperty(this, 'id', { value: materialId++ });

		this.uuid = generateUUID();

		this.name = '';
		this.type = 'Material';

		this.fog = true;

		this.blending = NormalBlending;
		this.side = FrontSide;
		this.vertexColors = false;

		this.opacity = 1;
		this.format = RGBAFormat;
		this.transparent = false;

		this.blendSrc = SrcAlphaFactor;
		this.blendDst = OneMinusSrcAlphaFactor;
		this.blendEquation = AddEquation;
		this.blendSrcAlpha = null;
		this.blendDstAlpha = null;
		this.blendEquationAlpha = null;

		this.depthFunc = LessEqualDepth;
		this.depthTest = true;
		this.depthWrite = true;

		this.stencilWriteMask = 0xff;
		this.stencilFunc = AlwaysStencilFunc;
		this.stencilRef = 0;
		this.stencilFuncMask = 0xff;
		this.stencilFail = KeepStencilOp;
		this.stencilZFail = KeepStencilOp;
		this.stencilZPass = KeepStencilOp;
		this.stencilWrite = false;

		this.clippingPlanes = null;
		this.clipIntersection = false;
		this.clipShadows = false;

		this.shadowSide = null;

		this.colorWrite = true;

		this.precision = null; // override the renderer's default precision for this material

		this.polygonOffset = false;
		this.polygonOffsetFactor = 0;
		this.polygonOffsetUnits = 0;

		this.dithering = false;

		this.alphaToCoverage = false;
		this.premultipliedAlpha = false;

		this.visible = true;

		this.toneMapped = true;

		this.userData = {};

		this.version = 0;

		this._alphaTest = 0;

	}

	get alphaTest() {

		return this._alphaTest;

	}

	set alphaTest(value) {

		if (this._alphaTest > 0 !== value > 0) {

			this.version++;

		}

		this._alphaTest = value;

	}

	onBuild(/* shaderobject, renderer */) { }

	onBeforeCompile(/* shaderobject, renderer */) { }

	customProgramCacheKey() {

		return this.onBeforeCompile.toString();

	}

	setValues(values) {

		if (values === undefined) {
			return;
		}

		for (const key in values) {
			const newValue = values[key];

			const currentValue = this[key];

			if (currentValue && currentValue.isColor) {
				currentValue.set(newValue);
			} else if ((currentValue && currentValue.isVector3) && (newValue && newValue.isVector3)) {
				currentValue.copy(newValue);
			} else {
				this[key] = newValue;
			}
		}
	}

	clone() {

		return new this.constructor().copy(this);

	}

	copy(source) {

		this.name = source.name;

		this.fog = source.fog;

		this.blending = source.blending;
		this.side = source.side;
		this.vertexColors = source.vertexColors;

		this.opacity = source.opacity;
		this.format = source.format;
		this.transparent = source.transparent;

		this.blendSrc = source.blendSrc;
		this.blendDst = source.blendDst;
		this.blendEquation = source.blendEquation;
		this.blendSrcAlpha = source.blendSrcAlpha;
		this.blendDstAlpha = source.blendDstAlpha;
		this.blendEquationAlpha = source.blendEquationAlpha;

		this.depthFunc = source.depthFunc;
		this.depthTest = source.depthTest;
		this.depthWrite = source.depthWrite;

		this.stencilWriteMask = source.stencilWriteMask;
		this.stencilFunc = source.stencilFunc;
		this.stencilRef = source.stencilRef;
		this.stencilFuncMask = source.stencilFuncMask;
		this.stencilFail = source.stencilFail;
		this.stencilZFail = source.stencilZFail;
		this.stencilZPass = source.stencilZPass;
		this.stencilWrite = source.stencilWrite;

		const srcPlanes = source.clippingPlanes;
		let dstPlanes = null;

		if (srcPlanes !== null) {

			const n = srcPlanes.length;
			dstPlanes = new Array(n);

			for (let i = 0; i !== n; ++i) {

				dstPlanes[i] = srcPlanes[i].clone();

			}

		}

		this.clippingPlanes = dstPlanes;
		this.clipIntersection = source.clipIntersection;
		this.clipShadows = source.clipShadows;

		this.shadowSide = source.shadowSide;

		this.colorWrite = source.colorWrite;

		this.precision = source.precision;

		this.polygonOffset = source.polygonOffset;
		this.polygonOffsetFactor = source.polygonOffsetFactor;
		this.polygonOffsetUnits = source.polygonOffsetUnits;

		this.dithering = source.dithering;

		this.alphaTest = source.alphaTest;
		this.alphaToCoverage = source.alphaToCoverage;
		this.premultipliedAlpha = source.premultipliedAlpha;

		this.visible = source.visible;

		this.toneMapped = source.toneMapped;

		this.userData = JSON.parse(JSON.stringify(source.userData));

		return this;

	}

	dispose() {

		this.dispatchEvent({ type: 'dispose' });

	}

	set needsUpdate(value) {
		if (value === true) {
			this.version++;
		}
	}

}

Material.prototype.isMaterial = true;

const _hslA = {
	h: 0,
	s: 0,
	l: 0
};
const _hslB = {
	h: 0,
	s: 0,
	l: 0
};

class Color {

	constructor(r, g, b) {

		if (g === undefined && b === undefined) {

			// r is THREE.Color, hex or string
			return this.set(r);

		}

		return this.setRGB(r, g, b);

	}

	set(value) {

		if (value && value.isColor) {

			this.copy(value);

		} else if (typeof value === 'number') {

			this.setHex(value);

		} else if (typeof value === 'string') {

			this.setStyle(value);

		}

		return this;

	}

	setScalar(scalar) {

		this.r = scalar;
		this.g = scalar;
		this.b = scalar;

		return this;

	}

	setHex(hex) {

		hex = Math.floor(hex);

		this.r = (hex >> 16 & 255) / 255;
		this.g = (hex >> 8 & 255) / 255;
		this.b = (hex & 255) / 255;

		return this;

	}

	setRGB(r, g, b) {

		this.r = r;
		this.g = g;
		this.b = b;

		return this;

	}

	clone() {
		return new this.constructor(this.r, this.g, this.b);
	}

	copy(color) {
		this.r = color.r;
		this.g = color.g;
		this.b = color.b;

		return this;
	}

	copyGammaToLinear(color, gammaFactor = 2.0) {

		this.r = color.r ** gammaFactor;
		this.g = color.g ** gammaFactor;
		this.b = color.b ** gammaFactor;

		return this;

	}

	copyLinearToGamma(color, gammaFactor = 2.0) {

		const safeInverse = (gammaFactor > 0) ? (1.0 / gammaFactor) : 1.0;

		this.r = color.r ** safeInverse;
		this.g = color.g ** safeInverse;
		this.b = color.b ** safeInverse;

		return this;

	}

	getHex() {

		return (this.r * 255) << 16 ^ (this.g * 255) << 8 ^ (this.b * 255) << 0;

	}

	getHexString() {

		return ('000000' + this.getHex().toString(16)).slice(-6);

	}

	getHSL(target) {

		// h,s,l ranges are in 0.0 - 1.0

		const r = this.r, g = this.g, b = this.b;

		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);

		let hue, saturation;
		const lightness = (min + max) / 2.0;

		if (min === max) {

			hue = 0;
			saturation = 0;

		} else {

			const delta = max - min;

			saturation = lightness <= 0.5 ? delta / (max + min) : delta / (2 - max - min);

			switch (max) {

				case r: hue = (g - b) / delta + (g < b ? 6 : 0); break;
				case g: hue = (b - r) / delta + 2; break;
				case b: hue = (r - g) / delta + 4; break;

			}

			hue /= 6;

		}

		target.h = hue;
		target.s = saturation;
		target.l = lightness;

		return target;

	}

	getStyle() {

		return 'rgb(' + ((this.r * 255) | 0) + ',' + ((this.g * 255) | 0) + ',' + ((this.b * 255) | 0) + ')';

	}

	offsetHSL(h, s, l) {

		this.getHSL(_hslA);

		_hslA.h += h; _hslA.s += s; _hslA.l += l;

		this.setHSL(_hslA.h, _hslA.s, _hslA.l);

		return this;

	}

	add(color) {

		this.r += color.r;
		this.g += color.g;
		this.b += color.b;

		return this;

	}

	addColors(color1, color2) {

		this.r = color1.r + color2.r;
		this.g = color1.g + color2.g;
		this.b = color1.b + color2.b;

		return this;

	}

	addScalar(s) {

		this.r += s;
		this.g += s;
		this.b += s;

		return this;

	}

	sub(color) {

		this.r = Math.max(0, this.r - color.r);
		this.g = Math.max(0, this.g - color.g);
		this.b = Math.max(0, this.b - color.b);

		return this;

	}

	multiply(color) {

		this.r *= color.r;
		this.g *= color.g;
		this.b *= color.b;

		return this;

	}

	multiplyScalar(s) {

		this.r *= s;
		this.g *= s;
		this.b *= s;

		return this;

	}

	lerp(color, alpha) {

		this.r += (color.r - this.r) * alpha;
		this.g += (color.g - this.g) * alpha;
		this.b += (color.b - this.b) * alpha;

		return this;

	}

	lerpColors(color1, color2, alpha) {

		this.r = color1.r + (color2.r - color1.r) * alpha;
		this.g = color1.g + (color2.g - color1.g) * alpha;
		this.b = color1.b + (color2.b - color1.b) * alpha;

		return this;

	}

	lerpHSL(color, alpha) {

		this.getHSL(_hslA);
		color.getHSL(_hslB);

		const h = lerp(_hslA.h, _hslB.h, alpha);
		const s = lerp(_hslA.s, _hslB.s, alpha);
		const l = lerp(_hslA.l, _hslB.l, alpha);

		this.setHSL(h, s, l);

		return this;

	}

	equals(c) {

		return (c.r === this.r) && (c.g === this.g) && (c.b === this.b);

	}

	fromArray(array, offset = 0) {

		this.r = array[offset];
		this.g = array[offset + 1];
		this.b = array[offset + 2];

		return this;

	}

	toArray(array = [], offset = 0) {

		array[offset] = this.r;
		array[offset + 1] = this.g;
		array[offset + 2] = this.b;

		return array;

	}

	fromBufferAttribute(attribute, index) {

		this.r = attribute.getX(index);
		this.g = attribute.getY(index);
		this.b = attribute.getZ(index);

		if (attribute.normalized === true) {

			// assuming Uint8Array

			this.r /= 255;
			this.g /= 255;
			this.b /= 255;

		}

		return this;

	}
}

Color.prototype.isColor = true;
Color.prototype.r = 1;
Color.prototype.g = 1;
Color.prototype.b = 1;

const _vector$9 = new Vector3();
const _vector2$1 = new Vector2();

class BufferAttribute {

	constructor(array, itemSize, normalized) {

		if (Array.isArray(array)) {

			throw new TypeError('THREE.BufferAttribute: array should be a Typed Array.');

		}

		this.name = '';

		this.array = array;
		this.itemSize = itemSize;
		this.count = array !== undefined ? array.length / itemSize : 0;
		this.normalized = normalized === true;

		this.usage = StaticDrawUsage;
		this.updateRange = {
			offset: 0,
			count: -1
		};

		this.version = 0;

	}

	onUploadCallback() { }

	set needsUpdate(value) {

		if (value === true) {
			this.version++;
		}

	}

	setUsage(value) {

		this.usage = value;

		return this;

	}

	copy(source) {

		this.name = source.name;
		this.array = new source.array.constructor(source.array);
		this.itemSize = source.itemSize;
		this.count = source.count;
		this.normalized = source.normalized;

		this.usage = source.usage;

		return this;

	}

	copyAt(index1, attribute, index2) {

		index1 *= this.itemSize;
		index2 *= attribute.itemSize;

		for (let i = 0, l = this.itemSize; i < l; i++) {

			this.array[index1 + i] = attribute.array[index2 + i];

		}

		return this;

	}

	copyArray(array) {

		this.array.set(array);

		return this;

	}

	copyColorsArray(colors) {

		const array = this.array;
		let offset = 0;

		for (let i = 0, l = colors.length; i < l; i++) {

			let color = colors[i];

			if (color === undefined) {

				console.warn('THREE.BufferAttribute.copyColorsArray(): color is undefined', i);
				color = new Color();

			}

			array[offset++] = color.r;
			array[offset++] = color.g;
			array[offset++] = color.b;

		}

		return this;

	}

	copyVector2sArray(vectors) {

		const array = this.array;
		let offset = 0;

		for (let i = 0, l = vectors.length; i < l; i++) {

			let vector = vectors[i];

			if (vector === undefined) {

				console.warn('THREE.BufferAttribute.copyVector2sArray(): vector is undefined', i);
				vector = new Vector2();

			}

			array[offset++] = vector.x;
			array[offset++] = vector.y;

		}

		return this;

	}

	copyVector3sArray(vectors) {

		const array = this.array;
		let offset = 0;

		for (let i = 0, l = vectors.length; i < l; i++) {

			let vector = vectors[i];

			if (vector === undefined) {

				console.warn('THREE.BufferAttribute.copyVector3sArray(): vector is undefined', i);
				vector = new Vector3();

			}

			array[offset++] = vector.x;
			array[offset++] = vector.y;
			array[offset++] = vector.z;

		}

		return this;

	}

	copyVector4sArray(vectors) {

		const array = this.array;
		let offset = 0;

		for (let i = 0, l = vectors.length; i < l; i++) {

			let vector = vectors[i];

			if (vector === undefined) {

				console.warn('THREE.BufferAttribute.copyVector4sArray(): vector is undefined', i);
				vector = new Vector4();

			}

			array[offset++] = vector.x;
			array[offset++] = vector.y;
			array[offset++] = vector.z;
			array[offset++] = vector.w;

		}

		return this;

	}

	applyMatrix3(m) {

		if (this.itemSize === 2) {

			for (let i = 0, l = this.count; i < l; i++) {

				_vector2$1.fromBufferAttribute(this, i);
				_vector2$1.applyMatrix3(m);

				this.setXY(i, _vector2$1.x, _vector2$1.y);

			}

		} else if (this.itemSize === 3) {

			for (let i = 0, l = this.count; i < l; i++) {

				_vector$9.fromBufferAttribute(this, i);
				_vector$9.applyMatrix3(m);

				this.setXYZ(i, _vector$9.x, _vector$9.y, _vector$9.z);

			}

		}

		return this;

	}

	applyMatrix4(m) {

		for (let i = 0, l = this.count; i < l; i++) {

			_vector$9.x = this.getX(i);
			_vector$9.y = this.getY(i);
			_vector$9.z = this.getZ(i);

			_vector$9.applyMatrix4(m);

			this.setXYZ(i, _vector$9.x, _vector$9.y, _vector$9.z);

		}

		return this;

	}

	applyNormalMatrix(m) {

		for (let i = 0, l = this.count; i < l; i++) {

			_vector$9.x = this.getX(i);
			_vector$9.y = this.getY(i);
			_vector$9.z = this.getZ(i);

			_vector$9.applyNormalMatrix(m);

			this.setXYZ(i, _vector$9.x, _vector$9.y, _vector$9.z);

		}

		return this;

	}

	transformDirection(m) {

		for (let i = 0, l = this.count; i < l; i++) {

			_vector$9.x = this.getX(i);
			_vector$9.y = this.getY(i);
			_vector$9.z = this.getZ(i);

			_vector$9.transformDirection(m);

			this.setXYZ(i, _vector$9.x, _vector$9.y, _vector$9.z);

		}

		return this;

	}

	set(value, offset = 0) {

		this.array.set(value, offset);

		return this;

	}

	getX(index) {

		return this.array[index * this.itemSize];

	}

	setX(index, x) {

		this.array[index * this.itemSize] = x;

		return this;

	}

	getY(index) {

		return this.array[index * this.itemSize + 1];

	}

	setY(index, y) {

		this.array[index * this.itemSize + 1] = y;

		return this;

	}

	getZ(index) {

		return this.array[index * this.itemSize + 2];

	}

	setZ(index, z) {

		this.array[index * this.itemSize + 2] = z;

		return this;

	}

	getW(index) {

		return this.array[index * this.itemSize + 3];

	}

	setW(index, w) {

		this.array[index * this.itemSize + 3] = w;

		return this;

	}

	setXY(index, x, y) {

		index *= this.itemSize;

		this.array[index + 0] = x;
		this.array[index + 1] = y;

		return this;

	}

	setXYZ(index, x, y, z) {

		index *= this.itemSize;

		this.array[index + 0] = x;
		this.array[index + 1] = y;
		this.array[index + 2] = z;

		return this;

	}

	setXYZW(index, x, y, z, w) {

		index *= this.itemSize;

		this.array[index + 0] = x;
		this.array[index + 1] = y;
		this.array[index + 2] = z;
		this.array[index + 3] = w;

		return this;

	}

	onUpload(callback) {

		this.onUploadCallback = callback;

		return this;

	}

	clone() {

		return new this.constructor(this.array, this.itemSize).copy(this);

	}
}

BufferAttribute.prototype.isBufferAttribute = true;

class Uint32BufferAttribute extends BufferAttribute {

	constructor(array, itemSize, normalized) {

		super(new Uint32Array(array), itemSize, normalized);

	}

}

class Float32BufferAttribute extends BufferAttribute {

	constructor(array, itemSize, normalized) {

		super(new Float32Array(array), itemSize, normalized);

	}

}

let _id = 0;

const _m1 = new Matrix4();
const _obj = new Object3D();
const _offset = new Vector3();
const _box$1 = new Box3();
const _boxMorphTargets = new Box3();
const _vector$8 = new Vector3();

class BufferGeometry extends EventDispatcher {

	constructor() {

		super();

		Object.defineProperty(this, 'id', { value: _id++ });

		this.uuid = generateUUID();

		this.name = '';
		this.type = 'BufferGeometry';

		this.index = null;
		this.attributes = {};

		this.morphAttributes = {};
		this.morphTargetsRelative = false;

		this.groups = [];

		this.boundingBox = null;
		this.boundingSphere = null;

		this.drawRange = {
			start: 0,
			count: Infinity
		};

		this.userData = {};

	}

	getIndex() {

		return this.index;

	}

	setIndex(index) {

		if (Array.isArray(index)) {

			this.index = new Uint32BufferAttribute(index, 1);

		} else {

			this.index = index;

		}

		return this;

	}

	getAttribute(name) {

		return this.attributes[name];

	}

	setAttribute(name, attribute) {

		this.attributes[name] = attribute;

		return this;

	}

	deleteAttribute(name) {

		delete this.attributes[name];

		return this;

	}

	hasAttribute(name) {

		return this.attributes[name] !== undefined;

	}

	addGroup(start, count, materialIndex = 0) {

		this.groups.push({

			start,
			count,
			materialIndex

		});

	}

	clearGroups() {

		this.groups = [];

	}

	setDrawRange(start, count) {

		this.drawRange.start = start;
		this.drawRange.count = count;

	}

	applyMatrix4(matrix) {

		const position = this.attributes.position;

		if (position !== undefined) {

			position.applyMatrix4(matrix);

			position.needsUpdate = true;

		}

		const normal = this.attributes.normal;

		if (normal !== undefined) {

			const normalMatrix = new Matrix3().getNormalMatrix(matrix);

			normal.applyNormalMatrix(normalMatrix);

			normal.needsUpdate = true;

		}

		const tangent = this.attributes.tangent;

		if (tangent !== undefined) {

			tangent.transformDirection(matrix);

			tangent.needsUpdate = true;

		}

		if (this.boundingBox !== null) {

			this.computeBoundingBox();

		}

		if (this.boundingSphere !== null) {

			this.computeBoundingSphere();

		}

		return this;

	}

	applyQuaternion(q) {

		_m1.makeRotationFromQuaternion(q);

		this.applyMatrix4(_m1);

		return this;

	}

	rotateX(angle) {

		// rotate geometry around world x-axis

		_m1.makeRotationX(angle);

		this.applyMatrix4(_m1);

		return this;

	}

	rotateY(angle) {

		// rotate geometry around world y-axis

		_m1.makeRotationY(angle);

		this.applyMatrix4(_m1);

		return this;

	}

	rotateZ(angle) {

		// rotate geometry around world z-axis

		_m1.makeRotationZ(angle);

		this.applyMatrix4(_m1);

		return this;

	}

	translate(x, y, z) {

		// translate geometry

		_m1.makeTranslation(x, y, z);

		this.applyMatrix4(_m1);

		return this;

	}

	scale(x, y, z) {

		// scale geometry

		_m1.makeScale(x, y, z);

		this.applyMatrix4(_m1);

		return this;

	}

	lookAt(vector) {

		_obj.lookAt(vector);

		_obj.updateMatrix();

		this.applyMatrix4(_obj.matrix);

		return this;

	}

	center() {

		this.computeBoundingBox();

		this.boundingBox.getCenter(_offset).negate();

		this.translate(_offset.x, _offset.y, _offset.z);

		return this;

	}

	computeBoundingBox() {

		if (this.boundingBox === null) {

			this.boundingBox = new Box3();

		}

		const position = this.attributes.position;
		const morphAttributesPosition = this.morphAttributes.position;

		if (position && position.isGLBufferAttribute) {
			this.boundingBox.set(
				new Vector3(-Infinity, -Infinity, -Infinity),
				new Vector3(Number(Infinity), Number(Infinity), Number(Infinity))
			);

			return;
		}

		if (position !== undefined) {
			this.boundingBox.setFromBufferAttribute(position);

			// process morph attributes if present

			if (morphAttributesPosition) {
				for (let i = 0, il = morphAttributesPosition.length; i < il; i++) {

					const morphAttribute = morphAttributesPosition[i];
					_box$1.setFromBufferAttribute(morphAttribute);

					if (this.morphTargetsRelative) {

						_vector$8.addVectors(this.boundingBox.min, _box$1.min);
						this.boundingBox.expandByPoint(_vector$8);

						_vector$8.addVectors(this.boundingBox.max, _box$1.max);
						this.boundingBox.expandByPoint(_vector$8);

					} else {

						this.boundingBox.expandByPoint(_box$1.min);
						this.boundingBox.expandByPoint(_box$1.max);

					}

				}

			}

		} else {

			this.boundingBox.makeEmpty();

		}

		if (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) {

			console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);

		}

	}

	computeBoundingSphere() {

		if (this.boundingSphere === null) {

			this.boundingSphere = new Sphere();

		}

		const position = this.attributes.position;
		const morphAttributesPosition = this.morphAttributes.position;

		if (position && position.isGLBufferAttribute) {

			console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this);

			this.boundingSphere.set(new Vector3(), Infinity);

			return;

		}

		if (position) {

			// first, find the center of the bounding sphere

			const center = this.boundingSphere.center;

			_box$1.setFromBufferAttribute(position);

			// process morph attributes if present

			if (morphAttributesPosition) {

				for (let i = 0, il = morphAttributesPosition.length; i < il; i++) {

					const morphAttribute = morphAttributesPosition[i];
					_boxMorphTargets.setFromBufferAttribute(morphAttribute);

					if (this.morphTargetsRelative) {

						_vector$8.addVectors(_box$1.min, _boxMorphTargets.min);
						_box$1.expandByPoint(_vector$8);

						_vector$8.addVectors(_box$1.max, _boxMorphTargets.max);
						_box$1.expandByPoint(_vector$8);

					} else {

						_box$1.expandByPoint(_boxMorphTargets.min);
						_box$1.expandByPoint(_boxMorphTargets.max);

					}

				}

			}

			_box$1.getCenter(center);

			// second, try to find a boundingSphere with a radius smaller than the
			// boundingSphere of the boundingBox: sqrt(3) smaller in the best case

			let maxRadiusSq = 0;

			for (let i = 0, il = position.count; i < il; i++) {

				_vector$8.fromBufferAttribute(position, i);

				maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(_vector$8));

			}

			// process morph attributes if present

			if (morphAttributesPosition) {

				for (let i = 0, il = morphAttributesPosition.length; i < il; i++) {

					const morphAttribute = morphAttributesPosition[i];
					const morphTargetsRelative = this.morphTargetsRelative;

					for (let j = 0, jl = morphAttribute.count; j < jl; j++) {

						_vector$8.fromBufferAttribute(morphAttribute, j);

						if (morphTargetsRelative) {

							_offset.fromBufferAttribute(position, j);
							_vector$8.add(_offset);

						}

						maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(_vector$8));

					}

				}

			}

			this.boundingSphere.radius = Math.sqrt(maxRadiusSq);

			if (isNaN(this.boundingSphere.radius)) {

				console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);

			}

		}

	}

	computeTangents() {

		const index = this.index;
		const attributes = this.attributes;

		// based on http://www.terathon.com/code/tangent.html
		// (per vertex tangents)


		const indices = index.array;
		const positions = attributes.position.array;
		const normals = attributes.normal.array;
		const uvs = attributes.uv.array;

		const nVertices = positions.length / 3;

		if (attributes.tangent === undefined) {

			this.setAttribute('tangent', new BufferAttribute(new Float32Array(4 * nVertices), 4));

		}

		const tangents = attributes.tangent.array;

		const tan1 = [], tan2 = [];

		for (let i = 0; i < nVertices; i++) {

			tan1[i] = new Vector3();
			tan2[i] = new Vector3();

		}

		const vA = new Vector3(),
			vB = new Vector3(),
			vC = new Vector3(),

			uvA = new Vector2(),
			uvB = new Vector2(),
			uvC = new Vector2(),

			sdir = new Vector3(),
			tdir = new Vector3();

		function handleTriangle(a, b, c) {

			vA.fromArray(positions, a * 3);
			vB.fromArray(positions, b * 3);
			vC.fromArray(positions, c * 3);

			uvA.fromArray(uvs, a * 2);
			uvB.fromArray(uvs, b * 2);
			uvC.fromArray(uvs, c * 2);

			vB.sub(vA);
			vC.sub(vA);

			uvB.sub(uvA);
			uvC.sub(uvA);

			const r = 1.0 / (uvB.x * uvC.y - uvC.x * uvB.y);

			// silently ignore degenerate uv triangles having coincident or colinear vertices

			if (!isFinite(r)) {
				return;
			}

			sdir.copy(vB).multiplyScalar(uvC.y).addScaledVector(vC, -uvB.y).multiplyScalar(r);
			tdir.copy(vC).multiplyScalar(uvB.x).addScaledVector(vB, -uvC.x).multiplyScalar(r);

			tan1[a].add(sdir);
			tan1[b].add(sdir);
			tan1[c].add(sdir);

			tan2[a].add(tdir);
			tan2[b].add(tdir);
			tan2[c].add(tdir);

		}

		let groups = this.groups;

		if (groups.length === 0) {

			groups = [
				{
					start: 0,
					count: indices.length
				}
			];

		}

		for (let i = 0, il = groups.length; i < il; ++i) {

			const group = groups[i];

			const start = group.start;
			const count = group.count;

			for (let j = start, jl = start + count; j < jl; j += 3) {

				handleTriangle(
					indices[j + 0],
					indices[j + 1],
					indices[j + 2]
				);

			}

		}

		const tmp = new Vector3(), tmp2 = new Vector3();
		const n = new Vector3(), n2 = new Vector3();

		function handleVertex(v) {

			n.fromArray(normals, v * 3);
			n2.copy(n);

			const t = tan1[v];

			// Gram-Schmidt orthogonalize

			tmp.copy(t);
			tmp.sub(n.multiplyScalar(n.dot(t))).normalize();

			// Calculate handedness

			tmp2.crossVectors(n2, t);
			const test = tmp2.dot(tan2[v]);
			const w = (test < 0.0) ? -1.0 : 1.0;

			tangents[v * 4] = tmp.x;
			tangents[v * 4 + 1] = tmp.y;
			tangents[v * 4 + 2] = tmp.z;
			tangents[v * 4 + 3] = w;

		}

		for (let i = 0, il = groups.length; i < il; ++i) {

			const group = groups[i];

			const start = group.start;
			const count = group.count;

			for (let j = start, jl = start + count; j < jl; j += 3) {

				handleVertex(indices[j + 0]);
				handleVertex(indices[j + 1]);
				handleVertex(indices[j + 2]);

			}

		}

	}

	computeVertexNormals() {

		const index = this.index;
		const positionAttribute = this.getAttribute('position');

		if (positionAttribute !== undefined) {

			let normalAttribute = this.getAttribute('normal');

			if (normalAttribute === undefined) {

				normalAttribute = new BufferAttribute(new Float32Array(positionAttribute.count * 3), 3);
				this.setAttribute('normal', normalAttribute);

			} else {

				// reset existing normals to zero

				for (let i = 0, il = normalAttribute.count; i < il; i++) {

					normalAttribute.setXYZ(i, 0, 0, 0);

				}

			}

			const pA = new Vector3(), pB = new Vector3(), pC = new Vector3();
			const nA = new Vector3(), nB = new Vector3(), nC = new Vector3();
			const cb = new Vector3(), ab = new Vector3();

			// indexed elements

			if (index) {

				for (let i = 0, il = index.count; i < il; i += 3) {

					const vA = index.getX(i + 0);
					const vB = index.getX(i + 1);
					const vC = index.getX(i + 2);

					pA.fromBufferAttribute(positionAttribute, vA);
					pB.fromBufferAttribute(positionAttribute, vB);
					pC.fromBufferAttribute(positionAttribute, vC);

					cb.subVectors(pC, pB);
					ab.subVectors(pA, pB);
					cb.cross(ab);

					nA.fromBufferAttribute(normalAttribute, vA);
					nB.fromBufferAttribute(normalAttribute, vB);
					nC.fromBufferAttribute(normalAttribute, vC);

					nA.add(cb);
					nB.add(cb);
					nC.add(cb);

					normalAttribute.setXYZ(vA, nA.x, nA.y, nA.z);
					normalAttribute.setXYZ(vB, nB.x, nB.y, nB.z);
					normalAttribute.setXYZ(vC, nC.x, nC.y, nC.z);

				}

			} else {

				// non-indexed elements (unconnected triangle soup)

				for (let i = 0, il = positionAttribute.count; i < il; i += 3) {

					pA.fromBufferAttribute(positionAttribute, i + 0);
					pB.fromBufferAttribute(positionAttribute, i + 1);
					pC.fromBufferAttribute(positionAttribute, i + 2);

					cb.subVectors(pC, pB);
					ab.subVectors(pA, pB);
					cb.cross(ab);

					normalAttribute.setXYZ(i + 0, cb.x, cb.y, cb.z);
					normalAttribute.setXYZ(i + 1, cb.x, cb.y, cb.z);
					normalAttribute.setXYZ(i + 2, cb.x, cb.y, cb.z);

				}

			}

			this.normalizeNormals();

			normalAttribute.needsUpdate = true;

		}

	}


	normalizeNormals() {

		const normals = this.attributes.normal;

		for (let i = 0, il = normals.count; i < il; i++) {

			_vector$8.fromBufferAttribute(normals, i);

			_vector$8.normalize();

			normals.setXYZ(i, _vector$8.x, _vector$8.y, _vector$8.z);

		}

	}

	toNonIndexed() {

		function convertBufferAttribute(attribute, indices) {

			const array = attribute.array;
			const itemSize = attribute.itemSize;
			const normalized = attribute.normalized;

			const array2 = new array.constructor(indices.length * itemSize);

			let index = 0, index2 = 0;

			for (let i = 0, l = indices.length; i < l; i++) {

				if (attribute.isInterleavedBufferAttribute) {

					index = indices[i] * attribute.data.stride + attribute.offset;

				} else {

					index = indices[i] * itemSize;

				}

				for (let j = 0; j < itemSize; j++) {

					array2[index2++] = array[index++];

				}

			}

			return new BufferAttribute(array2, itemSize, normalized);

		}

		//

		if (this.index === null) {

			console.warn('THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.');
			return this;

		}

		const geometry2 = new BufferGeometry();

		const indices = this.index.array;
		const attributes = this.attributes;

		// attributes

		for (const name in attributes) {

			const attribute = attributes[name];

			const newAttribute = convertBufferAttribute(attribute, indices);

			geometry2.setAttribute(name, newAttribute);

		}

		// morph attributes

		const morphAttributes = this.morphAttributes;

		for (const name in morphAttributes) {

			const morphArray = [];
			const morphAttribute = morphAttributes[name]; // morphAttribute: array of Float32BufferAttributes

			for (let i = 0, il = morphAttribute.length; i < il; i++) {

				const attribute = morphAttribute[i];

				const newAttribute = convertBufferAttribute(attribute, indices);

				morphArray.push(newAttribute);

			}

			geometry2.morphAttributes[name] = morphArray;

		}

		geometry2.morphTargetsRelative = this.morphTargetsRelative;

		// groups

		const groups = this.groups;

		for (let i = 0, l = groups.length; i < l; i++) {

			const group = groups[i];
			geometry2.addGroup(group.start, group.count, group.materialIndex);

		}

		return geometry2;

	}

	clone() {

		//
		// // Handle primitives
		//
		// const parameters = this.parameters;
		//
		// if ( parameters !== undefined ) {
		//
		// const values = [];
		//
		// for ( const key in parameters ) {
		//
		// values.push( parameters[ key ] );
		//
		// }
		//
		// const geometry = Object.create( this.constructor.prototype );
		// this.constructor.apply( geometry, values );
		// return geometry;
		//
		// }
		//
		// return new this.constructor().copy( this );
		//

		return new BufferGeometry().copy(this);

	}

	copy(source) {

		// reset

		this.index = null;
		this.attributes = {};
		this.morphAttributes = {};
		this.groups = [];
		this.boundingBox = null;
		this.boundingSphere = null;

		// used for storing cloned, shared data

		const data = {};

		// name

		this.name = source.name;

		// index

		const index = source.index;

		if (index !== null) {

			this.setIndex(index.clone(data));

		}

		// attributes

		const attributes = source.attributes;

		for (const name in attributes) {

			const attribute = attributes[name];
			this.setAttribute(name, attribute.clone(data));

		}

		// morph attributes

		const morphAttributes = source.morphAttributes;

		for (const name in morphAttributes) {

			const array = [];
			const morphAttribute = morphAttributes[name]; // morphAttribute: array of Float32BufferAttributes

			for (let i = 0, l = morphAttribute.length; i < l; i++) {

				array.push(morphAttribute[i].clone(data));

			}

			this.morphAttributes[name] = array;

		}

		this.morphTargetsRelative = source.morphTargetsRelative;

		// groups

		const groups = source.groups;

		for (let i = 0, l = groups.length; i < l; i++) {

			const group = groups[i];
			this.addGroup(group.start, group.count, group.materialIndex);

		}

		// bounding box

		const boundingBox = source.boundingBox;

		if (boundingBox !== null) {

			this.boundingBox = boundingBox.clone();

		}

		// bounding sphere

		const boundingSphere = source.boundingSphere;

		if (boundingSphere !== null) {

			this.boundingSphere = boundingSphere.clone();

		}

		// draw range

		this.drawRange.start = source.drawRange.start;
		this.drawRange.count = source.drawRange.count;

		// user data

		this.userData = source.userData;

		return this;

	}

	dispose() {

		this.dispatchEvent({ type: 'dispose' });

	}

}

BufferGeometry.prototype.isBufferGeometry = true;

class Mesh extends Object3D {

	constructor(geometry = new BufferGeometry(), material) {

		super();

		this.type = 'Mesh';

		this.geometry = geometry;
		this.material = material;

		this.updateMorphTargets();

	}

	copy(source) {

		super.copy(source);

		if (source.morphTargetInfluences !== undefined) {

			this.morphTargetInfluences = source.morphTargetInfluences.slice();

		}

		if (source.morphTargetDictionary !== undefined) {

			this.morphTargetDictionary = { ...source.morphTargetDictionary };

		}

		this.material = source.material;
		this.geometry = source.geometry;

		return this;

	}

	updateMorphTargets() {
		const geometry = this.geometry;

		if (geometry.isBufferGeometry) {

			const morphAttributes = geometry.morphAttributes;
			const keys = Object.keys(morphAttributes);

			if (keys.length > 0) {

				const morphAttribute = morphAttributes[keys[0]];

				if (morphAttribute !== undefined) {

					this.morphTargetInfluences = [];
					this.morphTargetDictionary = {};

					for (let m = 0, ml = morphAttribute.length; m < ml; m++) {

						const name = morphAttribute[m].name || String(m);

						this.morphTargetInfluences.push(0);
						this.morphTargetDictionary[name] = m;

					}
				}
			}
		}
	}

}

Mesh.prototype.isMesh = true;

class BoxGeometry extends BufferGeometry {

	constructor(width = 1, height = 1, depth = 1, widthSegments = 1, heightSegments = 1, depthSegments = 1) {

		super();

		this.type = 'BoxGeometry';

		this.parameters = {
			width,
			height,
			depth,
			widthSegments,
			heightSegments,
			depthSegments
		};

		const scope = this;

		// segments

		widthSegments = Math.floor(widthSegments);
		heightSegments = Math.floor(heightSegments);
		depthSegments = Math.floor(depthSegments);

		// buffers

		const indices = [];
		const vertices = [];
		const normals = [];
		const uvs = [];

		// helper variables

		let numberOfVertices = 0;
		let groupStart = 0;

		// build each side of the box geometry

		buildPlane('z', 'y', 'x', -1, -1, depth, height, width, depthSegments, heightSegments, 0); // px
		buildPlane('z', 'y', 'x', 1, -1, depth, height, -width, depthSegments, heightSegments, 1); // nx
		buildPlane('x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2); // py
		buildPlane('x', 'z', 'y', 1, -1, width, depth, -height, widthSegments, depthSegments, 3); // ny
		buildPlane('x', 'y', 'z', 1, -1, width, height, depth, widthSegments, heightSegments, 4); // pz
		buildPlane('x', 'y', 'z', -1, -1, width, height, -depth, widthSegments, heightSegments, 5); // nz

		// build geometry

		this.setIndex(indices);
		this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
		this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
		this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));

		function buildPlane(u, v, w, udir, vdir, width, height, depth, gridX, gridY, materialIndex) {

			const segmentWidth = width / gridX;
			const segmentHeight = height / gridY;

			const widthHalf = width / 2;
			const heightHalf = height / 2;
			const depthHalf = depth / 2;

			const gridX1 = gridX + 1;
			const gridY1 = gridY + 1;

			let vertexCounter = 0;
			let groupCount = 0;

			const vector = new Vector3();

			// generate vertices, normals and uvs

			for (let iy = 0; iy < gridY1; iy++) {

				const y = iy * segmentHeight - heightHalf;

				for (let ix = 0; ix < gridX1; ix++) {

					const x = ix * segmentWidth - widthHalf;

					// set values to correct vector component

					vector[u] = x * udir;
					vector[v] = y * vdir;
					vector[w] = depthHalf;

					// now apply vector to vertex buffer

					vertices.push(vector.x, vector.y, vector.z);

					// set values to correct vector component

					vector[u] = 0;
					vector[v] = 0;
					vector[w] = depth > 0 ? 1 : -1;

					// now apply vector to normal buffer

					normals.push(vector.x, vector.y, vector.z);

					// uvs

					uvs.push(ix / gridX);
					uvs.push(1 - (iy / gridY));

					// counters

					vertexCounter += 1;

				}

			}

			// indices

			// 1. you need three indices to draw a single face
			// 2. a single segment consists of two faces
			// 3. so we need to generate six (2*3) indices per segment

			for (let iy = 0; iy < gridY; iy++) {

				for (let ix = 0; ix < gridX; ix++) {

					const a = numberOfVertices + ix + gridX1 * iy;
					const b = numberOfVertices + ix + gridX1 * (iy + 1);
					const c = numberOfVertices + (ix + 1) + gridX1 * (iy + 1);
					const d = numberOfVertices + (ix + 1) + gridX1 * iy;

					// faces

					indices.push(a, b, d);
					indices.push(b, c, d);

					// increase counter

					groupCount += 6;

				}

			}

			// add a group to the geometry. this will ensure multi material support

			scope.addGroup(groupStart, groupCount, materialIndex);

			// calculate new start value for groups

			groupStart += groupCount;

			// update total number of vertices

			numberOfVertices += vertexCounter;

		}

	}
}

/**
 * Uniform Utilities
 */

function cloneUniforms(src) {

	const dst = {};

	for (const u in src) {

		dst[u] = {};

		for (const p in src[u]) {

			const property = src[u][p];

			if (property && (property.isColor ||
				property.isMatrix3 || property.isMatrix4 ||
				property.isVector2 || property.isVector3 || property.isVector4 ||
				property.isQuaternion)) {

				dst[u][p] = property.clone();

			} else if (Array.isArray(property)) {

				dst[u][p] = property.slice();

			} else {

				dst[u][p] = property;

			}

		}

	}

	return dst;

}

function mergeUniforms(uniforms) {

	const merged = {};

	for (let u = 0; u < uniforms.length; u++) {

		const tmp = cloneUniforms(uniforms[u]);

		for (const p in tmp) {

			merged[p] = tmp[p];

		}

	}

	return merged;

}

// Legacy

const UniformsUtils = {
	clone: cloneUniforms,
	merge: mergeUniforms
};

const default_vertex = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}";

const default_fragment = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";

/**
 * parameters = {
 *  defines: { "label" : "value" },
 *  uniforms: { "parameter1": { value: 1.0 }, "parameter2": { value2: 2 } },
 *
 *  fragmentShader: <string>,
 *  vertexShader: <string>,
 *
 *  lights: <bool>
 * }
 */

class ShaderMaterial extends Material {

	constructor(parameters) {

		super();

		this.type = 'ShaderMaterial';

		this.defines = {};
		this.uniforms = {};

		this.vertexShader = default_vertex;
		this.fragmentShader = default_fragment;

		this.linewidth = 1;

		this.fog = false; // set to use scene fog
		this.lights = false; // set to use scene lights
		this.clipping = false; // set to use user-defined clipping planes

		this.extensions = {
			derivatives: false, // set to use derivatives
			drawBuffers: false // set to use draw buffers
		};

		// When rendered geometry doesn't include these attributes but the material does,
		// use these default values in WebGL. This avoids errors when buffer data is missing.
		this.defaultAttributeValues = {
			'color': [1, 1, 1],
			'uv': [0, 0],
			'uv2': [0, 0]
		};

		this.index0AttributeName = undefined;
		this.uniformsNeedUpdate = false;

		this.glslVersion = null;

		if (parameters !== undefined) {
			this.setValues(parameters);
		}
	}

	copy(source) {

		super.copy(source);

		this.fragmentShader = source.fragmentShader;
		this.vertexShader = source.vertexShader;

		this.uniforms = cloneUniforms(source.uniforms);

		this.defines = { ...source.defines };

		this.lights = source.lights;
		this.clipping = source.clipping;

		this.extensions = { ...source.extensions };

		this.glslVersion = source.glslVersion;

		return this;

	}
}

ShaderMaterial.prototype.isShaderMaterial = true;

class Camera extends Object3D {

	constructor() {

		super();

		this.type = 'Camera';

		this.matrixWorldInverse = new Matrix4();

		this.projectionMatrix = new Matrix4();
		this.projectionMatrixInverse = new Matrix4();

	}

	copy(source, recursive) {

		super.copy(source, recursive);

		this.matrixWorldInverse.copy(source.matrixWorldInverse);

		this.projectionMatrix.copy(source.projectionMatrix);
		this.projectionMatrixInverse.copy(source.projectionMatrixInverse);

		return this;

	}

	getWorldDirection(target) {

		this.updateWorldMatrix(true, false);

		const e = this.matrixWorld.elements;

		return target.set(-e[8], -e[9], -e[10]).normalize();

	}

	updateMatrixWorld(force) {

		super.updateMatrixWorld(force);

		this.matrixWorldInverse.copy(this.matrixWorld).invert();

	}

	updateWorldMatrix(updateParents, updateChildren) {

		super.updateWorldMatrix(updateParents, updateChildren);

		this.matrixWorldInverse.copy(this.matrixWorld).invert();

	}

	clone() {

		return new this.constructor().copy(this);

	}

}

Camera.prototype.isCamera = true;

class PerspectiveCamera extends Camera {

	constructor(fov = 50, aspect = 1, near = 0.1, far = 2000) {

		super();

		this.type = 'PerspectiveCamera';

		this.fov = fov;
		this.zoom = 1;

		this.near = near;
		this.far = far;
		this.focus = 10;

		this.aspect = aspect;
		this.view = null;

		this.filmGauge = 35;	// width of the film (default in millimeters)
		this.filmOffset = 0;	// horizontal film offset (same unit as gauge)

		this.updateProjectionMatrix();

	}

	copy(source, recursive) {

		super.copy(source, recursive);

		this.fov = source.fov;
		this.zoom = source.zoom;

		this.near = source.near;
		this.far = source.far;
		this.focus = source.focus;

		this.aspect = source.aspect;
		this.view = source.view === null ? null : ({ ...source.view });

		this.filmGauge = source.filmGauge;
		this.filmOffset = source.filmOffset;

		return this;

	}

	/**
	 * Sets the FOV by focal length in respect to the current .filmGauge.
	 *
	 * The default film gauge is 35, so that the focal length can be specified for
	 * a 35mm (full frame) camera.
	 *
	 * Values for focal length and film gauge must have the same unit.
	 */
	setFocalLength(focalLength) {

		/** see {@link http://www.bobatkins.com/photography/technical/field_of_view.html} */
		const vExtentSlope = 0.5 * this.getFilmHeight() / focalLength;

		this.fov = RAD2DEG * 2 * Math.atan(vExtentSlope);
		this.updateProjectionMatrix();

	}

	getEffectiveFOV() {

		return RAD2DEG * 2 * Math.atan(
			Math.tan(DEG2RAD * 0.5 * this.fov) / this.zoom);

	}

	getFilmWidth() {

		// film not completely covered in portrait format (aspect < 1)
		return this.filmGauge * Math.min(this.aspect, 1);

	}

	getFilmHeight() {

		// film not completely covered in landscape format (aspect > 1)
		return this.filmGauge / Math.max(this.aspect, 1);

	}

	clearViewOffset() {

		if (this.view !== null) {

			this.view.enabled = false;

		}

		this.updateProjectionMatrix();

	}

	updateProjectionMatrix() {

		const near = this.near;
		let top = near * Math.tan(DEG2RAD * 0.5 * this.fov) / this.zoom;
		let height = 2 * top;
		let width = this.aspect * height;
		let left = -0.5 * width;
		const view = this.view;

		if (this.view !== null && this.view.enabled) {

			const fullWidth = view.fullWidth,
				fullHeight = view.fullHeight;

			left += view.offsetX * width / fullWidth;
			top -= view.offsetY * height / fullHeight;
			width *= view.width / fullWidth;
			height *= view.height / fullHeight;

		}

		const skew = this.filmOffset;
		if (skew !== 0) {
			left += near * skew / this.getFilmWidth();
		}

		this.projectionMatrix.makePerspective(left, left + width, top, top - height, near, this.far);

		this.projectionMatrixInverse.copy(this.projectionMatrix).invert();

	}
}

PerspectiveCamera.prototype.isPerspectiveCamera = true;

const _vector1 = new Vector3();
const _vector2 = new Vector3();
const _normalMatrix = new Matrix3();

class Plane {

	constructor(normal = new Vector3(1, 0, 0), constant = 0) {

		// normal is assumed to be normalized

		this.normal = normal;
		this.constant = constant;

	}

	set(normal, constant) {

		this.normal.copy(normal);
		this.constant = constant;

		return this;

	}

	setComponents(x, y, z, w) {

		this.normal.set(x, y, z);
		this.constant = w;

		return this;

	}

	setFromNormalAndCoplanarPoint(normal, point) {

		this.normal.copy(normal);
		this.constant = -point.dot(this.normal);

		return this;

	}

	setFromCoplanarPoints(a, b, c) {

		const normal = _vector1.subVectors(c, b).cross(_vector2.subVectors(a, b)).normalize();

		// Q: should an error be thrown if normal is zero (e.g. degenerate plane)?

		this.setFromNormalAndCoplanarPoint(normal, a);

		return this;

	}

	copy(plane) {

		this.normal.copy(plane.normal);
		this.constant = plane.constant;

		return this;

	}

	normalize() {

		// Note: will lead to a divide by zero if the plane is invalid.

		const inverseNormalLength = 1.0 / this.normal.length();
		this.normal.multiplyScalar(inverseNormalLength);
		this.constant *= inverseNormalLength;

		return this;

	}

	negate() {

		this.constant *= -1;
		this.normal.negate();

		return this;

	}

	distanceToPoint(point) {

		return this.normal.dot(point) + this.constant;

	}

	distanceToSphere(sphere) {

		return this.distanceToPoint(sphere.center) - sphere.radius;

	}

	projectPoint(point, target) {

		return target.copy(this.normal).multiplyScalar(-this.distanceToPoint(point)).add(point);

	}

	intersectLine(line, target) {

		const direction = line.delta(_vector1);

		const denominator = this.normal.dot(direction);

		if (denominator === 0) {

			// line is coplanar, return origin
			if (this.distanceToPoint(line.start) === 0) {

				return target.copy(line.start);

			}

			// Unsure if this is the correct method to handle this case.
			return null;

		}

		const t = -(line.start.dot(this.normal) + this.constant) / denominator;

		if (t < 0 || t > 1) {

			return null;

		}

		return target.copy(direction).multiplyScalar(t).add(line.start);

	}

	intersectsLine(line) {

		// Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.

		const startSign = this.distanceToPoint(line.start);
		const endSign = this.distanceToPoint(line.end);

		return (startSign < 0 && endSign > 0) || (endSign < 0 && startSign > 0);

	}

	intersectsBox(box) {

		return box.intersectsPlane(this);

	}

	intersectsSphere(sphere) {

		return sphere.intersectsPlane(this);

	}

	coplanarPoint(target) {

		return target.copy(this.normal).multiplyScalar(-this.constant);

	}

	applyMatrix4(matrix, optionalNormalMatrix) {

		const normalMatrix = optionalNormalMatrix || _normalMatrix.getNormalMatrix(matrix);

		const referencePoint = this.coplanarPoint(_vector1).applyMatrix4(matrix);

		const normal = this.normal.applyMatrix3(normalMatrix).normalize();

		this.constant = -referencePoint.dot(normal);

		return this;

	}

	translate(offset) {

		this.constant -= offset.dot(this.normal);

		return this;

	}

	equals(plane) {

		return plane.normal.equals(this.normal) && (plane.constant === this.constant);

	}

	clone() {

		return new this.constructor().copy(this);

	}

}

Plane.prototype.isPlane = true;

const _sphere$2 = new Sphere();
const _vector$7 = new Vector3();

class Frustum {

	constructor(p0 = new Plane(), p1 = new Plane(), p2 = new Plane(), p3 = new Plane(), p4 = new Plane(), p5 = new Plane()) {

		this.planes = [p0, p1, p2, p3, p4, p5];

	}

	set(p0, p1, p2, p3, p4, p5) {

		const planes = this.planes;

		planes[0].copy(p0);
		planes[1].copy(p1);
		planes[2].copy(p2);
		planes[3].copy(p3);
		planes[4].copy(p4);
		planes[5].copy(p5);

		return this;

	}

	copy(frustum) {

		const planes = this.planes;

		for (let i = 0; i < 6; i++) {

			planes[i].copy(frustum.planes[i]);

		}

		return this;

	}

	setFromProjectionMatrix(m) {

		const planes = this.planes;
		const me = m.elements;
		const me0 = me[0], me1 = me[1], me2 = me[2], me3 = me[3];
		const me4 = me[4], me5 = me[5], me6 = me[6], me7 = me[7];
		const me8 = me[8], me9 = me[9], me10 = me[10], me11 = me[11];
		const me12 = me[12], me13 = me[13], me14 = me[14], me15 = me[15];

		planes[0].setComponents(me3 - me0, me7 - me4, me11 - me8, me15 - me12).normalize();
		planes[1].setComponents(me3 + me0, me7 + me4, me11 + me8, me15 + me12).normalize();
		planes[2].setComponents(me3 + me1, me7 + me5, me11 + me9, me15 + me13).normalize();
		planes[3].setComponents(me3 - me1, me7 - me5, me11 - me9, me15 - me13).normalize();
		planes[4].setComponents(me3 - me2, me7 - me6, me11 - me10, me15 - me14).normalize();
		planes[5].setComponents(me3 + me2, me7 + me6, me11 + me10, me15 + me14).normalize();

		return this;

	}

	intersectsObject(object) {

		const geometry = object.geometry;

		if (geometry.boundingSphere === null) {
			geometry.computeBoundingSphere();
		}

		_sphere$2.copy(geometry.boundingSphere).applyMatrix4(object.matrixWorld);

		return this.intersectsSphere(_sphere$2);

	}

	intersectsSphere(sphere) {

		const planes = this.planes;
		const center = sphere.center;
		const negRadius = -sphere.radius;

		for (let i = 0; i < 6; i++) {

			const distance = planes[i].distanceToPoint(center);

			if (distance < negRadius) {

				return false;

			}

		}

		return true;

	}

	intersectsBox(box) {

		const planes = this.planes;

		for (let i = 0; i < 6; i++) {

			const plane = planes[i];

			// corner at max distance

			_vector$7.x = plane.normal.x > 0 ? box.max.x : box.min.x;
			_vector$7.y = plane.normal.y > 0 ? box.max.y : box.min.y;
			_vector$7.z = plane.normal.z > 0 ? box.max.z : box.min.z;

			if (plane.distanceToPoint(_vector$7) < 0) {

				return false;

			}

		}

		return true;

	}

	containsPoint(point) {

		const planes = this.planes;

		for (let i = 0; i < 6; i++) {

			if (planes[i].distanceToPoint(point) < 0) {

				return false;

			}

		}

		return true;

	}

	clone() {

		return new this.constructor().copy(this);

	}

}

function WebGLAttributes(gl, capabilities) {

	const isWebGL2 = capabilities.isWebGL2;

	const buffers = new WeakMap();

	function createBuffer(attribute, bufferType) {

		const array = attribute.array;
		const usage = attribute.usage;

		const buffer = gl.createBuffer();

		gl.bindBuffer(bufferType, buffer);
		gl.bufferData(bufferType, array, usage);

		attribute.onUploadCallback();

		let type = 5126;

		if (array instanceof Float32Array) {

			type = 5126;

		} else if (array instanceof Float64Array) {

			console.warn('THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.');

		} else if (array instanceof Uint16Array) {
			type = 5123;
		} else if (array instanceof Int16Array) {

			type = 5122;

		} else if (array instanceof Uint32Array) {

			type = 5125;

		} else if (array instanceof Int32Array) {

			type = 5124;

		} else if (array instanceof Int8Array) {

			type = 5120;

		} else if (array instanceof Uint8Array) {

			type = 5121;

		} else if (array instanceof Uint8ClampedArray) {

			type = 5121;

		}

		return {
			buffer,
			type,
			bytesPerElement: array.BYTES_PER_ELEMENT,
			version: attribute.version
		};

	}

	function updateBuffer(buffer, attribute, bufferType) {

		const array = attribute.array;
		const updateRange = attribute.updateRange;

		gl.bindBuffer(bufferType, buffer);

		if (updateRange.count === -1) {

			// Not using update ranges

			gl.bufferSubData(bufferType, 0, array);

		} else {

			if (isWebGL2) {

				gl.bufferSubData(bufferType, updateRange.offset * array.BYTES_PER_ELEMENT, array, updateRange.offset, updateRange.count);

			} else {

				gl.bufferSubData(bufferType, updateRange.offset * array.BYTES_PER_ELEMENT, array.subarray(updateRange.offset, updateRange.offset + updateRange.count));

			}

			updateRange.count = -1; // reset range

		}

	}

	//

	function get(attribute) {

		if (attribute.isInterleavedBufferAttribute) {
			attribute = attribute.data;
		}

		return buffers.get(attribute);

	}

	function remove(attribute) {

		if (attribute.isInterleavedBufferAttribute) {
			attribute = attribute.data;
		}

		const data = buffers.get(attribute);

		if (data) {

			gl.deleteBuffer(data.buffer);

			buffers.delete(attribute);

		}

	}

	function update(attribute, bufferType) {

		if (attribute.isGLBufferAttribute) {

			const cached = buffers.get(attribute);

			if (!cached || cached.version < attribute.version) {

				buffers.set(attribute, {
					buffer: attribute.buffer,
					type: attribute.type,
					bytesPerElement: attribute.elementSize,
					version: attribute.version
				});

			}

			return;

		}

		if (attribute.isInterleavedBufferAttribute) {
			attribute = attribute.data;
		}

		const data = buffers.get(attribute);

		if (data === undefined) {

			buffers.set(attribute, createBuffer(attribute, bufferType));

		} else if (data.version < attribute.version) {

			updateBuffer(data.buffer, attribute, bufferType);

			data.version = attribute.version;

		}

	}

	return {

		get,
		remove,
		update

	};

}

const alphatest_fragment = "#ifdef USE_ALPHATEST\n\tif ( diffuseColor.a < alphaTest ) discard;\n#endif";

const alphatest_pars_fragment = "#ifdef USE_ALPHATEST\n\tuniform float alphaTest;\n#endif";

const begin_vertex = "vec3 transformed = vec3( position );";

const beginnormal_vertex = "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif";

const bsdfs = "vec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_GGX( const in IncidentLight incidentLight, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + viewDir );\n\tfloat dotNL = saturate( dot( normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\tvec3 F = F_Schlick( f0, f90, dotVH );\n\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( V * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotVH = saturate( dot( geometry.viewDir, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, 1.0, dotVH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie( float roughness, float NoH ) {\n\tfloat invAlpha = 1.0 / roughness;\n\tfloat cos2h = NoH * NoH;\n\tfloat sin2h = max( 1.0 - cos2h, 0.0078125 );\n\treturn ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n}\nfloat V_Neubelt( float NoV, float NoL ) {\n\treturn saturate( 1.0 / ( 4.0 * ( NoL + NoV - NoL * NoV ) ) );\n}\nvec3 BRDF_Sheen( const in float roughness, const in vec3 L, const in GeometricContext geometry, vec3 specularColor ) {\n\tvec3 N = geometry.normal;\n\tvec3 V = geometry.viewDir;\n\tvec3 H = normalize( V + L );\n\tfloat dotNH = saturate( dot( N, H ) );\n\treturn specularColor * D_Charlie( roughness, dotNH ) * V_Neubelt( dot(N, V), dot(N, L) );\n}\n#endif";

const bumpmap_pars_fragment = "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 ) * faceDirection;\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif";

const clipping_planes_fragment = "#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#pragma unroll_loop_end\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t\tif ( clipped ) discard;\n\t#endif\n#endif";

const clipping_planes_pars_fragment = "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif";

const clipping_planes_pars_vertex = "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n#endif";

const clipping_planes_vertex = "#if NUM_CLIPPING_PLANES > 0\n\tvClipPosition = - mvPosition.xyz;\n#endif";

const color_fragment = "#if defined( USE_COLOR_ALPHA )\n\tdiffuseColor *= vColor;\n#elif defined( USE_COLOR )\n\tdiffuseColor.rgb *= vColor;\n#endif";

const color_pars_fragment = "#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR )\n\tvarying vec3 vColor;\n#endif";

const color_pars_vertex = "#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvarying vec3 vColor;\n#endif";

const color_vertex = "#if defined( USE_COLOR_ALPHA )\n\tvColor = vec4( 1.0 );\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvColor = vec3( 1.0 );\n#endif\n#ifdef USE_COLOR\n\tvColor *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n\tvColor.xyz *= instanceColor.xyz;\n#endif";

const common = "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract( sin( sn ) * c );\n}\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n#ifdef USE_CLEARCOAT\n\tvec3 clearcoatNormal;\n#endif\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n\treturn m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n\tfloat u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n\tfloat v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\treturn vec2( u, v );\n}";

const cube_uv_reflection_fragment = "#ifdef ENVMAP_TYPE_CUBE_UV\n\t#define cubeUV_maxMipLevel 8.0\n\t#define cubeUV_minMipLevel 4.0\n\t#define cubeUV_maxTileSize 256.0\n\t#define cubeUV_minTileSize 16.0\n\tfloat getFace( vec3 direction ) {\n\t\tvec3 absDirection = abs( direction );\n\t\tfloat face = - 1.0;\n\t\tif ( absDirection.x > absDirection.z ) {\n\t\t\tif ( absDirection.x > absDirection.y )\n\t\t\t\tface = direction.x > 0.0 ? 0.0 : 3.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t} else {\n\t\t\tif ( absDirection.z > absDirection.y )\n\t\t\t\tface = direction.z > 0.0 ? 2.0 : 5.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t}\n\t\treturn face;\n\t}\n\tvec2 getUV( vec3 direction, float face ) {\n\t\tvec2 uv;\n\t\tif ( face == 0.0 ) {\n\t\t\tuv = vec2( direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 1.0 ) {\n\t\t\tuv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n\t\t} else if ( face == 2.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.y ) / abs( direction.z );\n\t\t} else if ( face == 3.0 ) {\n\t\t\tuv = vec2( - direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 4.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.z ) / abs( direction.y );\n\t\t} else {\n\t\t\tuv = vec2( direction.x, direction.y ) / abs( direction.z );\n\t\t}\n\t\treturn 0.5 * ( uv + 1.0 );\n\t}\n\tvec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n\t\tfloat face = getFace( direction );\n\t\tfloat filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n\t\tmipInt = max( mipInt, cubeUV_minMipLevel );\n\t\tfloat faceSize = exp2( mipInt );\n\t\tfloat texelSize = 1.0 / ( 3.0 * cubeUV_maxTileSize );\n\t\tvec2 uv = getUV( direction, face ) * ( faceSize - 1.0 );\n\t\tvec2 f = fract( uv );\n\t\tuv += 0.5 - f;\n\t\tif ( face > 2.0 ) {\n\t\t\tuv.y += faceSize;\n\t\t\tface -= 3.0;\n\t\t}\n\t\tuv.x += face * faceSize;\n\t\tif ( mipInt < cubeUV_maxMipLevel ) {\n\t\t\tuv.y += 2.0 * cubeUV_maxTileSize;\n\t\t}\n\t\tuv.y += filterInt * 2.0 * cubeUV_minTileSize;\n\t\tuv.x += 3.0 * max( 0.0, cubeUV_maxTileSize - 2.0 * faceSize );\n\t\tuv *= texelSize;\n\t\tvec3 tl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.x += texelSize;\n\t\tvec3 tr = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.y += texelSize;\n\t\tvec3 br = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tuv.x -= texelSize;\n\t\tvec3 bl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;\n\t\tvec3 tm = mix( tl, tr, f.x );\n\t\tvec3 bm = mix( bl, br, f.x );\n\t\treturn mix( tm, bm, f.y );\n\t}\n\t#define r0 1.0\n\t#define v0 0.339\n\t#define m0 - 2.0\n\t#define r1 0.8\n\t#define v1 0.276\n\t#define m1 - 1.0\n\t#define r4 0.4\n\t#define v4 0.046\n\t#define m4 2.0\n\t#define r5 0.305\n\t#define v5 0.016\n\t#define m5 3.0\n\t#define r6 0.21\n\t#define v6 0.0038\n\t#define m6 4.0\n\tfloat roughnessToMip( float roughness ) {\n\t\tfloat mip = 0.0;\n\t\tif ( roughness >= r1 ) {\n\t\t\tmip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;\n\t\t} else if ( roughness >= r4 ) {\n\t\t\tmip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;\n\t\t} else if ( roughness >= r5 ) {\n\t\t\tmip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;\n\t\t} else if ( roughness >= r6 ) {\n\t\t\tmip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;\n\t\t} else {\n\t\t\tmip = - 2.0 * log2( 1.16 * roughness );\t\t}\n\t\treturn mip;\n\t}\n\tvec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n\t\tfloat mip = clamp( roughnessToMip( roughness ), m0, cubeUV_maxMipLevel );\n\t\tfloat mipF = fract( mip );\n\t\tfloat mipInt = floor( mip );\n\t\tvec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n\t\tif ( mipF == 0.0 ) {\n\t\t\treturn vec4( color0, 1.0 );\n\t\t} else {\n\t\t\tvec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n\t\t\treturn vec4( mix( color0, color1, mipF ), 1.0 );\n\t\t}\n\t}\n#endif";

const defaultnormal_vertex = "vec3 transformedNormal = objectNormal;\n#ifdef USE_INSTANCING\n\tmat3 m = mat3( instanceMatrix );\n\ttransformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );\n\ttransformedNormal = m * transformedNormal;\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#ifdef FLIP_SIDED\n\t\ttransformedTangent = - transformedTangent;\n\t#endif\n#endif";

const displacementmap_pars_vertex = "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif";

const displacementmap_vertex = "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );\n#endif";

const emissivemap_fragment = "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif";

const emissivemap_pars_fragment = "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif";

const encodings_fragment = "gl_FragColor = linearToOutputTexel( gl_FragColor );";

const encodings_pars_fragment = "\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * value.a * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat M = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat D = max( maxRange / maxRGB, 1.0 );\n\tD = clamp( floor( D ) / 255.0, 0.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value ) {\n\tvec3 Xp_Y_XYZp = cLogLuvM * value.rgb;\n\tXp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract( Le );\n\tvResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;\n\treturn vec4( max( vRGB, 0.0 ), 1.0 );\n}";

const envmap_fragment = "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvec3 cameraToFrag;\n\t\tif ( false ) {\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t\tenvColor = envMapTexelToLinear( envColor );\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\tvec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif";

const envmap_common_pars_fragment = "#ifdef USE_ENVMAP\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\tuniform int maxMipLevel;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif";

const envmap_pars_fragment = "#ifdef USE_ENVMAP\n\tuniform float reflectivity;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif";

const envmap_pars_vertex = "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif";

const envmap_vertex = "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex;\n\t\tif ( false ) {\n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif";

const fog_vertex = "#ifdef USE_FOG\n\tvFogDepth = - mvPosition.z;\n#endif";

const fog_pars_vertex = "#ifdef USE_FOG\n\tvarying float vFogDepth;\n#endif";

const fog_fragment = "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif";

const fog_pars_fragment = "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float vFogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif";

const lightmap_fragment = "#ifdef USE_LIGHTMAP\n\tvec4 lightMapTexel = texture2D( lightMap, vUv2 );\n\tvec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tlightMapIrradiance *= PI;\n\t#endif\n\treflectedLight.indirectDiffuse += lightMapIrradiance;\n#endif";

const lightmap_pars_fragment = "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif";

const lights_lambert_vertex = "vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\nvIndirectFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n\tvIndirectBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\nvIndirectFront += getAmbientLightIrradiance( ambientLightColor );\nvIndirectFront += getLightProbeIrradiance( lightProbe, geometry );\n#ifdef DOUBLE_SIDED\n\tvIndirectBack += getAmbientLightIrradiance( ambientLightColor );\n\tvIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry );\n#endif\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointLightInfo( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( - dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotLightInfo( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( - dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalLightInfo( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( - dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif";

const lights_pars_begin = "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\nuniform vec3 lightProbe[ 9 ];\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\treturn result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in GeometricContext geometry ) {\n\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\treturn irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\treturn irradiance;\n}\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\t#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\t\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\t\tif ( cutoffDistance > 0.0 ) {\n\t\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t\t}\n\t\treturn distanceFalloff;\n\t#else\n\t\tif ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\t\t\treturn pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t\t}\n\t\treturn 1.0;\n\t#endif\n}\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n\treturn smoothstep( coneCosine, penumbraCosine, angleCosine );\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {\n\t\tlight.color = directionalLight.color;\n\t\tlight.direction = directionalLight.direction;\n\t\tlight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tlight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tlight.color = pointLight.color;\n\t\tlight.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tlight.direction = normalize( lVector );\n\t\tfloat angleCos = dot( light.direction, spotLight.direction );\n\t\tfloat spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\tif ( spotAttenuation > 0.0 ) {\n\t\t\tfloat lightDistance = length( lVector );\n\t\t\tlight.color = spotLight.color * spotAttenuation;\n\t\t\tlight.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\t\t} else {\n\t\t\tlight.color = vec3( 0.0 );\n\t\t\tlight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\treturn irradiance;\n\t}\n#endif";

const envmap_physical_pars_fragment = "#if defined( USE_ENVMAP )\n\t#ifdef ENVMAP_MODE_REFRACTION\n\t\tuniform float refractionRatio;\n\t#endif\n\tvec3 getIBLIrradiance( const in GeometricContext geometry ) {\n\t\t#if defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );\n\t\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t\t#else\n\t\t\treturn vec3( 0.0 );\n\t\t#endif\n\t}\n\tvec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n\t\t#if defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 reflectVec;\n\t\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\t\treflectVec = reflect( - viewDir, normal );\n\t\t\t\treflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\t\t\t#else\n\t\t\t\treflectVec = refract( - viewDir, normal, refractionRatio );\n\t\t\t#endif\n\t\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );\n\t\t\treturn envMapColor.rgb * envMapIntensity;\n\t\t#else\n\t\t\treturn vec3( 0.0 );\n\t\t#endif\n\t}\n#endif";

const lights_phong_fragment = "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;";

const lights_phong_pars_fragment = "varying vec3 vViewPosition;\nstruct BlinnPhongMaterial {\n\tvec3 diffuseColor;\n\tvec3 specularColor;\n\tfloat specularShininess;\n\tfloat specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)";

const lights_physical_fragment = "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nvec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n#ifdef IOR\n\t#ifdef SPECULAR\n\t\tfloat specularIntensityFactor = specularIntensity;\n\t\tvec3 specularTintFactor = specularTint;\n\t\t#ifdef USE_SPECULARINTENSITYMAP\n\t\t\tspecularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;\n\t\t#endif\n\t\t#ifdef USE_SPECULARTINTMAP\n\t\t\tspecularTintFactor *= specularTintMapTexelToLinear( texture2D( specularTintMap, vUv ) ).rgb;\n\t\t#endif\n\t\tmaterial.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n\t#else\n\t\tfloat specularIntensityFactor = 1.0;\n\t\tvec3 specularTintFactor = vec3( 1.0 );\n\t\tmaterial.specularF90 = 1.0;\n\t#endif\n\tmaterial.specularColor = mix( min( pow2( ( ior - 1.0 ) / ( ior + 1.0 ) ) * specularTintFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.specularF90 = 1.0;\n#endif\n#ifdef USE_CLEARCOAT\n\tmaterial.clearcoat = clearcoat;\n\tmaterial.clearcoatRoughness = clearcoatRoughness;\n\tmaterial.clearcoatF0 = vec3( 0.04 );\n\tmaterial.clearcoatF90 = 1.0;\n\t#ifdef USE_CLEARCOATMAP\n\t\tmaterial.clearcoat *= texture2D( clearcoatMap, vUv ).x;\n\t#endif\n\t#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\t\tmaterial.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;\n\t#endif\n\tmaterial.clearcoat = saturate( material.clearcoat );\tmaterial.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_SHEEN\n\tmaterial.sheenTint = sheenTint;\n#endif";

const lights_physical_pars_fragment = "struct PhysicalMaterial {\n\tvec3 diffuseColor;\n\tfloat roughness;\n\tvec3 specularColor;\n\tfloat specularF90;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat clearcoat;\n\t\tfloat clearcoatRoughness;\n\t\tvec3 clearcoatF0;\n\t\tfloat clearcoatF90;\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tvec3 sheenTint;\n\t#endif\n};\nvec3 clearcoatSpecular = vec3( 0.0 );\nvec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;\n\treturn fab;\n}\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\treturn specularColor * fab.x + specularF90 * fab.y;\n}\nvoid computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\tvec3 FssEss = specularColor * fab.x + specularF90 * fab.y;\n\tfloat Ess = fab.x + fab.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.roughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );\n\t\tvec3 ccIrradiance = dotNLcc * directLight.color;\n\t\tclearcoatSpecular += ccIrradiance * BRDF_GGX( directLight, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n\t#endif\n\t#ifdef USE_SHEEN\n\t\treflectedLight.directSpecular += irradiance * BRDF_Sheen( material.roughness, directLight.direction, geometry, material.sheenTint );\n\t#else\n\t\treflectedLight.directSpecular += irradiance * BRDF_GGX( directLight, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifdef USE_CLEARCOAT\n\t\tclearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n\t#endif\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\tcomputeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );\n\treflectedLight.indirectSpecular += radiance * singleScattering;\n\treflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}";

const lights_fragment_begin = "\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = normalize( vViewPosition );\n#ifdef USE_CLEARCOAT\n\tgeometry.clearcoatNormal = clearcoatNormal;\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointLightInfo( pointLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tpointLightShadow = pointLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotLightInfo( spotLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tspotLightShadow = spotLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalLightInfo( directionalLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectionalLightShadow = directionalLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 iblIrradiance = vec3( 0.0 );\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\tirradiance += getLightProbeIrradiance( lightProbe, geometry );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n#endif";

const lights_fragment_maps = "#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel = texture2D( lightMap, vUv2 );\n\t\tvec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tiblIrradiance += getIBLIrradiance( geometry );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );\n\t#ifdef USE_CLEARCOAT\n\t\tclearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );\n\t#endif\n#endif";

const lights_fragment_end = "#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );\n#endif";

const logdepthbuf_fragment = "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif";

const logdepthbuf_pars_fragment = "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif";

const logdepthbuf_pars_vertex = "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t\tvarying float vIsPerspective;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif";

const logdepthbuf_vertex = "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n\t#else\n\t\tif ( isPerspectiveMatrix( projectionMatrix ) ) {\n\t\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\t\tgl_Position.z *= gl_Position.w;\n\t\t}\n\t#endif\n#endif";

const map_fragment = "#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif";

const map_pars_fragment = "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif";

const map_particle_fragment = "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n#endif\n#ifdef USE_MAP\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif";

const map_particle_pars_fragment = "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tuniform mat3 uvTransform;\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif";

const metalnessmap_fragment = "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif";

const metalnessmap_pars_fragment = "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif";

const morphnormal_vertex = "#ifdef USE_MORPHNORMALS\n\tobjectNormal *= morphTargetBaseInfluence;\n\tobjectNormal += morphNormal0 * morphTargetInfluences[ 0 ];\n\tobjectNormal += morphNormal1 * morphTargetInfluences[ 1 ];\n\tobjectNormal += morphNormal2 * morphTargetInfluences[ 2 ];\n\tobjectNormal += morphNormal3 * morphTargetInfluences[ 3 ];\n#endif";

const morphtarget_pars_vertex = "#ifdef USE_MORPHTARGETS\n\tuniform float morphTargetBaseInfluence;\n\t#ifndef USE_MORPHNORMALS\n\t\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\t\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif";

const morphtarget_vertex = "#ifdef USE_MORPHTARGETS\n\ttransformed *= morphTargetBaseInfluence;\n\ttransformed += morphTarget0 * morphTargetInfluences[ 0 ];\n\ttransformed += morphTarget1 * morphTargetInfluences[ 1 ];\n\ttransformed += morphTarget2 * morphTargetInfluences[ 2 ];\n\ttransformed += morphTarget3 * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\t\ttransformed += morphTarget4 * morphTargetInfluences[ 4 ];\n\t\ttransformed += morphTarget5 * morphTargetInfluences[ 5 ];\n\t\ttransformed += morphTarget6 * morphTargetInfluences[ 6 ];\n\t\ttransformed += morphTarget7 * morphTargetInfluences[ 7 ];\n\t#endif\n#endif";

const normal_fragment_begin = "float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\t#ifdef USE_TANGENT\n\t\tvec3 tangent = normalize( vTangent );\n\t\tvec3 bitangent = normalize( vBitangent );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\ttangent = tangent * faceDirection;\n\t\t\tbitangent = bitangent * faceDirection;\n\t\t#endif\n\t\t#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )\n\t\t\tmat3 vTBN = mat3( tangent, bitangent, normal );\n\t\t#endif\n\t#endif\n#endif\nvec3 geometryNormal = normal;";

const normal_fragment_maps = "#ifdef OBJECTSPACE_NORMALMAP\n\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t#ifdef FLIP_SIDED\n\t\tnormal = - normal;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\tnormal = normalize( normalMatrix * normal );\n#elif defined( TANGENTSPACE_NORMALMAP )\n\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\tmapN.xy *= normalScale;\n\t#ifdef USE_TANGENT\n\t\tnormal = normalize( vTBN * mapN );\n\t#else\n\t\tnormal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );\n\t#endif\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif";

const normal_pars_fragment = "#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif";

const normal_pars_vertex = "#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif";

const normal_vertex = "#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif";

const normalmap_pars_fragment = "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n#endif\n#ifdef OBJECTSPACE_NORMALMAP\n\tuniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {\n\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tvec3 N = surf_norm;\n\t\tvec3 q1perp = cross( q1, N );\n\t\tvec3 q0perp = cross( N, q0 );\n\t\tvec3 T = q1perp * st0.x + q0perp * st1.x;\n\t\tvec3 B = q1perp * st0.y + q0perp * st1.y;\n\t\tfloat det = max( dot( T, T ), dot( B, B ) );\n\t\tfloat scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );\n\t\treturn normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );\n\t}\n#endif";

const clearcoat_normal_fragment_begin = "#ifdef USE_CLEARCOAT\n\tvec3 clearcoatNormal = geometryNormal;\n#endif";

const clearcoat_normal_fragment_maps = "#ifdef USE_CLEARCOAT_NORMALMAP\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\t#ifdef USE_TANGENT\n\t\tclearcoatNormal = normalize( vTBN * clearcoatMapN );\n\t#else\n\t\tclearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );\n\t#endif\n#endif";

const clearcoat_pars_fragment = "#ifdef USE_CLEARCOATMAP\n\tuniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform sampler2D clearcoatRoughnessMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n#endif";

const output_fragment = "#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= transmissionAlpha + 0.1;\n#endif\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );";

const packing = "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nvec4 pack2HalfToRGBA( vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\nvec2 unpackRGBATo2Half( vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}";

const premultiplied_alpha_fragment = "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif";

const project_vertex = "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\n\tmvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;";

const dithering_fragment = "#ifdef DITHERING\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif";

const dithering_pars_fragment = "#ifdef DITHERING\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif";

const roughnessmap_fragment = "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif";

const roughnessmap_pars_fragment = "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif";

const shadowmap_pars_fragment = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\t\treturn unpackRGBATo2Half( texture2D( shadow, uv ) );\n\t}\n\tfloat VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n\t\tfloat occlusion = 1.0;\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\t\tfloat hard_shadow = step( compare , distribution.x );\n\t\tif (hard_shadow != 1.0 ) {\n\t\t\tfloat distance = compare - distribution.x ;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance );\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\t\t}\n\t\treturn occlusion;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx = texelSize.x;\n\t\t\tfloat dy = texelSize.y;\n\t\t\tvec2 uv = shadowCoord.xy;\n\t\t\tvec2 f = fract( uv * shadowMapSize + 0.5 );\n\t\t\tuv -= f * texelSize;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, uv, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), \n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t f.y )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif";

const shadowmap_pars_vertex = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n#endif";

const shadowmap_vertex = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0\n\t\tvec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\tvec4 shadowWorldPosition;\n\t#endif\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n#endif";

const shadowmask_pars_fragment = "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tdirectionalLight = directionalLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tspotLight = spotLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tpointLight = pointLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#endif\n\treturn shadow;\n}";

const skinbase_vertex = "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif";

const skinning_pars_vertex = "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform highp sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif";

const skinning_vertex = "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif";

const skinnormal_vertex = "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n#endif";

const specularmap_fragment = "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif";

const specularmap_pars_fragment = "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif";

const tonemapping_fragment = "#if defined( TONE_MAPPING )\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif";

const tonemapping_pars_fragment = "#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n\tvec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n\tvec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238089;\n\treturn a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tconst mat3 ACESInputMat = mat3(\n\t\tvec3( 0.59719, 0.07600, 0.02840 ),\t\tvec3( 0.35458, 0.90834, 0.13383 ),\n\t\tvec3( 0.04823, 0.01566, 0.83777 )\n\t);\n\tconst mat3 ACESOutputMat = mat3(\n\t\tvec3(  1.60475, -0.10208, -0.00327 ),\t\tvec3( -0.53108,  1.10813, -0.07276 ),\n\t\tvec3( -0.07367, -0.00605,  1.07602 )\n\t);\n\tcolor *= toneMappingExposure / 0.6;\n\tcolor = ACESInputMat * color;\n\tcolor = RRTAndODTFit( color );\n\tcolor = ACESOutputMat * color;\n\treturn saturate( color );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }";

const transmission_fragment = "#ifdef USE_TRANSMISSION\n\tfloat transmissionAlpha = 1.0;\n\tfloat transmissionFactor = transmission;\n\tfloat thicknessFactor = thickness;\n\t#ifdef USE_TRANSMISSIONMAP\n\t\ttransmissionFactor *= texture2D( transmissionMap, vUv ).r;\n\t#endif\n\t#ifdef USE_THICKNESSMAP\n\t\tthicknessFactor *= texture2D( thicknessMap, vUv ).g;\n\t#endif\n\tvec3 pos = vWorldPosition;\n\tvec3 v = normalize( cameraPosition - pos );\n\tvec3 n = inverseTransformDirection( normal, viewMatrix );\n\tvec4 transmission = getIBLVolumeRefraction(\n\t\tn, v, roughnessFactor, material.diffuseColor, material.specularColor, material.specularF90,\n\t\tpos, modelMatrix, viewMatrix, projectionMatrix, ior, thicknessFactor,\n\t\tattenuationTint, attenuationDistance );\n\ttotalDiffuse = mix( totalDiffuse, transmission.rgb, transmissionFactor );\n\ttransmissionAlpha = transmission.a;\n#endif";

const transmission_pars_fragment = "#ifdef USE_TRANSMISSION\n\tuniform float transmission;\n\tuniform float thickness;\n\tuniform float attenuationDistance;\n\tuniform vec3 attenuationTint;\n\t#ifdef USE_TRANSMISSIONMAP\n\t\tuniform sampler2D transmissionMap;\n\t#endif\n\t#ifdef USE_THICKNESSMAP\n\t\tuniform sampler2D thicknessMap;\n\t#endif\n\tuniform vec2 transmissionSamplerSize;\n\tuniform sampler2D transmissionSamplerMap;\n\tuniform mat4 modelMatrix;\n\tuniform mat4 projectionMatrix;\n\tvarying vec3 vWorldPosition;\n\tvec3 getVolumeTransmissionRay( vec3 n, vec3 v, float thickness, float ior, mat4 modelMatrix ) {\n\t\tvec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n\t\tvec3 modelScale;\n\t\tmodelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n\t\tmodelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n\t\tmodelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n\t\treturn normalize( refractionVector ) * thickness * modelScale;\n\t}\n\tfloat applyIorToRoughness( float roughness, float ior ) {\n\t\treturn roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n\t}\n\tvec4 getTransmissionSample( vec2 fragCoord, float roughness, float ior ) {\n\t\tfloat framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\treturn texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );\n\t\t#else\n\t\t\treturn texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );\n\t\t#endif\n\t}\n\tvec3 applyVolumeAttenuation( vec3 radiance, float transmissionDistance, vec3 attenuationColor, float attenuationDistance ) {\n\t\tif ( attenuationDistance == 0.0 ) {\n\t\t\treturn radiance;\n\t\t} else {\n\t\t\tvec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n\t\t\tvec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );\t\t\treturn transmittance * radiance;\n\t\t}\n\t}\n\tvec4 getIBLVolumeRefraction( vec3 n, vec3 v, float roughness, vec3 diffuseColor, vec3 specularColor, float specularF90,\n\t\tvec3 position, mat4 modelMatrix, mat4 viewMatrix, mat4 projMatrix, float ior, float thickness,\n\t\tvec3 attenuationColor, float attenuationDistance ) {\n\t\tvec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n\t\tvec3 refractedRayExit = position + transmissionRay;\n\t\tvec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n\t\tvec2 refractionCoords = ndcPos.xy / ndcPos.w;\n\t\trefractionCoords += 1.0;\n\t\trefractionCoords /= 2.0;\n\t\tvec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n\t\tvec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );\n\t\tvec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n\t\treturn vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );\n\t}\n#endif";

const uv_pars_fragment = "#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )\n\tvarying vec2 vUv;\n#endif";

const uv_pars_vertex = "#ifdef USE_UV\n\t#ifdef UVS_VERTEX_ONLY\n\t\tvec2 vUv;\n\t#else\n\t\tvarying vec2 vUv;\n\t#endif\n\tuniform mat3 uvTransform;\n#endif";

const uv_vertex = "#ifdef USE_UV\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif";

const uv2_pars_fragment = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif";

const uv2_pars_vertex = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n\tuniform mat3 uv2Transform;\n#endif";

const uv2_vertex = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;\n#endif";

const worldpos_vertex = "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION )\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMatrix * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif";

const depth_frag = "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\t#endif\n}";

const meshbasic_frag = "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\treflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";

const meshbasic_vert = "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinbase_vertex>\n\t\t#include <skinnormal_vertex>\n\t\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}";

const meshphysical_frag = "#define STANDARD\n#ifdef PHYSICAL\n\t#define IOR\n\t#define SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n\tuniform float ior;\n#endif\n#ifdef SPECULAR\n\tuniform float specularIntensity;\n\tuniform vec3 specularTint;\n\t#ifdef USE_SPECULARINTENSITYMAP\n\t\tuniform sampler2D specularIntensityMap;\n\t#endif\n\t#ifdef USE_SPECULARTINTMAP\n\t\tuniform sampler2D specularTintMap;\n\t#endif\n#endif\n#ifdef USE_CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheenTint;\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\tvec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n\tvec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n\t#include <transmission_fragment>\n\tvec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );\n\t\tvec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n\t\toutgoingLight = outgoingLight * ( 1.0 - clearcoat * Fcc ) + clearcoatSpecular * clearcoat;\n\t#endif\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";

const meshphysical_vert = "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n\tvarying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n\tvWorldPosition = worldPosition.xyz;\n#endif\n}";

const meshtoon_frag = "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";

const meshtoon_vert = "#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";

const ShaderChunk = {
	alphatest_fragment,
	alphatest_pars_fragment,
	begin_vertex,
	beginnormal_vertex,
	bsdfs,
	bumpmap_pars_fragment,
	clipping_planes_fragment,
	clipping_planes_pars_fragment,
	clipping_planes_pars_vertex,
	clipping_planes_vertex,
	color_fragment,
	color_pars_fragment,
	color_pars_vertex,
	color_vertex,
	common,
	cube_uv_reflection_fragment,
	defaultnormal_vertex,
	displacementmap_pars_vertex,
	displacementmap_vertex,
	emissivemap_fragment,
	emissivemap_pars_fragment,
	encodings_fragment,
	encodings_pars_fragment,
	envmap_fragment,
	envmap_common_pars_fragment,
	envmap_pars_fragment,
	envmap_pars_vertex,
	envmap_physical_pars_fragment,
	envmap_vertex,
	fog_vertex,
	fog_pars_vertex,
	fog_fragment,
	fog_pars_fragment,
	lightmap_fragment,
	lightmap_pars_fragment,
	lights_lambert_vertex,
	lights_pars_begin,
	lights_phong_fragment,
	lights_phong_pars_fragment,
	lights_physical_fragment,
	lights_physical_pars_fragment,
	lights_fragment_begin,
	lights_fragment_maps,
	lights_fragment_end,
	logdepthbuf_fragment,
	logdepthbuf_pars_fragment,
	logdepthbuf_pars_vertex,
	logdepthbuf_vertex,
	map_fragment,
	map_pars_fragment,
	map_particle_fragment,
	map_particle_pars_fragment,
	metalnessmap_fragment,
	metalnessmap_pars_fragment,
	morphnormal_vertex,
	morphtarget_pars_vertex,
	morphtarget_vertex,
	normal_fragment_begin,
	normal_fragment_maps,
	normal_pars_fragment,
	normal_pars_vertex,
	normal_vertex,
	normalmap_pars_fragment,
	clearcoat_normal_fragment_begin,
	clearcoat_normal_fragment_maps,
	clearcoat_pars_fragment,
	output_fragment,
	packing,
	premultiplied_alpha_fragment,
	project_vertex,
	dithering_fragment,
	dithering_pars_fragment,
	roughnessmap_fragment,
	roughnessmap_pars_fragment,
	shadowmap_pars_fragment,
	shadowmap_pars_vertex,
	shadowmap_vertex,
	shadowmask_pars_fragment,
	skinbase_vertex,
	skinning_pars_vertex,
	skinning_vertex,
	skinnormal_vertex,
	specularmap_fragment,
	specularmap_pars_fragment,
	tonemapping_fragment,
	tonemapping_pars_fragment,
	transmission_fragment,
	transmission_pars_fragment,
	uv_pars_fragment,
	uv_pars_vertex,
	uv_vertex,
	uv2_pars_fragment,
	uv2_pars_vertex,
	uv2_vertex,
	worldpos_vertex,

	depth_frag,
	meshbasic_frag,
	meshbasic_vert,
	meshphysical_frag,
	meshphysical_vert,
	meshtoon_frag,
	meshtoon_vert
};

/**
 * Uniforms library for shared webgl shaders
 */

const UniformsLib = {

	common: {

		diffuse: { value: new Color(0xffffff) },
		opacity: { value: 1.0 },

		map: { value: null },
		uvTransform: { value: new Matrix3() },
		uv2Transform: { value: new Matrix3() },

		alphaMap: { value: null },
		alphaTest: { value: 0 }

	},

	envmap: {

		envMap: { value: null },
		flipEnvMap: { value: -1 },
		reflectivity: { value: 1.0 }, // basic, lambert, phong
		ior: { value: 1.5 }, // standard, physical
		refractionRatio: { value: 0.98 },
		maxMipLevel: { value: 0 }

	},

	aomap: {

		aoMap: { value: null },
		aoMapIntensity: { value: 1 }

	},

	lightmap: {

		lightMap: { value: null },
		lightMapIntensity: { value: 1 }

	},

	emissivemap: {

		emissiveMap: { value: null }

	},

	bumpmap: {

		bumpMap: { value: null },
		bumpScale: { value: 1 }

	},

	normalmap: {

		normalMap: { value: null },
		normalScale: { value: new Vector2(1, 1) }

	},

	displacementmap: {
		displacementMap: { value: null },
		displacementScale: { value: 1 },
		displacementBias: { value: 0 }
	},

	roughnessmap: {

		roughnessMap: { value: null }

	},

	metalnessmap: {

		metalnessMap: { value: null }

	},

	gradientmap: {

		gradientMap: { value: null }

	},

	fog: {

		fogDensity: { value: 0.00025 },
		fogNear: { value: 1 },
		fogFar: { value: 2000 },
		fogColor: { value: new Color(0xffffff) }

	},

	lights: {

		ambientLightColor: { value: [] },

		lightProbe: { value: [] },

		directionalLights: {
			value: [],
			properties: {
				direction: {},
				color: {}
			}
		},

		directionalLightShadows: {
			value: [],
			properties: {
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			}
		},

		directionalShadowMap: { value: [] },
		directionalShadowMatrix: { value: [] },

		spotLights: {
			value: [],
			properties: {
				color: {},
				position: {},
				direction: {},
				distance: {},
				coneCos: {},
				penumbraCos: {},
				decay: {}
			}
		},

		spotLightShadows: {
			value: [],
			properties: {
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			}
		},

		spotShadowMap: { value: [] },
		spotShadowMatrix: { value: [] },

		pointLights: {
			value: [],
			properties: {
				color: {},
				position: {},
				decay: {},
				distance: {}
			}
		},

		pointLightShadows: {
			value: [],
			properties: {
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {},
				shadowCameraNear: {},
				shadowCameraFar: {}
			}
		},

		pointShadowMap: { value: [] },
		pointShadowMatrix: { value: [] },

		hemisphereLights: {
			value: [],
			properties: {
				direction: {},
				skyColor: {},
				groundColor: {}
			}
		},

		// TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
		rectAreaLights: {
			value: [],
			properties: {
				color: {},
				position: {},
				width: {},
				height: {}
			}
		},

		ltc_1: { value: null },
		ltc_2: { value: null }

	},

	points: {

		diffuse: { value: new Color(0xffffff) },
		opacity: { value: 1.0 },
		size: { value: 1.0 },
		scale: { value: 1.0 },
		map: { value: null },
		alphaMap: { value: null },
		alphaTest: { value: 0 },
		uvTransform: { value: new Matrix3() }

	},
};

const ShaderLib = {

	basic: {

		uniforms: mergeUniforms([
			UniformsLib.common,
			UniformsLib.specularmap,
			UniformsLib.envmap,
			UniformsLib.aomap,
			UniformsLib.lightmap,
			UniformsLib.fog
		]),

		vertexShader: ShaderChunk.meshbasic_vert,
		fragmentShader: ShaderChunk.meshbasic_frag

	},

	lambert: {

		uniforms: mergeUniforms([
			UniformsLib.common,
			UniformsLib.specularmap,
			UniformsLib.envmap,
			UniformsLib.aomap,
			UniformsLib.lightmap,
			UniformsLib.emissivemap,
			UniformsLib.fog,
			UniformsLib.lights,
			{
				emissive: { value: new Color(0x000000) }
			}
		]),

		vertexShader: ShaderChunk.meshlambert_vert,
		fragmentShader: ShaderChunk.meshlambert_frag

	},

	phong: {

		uniforms: mergeUniforms([
			UniformsLib.common,
			UniformsLib.specularmap,
			UniformsLib.envmap,
			UniformsLib.aomap,
			UniformsLib.lightmap,
			UniformsLib.emissivemap,
			UniformsLib.bumpmap,
			UniformsLib.normalmap,
			UniformsLib.displacementmap,
			UniformsLib.fog,
			UniformsLib.lights,
			{
				emissive: { value: new Color(0x000000) },
				specular: { value: new Color(0x111111) },
				shininess: { value: 30 }
			}
		]),

		vertexShader: ShaderChunk.meshphong_vert,
		fragmentShader: ShaderChunk.meshphong_frag

	},

	standard: {

		uniforms: mergeUniforms([
			UniformsLib.common,
			UniformsLib.envmap,
			UniformsLib.aomap,
			UniformsLib.lightmap,
			UniformsLib.emissivemap,
			UniformsLib.bumpmap,
			UniformsLib.normalmap,
			UniformsLib.displacementmap,
			UniformsLib.roughnessmap,
			UniformsLib.metalnessmap,
			UniformsLib.fog,
			UniformsLib.lights,
			{
				emissive: { value: new Color(0x000000) },
				roughness: { value: 1.0 },
				metalness: { value: 0.0 },
				envMapIntensity: { value: 1 } // temporary
			}
		]),

		vertexShader: ShaderChunk.meshphysical_vert,
		fragmentShader: ShaderChunk.meshphysical_frag

	},

	toon: {

		uniforms: mergeUniforms([
			UniformsLib.common,
			UniformsLib.aomap,
			UniformsLib.lightmap,
			UniformsLib.emissivemap,
			UniformsLib.bumpmap,
			UniformsLib.normalmap,
			UniformsLib.displacementmap,
			UniformsLib.gradientmap,
			UniformsLib.fog,
			UniformsLib.lights,
			{
				emissive: { value: new Color(0x000000) }
			}
		]),

		vertexShader: ShaderChunk.meshtoon_vert,
		fragmentShader: ShaderChunk.meshtoon_frag

	},

	matcap: {

		uniforms: mergeUniforms([
			UniformsLib.common,
			UniformsLib.bumpmap,
			UniformsLib.normalmap,
			UniformsLib.displacementmap,
			UniformsLib.fog,
			{
				matcap: { value: null }
			}
		]),

		vertexShader: ShaderChunk.meshmatcap_vert,
		fragmentShader: ShaderChunk.meshmatcap_frag

	},

	points: {

		uniforms: mergeUniforms([
			UniformsLib.points,
			UniformsLib.fog
		]),

		vertexShader: ShaderChunk.points_vert,
		fragmentShader: ShaderChunk.points_frag

	},

	dashed: {

		uniforms: mergeUniforms([
			UniformsLib.common,
			UniformsLib.fog,
			{
				scale: { value: 1 },
				dashSize: { value: 1 },
				totalSize: { value: 2 }
			}
		]),

		vertexShader: ShaderChunk.linedashed_vert,
		fragmentShader: ShaderChunk.linedashed_frag

	},

	depth: {

		uniforms: mergeUniforms([
			UniformsLib.common,
			UniformsLib.displacementmap
		]),

		vertexShader: ShaderChunk.depth_vert,
		fragmentShader: ShaderChunk.depth_frag

	},

	normal: {

		uniforms: mergeUniforms([
			UniformsLib.common,
			UniformsLib.bumpmap,
			UniformsLib.normalmap,
			UniformsLib.displacementmap,
			{
				opacity: { value: 1.0 }
			}
		]),

		vertexShader: ShaderChunk.meshnormal_vert,
		fragmentShader: ShaderChunk.meshnormal_frag

	},

	background: {

		uniforms: {
			uvTransform: { value: new Matrix3() },
			t2D: { value: null },
		},

		vertexShader: ShaderChunk.background_vert,
		fragmentShader: ShaderChunk.background_frag

	},

	// -------------------------------------------------------------------------
	// //	Cube map shader
	// -------------------------------------------------------------------------

	cube: {

		uniforms: mergeUniforms([
			UniformsLib.envmap,
			{
				opacity: { value: 1.0 }
			}
		]),

		vertexShader: ShaderChunk.cube_vert,
		fragmentShader: ShaderChunk.cube_frag

	},

	equirect: {

		uniforms: {
			tEquirect: { value: null },
		},

		vertexShader: ShaderChunk.equirect_vert,
		fragmentShader: ShaderChunk.equirect_frag

	},

	distanceRGBA: {

		uniforms: mergeUniforms([
			UniformsLib.common,
			UniformsLib.displacementmap,
			{
				referencePosition: { value: new Vector3() },
				nearDistance: { value: 1 },
				farDistance: { value: 1000 }
			}
		]),

		vertexShader: ShaderChunk.distanceRGBA_vert,
		fragmentShader: ShaderChunk.distanceRGBA_frag

	},

	shadow: {

		uniforms: mergeUniforms([
			UniformsLib.lights,
			UniformsLib.fog,
			{
				color: { value: new Color(0x00000) },
				opacity: { value: 1.0 }
			},
		]),

		vertexShader: ShaderChunk.shadow_vert,
		fragmentShader: ShaderChunk.shadow_frag

	}

};

ShaderLib.physical = {

	uniforms: mergeUniforms([
		ShaderLib.standard.uniforms,
		{
			clearcoat: { value: 0 },
			clearcoatMap: { value: null },
			clearcoatRoughness: { value: 0 },
			clearcoatRoughnessMap: { value: null },
			clearcoatNormalScale: { value: new Vector2(1, 1) },
			clearcoatNormalMap: { value: null },
			sheenTint: { value: new Color(0x000000) },
			transmission: { value: 0 },
			transmissionMap: { value: null },
			transmissionSamplerSize: { value: new Vector2() },
			transmissionSamplerMap: { value: null },
			thickness: { value: 0 },
			thicknessMap: { value: null },
			attenuationDistance: { value: 0 },
			attenuationTint: { value: new Color(0x000000) },
			specularIntensity: { value: 0 },
			specularIntensityMap: { value: null },
			specularTint: { value: new Color(1, 1, 1) },
			specularTintMap: { value: null },
		}
	]),

	vertexShader: ShaderChunk.meshphysical_vert,
	fragmentShader: ShaderChunk.meshphysical_frag

};

function WebGLBackground(renderer, cubemaps, state, objects, premultipliedAlpha) {
	const clearColor = new Color(0x000000);
	let clearAlpha = 0;

	function render(renderList, scene) {

		let forceClear = false;
		let background = scene.isScene === true ? scene.background : null;
		// Ignore background in AR
		// TODO: Reconsider this.

		const xr = renderer.xr;
		const session = xr.getSession && xr.getSession();

		if (session && session.environmentBlendMode === 'additive') {

			background = null;

		}

		if (background === null) {

			setClear(clearColor, clearAlpha);

		} else if (background && background.isColor) {

			setClear(background, 1);
			forceClear = true;

		}

		if (renderer.autoClear || forceClear) {

			renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);

		}
	}

	function setClear(color, alpha) {

		state.buffers.color.setClear(color.r, color.g, color.b, alpha, premultipliedAlpha);

	}

	return {

		getClearColor() {

			return clearColor;

		},
		setClearColor(color, alpha = 1) {

			clearColor.set(color);
			clearAlpha = alpha;
			setClear(clearColor, clearAlpha);

		},
		getClearAlpha() {

			return clearAlpha;

		},
		setClearAlpha(alpha) {

			clearAlpha = alpha;
			setClear(clearColor, clearAlpha);

		},
		render

	};

}

function WebGLBindingStates(gl, extensions, attributes, capabilities) {

	const maxVertexAttributes = gl.getParameter(34921);

	const extension = capabilities.isWebGL2 ? null : extensions.get('OES_vertex_array_object');
	const vaoAvailable = capabilities.isWebGL2 || extension !== null;

	const bindingStates = {};

	const defaultState = createBindingState(null);
	let currentState = defaultState;

	function setup(object, material, program, geometry, index) {

		let updateBuffers = false;

		if (vaoAvailable) {

			const state = getBindingState(geometry, program, material);

			if (currentState !== state) {

				currentState = state;
				bindVertexArrayObject(currentState.object);

			}

			updateBuffers = needsUpdate(geometry, index);

			if (updateBuffers) {
				saveCache(geometry, index);
			}

		} else {
			if (currentState.geometry !== geometry.id ||
				currentState.program !== program.id) {

				currentState.geometry = geometry.id;
				currentState.program = program.id;

				updateBuffers = true;
			}
		}

		if (index !== null) {

			attributes.update(index, 34963);

		}

		if (updateBuffers) {

			setupVertexAttributes(object, material, program, geometry);

			if (index !== null) {

				gl.bindBuffer(34963, attributes.get(index).buffer);

			}

		}

	}

	function createVertexArrayObject() {

		if (capabilities.isWebGL2) {
			return gl.createVertexArray();
		}

		return extension.createVertexArrayOES();

	}

	function bindVertexArrayObject(vao) {

		if (capabilities.isWebGL2) {
			return gl.bindVertexArray(vao);
		}

		return extension.bindVertexArrayOES(vao);

	}

	function getBindingState(geometry, program) {
		let programMap = bindingStates[geometry.id];

		if (programMap === undefined) {

			programMap = {};
			bindingStates[geometry.id] = programMap;

		}

		let stateMap = programMap[program.id];

		if (stateMap === undefined) {
			stateMap = {};
			programMap[program.id] = stateMap;
		}

		return createBindingState(createVertexArrayObject());
	}

	function createBindingState(vao) {

		const newAttributes = [];
		const enabledAttributes = [];
		const attributeDivisors = [];

		for (let i = 0; i < maxVertexAttributes; i++) {

			newAttributes[i] = 0;
			enabledAttributes[i] = 0;
			attributeDivisors[i] = 0;

		}

		return {

			// for backward compatibility on non-VAO support browser
			geometry: null,
			program: null,

			newAttributes,
			enabledAttributes,
			attributeDivisors,
			object: vao,
			attributes: {},
			index: null

		};

	}

	function needsUpdate(geometry, index) {

		const cachedAttributes = currentState.attributes;
		const geometryAttributes = geometry.attributes;

		let attributesNum = 0;

		for (const key in geometryAttributes) {

			const cachedAttribute = cachedAttributes[key];
			const geometryAttribute = geometryAttributes[key];

			if (cachedAttribute === undefined) {
				return true;
			}

			if (cachedAttribute.attribute !== geometryAttribute) {
				return true;
			}

			if (cachedAttribute.data !== geometryAttribute.data) {
				return true;
			}

			attributesNum++;

		}

		if (currentState.attributesNum !== attributesNum) {
			return true;
		}

		if (currentState.index !== index) {
			return true;
		}

		return false;

	}

	function saveCache(geometry, index) {

		const cache = {};
		const attributes = geometry.attributes;
		let attributesNum = 0;

		for (const key in attributes) {

			const attribute = attributes[key];

			const data = {};
			data.attribute = attribute;

			if (attribute.data) {

				data.data = attribute.data;

			}

			cache[key] = data;

			attributesNum++;

		}

		currentState.attributes = cache;
		currentState.attributesNum = attributesNum;

		currentState.index = index;

	}

	function initAttributes() {

		const newAttributes = currentState.newAttributes;

		for (let i = 0, il = newAttributes.length; i < il; i++) {

			newAttributes[i] = 0;

		}

	}

	function enableAttribute(attribute) {

		enableAttributeAndDivisor(attribute, 0);

	}

	function enableAttributeAndDivisor(attribute, meshPerAttribute) {

		const newAttributes = currentState.newAttributes;
		const enabledAttributes = currentState.enabledAttributes;
		const attributeDivisors = currentState.attributeDivisors;

		newAttributes[attribute] = 1;

		if (enabledAttributes[attribute] === 0) {

			gl.enableVertexAttribArray(attribute);
			enabledAttributes[attribute] = 1;

		}

		if (attributeDivisors[attribute] !== meshPerAttribute) {

			const extension = capabilities.isWebGL2 ? gl : extensions.get('ANGLE_instanced_arrays');

			extension[capabilities.isWebGL2 ? 'vertexAttribDivisor' : 'vertexAttribDivisorANGLE'](attribute, meshPerAttribute);
			attributeDivisors[attribute] = meshPerAttribute;

		}

	}

	function disableUnusedAttributes() {

		const newAttributes = currentState.newAttributes;
		const enabledAttributes = currentState.enabledAttributes;

		for (let i = 0, il = enabledAttributes.length; i < il; i++) {

			if (enabledAttributes[i] !== newAttributes[i]) {

				gl.disableVertexAttribArray(i);
				enabledAttributes[i] = 0;

			}

		}

	}

	function vertexAttribPointer(index, size, type, normalized, stride, offset) {

		if (capabilities.isWebGL2 === true && (type === 5124 || type === 5125)) {

			gl.vertexAttribIPointer(index, size, type, stride, offset);

		} else {

			gl.vertexAttribPointer(index, size, type, normalized, stride, offset);

		}

	}

	function setupVertexAttributes(object, material, program, geometry) {

		if (capabilities.isWebGL2 === false && (geometry.isInstancedBufferGeometry)) {

			if (extensions.get('ANGLE_instanced_arrays') === null) {
				return;
			}

		}

		initAttributes();

		const geometryAttributes = geometry.attributes;

		const programAttributes = program.getAttributes();

		const materialDefaultAttributeValues = material.defaultAttributeValues;

		for (const name in programAttributes) {

			const programAttribute = programAttributes[name];

			if (programAttribute.location >= 0) {

				let geometryAttribute = geometryAttributes[name];

				if (geometryAttribute === undefined) {

					if (name === 'instanceMatrix' && object.instanceMatrix) {
						geometryAttribute = object.instanceMatrix;
					}
					if (name === 'instanceColor' && object.instanceColor) {
						geometryAttribute = object.instanceColor;
					}

				}

				if (geometryAttribute !== undefined) {

					const normalized = geometryAttribute.normalized;
					const size = geometryAttribute.itemSize;

					const attribute = attributes.get(geometryAttribute);

					// TODO Attribute may not be available on context restore

					if (attribute === undefined) {
						continue;
					}

					const buffer = attribute.buffer;
					const type = attribute.type;
					const bytesPerElement = attribute.bytesPerElement;

					if (geometryAttribute.isInterleavedBufferAttribute) {

						const data = geometryAttribute.data;
						const stride = data.stride;
						const offset = geometryAttribute.offset;

						if (data && data.isInstancedInterleavedBuffer) {

							for (let i = 0; i < programAttribute.locationSize; i++) {

								enableAttributeAndDivisor(programAttribute.location + i, data.meshPerAttribute);

							}
						} else {

							for (let i = 0; i < programAttribute.locationSize; i++) {

								enableAttribute(programAttribute.location + i);

							}

						}

						gl.bindBuffer(34962, buffer);

						for (let i = 0; i < programAttribute.locationSize; i++) {

							vertexAttribPointer(
								programAttribute.location + i,
								size / programAttribute.locationSize,
								type,
								normalized,
								stride * bytesPerElement,
								(offset + (size / programAttribute.locationSize) * i) * bytesPerElement
							);

						}

					} else {

						if (geometryAttribute.isInstancedBufferAttribute) {

							for (let i = 0; i < programAttribute.locationSize; i++) {

								enableAttributeAndDivisor(programAttribute.location + i, geometryAttribute.meshPerAttribute);

							}

							if (geometry._maxInstanceCount === undefined) {

								geometry._maxInstanceCount = geometryAttribute.meshPerAttribute * geometryAttribute.count;

							}

						} else {

							for (let i = 0; i < programAttribute.locationSize; i++) {

								enableAttribute(programAttribute.location + i);

							}

						}

						gl.bindBuffer(34962, buffer);

						for (let i = 0; i < programAttribute.locationSize; i++) {

							vertexAttribPointer(
								programAttribute.location + i,
								size / programAttribute.locationSize,
								type,
								normalized,
								size * bytesPerElement,
								(size / programAttribute.locationSize) * i * bytesPerElement
							);

						}

					}

				} else if (materialDefaultAttributeValues !== undefined) {

					const value = materialDefaultAttributeValues[name];

					if (value !== undefined) {

						switch (value.length) {

							case 2:
								gl.vertexAttrib2fv(programAttribute.location, value);
								break;

							case 3:
								gl.vertexAttrib3fv(programAttribute.location, value);
								break;

							case 4:
								gl.vertexAttrib4fv(programAttribute.location, value);
								break;

							default:
								gl.vertexAttrib1fv(programAttribute.location, value);

						}

					}

				}

			}

		}

		disableUnusedAttributes();

	}

	function dispose() {

		reset();

		for (const geometryId in bindingStates) {

			const programMap = bindingStates[geometryId];

			for (const programId in programMap) {
				delete programMap[programId];
			}

			delete bindingStates[geometryId];

		}

	}

	function releaseStatesOfGeometry(geometry) {

		if (bindingStates[geometry.id] === undefined) {
			return;
		}

		const programMap = bindingStates[geometry.id];

		for (const programId in programMap) {
			delete programMap[programId];
		}

		delete bindingStates[geometry.id];
	}

	function releaseStatesOfProgram(program) {

		for (const geometryId in bindingStates) {

			const programMap = bindingStates[geometryId];

			if (programMap[program.id] === undefined) {
				continue;
			}

			delete programMap[program.id];
		}
	}

	function reset() {

		resetDefaultState();

		if (currentState === defaultState) {
			return;
		}

		currentState = defaultState;
		bindVertexArrayObject(currentState.object);

	}

	// for backward-compatilibity

	function resetDefaultState() {
		defaultState.geometry = null;
		defaultState.program = null;
	}

	return {

		setup,
		reset,
		resetDefaultState,
		dispose,
		releaseStatesOfGeometry,
		releaseStatesOfProgram,

		initAttributes,
		enableAttribute,
		disableUnusedAttributes

	};

}

function WebGLBufferRenderer(gl, extensions, info, capabilities) {

	const isWebGL2 = capabilities.isWebGL2;

	let mode;

	function setMode(value) {

		mode = value;

	}

	function render(start, count) {

		gl.drawArrays(mode, start, count);

		info.update(count, mode, 1);

	}

	function renderInstances(start, count, primcount) {

		if (primcount === 0) {
			return;
		}

		let extension, methodName;

		if (isWebGL2) {

			extension = gl;
			methodName = 'drawArraysInstanced';

		} else {

			extension = extensions.get('ANGLE_instanced_arrays');
			methodName = 'drawArraysInstancedANGLE';

		}

		extension[methodName](mode, start, count, primcount);

		info.update(count, mode, primcount);

	}

	//

	this.setMode = setMode;
	this.render = render;
	this.renderInstances = renderInstances;

}

function WebGLCapabilities(gl, extensions, parameters) {

	let maxAnisotropy;

	function getMaxAnisotropy() {

		if (maxAnisotropy !== undefined) {
			return maxAnisotropy;
		}

		if (extensions.has('EXT_texture_filter_anisotropic') === true) {

			const extension = extensions.get('EXT_texture_filter_anisotropic');

			maxAnisotropy = gl.getParameter(extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT);

		} else {

			maxAnisotropy = 0;

		}

		return maxAnisotropy;

	}

	function getMaxPrecision(precision) {

		if (precision === 'highp') {

			if (gl.getShaderPrecisionFormat(35633, 36338).precision > 0 &&
				gl.getShaderPrecisionFormat(35632, 36338).precision > 0) {

				return 'highp';

			}

			precision = 'mediump';

		}

		if (precision === 'mediump') {

			if (gl.getShaderPrecisionFormat(35633, 36337).precision > 0 &&
				gl.getShaderPrecisionFormat(35632, 36337).precision > 0) {

				return 'mediump';

			}

		}

		return 'lowp';

	}

	/* eslint-disable no-undef */
	const isWebGL2 = (typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext) ||
		(typeof WebGL2ComputeRenderingContext !== 'undefined' && gl instanceof WebGL2ComputeRenderingContext);
	/* eslint-enable no-undef */

	const precision = parameters.precision !== undefined ? parameters.precision : 'highp';
	const drawBuffers = isWebGL2 || extensions.has('WEBGL_draw_buffers');

	const logarithmicDepthBuffer = parameters.logarithmicDepthBuffer === true;

	const maxTextures = gl.getParameter(34930);
	const maxVertexTextures = gl.getParameter(35660);
	const maxTextureSize = gl.getParameter(3379);
	const maxCubemapSize = gl.getParameter(34076);

	const maxAttributes = gl.getParameter(34921);
	const maxVertexUniforms = gl.getParameter(36347);
	const maxVaryings = gl.getParameter(36348);
	const maxFragmentUniforms = gl.getParameter(36349);

	const vertexTextures = maxVertexTextures > 0;
	const floatFragmentTextures = isWebGL2 || extensions.has('OES_texture_float');
	const floatVertexTextures = vertexTextures && floatFragmentTextures;

	const maxSamples = isWebGL2 ? gl.getParameter(36183) : 0;

	return {

		isWebGL2,

		drawBuffers,

		getMaxAnisotropy,
		getMaxPrecision,

		precision,
		logarithmicDepthBuffer,

		maxTextures,
		maxVertexTextures,
		maxTextureSize,
		maxCubemapSize,

		maxAttributes,
		maxVertexUniforms,
		maxVaryings,
		maxFragmentUniforms,

		vertexTextures,
		floatFragmentTextures,
		floatVertexTextures,

		maxSamples

	};

}

function WebGLClipping(properties) {

	const scope = this;

	let globalState = null,
		numGlobalPlanes = 0,
		localClippingEnabled = false,
		renderingShadows = false;

	const plane = new Plane(),
		viewNormalMatrix = new Matrix3(),

		uniform = {
			value: null,
			needsUpdate: false
		};

	this.uniform = uniform;
	this.numPlanes = 0;
	this.numIntersection = 0;

	this.init = function (planes, enableLocalClipping, camera) {

		const enabled =
			planes.length !== 0 ||
			enableLocalClipping ||
			// enable state of previous frame - the clipping code has to
			// run another frame in order to reset the state:
			numGlobalPlanes !== 0 ||
			localClippingEnabled;

		localClippingEnabled = enableLocalClipping;

		globalState = projectPlanes(planes, camera, 0);
		numGlobalPlanes = planes.length;

		return enabled;

	};

	this.beginShadows = function () {

		renderingShadows = true;
		projectPlanes(null);

	};

	this.endShadows = function () {

		renderingShadows = false;
		resetGlobalState();

	};

	this.setState = function (material, camera, useCache) {

		const planes = material.clippingPlanes,
			clipIntersection = material.clipIntersection,
			clipShadows = material.clipShadows;

		const materialProperties = properties.get(material);

		if (!localClippingEnabled || planes === null || planes.length === 0 || renderingShadows && !clipShadows) {

			// there's no local clipping

			if (renderingShadows) {

				// there's no global clipping

				projectPlanes(null);

			} else {

				resetGlobalState();

			}

		} else {

			const nGlobal = renderingShadows ? 0 : numGlobalPlanes,
				lGlobal = nGlobal * 4;

			let dstArray = materialProperties.clippingState || null;

			uniform.value = dstArray; // ensure unique state

			dstArray = projectPlanes(planes, camera, lGlobal, useCache);

			for (let i = 0; i !== lGlobal; ++i) {

				dstArray[i] = globalState[i];

			}

			materialProperties.clippingState = dstArray;
			this.numIntersection = clipIntersection ? this.numPlanes : 0;
			this.numPlanes += nGlobal;

		}


	};

	function resetGlobalState() {

		if (uniform.value !== globalState) {

			uniform.value = globalState;
			uniform.needsUpdate = numGlobalPlanes > 0;

		}

		scope.numPlanes = numGlobalPlanes;
		scope.numIntersection = 0;

	}

	function projectPlanes(planes, camera, dstOffset, skipTransform) {

		const nPlanes = planes !== null ? planes.length : 0;
		let dstArray = null;

		if (nPlanes !== 0) {

			dstArray = uniform.value;

			if (skipTransform !== true || dstArray === null) {

				const flatSize = dstOffset + nPlanes * 4,
					viewMatrix = camera.matrixWorldInverse;

				viewNormalMatrix.getNormalMatrix(viewMatrix);

				if (dstArray === null || dstArray.length < flatSize) {

					dstArray = new Float32Array(flatSize);

				}

				for (let i = 0, i4 = dstOffset; i !== nPlanes; ++i, i4 += 4) {

					plane.copy(planes[i]).applyMatrix4(viewMatrix, viewNormalMatrix);

					plane.normal.toArray(dstArray, i4);
					dstArray[i4 + 3] = plane.constant;

				}

			}

			uniform.value = dstArray;
			uniform.needsUpdate = true;

		}

		scope.numPlanes = nPlanes;
		scope.numIntersection = 0;

		return dstArray;

	}

}

function WebGLCubeMaps() {
	function get(texture) {
		return texture;
	}

	return { get };
}

function WebGLCubeUVMaps() {
	function get(texture) {
		return texture;
	}

	return { get };
}

function WebGLExtensions(gl) {

	const extensions = {};

	function getExtension(name) {

		if (extensions[name] !== undefined) {

			return extensions[name];

		}

		let extension;

		switch (name) {

			case 'WEBGL_depth_texture':
				extension = gl.getExtension('WEBGL_depth_texture') || gl.getExtension('MOZ_WEBGL_depth_texture') || gl.getExtension('WEBKIT_WEBGL_depth_texture');
				break;

			case 'EXT_texture_filter_anisotropic':
				extension = gl.getExtension('EXT_texture_filter_anisotropic') || gl.getExtension('MOZ_EXT_texture_filter_anisotropic') || gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic');
				break;

			case 'WEBGL_compressed_texture_s3tc':
				extension = gl.getExtension('WEBGL_compressed_texture_s3tc') || gl.getExtension('MOZ_WEBGL_compressed_texture_s3tc') || gl.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');
				break;

			case 'WEBGL_compressed_texture_pvrtc':
				extension = gl.getExtension('WEBGL_compressed_texture_pvrtc') || gl.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc');
				break;

			default:
				extension = gl.getExtension(name);

		}

		extensions[name] = extension;

		return extension;

	}

	return {

		has(name) {

			return getExtension(name) !== null;

		},

		init(capabilities) {

			if (capabilities.isWebGL2) {

				getExtension('EXT_color_buffer_float');

			} else {

				getExtension('WEBGL_depth_texture');
				getExtension('OES_texture_float');
				getExtension('OES_texture_half_float');
				getExtension('OES_texture_half_float_linear');
				getExtension('OES_standard_derivatives');
				getExtension('OES_element_index_uint');
				getExtension('OES_vertex_array_object');
				getExtension('ANGLE_instanced_arrays');

			}

			getExtension('OES_texture_float_linear');
			getExtension('EXT_color_buffer_half_float');

		},

		get(name) {

			const extension = getExtension(name);

			if (extension === null) {

				console.warn('THREE.WebGLRenderer: ' + name + ' extension not supported.');

			}

			return extension;

		}

	};

}

function WebGLGeometries(gl, attributes, info, bindingStates) {

	const geometries = {};
	const wireframeAttributes = new WeakMap();

	function onGeometryDispose(event) {

		const geometry = event.target;

		if (geometry.index !== null) {

			attributes.remove(geometry.index);

		}

		for (const name in geometry.attributes) {

			attributes.remove(geometry.attributes[name]);

		}

		geometry.removeEventListener('dispose', onGeometryDispose);

		delete geometries[geometry.id];

		const attribute = wireframeAttributes.get(geometry);

		if (attribute) {

			attributes.remove(attribute);
			wireframeAttributes.delete(geometry);

		}

		bindingStates.releaseStatesOfGeometry(geometry);

		if (geometry.isInstancedBufferGeometry === true) {

			delete geometry._maxInstanceCount;

		}

		//

		info.memory.geometries--;

	}

	function get(object, geometry) {

		if (geometries[geometry.id] === true) {
			return geometry;
		}

		geometry.addEventListener('dispose', onGeometryDispose);

		geometries[geometry.id] = true;

		info.memory.geometries++;

		return geometry;

	}

	function update(geometry) {

		const geometryAttributes = geometry.attributes;

		// Updating index buffer in VAO now. See WebGLBindingStates.

		for (const name in geometryAttributes) {

			attributes.update(geometryAttributes[name], 34962);

		}

		// morph targets

		const morphAttributes = geometry.morphAttributes;

		for (const name in morphAttributes) {

			const array = morphAttributes[name];

			for (let i = 0, l = array.length; i < l; i++) {

				attributes.update(array[i], 34962);

			}

		}

	}

	return {
		get,
		update
	};
}

function WebGLIndexedBufferRenderer(gl, extensions, info, capabilities) {

	const isWebGL2 = capabilities.isWebGL2;

	let mode;

	function setMode(value) {

		mode = value;

	}

	let type, bytesPerElement;

	function setIndex(value) {

		type = value.type;
		bytesPerElement = value.bytesPerElement;

	}

	function render(start, count) {

		gl.drawElements(mode, count, type, start * bytesPerElement);

		info.update(count, mode, 1);

	}

	function renderInstances(start, count, primcount) {

		if (primcount === 0) {
			return;
		}

		let extension, methodName;

		if (isWebGL2) {

			extension = gl;
			methodName = 'drawElementsInstanced';

		} else {

			extension = extensions.get('ANGLE_instanced_arrays');
			methodName = 'drawElementsInstancedANGLE';
		}

		extension[methodName](mode, count, type, start * bytesPerElement, primcount);

		info.update(count, mode, primcount);

	}

	this.setMode = setMode;
	this.setIndex = setIndex;
	this.render = render;
	this.renderInstances = renderInstances;

}

function WebGLInfo() {

	const memory = {
		geometries: 0,
		textures: 0
	};

	const render = {
		frame: 0,
		calls: 0,
		triangles: 0,
		points: 0,
		lines: 0
	};

	function update(count, mode, instanceCount) {
		render.calls++;

		switch (mode) {

			case 4:
				render.triangles += instanceCount * (count / 3);
				break;

			case 1:
				render.lines += instanceCount * (count / 2);
				break;

			case 3:
				render.lines += instanceCount * (count - 1);
				break;

			case 2:
				render.lines += instanceCount * count;
				break;

			case 0:
				render.points += instanceCount * count;
				break;
		}

	}

	function reset() {

		render.frame++;
		render.calls = 0;
		render.triangles = 0;
		render.points = 0;
		render.lines = 0;

	}

	return {
		memory,
		render,
		programs: null,
		autoReset: true,
		reset,
		update
	};

}

function numericalSort(a, b) {

	return a[0] - b[0];

}

function absNumericalSort(a, b) {

	return Math.abs(b[1]) - Math.abs(a[1]);

}

function WebGLMorphtargets(gl) {

	const influencesList = {};
	const morphInfluences = new Float32Array(8);

	const workInfluences = [];

	for (let i = 0; i < 8; i++) {

		workInfluences[i] = [i, 0];

	}

	function update(object, geometry, material, program) {

		const objectInfluences = object.morphTargetInfluences;

		// When object doesn't have morph target influences defined, we treat it as a 0-length array
		// This is important to make sure we set up morphTargetBaseInfluence / morphTargetInfluences

		const length = objectInfluences === undefined ? 0 : objectInfluences.length;

		let influences = influencesList[geometry.id];

		if (influences === undefined || influences.length !== length) {

			// initialise list

			influences = [];

			for (let i = 0; i < length; i++) {

				influences[i] = [i, 0];

			}

			influencesList[geometry.id] = influences;

		}

		// Collect influences

		for (let i = 0; i < length; i++) {

			const influence = influences[i];

			influence[0] = i;
			influence[1] = objectInfluences[i];

		}

		influences.sort(absNumericalSort);

		for (let i = 0; i < 8; i++) {

			if (i < length && influences[i][1]) {

				workInfluences[i][0] = influences[i][0];
				workInfluences[i][1] = influences[i][1];

			} else {

				workInfluences[i][0] = Number.MAX_SAFE_INTEGER;
				workInfluences[i][1] = 0;

			}

		}

		workInfluences.sort(numericalSort);

		const morphTargets = geometry.morphAttributes.position;
		const morphNormals = geometry.morphAttributes.normal;

		let morphInfluencesSum = 0;

		for (let i = 0; i < 8; i++) {

			const influence = workInfluences[i];
			const index = influence[0];
			const value = influence[1];

			if (index !== Number.MAX_SAFE_INTEGER && value) {

				if (morphTargets && geometry.getAttribute('morphTarget' + i) !== morphTargets[index]) {

					geometry.setAttribute('morphTarget' + i, morphTargets[index]);

				}

				if (morphNormals && geometry.getAttribute('morphNormal' + i) !== morphNormals[index]) {

					geometry.setAttribute('morphNormal' + i, morphNormals[index]);

				}

				morphInfluences[i] = value;
				morphInfluencesSum += value;

			} else {

				if (morphTargets && geometry.hasAttribute('morphTarget' + i) === true) {

					geometry.deleteAttribute('morphTarget' + i);

				}

				if (morphNormals && geometry.hasAttribute('morphNormal' + i) === true) {

					geometry.deleteAttribute('morphNormal' + i);

				}

				morphInfluences[i] = 0;

			}

		}

		// GLSL shader uses formula baseinfluence * base + sum(target * influence)
		// This allows us to switch between absolute morphs and relative morphs without changing shader code
		// When baseinfluence = 1 - sum(influence), the above is equivalent to sum((target - base) * influence)
		const morphBaseInfluence = geometry.morphTargetsRelative ? 1 : 1 - morphInfluencesSum;

		program.getUniforms().setValue(gl, 'morphTargetBaseInfluence', morphBaseInfluence);
		program.getUniforms().setValue(gl, 'morphTargetInfluences', morphInfluences);

	}

	return {

		update

	};

}

function WebGLObjects(gl, geometries, attributes, info) {

	let updateMap = new WeakMap();

	function update(object) {

		const frame = info.render.frame;

		const geometry = object.geometry;
		const buffergeometry = geometries.get(object, geometry);

		// Update once per frame

		if (updateMap.get(buffergeometry) !== frame) {

			geometries.update(buffergeometry);

			updateMap.set(buffergeometry, frame);

		}

		return buffergeometry;

	}

	function dispose() {

		updateMap = new WeakMap();

	}

	return {

		update,
		dispose

	};

}

/**
 * Uniforms of a program.
 * Those form a tree structure with a special top-level container for the root,
 * which you get by calling 'new WebGLUniforms( gl, program )'.
 *
 *
 * Properties of inner nodes including the top-level container:
 *
 * .seq - array of nested uniforms
 * .map - nested uniforms by name
 *
 *
 * Methods of all nodes except the top-level container:
 *
 * .setValue( gl, value, [textures] )
 *
 * 		uploads a uniform value(s)
 *  	the 'textures' parameter is needed for sampler uniforms
 *
 *
 * Static methods of the top-level container (textures factorizations):
 *
 * .upload( gl, seq, values, textures )
 *
 * 		sets uniforms in 'seq' to 'values[id].value'
 *
 * .seqWithValue( seq, values ) : filteredSeq
 *
 * 		filters 'seq' entries with corresponding entry in values
 *
 *
 * Methods of the top-level container (textures factorizations):
 *
 * .setValue( gl, name, value, textures )
 *
 * 		sets uniform with  name 'name' to 'value'
 *
 * .setOptional( gl, obj, prop )
 *
 * 		like .set for an optional property of the object
 *
 */

// --- Utilities ---

// Array Caches (provide typed arrays for temporary by size)

const arrayCacheF32 = [];

// Float32Array caches used for uploading Matrix uniforms

const mat4array = new Float32Array(16);
const mat3array = new Float32Array(9);
const mat2array = new Float32Array(4);

// Flattening for arrays of vectors and matrices

function flatten(array, nBlocks, blockSize) {

	const firstElem = array[0];

	if (firstElem <= 0 || firstElem > 0) {
		return array;
	}
	// unoptimized: ! isNaN( firstElem )
	// see http://jacksondunstan.com/articles/983

	const n = nBlocks * blockSize;
	let r = arrayCacheF32[n];

	if (r === undefined) {

		r = new Float32Array(n);
		arrayCacheF32[n] = r;

	}

	if (nBlocks !== 0) {

		firstElem.toArray(r, 0);

		for (let i = 1, offset = 0; i !== nBlocks; ++i) {

			offset += blockSize;
			array[i].toArray(r, offset);

		}

	}

	return r;

}

function arraysEqual(a, b) {

	if (a.length !== b.length) {
		return false;
	}

	for (let i = 0, l = a.length; i < l; i++) {

		if (a[i] !== b[i]) {
			return false;
		}

	}

	return true;

}

function copyArray(a, b) {

	for (let i = 0, l = b.length; i < l; i++) {

		a[i] = b[i];

	}

}

// --- Setters ---

// Note: Defining these methods externally, because they come in a bunch
// and this way their names minify.

// Single scalar

function setValueV1f(gl, v) {

	const cache = this.cache;

	if (cache[0] === v) {
		return;
	}

	gl.uniform1f(this.addr, v);

	cache[0] = v;

}

// Single float vector (from flat array or THREE.VectorN)

function setValueV2f(gl, v) {

	const cache = this.cache;

	if (v.x !== undefined) {

		if (cache[0] !== v.x || cache[1] !== v.y) {

			gl.uniform2f(this.addr, v.x, v.y);

			cache[0] = v.x;
			cache[1] = v.y;

		}

	} else {

		if (arraysEqual(cache, v)) {
			return;
		}

		gl.uniform2fv(this.addr, v);

		copyArray(cache, v);

	}

}

function setValueV3f(gl, v) {

	const cache = this.cache;

	if (v.x !== undefined) {

		if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z) {

			gl.uniform3f(this.addr, v.x, v.y, v.z);

			cache[0] = v.x;
			cache[1] = v.y;
			cache[2] = v.z;

		}

	} else if (v.r !== undefined) {

		if (cache[0] !== v.r || cache[1] !== v.g || cache[2] !== v.b) {

			gl.uniform3f(this.addr, v.r, v.g, v.b);

			cache[0] = v.r;
			cache[1] = v.g;
			cache[2] = v.b;

		}

	} else {

		if (arraysEqual(cache, v)) {
			return;
		}

		gl.uniform3fv(this.addr, v);

		copyArray(cache, v);

	}

}

function setValueV4f(gl, v) {

	const cache = this.cache;

	if (v.x !== undefined) {

		if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z || cache[3] !== v.w) {

			gl.uniform4f(this.addr, v.x, v.y, v.z, v.w);

			cache[0] = v.x;
			cache[1] = v.y;
			cache[2] = v.z;
			cache[3] = v.w;

		}

	} else {

		if (arraysEqual(cache, v)) {
			return;
		}

		gl.uniform4fv(this.addr, v);

		copyArray(cache, v);

	}

}

// Single matrix (from flat array or THREE.MatrixN)

function setValueM2(gl, v) {

	const cache = this.cache;
	const elements = v.elements;

	if (elements === undefined) {

		if (arraysEqual(cache, v)) {
			return;
		}

		gl.uniformMatrix2fv(this.addr, false, v);

		copyArray(cache, v);

	} else {

		if (arraysEqual(cache, elements)) {
			return;
		}

		mat2array.set(elements);

		gl.uniformMatrix2fv(this.addr, false, mat2array);

		copyArray(cache, elements);

	}

}

function setValueM3(gl, v) {

	const cache = this.cache;
	const elements = v.elements;

	if (elements === undefined) {

		if (arraysEqual(cache, v)) {
			return;
		}

		gl.uniformMatrix3fv(this.addr, false, v);

		copyArray(cache, v);

	} else {

		if (arraysEqual(cache, elements)) {
			return;
		}

		mat3array.set(elements);

		gl.uniformMatrix3fv(this.addr, false, mat3array);

		copyArray(cache, elements);

	}

}

function setValueM4(gl, v) {

	const cache = this.cache;
	const elements = v.elements;

	if (elements === undefined) {

		if (arraysEqual(cache, v)) {
			return;
		}

		gl.uniformMatrix4fv(this.addr, false, v);

		copyArray(cache, v);

	} else {

		if (arraysEqual(cache, elements)) {
			return;
		}

		mat4array.set(elements);

		gl.uniformMatrix4fv(this.addr, false, mat4array);

		copyArray(cache, elements);

	}

}

// Single integer / boolean

function setValueV1i(gl, v) {

	const cache = this.cache;

	if (cache[0] === v) {
		return;
	}

	gl.uniform1i(this.addr, v);

	cache[0] = v;

}

// Single integer / boolean vector (from flat array)

function setValueV2i(gl, v) {

	const cache = this.cache;

	if (arraysEqual(cache, v)) {
		return;
	}

	gl.uniform2iv(this.addr, v);

	copyArray(cache, v);

}

function setValueV3i(gl, v) {

	const cache = this.cache;

	if (arraysEqual(cache, v)) {
		return;
	}

	gl.uniform3iv(this.addr, v);

	copyArray(cache, v);

}

function setValueV4i(gl, v) {

	const cache = this.cache;

	if (arraysEqual(cache, v)) {
		return;
	}

	gl.uniform4iv(this.addr, v);

	copyArray(cache, v);

}

// Single unsigned integer

function setValueV1ui(gl, v) {

	const cache = this.cache;

	if (cache[0] === v) {
		return;
	}

	gl.uniform1ui(this.addr, v);

	cache[0] = v;

}

// Single unsigned integer vector (from flat array)

function setValueV2ui(gl, v) {

	const cache = this.cache;

	if (arraysEqual(cache, v)) {
		return;
	}

	gl.uniform2uiv(this.addr, v);

	copyArray(cache, v);

}

function setValueV3ui(gl, v) {

	const cache = this.cache;

	if (arraysEqual(cache, v)) {
		return;
	}

	gl.uniform3uiv(this.addr, v);

	copyArray(cache, v);

}

function setValueV4ui(gl, v) {

	const cache = this.cache;

	if (arraysEqual(cache, v)) {
		return;
	}

	gl.uniform4uiv(this.addr, v);

	copyArray(cache, v);

}

// Helper to pick the right setter for the singular case

function getSingularSetter(type) {
	switch (type) {
		case 0x1406: return setValueV1f; // FLOAT
		case 0x8b50: return setValueV2f; // _VEC2
		case 0x8b51: return setValueV3f; // _VEC3
		case 0x8b52: return setValueV4f; // _VEC4

		case 0x8b5a: return setValueM2; // _MAT2
		case 0x8b5b: return setValueM3; // _MAT3
		case 0x8b5c: return setValueM4; // _MAT4

		case 0x1404: case 0x8b56: return setValueV1i; // INT, BOOL
		case 0x8b53: case 0x8b57: return setValueV2i; // _VEC2
		case 0x8b54: case 0x8b58: return setValueV3i; // _VEC3
		case 0x8b55: case 0x8b59: return setValueV4i; // _VEC4

		case 0x1405: return setValueV1ui; // UINT
		case 0x8dc6: return setValueV2ui; // _VEC2
		case 0x8dc7: return setValueV3ui; // _VEC3
		case 0x8dc8: return setValueV4ui; // _VEC4
	}
}

// Array of scalars

function setValueV1fArray(gl, v) {

	gl.uniform1fv(this.addr, v);

}

// Array of vectors (from flat array or array of THREE.VectorN)

function setValueV2fArray(gl, v) {

	const data = flatten(v, this.size, 2);

	gl.uniform2fv(this.addr, data);

}

function setValueV3fArray(gl, v) {

	const data = flatten(v, this.size, 3);

	gl.uniform3fv(this.addr, data);

}

function setValueV4fArray(gl, v) {

	const data = flatten(v, this.size, 4);

	gl.uniform4fv(this.addr, data);

}

// Array of matrices (from flat array or array of THREE.MatrixN)

function setValueM2Array(gl, v) {

	const data = flatten(v, this.size, 4);

	gl.uniformMatrix2fv(this.addr, false, data);

}

function setValueM3Array(gl, v) {

	const data = flatten(v, this.size, 9);

	gl.uniformMatrix3fv(this.addr, false, data);

}

function setValueM4Array(gl, v) {

	const data = flatten(v, this.size, 16);

	gl.uniformMatrix4fv(this.addr, false, data);

}

// Array of integer / boolean

function setValueV1iArray(gl, v) {

	gl.uniform1iv(this.addr, v);

}

// Array of integer / boolean vectors (from flat array)

function setValueV2iArray(gl, v) {

	gl.uniform2iv(this.addr, v);

}

function setValueV3iArray(gl, v) {

	gl.uniform3iv(this.addr, v);

}

function setValueV4iArray(gl, v) {

	gl.uniform4iv(this.addr, v);

}

// Array of unsigned integer

function setValueV1uiArray(gl, v) {

	gl.uniform1uiv(this.addr, v);

}

// Array of unsigned integer vectors (from flat array)

function setValueV2uiArray(gl, v) {

	gl.uniform2uiv(this.addr, v);

}

function setValueV3uiArray(gl, v) {

	gl.uniform3uiv(this.addr, v);

}

function setValueV4uiArray(gl, v) {

	gl.uniform4uiv(this.addr, v);

}

// Helper to pick the right setter for a pure (bottom-level) array

function getPureArraySetter(type) {

	switch (type) {

		case 0x1406: return setValueV1fArray; // FLOAT
		case 0x8b50: return setValueV2fArray; // _VEC2
		case 0x8b51: return setValueV3fArray; // _VEC3
		case 0x8b52: return setValueV4fArray; // _VEC4

		case 0x8b5a: return setValueM2Array; // _MAT2
		case 0x8b5b: return setValueM3Array; // _MAT3
		case 0x8b5c: return setValueM4Array; // _MAT4

		case 0x1404: case 0x8b56: return setValueV1iArray; // INT, BOOL
		case 0x8b53: case 0x8b57: return setValueV2iArray; // _VEC2
		case 0x8b54: case 0x8b58: return setValueV3iArray; // _VEC3
		case 0x8b55: case 0x8b59: return setValueV4iArray; // _VEC4

		case 0x1405: return setValueV1uiArray; // UINT
		case 0x8dc6: return setValueV2uiArray; // _VEC2
		case 0x8dc7: return setValueV3uiArray; // _VEC3
		case 0x8dc8: return setValueV4uiArray; // _VEC4
	}

}

// --- Uniform Classes ---

function SingleUniform(id, activeInfo, addr) {

	this.id = id;
	this.addr = addr;
	this.cache = [];
	this.setValue = getSingularSetter(activeInfo.type);

}

function PureArrayUniform(id, activeInfo, addr) {

	this.id = id;
	this.addr = addr;
	this.cache = [];
	this.size = activeInfo.size;
	this.setValue = getPureArraySetter(activeInfo.type);

	// this.path = activeInfo.name; // DEBUG

}

PureArrayUniform.prototype.updateCache = function (data) {

	const cache = this.cache;

	if (data instanceof Float32Array && cache.length !== data.length) {

		this.cache = new Float32Array(data.length);

	}

	copyArray(cache, data);

};

function StructuredUniform(id) {

	this.id = id;

	this.seq = [];
	this.map = {};

}

StructuredUniform.prototype.setValue = function (gl, value, textures) {

	const seq = this.seq;

	for (let i = 0, n = seq.length; i !== n; ++i) {

		const u = seq[i];
		u.setValue(gl, value[u.id], textures);

	}

};

// --- Top-level ---

// Parser - builds up the property tree from the path strings

const RePathPart = /(\w+)(\])?(\[|\.)?/g;

// extracts
// 	- the identifier (member name or array index)
//  - followed by an optional right bracket (found when array index)
//  - followed by an optional left bracket or dot (type of subscript)
//
// Note: These portions can be read in a non-overlapping fashion and
// allow straightforward parsing of the hierarchy that WebGL encodes
// in the uniform names.

function addUniform(container, uniformObject) {

	container.seq.push(uniformObject);
	container.map[uniformObject.id] = uniformObject;

}

function parseUniform(activeInfo, addr, container) {

	const path = activeInfo.name,
		pathLength = path.length;

	// reset RegExp object, because of the early exit of a previous run
	RePathPart.lastIndex = 0;

	while (true) {

		const match = RePathPart.exec(path),
			matchEnd = RePathPart.lastIndex;

		let id = match[1];
		const idIsIndex = match[2] === ']',
			subscript = match[3];

		if (idIsIndex) {
			id |= 0;
		} // convert to integer

		if (subscript === undefined || subscript === '[' && matchEnd + 2 === pathLength) {

			// bare name or "pure" bottom-level array "[0]" suffix

			addUniform(container, subscript === undefined
				? new SingleUniform(id, activeInfo, addr)
				: new PureArrayUniform(id, activeInfo, addr));

			break;

		} else {

			// step into inner node / create it in case it doesn't exist

			const map = container.map;
			let next = map[id];

			if (next === undefined) {

				next = new StructuredUniform(id);
				addUniform(container, next);

			}

			container = next;

		}

	}

}

// Root Container

function WebGLUniforms(gl, program) {

	this.seq = [];
	this.map = {};

	const n = gl.getProgramParameter(program, 35718);

	for (let i = 0; i < n; ++i) {

		const info = gl.getActiveUniform(program, i),
			addr = gl.getUniformLocation(program, info.name);

		parseUniform(info, addr, this);

	}

}

WebGLUniforms.prototype.setValue = function (gl, name, value, textures) {

	const u = this.map[name];

	if (u !== undefined) {
		u.setValue(gl, value, textures);
	}

};

WebGLUniforms.prototype.setOptional = function (gl, object, name) {

	const v = object[name];

	if (v !== undefined) {
		this.setValue(gl, name, v);
	}

};


// Static interface

WebGLUniforms.upload = function (gl, seq, values, textures) {

	for (let i = 0, n = seq.length; i !== n; ++i) {

		const u = seq[i],
			v = values[u.id];

		if (v.needsUpdate !== false) {

			// note: always updating when .needsUpdate is undefined
			u.setValue(gl, v.value, textures);

		}

	}

};

WebGLUniforms.seqWithValue = function (seq, values) {

	const r = [];

	for (let i = 0, n = seq.length; i !== n; ++i) {

		const u = seq[i];
		if (u.id in values) {
			r.push(u);
		}

	}

	return r;

};

function WebGLShader(gl, type, string) {

	const shader = gl.createShader(type);

	gl.shaderSource(shader, string);
	gl.compileShader(shader);

	return shader;

}

let programIdCount = 0;

function getEncodingComponents(encoding) {
	switch (encoding) {
		case LinearEncoding:
			return ['Linear', '( value )'];
		case sRGBEncoding:
			return ['sRGB', '( value )'];
		case RGBEEncoding:
			return ['RGBE', '( value )'];
		case RGBM7Encoding:
			return ['RGBM', '( value, 7.0 )'];
		case RGBM16Encoding:
			return ['RGBM', '( value, 16.0 )'];
		case RGBDEncoding:
			return ['RGBD', '( value, 256.0 )'];
		case GammaEncoding:
			return ['Gamma', '( value, float( GAMMA_FACTOR ) )'];
		case LogLuvEncoding:
			return ['LogLuv', '( value )'];
	}
}

function getTexelDecodingFunction(functionName, encoding) {
	const components = getEncodingComponents(encoding);
	return 'vec4 ' + functionName + '( vec4 value ) { return ' + components[0] + 'ToLinear' + components[1] + '; }';
}

function getTexelEncodingFunction(functionName, encoding) {

	const components = getEncodingComponents(encoding);
	return 'vec4 ' + functionName + '( vec4 value ) { return LinearTo' + components[0] + components[1] + '; }';

}

function getToneMappingFunction(functionName, toneMapping) {

	let toneMappingName;

	switch (toneMapping) {

		case LinearToneMapping:
			toneMappingName = 'Linear';
			break;

		case ReinhardToneMapping:
			toneMappingName = 'Reinhard';
			break;

		case CineonToneMapping:
			toneMappingName = 'OptimizedCineon';
			break;

		case ACESFilmicToneMapping:
			toneMappingName = 'ACESFilmic';
			break;

		case CustomToneMapping:
			toneMappingName = 'Custom';
			break;

		default:
			console.warn('THREE.WebGLProgram: Unsupported toneMapping:', toneMapping);
			toneMappingName = 'Linear';

	}

	return 'vec3 ' + functionName + '( vec3 color ) { return ' + toneMappingName + 'ToneMapping( color ); }';

}

function generateExtensions(parameters) {

	const chunks = [
		(parameters.extensionDerivatives || parameters.envMapCubeUV || parameters.bumpMap || parameters.tangentSpaceNormalMap || parameters.clearcoatNormalMap || parameters.flatShading || parameters.shaderID === 'physical') ? '#extension GL_OES_standard_derivatives : enable' : '',
		(parameters.extensionFragDepth || parameters.logarithmicDepthBuffer) && parameters.rendererExtensionFragDepth ? '#extension GL_EXT_frag_depth : enable' : '',
		(parameters.extensionDrawBuffers && parameters.rendererExtensionDrawBuffers) ? '#extension GL_EXT_draw_buffers : require' : '',
		(parameters.extensionShaderTextureLOD || parameters.envMap || parameters.transmission) && parameters.rendererExtensionShaderTextureLod ? '#extension GL_EXT_shader_texture_lod : enable' : ''
	];

	return chunks.filter(filterEmptyLine).join('\n');

}

function generateDefines(defines) {

	const chunks = [];

	for (const name in defines) {

		const value = defines[name];

		if (value === false) {
			continue;
		}

		chunks.push('#define ' + name + ' ' + value);

	}

	return chunks.join('\n');

}

function fetchAttributeLocations(gl, program) {

	const attributes = {};

	const n = gl.getProgramParameter(program, 35721);

	for (let i = 0; i < n; i++) {

		const info = gl.getActiveAttrib(program, i);
		const name = info.name;

		let locationSize = 1;
		if (info.type === 35674) {
			locationSize = 2;
		}
		if (info.type === 35675) {
			locationSize = 3;
		}
		if (info.type === 35676) {
			locationSize = 4;
		}

		// console.log( 'THREE.WebGLProgram: ACTIVE VERTEX ATTRIBUTE:', name, i );

		attributes[name] = {
			type: info.type,
			location: gl.getAttribLocation(program, name),
			locationSize
		};

	}

	return attributes;

}

function filterEmptyLine(string) {

	return string !== '';

}

function replaceLightNums(string, parameters) {

	return string
		.replace(/NUM_DIR_LIGHTS/g, parameters.numDirLights)
		.replace(/NUM_SPOT_LIGHTS/g, parameters.numSpotLights)
		.replace(/NUM_RECT_AREA_LIGHTS/g, parameters.numRectAreaLights)
		.replace(/NUM_POINT_LIGHTS/g, parameters.numPointLights)
		.replace(/NUM_HEMI_LIGHTS/g, parameters.numHemiLights)
		.replace(/NUM_DIR_LIGHT_SHADOWS/g, parameters.numDirLightShadows)
		.replace(/NUM_SPOT_LIGHT_SHADOWS/g, parameters.numSpotLightShadows)
		.replace(/NUM_POINT_LIGHT_SHADOWS/g, parameters.numPointLightShadows);

}

function replaceClippingPlaneNums(string, parameters) {

	return string
		.replace(/NUM_CLIPPING_PLANES/g, parameters.numClippingPlanes)
		.replace(/UNION_CLIPPING_PLANES/g, (parameters.numClippingPlanes - parameters.numClipIntersection));

}

// Resolve Includes

const includePattern = /^[ \t]*#include +<([\w\d./]+)>/gm;

function resolveIncludes(string) {

	return string.replace(includePattern, includeReplacer);

}

function includeReplacer(match, include) {

	const string = ShaderChunk[include];

	if (string === undefined) {

		throw new Error('Can not resolve #include <' + include + '>');

	}

	return resolveIncludes(string);

}

// Unroll Loops
const unrollLoopPattern = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;

function unrollLoops(string) {
	return string
		.replace(unrollLoopPattern, loopReplacer);
}

function loopReplacer(match, start, end, snippet) {

	let string = '';

	for (let i = parseInt(start); i < parseInt(end); i++) {

		string += snippet
			.replace(/\[\s*i\s*\]/g, '[ ' + i + ' ]')
			.replace(/UNROLLED_LOOP_INDEX/g, i);

	}

	return string;

}

//

function generatePrecision(parameters) {

	let precisionstring = 'precision ' + parameters.precision + ' float;\nprecision ' + parameters.precision + ' int;';

	if (parameters.precision === 'highp') {

		precisionstring += '\n#define HIGH_PRECISION';

	} else if (parameters.precision === 'mediump') {

		precisionstring += '\n#define MEDIUM_PRECISION';

	} else if (parameters.precision === 'lowp') {

		precisionstring += '\n#define LOW_PRECISION';

	}

	return precisionstring;

}

function generateEnvMapTypeDefine(parameters) {

	let envMapTypeDefine = 'ENVMAP_TYPE_CUBE';

	if (parameters.envMap) {

		switch (parameters.envMapMode) {

			case CubeReflectionMapping:
			case CubeRefractionMapping:
				envMapTypeDefine = 'ENVMAP_TYPE_CUBE';
				break;

			case CubeUVReflectionMapping:
			case CubeUVRefractionMapping:
				envMapTypeDefine = 'ENVMAP_TYPE_CUBE_UV';
				break;

		}

	}

	return envMapTypeDefine;

}

function generateEnvMapModeDefine(parameters) {

	let envMapModeDefine = 'ENVMAP_MODE_REFLECTION';

	if (parameters.envMap) {

		switch (parameters.envMapMode) {

			case CubeRefractionMapping:
			case CubeUVRefractionMapping:

				envMapModeDefine = 'ENVMAP_MODE_REFRACTION';
				break;

		}

	}

	return envMapModeDefine;

}

function generateEnvMapBlendingDefine(parameters) {

	let envMapBlendingDefine = 'ENVMAP_BLENDING_NONE';

	if (parameters.envMap) {

		switch (parameters.combine) {

			case MultiplyOperation:
				envMapBlendingDefine = 'ENVMAP_BLENDING_MULTIPLY';
				break;

			case MixOperation:
				envMapBlendingDefine = 'ENVMAP_BLENDING_MIX';
				break;

			case AddOperation:
				envMapBlendingDefine = 'ENVMAP_BLENDING_ADD';
				break;

		}

	}

	return envMapBlendingDefine;

}

function WebGLProgram(renderer, cacheKey, parameters, bindingStates) {

	// TODO Send this event to Three.js DevTools
	// console.log( 'WebGLProgram', cacheKey );

	const gl = renderer.getContext();

	const defines = parameters.defines;

	let vertexShader = parameters.vertexShader;
	let fragmentShader = parameters.fragmentShader;

	const envMapTypeDefine = generateEnvMapTypeDefine(parameters);
	const envMapModeDefine = generateEnvMapModeDefine(parameters);
	const envMapBlendingDefine = generateEnvMapBlendingDefine(parameters);

	const gammaFactorDefine = (renderer.gammaFactor > 0) ? renderer.gammaFactor : 1.0;

	const customExtensions = parameters.isWebGL2 ? '' : generateExtensions(parameters);

	const customDefines = generateDefines(defines);

	const program = gl.createProgram();

	let prefixVertex, prefixFragment;
	let versionString = parameters.glslVersion ? '#version ' + parameters.glslVersion + '\n' : '';

	if (parameters.isRawShaderMaterial) {

		prefixVertex = [customDefines].filter(filterEmptyLine).join('\n');

		if (prefixVertex.length > 0) {

			prefixVertex += '\n';

		}

		prefixFragment = [

			customExtensions,
			customDefines

		].filter(filterEmptyLine).join('\n');

		if (prefixFragment.length > 0) {

			prefixFragment += '\n';

		}

	} else {

		prefixVertex = [
			generatePrecision(parameters),
			customDefines,
			parameters.instancing ? '#define USE_INSTANCING' : '',
			'#define GAMMA_FACTOR ' + gammaFactorDefine,
			'#define MAX_BONES ' + parameters.maxBones,

			parameters.clearcoatMap ? '#define USE_CLEARCOATMAP' : '',
			parameters.clearcoatRoughnessMap ? '#define USE_CLEARCOAT_ROUGHNESSMAP' : '',
			parameters.clearcoatNormalMap ? '#define USE_CLEARCOAT_NORMALMAP' : '',

			parameters.vertexTangents ? '#define USE_TANGENT' : '',
			parameters.vertexColors ? '#define USE_COLOR' : '',
			parameters.vertexAlphas ? '#define USE_COLOR_ALPHA' : '',
			parameters.vertexUvs ? '#define USE_UV' : '',
			parameters.uvsVertexOnly ? '#define UVS_VERTEX_ONLY' : '',

			parameters.flatShading ? '#define FLAT_SHADED' : '',

			parameters.skinning ? '#define USE_SKINNING' : '',
			parameters.useVertexTexture ? '#define BONE_TEXTURE' : '',

			parameters.morphTargets ? '#define USE_MORPHTARGETS' : '',
			parameters.morphNormals && parameters.flatShading === false ? '#define USE_MORPHNORMALS' : '',
			parameters.doubleSided ? '#define DOUBLE_SIDED' : '',

			'uniform mat4 modelMatrix;',
			'uniform mat4 modelViewMatrix;',
			'uniform mat4 projectionMatrix;',
			'uniform mat4 viewMatrix;',
			'uniform mat3 normalMatrix;',
			'uniform vec3 cameraPosition;',

			'#ifdef USE_INSTANCING',

			'	attribute mat4 instanceMatrix;',

			'#endif',

			'#ifdef USE_INSTANCING_COLOR',

			'	attribute vec3 instanceColor;',

			'#endif',

			'attribute vec3 position;',
			'attribute vec3 normal;',
			'attribute vec2 uv;',

			'#ifdef USE_TANGENT',

			'	attribute vec4 tangent;',

			'#endif',

			'#if defined( USE_COLOR_ALPHA )',

			'	attribute vec4 color;',

			'#elif defined( USE_COLOR )',

			'	attribute vec3 color;',

			'#endif',

			'#ifdef USE_MORPHTARGETS',

			'	attribute vec3 morphTarget0;',
			'	attribute vec3 morphTarget1;',
			'	attribute vec3 morphTarget2;',
			'	attribute vec3 morphTarget3;',

			'	#ifdef USE_MORPHNORMALS',

			'		attribute vec3 morphNormal0;',
			'		attribute vec3 morphNormal1;',
			'		attribute vec3 morphNormal2;',
			'		attribute vec3 morphNormal3;',

			'	#else',

			'		attribute vec3 morphTarget4;',
			'		attribute vec3 morphTarget5;',
			'		attribute vec3 morphTarget6;',
			'		attribute vec3 morphTarget7;',

			'	#endif',

			'#endif',

			'#ifdef USE_SKINNING',

			'	attribute vec4 skinIndex;',
			'	attribute vec4 skinWeight;',

			'#endif',

			'\n'

		].filter(filterEmptyLine).join('\n');

		prefixFragment = [

			customExtensions,

			generatePrecision(parameters),

			'#define SHADER_NAME ' + parameters.shaderName,

			customDefines,

			'#define GAMMA_FACTOR ' + gammaFactorDefine,

			(parameters.useFog && parameters.fog) ? '#define USE_FOG' : '',

			parameters.map ? '#define USE_MAP' : '',
			parameters.matcap ? '#define USE_MATCAP' : '',
			parameters.envMap ? '#define USE_ENVMAP' : '',
			parameters.envMap ? '#define ' + envMapTypeDefine : '',
			parameters.envMap ? '#define ' + envMapModeDefine : '',
			parameters.envMap ? '#define ' + envMapBlendingDefine : '',
			parameters.lightMap ? '#define USE_LIGHTMAP' : '',
			parameters.aoMap ? '#define USE_AOMAP' : '',
			parameters.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
			parameters.bumpMap ? '#define USE_BUMPMAP' : '',
			parameters.normalMap ? '#define USE_NORMALMAP' : '',
			(parameters.normalMap && parameters.objectSpaceNormalMap) ? '#define OBJECTSPACE_NORMALMAP' : '',
			(parameters.normalMap && parameters.tangentSpaceNormalMap) ? '#define TANGENTSPACE_NORMALMAP' : '',

			parameters.alphaMap ? '#define USE_ALPHAMAP' : '',
			parameters.alphaTest ? '#define USE_ALPHATEST' : '',

			parameters.vertexTangents ? '#define USE_TANGENT' : '',
			parameters.vertexColors || parameters.instancingColor ? '#define USE_COLOR' : '',
			parameters.vertexAlphas ? '#define USE_COLOR_ALPHA' : '',
			parameters.vertexUvs ? '#define USE_UV' : '',
			parameters.uvsVertexOnly ? '#define UVS_VERTEX_ONLY' : '',

			parameters.gradientMap ? '#define USE_GRADIENTMAP' : '',

			parameters.flatShading ? '#define FLAT_SHADED' : '',

			parameters.doubleSided ? '#define DOUBLE_SIDED' : '',

			parameters.premultipliedAlpha ? '#define PREMULTIPLIED_ALPHA' : '',

			parameters.physicallyCorrectLights ? '#define PHYSICALLY_CORRECT_LIGHTS' : '',

			parameters.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
			(parameters.logarithmicDepthBuffer && parameters.rendererExtensionFragDepth) ? '#define USE_LOGDEPTHBUF_EXT' : '',

			((parameters.extensionShaderTextureLOD || parameters.envMap) && parameters.rendererExtensionShaderTextureLod) ? '#define TEXTURE_LOD_EXT' : '',

			'uniform mat4 viewMatrix;',
			'uniform vec3 cameraPosition;',

			(parameters.toneMapping !== NoToneMapping) ? '#define TONE_MAPPING' : '',
			(parameters.toneMapping !== NoToneMapping) ? ShaderChunk.tonemapping_pars_fragment : '', // this code is required here because it is used by the toneMapping() function defined below
			(parameters.toneMapping !== NoToneMapping) ? getToneMappingFunction('toneMapping', parameters.toneMapping) : '',

			parameters.dithering ? '#define DITHERING' : '',
			parameters.format === RGBFormat ? '#define OPAQUE' : '',

			ShaderChunk.encodings_pars_fragment, // this code is required here because it is used by the various encoding/decoding function defined below
			parameters.map ? getTexelDecodingFunction('mapTexelToLinear', parameters.mapEncoding) : '',
			parameters.matcap ? getTexelDecodingFunction('matcapTexelToLinear', parameters.matcapEncoding) : '',
			parameters.envMap ? getTexelDecodingFunction('envMapTexelToLinear', parameters.envMapEncoding) : '',
			parameters.emissiveMap ? getTexelDecodingFunction('emissiveMapTexelToLinear', parameters.emissiveMapEncoding) : '',
			parameters.specularTintMap ? getTexelDecodingFunction('specularTintMapTexelToLinear', parameters.specularTintMapEncoding) : '',
			parameters.lightMap ? getTexelDecodingFunction('lightMapTexelToLinear', parameters.lightMapEncoding) : '',
			getTexelEncodingFunction('linearToOutputTexel', parameters.outputEncoding),

			parameters.depthPacking ? '#define DEPTH_PACKING ' + parameters.depthPacking : '',

			'\n'

		].filter(filterEmptyLine).join('\n');

	}

	vertexShader = resolveIncludes(vertexShader);
	vertexShader = replaceLightNums(vertexShader, parameters);
	vertexShader = replaceClippingPlaneNums(vertexShader, parameters);

	fragmentShader = resolveIncludes(fragmentShader);
	fragmentShader = replaceLightNums(fragmentShader, parameters);
	fragmentShader = replaceClippingPlaneNums(fragmentShader, parameters);

	vertexShader = unrollLoops(vertexShader);
	fragmentShader = unrollLoops(fragmentShader);

	if (parameters.isWebGL2 && parameters.isRawShaderMaterial !== true) {

		// GLSL 3.0 conversion for built-in materials and ShaderMaterial

		versionString = '#version 300 es\n';

		prefixVertex = [
			'#define attribute in',
			'#define varying out',
		].join('\n') + '\n' + prefixVertex;

		prefixFragment = [
			'#define varying in',
			(parameters.glslVersion === GLSL3) ? '' : 'out highp vec4 pc_fragColor;',
			(parameters.glslVersion === GLSL3) ? '' : '#define gl_FragColor pc_fragColor',
			'#define gl_FragDepthEXT gl_FragDepth',
		].join('\n') + '\n' + prefixFragment;

	}

	const vertexGlsl = versionString + prefixVertex + vertexShader;
	const fragmentGlsl = versionString + prefixFragment + fragmentShader;

	const glVertexShader = WebGLShader(gl, 35633, vertexGlsl);
	const glFragmentShader = WebGLShader(gl, 35632, fragmentGlsl);

	gl.attachShader(program, glVertexShader);
	gl.attachShader(program, glFragmentShader);

	// Force a particular attribute to index 0.

	if (parameters.index0AttributeName !== undefined) {

		gl.bindAttribLocation(program, 0, parameters.index0AttributeName);

	} else if (parameters.morphTargets === true) {

		// programs with morphTargets displace position out of attribute 0
		gl.bindAttribLocation(program, 0, 'position');

	}

	gl.linkProgram(program);

	// check for link errors
	if (renderer.debug.checkShaderErrors) {

		const programLog = gl.getProgramInfoLog(program).trim();
		const vertexLog = gl.getShaderInfoLog(glVertexShader).trim();
		const fragmentLog = gl.getShaderInfoLog(glFragmentShader).trim();

		const runnable = true;
		let haveDiagnostics = true;

		if (vertexLog === '' || fragmentLog === '') {
			haveDiagnostics = false;
		}

		if (haveDiagnostics) {
			this.diagnostics = {
				runnable,
				programLog,
				vertexShader: {
					log: vertexLog,
					prefix: prefixVertex
				},
				fragmentShader: {
					log: fragmentLog,
					prefix: prefixFragment
				}
			};
		}
	}

	// Clean up

	// Crashes in iOS9 and iOS10. #18402
	// gl.detachShader( program, glVertexShader );
	// gl.detachShader( program, glFragmentShader );

	gl.deleteShader(glVertexShader);
	gl.deleteShader(glFragmentShader);

	// set up caching for uniform locations

	let cachedUniforms;

	this.getUniforms = function () {

		if (cachedUniforms === undefined) {

			cachedUniforms = new WebGLUniforms(gl, program);

		}

		return cachedUniforms;

	};

	// set up caching for attribute locations

	let cachedAttributes;

	this.getAttributes = function () {

		if (cachedAttributes === undefined) {

			cachedAttributes = fetchAttributeLocations(gl, program);

		}

		return cachedAttributes;

	};

	// free resource

	this.destroy = function () {

		bindingStates.releaseStatesOfProgram(this);

		gl.deleteProgram(program);
		this.program = undefined;

	};

	//

	this.name = parameters.shaderName;
	this.id = programIdCount++;
	this.cacheKey = cacheKey;
	this.usedTimes = 1;
	this.program = program;
	this.vertexShader = glVertexShader;
	this.fragmentShader = glFragmentShader;

	return this;

}

function WebGLPrograms(renderer, cubemaps, cubeuvmaps, extensions, capabilities, bindingStates, clipping) {

	const programs = [];

	const isWebGL2 = capabilities.isWebGL2;
	const logarithmicDepthBuffer = capabilities.logarithmicDepthBuffer;
	const floatVertexTextures = capabilities.floatVertexTextures;
	const vertexTextures = capabilities.vertexTextures;

	let precision = capabilities.precision;

	const shaderIDs = {
		MeshStandardMaterial: 'physical',
		LineBasicMaterial: 'basic'
	};

	const parameterNames = [
		'precision', 'isWebGL2', 'supportsVertexTextures', 'outputEncoding', 'instancing', 'instancingColor',
		'map', 'mapEncoding', 'matcap', 'matcapEncoding', 'envMap', 'envMapMode', 'envMapEncoding', 'envMapCubeUV',
		'lightMap', 'lightMapEncoding', 'aoMap', 'emissiveMap', 'emissiveMapEncoding', 'bumpMap', 'normalMap',
		'objectSpaceNormalMap', 'tangentSpaceNormalMap',
		'clearcoat', 'clearcoatMap', 'clearcoatRoughnessMap', 'clearcoatNormalMap',
		'displacementMap',
		'specularMap', 'specularIntensityMap', 'specularTintMap', 'specularTintMapEncoding', 'roughnessMap', 'metalnessMap', 'gradientMap',
		'alphaMap', 'alphaTest', 'combine', 'vertexColors', 'vertexAlphas', 'vertexTangents', 'vertexUvs', 'uvsVertexOnly', 'fog', 'useFog',
		'flatShading', 'sizeAttenuation', 'logarithmicDepthBuffer', 'skinning',
		'maxBones', 'useVertexTexture', 'morphTargets', 'morphNormals', 'premultipliedAlpha',
		'numDirLights', 'numPointLights', 'numSpotLights', 'numHemiLights', 'numRectAreaLights',
		'numDirLightShadows', 'numPointLightShadows', 'numSpotLightShadows',
		'shadowMapEnabled', 'shadowMapType', 'toneMapping', 'physicallyCorrectLights',
		'doubleSided', 'flipSided', 'numClippingPlanes', 'numClipIntersection', 'depthPacking', 'dithering', 'format',
		'sheenTint', 'transmission', 'transmissionMap', 'thicknessMap'
	];

	function getTextureEncodingFromMap() {
		return LinearEncoding;
	}

	function getParameters(material, lights, shadows, scene, object) {

		const fog = scene.fog;
		const environment = material.isMeshStandardMaterial ? scene.environment : null;

		const envMap = (material.isMeshStandardMaterial ? cubeuvmaps : cubemaps).get(material.envMap || environment);

		const shaderID = shaderIDs[material.type];

		// heuristics to create shader parameters according to lights in the scene
		// (not to blow over maxLights budget)

		const maxBones = 0;

		if (material.precision !== null) {

			precision = capabilities.getMaxPrecision(material.precision);

			if (precision !== material.precision) {

				console.warn('THREE.WebGLProgram.getParameters:', material.precision, 'not supported, using', precision, 'instead.');

			}

		}

		let vertexShader, fragmentShader;

		if (shaderID) {

			const shader = ShaderLib[shaderID];

			vertexShader = shader.vertexShader;
			fragmentShader = shader.fragmentShader;

		} else {

			vertexShader = material.vertexShader;
			fragmentShader = material.fragmentShader;

		}

		const currentRenderTarget = renderer.getRenderTarget();

		const useAlphaTest = material.alphaTest > 0;
		const useClearcoat = material.clearcoat > 0;

		const parameters = {

			isWebGL2,

			shaderID,
			shaderName: material.type,

			vertexShader,
			fragmentShader,
			defines: material.defines,

			isRawShaderMaterial: material.isRawShaderMaterial === true,
			glslVersion: material.glslVersion,

			precision,

			instancing: false,
			instancingColor: false,

			supportsVertexTextures: vertexTextures,
			outputEncoding: (currentRenderTarget !== null) ? getTextureEncodingFromMap(currentRenderTarget.texture) : renderer.outputEncoding,
			map: Boolean(material.map),
			mapEncoding: getTextureEncodingFromMap(material.map),
			matcap: Boolean(material.matcap),
			matcapEncoding: getTextureEncodingFromMap(material.matcap),
			envMap: Boolean(envMap),
			envMapMode: envMap && envMap.mapping,
			envMapEncoding: getTextureEncodingFromMap(envMap),
			envMapCubeUV: (Boolean(envMap)) && ((envMap.mapping === CubeUVReflectionMapping) || (envMap.mapping === CubeUVRefractionMapping)),
			lightMap: Boolean(material.lightMap),
			lightMapEncoding: getTextureEncodingFromMap(material.lightMap),
			aoMap: Boolean(material.aoMap),
			emissiveMap: Boolean(material.emissiveMap),
			emissiveMapEncoding: getTextureEncodingFromMap(material.emissiveMap),
			bumpMap: Boolean(material.bumpMap),
			normalMap: Boolean(material.normalMap),
			objectSpaceNormalMap: material.normalMapType === ObjectSpaceNormalMap,
			tangentSpaceNormalMap: material.normalMapType === TangentSpaceNormalMap,

			clearcoat: useClearcoat,
			clearcoatMap: useClearcoat && Boolean(material.clearcoatMap),
			clearcoatRoughnessMap: useClearcoat && Boolean(material.clearcoatRoughnessMap),
			clearcoatNormalMap: useClearcoat && Boolean(material.clearcoatNormalMap),

			displacementMap: Boolean(material.displacementMap),
			roughnessMap: Boolean(material.roughnessMap),
			metalnessMap: Boolean(material.metalnessMap),
			specularMap: Boolean(material.specularMap),
			specularIntensityMap: Boolean(material.specularIntensityMap),
			specularTintMap: Boolean(material.specularTintMap),
			specularTintMapEncoding: getTextureEncodingFromMap(material.specularTintMap),

			alphaMap: Boolean(material.alphaMap),
			alphaTest: useAlphaTest,

			gradientMap: Boolean(material.gradientMap),

			sheenTint: (Boolean(material.sheenTint) && (material.sheenTint.r > 0 || material.sheenTint.g > 0 || material.sheenTint.b > 0)),

			transmission: material.transmission > 0,
			transmissionMap: Boolean(material.transmissionMap),
			thicknessMap: Boolean(material.thicknessMap),

			combine: material.combine,

			vertexTangents: (Boolean(material.normalMap) && Boolean(object.geometry) && Boolean(object.geometry.attributes.tangent)),
			vertexColors: material.vertexColors,
			vertexAlphas: material.vertexColors === true && Boolean(object.geometry) && Boolean(object.geometry.attributes.color) && object.geometry.attributes.color.itemSize === 4,
			vertexUvs: Boolean(material.map) || Boolean(material.bumpMap) || Boolean(material.normalMap) || Boolean(material.specularMap) || Boolean(material.alphaMap) || Boolean(material.emissiveMap) || Boolean(material.roughnessMap) || Boolean(material.metalnessMap) || Boolean(material.clearcoatMap) || Boolean(material.clearcoatRoughnessMap) || Boolean(material.clearcoatNormalMap) || Boolean(material.displacementMap) || Boolean(material.transmissionMap) || Boolean(material.thicknessMap) || Boolean(material.specularIntensityMap) || Boolean(material.specularTintMap),
			uvsVertexOnly: !(Boolean(material.map) || Boolean(material.bumpMap) || Boolean(material.normalMap) || Boolean(material.specularMap) || Boolean(material.alphaMap) || Boolean(material.emissiveMap) || Boolean(material.roughnessMap) || Boolean(material.metalnessMap) || Boolean(material.clearcoatNormalMap) || material.transmission > 0 || Boolean(material.transmissionMap) || Boolean(material.thicknessMap) || Boolean(material.specularIntensityMap) || Boolean(material.specularTintMap)) && Boolean(material.displacementMap),

			fog: Boolean(fog),
			useFog: material.fog,

			flatShading: Boolean(material.flatShading),

			sizeAttenuation: material.sizeAttenuation,
			logarithmicDepthBuffer,

			skinning: false,
			maxBones,
			useVertexTexture: floatVertexTextures,

			morphTargets: Boolean(object.geometry) && Boolean(object.geometry.morphAttributes.position),
			morphNormals: Boolean(object.geometry) && Boolean(object.geometry.morphAttributes.normal),

			numDirLights: lights.directional.length,
			numPointLights: lights.point.length,
			numSpotLights: lights.spot.length,
			numRectAreaLights: lights.rectArea.length,
			numHemiLights: lights.hemi.length,

			numDirLightShadows: lights.directionalShadowMap.length,
			numPointLightShadows: lights.pointShadowMap.length,
			numSpotLightShadows: lights.spotShadowMap.length,

			numClippingPlanes: clipping.numPlanes,
			numClipIntersection: clipping.numIntersection,

			format: material.format,
			dithering: material.dithering,

			shadowMapEnabled: renderer.shadowMap.enabled && shadows.length > 0,
			shadowMapType: renderer.shadowMap.type,

			toneMapping: material.toneMapped ? renderer.toneMapping : NoToneMapping,
			physicallyCorrectLights: renderer.physicallyCorrectLights,

			premultipliedAlpha: material.premultipliedAlpha,

			doubleSided: material.side === DoubleSide,
			flipSided: material.side === BackSide,

			depthPacking: (material.depthPacking !== undefined) ? material.depthPacking : false,

			index0AttributeName: material.index0AttributeName,

			extensionDerivatives: material.extensions && material.extensions.derivatives,
			extensionFragDepth: material.extensions && material.extensions.fragDepth,
			extensionDrawBuffers: material.extensions && material.extensions.drawBuffers,
			extensionShaderTextureLOD: material.extensions && material.extensions.shaderTextureLOD,

			rendererExtensionFragDepth: isWebGL2 || extensions.has('EXT_frag_depth'),
			rendererExtensionDrawBuffers: isWebGL2 || extensions.has('WEBGL_draw_buffers'),
			rendererExtensionShaderTextureLod: isWebGL2 || extensions.has('EXT_shader_texture_lod'),

			customProgramCacheKey: material.customProgramCacheKey()

		};

		return parameters;

	}

	function getProgramCacheKey(parameters) {

		const array = [];

		if (parameters.shaderID) {

			array.push(parameters.shaderID);

		} else {

			array.push(parameters.fragmentShader);
			array.push(parameters.vertexShader);

		}

		if (parameters.defines !== undefined) {

			for (const name in parameters.defines) {

				array.push(name);
				array.push(parameters.defines[name]);

			}

		}

		if (parameters.isRawShaderMaterial === false) {

			for (let i = 0; i < parameterNames.length; i++) {

				array.push(parameters[parameterNames[i]]);

			}

			array.push(renderer.outputEncoding);
			array.push(renderer.gammaFactor);

		}

		array.push(parameters.customProgramCacheKey);

		return array.join();

	}

	function getUniforms(material) {

		const shaderID = shaderIDs[material.type];
		let uniforms;

		if (shaderID) {

			const shader = ShaderLib[shaderID];
			uniforms = UniformsUtils.clone(shader.uniforms);

		} else {

			uniforms = material.uniforms;

		}

		return uniforms;

	}

	function acquireProgram(parameters, cacheKey) {

		let program;

		// Check if code has been already compiled
		for (let p = 0, pl = programs.length; p < pl; p++) {

			const preexistingProgram = programs[p];

			if (preexistingProgram.cacheKey === cacheKey) {

				program = preexistingProgram;
				++program.usedTimes;

				break;

			}

		}

		if (program === undefined) {

			program = new WebGLProgram(renderer, cacheKey, parameters, bindingStates);
			programs.push(program);

		}

		return program;

	}

	function releaseProgram(program) {

		if (--program.usedTimes === 0) {

			// Remove from unordered set
			const i = programs.indexOf(program);
			programs[i] = programs[programs.length - 1];
			programs.pop();

			// Free WebGL resources
			program.destroy();

		}

	}

	return {
		getParameters,
		getProgramCacheKey,
		getUniforms,
		acquireProgram,
		releaseProgram,
		// Exposed for resource monitoring & error feedback via renderer.info:
		programs
	};

}

function WebGLProperties() {

	let properties = new WeakMap();

	function get(object) {

		let map = properties.get(object);

		if (map === undefined) {

			map = {};
			properties.set(object, map);

		}

		return map;

	}

	function remove(object) {

		properties.delete(object);

	}

	function update(object, key, value) {

		properties.get(object)[key] = value;

	}

	function dispose() {

		properties = new WeakMap();

	}

	return {
		get,
		remove,
		update,
		dispose
	};

}

function painterSortStable(a, b) {

	if (a.groupOrder !== b.groupOrder) {

		return a.groupOrder - b.groupOrder;

	} else if (a.renderOrder !== b.renderOrder) {

		return a.renderOrder - b.renderOrder;

	} else if (a.program !== b.program) {

		return a.program.id - b.program.id;

	} else if (a.material.id !== b.material.id) {

		return a.material.id - b.material.id;

	} else if (a.z !== b.z) {

		return a.z - b.z;

	}

	return a.id - b.id;


}

function reversePainterSortStable(a, b) {

	if (a.groupOrder !== b.groupOrder) {

		return a.groupOrder - b.groupOrder;

	} else if (a.renderOrder !== b.renderOrder) {

		return a.renderOrder - b.renderOrder;

	} else if (a.z !== b.z) {

		return b.z - a.z;

	}

	return a.id - b.id;


}


function WebGLRenderList(properties) {

	const renderItems = [];
	let renderItemsIndex = 0;

	const opaque = [];
	const transmissive = [];
	const transparent = [];

	const defaultProgram = { id: -1 };

	function init() {

		renderItemsIndex = 0;

		opaque.length = 0;
		transmissive.length = 0;
		transparent.length = 0;

	}

	function getNextRenderItem(object, geometry, material, groupOrder, z, group) {

		let renderItem = renderItems[renderItemsIndex];
		const materialProperties = properties.get(material);

		if (renderItem === undefined) {

			renderItem = {
				id: object.id,
				object,
				geometry,
				material,
				program: materialProperties.program || defaultProgram,
				groupOrder,
				renderOrder: object.renderOrder,
				z,
				group
			};

			renderItems[renderItemsIndex] = renderItem;

		} else {

			renderItem.id = object.id;
			renderItem.object = object;
			renderItem.geometry = geometry;
			renderItem.material = material;
			renderItem.program = materialProperties.program || defaultProgram;
			renderItem.groupOrder = groupOrder;
			renderItem.renderOrder = object.renderOrder;
			renderItem.z = z;
			renderItem.group = group;

		}

		renderItemsIndex++;

		return renderItem;

	}

	function push(object, geometry, material, groupOrder, z, group) {

		const renderItem = getNextRenderItem(object, geometry, material, groupOrder, z, group);

		if (material.transmission > 0.0) {

			transmissive.push(renderItem);

		} else if (material.transparent === true) {

			transparent.push(renderItem);

		} else {

			opaque.push(renderItem);

		}

	}

	function unshift(object, geometry, material, groupOrder, z, group) {

		const renderItem = getNextRenderItem(object, geometry, material, groupOrder, z, group);

		if (material.transmission > 0.0) {

			transmissive.unshift(renderItem);

		} else if (material.transparent === true) {

			transparent.unshift(renderItem);

		} else {

			opaque.unshift(renderItem);

		}

	}

	function sort(customOpaqueSort, customTransparentSort) {

		if (opaque.length > 1) {
			opaque.sort(customOpaqueSort || painterSortStable);
		}
		if (transmissive.length > 1) {
			transmissive.sort(customTransparentSort || reversePainterSortStable);
		}
		if (transparent.length > 1) {
			transparent.sort(customTransparentSort || reversePainterSortStable);
		}

	}

	function finish() {

		// Clear references from inactive renderItems in the list

		for (let i = renderItemsIndex, il = renderItems.length; i < il; i++) {

			const renderItem = renderItems[i];

			if (renderItem.id === null) {
				break;
			}

			renderItem.id = null;
			renderItem.object = null;
			renderItem.geometry = null;
			renderItem.material = null;
			renderItem.program = null;
			renderItem.group = null;

		}

	}

	return {

		opaque,
		transmissive,
		transparent,

		init,
		push,
		unshift,
		finish,

		sort
	};

}

function WebGLRenderLists(properties) {

	let lists = new WeakMap();

	function get(scene, renderCallDepth) {

		let list;

		if (lists.has(scene) === false) {

			list = new WebGLRenderList(properties);
			lists.set(scene, [list]);

		} else {

			if (renderCallDepth >= lists.get(scene).length) {

				list = new WebGLRenderList(properties);
				lists.get(scene).push(list);

			} else {

				list = lists.get(scene)[renderCallDepth];

			}

		}

		return list;

	}

	function dispose() {

		lists = new WeakMap();

	}

	return {
		get,
		dispose
	};

}

function UniformsCache() {

	const lights = {};

	return {

		get(light) {

			if (lights[light.id] !== undefined) {

				return lights[light.id];

			}

			let uniforms;

			switch (light.type) {

				case 'DirectionalLight':
					uniforms = {
						direction: new Vector3(),
						color: new Color()
					};
					break;

				case 'SpotLight':
					uniforms = {
						position: new Vector3(),
						direction: new Vector3(),
						color: new Color(),
						distance: 0,
						coneCos: 0,
						penumbraCos: 0,
						decay: 0
					};
					break;

				case 'PointLight':
					uniforms = {
						position: new Vector3(),
						color: new Color(),
						distance: 0,
						decay: 0
					};
					break;

			}

			lights[light.id] = uniforms;

			return uniforms;

		}

	};

}

function ShadowUniformsCache() {

	const lights = {};

	return {

		get(light) {

			if (lights[light.id] !== undefined) {

				return lights[light.id];

			}

			let uniforms;

			switch (light.type) {

				case 'DirectionalLight':
					uniforms = {
						shadowBias: 0,
						shadowNormalBias: 0,
						shadowRadius: 1,
						shadowMapSize: new Vector2()
					};
					break;

				case 'SpotLight':
					uniforms = {
						shadowBias: 0,
						shadowNormalBias: 0,
						shadowRadius: 1,
						shadowMapSize: new Vector2()
					};
					break;

				case 'PointLight':
					uniforms = {
						shadowBias: 0,
						shadowNormalBias: 0,
						shadowRadius: 1,
						shadowMapSize: new Vector2(),
						shadowCameraNear: 1,
						shadowCameraFar: 1000
					};
					break;

				// TODO (abelnation): set RectAreaLight shadow uniforms

			}

			lights[light.id] = uniforms;

			return uniforms;

		}

	};

}


let nextVersion = 0;

function WebGLLights() {
	const cache = new UniformsCache();

	const shadowCache = ShadowUniformsCache();

	const state = {

		version: 0,

		hash: {
			directionalLength: -1,
			pointLength: -1,
			spotLength: -1,
			rectAreaLength: -1,
			hemiLength: -1,

			numDirectionalShadows: -1,
			numPointShadows: -1,
			numSpotShadows: -1
		},

		ambient: [0, 0, 0],
		probe: [],
		directional: [],
		directionalShadow: [],
		directionalShadowMap: [],
		directionalShadowMatrix: [],
		spot: [],
		spotShadow: [],
		spotShadowMap: [],
		spotShadowMatrix: [],
		rectArea: [],
		rectAreaLTC1: null,
		rectAreaLTC2: null,
		point: [],
		pointShadow: [],
		pointShadowMap: [],
		pointShadowMatrix: [],
		hemi: []

	};

	for (let i = 0; i < 9; i++) {
		state.probe.push(new Vector3());
	}

	const vector3 = new Vector3();

	function setup(lights, physicallyCorrectLights) {

		let r = 0, g = 0, b = 0;

		for (let i = 0; i < 9; i++) {
			state.probe[i].set(0, 0, 0);
		}

		let directionalLength = 0;
		let pointLength = 0;
		let spotLength = 0;
		const rectAreaLength = 0;
		const hemiLength = 0;

		let numDirectionalShadows = 0;
		let numPointShadows = 0;
		let numSpotShadows = 0;

		// artist-friendly light intensity scaling factor
		const scaleFactor = (physicallyCorrectLights !== true) ? Math.PI : 1;

		for (let i = 0, l = lights.length; i < l; i++) {

			const light = lights[i];

			const color = light.color;
			const intensity = light.intensity;
			const distance = light.distance;

			const shadowMap = (light.shadow && light.shadow.map) ? light.shadow.map.texture : null;

			if (light.isAmbientLight) {

				r += color.r * intensity * scaleFactor;
				g += color.g * intensity * scaleFactor;
				b += color.b * intensity * scaleFactor;

			} else if (light.isLightProbe) {

				for (let j = 0; j < 9; j++) {

					state.probe[j].addScaledVector(light.sh.coefficients[j], intensity);

				}

			} else if (light.isDirectionalLight) {

				const uniforms = cache.get(light);

				uniforms.color.copy(light.color).multiplyScalar(light.intensity * scaleFactor);

				if (light.castShadow) {

					const shadow = light.shadow;

					const shadowUniforms = shadowCache.get(light);

					shadowUniforms.shadowBias = shadow.bias;
					shadowUniforms.shadowNormalBias = shadow.normalBias;
					shadowUniforms.shadowRadius = shadow.radius;
					shadowUniforms.shadowMapSize = shadow.mapSize;

					state.directionalShadow[directionalLength] = shadowUniforms;
					state.directionalShadowMap[directionalLength] = shadowMap;
					state.directionalShadowMatrix[directionalLength] = light.shadow.matrix;

					numDirectionalShadows++;

				}

				state.directional[directionalLength] = uniforms;

				directionalLength++;

			} else if (light.isSpotLight) {

				const uniforms = cache.get(light);

				uniforms.position.setFromMatrixPosition(light.matrixWorld);

				uniforms.color.copy(color).multiplyScalar(intensity * scaleFactor);
				uniforms.distance = distance;

				uniforms.coneCos = Math.cos(light.angle);
				uniforms.penumbraCos = Math.cos(light.angle * (1 - light.penumbra));
				uniforms.decay = light.decay;

				if (light.castShadow) {

					const shadow = light.shadow;

					const shadowUniforms = shadowCache.get(light);

					shadowUniforms.shadowBias = shadow.bias;
					shadowUniforms.shadowNormalBias = shadow.normalBias;
					shadowUniforms.shadowRadius = shadow.radius;
					shadowUniforms.shadowMapSize = shadow.mapSize;

					state.spotShadow[spotLength] = shadowUniforms;
					state.spotShadowMap[spotLength] = shadowMap;
					state.spotShadowMatrix[spotLength] = light.shadow.matrix;

					numSpotShadows++;

				}

				state.spot[spotLength] = uniforms;

				spotLength++;

			} else if (light.isPointLight) {

				const uniforms = cache.get(light);

				uniforms.color.copy(light.color).multiplyScalar(light.intensity * scaleFactor);
				uniforms.distance = light.distance;
				uniforms.decay = light.decay;

				if (light.castShadow) {

					const shadow = light.shadow;

					const shadowUniforms = shadowCache.get(light);

					shadowUniforms.shadowBias = shadow.bias;
					shadowUniforms.shadowNormalBias = shadow.normalBias;
					shadowUniforms.shadowRadius = shadow.radius;
					shadowUniforms.shadowMapSize = shadow.mapSize;
					shadowUniforms.shadowCameraNear = shadow.camera.near;
					shadowUniforms.shadowCameraFar = shadow.camera.far;

					state.pointShadow[pointLength] = shadowUniforms;
					state.pointShadowMap[pointLength] = shadowMap;
					state.pointShadowMatrix[pointLength] = light.shadow.matrix;

					numPointShadows++;

				}

				state.point[pointLength] = uniforms;

				pointLength++;

			}

		}

		state.ambient[0] = r;
		state.ambient[1] = g;
		state.ambient[2] = b;

		const hash = state.hash;

		if (hash.directionalLength !== directionalLength ||
			hash.pointLength !== pointLength ||
			hash.spotLength !== spotLength ||
			hash.rectAreaLength !== rectAreaLength ||
			hash.hemiLength !== hemiLength ||
			hash.numDirectionalShadows !== numDirectionalShadows ||
			hash.numPointShadows !== numPointShadows ||
			hash.numSpotShadows !== numSpotShadows) {

			state.directional.length = directionalLength;
			state.spot.length = spotLength;
			state.rectArea.length = rectAreaLength;
			state.point.length = pointLength;
			state.hemi.length = hemiLength;

			state.directionalShadow.length = numDirectionalShadows;
			state.directionalShadowMap.length = numDirectionalShadows;
			state.pointShadow.length = numPointShadows;
			state.pointShadowMap.length = numPointShadows;
			state.spotShadow.length = numSpotShadows;
			state.spotShadowMap.length = numSpotShadows;
			state.directionalShadowMatrix.length = numDirectionalShadows;
			state.pointShadowMatrix.length = numPointShadows;
			state.spotShadowMatrix.length = numSpotShadows;

			hash.directionalLength = directionalLength;
			hash.pointLength = pointLength;
			hash.spotLength = spotLength;
			hash.rectAreaLength = rectAreaLength;
			hash.hemiLength = hemiLength;

			hash.numDirectionalShadows = numDirectionalShadows;
			hash.numPointShadows = numPointShadows;
			hash.numSpotShadows = numSpotShadows;

			state.version = nextVersion++;

		}

	}

	function setupView(lights, camera) {

		let directionalLength = 0;
		let pointLength = 0;
		let spotLength = 0;
		const viewMatrix = camera.matrixWorldInverse;

		for (let i = 0, l = lights.length; i < l; i++) {

			const light = lights[i];

			if (light.isDirectionalLight) {

				const uniforms = state.directional[directionalLength];

				uniforms.direction.setFromMatrixPosition(light.matrixWorld);
				vector3.setFromMatrixPosition(light.target.matrixWorld);
				uniforms.direction.sub(vector3);
				uniforms.direction.transformDirection(viewMatrix);

				directionalLength++;

			} else if (light.isSpotLight) {

				const uniforms = state.spot[spotLength];

				uniforms.position.setFromMatrixPosition(light.matrixWorld);
				uniforms.position.applyMatrix4(viewMatrix);

				uniforms.direction.setFromMatrixPosition(light.matrixWorld);
				vector3.setFromMatrixPosition(light.target.matrixWorld);
				uniforms.direction.sub(vector3);
				uniforms.direction.transformDirection(viewMatrix);

				spotLength++;

			} else if (light.isPointLight) {

				const uniforms = state.point[pointLength];

				uniforms.position.setFromMatrixPosition(light.matrixWorld);
				uniforms.position.applyMatrix4(viewMatrix);

				pointLength++;

			}

		}

	}

	return {
		setup,
		setupView,
		state
	};

}

function WebGLRenderState(extensions, capabilities) {

	const lights = new WebGLLights(extensions, capabilities);

	const lightsArray = [];
	const shadowsArray = [];

	function init() {

		lightsArray.length = 0;
		shadowsArray.length = 0;

	}

	function pushLight(light) {

		lightsArray.push(light);

	}

	function pushShadow(shadowLight) {

		shadowsArray.push(shadowLight);

	}

	function setupLights(physicallyCorrectLights) {

		lights.setup(lightsArray, physicallyCorrectLights);

	}

	function setupLightsView(camera) {

		lights.setupView(lightsArray, camera);

	}

	const state = {
		lightsArray,
		shadowsArray,

		lights
	};

	return {
		init,
		state,
		setupLights,
		setupLightsView,

		pushLight,
		pushShadow
	};

}

function WebGLRenderStates(extensions, capabilities) {

	let renderStates = new WeakMap();

	function get(scene, renderCallDepth = 0) {

		let renderState;

		if (renderStates.has(scene) === false) {

			renderState = new WebGLRenderState(extensions, capabilities);
			renderStates.set(scene, [renderState]);

		} else {

			if (renderCallDepth >= renderStates.get(scene).length) {

				renderState = new WebGLRenderState(extensions, capabilities);
				renderStates.get(scene).push(renderState);

			} else {

				renderState = renderStates.get(scene)[renderCallDepth];

			}

		}

		return renderState;

	}

	function dispose() {

		renderStates = new WeakMap();

	}

	return {
		get,
		dispose
	};

}

const vsm_frag = "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\nuniform float samples;\n#include <packing>\nvoid main() {\n\tfloat mean = 0.0;\n\tfloat squared_mean = 0.0;\n\tfloat uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n\tfloat uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n\tfor ( float i = 0.0; i < samples; i ++ ) {\n\t\tfloat uvOffset = uvStart + i * uvStride;\n\t\t#ifdef HORIZONTAL_PASS\n\t\t\tvec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );\n\t\t\tmean += distribution.x;\n\t\t\tsquared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n\t\t#else\n\t\t\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );\n\t\t\tmean += depth;\n\t\t\tsquared_mean += depth * depth;\n\t\t#endif\n\t}\n\tmean = mean / samples;\n\tsquared_mean = squared_mean / samples;\n\tfloat std_dev = sqrt( squared_mean - mean * mean );\n\tgl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n}";

const vsm_vert = "void main() {\n\tgl_Position = vec4( position, 1.0 );\n}";

function WebGLShadowMap(_renderer, _objects, _capabilities) {

	let _frustum = new Frustum();

	const _shadowMapSize = new Vector2(),
		_viewportSize = new Vector2(),

		_viewport = new Vector4(),

		_materialCache = {},

		_maxTextureSize = _capabilities.maxTextureSize;

	const shadowSide = {
		0: BackSide,
		1: FrontSide,
		2: DoubleSide
	};

	const shadowMaterialVertical = new ShaderMaterial({

		uniforms: {
			shadow_pass: { value: null },
			resolution: { value: new Vector2() },
			radius: { value: 4.0 },
			samples: { value: 8.0 }
		},

		vertexShader: vsm_vert,

		fragmentShader: vsm_frag

	});

	const shadowMaterialHorizontal = shadowMaterialVertical.clone();
	shadowMaterialHorizontal.defines.HORIZONTAL_PASS = 1;

	const fullScreenTri = new BufferGeometry();
	fullScreenTri.setAttribute(
		'position',
		new BufferAttribute(
			new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
			3
		)
	);

	const fullScreenMesh = new Mesh(fullScreenTri, shadowMaterialVertical);

	const scope = this;

	this.enabled = false;

	this.autoUpdate = true;
	this.needsUpdate = false;

	this.type = PCFShadowMap;

	this.render = function (lights, scene, camera) {

		if (scope.enabled === false) {
			return;
		}
		if (scope.autoUpdate === false && scope.needsUpdate === false) {
			return;
		}

		if (lights.length === 0) {
			return;
		}

		const currentRenderTarget = _renderer.getRenderTarget();
		const activeCubeFace = _renderer.getActiveCubeFace();
		const activeMipmapLevel = _renderer.getActiveMipmapLevel();

		const _state = _renderer.state;

		// Set GL state for depth map.
		_state.setBlending(NoBlending);
		_state.buffers.color.setClear(1, 1, 1, 1);
		_state.buffers.depth.setTest(true);
		_state.setScissorTest(false);

		// render depth map

		for (let i = 0, il = lights.length; i < il; i++) {

			const light = lights[i];
			const shadow = light.shadow;

			if (shadow === undefined) {

				console.warn('THREE.WebGLShadowMap:', light, 'has no shadow.');
				continue;

			}

			if (shadow.autoUpdate === false && shadow.needsUpdate === false) {
				continue;
			}

			_shadowMapSize.copy(shadow.mapSize);

			const shadowFrameExtents = shadow.getFrameExtents();

			_shadowMapSize.multiply(shadowFrameExtents);

			_viewportSize.copy(shadow.mapSize);

			if (_shadowMapSize.x > _maxTextureSize || _shadowMapSize.y > _maxTextureSize) {

				if (_shadowMapSize.x > _maxTextureSize) {

					_viewportSize.x = Math.floor(_maxTextureSize / shadowFrameExtents.x);
					_shadowMapSize.x = _viewportSize.x * shadowFrameExtents.x;
					shadow.mapSize.x = _viewportSize.x;

				}

				if (_shadowMapSize.y > _maxTextureSize) {

					_viewportSize.y = Math.floor(_maxTextureSize / shadowFrameExtents.y);
					_shadowMapSize.y = _viewportSize.y * shadowFrameExtents.y;
					shadow.mapSize.y = _viewportSize.y;

				}

			}

			_renderer.setRenderTarget(shadow.map);
			_renderer.clear();

			const viewportCount = shadow.getViewportCount();

			for (let vp = 0; vp < viewportCount; vp++) {

				const viewport = shadow.getViewport(vp);

				_viewport.set(
					_viewportSize.x * viewport.x,
					_viewportSize.y * viewport.y,
					_viewportSize.x * viewport.z,
					_viewportSize.y * viewport.w
				);

				_state.viewport(_viewport);

				shadow.updateMatrices(light, vp);

				_frustum = shadow.getFrustum();

				renderObject(scene, camera, shadow.camera, light, this.type);

			}

			// do blur pass for VSM

			if (!shadow.isPointLightShadow && this.type === VSMShadowMap) {

				VSMPass(shadow, camera);

			}

			shadow.needsUpdate = false;

		}

		scope.needsUpdate = false;

		_renderer.setRenderTarget(currentRenderTarget, activeCubeFace, activeMipmapLevel);

	};

	function VSMPass(shadow, camera) {

		const geometry = _objects.update(fullScreenMesh);

		// vertical pass

		shadowMaterialVertical.uniforms.shadow_pass.value = shadow.map.texture;
		shadowMaterialVertical.uniforms.resolution.value = shadow.mapSize;
		shadowMaterialVertical.uniforms.radius.value = shadow.radius;
		shadowMaterialVertical.uniforms.samples.value = shadow.blurSamples;
		_renderer.setRenderTarget(shadow.mapPass);
		_renderer.clear();
		_renderer.renderBufferDirect(camera, null, geometry, shadowMaterialVertical, fullScreenMesh, null);

		// horizontal pass

		shadowMaterialHorizontal.uniforms.shadow_pass.value = shadow.mapPass.texture;
		shadowMaterialHorizontal.uniforms.resolution.value = shadow.mapSize;
		shadowMaterialHorizontal.uniforms.radius.value = shadow.radius;
		shadowMaterialHorizontal.uniforms.samples.value = shadow.blurSamples;
		_renderer.setRenderTarget(shadow.map);
		_renderer.clear();
		_renderer.renderBufferDirect(camera, null, geometry, shadowMaterialHorizontal, fullScreenMesh, null);

	}

	function getDepthMaterial(object, geometry, material, light, shadowCameraNear, shadowCameraFar, type) {

		let result = null;

		const customMaterial = (light.isPointLight === true) ? object.customDistanceMaterial : object.customDepthMaterial;

		if (customMaterial !== undefined) {

			result = customMaterial;

		} else {

			result = undefined;

		}

		if ((_renderer.localClippingEnabled && material.clipShadows === true && material.clippingPlanes.length !== 0) ||
			(material.displacementMap && material.displacementScale !== 0) ||
			(material.alphaMap && material.alphaTest > 0)) {

			// in this case we need a unique material instance reflecting the
			// appropriate state

			const keyA = result.uuid, keyB = material.uuid;

			let materialsForVariant = _materialCache[keyA];

			if (materialsForVariant === undefined) {

				materialsForVariant = {};
				_materialCache[keyA] = materialsForVariant;

			}

			let cachedMaterial = materialsForVariant[keyB];

			if (cachedMaterial === undefined) {

				cachedMaterial = result.clone();
				materialsForVariant[keyB] = cachedMaterial;

			}

			result = cachedMaterial;

		}

		result.visible = material.visible;

		if (type === VSMShadowMap) {

			result.side = (material.shadowSide !== null) ? material.shadowSide : material.side;

		} else {

			result.side = (material.shadowSide !== null) ? material.shadowSide : shadowSide[material.side];

		}

		result.alphaMap = material.alphaMap;
		result.alphaTest = material.alphaTest;

		result.clipShadows = material.clipShadows;
		result.clippingPlanes = material.clippingPlanes;
		result.clipIntersection = material.clipIntersection;

		result.displacementMap = material.displacementMap;
		result.displacementScale = material.displacementScale;
		result.displacementBias = material.displacementBias;

		result.linewidth = material.linewidth;

		return result;
	}

	function renderObject(object, camera, shadowCamera, light, type) {

		if (object.visible === false) {
			return;
		}

		const visible = object.layers.test(camera.layers);

		if (visible && (object.isMesh || object.isLine || object.isPoints)) {

			if ((object.castShadow || (object.receiveShadow && type === VSMShadowMap)) && (!object.frustumCulled || _frustum.intersectsObject(object))) {

				object.modelViewMatrix.multiplyMatrices(shadowCamera.matrixWorldInverse, object.matrixWorld);

				const geometry = _objects.update(object);
				const material = object.material;

				if (Array.isArray(material)) {

					const groups = geometry.groups;

					for (let k = 0, kl = groups.length; k < kl; k++) {

						const group = groups[k];
						const groupMaterial = material[group.materialIndex];

						if (groupMaterial && groupMaterial.visible) {

							const depthMaterial = getDepthMaterial(object, geometry, groupMaterial, light, shadowCamera.near, shadowCamera.far, type);

							_renderer.renderBufferDirect(shadowCamera, null, geometry, depthMaterial, object, group);

						}

					}

				} else if (material.visible) {

					const depthMaterial = getDepthMaterial(object, geometry, material, light, shadowCamera.near, shadowCamera.far, type);

					_renderer.renderBufferDirect(shadowCamera, null, geometry, depthMaterial, object, null);

				}

			}

		}

		const children = object.children;

		for (let i = 0, l = children.length; i < l; i++) {

			renderObject(children[i], camera, shadowCamera, light, type);

		}

	}

}

function WebGLState(gl, extensions, capabilities) {

	const isWebGL2 = capabilities.isWebGL2;

	function ColorBuffer() {

		let locked = false;

		const color = new Vector4();
		let currentColorMask = null;
		const currentColorClear = new Vector4(0, 0, 0, 0);

		return {

			setMask(colorMask) {

				if (currentColorMask !== colorMask && !locked) {

					gl.colorMask(colorMask, colorMask, colorMask, colorMask);
					currentColorMask = colorMask;

				}

			},

			setLocked(lock) {

				locked = lock;

			},

			setClear(r, g, b, a, premultipliedAlpha) {

				if (premultipliedAlpha === true) {

					r *= a; g *= a; b *= a;

				}

				color.set(r, g, b, a);

				if (currentColorClear.equals(color) === false) {

					gl.clearColor(r, g, b, a);
					currentColorClear.copy(color);

				}

			},

			reset() {

				locked = false;

				currentColorMask = null;
				currentColorClear.set(-1, 0, 0, 0); // set to invalid state

			}

		};

	}

	function DepthBuffer() {

		let locked = false;

		let currentDepthMask = null;
		let currentDepthFunc = null;
		let currentDepthClear = null;

		return {

			setTest(depthTest) {

				if (depthTest) {

					enable(2929);

				} else {

					disable(2929);

				}

			},

			setMask(depthMask) {

				if (currentDepthMask !== depthMask && !locked) {

					gl.depthMask(depthMask);
					currentDepthMask = depthMask;

				}

			},

			setFunc(depthFunc) {

				if (currentDepthFunc !== depthFunc) {

					if (depthFunc) {

						switch (depthFunc) {

							case NeverDepth:

								gl.depthFunc(512);
								break;

							case AlwaysDepth:

								gl.depthFunc(519);
								break;

							case LessDepth:

								gl.depthFunc(513);
								break;

							case LessEqualDepth:

								gl.depthFunc(515);
								break;

							case EqualDepth:

								gl.depthFunc(514);
								break;

							case GreaterEqualDepth:

								gl.depthFunc(518);
								break;

							case GreaterDepth:

								gl.depthFunc(516);
								break;

							case NotEqualDepth:

								gl.depthFunc(517);
								break;

							default:

								gl.depthFunc(515);

						}

					} else {

						gl.depthFunc(515);

					}

					currentDepthFunc = depthFunc;

				}

			},

			setLocked(lock) {

				locked = lock;

			},

			setClear(depth) {

				if (currentDepthClear !== depth) {

					gl.clearDepth(depth);
					currentDepthClear = depth;

				}

			},

			reset() {

				locked = false;

				currentDepthMask = null;
				currentDepthFunc = null;
				currentDepthClear = null;

			}

		};

	}

	function StencilBuffer() {

		let locked = false;

		let currentStencilMask = null;
		let currentStencilFunc = null;
		let currentStencilRef = null;
		let currentStencilFuncMask = null;
		let currentStencilFail = null;
		let currentStencilZFail = null;
		let currentStencilZPass = null;
		let currentStencilClear = null;

		return {

			setTest(stencilTest) {

				if (!locked) {

					if (stencilTest) {

						enable(2960);

					} else {

						disable(2960);

					}

				}

			},

			setMask(stencilMask) {

				if (currentStencilMask !== stencilMask && !locked) {

					gl.stencilMask(stencilMask);
					currentStencilMask = stencilMask;

				}

			},

			setFunc(stencilFunc, stencilRef, stencilMask) {

				if (currentStencilFunc !== stencilFunc ||
					currentStencilRef !== stencilRef ||
					currentStencilFuncMask !== stencilMask) {

					gl.stencilFunc(stencilFunc, stencilRef, stencilMask);

					currentStencilFunc = stencilFunc;
					currentStencilRef = stencilRef;
					currentStencilFuncMask = stencilMask;

				}

			},

			setOp(stencilFail, stencilZFail, stencilZPass) {

				if (currentStencilFail !== stencilFail ||
					currentStencilZFail !== stencilZFail ||
					currentStencilZPass !== stencilZPass) {

					gl.stencilOp(stencilFail, stencilZFail, stencilZPass);

					currentStencilFail = stencilFail;
					currentStencilZFail = stencilZFail;
					currentStencilZPass = stencilZPass;

				}

			},

			setLocked(lock) {

				locked = lock;

			},

			setClear(stencil) {

				if (currentStencilClear !== stencil) {

					gl.clearStencil(stencil);
					currentStencilClear = stencil;

				}

			},

			reset() {

				locked = false;

				currentStencilMask = null;
				currentStencilFunc = null;
				currentStencilRef = null;
				currentStencilFuncMask = null;
				currentStencilFail = null;
				currentStencilZFail = null;
				currentStencilZPass = null;
				currentStencilClear = null;

			}

		};

	}

	//

	const colorBuffer = new ColorBuffer();
	const depthBuffer = new DepthBuffer();
	const stencilBuffer = new StencilBuffer();

	const enabledCapabilities = {};

	let xrFramebuffer = null;
	const currentBoundFramebuffers = {};

	let currentProgram = null;

	let currentBlendingEnabled = false;
	let currentBlending = null;
	let currentBlendEquation = null;
	let currentBlendSrc = null;
	let currentBlendDst = null;
	let currentBlendEquationAlpha = null;
	let currentBlendSrcAlpha = null;
	let currentBlendDstAlpha = null;
	let currentPremultipledAlpha = false;

	let currentFlipSided = null;
	let currentCullFace = null;

	let currentLineWidth = null;

	let currentPolygonOffsetFactor = null;
	let currentPolygonOffsetUnits = null;

	let lineWidthAvailable = false;
	let version = 0;
	const glVersion = gl.getParameter(7938);

	if (glVersion.indexOf('WebGL') !== -1) {

		version = parseFloat((/^WebGL (\d)/).exec(glVersion)[1]);
		lineWidthAvailable = (version >= 1.0);

	} else if (glVersion.indexOf('OpenGL ES') !== -1) {

		version = parseFloat((/^OpenGL ES (\d)/).exec(glVersion)[1]);
		lineWidthAvailable = (version >= 2.0);

	}

	const scissorParam = gl.getParameter(3088);
	const viewportParam = gl.getParameter(2978);

	const currentScissor = new Vector4().fromArray(scissorParam);
	const currentViewport = new Vector4().fromArray(viewportParam);

	// init

	colorBuffer.setClear(0, 0, 0, 1);
	depthBuffer.setClear(1);
	stencilBuffer.setClear(0);

	enable(2929);
	depthBuffer.setFunc(LessEqualDepth);

	setFlipSided(false);
	setCullFace(CullFaceBack);
	enable(2884);

	setBlending(NoBlending);

	//

	function enable(id) {

		if (enabledCapabilities[id] !== true) {

			gl.enable(id);
			enabledCapabilities[id] = true;

		}

	}

	function disable(id) {

		if (enabledCapabilities[id] !== false) {

			gl.disable(id);
			enabledCapabilities[id] = false;

		}

	}

	function bindXRFramebuffer(framebuffer) {

		if (framebuffer !== xrFramebuffer) {

			gl.bindFramebuffer(36160, framebuffer);

			xrFramebuffer = framebuffer;

		}

	}

	function bindFramebuffer(target, framebuffer) {

		if (framebuffer === null && xrFramebuffer !== null) {
			framebuffer = xrFramebuffer;
		} // use active XR framebuffer if available

		if (currentBoundFramebuffers[target] !== framebuffer) {

			gl.bindFramebuffer(target, framebuffer);

			currentBoundFramebuffers[target] = framebuffer;

			if (isWebGL2) {

				// 36009 is equivalent to 36160

				if (target === 36009) {

					currentBoundFramebuffers[36160] = framebuffer;

				}

				if (target === 36160) {

					currentBoundFramebuffers[36009] = framebuffer;

				}

			}

			return true;

		}

		return false;

	}

	function useProgram(program) {

		if (currentProgram !== program) {

			gl.useProgram(program);

			currentProgram = program;

			return true;

		}

		return false;

	}

	const equationToGL = {
		[AddEquation]: 32774,
		[SubtractEquation]: 32778,
		[ReverseSubtractEquation]: 32779
	};

	if (isWebGL2) {

		equationToGL[MinEquation] = 32775;
		equationToGL[MaxEquation] = 32776;

	} else {

		const extension = extensions.get('EXT_blend_minmax');

		if (extension !== null) {

			equationToGL[MinEquation] = extension.MIN_EXT;
			equationToGL[MaxEquation] = extension.MAX_EXT;

		}

	}

	const factorToGL = {
		[ZeroFactor]: 0,
		[OneFactor]: 1,
		[SrcColorFactor]: 768,
		[SrcAlphaFactor]: 770,
		[SrcAlphaSaturateFactor]: 776,
		[DstColorFactor]: 774,
		[DstAlphaFactor]: 772,
		[OneMinusSrcColorFactor]: 769,
		[OneMinusSrcAlphaFactor]: 771,
		[OneMinusDstColorFactor]: 775,
		[OneMinusDstAlphaFactor]: 773
	};

	function setBlending(blending, blendEquation, blendSrc, blendDst, blendEquationAlpha, blendSrcAlpha, blendDstAlpha, premultipliedAlpha) {

		if (blending === NoBlending) {

			if (currentBlendingEnabled === true) {

				disable(3042);
				currentBlendingEnabled = false;

			}

			return;

		}

		if (currentBlendingEnabled === false) {

			enable(3042);
			currentBlendingEnabled = true;

		}

		if (blending !== CustomBlending) {

			if (blending !== currentBlending || premultipliedAlpha !== currentPremultipledAlpha) {

				if (currentBlendEquation !== AddEquation || currentBlendEquationAlpha !== AddEquation) {

					gl.blendEquation(32774);

					currentBlendEquation = AddEquation;
					currentBlendEquationAlpha = AddEquation;

				}

				if (premultipliedAlpha) {

					switch (blending) {

						case NormalBlending:
							gl.blendFuncSeparate(1, 771, 1, 771);
							break;

						case AdditiveBlending:
							gl.blendFunc(1, 1);
							break;

						case SubtractiveBlending:
							gl.blendFuncSeparate(0, 0, 769, 771);
							break;

						case MultiplyBlending:
							gl.blendFuncSeparate(0, 768, 0, 770);
							break;
					}
				} else {

					switch (blending) {

						case NormalBlending:
							gl.blendFuncSeparate(770, 771, 1, 771);
							break;

						case AdditiveBlending:
							gl.blendFunc(770, 1);
							break;

						case SubtractiveBlending:
							gl.blendFunc(0, 769);
							break;

						case MultiplyBlending:
							gl.blendFunc(0, 768);
							break;
					}

				}

				currentBlendSrc = null;
				currentBlendDst = null;
				currentBlendSrcAlpha = null;
				currentBlendDstAlpha = null;

				currentBlending = blending;
				currentPremultipledAlpha = premultipliedAlpha;

			}

			return;

		}

		// custom blending

		blendEquationAlpha = blendEquationAlpha || blendEquation;
		blendSrcAlpha = blendSrcAlpha || blendSrc;
		blendDstAlpha = blendDstAlpha || blendDst;

		if (blendEquation !== currentBlendEquation || blendEquationAlpha !== currentBlendEquationAlpha) {

			gl.blendEquationSeparate(equationToGL[blendEquation], equationToGL[blendEquationAlpha]);

			currentBlendEquation = blendEquation;
			currentBlendEquationAlpha = blendEquationAlpha;

		}

		if (blendSrc !== currentBlendSrc || blendDst !== currentBlendDst || blendSrcAlpha !== currentBlendSrcAlpha || blendDstAlpha !== currentBlendDstAlpha) {

			gl.blendFuncSeparate(factorToGL[blendSrc], factorToGL[blendDst], factorToGL[blendSrcAlpha], factorToGL[blendDstAlpha]);

			currentBlendSrc = blendSrc;
			currentBlendDst = blendDst;
			currentBlendSrcAlpha = blendSrcAlpha;
			currentBlendDstAlpha = blendDstAlpha;

		}

		currentBlending = blending;
		currentPremultipledAlpha = null;

	}

	function setMaterial(material, frontFaceCW) {

		material.side === DoubleSide
			? disable(2884)
			: enable(2884);

		let flipSided = (material.side === BackSide);
		if (frontFaceCW) {
			flipSided = !flipSided;
		}

		setFlipSided(flipSided);

		(material.blending === NormalBlending && material.transparent === false)
			? setBlending(NoBlending)
			: setBlending(material.blending, material.blendEquation, material.blendSrc, material.blendDst, material.blendEquationAlpha, material.blendSrcAlpha, material.blendDstAlpha, material.premultipliedAlpha);

		depthBuffer.setFunc(material.depthFunc);
		depthBuffer.setTest(material.depthTest);
		depthBuffer.setMask(material.depthWrite);
		colorBuffer.setMask(material.colorWrite);

		const stencilWrite = material.stencilWrite;
		stencilBuffer.setTest(stencilWrite);
		if (stencilWrite) {

			stencilBuffer.setMask(material.stencilWriteMask);
			stencilBuffer.setFunc(material.stencilFunc, material.stencilRef, material.stencilFuncMask);
			stencilBuffer.setOp(material.stencilFail, material.stencilZFail, material.stencilZPass);

		}

		setPolygonOffset(material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits);

		material.alphaToCoverage === true
			? enable(32926)
			: disable(32926);

	}

	//

	function setFlipSided(flipSided) {

		if (currentFlipSided !== flipSided) {

			if (flipSided) {

				gl.frontFace(2304);

			} else {

				gl.frontFace(2305);

			}

			currentFlipSided = flipSided;

		}

	}

	function setCullFace(cullFace) {

		if (cullFace !== CullFaceNone) {

			enable(2884);

			if (cullFace !== currentCullFace) {

				if (cullFace === CullFaceBack) {

					gl.cullFace(1029);

				} else if (cullFace === CullFaceFront) {

					gl.cullFace(1028);

				} else {

					gl.cullFace(1032);

				}

			}

		} else {

			disable(2884);

		}

		currentCullFace = cullFace;

	}

	function setLineWidth(width) {

		if (width !== currentLineWidth) {

			if (lineWidthAvailable) {
				gl.lineWidth(width);
			}

			currentLineWidth = width;

		}

	}

	function setPolygonOffset(polygonOffset, factor, units) {

		if (polygonOffset) {

			enable(32823);

			if (currentPolygonOffsetFactor !== factor || currentPolygonOffsetUnits !== units) {

				gl.polygonOffset(factor, units);

				currentPolygonOffsetFactor = factor;
				currentPolygonOffsetUnits = units;

			}

		} else {

			disable(32823);

		}

	}

	function setScissorTest(scissorTest) {

		if (scissorTest) {

			enable(3089);

		} else {

			disable(3089);

		}

	}

	function scissor(scissor) {

		if (currentScissor.equals(scissor) === false) {

			gl.scissor(scissor.x, scissor.y, scissor.z, scissor.w);
			currentScissor.copy(scissor);

		}

	}

	function viewport(viewport) {

		if (currentViewport.equals(viewport) === false) {

			gl.viewport(viewport.x, viewport.y, viewport.z, viewport.w);
			currentViewport.copy(viewport);

		}

	}

	return {

		buffers: {
			color: colorBuffer,
			depth: depthBuffer,
			stencil: stencilBuffer
		},

		enable,
		disable,

		bindFramebuffer,
		bindXRFramebuffer,

		useProgram,

		setBlending,
		setMaterial,

		setFlipSided,
		setCullFace,

		setLineWidth,
		setPolygonOffset,

		setScissorTest,

		scissor,
		viewport
	};
}

function WebGLTextures(_gl, extensions, state, properties, capabilities, utils, info) {

	const isWebGL2 = capabilities.isWebGL2;
	const maxTextures = capabilities.maxTextures;
	const maxSamples = capabilities.maxSamples;

	function isPowerOfTwo$1(image) {
		return isPowerOfTwo(image.width) && isPowerOfTwo(image.height);
	}

	function getInternalFormat(internalFormatName, glFormat, glType) {
		if (isWebGL2 === false) {
			return glFormat;
		}

		let internalFormat = glFormat;

		if (glFormat === 6403) {
			if (glType === 5126) {
				internalFormat = 33326;
			}
			if (glType === 5131) {
				internalFormat = 33325;
			}
			if (glType === 5121) {
				internalFormat = 33321;
			}
		}

		if (glFormat === 6407) {
			if (glType === 5126) {
				internalFormat = 34837;
			}
			if (glType === 5131) {
				internalFormat = 34843;
			}
			if (glType === 5121) {
				internalFormat = 32849;
			}
		}

		if (glFormat === 6408) {

			if (glType === 5126) {
				internalFormat = 34836;
			}
			if (glType === 5131) {
				internalFormat = 34842;
			}
			if (glType === 5121) {
				internalFormat = 32856;
			}

		}

		if (internalFormat === 33325 || internalFormat === 33326 ||
			internalFormat === 34842 || internalFormat === 34836) {

			extensions.get('EXT_color_buffer_float');

		}

		return internalFormat;

	}

	// Fallback filters for non-power-of-2 textures

	function filterFallback(f) {

		if (f === NearestFilter || f === NearestMipmapNearestFilter || f === NearestMipmapLinearFilter) {

			return 9728;

		}

		return 9729;

	}

	function onRenderTargetDispose(event) {

		const renderTarget = event.target;

		renderTarget.removeEventListener('dispose', onRenderTargetDispose);

		deallocateRenderTarget(renderTarget);

	}

	function deallocateRenderTarget(renderTarget) {

		const texture = renderTarget.texture;

		const renderTargetProperties = properties.get(renderTarget);
		const textureProperties = properties.get(texture);

		if (!renderTarget) {
			return;
		}

		if (textureProperties.__webglTexture !== undefined) {

			_gl.deleteTexture(textureProperties.__webglTexture);

			info.memory.textures--;

		}

		if (renderTarget.depthTexture) {

			renderTarget.depthTexture.dispose();

		}

		if (renderTarget.isWebGLCubeRenderTarget) {

			for (let i = 0; i < 6; i++) {

				_gl.deleteFramebuffer(renderTargetProperties.__webglFramebuffer[i]);
				if (renderTargetProperties.__webglDepthbuffer) {
					_gl.deleteRenderbuffer(renderTargetProperties.__webglDepthbuffer[i]);
				}

			}

		} else {

			_gl.deleteFramebuffer(renderTargetProperties.__webglFramebuffer);
			if (renderTargetProperties.__webglDepthbuffer) {
				_gl.deleteRenderbuffer(renderTargetProperties.__webglDepthbuffer);
			}
			if (renderTargetProperties.__webglMultisampledFramebuffer) {
				_gl.deleteFramebuffer(renderTargetProperties.__webglMultisampledFramebuffer);
			}
			if (renderTargetProperties.__webglColorRenderbuffer) {
				_gl.deleteRenderbuffer(renderTargetProperties.__webglColorRenderbuffer);
			}
			if (renderTargetProperties.__webglDepthRenderbuffer) {
				_gl.deleteRenderbuffer(renderTargetProperties.__webglDepthRenderbuffer);
			}

		}

		if (renderTarget.isWebGLMultipleRenderTargets) {

			for (let i = 0, il = texture.length; i < il; i++) {

				const attachmentProperties = properties.get(texture[i]);

				if (attachmentProperties.__webglTexture) {

					_gl.deleteTexture(attachmentProperties.__webglTexture);

					info.memory.textures--;

				}

				properties.remove(texture[i]);

			}

		}

		properties.remove(texture);
		properties.remove(renderTarget);

	}

	//

	let textureUnits = 0;

	function resetTextureUnits() {

		textureUnits = 0;

	}

	function allocateTextureUnit() {

		const textureUnit = textureUnits;

		if (textureUnit >= maxTextures) {

			console.warn('THREE.WebGLTextures: Trying to use ' + textureUnit + ' texture units while this GPU supports only ' + maxTextures);

		}

		textureUnits += 1;

		return textureUnit;

	}

	const wrappingToGL = {
		[RepeatWrapping]: 10497,
		[ClampToEdgeWrapping]: 33071,
		[MirroredRepeatWrapping]: 33648
	};

	const filterToGL = {
		[NearestFilter]: 9728,
		[NearestMipmapNearestFilter]: 9984,
		[NearestMipmapLinearFilter]: 9986,

		[LinearFilter]: 9729,
		[LinearMipmapNearestFilter]: 9985,
	};

	function setTextureParameters(textureType, texture, supportsMips) {

		if (supportsMips) {

			_gl.texParameteri(textureType, 10242, wrappingToGL[texture.wrapS]);
			_gl.texParameteri(textureType, 10243, wrappingToGL[texture.wrapT]);

			if (textureType === 32879 || textureType === 35866) {

				_gl.texParameteri(textureType, 32882, wrappingToGL[texture.wrapR]);

			}

			_gl.texParameteri(textureType, 10240, filterToGL[texture.magFilter]);
			_gl.texParameteri(textureType, 10241, filterToGL[texture.minFilter]);

		} else {

			_gl.texParameteri(textureType, 10242, 33071);
			_gl.texParameteri(textureType, 10243, 33071);

			if (textureType === 32879 || textureType === 35866) {

				_gl.texParameteri(textureType, 32882, 33071);

			}

			if (texture.wrapS !== ClampToEdgeWrapping || texture.wrapT !== ClampToEdgeWrapping) {

				console.warn('THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.');

			}

			_gl.texParameteri(textureType, 10240, filterFallback(texture.magFilter));
			_gl.texParameteri(textureType, 10241, filterFallback(texture.minFilter));

			if (texture.minFilter !== NearestFilter && texture.minFilter !== LinearFilter) {

				console.warn('THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.');

			}

		}

		if (extensions.has('EXT_texture_filter_anisotropic') === true) {

			const extension = extensions.get('EXT_texture_filter_anisotropic');

			if (texture.type === FloatType && extensions.has('OES_texture_float_linear') === false) {
				return;
			} // verify extension for WebGL 1 and WebGL 2
			if (isWebGL2 === false && (texture.type === HalfFloatType && extensions.has('OES_texture_half_float_linear') === false)) {
				return;
			} // verify extension for WebGL 1 only

			if (texture.anisotropy > 1 || properties.get(texture).__currentAnisotropy) {

				_gl.texParameterf(textureType, extension.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(texture.anisotropy, capabilities.getMaxAnisotropy()));
				properties.get(texture).__currentAnisotropy = texture.anisotropy;

			}

		}

	}

	// Setup storage for target texture and bind it to correct framebuffer
	function setupFrameBufferTexture(framebuffer, renderTarget, texture, attachment, textureTarget) {

		const glFormat = utils.convert(texture.format);
		const glType = utils.convert(texture.type);
		const glInternalFormat = getInternalFormat(texture.internalFormat, glFormat, glType);

		if (textureTarget === 32879 || textureTarget === 35866) {

			state.texImage3D(textureTarget, 0, glInternalFormat, renderTarget.width, renderTarget.height, renderTarget.depth, 0, glFormat, glType, null);

		}

		state.bindFramebuffer(36160, framebuffer);
		_gl.framebufferTexture2D(36160, attachment, textureTarget, properties.get(texture).__webglTexture, 0);
		state.bindFramebuffer(36160, null);

	}

	// Setup storage for internal depth/stencil buffers and bind to correct framebuffer
	function setupRenderBufferStorage(renderbuffer, renderTarget, isMultisample) {

		_gl.bindRenderbuffer(36161, renderbuffer);

		if (renderTarget.depthBuffer && !renderTarget.stencilBuffer) {

			let glInternalFormat = 33189;

			if (isMultisample) {

				const depthTexture = renderTarget.depthTexture;

				if (depthTexture && depthTexture.isDepthTexture) {

					if (depthTexture.type === FloatType) {

						glInternalFormat = 36012;

					} else if (depthTexture.type === UnsignedIntType) {

						glInternalFormat = 33190;

					}

				}

				const samples = getRenderTargetSamples(renderTarget);

				_gl.renderbufferStorageMultisample(36161, samples, glInternalFormat, renderTarget.width, renderTarget.height);

			} else {

				_gl.renderbufferStorage(36161, glInternalFormat, renderTarget.width, renderTarget.height);

			}

			_gl.framebufferRenderbuffer(36160, 36096, 36161, renderbuffer);

		} else if (renderTarget.depthBuffer && renderTarget.stencilBuffer) {

			if (isMultisample) {

				const samples = getRenderTargetSamples(renderTarget);

				_gl.renderbufferStorageMultisample(36161, samples, 35056, renderTarget.width, renderTarget.height);

			} else {

				_gl.renderbufferStorage(36161, 34041, renderTarget.width, renderTarget.height);

			}


			_gl.framebufferRenderbuffer(36160, 33306, 36161, renderbuffer);

		} else {

			// Use the first texture for MRT so far
			const texture = renderTarget.isWebGLMultipleRenderTargets === true ? renderTarget.texture[0] : renderTarget.texture;

			const glFormat = utils.convert(texture.format);
			const glType = utils.convert(texture.type);
			const glInternalFormat = getInternalFormat(texture.internalFormat, glFormat, glType);

			if (isMultisample) {

				const samples = getRenderTargetSamples(renderTarget);

				_gl.renderbufferStorageMultisample(36161, samples, glInternalFormat, renderTarget.width, renderTarget.height);

			} else {

				_gl.renderbufferStorage(36161, glInternalFormat, renderTarget.width, renderTarget.height);

			}

		}

		_gl.bindRenderbuffer(36161, null);

	}

	// Setup resources for a Depth Texture for a FBO (needs an extension)
	function setupDepthTexture(framebuffer, renderTarget) {

		const isCube = (renderTarget && renderTarget.isWebGLCubeRenderTarget);
		if (isCube) {
			throw new Error('Depth Texture with cube render targets is not supported');
		}

		state.bindFramebuffer(36160, framebuffer);

		if (!(renderTarget.depthTexture && renderTarget.depthTexture.isDepthTexture)) {

			throw new Error('renderTarget.depthTexture must be an instance of THREE.DepthTexture');

		}

		// upload an empty depth texture with framebuffer size
		if (!properties.get(renderTarget.depthTexture).__webglTexture ||
			renderTarget.depthTexture.image.width !== renderTarget.width ||
			renderTarget.depthTexture.image.height !== renderTarget.height) {

			renderTarget.depthTexture.image.width = renderTarget.width;
			renderTarget.depthTexture.image.height = renderTarget.height;
			renderTarget.depthTexture.needsUpdate = true;

		}

		const webglDepthTexture = properties.get(renderTarget.depthTexture).__webglTexture;

		if (renderTarget.depthTexture.format === DepthFormat) {

			_gl.framebufferTexture2D(36160, 36096, 3553, webglDepthTexture, 0);

		} else if (renderTarget.depthTexture.format === DepthStencilFormat) {

			_gl.framebufferTexture2D(36160, 33306, 3553, webglDepthTexture, 0);

		} else {

			throw new Error('Unknown depthTexture format');

		}

	}

	// Setup GL resources for a non-texture depth buffer
	function setupDepthRenderbuffer(renderTarget) {

		const renderTargetProperties = properties.get(renderTarget);

		const isCube = (renderTarget.isWebGLCubeRenderTarget === true);

		if (renderTarget.depthTexture) {

			if (isCube) {
				throw new Error('target.depthTexture not supported in Cube render targets');
			}

			setupDepthTexture(renderTargetProperties.__webglFramebuffer, renderTarget);

		} else {

			if (isCube) {

				renderTargetProperties.__webglDepthbuffer = [];

				for (let i = 0; i < 6; i++) {

					state.bindFramebuffer(36160, renderTargetProperties.__webglFramebuffer[i]);
					renderTargetProperties.__webglDepthbuffer[i] = _gl.createRenderbuffer();
					setupRenderBufferStorage(renderTargetProperties.__webglDepthbuffer[i], renderTarget, false);

				}

			} else {

				state.bindFramebuffer(36160, renderTargetProperties.__webglFramebuffer);
				renderTargetProperties.__webglDepthbuffer = _gl.createRenderbuffer();
				setupRenderBufferStorage(renderTargetProperties.__webglDepthbuffer, renderTarget, false);

			}

		}

		state.bindFramebuffer(36160, null);

	}

	// Set up GL resources for the render target
	function setupRenderTarget(renderTarget) {

		const texture = renderTarget.texture;

		const renderTargetProperties = properties.get(renderTarget);
		const textureProperties = properties.get(texture);

		renderTarget.addEventListener('dispose', onRenderTargetDispose);

		const isCube = (renderTarget.isWebGLCubeRenderTarget === true);
		const isMultipleRenderTargets = (renderTarget.isWebGLMultipleRenderTargets === true);
		const isMultisample = (renderTarget.isWebGLMultisampleRenderTarget === true);
		const isRenderTarget3D = false;
		const supportsMips = isPowerOfTwo$1(renderTarget) || isWebGL2;

		// Handles WebGL2 RGBFormat fallback - #18858

		if (isWebGL2 && texture.format === RGBFormat && (texture.type === FloatType || texture.type === HalfFloatType)) {

			texture.format = RGBAFormat;

			console.warn('THREE.WebGLRenderer: Rendering to textures with RGB format is not supported. Using RGBA format instead.');

		}

		// Setup framebuffer

		if (isCube) {

			renderTargetProperties.__webglFramebuffer = [];

			for (let i = 0; i < 6; i++) {

				renderTargetProperties.__webglFramebuffer[i] = _gl.createFramebuffer();

			}

		} else {

			renderTargetProperties.__webglFramebuffer = _gl.createFramebuffer();

			if (isMultipleRenderTargets) {

				if (capabilities.drawBuffers) {

					const textures = renderTarget.texture;

					for (let i = 0, il = textures.length; i < il; i++) {

						const attachmentProperties = properties.get(textures[i]);

						if (attachmentProperties.__webglTexture === undefined) {

							info.memory.textures++;

						}

					}

				} else {

					console.warn('THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.');

				}

			} else if (isMultisample) {

				if (isWebGL2) {

					renderTargetProperties.__webglMultisampledFramebuffer = _gl.createFramebuffer();
					renderTargetProperties.__webglColorRenderbuffer = _gl.createRenderbuffer();

					_gl.bindRenderbuffer(36161, renderTargetProperties.__webglColorRenderbuffer);

					const glFormat = utils.convert(texture.format);
					const glType = utils.convert(texture.type);
					const glInternalFormat = getInternalFormat(texture.internalFormat, glFormat, glType);
					const samples = getRenderTargetSamples(renderTarget);
					_gl.renderbufferStorageMultisample(36161, samples, glInternalFormat, renderTarget.width, renderTarget.height);

					state.bindFramebuffer(36160, renderTargetProperties.__webglMultisampledFramebuffer);
					_gl.framebufferRenderbuffer(36160, 36064, 36161, renderTargetProperties.__webglColorRenderbuffer);
					_gl.bindRenderbuffer(36161, null);

					if (renderTarget.depthBuffer) {

						renderTargetProperties.__webglDepthRenderbuffer = _gl.createRenderbuffer();
						setupRenderBufferStorage(renderTargetProperties.__webglDepthRenderbuffer, renderTarget, true);

					}

					state.bindFramebuffer(36160, null);


				} else {

					console.warn('THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.');

				}

			}

		}

		// Setup color buffer

		if (isCube) {

			state.bindTexture(34067, textureProperties.__webglTexture);
			setTextureParameters(34067, texture, supportsMips);

			for (let i = 0; i < 6; i++) {

				setupFrameBufferTexture(renderTargetProperties.__webglFramebuffer[i], renderTarget, texture, 36064, 34069 + i);

			}

			state.unbindTexture();

		} else if (isMultipleRenderTargets) {

			const textures = renderTarget.texture;

			for (let i = 0, il = textures.length; i < il; i++) {

				const attachment = textures[i];
				const attachmentProperties = properties.get(attachment);

				state.bindTexture(3553, attachmentProperties.__webglTexture);
				setTextureParameters(3553, attachment, supportsMips);
				setupFrameBufferTexture(renderTargetProperties.__webglFramebuffer, renderTarget, attachment, 36064 + i, 3553);

			}

			state.unbindTexture();

		} else {

			let glTextureType = 3553;

			if (isRenderTarget3D) {

				// Render targets containing layers, i.e: Texture 3D and 2d arrays

				if (isWebGL2) {
					glTextureType = 35866;
				}
			}

			state.bindTexture(glTextureType, textureProperties.__webglTexture);
			setTextureParameters(glTextureType, texture, supportsMips);
			setupFrameBufferTexture(renderTargetProperties.__webglFramebuffer, renderTarget, texture, 36064, glTextureType);

			state.unbindTexture();

		}

		// Setup depth and stencil buffers

		if (renderTarget.depthBuffer) {

			setupDepthRenderbuffer(renderTarget);

		}

	}

	function getRenderTargetSamples(renderTarget) {

		return (isWebGL2 && renderTarget.isWebGLMultisampleRenderTarget)
			? Math.min(maxSamples, renderTarget.samples) : 0;

	}

	this.allocateTextureUnit = allocateTextureUnit;
	this.resetTextureUnits = resetTextureUnits;

	this.setupRenderTarget = setupRenderTarget;
}

function WebGLUtils(gl, extensions, capabilities) {

	const isWebGL2 = capabilities.isWebGL2;

	function convert(p) {

		let extension;

		if (p === UnsignedByteType) {
			return 5121;
		}
		if (p === UnsignedShort4444Type) {
			return 32819;
		}
		if (p === UnsignedShort5551Type) {
			return 32820;
		}
		if (p === UnsignedShort565Type) {
			return 33635;
		}

		if (p === ByteType) {
			return 5120;
		}
		if (p === ShortType) {
			return 5122;
		}
		if (p === UnsignedShortType) {
			return 5123;
		}
		if (p === IntType) {
			return 5124;
		}
		if (p === UnsignedIntType) {
			return 5125;
		}
		if (p === FloatType) {
			return 5126;
		}

		if (p === HalfFloatType) {

			if (isWebGL2) {
				return 5131;
			}

			extension = extensions.get('OES_texture_half_float');

			if (extension !== null) {

				return extension.HALF_FLOAT_OES;

			}

			return null;


		}

		if (p === AlphaFormat) {
			return 6406;
		}
		if (p === RGBFormat) {
			return 6407;
		}
		if (p === RGBAFormat) {
			return 6408;
		}
		if (p === LuminanceFormat) {
			return 6409;
		}
		if (p === LuminanceAlphaFormat) {
			return 6410;
		}
		if (p === DepthFormat) {
			return 6402;
		}
		if (p === DepthStencilFormat) {
			return 34041;
		}
		if (p === RedFormat) {
			return 6403;
		}

		// WebGL2 formats.

		if (p === RedIntegerFormat) {
			return 36244;
		}
		if (p === RGFormat) {
			return 33319;
		}
		if (p === RGIntegerFormat) {
			return 33320;
		}
		if (p === RGBIntegerFormat) {
			return 36248;
		}
		if (p === RGBAIntegerFormat) {
			return 36249;
		}

		if (p === RGB_S3TC_DXT1_Format || p === RGBA_S3TC_DXT1_Format ||
			p === RGBA_S3TC_DXT3_Format || p === RGBA_S3TC_DXT5_Format) {

			extension = extensions.get('WEBGL_compressed_texture_s3tc');

			if (extension !== null) {

				if (p === RGB_S3TC_DXT1_Format) {
					return extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
				}
				if (p === RGBA_S3TC_DXT1_Format) {
					return extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
				}
				if (p === RGBA_S3TC_DXT3_Format) {
					return extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
				}
				if (p === RGBA_S3TC_DXT5_Format) {
					return extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;
				}

			} else {

				return null;

			}

		}

		if (p === RGB_PVRTC_4BPPV1_Format || p === RGB_PVRTC_2BPPV1_Format ||
			p === RGBA_PVRTC_4BPPV1_Format || p === RGBA_PVRTC_2BPPV1_Format) {

			extension = extensions.get('WEBGL_compressed_texture_pvrtc');

			if (extension !== null) {

				if (p === RGB_PVRTC_4BPPV1_Format) {
					return extension.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
				}
				if (p === RGB_PVRTC_2BPPV1_Format) {
					return extension.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
				}
				if (p === RGBA_PVRTC_4BPPV1_Format) {
					return extension.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
				}
				if (p === RGBA_PVRTC_2BPPV1_Format) {
					return extension.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
				}

			} else {

				return null;

			}

		}

		if (p === RGB_ETC1_Format) {

			extension = extensions.get('WEBGL_compressed_texture_etc1');

			if (extension !== null) {

				return extension.COMPRESSED_RGB_ETC1_WEBGL;

			}

			return null;


		}

		if (p === RGB_ETC2_Format || p === RGBA_ETC2_EAC_Format) {

			extension = extensions.get('WEBGL_compressed_texture_etc');

			if (extension !== null) {

				if (p === RGB_ETC2_Format) {
					return extension.COMPRESSED_RGB8_ETC2;
				}
				if (p === RGBA_ETC2_EAC_Format) {
					return extension.COMPRESSED_RGBA8_ETC2_EAC;
				}

			}

		}

		if (p === RGBA_ASTC_4x4_Format || p === RGBA_ASTC_5x4_Format || p === RGBA_ASTC_5x5_Format ||
			p === RGBA_ASTC_6x5_Format || p === RGBA_ASTC_6x6_Format || p === RGBA_ASTC_8x5_Format ||
			p === RGBA_ASTC_8x6_Format || p === RGBA_ASTC_8x8_Format || p === RGBA_ASTC_10x5_Format ||
			p === RGBA_ASTC_10x6_Format || p === RGBA_ASTC_10x8_Format || p === RGBA_ASTC_10x10_Format ||
			p === RGBA_ASTC_12x10_Format || p === RGBA_ASTC_12x12_Format ||
			p === SRGB8_ALPHA8_ASTC_4x4_Format || p === SRGB8_ALPHA8_ASTC_5x4_Format || p === SRGB8_ALPHA8_ASTC_5x5_Format ||
			p === SRGB8_ALPHA8_ASTC_6x5_Format || p === SRGB8_ALPHA8_ASTC_6x6_Format || p === SRGB8_ALPHA8_ASTC_8x5_Format ||
			p === SRGB8_ALPHA8_ASTC_8x6_Format || p === SRGB8_ALPHA8_ASTC_8x8_Format || p === SRGB8_ALPHA8_ASTC_10x5_Format ||
			p === SRGB8_ALPHA8_ASTC_10x6_Format || p === SRGB8_ALPHA8_ASTC_10x8_Format || p === SRGB8_ALPHA8_ASTC_10x10_Format ||
			p === SRGB8_ALPHA8_ASTC_12x10_Format || p === SRGB8_ALPHA8_ASTC_12x12_Format) {

			extension = extensions.get('WEBGL_compressed_texture_astc');

			if (extension !== null) {

				// TODO Complete?

				return p;

			}

			return null;


		}

		if (p === RGBA_BPTC_Format) {

			extension = extensions.get('EXT_texture_compression_bptc');

			if (extension !== null) {

				// TODO Complete?

				return p;

			}

			return null;


		}

		if (p === UnsignedInt248Type) {

			if (isWebGL2) {
				return 34042;
			}

			extension = extensions.get('WEBGL_depth_texture');

			if (extension !== null) {

				return extension.UNSIGNED_INT_24_8_WEBGL;

			}

			return null;


		}

	}

	return { convert };

}

class ArrayCamera extends PerspectiveCamera {

	constructor(array = []) {

		super();

		this.cameras = array;

	}

}

ArrayCamera.prototype.isArrayCamera = true;

class Group extends Object3D {

	constructor() {

		super();

		this.type = 'Group';

	}

}

Group.prototype.isGroup = true;

const _moveEvent = { type: 'move' };

class WebXRController {

	constructor() {

		this._targetRay = null;
		this._grip = null;
		this._hand = null;

	}

	getHandSpace() {

		if (this._hand === null) {

			this._hand = new Group();
			this._hand.matrixAutoUpdate = false;
			this._hand.visible = false;

			this._hand.joints = {};
			this._hand.inputState = { pinching: false };

		}

		return this._hand;

	}

	getTargetRaySpace() {

		if (this._targetRay === null) {

			this._targetRay = new Group();
			this._targetRay.matrixAutoUpdate = false;
			this._targetRay.visible = false;
			this._targetRay.hasLinearVelocity = false;
			this._targetRay.linearVelocity = new Vector3();
			this._targetRay.hasAngularVelocity = false;
			this._targetRay.angularVelocity = new Vector3();

		}

		return this._targetRay;

	}

	getGripSpace() {

		if (this._grip === null) {

			this._grip = new Group();
			this._grip.matrixAutoUpdate = false;
			this._grip.visible = false;
			this._grip.hasLinearVelocity = false;
			this._grip.linearVelocity = new Vector3();
			this._grip.hasAngularVelocity = false;
			this._grip.angularVelocity = new Vector3();

		}

		return this._grip;

	}

	dispatchEvent(event) {

		if (this._targetRay !== null) {

			this._targetRay.dispatchEvent(event);

		}

		if (this._grip !== null) {

			this._grip.dispatchEvent(event);

		}

		if (this._hand !== null) {

			this._hand.dispatchEvent(event);

		}

		return this;

	}

	disconnect(inputSource) {

		this.dispatchEvent({
			type: 'disconnected',
			data: inputSource
		});

		if (this._targetRay !== null) {

			this._targetRay.visible = false;

		}

		if (this._grip !== null) {

			this._grip.visible = false;

		}

		if (this._hand !== null) {

			this._hand.visible = false;

		}

		return this;

	}

	update(inputSource, frame, referenceSpace) {

		let inputPose = null;
		let gripPose = null;
		let handPose = null;

		const targetRay = this._targetRay;
		const grip = this._grip;
		const hand = this._hand;

		if (inputSource && frame.session.visibilityState !== 'visible-blurred') {

			if (targetRay !== null) {

				inputPose = frame.getPose(inputSource.targetRaySpace, referenceSpace);

				if (inputPose !== null) {

					targetRay.matrix.fromArray(inputPose.transform.matrix);
					targetRay.matrix.decompose(targetRay.position, targetRay.rotation, targetRay.scale);

					if (inputPose.linearVelocity) {

						targetRay.hasLinearVelocity = true;
						targetRay.linearVelocity.copy(inputPose.linearVelocity);

					} else {

						targetRay.hasLinearVelocity = false;

					}

					if (inputPose.angularVelocity) {

						targetRay.hasAngularVelocity = true;
						targetRay.angularVelocity.copy(inputPose.angularVelocity);

					} else {

						targetRay.hasAngularVelocity = false;

					}

					this.dispatchEvent(_moveEvent);

				}

			}

			if (hand && inputSource.hand) {

				handPose = true;

				for (const inputjoint of inputSource.hand.values()) {

					// Update the joints groups with the XRJoint poses
					const jointPose = frame.getJointPose(inputjoint, referenceSpace);

					if (hand.joints[inputjoint.jointName] === undefined) {

						// The transform of this joint will be updated with the joint pose on each frame
						const joint = new Group();
						joint.matrixAutoUpdate = false;
						joint.visible = false;
						hand.joints[inputjoint.jointName] = joint;
						// ??
						hand.add(joint);

					}

					const joint = hand.joints[inputjoint.jointName];

					if (jointPose !== null) {

						joint.matrix.fromArray(jointPose.transform.matrix);
						joint.matrix.decompose(joint.position, joint.rotation, joint.scale);
						joint.jointRadius = jointPose.radius;

					}

					joint.visible = jointPose !== null;

				}

				// Custom events

				// Check pinchz
				const indexTip = hand.joints['index-finger-tip'];
				const thumbTip = hand.joints['thumb-tip'];
				const distance = indexTip.position.distanceTo(thumbTip.position);

				const distanceToPinch = 0.02;
				const threshold = 0.005;

				if (hand.inputState.pinching && distance > distanceToPinch + threshold) {

					hand.inputState.pinching = false;
					this.dispatchEvent({
						type: 'pinchend',
						handedness: inputSource.handedness,
						target: this
					});

				} else if (!hand.inputState.pinching && distance <= distanceToPinch - threshold) {

					hand.inputState.pinching = true;
					this.dispatchEvent({
						type: 'pinchstart',
						handedness: inputSource.handedness,
						target: this
					});

				}

			} else {

				if (grip !== null && inputSource.gripSpace) {

					gripPose = frame.getPose(inputSource.gripSpace, referenceSpace);

					if (gripPose !== null) {

						grip.matrix.fromArray(gripPose.transform.matrix);
						grip.matrix.decompose(grip.position, grip.rotation, grip.scale);

						if (gripPose.linearVelocity) {

							grip.hasLinearVelocity = true;
							grip.linearVelocity.copy(gripPose.linearVelocity);

						} else {

							grip.hasLinearVelocity = false;

						}

						if (gripPose.angularVelocity) {

							grip.hasAngularVelocity = true;
							grip.angularVelocity.copy(gripPose.angularVelocity);

						} else {

							grip.hasAngularVelocity = false;

						}

					}

				}

			}

		}

		if (targetRay !== null) {

			targetRay.visible = (inputPose !== null);

		}

		if (grip !== null) {

			grip.visible = (gripPose !== null);

		}

		if (hand !== null) {

			hand.visible = (handPose !== null);

		}

		return this;

	}

}

class WebXRManager extends EventDispatcher {
	constructor() {
		super();

		const session = null;

		const referenceSpace = null;

		const glBinding = null;
		const glProjLayer = null;
		const glBaseLayer = null;
		const xrFrame = null;

		const controllers = [];

		const cameraL = new PerspectiveCamera();
		cameraL.layers.enable(1);
		cameraL.viewport = new Vector4();

		const cameraR = new PerspectiveCamera();
		cameraR.layers.enable(2);
		cameraR.viewport = new Vector4();

		const cameraVR = new ArrayCamera();
		cameraVR.layers.enable(1);
		cameraVR.layers.enable(2);

		let _currentDepthNear = null;
		let _currentDepthFar = null;

		//

		this.cameraAutoUpdate = true;
		this.enabled = false;

		this.isPresenting = false;

		this.getController = function (index) {

			let controller = controllers[index];

			if (controller === undefined) {

				controller = new WebXRController();
				controllers[index] = controller;

			}

			return controller.getTargetRaySpace();

		};

		this.getControllerGrip = function (index) {

			let controller = controllers[index];

			if (controller === undefined) {

				controller = new WebXRController();
				controllers[index] = controller;

			}

			return controller.getGripSpace();

		};

		this.getHand = function (index) {

			let controller = controllers[index];

			if (controller === undefined) {

				controller = new WebXRController();
				controllers[index] = controller;

			}

			return controller.getHandSpace();

		};

		this.getReferenceSpace = function () {
			return referenceSpace;
		};

		this.getBaseLayer = function () {
			return glProjLayer !== null ? glProjLayer : glBaseLayer;
		};

		this.getBinding = function () {

			return glBinding;

		};

		this.getFrame = function () {

			return xrFrame;

		};

		const cameraLPos = new Vector3();
		const cameraRPos = new Vector3();

		/**
		 * Assumes 2 cameras that are parallel and share an X-axis, and that
		 * the cameras' projection and world matrices have already been set.
		 * And that near and far planes are identical for both cameras.
		 * Visualization of this technique: https://computergraphics.stackexchange.com/a/4765
		 */
		function setProjectionFromUnion(camera, cameraL, cameraR) {

			cameraLPos.setFromMatrixPosition(cameraL.matrixWorld);
			cameraRPos.setFromMatrixPosition(cameraR.matrixWorld);

			const ipd = cameraLPos.distanceTo(cameraRPos);

			const projL = cameraL.projectionMatrix.elements;
			const projR = cameraR.projectionMatrix.elements;

			// VR systems will have identical far and near planes, and
			// most likely identical top and bottom frustum extents.
			// Use the left camera for these values.
			const near = projL[14] / (projL[10] - 1);
			const far = projL[14] / (projL[10] + 1);
			const topFov = (projL[9] + 1) / projL[5];
			const bottomFov = (projL[9] - 1) / projL[5];

			const leftFov = (projL[8] - 1) / projL[0];
			const rightFov = (projR[8] + 1) / projR[0];
			const left = near * leftFov;
			const right = near * rightFov;

			// Calculate the new camera's position offset from the
			// left camera. xOffset should be roughly half `ipd`.
			const zOffset = ipd / (-leftFov + rightFov);
			const xOffset = zOffset * -leftFov;

			// TODO: Better way to apply this offset?
			cameraL.matrixWorld.decompose(camera.position, camera.quaternion, camera.scale);
			camera.translateX(xOffset);
			camera.translateZ(zOffset);
			camera.matrixWorld.compose(camera.position, camera.quaternion, camera.scale);
			camera.matrixWorldInverse.copy(camera.matrixWorld).invert();

			// Find the union of the frustum values of the cameras and scale
			// the values so that the near plane's position does not change in world space,
			// although must now be relative to the new union camera.
			const near2 = near + zOffset;
			const far2 = far + zOffset;
			const left2 = left - xOffset;
			const right2 = right + (ipd - xOffset);
			const top2 = topFov * far / far2 * near2;
			const bottom2 = bottomFov * far / far2 * near2;

			camera.projectionMatrix.makePerspective(left2, right2, top2, bottom2, near2, far2);

		}

		function updateCamera(camera, parent) {

			if (parent === null) {

				camera.matrixWorld.copy(camera.matrix);

			} else {

				camera.matrixWorld.multiplyMatrices(parent.matrixWorld, camera.matrix);

			}

			camera.matrixWorldInverse.copy(camera.matrixWorld).invert();

		}

		this.updateCamera = function (camera) {

			if (session === null) {
				return;
			}

			cameraVR.near = cameraR.near = cameraL.near = camera.near;
			cameraVR.far = cameraR.far = cameraL.far = camera.far;

			if (_currentDepthNear !== cameraVR.near || _currentDepthFar !== cameraVR.far) {

				// Note that the new renderState won't apply until the next frame. See #18320

				session.updateRenderState({
					depthNear: cameraVR.near,
					depthFar: cameraVR.far
				});

				_currentDepthNear = cameraVR.near;
				_currentDepthFar = cameraVR.far;

			}

			const parent = camera.parent;
			const cameras = cameraVR.cameras;

			updateCamera(cameraVR, parent);

			for (let i = 0; i < cameras.length; i++) {

				updateCamera(cameras[i], parent);

			}

			cameraVR.matrixWorld.decompose(cameraVR.position, cameraVR.quaternion, cameraVR.scale);

			// update user camera and its children

			camera.position.copy(cameraVR.position);
			camera.quaternion.copy(cameraVR.quaternion);
			camera.scale.copy(cameraVR.scale);
			camera.matrix.copy(cameraVR.matrix);
			camera.matrixWorld.copy(cameraVR.matrixWorld);

			const children = camera.children;

			for (let i = 0, l = children.length; i < l; i++) {

				children[i].updateMatrixWorld(true);

			}

			// update projection matrix for proper view frustum culling

			if (cameras.length === 2) {

				setProjectionFromUnion(cameraVR, cameraL, cameraR);

			} else {

				// assume single camera setup (AR)

				cameraVR.projectionMatrix.copy(cameraL.projectionMatrix);

			}

		};

		this.getCamera = function () {

			return cameraVR;

		};

		this.getFoveation = function () {

			if (glProjLayer !== null) {

				return glProjLayer.fixedFoveation;

			}

			if (glBaseLayer !== null) {

				return glBaseLayer.fixedFoveation;

			}

			return undefined;

		};

		this.setFoveation = function (foveation) {

			// 0 = no foveation = full resolution
			// 1 = maximum foveation = the edges render at lower resolution

			if (glProjLayer !== null) {

				glProjLayer.fixedFoveation = foveation;

			}

			if (glBaseLayer !== null && glBaseLayer.fixedFoveation !== undefined) {

				glBaseLayer.fixedFoveation = foveation;

			}

		};

		this.dispose = function () { };
	}
}

function WebGLMaterials(properties) {
	function refreshMaterialUniforms(uniforms, material, pixelRatio, height, transmissionRenderTarget) {

		if (material.isMeshStandardMaterial) {

			refreshUniformsCommon(uniforms, material);

			if (material.isMeshPhysicalMaterial) {

				refreshUniformsPhysical(uniforms, material, transmissionRenderTarget);

			} else {

				refreshUniformsStandard(uniforms, material);

			}

		} else if (material.isLineBasicMaterial) {

			refreshUniformsLine(uniforms, material);

		} else if (material.isShaderMaterial) {

			material.uniformsNeedUpdate = false; // #15581

		}

	}

	function refreshUniformsCommon(uniforms, material) {

		uniforms.opacity.value = material.opacity;

		if (material.color) {

			uniforms.diffuse.value.copy(material.color);

		}

		if (material.emissive) {

			uniforms.emissive.value.copy(material.emissive).multiplyScalar(material.emissiveIntensity);

		}

		if (material.map) {

			uniforms.map.value = material.map;

		}

		if (material.alphaMap) {

			uniforms.alphaMap.value = material.alphaMap;

		}

		if (material.specularMap) {

			uniforms.specularMap.value = material.specularMap;

		}

		if (material.alphaTest > 0) {

			uniforms.alphaTest.value = material.alphaTest;

		}

		const envMap = properties.get(material).envMap;

		if (envMap) {

			uniforms.envMap.value = envMap;

			uniforms.flipEnvMap.value = 1;

			uniforms.reflectivity.value = material.reflectivity;
			uniforms.ior.value = material.ior;
			uniforms.refractionRatio.value = material.refractionRatio;

			const maxMipLevel = properties.get(envMap).__maxMipLevel;

			if (maxMipLevel !== undefined) {

				uniforms.maxMipLevel.value = maxMipLevel;

			}

		}

		if (material.lightMap) {

			uniforms.lightMap.value = material.lightMap;
			uniforms.lightMapIntensity.value = material.lightMapIntensity;

		}

		if (material.aoMap) {

			uniforms.aoMap.value = material.aoMap;
			uniforms.aoMapIntensity.value = material.aoMapIntensity;

		}

		// uv repeat and offset setting priorities
		// 1. color map
		// 2. specular map
		// 3. displacementMap map
		// 4. normal map
		// 5. bump map
		// 6. roughnessMap map
		// 7. metalnessMap map
		// 8. alphaMap map
		// 9. emissiveMap map
		// 10. clearcoat map
		// 11. clearcoat normal map
		// 12. clearcoat roughnessMap map
		// 13. specular intensity map
		// 14. specular tint map
		// 15. transmission map
		// 16. thickness map

		let uvScaleMap;

		if (material.map) {

			uvScaleMap = material.map;

		} else if (material.specularMap) {

			uvScaleMap = material.specularMap;

		} else if (material.displacementMap) {

			uvScaleMap = material.displacementMap;

		} else if (material.normalMap) {

			uvScaleMap = material.normalMap;

		} else if (material.bumpMap) {

			uvScaleMap = material.bumpMap;

		} else if (material.roughnessMap) {

			uvScaleMap = material.roughnessMap;

		} else if (material.metalnessMap) {

			uvScaleMap = material.metalnessMap;

		} else if (material.alphaMap) {

			uvScaleMap = material.alphaMap;

		} else if (material.emissiveMap) {

			uvScaleMap = material.emissiveMap;

		} else if (material.clearcoatMap) {

			uvScaleMap = material.clearcoatMap;

		} else if (material.clearcoatNormalMap) {

			uvScaleMap = material.clearcoatNormalMap;

		} else if (material.clearcoatRoughnessMap) {

			uvScaleMap = material.clearcoatRoughnessMap;

		} else if (material.specularIntensityMap) {

			uvScaleMap = material.specularIntensityMap;

		} else if (material.specularTintMap) {

			uvScaleMap = material.specularTintMap;

		} else if (material.transmissionMap) {

			uvScaleMap = material.transmissionMap;

		} else if (material.thicknessMap) {

			uvScaleMap = material.thicknessMap;

		}

		if (uvScaleMap !== undefined) {

			// backwards compatibility
			if (uvScaleMap.isWebGLRenderTarget) {

				uvScaleMap = uvScaleMap.texture;

			}

			if (uvScaleMap.matrixAutoUpdate === true) {

				uvScaleMap.updateMatrix();

			}

			uniforms.uvTransform.value.copy(uvScaleMap.matrix);

		}

		// uv repeat and offset setting priorities for uv2
		// 1. ao map
		// 2. light map

		let uv2ScaleMap;

		if (material.aoMap) {

			uv2ScaleMap = material.aoMap;

		} else if (material.lightMap) {

			uv2ScaleMap = material.lightMap;

		}

		if (uv2ScaleMap !== undefined) {

			// backwards compatibility
			if (uv2ScaleMap.isWebGLRenderTarget) {

				uv2ScaleMap = uv2ScaleMap.texture;

			}

			if (uv2ScaleMap.matrixAutoUpdate === true) {

				uv2ScaleMap.updateMatrix();

			}

			uniforms.uv2Transform.value.copy(uv2ScaleMap.matrix);

		}

	}

	function refreshUniformsLine(uniforms, material) {

		uniforms.diffuse.value.copy(material.color);
		uniforms.opacity.value = material.opacity;

	}

	function refreshUniformsStandard(uniforms, material) {

		uniforms.roughness.value = material.roughness;
		uniforms.metalness.value = material.metalness;

		if (material.roughnessMap) {

			uniforms.roughnessMap.value = material.roughnessMap;

		}

		if (material.metalnessMap) {

			uniforms.metalnessMap.value = material.metalnessMap;

		}

		if (material.emissiveMap) {

			uniforms.emissiveMap.value = material.emissiveMap;

		}

		if (material.bumpMap) {

			uniforms.bumpMap.value = material.bumpMap;
			uniforms.bumpScale.value = material.bumpScale;
			if (material.side === BackSide) {
				uniforms.bumpScale.value *= -1;
			}

		}

		if (material.normalMap) {

			uniforms.normalMap.value = material.normalMap;
			uniforms.normalScale.value.copy(material.normalScale);
			if (material.side === BackSide) {
				uniforms.normalScale.value.negate();
			}

		}

		if (material.displacementMap) {

			uniforms.displacementMap.value = material.displacementMap;
			uniforms.displacementScale.value = material.displacementScale;
			uniforms.displacementBias.value = material.displacementBias;

		}

		const envMap = properties.get(material).envMap;

		if (envMap) {

			// uniforms.envMap.value = material.envMap; // part of uniforms common
			uniforms.envMapIntensity.value = material.envMapIntensity;

		}

	}

	function refreshUniformsPhysical(uniforms, material, transmissionRenderTarget) {

		refreshUniformsStandard(uniforms, material);

		uniforms.ior.value = material.ior; // also part of uniforms common

		if (material.sheenTint) {
			uniforms.sheenTint.value.copy(material.sheenTint);
		}

		if (material.clearcoat > 0) {

			uniforms.clearcoat.value = material.clearcoat;
			uniforms.clearcoatRoughness.value = material.clearcoatRoughness;

			if (material.clearcoatMap) {

				uniforms.clearcoatMap.value = material.clearcoatMap;

			}

			if (material.clearcoatRoughnessMap) {

				uniforms.clearcoatRoughnessMap.value = material.clearcoatRoughnessMap;

			}

			if (material.clearcoatNormalMap) {

				uniforms.clearcoatNormalScale.value.copy(material.clearcoatNormalScale);
				uniforms.clearcoatNormalMap.value = material.clearcoatNormalMap;

				if (material.side === BackSide) {

					uniforms.clearcoatNormalScale.value.negate();

				}

			}

		}

		if (material.transmission > 0) {

			uniforms.transmission.value = material.transmission;
			uniforms.transmissionSamplerMap.value = transmissionRenderTarget.texture;
			uniforms.transmissionSamplerSize.value.set(transmissionRenderTarget.width, transmissionRenderTarget.height);

			if (material.transmissionMap) {

				uniforms.transmissionMap.value = material.transmissionMap;

			}

			uniforms.thickness.value = material.thickness;

			if (material.thicknessMap) {

				uniforms.thicknessMap.value = material.thicknessMap;

			}

			uniforms.attenuationDistance.value = material.attenuationDistance;
			uniforms.attenuationTint.value.copy(material.attenuationTint);

		}

		uniforms.specularIntensity.value = material.specularIntensity;
		uniforms.specularTint.value.copy(material.specularTint);

		if (material.specularIntensityMap) {

			uniforms.specularIntensityMap.value = material.specularIntensityMap;

		}

		if (material.specularTintMap) {

			uniforms.specularTintMap.value = material.specularTintMap;

		}

	}

	return { refreshMaterialUniforms };
}

function createCanvasElement() {

	const canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
	canvas.style.display = 'block';
	return canvas;

}

function WebGLRenderer(parameters = {}) {

	const _canvas = parameters.canvas !== undefined ? parameters.canvas : createCanvasElement(),
		_context = parameters.context !== undefined ? parameters.context : null,

		_alpha = parameters.alpha !== undefined ? parameters.alpha : false,
		_depth = parameters.depth !== undefined ? parameters.depth : true,
		_stencil = parameters.stencil !== undefined ? parameters.stencil : true,
		_antialias = parameters.antialias !== undefined ? parameters.antialias : false,
		_premultipliedAlpha = parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha : true,
		_preserveDrawingBuffer = parameters.preserveDrawingBuffer !== undefined ? parameters.preserveDrawingBuffer : false,
		_powerPreference = parameters.powerPreference !== undefined ? parameters.powerPreference : 'default',
		_failIfMajorPerformanceCaveat = parameters.failIfMajorPerformanceCaveat !== undefined ? parameters.failIfMajorPerformanceCaveat : false;

	let currentRenderList = null;
	let currentRenderState = null;

	// render() can be called from within a callback triggered by another render.
	// We track this so that the nested render call gets its list and state isolated from the parent render call.

	const renderListStack = [];
	const renderStateStack = [];

	// public properties

	this.domElement = _canvas;

	// Debug configuration container
	this.debug = {

		/**
		 * Enables error checking and reporting when shader programs are being compiled
		 * @type {boolean}
		 */
		checkShaderErrors: true
	};

	// clearing

	this.autoClear = true;
	this.autoClearColor = true;
	this.autoClearDepth = true;
	this.autoClearStencil = true;

	// scene graph

	this.sortObjects = true;

	// user-defined clipping

	this.clippingPlanes = [];
	this.localClippingEnabled = false;

	// physically based shading

	this.gammaFactor = 2.0;	// for backwards compatibility
	this.outputEncoding = LinearEncoding;

	// physical lights

	this.physicallyCorrectLights = false;

	// tone mapping

	this.toneMapping = NoToneMapping;
	this.toneMappingExposure = 1.0;

	// internal properties

	const _this = this;

	const _isContextLost = false;

	// internal state cache

	let _currentActiveCubeFace = 0;
	let _currentActiveMipmapLevel = 0;
	let _currentRenderTarget = null;
	let _currentMaterialId = -1;

	let _currentCamera = null;

	const _currentViewport = new Vector4();
	const _currentScissor = new Vector4();
	let _currentScissorTest = null;

	//

	let _width = _canvas.width;
	let _height = _canvas.height;

	let _pixelRatio = 1;
	let _opaqueSort = null;
	let _transparentSort = null;

	const _viewport = new Vector4(0, 0, _width, _height);
	const _scissor = new Vector4(0, 0, _width, _height);
	let _scissorTest = false;

	//

	const _currentDrawBuffers = [];

	// frustum

	const _frustum = new Frustum();

	// clipping

	let _clippingEnabled = false;
	let _localClippingEnabled = false;

	// transmission

	let _transmissionRenderTarget = null;

	// camera matrices cache

	const _projScreenMatrix = new Matrix4();

	const _vector3 = new Vector3();

	const _emptyScene = {
		background: null,
		fog: null,
		environment: null,
		overrideMaterial: null,
		isScene: true
	};

	function getTargetPixelRatio() {

		return _currentRenderTarget === null ? _pixelRatio : 1;

	}

	// initialize

	let _gl = _context;

	function getContext(contextNames, contextAttributes) {

		for (let i = 0; i < contextNames.length; i++) {

			const contextName = contextNames[i];
			const context = _canvas.getContext(contextName, contextAttributes);
			if (context !== null) {
				return context;
			}

		}

		return null;

	}

	const contextAttributes = {
		alpha: _alpha,
		depth: _depth,
		stencil: _stencil,
		antialias: _antialias,
		premultipliedAlpha: _premultipliedAlpha,
		preserveDrawingBuffer: _preserveDrawingBuffer,
		powerPreference: _powerPreference,
		failIfMajorPerformanceCaveat: _failIfMajorPerformanceCaveat
	};

	if (_gl === null) {

		const contextNames = ['webgl2', 'webgl', 'experimental-webgl'];

		if (_this.isWebGL1Renderer === true) {

			contextNames.shift();

		}

		_gl = getContext(contextNames, contextAttributes);

		if (_gl === null) {

			if (getContext(contextNames)) {

				throw new Error('Error creating WebGL context with your selected attributes.');

			} else {

				throw new Error('Error creating WebGL context.');

			}

		}

	}

	// Some experimental-webgl implementations do not have getShaderPrecisionFormat

	if (_gl.getShaderPrecisionFormat === undefined) {

		_gl.getShaderPrecisionFormat = function () {

			return {
				'rangeMin': 1,
				'rangeMax': 1,
				'precision': 1
			};

		};

	}

	let extensions, capabilities, state, info;
	let properties, textures, cubemaps, cubeuvmaps, attributes, geometries, objects;
	let programCache, materials, renderLists, renderStates, clipping, shadowMap;

	let background, morphtargets, bufferRenderer, indexedBufferRenderer;

	let utils, bindingStates;

	function initGLContext() {

		extensions = new WebGLExtensions(_gl);

		capabilities = new WebGLCapabilities(_gl, extensions, parameters);

		extensions.init(capabilities);

		utils = new WebGLUtils(_gl, extensions, capabilities);

		state = new WebGLState(_gl, extensions, capabilities);

		_currentDrawBuffers[0] = 1029;

		info = new WebGLInfo(_gl);
		properties = new WebGLProperties();
		textures = new WebGLTextures(_gl, extensions, state, properties, capabilities, utils, info);
		cubemaps = new WebGLCubeMaps(_this);
		cubeuvmaps = new WebGLCubeUVMaps(_this);
		attributes = new WebGLAttributes(_gl, capabilities);
		bindingStates = new WebGLBindingStates(_gl, extensions, attributes, capabilities);
		geometries = new WebGLGeometries(_gl, attributes, info, bindingStates);
		objects = new WebGLObjects(_gl, geometries, attributes, info);
		morphtargets = new WebGLMorphtargets(_gl);
		clipping = new WebGLClipping(properties);
		programCache = new WebGLPrograms(_this, cubemaps, cubeuvmaps, extensions, capabilities, bindingStates, clipping);
		materials = new WebGLMaterials(properties);
		renderLists = new WebGLRenderLists(properties);
		renderStates = new WebGLRenderStates(extensions, capabilities);
		background = new WebGLBackground(_this, cubemaps, state, objects, _premultipliedAlpha);
		shadowMap = new WebGLShadowMap(_this, objects, capabilities);

		bufferRenderer = new WebGLBufferRenderer(_gl, extensions, info, capabilities);
		indexedBufferRenderer = new WebGLIndexedBufferRenderer(_gl, extensions, info, capabilities);

		info.programs = programCache.programs;

		_this.capabilities = capabilities;
		_this.extensions = extensions;
		_this.properties = properties;
		_this.renderLists = renderLists;
		_this.shadowMap = shadowMap;
		_this.state = state;
		_this.info = info;

	}

	initGLContext();

	// xr

	const xr = new WebXRManager(_this, _gl);

	this.xr = xr;

	// API

	this.getContext = function () {

		return _gl;

	};

	this.getContextAttributes = function () {

		return _gl.getContextAttributes();

	};

	this.forceContextLoss = function () {

		const extension = extensions.get('WEBGL_lose_context');
		if (extension) {
			extension.loseContext();
		}

	};

	this.forceContextRestore = function () {

		const extension = extensions.get('WEBGL_lose_context');
		if (extension) {
			extension.restoreContext();
		}

	};

	this.getPixelRatio = function () {

		return _pixelRatio;

	};

	this.setPixelRatio = function (value) {

		if (value === undefined) {
			return;
		}

		_pixelRatio = value;

		this.setSize(_width, _height, false);

	};

	this.getSize = function (target) {

		return target.set(_width, _height);

	};

	this.setSize = function (width, height, updateStyle) {

		if (xr.isPresenting) {

			console.warn('THREE.WebGLRenderer: Can\'t change size while VR device is presenting.');
			return;

		}

		_width = width;
		_height = height;

		_canvas.width = Math.floor(width * _pixelRatio);
		_canvas.height = Math.floor(height * _pixelRatio);

		if (updateStyle !== false) {

			_canvas.style.width = width + 'px';
			_canvas.style.height = height + 'px';

		}

		this.setViewport(0, 0, width, height);

	};

	this.getDrawingBufferSize = function (target) {

		return target.set(_width * _pixelRatio, _height * _pixelRatio).floor();

	};

	this.setDrawingBufferSize = function (width, height, pixelRatio) {

		_width = width;
		_height = height;

		_pixelRatio = pixelRatio;

		_canvas.width = Math.floor(width * pixelRatio);
		_canvas.height = Math.floor(height * pixelRatio);

		this.setViewport(0, 0, width, height);

	};

	this.getCurrentViewport = function (target) {

		return target.copy(_currentViewport);

	};

	this.getViewport = function (target) {

		return target.copy(_viewport);

	};

	this.setViewport = function (x, y, width, height) {

		if (x.isVector4) {

			_viewport.set(x.x, x.y, x.z, x.w);

		} else {

			_viewport.set(x, y, width, height);

		}

		state.viewport(_currentViewport.copy(_viewport).multiplyScalar(_pixelRatio).floor());

	};

	this.getScissor = function (target) {

		return target.copy(_scissor);

	};

	this.setScissor = function (x, y, width, height) {

		if (x.isVector4) {

			_scissor.set(x.x, x.y, x.z, x.w);

		} else {

			_scissor.set(x, y, width, height);

		}

		state.scissor(_currentScissor.copy(_scissor).multiplyScalar(_pixelRatio).floor());

	};

	this.getScissorTest = function () {

		return _scissorTest;

	};

	this.setScissorTest = function (boolean) {

		state.setScissorTest(_scissorTest = boolean);

	};

	this.setOpaqueSort = function (method) {

		_opaqueSort = method;

	};

	this.setTransparentSort = function (method) {

		_transparentSort = method;

	};

	// Clearing

	this.getClearColor = function (target) {

		return target.copy(background.getClearColor());

	};

	this.setClearColor = function () {

		background.setClearColor.apply(background, arguments);

	};

	this.getClearAlpha = function () {

		return background.getClearAlpha();

	};

	this.setClearAlpha = function () {

		background.setClearAlpha.apply(background, arguments);

	};

	this.clear = function (color, depth, stencil) {

		let bits = 0;

		if (color === undefined || color) {
			bits |= 16384;
		}
		if (depth === undefined || depth) {
			bits |= 256;
		}
		if (stencil === undefined || stencil) {
			bits |= 1024;
		}

		_gl.clear(bits);

	};

	this.clearColor = function () {

		this.clear(true, false, false);

	};

	this.clearDepth = function () {

		this.clear(false, true, false);

	};

	this.clearStencil = function () {

		this.clear(false, false, true);

	};

	//

	this.dispose = function () {
		renderLists.dispose();
		renderStates.dispose();
		properties.dispose();
		cubemaps.dispose();
		cubeuvmaps.dispose();
		objects.dispose();
		bindingStates.dispose();

		xr.dispose();

		if (_transmissionRenderTarget) {
			_transmissionRenderTarget.dispose();
			_transmissionRenderTarget = null;
		}
	};

	// Events

	function onMaterialDispose(event) {

		const material = event.target;

		material.removeEventListener('dispose', onMaterialDispose);

		deallocateMaterial(material);

	}

	// Buffer deallocation

	function deallocateMaterial(material) {

		releaseMaterialProgramReferences(material);

		properties.remove(material);

	}


	function releaseMaterialProgramReferences(material) {

		const programs = properties.get(material).programs;

		if (programs !== undefined) {

			programs.forEach((program) => {

				programCache.releaseProgram(program);

			});

		}

	}

	// Buffer rendering

	function renderObjectImmediate(object, program) {

		object.render((object) => {

			_this.renderBufferImmediate(object, program);

		});

	}

	this.renderBufferImmediate = function (object, program) {

		bindingStates.initAttributes();

		const buffers = properties.get(object);

		if (object.hasPositions && !buffers.position) {
			buffers.position = _gl.createBuffer();
		}
		if (object.hasNormals && !buffers.normal) {
			buffers.normal = _gl.createBuffer();
		}
		if (object.hasUvs && !buffers.uv) {
			buffers.uv = _gl.createBuffer();
		}
		if (object.hasColors && !buffers.color) {
			buffers.color = _gl.createBuffer();
		}

		const programAttributes = program.getAttributes();

		if (object.hasPositions) {

			_gl.bindBuffer(34962, buffers.position);
			_gl.bufferData(34962, object.positionArray, 35048);

			bindingStates.enableAttribute(programAttributes.position.location);
			_gl.vertexAttribPointer(programAttributes.position.location, 3, 5126, false, 0, 0);

		}

		if (object.hasNormals) {

			_gl.bindBuffer(34962, buffers.normal);
			_gl.bufferData(34962, object.normalArray, 35048);

			bindingStates.enableAttribute(programAttributes.normal.location);
			_gl.vertexAttribPointer(programAttributes.normal.location, 3, 5126, false, 0, 0);

		}

		if (object.hasUvs) {

			_gl.bindBuffer(34962, buffers.uv);
			_gl.bufferData(34962, object.uvArray, 35048);

			bindingStates.enableAttribute(programAttributes.uv.location);
			_gl.vertexAttribPointer(programAttributes.uv.location, 2, 5126, false, 0, 0);

		}

		if (object.hasColors) {

			_gl.bindBuffer(34962, buffers.color);
			_gl.bufferData(34962, object.colorArray, 35048);

			bindingStates.enableAttribute(programAttributes.color.location);
			_gl.vertexAttribPointer(programAttributes.color.location, 3, 5126, false, 0, 0);

		}

		bindingStates.disableUnusedAttributes();

		_gl.drawArrays(4, 0, object.count);

		object.count = 0;

	};

	this.renderBufferDirect = function (camera, scene, geometry, material, object, group) {

		if (scene === null) {
			scene = _emptyScene;
		} // renderBufferDirect second parameter used to be fog (could be null)

		const frontFaceCW = (object.isMesh && object.matrixWorld.determinant() < 0);

		const program = setProgram(camera, scene, material, object);

		state.setMaterial(material, frontFaceCW);

		//

		const index = geometry.index;
		const position = geometry.attributes.position;

		//

		if (index === null) {

			if (position === undefined || position.count === 0) {
				return;
			}

		} else if (index.count === 0) {
			return;
		}

		const rangeFactor = 1;

		if (geometry.morphAttributes.position !== undefined || geometry.morphAttributes.normal !== undefined) {

			morphtargets.update(object, geometry, material, program);

		}

		bindingStates.setup(object, material, program, geometry, index);

		let attribute;
		let renderer = bufferRenderer;

		if (index !== null) {

			attribute = attributes.get(index);

			renderer = indexedBufferRenderer;
			renderer.setIndex(attribute);

		}

		//

		const dataCount = (index !== null) ? index.count : position.count;

		const rangeStart = geometry.drawRange.start * rangeFactor;
		const rangeCount = geometry.drawRange.count * rangeFactor;

		const groupStart = group !== null ? group.start * rangeFactor : 0;
		const groupCount = group !== null ? group.count * rangeFactor : Infinity;

		const drawStart = Math.max(rangeStart, groupStart);
		const drawEnd = Math.min(dataCount, rangeStart + rangeCount, groupStart + groupCount) - 1;

		const drawCount = Math.max(0, drawEnd - drawStart + 1);

		if (drawCount === 0) {
			return;
		}

		//

		if (object.isMesh) {
			renderer.setMode(4);
		} else if (object.isLine) {
			let lineWidth = material.linewidth;

			if (lineWidth === undefined) {
				lineWidth = 1;
			} // Not using Line*Material

			state.setLineWidth(lineWidth * getTargetPixelRatio());

			if (object.isLineSegments) {
				renderer.setMode(1);
			} else {
				renderer.setMode(3);
			}
		} else if (object.isPoints) {
			renderer.setMode(0);
		}

		if (geometry.isInstancedBufferGeometry) {

			const instanceCount = Math.min(geometry.instanceCount, geometry._maxInstanceCount);

			renderer.renderInstances(drawStart, drawCount, instanceCount);

		} else {

			renderer.render(drawStart, drawCount);

		}

	};

	// Compile

	this.compile = function (scene, camera) {

		currentRenderState = renderStates.get(scene);
		currentRenderState.init();

		renderStateStack.push(currentRenderState);

		scene.traverseVisible((object) => {

			if (object.isLight && object.layers.test(camera.layers)) {

				currentRenderState.pushLight(object);

				if (object.castShadow) {

					currentRenderState.pushShadow(object);

				}

			}

		});

		currentRenderState.setupLights(_this.physicallyCorrectLights);

		scene.traverse((object) => {

			const material = object.material;

			if (material) {

				if (Array.isArray(material)) {

					for (let i = 0; i < material.length; i++) {

						const material2 = material[i];

						getProgram(material2, scene, object);

					}

				} else {

					getProgram(material, scene, object);

				}

			}

		});

		renderStateStack.pop();
		currentRenderState = null;

	};

	// Rendering

	this.render = function (scene, camera) {
		if (_isContextLost === true) {
			return;
		}

		// update scene graph

		if (scene.autoUpdate === true) {
			scene.updateMatrixWorld();
		}

		// update camera matrices and frustum

		if (camera.parent === null) {
			camera.updateMatrixWorld();
		}

		if (xr.enabled === true && xr.isPresenting === true) {

			if (xr.cameraAutoUpdate === true) {
				xr.updateCamera(camera);
			}

			camera = xr.getCamera(); // use XR camera for rendering

		}

		//
		if (scene.isScene === true) {
			scene.onBeforeRender(_this, scene, camera, _currentRenderTarget);
		}

		currentRenderState = renderStates.get(scene, renderStateStack.length);
		currentRenderState.init();

		renderStateStack.push(currentRenderState);

		_projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
		_frustum.setFromProjectionMatrix(_projScreenMatrix);

		_localClippingEnabled = this.localClippingEnabled;
		_clippingEnabled = clipping.init(this.clippingPlanes, _localClippingEnabled, camera);

		currentRenderList = renderLists.get(scene, renderListStack.length);
		currentRenderList.init();

		renderListStack.push(currentRenderList);

		projectObject(scene, camera, 0, _this.sortObjects);

		currentRenderList.finish();

		if (_this.sortObjects === true) {

			currentRenderList.sort(_opaqueSort, _transparentSort);

		}

		//

		if (_clippingEnabled === true) {
			clipping.beginShadows();
		}

		const shadowsArray = currentRenderState.state.shadowsArray;

		shadowMap.render(shadowsArray, scene, camera);

		if (_clippingEnabled === true) {
			clipping.endShadows();
		}

		//

		if (this.info.autoReset === true) {
			this.info.reset();
		}

		//

		background.render(currentRenderList, scene);

		// render scene

		currentRenderState.setupLights(_this.physicallyCorrectLights);

		if (camera.isArrayCamera) {

			const cameras = camera.cameras;

			for (let i = 0, l = cameras.length; i < l; i++) {

				const camera2 = cameras[i];

				renderScene(currentRenderList, scene, camera2, camera2.viewport);

			}

		} else {

			renderScene(currentRenderList, scene, camera);

		}

		if (scene.isScene === true) {
			scene.onAfterRender(_this, scene, camera);
		}

		// Ensure depth buffer writing is enabled so it can be cleared on next render

		state.buffers.depth.setTest(true);
		state.buffers.depth.setMask(true);
		state.buffers.color.setMask(true);

		state.setPolygonOffset(false);

		// _gl.finish();

		bindingStates.resetDefaultState();
		_currentMaterialId = -1;
		_currentCamera = null;

		renderStateStack.pop();

		if (renderStateStack.length > 0) {

			currentRenderState = renderStateStack[renderStateStack.length - 1];

		} else {

			currentRenderState = null;

		}

		renderListStack.pop();

		if (renderListStack.length > 0) {

			currentRenderList = renderListStack[renderListStack.length - 1];

		} else {

			currentRenderList = null;

		}

	};

	function projectObject(object, camera, groupOrder, sortObjects) {

		if (object.visible === false) {
			return;
		}

		const visible = object.layers.test(camera.layers);

		if (visible) {

			if (object.isGroup) {

				groupOrder = object.renderOrder;

			} else if (object.isLOD) {

				if (object.autoUpdate === true) {
					object.update(camera);
				}

			} else if (object.isLight) {

				currentRenderState.pushLight(object);

				if (object.castShadow) {

					currentRenderState.pushShadow(object);

				}

			} else if (object.isSprite) {

				if (!object.frustumCulled || _frustum.intersectsSprite(object)) {

					if (sortObjects) {

						_vector3.setFromMatrixPosition(object.matrixWorld)
							.applyMatrix4(_projScreenMatrix);

					}

					const geometry = objects.update(object);
					const material = object.material;

					if (material.visible) {

						currentRenderList.push(object, geometry, material, groupOrder, _vector3.z, null);

					}

				}

			} else if (object.isImmediateRenderObject) {

				if (sortObjects) {

					_vector3.setFromMatrixPosition(object.matrixWorld)
						.applyMatrix4(_projScreenMatrix);

				}

				currentRenderList.push(object, null, object.material, groupOrder, _vector3.z, null);

			} else if (object.isMesh || object.isLine || object.isPoints) {

				if (!object.frustumCulled || _frustum.intersectsObject(object)) {

					if (sortObjects) {

						_vector3.setFromMatrixPosition(object.matrixWorld)
							.applyMatrix4(_projScreenMatrix);

					}

					const geometry = objects.update(object);
					const material = object.material;

					if (Array.isArray(material)) {

						const groups = geometry.groups;

						for (let i = 0, l = groups.length; i < l; i++) {

							const group = groups[i];
							const groupMaterial = material[group.materialIndex];

							if (groupMaterial && groupMaterial.visible) {

								currentRenderList.push(object, geometry, groupMaterial, groupOrder, _vector3.z, group);

							}

						}

					} else if (material.visible) {

						currentRenderList.push(object, geometry, material, groupOrder, _vector3.z, null);

					}

				}

			}

		}

		const children = object.children;

		for (let i = 0, l = children.length; i < l; i++) {

			projectObject(children[i], camera, groupOrder, sortObjects);

		}

	}

	function renderScene(currentRenderList, scene, camera, viewport) {

		const opaqueObjects = currentRenderList.opaque;
		const transmissiveObjects = currentRenderList.transmissive;
		const transparentObjects = currentRenderList.transparent;

		currentRenderState.setupLightsView(camera);

		if (viewport) {
			state.viewport(_currentViewport.copy(viewport));
		}

		if (opaqueObjects.length > 0) {
			renderObjects(opaqueObjects, scene, camera);
		}
		if (transmissiveObjects.length > 0) {
			renderObjects(transmissiveObjects, scene, camera);
		}
		if (transparentObjects.length > 0) {
			renderObjects(transparentObjects, scene, camera);
		}

	}

	function renderObjects(renderList, scene, camera) {

		const overrideMaterial = scene.isScene === true ? scene.overrideMaterial : null;

		for (let i = 0, l = renderList.length; i < l; i++) {

			const renderItem = renderList[i];

			const object = renderItem.object;
			const geometry = renderItem.geometry;
			const material = overrideMaterial === null ? renderItem.material : overrideMaterial;
			const group = renderItem.group;

			if (object.layers.test(camera.layers)) {

				renderObject(object, scene, camera, geometry, material, group);

			}

		}

	}

	function renderObject(object, scene, camera, geometry, material, group) {

		object.onBeforeRender(_this, scene, camera, geometry, material, group);

		object.modelViewMatrix.multiplyMatrices(camera.matrixWorldInverse, object.matrixWorld);
		object.normalMatrix.getNormalMatrix(object.modelViewMatrix);

		if (object.isImmediateRenderObject) {

			const program = setProgram(camera, scene, material, object);

			state.setMaterial(material);

			bindingStates.reset();

			renderObjectImmediate(object, program);

		} else {

			if (material.transparent === true && material.side === DoubleSide) {

				material.side = BackSide;
				material.needsUpdate = true;
				_this.renderBufferDirect(camera, scene, geometry, material, object, group);

				material.side = FrontSide;
				material.needsUpdate = true;
				_this.renderBufferDirect(camera, scene, geometry, material, object, group);

				material.side = DoubleSide;

			} else {

				_this.renderBufferDirect(camera, scene, geometry, material, object, group);

			}

		}

		object.onAfterRender(_this, scene, camera, geometry, material, group);

	}

	function getProgram(material, scene, object) {

		if (scene.isScene !== true) {
			scene = _emptyScene;
		} // scene could be a Mesh, Line, Points, ...

		const materialProperties = properties.get(material);

		const lights = currentRenderState.state.lights;
		const shadowsArray = currentRenderState.state.shadowsArray;

		const lightsStateVersion = lights.state.version;

		const parameters = programCache.getParameters(material, lights.state, shadowsArray, scene, object);
		const programCacheKey = programCache.getProgramCacheKey(parameters);

		let programs = materialProperties.programs;

		// always update environment and fog - changing these trigger an getProgram call, but it's possible that the program doesn't change

		materialProperties.environment = material.isMeshStandardMaterial ? scene.environment : null;
		materialProperties.fog = scene.fog;
		materialProperties.envMap = (material.isMeshStandardMaterial ? cubeuvmaps : cubemaps).get(material.envMap || materialProperties.environment);

		if (programs === undefined) {

			// new material

			material.addEventListener('dispose', onMaterialDispose);

			programs = new Map();
			materialProperties.programs = programs;

		}

		let program = programs.get(programCacheKey);

		if (program !== undefined) {

			// early out if program and light state is identical

			if (materialProperties.currentProgram === program && materialProperties.lightsStateVersion === lightsStateVersion) {

				updateCommonMaterialProperties(material, parameters);

				return program;

			}

		} else {

			parameters.uniforms = programCache.getUniforms(material);

			material.onBuild(parameters, _this);

			material.onBeforeCompile(parameters, _this);

			program = programCache.acquireProgram(parameters, programCacheKey);
			programs.set(programCacheKey, program);

			materialProperties.uniforms = parameters.uniforms;

		}

		const uniforms = materialProperties.uniforms;

		if ((!material.isShaderMaterial && !material.isRawShaderMaterial) || material.clipping === true) {

			uniforms.clippingPlanes = clipping.uniform;

		}

		updateCommonMaterialProperties(material, parameters);

		// store the light setup it was created for

		materialProperties.needsLights = materialNeedsLights(material);
		materialProperties.lightsStateVersion = lightsStateVersion;

		if (materialProperties.needsLights) {

			// wire up the material to this renderer's lighting state

			uniforms.ambientLightColor.value = lights.state.ambient;
			uniforms.lightProbe.value = lights.state.probe;
			uniforms.directionalLights.value = lights.state.directional;
			uniforms.directionalLightShadows.value = lights.state.directionalShadow;
			uniforms.spotLights.value = lights.state.spot;
			uniforms.spotLightShadows.value = lights.state.spotShadow;
			uniforms.rectAreaLights.value = lights.state.rectArea;
			uniforms.ltc_1.value = lights.state.rectAreaLTC1;
			uniforms.ltc_2.value = lights.state.rectAreaLTC2;
			uniforms.pointLights.value = lights.state.point;
			uniforms.pointLightShadows.value = lights.state.pointShadow;
			uniforms.hemisphereLights.value = lights.state.hemi;

			uniforms.directionalShadowMap.value = lights.state.directionalShadowMap;
			uniforms.directionalShadowMatrix.value = lights.state.directionalShadowMatrix;
			uniforms.spotShadowMap.value = lights.state.spotShadowMap;
			uniforms.spotShadowMatrix.value = lights.state.spotShadowMatrix;
			uniforms.pointShadowMap.value = lights.state.pointShadowMap;
			uniforms.pointShadowMatrix.value = lights.state.pointShadowMatrix;
			// TODO (abelnation): add area lights shadow info to uniforms

		}

		const progUniforms = program.getUniforms();
		const uniformsList = WebGLUniforms.seqWithValue(progUniforms.seq, uniforms);

		materialProperties.currentProgram = program;
		materialProperties.uniformsList = uniformsList;

		return program;

	}

	function updateCommonMaterialProperties(material, parameters) {

		const materialProperties = properties.get(material);

		materialProperties.outputEncoding = parameters.outputEncoding;
		materialProperties.instancing = parameters.instancing;
		materialProperties.skinning = parameters.skinning;
		materialProperties.morphTargets = parameters.morphTargets;
		materialProperties.morphNormals = parameters.morphNormals;
		materialProperties.numClippingPlanes = parameters.numClippingPlanes;
		materialProperties.numIntersection = parameters.numClipIntersection;
		materialProperties.vertexAlphas = parameters.vertexAlphas;
		materialProperties.vertexTangents = parameters.vertexTangents;

	}

	function setProgram(camera, scene, material, object) {

		if (scene.isScene !== true) {
			scene = _emptyScene;
		} // scene could be a Mesh, Line, Points, ...

		textures.resetTextureUnits();

		const fog = scene.fog;
		const environment = material.isMeshStandardMaterial ? scene.environment : null;
		const encoding = (_currentRenderTarget === null) ? _this.outputEncoding : _currentRenderTarget.texture.encoding;
		const envMap = (material.isMeshStandardMaterial ? cubeuvmaps : cubemaps).get(material.envMap || environment);
		const vertexAlphas = material.vertexColors === true && Boolean(object.geometry) && Boolean(object.geometry.attributes.color) && object.geometry.attributes.color.itemSize === 4;
		const vertexTangents = Boolean(object.geometry) && Boolean(object.geometry.attributes.tangent);
		const morphTargets = Boolean(object.geometry) && Boolean(object.geometry.morphAttributes.position);
		const morphNormals = Boolean(object.geometry) && Boolean(object.geometry.morphAttributes.normal);

		const materialProperties = properties.get(material);
		const lights = currentRenderState.state.lights;

		if (_clippingEnabled === true) {

			if (_localClippingEnabled === true || camera !== _currentCamera) {

				const useCache =
					camera === _currentCamera &&
					material.id === _currentMaterialId;

				// we might want to call this function with some ClippingGroup
				// object instead of the material, once it becomes feasible
				// (#8465, #8379)
				clipping.setState(material, camera, useCache);

			}

		}

		//

		let needsProgramChange = false;

		if (material.version === materialProperties.__version) {

			if (materialProperties.needsLights && (materialProperties.lightsStateVersion !== lights.state.version)) {

				needsProgramChange = true;

			} else if (materialProperties.outputEncoding !== encoding) {

				needsProgramChange = true;

			} else if (materialProperties.instancing === true) {

				needsProgramChange = true;

			} else if (materialProperties.skinning === true) {

				needsProgramChange = true;

			} else if (materialProperties.envMap !== envMap) {

				needsProgramChange = true;

			} else if (material.fog && materialProperties.fog !== fog) {

				needsProgramChange = true;

			} else if (materialProperties.numClippingPlanes !== undefined &&
				(materialProperties.numClippingPlanes !== clipping.numPlanes ||
					materialProperties.numIntersection !== clipping.numIntersection)) {

				needsProgramChange = true;

			} else if (materialProperties.vertexAlphas !== vertexAlphas) {

				needsProgramChange = true;

			} else if (materialProperties.vertexTangents !== vertexTangents) {

				needsProgramChange = true;

			} else if (materialProperties.morphTargets !== morphTargets) {

				needsProgramChange = true;

			} else if (materialProperties.morphNormals !== morphNormals) {

				needsProgramChange = true;

			}

		} else {

			needsProgramChange = true;
			materialProperties.__version = material.version;

		}

		//

		let program = materialProperties.currentProgram;

		if (needsProgramChange === true) {

			program = getProgram(material, scene, object);

		}

		let refreshProgram = false;
		let refreshMaterial = false;
		let refreshLights = false;

		const p_uniforms = program.getUniforms(),
			m_uniforms = materialProperties.uniforms;

		if (state.useProgram(program.program)) {

			refreshProgram = true;
			refreshMaterial = true;
			refreshLights = true;

		}

		if (material.id !== _currentMaterialId) {

			_currentMaterialId = material.id;

			refreshMaterial = true;

		}

		if (refreshProgram || _currentCamera !== camera) {

			p_uniforms.setValue(_gl, 'projectionMatrix', camera.projectionMatrix);

			if (capabilities.logarithmicDepthBuffer) {

				p_uniforms.setValue(_gl, 'logDepthBufFC', 2.0 / (Math.log(camera.far + 1.0) / Math.LN2));

			}

			if (_currentCamera !== camera) {

				_currentCamera = camera;

				// lighting uniforms depend on the camera so enforce an update
				// now, in case this material supports lights - or later, when
				// the next material that does gets activated:

				refreshMaterial = true;		// set to true on material change
				refreshLights = true;		// remains set until update done

			}

			// load material specific uniforms
			// (shader material also gets them for the sake of genericity)

			if (material.isShaderMaterial ||
				material.isMeshPhongMaterial ||
				material.isMeshToonMaterial ||
				material.isMeshStandardMaterial ||
				material.envMap) {

				const uCamPos = p_uniforms.map.cameraPosition;

				if (uCamPos !== undefined) {

					uCamPos.setValue(_gl,
						_vector3.setFromMatrixPosition(camera.matrixWorld));

				}

			}

			if (material.isMeshPhongMaterial ||
				material.isMeshToonMaterial ||
				material.isMeshBasicMaterial ||
				material.isMeshStandardMaterial ||
				material.isShaderMaterial) {
			}

			if (material.isMeshStandardMaterial ||
				material.isShaderMaterial) {

				p_uniforms.setValue(_gl, 'viewMatrix', camera.matrixWorldInverse);

			}

		}

		// skinning uniforms must be set even if material didn't change
		// auto-setting of texture unit for bone texture must go before other textures
		// otherwise textures used for skinning can take over texture units reserved for other material textures

		if (refreshMaterial || materialProperties.receiveShadow !== object.receiveShadow) {

			materialProperties.receiveShadow = object.receiveShadow;
			p_uniforms.setValue(_gl, 'receiveShadow', object.receiveShadow);

		}

		if (refreshMaterial) {

			p_uniforms.setValue(_gl, 'toneMappingExposure', _this.toneMappingExposure);

			if (materialProperties.needsLights) {

				// the current material requires lighting info

				// note: all lighting uniforms are always set correctly
				// they simply reference the renderer's state for their
				// values
				//
				// use the current material's .needsUpdate flags to set
				// the GL state when required

				markUniformsLightsNeedsUpdate(m_uniforms, refreshLights);

			}

			// refresh uniforms common to several materials
			materials.refreshMaterialUniforms(m_uniforms, material, _pixelRatio, _height, _transmissionRenderTarget);

			WebGLUniforms.upload(_gl, materialProperties.uniformsList, m_uniforms, textures);
		}

		if (material.isShaderMaterial && material.uniformsNeedUpdate === true) {

			WebGLUniforms.upload(_gl, materialProperties.uniformsList, m_uniforms, textures);
			material.uniformsNeedUpdate = false;

		}

		if (material.isSpriteMaterial) {

			p_uniforms.setValue(_gl, 'center', object.center);

		}

		// common matrices

		p_uniforms.setValue(_gl, 'modelViewMatrix', object.modelViewMatrix);
		p_uniforms.setValue(_gl, 'normalMatrix', object.normalMatrix);
		p_uniforms.setValue(_gl, 'modelMatrix', object.matrixWorld);

		return program;

	}

	// If uniforms are marked as clean, they don't need to be loaded to the GPU.

	function markUniformsLightsNeedsUpdate(uniforms, value) {

		uniforms.ambientLightColor.needsUpdate = value;
		uniforms.lightProbe.needsUpdate = value;

		uniforms.directionalLights.needsUpdate = value;
		uniforms.directionalLightShadows.needsUpdate = value;
		uniforms.pointLights.needsUpdate = value;
		uniforms.pointLightShadows.needsUpdate = value;
		uniforms.spotLights.needsUpdate = value;
		uniforms.spotLightShadows.needsUpdate = value;
		uniforms.rectAreaLights.needsUpdate = value;
		uniforms.hemisphereLights.needsUpdate = value;

	}

	function materialNeedsLights(material) {

		return material.isMeshToonMaterial || material.isMeshPhongMaterial ||
			material.isMeshStandardMaterial ||
			(material.isShaderMaterial && material.lights === true);

	}

	this.getActiveCubeFace = function () {

		return _currentActiveCubeFace;

	};

	this.getActiveMipmapLevel = function () {

		return _currentActiveMipmapLevel;

	};

	this.getRenderTarget = function () {

		return _currentRenderTarget;

	};

	this.setRenderTarget = function (renderTarget, activeCubeFace = 0, activeMipmapLevel = 0) {

		_currentRenderTarget = renderTarget;
		_currentActiveCubeFace = activeCubeFace;
		_currentActiveMipmapLevel = activeMipmapLevel;

		if (renderTarget && properties.get(renderTarget).__webglFramebuffer === undefined) {

			textures.setupRenderTarget(renderTarget);

		}

		let framebuffer = null;
		let isCube = false;
		const isRenderTarget3D = false;

		if (renderTarget) {
			const __webglFramebuffer = properties.get(renderTarget).__webglFramebuffer;

			if (renderTarget.isWebGLCubeRenderTarget) {

				framebuffer = __webglFramebuffer[activeCubeFace];
				isCube = true;

			} else if (renderTarget.isWebGLMultisampleRenderTarget) {

				framebuffer = properties.get(renderTarget).__webglMultisampledFramebuffer;

			} else {

				framebuffer = __webglFramebuffer;

			}

			_currentViewport.copy(renderTarget.viewport);
			_currentScissor.copy(renderTarget.scissor);
			_currentScissorTest = renderTarget.scissorTest;

		} else {

			_currentViewport.copy(_viewport).multiplyScalar(_pixelRatio).floor();
			_currentScissor.copy(_scissor).multiplyScalar(_pixelRatio).floor();
			_currentScissorTest = _scissorTest;

		}

		const framebufferBound = state.bindFramebuffer(36160, framebuffer);

		if (framebufferBound && capabilities.drawBuffers) {

			let needsUpdate = false;

			if (renderTarget) {

				if (renderTarget.isWebGLMultipleRenderTargets) {

					const textures = renderTarget.texture;

					if (_currentDrawBuffers.length !== textures.length || _currentDrawBuffers[0] !== 36064) {

						for (let i = 0, il = textures.length; i < il; i++) {

							_currentDrawBuffers[i] = 36064 + i;

						}

						_currentDrawBuffers.length = textures.length;

						needsUpdate = true;

					}

				} else {

					if (_currentDrawBuffers.length !== 1 || _currentDrawBuffers[0] !== 36064) {

						_currentDrawBuffers[0] = 36064;
						_currentDrawBuffers.length = 1;

						needsUpdate = true;

					}

				}

			} else {

				if (_currentDrawBuffers.length !== 1 || _currentDrawBuffers[0] !== 1029) {

					_currentDrawBuffers[0] = 1029;
					_currentDrawBuffers.length = 1;

					needsUpdate = true;

				}

			}

			if (needsUpdate) {

				if (capabilities.isWebGL2) {

					_gl.drawBuffers(_currentDrawBuffers);

				} else {

					extensions.get('WEBGL_draw_buffers').drawBuffersWEBGL(_currentDrawBuffers);

				}

			}

		}

		state.viewport(_currentViewport);
		state.scissor(_currentScissor);
		state.setScissorTest(_currentScissorTest);

		if (isCube) {

			const textureProperties = properties.get(renderTarget.texture);
			_gl.framebufferTexture2D(36160, 36064, 34069 + activeCubeFace, textureProperties.__webglTexture, activeMipmapLevel);

		} else if (isRenderTarget3D) {

			const textureProperties = properties.get(renderTarget.texture);
			const layer = activeCubeFace || 0;
			_gl.framebufferTextureLayer(36160, 36064, textureProperties.__webglTexture, activeMipmapLevel || 0, layer);

		}

		_currentMaterialId = -1; // reset current material to ensure correct uniform bindings

	};

	this.readRenderTargetPixels = function (renderTarget, x, y, width, height, buffer, activeCubeFaceIndex) {

		if (!(renderTarget && renderTarget.isWebGLRenderTarget)) {

			console.error('THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.');
			return;

		}

		let framebuffer = properties.get(renderTarget).__webglFramebuffer;

		if (renderTarget.isWebGLCubeRenderTarget && activeCubeFaceIndex !== undefined) {

			framebuffer = framebuffer[activeCubeFaceIndex];

		}

		if (framebuffer) {

			state.bindFramebuffer(36160, framebuffer);

			try {

				const texture = renderTarget.texture;
				const textureFormat = texture.format;
				const textureType = texture.type;

				if (textureFormat !== RGBAFormat && utils.convert(textureFormat) !== _gl.getParameter(35739)) {

					console.error('THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.');
					return;

				}

				const halfFloatSupportedByExt = (textureType === HalfFloatType) && (extensions.has('EXT_color_buffer_half_float') || (capabilities.isWebGL2 && extensions.has('EXT_color_buffer_float')));

				if (textureType !== UnsignedByteType && utils.convert(textureType) !== _gl.getParameter(35738) && // Edge and Chrome Mac < 52 (#9513)
					!(textureType === FloatType && (capabilities.isWebGL2 || extensions.has('OES_texture_float') || extensions.has('WEBGL_color_buffer_float'))) && // Chrome Mac >= 52 and Firefox
					!halfFloatSupportedByExt) {

					console.error('THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.');
					return;

				}

				if (_gl.checkFramebufferStatus(36160) === 36053) {

					// the following if statement ensures valid read requests (no out-of-bounds pixels, see #8604)

					if ((x >= 0 && x <= (renderTarget.width - width)) && (y >= 0 && y <= (renderTarget.height - height))) {

						_gl.readPixels(x, y, width, height, utils.convert(textureFormat), utils.convert(textureType), buffer);

					}

				} else {

					console.error('THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.');

				}

			} finally {

				// restore framebuffer of current render target if necessary

				const framebuffer = (_currentRenderTarget !== null) ? properties.get(_currentRenderTarget).__webglFramebuffer : null;
				state.bindFramebuffer(36160, framebuffer);

			}

		}

	};

	this.copyFramebufferToTexture = function (position, texture, level = 0) {

		const levelScale = 2 ** -level;
		const width = Math.floor(texture.image.width * levelScale);
		const height = Math.floor(texture.image.height * levelScale);

		let glFormat = utils.convert(texture.format);

		if (capabilities.isWebGL2) {

			// Workaround for https://bugs.chromium.org/p/chromium/issues/detail?id=1120100
			// Not needed in Chrome 93+

			if (glFormat === 6407) {
				glFormat = 32849;
			}
			if (glFormat === 6408) {
				glFormat = 32856;
			}

		}

		_gl.copyTexImage2D(3553, level, glFormat, position.x, position.y, width, height, 0);

		state.unbindTexture();

	};

	this.copyTextureToTexture = function (position, srcTexture, dstTexture, level = 0) {

		const width = srcTexture.image.width;
		const height = srcTexture.image.height;
		const glFormat = utils.convert(dstTexture.format);
		const glType = utils.convert(dstTexture.type);

		// As another texture upload may have changed pixelStorei
		// parameters, make sure they are correct for the dstTexture
		_gl.pixelStorei(37440, dstTexture.flipY);
		_gl.pixelStorei(37441, dstTexture.premultiplyAlpha);
		_gl.pixelStorei(3317, dstTexture.unpackAlignment);

		if (srcTexture.isDataTexture) {

			_gl.texSubImage2D(3553, level, position.x, position.y, width, height, glFormat, glType, srcTexture.image.data);

		} else {

			if (srcTexture.isCompressedTexture) {

				_gl.compressedTexSubImage2D(3553, level, position.x, position.y, srcTexture.mipmaps[0].width, srcTexture.mipmaps[0].height, glFormat, srcTexture.mipmaps[0].data);

			} else {

				_gl.texSubImage2D(3553, level, position.x, position.y, glFormat, glType, srcTexture.image);

			}

		}

		// Generate mipmaps only when copying level 0
		if (level === 0 && dstTexture.generateMipmaps) {
			_gl.generateMipmap(3553);
		}

		state.unbindTexture();

	};

	this.copyTextureToTexture3D = function (sourceBox, position, srcTexture, dstTexture, level = 0) {
		const width = sourceBox.max.x - sourceBox.min.x + 1;
		const height = sourceBox.max.y - sourceBox.min.y + 1;
		const depth = sourceBox.max.z - sourceBox.min.z + 1;
		const glFormat = utils.convert(dstTexture.format);
		const glType = utils.convert(dstTexture.type);
		let glTarget;

		_gl.pixelStorei(37440, dstTexture.flipY);
		_gl.pixelStorei(37441, dstTexture.premultiplyAlpha);
		_gl.pixelStorei(3317, dstTexture.unpackAlignment);

		const unpackRowLen = _gl.getParameter(3314);
		const unpackImageHeight = _gl.getParameter(32878);
		const unpackSkipPixels = _gl.getParameter(3316);
		const unpackSkipRows = _gl.getParameter(3315);
		const unpackSkipImages = _gl.getParameter(32877);

		const image = srcTexture.isCompressedTexture ? srcTexture.mipmaps[0] : srcTexture.image;

		_gl.pixelStorei(3314, image.width);
		_gl.pixelStorei(32878, image.height);
		_gl.pixelStorei(3316, sourceBox.min.x);
		_gl.pixelStorei(3315, sourceBox.min.y);
		_gl.pixelStorei(32877, sourceBox.min.z);

		if (srcTexture.isDataTexture) {

			_gl.texSubImage3D(glTarget, level, position.x, position.y, position.z, width, height, depth, glFormat, glType, image.data);

		} else {
			_gl.texSubImage3D(glTarget, level, position.x, position.y, position.z, width, height, depth, glFormat, glType, image);
		}

		_gl.pixelStorei(3314, unpackRowLen);
		_gl.pixelStorei(32878, unpackImageHeight);
		_gl.pixelStorei(3316, unpackSkipPixels);
		_gl.pixelStorei(3315, unpackSkipRows);
		_gl.pixelStorei(32877, unpackSkipImages);

		// Generate mipmaps only when copying level 0
		if (level === 0 && dstTexture.generateMipmaps) {
			_gl.generateMipmap(glTarget);
		}

		state.unbindTexture();

	};

	this.initTexture = function () {
		state.unbindTexture();
	};

	this.resetState = function () {

		_currentActiveCubeFace = 0;
		_currentActiveMipmapLevel = 0;
		_currentRenderTarget = null;

		state.reset();
		bindingStates.reset();

	};

	if (typeof __THREE_DEVTOOLS__ !== 'undefined') {

		__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('observe', { detail: this })); // eslint-disable-line no-undef

	}

}

class WebGL1Renderer extends WebGLRenderer { }

WebGL1Renderer.prototype.isWebGL1Renderer = true;

class Fog {

	constructor(color, near = 1, far = 1000) {

		this.name = '';

		this.color = new Color(color);

		this.near = near;
		this.far = far;

	}

	clone() {

		return new Fog(this.color, this.near, this.far);

	}
}

Fog.prototype.isFog = true;

class Scene extends Object3D {

	constructor() {

		super();

		this.type = 'Scene';

		this.background = null;
		this.environment = null;
		this.fog = null;

		this.overrideMaterial = null;

		this.autoUpdate = true; // checked by the renderer

		if (typeof __THREE_DEVTOOLS__ !== 'undefined') {

			__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent('observe', { detail: this })); // eslint-disable-line no-undef

		}

	}

	copy(source, recursive) {

		super.copy(source, recursive);

		if (source.background !== null) {
			this.background = source.background.clone();
		}
		if (source.environment !== null) {
			this.environment = source.environment.clone();
		}
		if (source.fog !== null) {
			this.fog = source.fog.clone();
		}

		if (source.overrideMaterial !== null) {
			this.overrideMaterial = source.overrideMaterial.clone();
		}

		this.autoUpdate = source.autoUpdate;
		this.matrixAutoUpdate = source.matrixAutoUpdate;

		return this;

	}
}

Scene.prototype.isScene = true;

class InstancedBufferAttribute extends BufferAttribute {
	constructor(array, itemSize, normalized, meshPerAttribute = 1) {
		super(array, itemSize, normalized);

		this.meshPerAttribute = meshPerAttribute;
	}

	copy(source) {

		super.copy(source);

		this.meshPerAttribute = source.meshPerAttribute;

		return this;

	}
}

InstancedBufferAttribute.prototype.isInstancedBufferAttribute = true;

/**
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *
 *  linewidth: <float>,
 *  linecap: "round",
 *  linejoin: "round"
 * }
 */

class LineBasicMaterial extends Material {

	constructor(parameters) {

		super();

		this.type = 'LineBasicMaterial';

		this.color = new Color(0xffffff);

		this.linewidth = 1;
		this.linecap = 'round';
		this.linejoin = 'round';

		this.setValues(parameters);

	}


	copy(source) {

		super.copy(source);

		this.color.copy(source.color);

		this.linewidth = source.linewidth;
		this.linecap = source.linecap;
		this.linejoin = source.linejoin;

		return this;

	}

}

LineBasicMaterial.prototype.isLineBasicMaterial = true;

const _start$1 = new Vector3();
const _end$1 = new Vector3();
class Line extends Object3D {

	constructor(geometry = new BufferGeometry(), material = new LineBasicMaterial()) {

		super();

		this.type = 'Line';

		this.geometry = geometry;
		this.material = material;

		this.updateMorphTargets();

	}

	copy(source) {

		super.copy(source);

		this.material = source.material;
		this.geometry = source.geometry;

		return this;

	}

	computeLineDistances() {

		const geometry = this.geometry;

		if (geometry.isBufferGeometry) {

			// we assume non-indexed geometry

			if (geometry.index === null) {

				const positionAttribute = geometry.attributes.position;
				const lineDistances = [0];

				for (let i = 1, l = positionAttribute.count; i < l; i++) {

					_start$1.fromBufferAttribute(positionAttribute, i - 1);
					_end$1.fromBufferAttribute(positionAttribute, i);

					lineDistances[i] = lineDistances[i - 1];
					lineDistances[i] += _start$1.distanceTo(_end$1);

				}

				geometry.setAttribute('lineDistance', new Float32BufferAttribute(lineDistances, 1));

			} else {

				console.warn('THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.');

			}

		} else if (geometry.isGeometry) {

			console.error('THREE.Line.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.');

		}

		return this;

	}


	updateMorphTargets() {

		const geometry = this.geometry;

		if (geometry.isBufferGeometry) {

			const morphAttributes = geometry.morphAttributes;
			const keys = Object.keys(morphAttributes);

			if (keys.length > 0) {

				const morphAttribute = morphAttributes[keys[0]];

				if (morphAttribute !== undefined) {

					this.morphTargetInfluences = [];
					this.morphTargetDictionary = {};

					for (let m = 0, ml = morphAttribute.length; m < ml; m++) {

						const name = morphAttribute[m].name || String(m);

						this.morphTargetInfluences.push(0);
						this.morphTargetDictionary[name] = m;

					}

				}

			}

		} else {

			const morphTargets = geometry.morphTargets;

			if (morphTargets !== undefined && morphTargets.length > 0) {

				console.error('THREE.Line.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.');

			}

		}

	}

}

Line.prototype.isLine = true;

const _start = new Vector3();
const _end = new Vector3();

class LineSegments extends Line {

	constructor(geometry, material) {

		super(geometry, material);

		this.type = 'LineSegments';

	}

	computeLineDistances() {

		const geometry = this.geometry;

		if (geometry.isBufferGeometry) {

			// we assume non-indexed geometry

			if (geometry.index === null) {

				const positionAttribute = geometry.attributes.position;
				const lineDistances = [];

				for (let i = 0, l = positionAttribute.count; i < l; i += 2) {

					_start.fromBufferAttribute(positionAttribute, i);
					_end.fromBufferAttribute(positionAttribute, i + 1);

					lineDistances[i] = (i === 0) ? 0 : lineDistances[i - 1];
					lineDistances[i + 1] = lineDistances[i] + _start.distanceTo(_end);

				}

				geometry.setAttribute('lineDistance', new Float32BufferAttribute(lineDistances, 1));

			} else {

				console.warn('THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.');

			}

		} else if (geometry.isGeometry) {

			console.error('THREE.LineSegments.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.');

		}

		return this;

	}

}

LineSegments.prototype.isLineSegments = true;

class Points extends Object3D {

	constructor(geometry = new BufferGeometry(), material) {

		super();

		this.type = 'Points';

		this.geometry = geometry;
		this.material = material;

		this.updateMorphTargets();

	}

	copy(source) {

		super.copy(source);

		this.material = source.material;
		this.geometry = source.geometry;

		return this;

	}

	updateMorphTargets() {

		const geometry = this.geometry;

		if (geometry.isBufferGeometry) {

			const morphAttributes = geometry.morphAttributes;
			const keys = Object.keys(morphAttributes);

			if (keys.length > 0) {

				const morphAttribute = morphAttributes[keys[0]];

				if (morphAttribute !== undefined) {

					this.morphTargetInfluences = [];
					this.morphTargetDictionary = {};

					for (let m = 0, ml = morphAttribute.length; m < ml; m++) {

						const name = morphAttribute[m].name || String(m);

						this.morphTargetInfluences.push(0);
						this.morphTargetDictionary[name] = m;

					}

				}

			}

		} else {

			const morphTargets = geometry.morphTargets;

			if (morphTargets !== undefined && morphTargets.length > 0) {

				console.error('THREE.Points.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.');

			}

		}

	}

}

Points.prototype.isPoints = true;

class CylinderGeometry extends BufferGeometry {

	constructor(radiusTop = 1, radiusBottom = 1, height = 1, radialSegments = 8, heightSegments = 1, openEnded = false, thetaStart = 0, thetaLength = Math.PI * 2) {

		super();
		this.type = 'CylinderGeometry';

		this.parameters = {
			radiusTop,
			radiusBottom,
			height,
			radialSegments,
			heightSegments,
			openEnded,
			thetaStart,
			thetaLength
		};

		const scope = this;

		radialSegments = Math.floor(radialSegments);
		heightSegments = Math.floor(heightSegments);

		// buffers

		const indices = [];
		const vertices = [];
		const normals = [];
		const uvs = [];

		// helper variables

		let index = 0;
		const indexArray = [];
		const halfHeight = height / 2;
		let groupStart = 0;

		// generate geometry

		generateTorso();

		if (openEnded === false) {

			if (radiusTop > 0) {
				generateCap(true);
			}
			if (radiusBottom > 0) {
				generateCap(false);
			}

		}

		// build geometry

		this.setIndex(indices);
		this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
		this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
		this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));

		function generateTorso() {

			const normal = new Vector3();
			const vertex = new Vector3();

			let groupCount = 0;

			// this will be used to calculate the normal
			const slope = (radiusBottom - radiusTop) / height;

			// generate vertices, normals and uvs

			for (let y = 0; y <= heightSegments; y++) {

				const indexRow = [];

				const v = y / heightSegments;

				// calculate the radius of the current row

				const radius = v * (radiusBottom - radiusTop) + radiusTop;

				for (let x = 0; x <= radialSegments; x++) {

					const u = x / radialSegments;

					const theta = u * thetaLength + thetaStart;

					const sinTheta = Math.sin(theta);
					const cosTheta = Math.cos(theta);

					// vertex

					vertex.x = radius * sinTheta;
					vertex.y = -v * height + halfHeight;
					vertex.z = radius * cosTheta;
					vertices.push(vertex.x, vertex.y, vertex.z);

					// normal

					normal.set(sinTheta, slope, cosTheta).normalize();
					normals.push(normal.x, normal.y, normal.z);

					// uv

					uvs.push(u, 1 - v);

					// save index of vertex in respective row

					indexRow.push(index++);

				}

				// now save vertices of the row in our index array

				indexArray.push(indexRow);

			}

			// generate indices

			for (let x = 0; x < radialSegments; x++) {

				for (let y = 0; y < heightSegments; y++) {

					// we use the index array to access the correct indices

					const a = indexArray[y][x];
					const b = indexArray[y + 1][x];
					const c = indexArray[y + 1][x + 1];
					const d = indexArray[y][x + 1];

					// faces

					indices.push(a, b, d);
					indices.push(b, c, d);

					// update group counter

					groupCount += 6;

				}

			}

			// add a group to the geometry. this will ensure multi material support

			scope.addGroup(groupStart, groupCount, 0);

			// calculate new start value for groups

			groupStart += groupCount;

		}

		function generateCap(top) {

			// save the index of the first center vertex
			const centerIndexStart = index;

			const uv = new Vector2();
			const vertex = new Vector3();

			let groupCount = 0;

			const radius = (top === true) ? radiusTop : radiusBottom;
			const sign = (top === true) ? 1 : -1;

			// first we generate the center vertex data of the cap.
			// because the geometry needs one set of uvs per face,
			// we must generate a center vertex per face/segment

			for (let x = 1; x <= radialSegments; x++) {

				// vertex

				vertices.push(0, halfHeight * sign, 0);

				// normal

				normals.push(0, sign, 0);

				// uv

				uvs.push(0.5, 0.5);

				// increase index

				index++;

			}

			// save the index of the last center vertex
			const centerIndexEnd = index;

			// now we generate the surrounding vertices, normals and uvs

			for (let x = 0; x <= radialSegments; x++) {

				const u = x / radialSegments;
				const theta = u * thetaLength + thetaStart;

				const cosTheta = Math.cos(theta);
				const sinTheta = Math.sin(theta);

				// vertex

				vertex.x = radius * sinTheta;
				vertex.y = halfHeight * sign;
				vertex.z = radius * cosTheta;
				vertices.push(vertex.x, vertex.y, vertex.z);

				// normal

				normals.push(0, sign, 0);

				// uv

				uv.x = (cosTheta * 0.5) + 0.5;
				uv.y = (sinTheta * 0.5 * sign) + 0.5;
				uvs.push(uv.x, uv.y);

				// increase index

				index++;

			}

			// generate indices

			for (let x = 0; x < radialSegments; x++) {

				const c = centerIndexStart + x;
				const i = centerIndexEnd + x;

				if (top === true) {

					// face top

					indices.push(i, i + 1, c);

				} else {

					// face bottom

					indices.push(i + 1, i, c);

				}

				groupCount += 3;

			}

			// add a group to the geometry. this will ensure multi material support

			scope.addGroup(groupStart, groupCount, top === true ? 1 : 2);

			// calculate new start value for groups

			groupStart += groupCount;

		}

	}
}

const _v0 = new Vector3();
const _v1$1 = new Vector3();
const _normal = new Vector3();
const _triangle = new Triangle();

class EdgesGeometry extends BufferGeometry {

	constructor(geometry, thresholdAngle) {

		super();

		this.type = 'EdgesGeometry';

		this.parameters = {
			thresholdAngle
		};

		thresholdAngle = (thresholdAngle !== undefined) ? thresholdAngle : 1;

		if (geometry.isGeometry === true) {

			console.error('THREE.EdgesGeometry no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.');
			return;

		}

		const precisionPoints = 4;
		const precision = 10 ** precisionPoints;
		const thresholdDot = Math.cos(DEG2RAD * thresholdAngle);

		const indexAttr = geometry.getIndex();
		const positionAttr = geometry.getAttribute('position');
		const indexCount = indexAttr ? indexAttr.count : positionAttr.count;

		const indexArr = [0, 0, 0];
		const vertKeys = ['a', 'b', 'c'];
		const hashes = new Array(3);

		const edgeData = {};
		const vertices = [];
		for (let i = 0; i < indexCount; i += 3) {

			if (indexAttr) {

				indexArr[0] = indexAttr.getX(i);
				indexArr[1] = indexAttr.getX(i + 1);
				indexArr[2] = indexAttr.getX(i + 2);

			} else {

				indexArr[0] = i;
				indexArr[1] = i + 1;
				indexArr[2] = i + 2;

			}

			const { a, b, c } = _triangle;
			a.fromBufferAttribute(positionAttr, indexArr[0]);
			b.fromBufferAttribute(positionAttr, indexArr[1]);
			c.fromBufferAttribute(positionAttr, indexArr[2]);
			_triangle.getNormal(_normal);

			// create hashes for the edge from the vertices
			hashes[0] = `${Math.round(a.x * precision)},${Math.round(a.y * precision)},${Math.round(a.z * precision)}`;
			hashes[1] = `${Math.round(b.x * precision)},${Math.round(b.y * precision)},${Math.round(b.z * precision)}`;
			hashes[2] = `${Math.round(c.x * precision)},${Math.round(c.y * precision)},${Math.round(c.z * precision)}`;

			// skip degenerate triangles
			if (hashes[0] === hashes[1] || hashes[1] === hashes[2] || hashes[2] === hashes[0]) {

				continue;

			}

			// iterate over every edge
			for (let j = 0; j < 3; j++) {

				// get the first and next vertex making up the edge
				const jNext = (j + 1) % 3;
				const vecHash0 = hashes[j];
				const vecHash1 = hashes[jNext];
				const v0 = _triangle[vertKeys[j]];
				const v1 = _triangle[vertKeys[jNext]];

				const hash = `${vecHash0}_${vecHash1}`;
				const reverseHash = `${vecHash1}_${vecHash0}`;

				if (reverseHash in edgeData && edgeData[reverseHash]) {

					// if we found a sibling edge add it into the vertex array if
					// it meets the angle threshold and delete the edge from the map.
					if (_normal.dot(edgeData[reverseHash].normal) <= thresholdDot) {

						vertices.push(v0.x, v0.y, v0.z);
						vertices.push(v1.x, v1.y, v1.z);

					}

					edgeData[reverseHash] = null;

				} else if (!(hash in edgeData)) {

					// if we've already got an edge here then skip adding a new one
					edgeData[hash] = {

						index0: indexArr[j],
						index1: indexArr[jNext],
						normal: _normal.clone(),

					};

				}

			}

		}

		// iterate over all remaining, unmatched edges and add them to the vertex array
		for (const key in edgeData) {

			if (edgeData[key]) {

				const { index0, index1 } = edgeData[key];
				_v0.fromBufferAttribute(positionAttr, index0);
				_v1$1.fromBufferAttribute(positionAttr, index1);

				vertices.push(_v0.x, _v0.y, _v0.z);
				vertices.push(_v1$1.x, _v1$1.y, _v1$1.z);

			}

		}

		this.setAttribute('position', new Float32BufferAttribute(vertices, 3));

	}

}

//
// Extensible curve object.
//
// Some common of curve methods:
// .getPoint( t, optionalTarget ), .getTangent( t, optionalTarget )
// .getPointAt( u, optionalTarget ), .getTangentAt( u, optionalTarget )
// .getPoints(), .getSpacedPoints()
// .getLength()
// .updateArcLengths()
//
// This following curves inherit from THREE.Curve:
//
// -- 2D curves --
// THREE.ArcCurve
// THREE.CubicBezierCurve
// THREE.EllipseCurve
// THREE.LineCurve
// THREE.QuadraticBezierCurve
// THREE.SplineCurve
//
// -- 3D curves --
// THREE.CatmullRomCurve3
// THREE.CubicBezierCurve3
// THREE.LineCurve3
// THREE.QuadraticBezierCurve3
//
// A series of curves can be represented as a THREE.CurvePath.
//
//

class Curve {

	constructor() {

		this.type = 'Curve';

		this.arcLengthDivisions = 200;

	}

	// Virtual base class method to overwrite and implement in subclasses
	//	- t [0 .. 1]

	getPoint(/* t, optionalTarget */) {

		console.warn('THREE.Curve: .getPoint() not implemented.');
		return null;

	}

	// Get point at relative position in curve according to arc length
	// - u [0 .. 1]

	getPointAt(u, optionalTarget) {

		const t = this.getUtoTmapping(u);
		return this.getPoint(t, optionalTarget);

	}

	// Get sequence of points using getPoint( t )

	getPoints(divisions = 5) {

		const points = [];

		for (let d = 0; d <= divisions; d++) {

			points.push(this.getPoint(d / divisions));

		}

		return points;

	}

	// Get sequence of points using getPointAt( u )

	getSpacedPoints(divisions = 5) {

		const points = [];

		for (let d = 0; d <= divisions; d++) {

			points.push(this.getPointAt(d / divisions));

		}

		return points;

	}

	// Get total curve arc length

	getLength() {

		const lengths = this.getLengths();
		return lengths[lengths.length - 1];

	}

	// Get list of cumulative segment lengths

	getLengths(divisions = this.arcLengthDivisions) {

		if (this.cacheArcLengths &&
			(this.cacheArcLengths.length === divisions + 1) &&
			!this.needsUpdate) {

			return this.cacheArcLengths;

		}

		this.needsUpdate = false;

		const cache = [];
		let current, last = this.getPoint(0);
		let sum = 0;

		cache.push(0);

		for (let p = 1; p <= divisions; p++) {

			current = this.getPoint(p / divisions);
			sum += current.distanceTo(last);
			cache.push(sum);
			last = current;

		}

		this.cacheArcLengths = cache;

		return cache; // { sums: cache, sum: sum }; Sum is in the last element.

	}

	updateArcLengths() {

		this.needsUpdate = true;
		this.getLengths();

	}

	// Given u ( 0 .. 1 ), get a t to find p. This gives you points which are equidistant

	getUtoTmapping(u, distance) {

		const arcLengths = this.getLengths();

		let i = 0;
		const il = arcLengths.length;

		let targetArcLength; // The targeted u distance value to get

		if (distance) {

			targetArcLength = distance;

		} else {

			targetArcLength = u * arcLengths[il - 1];

		}

		// binary search for the index with largest value smaller than target u distance

		let low = 0, high = il - 1, comparison;

		while (low <= high) {

			i = Math.floor(low + (high - low) / 2); // less likely to overflow, though probably not issue here, JS doesn't really have integers, all numbers are floats

			comparison = arcLengths[i] - targetArcLength;

			if (comparison < 0) {

				low = i + 1;

			} else if (comparison > 0) {

				high = i - 1;

			} else {

				high = i;
				break;

				// DONE

			}

		}

		i = high;

		if (arcLengths[i] === targetArcLength) {

			return i / (il - 1);

		}

		// we could get finer grain at lengths, or use simple interpolation between two points

		const lengthBefore = arcLengths[i];
		const lengthAfter = arcLengths[i + 1];

		const segmentLength = lengthAfter - lengthBefore;

		// determine where we are between the 'before' and 'after' points

		const segmentFraction = (targetArcLength - lengthBefore) / segmentLength;

		// add that fractional amount to t

		const t = (i + segmentFraction) / (il - 1);

		return t;

	}

	// Returns a unit vector tangent at t
	// In case any sub curve does not implement its tangent derivation,
	// 2 points a small delta apart will be used to find its gradient
	// which seems to give a reasonable approximation

	getTangent(t, optionalTarget) {

		const delta = 0.0001;
		let t1 = t - delta;
		let t2 = t + delta;

		// Capping in case of danger

		if (t1 < 0) {
			t1 = 0;
		}
		if (t2 > 1) {
			t2 = 1;
		}

		const pt1 = this.getPoint(t1);
		const pt2 = this.getPoint(t2);

		const tangent = optionalTarget || ((pt1.isVector2) ? new Vector2() : new Vector3());

		tangent.copy(pt2).sub(pt1).normalize();

		return tangent;

	}

	getTangentAt(u, optionalTarget) {

		const t = this.getUtoTmapping(u);
		return this.getTangent(t, optionalTarget);

	}

	computeFrenetFrames(segments, closed) {

		// see http://www.cs.indiana.edu/pub/techreports/TR425.pdf

		const normal = new Vector3();

		const tangents = [];
		const normals = [];
		const binormals = [];

		const vec = new Vector3();
		const mat = new Matrix4();

		// compute the tangent vectors for each segment on the curve

		for (let i = 0; i <= segments; i++) {

			const u = i / segments;

			tangents[i] = this.getTangentAt(u, new Vector3());
			tangents[i].normalize();

		}

		// select an initial normal vector perpendicular to the first tangent vector,
		// and in the direction of the minimum tangent xyz component

		normals[0] = new Vector3();
		binormals[0] = new Vector3();
		let min = Number.MAX_VALUE;
		const tx = Math.abs(tangents[0].x);
		const ty = Math.abs(tangents[0].y);
		const tz = Math.abs(tangents[0].z);

		if (tx <= min) {

			min = tx;
			normal.set(1, 0, 0);

		}

		if (ty <= min) {

			min = ty;
			normal.set(0, 1, 0);

		}

		if (tz <= min) {

			normal.set(0, 0, 1);

		}

		vec.crossVectors(tangents[0], normal).normalize();

		normals[0].crossVectors(tangents[0], vec);
		binormals[0].crossVectors(tangents[0], normals[0]);


		// compute the slowly-varying normal and binormal vectors for each segment on the curve

		for (let i = 1; i <= segments; i++) {

			normals[i] = normals[i - 1].clone();

			binormals[i] = binormals[i - 1].clone();

			vec.crossVectors(tangents[i - 1], tangents[i]);

			if (vec.length() > Number.EPSILON) {

				vec.normalize();

				const theta = Math.acos(clamp(tangents[i - 1].dot(tangents[i]), -1, 1)); // clamp for floating pt errors

				normals[i].applyMatrix4(mat.makeRotationAxis(vec, theta));

			}

			binormals[i].crossVectors(tangents[i], normals[i]);

		}

		// if the curve is closed, postprocess the vectors so the first and last normal vectors are the same

		if (closed === true) {

			let theta = Math.acos(clamp(normals[0].dot(normals[segments]), -1, 1));
			theta /= segments;

			if (tangents[0].dot(vec.crossVectors(normals[0], normals[segments])) > 0) {

				theta = -theta;

			}

			for (let i = 1; i <= segments; i++) {

				// twist a little...
				normals[i].applyMatrix4(mat.makeRotationAxis(tangents[i], theta * i));
				binormals[i].crossVectors(tangents[i], normals[i]);

			}

		}

		return {
			tangents,
			normals,
			binormals
		};

	}

	clone() {

		return new this.constructor().copy(this);

	}

	copy(source) {

		this.arcLengthDivisions = source.arcLengthDivisions;

		return this;

	}
}

/**
 * Centripetal CatmullRom Curve - which is useful for avoiding
 * cusps and self-intersections in non-uniform catmull rom curves.
 * http://www.cemyuksel.com/research/catmullrom_param/catmullrom.pdf
 *
 * curve.type accepts centripetal(default), chordal and catmullrom
 * curve.tension is used for catmullrom which defaults to 0.5
 */


//
// Based on an optimized c++ solution in
// - http://stackoverflow.com/questions/9489736/catmull-rom-curve-with-no-cusps-and-no-self-intersections/
// - http://ideone.com/NoEbVM
//
// This CubicPoly class could be used for reusing some variables and calculations,
// but for three.js curve use, it could be possible inlined and flatten into a single function call
// which can be placed in CurveUtils.
//

function CubicPoly() {

	let c0 = 0, c1 = 0, c2 = 0, c3 = 0;

	// Compute coefficients for a cubic polynomial
	//   p(s) = c0 + c1*s + c2*s^2 + c3*s^3
	// such that
	//   p(0) = x0, p(1) = x1
	//  and
	//   p'(0) = t0, p'(1) = t1.
	function init(x0, x1, t0, t1) {

		c0 = x0;
		c1 = t0;
		c2 = -3 * x0 + 3 * x1 - 2 * t0 - t1;
		c3 = 2 * x0 - 2 * x1 + t0 + t1;

	}

	return {

		initCatmullRom(x0, x1, x2, x3, tension) {

			init(x1, x2, tension * (x2 - x0), tension * (x3 - x1));

		},

		initNonuniformCatmullRom(x0, x1, x2, x3, dt0, dt1, dt2) {

			// compute tangents when parameterized in [t1,t2]
			let t1 = (x1 - x0) / dt0 - (x2 - x0) / (dt0 + dt1) + (x2 - x1) / dt1;
			let t2 = (x2 - x1) / dt1 - (x3 - x1) / (dt1 + dt2) + (x3 - x2) / dt2;

			// rescale tangents for parametrization in [0,1]
			t1 *= dt1;
			t2 *= dt1;

			init(x1, x2, t1, t2);

		},

		calc(t) {

			const t2 = t * t;
			const t3 = t2 * t;
			return c0 + c1 * t + c2 * t2 + c3 * t3;

		}

	};

}

//

const tmp = new Vector3();
const px = new CubicPoly(), py = new CubicPoly(), pz = new CubicPoly();

class CatmullRomCurve3 extends Curve {

	constructor(points = [], closed = false, curveType = 'centripetal', tension = 0.5) {

		super();

		this.type = 'CatmullRomCurve3';

		this.points = points;
		this.closed = closed;
		this.curveType = curveType;
		this.tension = tension;

	}

	getPoint(t, optionalTarget = new Vector3()) {

		const point = optionalTarget;

		const points = this.points;
		const l = points.length;

		const p = (l - (this.closed ? 0 : 1)) * t;
		let intPoint = Math.floor(p);
		let weight = p - intPoint;

		if (this.closed) {

			intPoint += intPoint > 0 ? 0 : (Math.floor(Math.abs(intPoint) / l) + 1) * l;

		} else if (weight === 0 && intPoint === l - 1) {

			intPoint = l - 2;
			weight = 1;

		}

		let p0, p3; // 4 points (p1 & p2 defined below)

		if (this.closed || intPoint > 0) {

			p0 = points[(intPoint - 1) % l];

		} else {

			// extrapolate first point
			tmp.subVectors(points[0], points[1]).add(points[0]);
			p0 = tmp;

		}

		const p1 = points[intPoint % l];
		const p2 = points[(intPoint + 1) % l];

		if (this.closed || intPoint + 2 < l) {

			p3 = points[(intPoint + 2) % l];

		} else {

			// extrapolate last point
			tmp.subVectors(points[l - 1], points[l - 2]).add(points[l - 1]);
			p3 = tmp;

		}

		if (this.curveType === 'centripetal' || this.curveType === 'chordal') {

			// init Centripetal / Chordal Catmull-Rom
			const pow = this.curveType === 'chordal' ? 0.5 : 0.25;
			let dt0 = p0.distanceToSquared(p1) ** pow;
			let dt1 = p1.distanceToSquared(p2) ** pow;
			let dt2 = p2.distanceToSquared(p3) ** pow;

			// safety check for repeated points
			if (dt1 < 1e-4) {
				dt1 = 1.0;
			}
			if (dt0 < 1e-4) {
				dt0 = dt1;
			}
			if (dt2 < 1e-4) {
				dt2 = dt1;
			}

			px.initNonuniformCatmullRom(p0.x, p1.x, p2.x, p3.x, dt0, dt1, dt2);
			py.initNonuniformCatmullRom(p0.y, p1.y, p2.y, p3.y, dt0, dt1, dt2);
			pz.initNonuniformCatmullRom(p0.z, p1.z, p2.z, p3.z, dt0, dt1, dt2);

		} else if (this.curveType === 'catmullrom') {

			px.initCatmullRom(p0.x, p1.x, p2.x, p3.x, this.tension);
			py.initCatmullRom(p0.y, p1.y, p2.y, p3.y, this.tension);
			pz.initCatmullRom(p0.z, p1.z, p2.z, p3.z, this.tension);

		}

		point.set(
			px.calc(weight),
			py.calc(weight),
			pz.calc(weight)
		);

		return point;

	}

	copy(source) {

		super.copy(source);

		this.points = [];

		for (let i = 0, l = source.points.length; i < l; i++) {

			const point = source.points[i];

			this.points.push(point.clone());

		}

		this.closed = source.closed;
		this.curveType = source.curveType;
		this.tension = source.tension;

		return this;

	}
}

CatmullRomCurve3.prototype.isCatmullRomCurve3 = true;

class LineCurve extends Curve {

	constructor(v1 = new Vector2(), v2 = new Vector2()) {

		super();

		this.type = 'LineCurve';

		this.v1 = v1;
		this.v2 = v2;

	}

	getPoint(t, optionalTarget = new Vector2()) {

		const point = optionalTarget;

		if (t === 1) {

			point.copy(this.v2);

		} else {

			point.copy(this.v2).sub(this.v1);
			point.multiplyScalar(t).add(this.v1);

		}

		return point;

	}

	// Line curve is linear, so we can overwrite default getPointAt
	getPointAt(u, optionalTarget) {

		return this.getPoint(u, optionalTarget);

	}

	getTangent(t, optionalTarget) {

		const tangent = optionalTarget || new Vector2();

		tangent.copy(this.v2).sub(this.v1).normalize();

		return tangent;

	}

	copy(source) {

		super.copy(source);

		this.v1.copy(source.v1);
		this.v2.copy(source.v2);

		return this;

	}
}

LineCurve.prototype.isLineCurve = true;

class ShapeUtils {
	// calculate area of the contour polygon

	static area(contour) {

		const n = contour.length;
		let a = 0.0;

		for (let p = n - 1, q = 0; q < n; p = q++) {

			a += contour[p].x * contour[q].y - contour[q].x * contour[p].y;

		}

		return a * 0.5;

	}

	static isClockWise(pts) {

		return ShapeUtils.area(pts) < 0;

	}

	static triangulateShape(contour, holes) {

		const vertices = []; // flat array of vertices like [ x0,y0, x1,y1, x2,y2, ... ]
		const holeIndices = []; // array of hole indices
		const faces = []; // final array of vertex indices like [ [ a,b,d ], [ b,c,d ] ]

		removeDupEndPts(contour);
		addContour(vertices, contour);

		//

		let holeIndex = contour.length;

		holes.forEach(removeDupEndPts);

		for (let i = 0; i < holes.length; i++) {

			holeIndices.push(holeIndex);
			holeIndex += holes[i].length;
			addContour(vertices, holes[i]);

		}

		const triangles = earcut(vertices, holeIndices);

		for (let i = 0; i < triangles.length; i += 3) {

			faces.push(triangles.slice(i, i + 3));

		}

		return faces;

	}

}

function removeDupEndPts(points) {

	const l = points.length;

	if (l > 2 && points[l - 1].equals(points[0])) {

		points.pop();

	}

}

function addContour(vertices, contour) {

	for (let i = 0; i < contour.length; i++) {

		vertices.push(contour[i].x);
		vertices.push(contour[i].y);

	}

}

class ShapeGeometry extends BufferGeometry {

	constructor(shapes, curveSegments = 12) {

		super();
		this.type = 'ShapeGeometry';

		this.parameters = {
			shapes,
			curveSegments
		};

		// buffers

		const indices = [];
		const vertices = [];
		const normals = [];
		const uvs = [];

		// helper variables

		let groupStart = 0;
		let groupCount = 0;

		// allow single and array values for "shapes" parameter

		if (Array.isArray(shapes) === false) {

			addShape(shapes);

		} else {

			for (let i = 0; i < shapes.length; i++) {

				addShape(shapes[i]);

				this.addGroup(groupStart, groupCount, i); // enables MultiMaterial support

				groupStart += groupCount;
				groupCount = 0;

			}

		}

		// build geometry

		this.setIndex(indices);
		this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
		this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
		this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));


		// helper functions

		function addShape(shape) {

			const indexOffset = vertices.length / 3;
			const points = shape.extractPoints(curveSegments);

			let shapeVertices = points.shape;
			const shapeHoles = points.holes;

			// check direction of vertices

			if (ShapeUtils.isClockWise(shapeVertices) === false) {

				shapeVertices = shapeVertices.reverse();

			}

			for (let i = 0, l = shapeHoles.length; i < l; i++) {

				const shapeHole = shapeHoles[i];

				if (ShapeUtils.isClockWise(shapeHole) === true) {

					shapeHoles[i] = shapeHole.reverse();

				}

			}

			const faces = ShapeUtils.triangulateShape(shapeVertices, shapeHoles);

			// join vertices of inner and outer paths to a single array

			for (let i = 0, l = shapeHoles.length; i < l; i++) {

				const shapeHole = shapeHoles[i];
				shapeVertices = shapeVertices.concat(shapeHole);

			}

			// vertices, normals, uvs

			for (let i = 0, l = shapeVertices.length; i < l; i++) {

				const vertex = shapeVertices[i];

				vertices.push(vertex.x, vertex.y, 0);
				normals.push(0, 0, 1);
				uvs.push(vertex.x, vertex.y); // world uvs

			}

			// incides

			for (let i = 0, l = faces.length; i < l; i++) {

				const face = faces[i];

				const a = face[0] + indexOffset;
				const b = face[1] + indexOffset;
				const c = face[2] + indexOffset;

				indices.push(a, b, c);
				groupCount += 3;

			}

		}

	}
}

class SphereGeometry extends BufferGeometry {

	constructor(radius = 1, widthSegments = 32, heightSegments = 16, phiStart = 0, phiLength = Math.PI * 2, thetaStart = 0, thetaLength = Math.PI) {

		super();
		this.type = 'SphereGeometry';

		this.parameters = {
			radius,
			widthSegments,
			heightSegments,
			phiStart,
			phiLength,
			thetaStart,
			thetaLength
		};

		widthSegments = Math.max(3, Math.floor(widthSegments));
		heightSegments = Math.max(2, Math.floor(heightSegments));

		const thetaEnd = Math.min(thetaStart + thetaLength, Math.PI);

		let index = 0;
		const grid = [];

		const vertex = new Vector3();
		const normal = new Vector3();

		// buffers

		const indices = [];
		const vertices = [];
		const normals = [];
		const uvs = [];

		// generate vertices, normals and uvs

		for (let iy = 0; iy <= heightSegments; iy++) {

			const verticesRow = [];

			const v = iy / heightSegments;

			// special case for the poles

			let uOffset = 0;

			if (iy == 0 && thetaStart == 0) {

				uOffset = 0.5 / widthSegments;

			} else if (iy == heightSegments && thetaEnd == Math.PI) {

				uOffset = -0.5 / widthSegments;

			}

			for (let ix = 0; ix <= widthSegments; ix++) {

				const u = ix / widthSegments;

				// vertex

				vertex.x = -radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
				vertex.y = radius * Math.cos(thetaStart + v * thetaLength);
				vertex.z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);

				vertices.push(vertex.x, vertex.y, vertex.z);

				// normal

				normal.copy(vertex).normalize();
				normals.push(normal.x, normal.y, normal.z);

				// uv

				uvs.push(u + uOffset, 1 - v);

				verticesRow.push(index++);

			}

			grid.push(verticesRow);

		}

		// indices

		for (let iy = 0; iy < heightSegments; iy++) {

			for (let ix = 0; ix < widthSegments; ix++) {

				const a = grid[iy][ix + 1];
				const b = grid[iy][ix];
				const c = grid[iy + 1][ix];
				const d = grid[iy + 1][ix + 1];

				if (iy !== 0 || thetaStart > 0) {
					indices.push(a, b, d);
				}
				if (iy !== heightSegments - 1 || thetaEnd < Math.PI) {
					indices.push(b, c, d);
				}

			}

		}

		// build geometry

		this.setIndex(indices);
		this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
		this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
		this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));

	}
}

class TubeGeometry extends BufferGeometry {

	constructor(path, tubularSegments = 64, radius = 1, radialSegments = 8, closed = false) {

		super();
		this.type = 'TubeGeometry';

		this.parameters = {
			path,
			tubularSegments,
			radius,
			radialSegments,
			closed
		};

		const frames = path.computeFrenetFrames(tubularSegments, closed);

		// expose internals

		this.tangents = frames.tangents;
		this.normals = frames.normals;
		this.binormals = frames.binormals;

		// helper variables

		const vertex = new Vector3();
		const normal = new Vector3();
		const uv = new Vector2();
		let P = new Vector3();

		// buffer

		const vertices = [];
		const normals = [];
		const uvs = [];
		const indices = [];

		// create buffer data

		generateBufferData();

		// build geometry

		this.setIndex(indices);
		this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
		this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
		this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));

		// functions

		function generateBufferData() {

			for (let i = 0; i < tubularSegments; i++) {

				generateSegment(i);

			}

			// if the geometry is not closed, generate the last row of vertices and normals
			// at the regular position on the given path
			//
			// if the geometry is closed, duplicate the first row of vertices and normals (uvs will differ)

			generateSegment((closed === false) ? tubularSegments : 0);

			// uvs are generated in a separate function.
			// this makes it easy compute correct values for closed geometries

			generateUVs();

			// finally create faces

			generateIndices();

		}

		function generateSegment(i) {

			// we use getPointAt to sample evenly distributed points from the given path

			P = path.getPointAt(i / tubularSegments, P);

			// retrieve corresponding normal and binormal

			const N = frames.normals[i];
			const B = frames.binormals[i];

			// generate normals and vertices for the current segment

			for (let j = 0; j <= radialSegments; j++) {

				const v = j / radialSegments * Math.PI * 2;

				const sin = Math.sin(v);
				const cos = -Math.cos(v);

				// normal

				normal.x = (cos * N.x + sin * B.x);
				normal.y = (cos * N.y + sin * B.y);
				normal.z = (cos * N.z + sin * B.z);
				normal.normalize();

				normals.push(normal.x, normal.y, normal.z);

				// vertex

				vertex.x = P.x + radius * normal.x;
				vertex.y = P.y + radius * normal.y;
				vertex.z = P.z + radius * normal.z;

				vertices.push(vertex.x, vertex.y, vertex.z);

			}

		}

		function generateIndices() {

			for (let j = 1; j <= tubularSegments; j++) {

				for (let i = 1; i <= radialSegments; i++) {

					const a = (radialSegments + 1) * (j - 1) + (i - 1);
					const b = (radialSegments + 1) * j + (i - 1);
					const c = (radialSegments + 1) * j + i;
					const d = (radialSegments + 1) * (j - 1) + i;

					// faces

					indices.push(a, b, d);
					indices.push(b, c, d);

				}

			}

		}

		function generateUVs() {

			for (let i = 0; i <= tubularSegments; i++) {

				for (let j = 0; j <= radialSegments; j++) {

					uv.x = i / tubularSegments;
					uv.y = j / radialSegments;

					uvs.push(uv.x, uv.y);

				}

			}

		}

	}
}

/**
 * parameters = {
 *  color: <hex>,
 *  roughness: <float>,
 *  metalness: <float>,
 *  opacity: <float>,
 *
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *  lightMapIntensity: <float>
 *
 *  aoMap: new THREE.Texture( <Image> ),
 *  aoMapIntensity: <float>
 *
 *  emissive: <hex>,
 *  emissiveIntensity: <float>
 *  emissiveMap: new THREE.Texture( <Image> ),
 *
 *  bumpMap: new THREE.Texture( <Image> ),
 *  bumpScale: <float>,
 *
 *  normalMap: new THREE.Texture( <Image> ),
 *  normalMapType: THREE.TangentSpaceNormalMap,
 *  normalScale: <Vector2>,
 *
 *  displacementMap: new THREE.Texture( <Image> ),
 *  displacementScale: <float>,
 *  displacementBias: <float>,
 *
 *  roughnessMap: new THREE.Texture( <Image> ),
 *
 *  metalnessMap: new THREE.Texture( <Image> ),
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  refractionRatio: <float>,
 *
 *  flatShading: <bool>
 * }
 */

class MeshStandardMaterial extends Material {

	constructor(parameters) {

		super();

		this.defines = { 'STANDARD': '' };

		this.type = 'MeshStandardMaterial';

		this.color = new Color(0xffffff); // diffuse
		this.roughness = 1.0;
		this.metalness = 0.0;

		this.map = null;

		this.lightMap = null;
		this.lightMapIntensity = 1.0;

		this.aoMap = null;
		this.aoMapIntensity = 1.0;

		this.emissive = new Color(0x000000);
		this.emissiveIntensity = 1.0;
		this.emissiveMap = null;

		this.bumpMap = null;
		this.bumpScale = 1;

		this.normalMap = null;
		this.normalMapType = TangentSpaceNormalMap;
		this.normalScale = new Vector2(1, 1);

		this.displacementMap = null;
		this.displacementScale = 1;
		this.displacementBias = 0;

		this.roughnessMap = null;

		this.metalnessMap = null;

		this.alphaMap = null;

		this.envMap = null;
		this.envMapIntensity = 1.0;

		this.refractionRatio = 0.98;

		this.flatShading = false;

		this.setValues(parameters);

	}

	copy(source) {

		super.copy(source);

		this.defines = { 'STANDARD': '' };

		this.color.copy(source.color);
		this.roughness = source.roughness;
		this.metalness = source.metalness;

		this.map = source.map;

		this.lightMap = source.lightMap;
		this.lightMapIntensity = source.lightMapIntensity;

		this.aoMap = source.aoMap;
		this.aoMapIntensity = source.aoMapIntensity;

		this.emissive.copy(source.emissive);
		this.emissiveMap = source.emissiveMap;
		this.emissiveIntensity = source.emissiveIntensity;

		this.bumpMap = source.bumpMap;
		this.bumpScale = source.bumpScale;

		this.normalMap = source.normalMap;
		this.normalMapType = source.normalMapType;
		this.normalScale.copy(source.normalScale);

		this.displacementMap = source.displacementMap;
		this.displacementScale = source.displacementScale;
		this.displacementBias = source.displacementBias;

		this.roughnessMap = source.roughnessMap;

		this.metalnessMap = source.metalnessMap;

		this.alphaMap = source.alphaMap;

		this.envMap = source.envMap;
		this.envMapIntensity = source.envMapIntensity;

		this.refractionRatio = source.refractionRatio;

		this.flatShading = source.flatShading;

		return this;

	}

}

MeshStandardMaterial.prototype.isMeshStandardMaterial = true;

const AnimationUtils = {

	// same as Array.prototype.slice, but also works on typed arrays
	arraySlice(array, from, to) {

		if (AnimationUtils.isTypedArray(array)) {

			// in ios9 array.subarray(from, undefined) will return empty array
			// but array.subarray(from) or array.subarray(from, len) is correct
			return new array.constructor(array.subarray(from, to !== undefined ? to : array.length));

		}

		return array.slice(from, to);

	},

	// converts an array to a specific type
	convertArray(array, type, forceClone) {

		if (!array || // let 'undefined' and 'null' pass
			!forceClone && array.constructor === type) {
			return array;
		}

		if (typeof type.BYTES_PER_ELEMENT === 'number') {

			return new type(array); // create typed array

		}

		return Array.prototype.slice.call(array); // create Array

	},

	isTypedArray(object) {

		return ArrayBuffer.isView(object) &&
			!(object instanceof DataView);

	},

	// returns an array by which times and values can be sorted
	getKeyframeOrder(times) {

		function compareTime(i, j) {

			return times[i] - times[j];

		}

		const n = times.length;
		const result = new Array(n);
		for (let i = 0; i !== n; ++i) {
			result[i] = i;
		}

		result.sort(compareTime);

		return result;

	},

	// uses the array previously returned by 'getKeyframeOrder' to sort data
	sortedArray(values, stride, order) {

		const nValues = values.length;
		const result = new values.constructor(nValues);

		for (let i = 0, dstOffset = 0; dstOffset !== nValues; ++i) {

			const srcOffset = order[i] * stride;

			for (let j = 0; j !== stride; ++j) {

				result[dstOffset++] = values[srcOffset + j];

			}

		}

		return result;

	},

	// function for parsing AOS keyframe formats
	flattenJSON(jsonKeys, times, values, valuePropertyName) {

		let i = 1, key = jsonKeys[0];

		while (key !== undefined && key[valuePropertyName] === undefined) {

			key = jsonKeys[i++];

		}

		if (key === undefined) {
			return;
		} // no data

		let value = key[valuePropertyName];
		if (value === undefined) {
			return;
		} // no data

		if (Array.isArray(value)) {

			do {

				value = key[valuePropertyName];

				if (value !== undefined) {

					times.push(key.time);
					values.push.apply(values, value); // push all elements

				}

				key = jsonKeys[i++];

			} while (key !== undefined);

		} else if (value.toArray !== undefined) {

			// ...assume THREE.Math-ish

			do {

				value = key[valuePropertyName];

				if (value !== undefined) {

					times.push(key.time);
					value.toArray(values, values.length);

				}

				key = jsonKeys[i++];

			} while (key !== undefined);

		} else {

			// otherwise push as-is

			do {

				value = key[valuePropertyName];

				if (value !== undefined) {

					times.push(key.time);
					values.push(value);

				}

				key = jsonKeys[i++];

			} while (key !== undefined);

		}

	},

	subclip(sourceClip, name, startFrame, endFrame, fps = 30) {

		const clip = sourceClip.clone();

		clip.name = name;

		const tracks = [];

		for (let i = 0; i < clip.tracks.length; ++i) {

			const track = clip.tracks[i];
			const valueSize = track.getValueSize();

			const times = [];
			const values = [];

			for (let j = 0; j < track.times.length; ++j) {

				const frame = track.times[j] * fps;

				if (frame < startFrame || frame >= endFrame) {
					continue;
				}

				times.push(track.times[j]);

				for (let k = 0; k < valueSize; ++k) {

					values.push(track.values[j * valueSize + k]);

				}

			}

			if (times.length === 0) {
				continue;
			}

			track.times = AnimationUtils.convertArray(times, track.times.constructor);
			track.values = AnimationUtils.convertArray(values, track.values.constructor);

			tracks.push(track);

		}

		clip.tracks = tracks;

		// find minimum .times value across all tracks in the trimmed clip

		let minStartTime = Infinity;

		for (let i = 0; i < clip.tracks.length; ++i) {

			if (minStartTime > clip.tracks[i].times[0]) {

				minStartTime = clip.tracks[i].times[0];

			}

		}

		// shift all tracks such that clip begins at t=0

		for (let i = 0; i < clip.tracks.length; ++i) {

			clip.tracks[i].shift(-1 * minStartTime);

		}

		clip.resetDuration();

		return clip;

	},

	makeClipAdditive(targetClip, referenceFrame = 0, referenceClip = targetClip, fps = 30) {

		if (fps <= 0) {
			fps = 30;
		}

		const numTracks = referenceClip.tracks.length;
		const referenceTime = referenceFrame / fps;

		// Make each track's values relative to the values at the reference frame
		for (let i = 0; i < numTracks; ++i) {

			const referenceTrack = referenceClip.tracks[i];
			const referenceTrackType = referenceTrack.ValueTypeName;

			// Skip this track if it's non-numeric
			if (referenceTrackType === 'bool' || referenceTrackType === 'string') {
				continue;
			}

			// Find the track in the target clip whose name and type matches the reference track
			const targetTrack = targetClip.tracks.find((track) => {

				return track.name === referenceTrack.name &&
					track.ValueTypeName === referenceTrackType;

			});

			if (targetTrack === undefined) {
				continue;
			}

			let referenceOffset = 0;
			const referenceValueSize = referenceTrack.getValueSize();

			if (referenceTrack.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline) {

				referenceOffset = referenceValueSize / 3;

			}

			let targetOffset = 0;
			const targetValueSize = targetTrack.getValueSize();

			if (targetTrack.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline) {

				targetOffset = targetValueSize / 3;

			}

			const lastIndex = referenceTrack.times.length - 1;
			let referenceValue;

			// Find the value to subtract out of the track
			if (referenceTime <= referenceTrack.times[0]) {

				// Reference frame is earlier than the first keyframe, so just use the first keyframe
				const startIndex = referenceOffset;
				const endIndex = referenceValueSize - referenceOffset;
				referenceValue = AnimationUtils.arraySlice(referenceTrack.values, startIndex, endIndex);

			} else if (referenceTime >= referenceTrack.times[lastIndex]) {

				// Reference frame is after the last keyframe, so just use the last keyframe
				const startIndex = lastIndex * referenceValueSize + referenceOffset;
				const endIndex = startIndex + referenceValueSize - referenceOffset;
				referenceValue = AnimationUtils.arraySlice(referenceTrack.values, startIndex, endIndex);

			} else {

				// Interpolate to the reference value
				const interpolant = referenceTrack.createInterpolant();
				const startIndex = referenceOffset;
				const endIndex = referenceValueSize - referenceOffset;
				interpolant.evaluate(referenceTime);
				referenceValue = AnimationUtils.arraySlice(interpolant.resultBuffer, startIndex, endIndex);

			}

			// Conjugate the quaternion
			if (referenceTrackType === 'quaternion') {

				const referenceQuat = new Quaternion().fromArray(referenceValue).normalize().conjugate();
				referenceQuat.toArray(referenceValue);

			}

			// Subtract the reference value from all of the track values

			const numTimes = targetTrack.times.length;
			for (let j = 0; j < numTimes; ++j) {

				const valueStart = j * targetValueSize + targetOffset;

				if (referenceTrackType === 'quaternion') {

					// Multiply the conjugate for quaternion track types
					Quaternion.multiplyQuaternionsFlat(
						targetTrack.values,
						valueStart,
						referenceValue,
						0,
						targetTrack.values,
						valueStart
					);

				} else {

					const valueEnd = targetValueSize - targetOffset * 2;

					// Subtract each value for all other numeric track types
					for (let k = 0; k < valueEnd; ++k) {

						targetTrack.values[valueStart + k] -= referenceValue[k];

					}

				}

			}

		}

		targetClip.blendMode = AdditiveAnimationBlendMode;

		return targetClip;

	}

};


// ************************************************************
// Curved Path - a curve path is simply a array of connected
//   curves, but retains the api of a curve
// ************************************************************

class CurvePath extends Curve {

	constructor() {

		super();

		this.type = 'CurvePath';

		this.curves = [];
		this.autoClose = false; // Automatically closes the path

	}

	add(curve) {

		this.curves.push(curve);

	}

	closePath() {

		// Add a line curve if start and end of lines are not connected
		const startPoint = this.curves[0].getPoint(0);
		const endPoint = this.curves[this.curves.length - 1].getPoint(1);

		if (!startPoint.equals(endPoint)) {

			this.curves.push(new LineCurve(endPoint, startPoint));

		}

	}

	// To get accurate point with reference to
	// entire path distance at time t,
	// following has to be done:

	// 1. Length of each sub path have to be known
	// 2. Locate and identify type of curve
	// 3. Get t for the curve
	// 4. Return curve.getPointAt(t')

	getPoint(t) {

		const d = t * this.getLength();
		const curveLengths = this.getCurveLengths();
		let i = 0;

		// To think about boundaries points.

		while (i < curveLengths.length) {

			if (curveLengths[i] >= d) {

				const diff = curveLengths[i] - d;
				const curve = this.curves[i];

				const segmentLength = curve.getLength();
				const u = segmentLength === 0 ? 0 : 1 - diff / segmentLength;

				return curve.getPointAt(u);

			}

			i++;

		}

		return null;

		// loop where sum != 0, sum > d , sum+1 <d

	}

	// We cannot use the default THREE.Curve getPoint() with getLength() because in
	// THREE.Curve, getLength() depends on getPoint() but in THREE.CurvePath
	// getPoint() depends on getLength

	getLength() {

		const lens = this.getCurveLengths();
		return lens[lens.length - 1];

	}

	// cacheLengths must be recalculated.
	updateArcLengths() {

		this.needsUpdate = true;
		this.cacheLengths = null;
		this.getCurveLengths();

	}

	// Compute lengths and cache them
	// We cannot overwrite getLengths() because UtoT mapping uses it.

	getCurveLengths() {

		// We use cache values if curves and cache array are same length

		if (this.cacheLengths && this.cacheLengths.length === this.curves.length) {

			return this.cacheLengths;

		}

		// Get length of sub-curve
		// Push sums into cached array

		const lengths = [];
		let sums = 0;

		for (let i = 0, l = this.curves.length; i < l; i++) {

			sums += this.curves[i].getLength();
			lengths.push(sums);

		}

		this.cacheLengths = lengths;

		return lengths;

	}

	getSpacedPoints(divisions = 40) {

		const points = [];

		for (let i = 0; i <= divisions; i++) {

			points.push(this.getPoint(i / divisions));

		}

		if (this.autoClose) {

			points.push(points[0]);

		}

		return points;

	}

	getPoints(divisions = 12) {

		const points = [];
		let last;

		for (let i = 0, curves = this.curves; i < curves.length; i++) {

			const curve = curves[i];
			const resolution = (curve && curve.isEllipseCurve) ? divisions * 2
				: (curve && (curve.isLineCurve || curve.isLineCurve3)) ? 1
					: (curve && curve.isSplineCurve) ? divisions * curve.points.length
						: divisions;

			const pts = curve.getPoints(resolution);

			for (let j = 0; j < pts.length; j++) {

				const point = pts[j];

				if (last && last.equals(point)) {
					continue;
				} // ensures no consecutive points are duplicates

				points.push(point);
				last = point;

			}

		}

		if (this.autoClose && points.length > 1 && !points[points.length - 1].equals(points[0])) {

			points.push(points[0]);

		}

		return points;

	}

	copy(source) {

		super.copy(source);

		this.curves = [];

		for (let i = 0, l = source.curves.length; i < l; i++) {

			const curve = source.curves[i];

			this.curves.push(curve.clone());

		}

		this.autoClose = source.autoClose;

		return this;

	}
}

class Path extends CurvePath {

	constructor(points) {

		super();
		this.type = 'Path';

		this.currentPoint = new Vector2();

		if (points) {

			this.setFromPoints(points);

		}

	}

	setFromPoints(points) {

		this.moveTo(points[0].x, points[0].y);

		for (let i = 1, l = points.length; i < l; i++) {

			this.lineTo(points[i].x, points[i].y);

		}

		return this;

	}

	moveTo(x, y) {

		this.currentPoint.set(x, y); // TODO consider referencing vectors instead of copying?

		return this;

	}

	lineTo(x, y) {

		const curve = new LineCurve(this.currentPoint.clone(), new Vector2(x, y));
		this.curves.push(curve);

		this.currentPoint.set(x, y);

		return this;

	}

	arc(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {

		const x0 = this.currentPoint.x;
		const y0 = this.currentPoint.y;

		this.absarc(aX + x0, aY + y0, aRadius, aStartAngle, aEndAngle, aClockwise);

		return this;

	}

	absarc(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {

		this.absellipse(aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise);

		return this;

	}

	ellipse(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation) {

		const x0 = this.currentPoint.x;
		const y0 = this.currentPoint.y;

		this.absellipse(aX + x0, aY + y0, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation);

		return this;

	}

	copy(source) {

		super.copy(source);

		this.currentPoint.copy(source.currentPoint);

		return this;

	}
}

class Shape extends Path {

	constructor(points) {

		super(points);

		this.uuid = generateUUID();

		this.type = 'Shape';

		this.holes = [];

	}

	getPointsHoles(divisions) {

		const holesPts = [];

		for (let i = 0, l = this.holes.length; i < l; i++) {

			holesPts[i] = this.holes[i].getPoints(divisions);

		}

		return holesPts;

	}

	// get points of shape and holes (keypoints based on segments parameter)

	extractPoints(divisions) {

		return {

			shape: this.getPoints(divisions),
			holes: this.getPointsHoles(divisions)

		};

	}

	copy(source) {

		super.copy(source);

		this.holes = [];

		for (let i = 0, l = source.holes.length; i < l; i++) {

			const hole = source.holes[i];

			this.holes.push(hole.clone());

		}

		return this;

	}
}

class Light extends Object3D {

	constructor(color, intensity = 1) {

		super();

		this.type = 'Light';

		this.color = new Color(color);
		this.intensity = intensity;

	}

	copy(source) {

		super.copy(source);

		this.color.copy(source.color);
		this.intensity = source.intensity;

		return this;

	}
}

Light.prototype.isLight = true;

class SpotLight extends Light {

	constructor(color, intensity, distance = 0, angle = Math.PI / 3, penumbra = 0, decay = 1) {

		super(color, intensity);

		this.type = 'SpotLight';

		this.position.copy(Object3D.DefaultUp);
		this.updateMatrix();

		this.target = new Object3D();

		this.distance = distance;
		this.angle = angle;
		this.penumbra = penumbra;
		this.decay = decay; // for physically correct lights, should be 2.
	}

	get power() {

		// compute the light's luminous power (in lumens) from its intensity (in candela)
		// by convention for a spotlight, luminous power (lm) = π * luminous intensity (cd)
		return this.intensity * Math.PI;

	}

	set power(power) {

		// set the light's intensity (in candela) from the desired luminous power (in lumens)
		this.intensity = power / Math.PI;

	}

	copy(source) {

		super.copy(source);

		this.distance = source.distance;
		this.angle = source.angle;
		this.penumbra = source.penumbra;
		this.decay = source.decay;

		this.target = source.target.clone();

		return this;

	}

}

SpotLight.prototype.isSpotLight = true;

class PointLight extends Light {

	constructor(color, intensity, distance = 0, decay = 1) {

		super(color, intensity);

		this.type = 'PointLight';

		this.distance = distance;
		this.decay = decay; // for physically correct lights, should be 2.
	}

	get power() {

		// compute the light's luminous power (in lumens) from its intensity (in candela)
		// for an isotropic light source, luminous power (lm) = 4 π luminous intensity (cd)
		return this.intensity * 4 * Math.PI;

	}

	set power(power) {

		// set the light's intensity (in candela) from the desired luminous power (in lumens)
		this.intensity = power / (4 * Math.PI);

	}

	copy(source) {

		super.copy(source);

		this.distance = source.distance;
		this.decay = source.decay;

		return this;

	}

}

PointLight.prototype.isPointLight = true;


class DirectionalLight extends Light {

	constructor(color, intensity) {

		super(color, intensity);

		this.type = 'DirectionalLight';

		this.position.copy(Object3D.DefaultUp);
		this.updateMatrix();

		this.target = new Object3D();
	}

	copy(source) {
		super.copy(source);

		this.target = source.target.clone();

		return this;
	}

}

DirectionalLight.prototype.isDirectionalLight = true;

class AmbientLight extends Light {

	constructor(color, intensity) {

		super(color, intensity);

		this.type = 'AmbientLight';

	}

}

AmbientLight.prototype.isAmbientLight = true;

/**
 * Primary reference:
 *   https://graphics.stanford.edu/papers/envmap/envmap.pdf
 *
 * Secondary reference:
 *   https://www.ppsloan.org/publications/StupidSH36.pdf
 */

// 3-band SH defined by 9 coefficients

class InstancedBufferGeometry extends BufferGeometry {
	constructor() {
		super();

		this.type = 'InstancedBufferGeometry';
	}

	copy(source) {
		super.copy(source);

		return this;
	}
}

InstancedBufferGeometry.prototype.isInstancedBufferGeometry = true;

export { AmbientLight, BoxGeometry, BufferAttribute, BufferGeometry, CatmullRomCurve3, Color, CylinderGeometry, DirectionalLight, DoubleSide, EdgesGeometry, Float32BufferAttribute, Group, InstancedBufferAttribute, InstancedBufferGeometry, Line, LineBasicMaterial, LineSegments, Matrix4, Mesh, MeshStandardMaterial, PerspectiveCamera, Points, PointLight, Quaternion, Scene, ShaderMaterial, Shape, ShapeGeometry, SphereGeometry, SpotLight, TubeGeometry, UniformsLib, Vector3, WebGLRenderer };

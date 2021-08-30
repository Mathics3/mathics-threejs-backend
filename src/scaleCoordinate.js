export default function (coordinate, extent) {
	return [
		coordinate[0] * (extent.xmax - extent.xmin) + extent.xmin,
		coordinate[1] * (extent.ymax - extent.ymin) + extent.ymin,
		coordinate[2] * (extent.zmax - extent.zmin) + extent.zmin
	];
}

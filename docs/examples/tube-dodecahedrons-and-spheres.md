<div class='center' id='graphics-container'></div>

<script>
    drawGraphics3d(
        document.getElementById('graphics-container'),
        {
            elements: [
                {
                    type: 'tube',
                    color: [0.2, 0.2, 0.2],
                    coords: [
                        [null, [0, 0, 0]],
                        [null, [1, 0, 0]],
                        [null, [1, 1, 0]],
                        [null, [1, 1, 1]],
                        [null, [1, 0, 1]],
                        [null, [0, 0, 1]],
                        [null, [0, 1, 1]],
                        [null, [0, 1, 0]]
                    ],
                    radius: 0.1
                },
				{
                    type: 'uniformPolyhedron',
                    color: [1, 0.5, 0.5],
                    coords: [
                        [[0, 0, 0]],
                        [[2, 2, 2]]
                    ],
                    edgeForm: { showEdges: false },
                    opacity: 0.5, // 50% of opacity
                    subType: 'dodecahedron'
                },
				{
                    type: 'sphere',
                    color: [0.5, 0.5, 1],
                    coords: [
                        [[0, 0, 0]],
                        [[1, 1, 1]],
                        [[2, 2, 2]]
                    ],
                    edgeForm: { showEdges: false },
                    opacity: 0.7, // 70% of opacity
					radius: 0.5,
                    subType: 'dodecahedron'
                }
            ],
            lighting: [
                {
                    type: 'ambient',
                    color: [0.5, 0.5, 0.5]
                },
                {
                    type: 'directional',
                    color: [0.8, 0, 0],
                    coords: [null, [2, 0, 2]]
                },
                {
                    type: 'directional',
                    color: [0, 0.8, 0],
                    coords: [null, [2, 2, 2]]
                },
                {
                    type: 'directional',
                    color: [0, 0, 0.8],
                    coords: [null, [0, 2, 2]]
                }
            ],
            viewpoint: [2, -4, 4]
        }
    );
</script>

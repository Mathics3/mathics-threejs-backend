<div class='center' id='graphics-container'></div>

<script>
    drawGraphics3d(
        document.getElementById('graphics-container'),
        {
            elements: [
                {
                    type: 'sphere',
                    color: [1, 1, 1],
                    radius: 1,
                    coords: [[[0, 0, 0]]]
                },
                {
                    type: 'cuboid',
                    color: [1, 1, 1],
                    coords: [[[1, 2, -1]], [[2, 3, 1]]],
                    edgeForm: { showEdges: false }
                },
                {
                    type: 'uniformPolyhedron',
                    subType: 'dodecahedron',
                    color: [1, 1, 1],
                    coords: [[[3, -1, 0]]]
                }
            ],
            lighting: [
                {
                    type: 'directional',
                    color: [1, 0.5, 0],
                    coords: [[1, 1, 1]]
                }
            ],
            viewpoint: [2, -4, 4]
        }
    );
</script>

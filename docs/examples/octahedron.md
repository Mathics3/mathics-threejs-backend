<div class='center' id='graphics-container'></div>

<script>
    drawGraphics3d(
        document.getElementById('graphics-container'),
        {
            elements: [
                {
                    type: 'uniformPolyhedron',
                    color: [1, 0.5, 1],
                    coords: [
                        [[0, 0, 0]]
                    ],
                    edgeForm: { showEdges: false },
                    subType: 'octahedron'
                }
            ],
            lighting: [
                {
                    type: 'directional',
                    color: [1, 1, 1],
                    coords: [[1, 1, 1]]
                }
            ],
            viewpoint: [2, -4, 4]
        }
    );
</script>

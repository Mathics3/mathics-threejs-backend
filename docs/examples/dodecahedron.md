<div class='center' id='graphics-container'></div>

<script>
    drawGraphics3d(
        document.getElementById('graphics-container'),
        {
            elements: [
                {
                    type: 'uniformPolyhedron',
                    color: [0.5, 0.5, 1],
                    coords: [
                        [[0, 0, 0]],
                        [[2, 2, 2]],
                    ],
                    edgeForm: { showEdges: false },
                    opacity: 0.7, // 70% of opacity
                    subType: 'dodecahedron'
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

<div class='center' id='graphics-container'></div>

<script>
    drawGraphics3d(
        document.getElementById('graphics-container'),
        {
            elements: [
                {
                    type: 'cuboid',
                    color: [1, 1, 1],
                    coords: [
                        [[-1, -1, -1]], // cube begin
                        [[0, 0, 0]],    // cube end
                        [[0, 0, 0]],    // parallelepiped begin
                        [[1, 2, 1]]     // parallelepiped end
                    ],
                    edgeForm: { showEdges: false }
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

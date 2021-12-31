<div class='center' id='graphics-container'></div>

<script>
    drawGraphics3d(
        document.getElementById('graphics-container'),
        {
            elements: [
                {
                    type: 'cylinder',
                    color: [1, 1, 1],
                    coords: [
                        [[-1, -1, -1]], // first cylinder begin
                        [[0, 0, 0]],    // first cylinder end
                        [[0, 0, 0]],    // second cylinder begin
                        [[1, 1, 1]]     // second cylinder end
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

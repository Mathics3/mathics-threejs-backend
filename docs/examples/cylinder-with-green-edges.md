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
                        [null, [0.25, 0.25, 0.25]],
                        [null, [0.75, 0.75, 0.75]]
                    ],
                    edgeForm: { color: [0, 1, 0] },
                    radius: 0.25
                }
            ],
            lighting: [
                {
                    type: 'directional',
                    color: [0.5, 0.5, 0.5],
                    coords: [null, [0, 0, 0]]
                }
            ],
            viewpoint: [-1, 2, 4]
        }
    );
</script>

<div class='center' id='graphics-container'></div>

<script>
    drawGraphics3d(
        document.getElementById('graphics-container'),
        {
            elements: [
                {
                    type: 'tube',
                    color: [1, 1, 1],
                    coords: [
                        [[0, 0, 0]],
                        [[1, 1, 1]]
                    ]
                }
            ],
            lighting: [
                {
                    type: 'directional',
                    color: [1, 0, 0],
                    coords: [null, [1, 1, 1]]
                },
            ],
            viewpoint: [2, -4, 4]
        }
    );
</script>

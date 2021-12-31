<div class='center' id='graphics-container'></div>

<script>
    drawGraphics3d(
        document.getElementById('graphics-container'),
        {
            elements: [
                {
                    type: 'polygon',
                    color: [1, 1, 1],
                    coords: [
                        [[0, 0, 0]],
                        [[1, 1, 1]],
                        [[0, 1, 1]]
                    ],
                    opacity: 0.4 // 40% of opacity
                }
            ],
            lighting: [
                {
                    type: 'ambient',
                    color: [1, 1, 0]
                }
            ],
            viewpoint: [2, -4, 4]
        }
    );
</script>

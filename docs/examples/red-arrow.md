<div class='center' id='graphics-container'></div>

<script>
    drawGraphics3d(
        document.getElementById('graphics-container'),
        {
            elements: [
                {
                    type: 'arrow',
                    color: [1, 0, 0],
                    coords: [
                        [[0, 0, 0]],
                        [[1, 0, 0]],
                        [[1, 1, 0]],
                        [[1, 1, 1]]
                    ],
                    opacity: 0.5, // 50% of opacity
                }
            ],
            viewpoint: [2, -4, 4]
        }
    );
</script>

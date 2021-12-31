<div class='center' id='graphics-container'></div>

<script>
    drawGraphics3d(
        document.getElementById('graphics-container'),
        {
            elements: [
                {
                    type: 'point',
                    color: [0, 0, 0],
                    coords: [
                        [[0, 0, 0]]
                    ],
                    pointSize: 0.5 // 50% of the canvas size
                }
            ],
            viewpoint: [2, -4, 4]
        }
    );
</script>

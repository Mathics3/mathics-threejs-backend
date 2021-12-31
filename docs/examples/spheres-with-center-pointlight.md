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
                    type: 'sphere',
                    color: [1, 1, 1],
                    radius: 1,
                    coords: [[[3, 0, 0]]]
                },
                {
                    type: 'sphere',
                    color: [1, 1, 1],
                    radius: 1,
                    coords: [[[0, 3, 0]]]
                },
                {
                    type: 'sphere',
                    color: [1, 1, 1],
                    radius: 1,
                    coords: [[[3, 3, 0]]]
                }
            ],
            lighting: [
                {
                    type: 'point',
                    color: [0, 1, 0],
                    coords: [[2, 2, 2]]
                }
            ],
            viewpoint: [2, -4, 4]
        }
    );
</script>

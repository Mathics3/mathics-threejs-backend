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
                        [[1, 0, 0]],
                        [[1, 1, 0]],
                        [[1, 1, 1]],
                        [[1, 0, 1]],
                        [[0, 0, 1]],
                        [[0, 1, 1]],
                        [[0, 1, 0]]
                    ],
                    radius: 0.1
                }
            ],
            lighting: [
                {
                    type: 'ambient',
                    color: [0.3, 0.2, 0.4]
                },
                {
                    type: 'directional',
                    color: [0.8, 0, 0],
                    coords: [[2, 0, 2]]
                },
                {
                    type: 'directional',
                    color: [0, 0.8, 0],
                    coords: [[2, 2, 2]]
                },
                {
                    type: 'directional',
                    color: [0, 0, 0.8],
                    coords: [[0, 2, 2]]
                }
            ],
            viewpoint: [-2, -2, 2]
        }
    );
</script>

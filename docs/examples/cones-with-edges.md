<div class='center' id='graphics-container'></div>

<script>
    drawGraphics3d(
        document.getElementById('graphics-container'),
        {
            elements: [
                {
                    type: 'cone',
                    color: [1, 1, 1],
                    coords: [
                        [[-1, -1, -1]], // first cone begin
                        [[0, 0, 0]],    // first cone end
                        [[1, 1, 1]],    // second cone begin
                        [[0, 0, 0]]     // second cone end
                    ],
                    edgeForm: { color: [1, 0, 0] }
                }
            ],
            lighting: [
                {
                    type: 'ambient',
                    color: [0.3, 0.2, 0.4]
                },
                {
                    type: 'spot',
                    color: [0.8, 0, 0],
                    coords: [[0, 0, 1.1]],
                    target: [[0, 0, 0]]
                },
                {
                    type: 'spot',
                    color: [0, 0, 0.8],
                    coords: [[1.1, 0, 0]],
                    target: [[0, 0, 0]]
                }
            ],
            viewpoint: [-2.5, -2, 2]
        }
    );
</script>

<div class='center' id='graphics-container'></div>

<script>
    drawGraphics3d(
        document.getElementById('graphics-container'),
        {
            elements: [
                {
                    type: 'cuboid',
                    color: [0.25, 0, 0], // dark red
                    coords: [
                        [null, [0, 0, 0]], // lower-left-front corner of the bounding box
                        [null, [0.5, 0.5, 0.5]], // center of the bounding box
                    ],
                    edgeForm: {
                        color: [0, 0, 1] // blue
                    },
                    opacity: 0.9 // 90% of opacity
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

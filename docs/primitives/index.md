Primitives are basic 3d objects that can build more complex shapes.
For example, a 3d plot can be converted into [polygons](polygon).

If you are using this library as a backend to a Wolfram-Language-like project
that supports [Plot3D](https://reference.wolfram.com/language/ref/Plot3D.html)
you may convert that to a
[Graphics3D](https://reference.wolfram.com/language/ref/Graphics3D.html)
object (this library goal is to fully support it), or create a conversion
function for every plot function.

An *example* of conversion code for a
[ListPlot3D](https://reference.wolfram.com/language/ref/ListPlot3D.html):
```py
import json

def list_plot_3d(coordinate_list: list) -> str:
    polygons: list = []

    for i in range(len(coordinate_list) - 1):
        for j in range(len(coordinate_list[0]) - 1):
            polygons.append([
                [i, j, coordinate_list[i][j]],
                [i + 1, j + 1, coordinate_list[i + 1][j + 1]],
                [i, j + 1, coordinate_list[i][j + 1]],
            ])
            polygons.append([
                [i, j, coordinate_list[i][j]],
                [i + 1, j + 1, coordinate_list[i + 1][j + 1]],
                [i, j + 1, coordinate_list[i + 1][j]],
            ])

    json_object: dict = {
        "elements": [
            {
                "type": "polygon",
                "color": [1, 1, 1],
                "coords": polygon,
            } for polygon in polygons
        ],
        "lighting": [{ "type": "ambient", "color": [1, 1, 1] }],
        "viewpoint": [2, -4, 4],
    }

    return json.dumps(json_object)
```

The list of primitives is the following:
- [arrow](arrow)
- [cone](cone)
- [cuboid](cuboid)
- [cylinder](cylinder)
- [line](line)
- [point](point)
- [polygon](polygon)
- [sphere](sphere)
- [tube](tube)
- [uniformPolyhedron](uniformPolyhedron)

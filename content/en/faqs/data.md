## What data is being used?

The a11y-Score is calculated using data that is freely available via [OpenStreetMap](www.openstreetmap.org) (OSM). OSM is a collaborative world map created and maintained by volunteers. For more information on how the a11y-Score is calculated, please see [How is the a11y-Score calculated?](/faqs/how-is-it-calculated).

The foundation for the accessibility criteria we evaluate consists of so-called [Tags](https://wiki.openstreetmap.org/wiki/Tags). A tag is essentially a label that is attached to an object on the map. It provides information that goes beyond pure geography (the location). Without tags, a point on the map would just be a coordinate without meaning.
A tag always consists of two parts: a key and a value. This is usually written as: `Key=Value`.

Tags allow computers to "understand" and filter the map. For example, to calculate how accessible a train station is, the a11y-Score algorithm looks for specific tags such as `tactile_paving=yes` (tactile paving available) or `wheelchair=yes` (place is wheelchair accessible).

The following tables contain a list of the OSM tags that are used to select places and geometries for each category. Additionally, there is a list of the OSM tags that are used for the accessibility criteria.

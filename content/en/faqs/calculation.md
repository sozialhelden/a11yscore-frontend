## How is the a11y-Score calculated?

The a11y-Score is based on open data from [OpenStreetMap](https://www.openstreetmap.org) (OSM for short). OSM is a map created and maintained by volunteers all over the world.

## Categories of the physical world

To evaluate the accessibility of the physical world, it is divided into many different categories, which are in turn divided into further subcategories. For example, the main category "Public Transport" includes several subcategories such as "Bus Platforms" and "Train Stations".

## Accessibility criteria

We define a list of criteria for each subcategory. Does a place meet all the criteria? Then it is considered accessible for the a11y-Score. For the "Train Stations" subcategory, for example, we include whether every area in the building is accessible to people in wheelchairs. Tactile paving systems, real-time departure boards, acoustic announcements, and many other criteria are also considered.

For each location and each criterion, we assign points between 0 and 100. Here is an example for the `Mobility` criterion:
- A place is fully wheelchair accessible: 100 points
- A place is partially wheelchair accessible: 50 points
- A place is not wheelchair accessible: 10 points
- A place has no information about wheelchair accessibility: 0 points

## Weighting of the criteria

Since the criteria have different levels of influence on actual accessibility, we apply weights to them. For example, in the case of train stations, whether the building is accessible to people in wheelchairs at all might carry more weight than whether there are grab rails on both sides in the station toilets.

## Data quality

The amount of accessibility data available in OSM varies from place to place, as the map is maintained by volunteers. Therefore, the rating algorithm also incorporates data quality. Criteria with poor data availability are weighted lower than those with good data availability.

## Calculation of the a11y-Score

Using the weighted criteria and data quality, the program calculates a score for each subcategory. These category scores are weighted again and averaged to obtain a score for the parent category. The overall a11y-Score for the region is then calculated from the weighted and averaged scores of the parent categories.

### Further information

* [Overview of the data used](/faqs/what-data-is-being-used)
* [Technical documentation of the algorithm](https://github.com/sozialhelden/a11yscore/blob/main/docs/index.md)
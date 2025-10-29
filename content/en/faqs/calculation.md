## How is it calculated?

The a11y score is calculated using open data based on [OpenStreetMap (OSM)](https://www.openstreetmap.org/). OSM is a collaborative map of the world created and maintained by volunteers.

### Categorization of the physical world

In order to evaluate the accessibility of the physical world, it is divided into many different categories, which are in turn divided into further subcategories. For example, there is the category “Transport,” which is further divided into “Bus stops” or “Train stations.”

### Accessibility criteria

We define a list of criteria for each subcategory, e.g., “train station.” If a location meets all criteria, it is considered accessible for the a11y-Score. For train stations, for example, we include wheelchair accessibility. This means that every area of the building is accessible at ground level. Floor guidance systems, real-time departure boards, and audio announcements are also included, along with many other criteria.

### Weighting of criteria

Since the criteria have varying degrees of influence on actual accessibility, they are weighted. For example, the wheelchair accessibility of a train station could be weighted differently than the presence of grab bars on both sides of a toilet.

### Data quality

Data completeness in OSM can vary locally, as the map is maintained by volunteers. Therefore, the a11y-Score takes data quality into account. Criteria with incomplete data are weighted lower, if possible.

### Calculation of the a11y-Score

Based on the weighted criteria and data quality, the system ultimately calculates an a11y score for each category. These category scores are weighted again and then averaged to obtain an overall score for a region.

### Further information

* [Overview of the data used](/faqs/what-data-is-being-used)
* [Technical documentation of the algorithm](https://github.com/sozialhelden/a11yscore/blob/main/docs/index.md)

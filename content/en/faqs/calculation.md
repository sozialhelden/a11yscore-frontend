## How is it calculated?

The a11y-Score is calculated using open data based on [Open Street Map (OSM)](https://www.openstreetmap.org/). OSM is a collaborative map of the world created and maintained by volunteers.

### Categorization of the physical world

In order to evaluate the accessibility of the physical world, it is divided into many different categories, which are in turn divided into further subcategories. For example, there is the category “Transport,” which is further divided into “Bus stops” or “Train stations.”

### Accessibility criteria

A list of criteria is now defined for each subcategory, e.g., “train station.” If all criteria are met, this location is considered accessible for the a11y-Score. For train stations, this could mean, for example, that they are wheelchair accessible - e.g. every area is accessible via ramps or elevators - or that they have a tactile guidance system.

### Weighting of criteria

These criteria are then weighted to reflect their importance for accessibility. For example, the wheelchair accessibility of a train station could be weighted more heavily than the presence of a toilet with grab bars.

### Data quality

The quality of data in OSM can vary because it is maintained by volunteers. Therefore, data quality is also included in the calculation of the a11y-Score. Criteria for which the data is unclear or incomplete are weighted lower accordingly.

### Calculation of the a11y-Score

An a11y-Score is then calculated for each category based on the weighted criteria and data quality. These scores are then weighted and aggregated to obtain an overall score for a specific region.

### Further information

* [Overview of the data used](/faqs/what-data-is-being-used)
* [Technical documentation of the algorithm](https://github.com/sozialhelden/a11yscore/blob/main/docs/index.md)

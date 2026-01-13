## Für welche Regionen ist der a11y-Score verfügbar?

In der jetzigen Version des a11y-Score kann die Barrierefreiheit von den 16 Bundesländern sowie 418 kreisfreien Städten und Landkreisen in Deutschland berechnet werden. Die Grundlage für diese Regionen bilden dabei die sogenannten [administrativen Grenzen](https://wiki.openstreetmap.org/wiki/Tag:boundary%3Dadministrative) von OpenStreetMap. 

### Administrative Ebenen 
Da jedes Land seine eigene Verwaltungsstruktur hat (z. B. Bundesländer in Deutschland, Kantone in der Schweiz oder Departments in Frankreich), nutzt OSM eine numerische Skala von 2 bis 10, um diese Hierarchie abzubilden.
Je niedriger die Zahl, desto größer und übergeordneter ist das Gebiet.

Aktuell benutzt der a11-Score die [Administrativen Ebenen](https://wiki.openstreetmap.org/wiki/Key:admin_level) 4 - 6:

- **Ebene 4**: Die 16 Bundesländer, z. B. Berlin, Bayern, Nordrhein-Westfalen. 
- **Ebene 5**: Regierungsbezirke, z.B. Regierungsbezirk Freiburg. Nicht jedes Bundesland hat solche.
- **Ebene 6**: Landkreise und kreisfreie Städte, z.B. Landkreis Segeberg, kreisfreie Stadt Aachen.
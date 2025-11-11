## Wie wird der a11y-Score berechnet?

Der a11y-Score wird mit offenen Daten basierend auf der [OpenStreetMap (OSM)](https://www.openstreetmap.org/) berechnet. OSM ist eine kollaborative Karte der Welt, die von Freiwilligen erstellt und gepflegt wird.

### Kategorisierung der physischen Welt

Um die Barrierefreiheit der physischen Welt bewerten zu können, wird diese in viele verschiedenen Kategorien unterteilt, die wiederum in weitere Unterkategorien unterteilt werden. Zum Beispiel gibt es die Kategorie "Transport", die weiter in z.B. "Bushaltestellen" oder "Bahnhöfe" unterteilt ist. 

### Kriterien der Barrierefreiheit

Für jede Unterkategorie, z.B. "Bahnhof", legen wir eine Liste an Kriterien fest. Ein Ort erfüllt alle Kriterien? Dann gilt er für den a11y-Score als barrierefrei. Für Bahnhöfe beziehen wir zum Beispiel die Rollstuhlgerechtigkeit ein – also dass jeder Bereich im Bauwerk ebenerdig zugänglich ist. Genauso werden Boden-Leitsysteme zum Tasten, Echtzeit-Abfahrtstafeln und akustische Durchsagen neben vielen anderen Kriterien einbezogen.

### Gewichtung der Kriterien

Da die Kriterien einen unterschiedlich starken Einfluss auf die tatsächliche Barrierefreiheit haben, werden sie gewichtet. Zum Beispiel könnte die Rollstuhlgerechtigkeit eines Bahnhofs anders gewichtet werden als das Vorhandensein von beidseitigen Haltegriffen an einer Toilette.

### Datenqualität

Die Daten-Vollständigkeit in OSM kann örtlich variieren, da die Karte von Freiwilligen gepflegt wird. Daher bezieht der a11y-Score die Datenqualität mit ein. Kriterien mit unvollständiger Datenlage werden – wenn möglich – entsprechend niedriger gewichtet.

### Berechnung des a11y-Scores

Anhand der gewichteten Kriterien und der Datenqualität berechnet das System letztendlich für jede Kategorie einen a11y-Score. Diese Kategorie-Scores werden erneut gewichtet und dann gemittelt, um einen Gesamt-Score für eine Region zu erhalten.

### Weiterführende Informationen

* [Übersicht über die benutzten Daten](/faqs/what-data-is-being-used)
* [Technische Dokumentation des Algorithmus (Englisch)](https://github.com/sozialhelden/a11yscore/blob/main/docs/index.md)

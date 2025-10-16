## Wie wird der a11y-Score berechnet?

Der a11y-Score wird mit offenen Daten basierend auf der [Open Street Map (OSM)](https://www.openstreetmap.org/) berechnet. OSM ist eine kollaborative Karte der Welt, die von Freiwilligen erstellt und gepflegt wird.

### Kategorisierung der physischen Welt

Um die Barrierefreiheit der physischen Welt bewerten zu können, wird diese in viele verschiedenen Kategorien unterteilt, die wiederum in weitere Unterkategorien unterteilt werden. Zum Beispiel gibt es die Kategorie "Transport", die weiter in z.B. "Bushaltestellen" oder "Bahnhöfe" unterteilt ist. 

### Kriterien der Barrierefreiheit

Für jede Unterkategorie, z.B. "Bahnhof" wird jetzt eine Liste an Kriterien festgelegt. Falls alle Kriterien erfüllt sind, gilt dieser Ort für den a11y-Score als barrierefrei. Für Bahnhöfe könnten das z.B. sein, dass sie rollstuhlgerecht sind - also jeder Bereich über Rampen oder Aufzüge zugänglich ist - oder dass sie ein taktiles Leitsystem haben.

### Gewichtung der Kriterien

Diese Kriterien werden dann gewichtet, um ihre Wichtigkeit für die Barrierefreiheit zu reflektieren. Zum Beispiel könnte die Rollstuhlgerechtigkeit eines Bahnhofs höher gewichtet werden als das Vorhandensein einer Toilette mit Haltegriffen.

### Datenqualität

Die Qualität der Daten in OSM kann variieren, da sie von Freiwilligen gepflegt werden. Daher wird die Datenqualität ebenfalls in die Berechnung des a11y-Scores einbezogen. Kriterien bei denen die Datenlage unklar oder unvollständig ist, werden entsprechend niedriger gewichtet.

### Berechnung des a11y-Scores

Anhand der gewichteten Kriterien und der Datenqualität wird dann für jede Kategorie ein a11y-Score berechnet. Diese Scores werden dann wiederum gewichtet aggregiert um einen Gesamtscore für eine bestimmte Region zu erhalten.

### Weiterführende Informationen

* [Übersicht über die benutzten Daten](/faqs/what-data-is-being-used)
* [Technische Dokumentation des Algorithmus (Englisch)](https://github.com/sozialhelden/a11yscore/blob/main/docs/index.md)

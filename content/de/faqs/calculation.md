## Wie wird der a11y-Score berechnet?
Der a11y-Score basiert auf den offenen Daten von [OpenStreetMap](https://www.openstreetmap.org) (kurz: OSM). OSM ist eine Karte, die von Freiwilligen auf der ganzen Welt erstellt und gepflegt wird.
## Kategorien der physischen Welt
Um die Barrierefreiheit der physischen Welt zu bewerten, wird diese in viele verschiedenen Kategorien unterteilt, die wiederum in weitere Unterkategorien unterteilt werden. Zum Beispiel gibt es die Kategorie "Transport", welche unter anderem die Unterkategorien "Bushaltestelle" und "Bahnhof" enthält.
## Kriterien der Barrierefreiheit
Für jede Unterkategorie legen wir eine Liste an Kriterien fest. Ein Ort erfüllt alle Kriterien? Dann gilt er für den a11y-Score als barrierefrei. Für die Unterkategorie “Bahnhöfe” beziehen wir zum Beispiel ein, ob jeder Bereich im Bauwerk für Menschen mit Rollstuhl zugänglich ist. Auch Boden-Leitsysteme zum Tasten, Abfahrtstafeln in Echtzeit und akustische Durchsagen und viele weitere Kriterien fließen mit ein.

Für jeden Ort und jedes Kriterium vergeben wir Punkte zwischen 0 und 100. Hier ein Beispiel für das Kriterium ``Mobilität``:
- Ein Ort ist voll rollstuhlgerecht: 100 Punkte
- Ein Ort ist teilweise rollstuhlgerecht: 50 Punkte
- Ein Ort ist nicht rollstuhlgerecht: 10 Punkte
- Ein Ort hat keine Information über Rollstuhlgerechtigkeit: 0 Punkte
## Gewichtung der Kriterien
Da die Kriterien einen unterschiedlich starken Einfluss auf die tatsächliche Barrierefreiheit haben, werden sie gewichtet. Zum Beispiel könnte es bei Bahnhöfen unterschiedlich ins Gewicht fallen, ob das Gebäude für Menschen mit Rollstuhl überhaupt zugänglich ist oder ob es in den Bahnhofstoiletten beidseitige Haltegriffe gibt.
## Datenqualität
Wie viele Daten zur Barrierefreiheit  in OSM verfügbar sind, ist von Ort zu Ort unterschiedlich, da die Karte von Freiwilligen gepflegt wird. Daher bezieht der a11y-Score die Datenqualität mit ein. Kriterien mit schlechter Datenlage werden niedriger gewichtet als solche mit guter Datenlage.
## Berechnung des a11y-Scores
Anhand der gewichteten Kriterien und der Datenqualität berechnet das Programm für jede Unterkategorie einen Score. Diese Kategorie-Scores werden erneut gewichtet und gemittelt, um einen Score für die Oberkategorie zu erhalten. Der gesamte a11y-Score für die Region errechnet sich dann wiederum aus den gewichteten und gemittelten Scores der Oberkategorien.

### Weitere Informationen

* [Übersicht über die benutzten Daten](/faqs/what-data-is-being-used)
* [Technische Dokumentation des Algorithmus (Englisch)](https://github.com/sozialhelden/a11yscore/blob/main/docs/index.md)

## Welche Daten werden dabei herangezogen?

Der a11y-Score wird aus Daten berechnet, die über [OpenStreetMap](https://www.openstreetmap.org) (OSM) frei verfügbar sind. OSM ist eine kollaborative Weltkarte, die von Freiwilligen erstellt und gepflegt wird. Weitere Informationen zur Berechnung des a11y-Scores finden Sie unter [Wie wird der a11y-Score berechnet?](/faqs/how-is-it-calculated)

### OSM Tags
Die Grundlage für die Barrierefreiheitskriterien, die wir auswerten, bilden sogenannte [Tags](https://wiki.openstreetmap.org/wiki/Tags). Ein Tag ist im Grunde ein Etikett, das an ein Objekt auf der Karte geklebt wird. Es liefert die Informationen, die über die reine Geografie (den Standort) hinausgehen. Ohne Tags wäre ein Punkt auf der Karte nur eine Koordinate ohne Bedeutung.
Ein Tag besteht immer aus zwei Teilen: einem Schlüssel (Key) und einem Wert (Value). Man schreibt das meistens so: `Schlüssel=Wert`.

Tags ermöglichen es Computern, die Karte zu "verstehen" und zu filtern. Um zum Beispiel zu berechnen, wie barrierefrei ein Bahnhof ist, schaut der Algorithmus des a11y-Scores nach ganz bestimmten Tags wie `tactile_paving=yes` (Boden-Leitsystem vorhanden) oder `wheelchair=yes` (Ort ist rollstuhlgerecht).


Die folgenden Tabellen enthalten eine Liste der OSM-Tags, die zur Auswahl von Orten und Geometrien für jede Kategorie verwendet werden. Zusätzlich gibt es eine Liste der OSM-Tags, die für die Barrierefreiheitskriterien verwendet werden.

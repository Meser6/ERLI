# ERLI

### Założenia:

Cena podana w price to cena przed zastosowaniem obnizki wynikającej z tagu.

Cena podana w price to cena za wszystkie produkty, a nie pojedyńczy.

Prowizja składa sie z ceny (ewentualnie pomiejszonej o ½ należnego rabatu) \* % prowizji + koszty wysyłki. Nie liczy się zatem prowizji od wysyłki.

Wysyłka nie jest uwzględniona w price.

Gdy wystąpią dwa niedozwolone tagi jednocześnie to całe zamówienie jest niepoprawne i nie ma sensu liczyć prowizji.

Wyściowa prowizja od ktorej liczone są jej wariacje to 10%.

Podstawę do liczenia rabatu liczymy od ceny wyjściowej (przed rabatem) a nie po.
Przykład:
Cena standardowa produktu dla kupującego obniżana jest o 10%. Cena produktu do obliczenia prowizji obniżana jest o połowę obniżki dla kupującego.
-Cena produktu przed obniżką: 100zł
-Cena produktu dla kupującego: 95zł
-Cena od której liczymy prowizje: 97,50zł [ 100-(100-95)/2 ]
-Prowizja do zapłaty = 97,5\*0,05 = 4,88

Zaokrąglamy zgodnie z zasadami matematyki.

## Abu uruchomić test użyj:

`npm run test`

Wynik testu możesz znaleźć w rejectedOrders.csv

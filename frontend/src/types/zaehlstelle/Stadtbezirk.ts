export const StadtbezirkToBeschreibung = new Map<number, string>([
    [1, "1 Altstadt - Lehel"],
    [2, "2 Ludwigsvorstadt - Isarvorstadt"],
    [3, "3 Maxvorstadt"],
    [4, "4 Schwabing West"],
    [5, "5 Au - Haidhausen"],
    [6, "6 Sendling"],
    [7, "7 Sendling - Westpark"],
    [8, "8 Schwanthalerhöhe"],
    [9, "9 Neuhausen - Nymphenburge"],
    [10, "10 Moosach"],
    [11, "11 Milbertshofen - Am Hart"],
    [12, "12 Schwabing - Freimann"],
    [13, "13 Bogenhausen"],
    [14, "14 Berg am Laim"],
    [15, "15 Trudering - Riem"],
    [16, "16 Ramersdorf - Perlach"],
    [17, "17 Obergiesing - Fasangarten"],
    [18, "18 Untergiesing - Harlaching"],
    [19, "19 Thalkirchen - Obersendling - Forstenried - Fürstenried - Solln"],
    [20, "20 Hadern"],
    [21, "21 Pasing - Obermenzing"],
    [22, "22 Aubing - Lochhausen - Langwied"],
    [23, "23 Allach - Untermenzing"],
    [24, "24 Feldmoching - Hasenbergl"],
    [25, "25 Laim"],
    [32, "32 Außerhalb der Stadtgrenze"],
]);

export const BeschreibungToStadtbezirk = new Map(
    [...StadtbezirkToBeschreibung].reverse()
);

import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";



import { describe, expect, it } from "vitest";



import { useStrassennameUtils } from "@/util/StrassennameUtils";


describe("StrassennamenUtils", () => {
  // getStreetname ------------------------------------
  it("getStreetname: kurze Straße bleibt ein Element", () => {
    const { getStreetLines } = useStrassennameUtils();
    const result = getStreetLines({ strassenname: "Hauptstr." } as any);
    expect(result).toEqual(["Hauptstr."]);
  });

  it("getStreetname: lange Straße mit 'str.' wird gesplittet", () => {
    const { getStreetLines } = useStrassennameUtils();
    const long = "SehrlangeBeispielstr.";
    const res = getStreetLines({ strassenname: long } as any);
    expect(res.length).toBe(2);
    expect(res[0]).toBe("SehrlangeBeispiel-");
    expect(res[1]).toBe("str.");
  });

  it("getStreetLines: langer Straßename mit 'strasse' wird gesplittet", () => {
    const { getStreetLines } = useStrassennameUtils();
    const long = "Himmelschlüsselstrasse";
    const res = getStreetLines({ strassenname: long } as any);
    expect(res[0]).toBe("Himmelschlüssel-");
    expect(res[1]).toBe("strasse");
  });

  it("getStreetLines: Straßename mit genau Länge 20", () => {
    const { getStreetLines } = useStrassennameUtils();
    const long = "Marienklausenbrücke";
    const res = getStreetLines({ strassenname: long } as LadeKnotenarmDTO, 20);
    expect(res[0]).toBe("Marienklausenbrücke");
  });

  it("getStreetLines: Straßename mit genau Länge 17", () => {
    const { getStreetLines } = useStrassennameUtils();
    const long = "Marienklausenbrücke";
    const res = getStreetLines({ strassenname: long } as LadeKnotenarmDTO, 17);
    expect(res[0]).toBe("Marienklausen-");
    expect(res[1]).toBe("brücke");
  });

  it("getStreetLines: langer Straßename mit Abkürzung '...'", () => {
    const { getStreetLines } = useStrassennameUtils();
    const long = "Elisabeth-zu-Gutten...str.";
    const res = getStreetLines({ strassenname: long } as any);
    expect(res[0]).toBe("Elisabeth-zu-");
    expect(res[1]).toBe("Gutten...-str.");
  });

  it("getStreetLines: Platz der Opfer des Nationalsozialismus", () => {
    const { getStreetLines } = useStrassennameUtils();
    const long = "Platz der Opfer des Nationalsozialismus";
    const res = getStreetLines({ strassenname: long } as any);
    expect(res[0]).toBe("Platz der Opfer des ");
    expect(res[1]).toBe("Nationalsozialismus");
  });

  it("getStreetLines: Mathilde-Berghofer-Weichner-Strasse", () => {
    const { getStreetLines } = useStrassennameUtils();
    const long = "Mathilde-Berghofer-Weichner-Strasse";
    const res = getStreetLines({ strassenname: long } as any);
    expect(res[0]).toBe("Mathilde-Berghofer-");
    expect(res[1]).toBe("Weichner-Strasse");
  });

  it("getStreetLines: Autobahn-Raststätte-Obermenzing", () => {
    const { getStreetLines } = useStrassennameUtils();
    const long = "Autobahn-Raststätte-Obermenzing";
    const res = getStreetLines({ strassenname: long } as any);
    expect(res[0]).toBe("Autobahn-Raststätte-");
    expect(res[1]).toBe("Obermenzing");
  });

  it("getStreetLines: Margarete-Schütte-Lihotzky-Str.", () => {
    const { getStreetLines } = useStrassennameUtils();
    const long = "Margarete-Schütte-Lihotzky-Str.";
    const res = getStreetLines({ strassenname: long } as any);
    expect(res[0]).toBe("Margarete-Schütte-");
    expect(res[1]).toBe("Lihotzky-Str.");
  });

  it("getStreetLines: Anneliese-Fleyenschmidt-Straße", () => {
    const { getStreetLines } = useStrassennameUtils();
    const long = "Anneliese-Fleyenschmidt-Straße";
    const res = getStreetLines({ strassenname: long } as any);
    expect(res[0]).toBe("Anneliese-");
    expect(res[1]).toBe("Fleyenschmidt-Straße");
  });

  it("getStreetLines: Clementine-von-Braunmühl-Weg", () => {
    const { getStreetLines } = useStrassennameUtils();
    const long = "Clementine-von-Braunmühl-Weg";
    const res = getStreetLines({ strassenname: long } as any);
    expect(res[0]).toBe("Clementine-von-");
    expect(res[1]).toBe("Braunmühl-Weg");
  });

  it("getStreetLines: Elisabeth-zu-Gutt...-Str.", () => {
    const { getStreetLines } = useStrassennameUtils();
    const long = "Elisabeth-zu-Gutt...-Str.";
    const res = getStreetLines({ strassenname: long } as any);
    expect(res[0]).toBe("Elisabeth-zu-");
    expect(res[1]).toBe("Gutt...-Str.");
  });

  it("getStreetLines: Rainer-Werner-Fassbinder-Pl.", () => {
    const { getStreetLines } = useStrassennameUtils();
    const long = "Rainer-Werner-Fassbinder-Pl.";
    const res = getStreetLines({ strassenname: long } as any);
    expect(res[0]).toBe("Rainer-Werner-");
    expect(res[1]).toBe("Fassbinder-Pl.");
  });

  it("getStreetLines: Rainer-Werner Fassbinder Pl.", () => {
    const { getStreetLines } = useStrassennameUtils();
    const long = "Rainer-Werner Fassbinder Pl.";
    const res = getStreetLines({ strassenname: long } as any);
    expect(res[0]).toBe("Rainer-Werner ");
    expect(res[1]).toBe("Fassbinder Pl.");
  });

  it("getStreetLines: Rainer Werner-Fassbinder Pl.", () => {
    const { getStreetLines } = useStrassennameUtils();
    const long = "Rainer Werner-Fassbinder Pl.";
    const res = getStreetLines({ strassenname: long } as any);
    expect(res[0]).toBe("Rainer Werner-");
    expect(res[1]).toBe("Fassbinder Pl.");
  });

  it("getStreetLines: Rainer Werner-Fassbinder-Pl.", () => {
    const { getStreetLines } = useStrassennameUtils();
    const long = "Rainer Werner-Fassbinder-Pl.";
    const res = getStreetLines({ strassenname: long } as any);
    expect(res[0]).toBe("Rainer Werner-");
    expect(res[1]).toBe("Fassbinder-Pl.");
  });

  it("getStreetLines: Luise-Kiesselbach-Platz (Tunneleinfahrt)", () => {
    const { getStreetLines } = useStrassennameUtils();
    const long = "Luise-Kiesselbach-Platz (Tunneleinfahrt)";
    const res = getStreetLines({ strassenname: long } as any);
    expect(res[0]).toBe("Luise-Kiesselbach-");
    expect(res[1]).toBe("Platz (Tunneleinfahrt)");
  });

  it("getStreetLines: langer Straßename mit 'Str.' wird gesplittet", () => {
    const { getStreetLines } = useStrassennameUtils();
    const long = "Adalbert-Stifter-Str.";
    const res = getStreetLines({ strassenname: long } as any);
    expect(res[0]).toBe("Adalbert-");
    expect(res[1]).toBe("Stifter-Str.");
  });

  it("getStreetLines: Name mit Blank am Ende 18 Zeichen bleibt ein Element", () => {
    const { getStreetLines } = useStrassennameUtils();
    const res = getStreetLines({ strassenname: "Genau18ZeichMiBla " } as any);
    expect(res.length).toEqual(1);
    expect(res).toEqual(["Genau18ZeichMiBla"]);
  });

  it("getStreetLines: Name ohne Blank am Ende 17 Zeichen bleibt ein Element", () => {
    const { getStreetLines } = useStrassennameUtils();
    const res = getStreetLines({ strassenname: "Genau17ZeichenOhn" } as any);
    expect(res.length).toEqual(1);
    expect(res).toEqual(["Genau17ZeichenOhn"]);
  });

  it("getStreetLines: Name mit Leerzeichentrenner und Blank am Ende 18 Zeichen bleibt ein Element", () => {
    const { getStreetLines } = useStrassennameUtils();
    const res = getStreetLines({ strassenname: "Genau18Zeic MiBla " } as any);
    expect(res.length).toEqual(1);
    expect(res).toEqual(["Genau18Zeic MiBla"]);
  });

  it("getStreetLines: Name mit Leerzeichentrenner und Blank am Ende 20 Zeichen wird getrennt", () => {
    const { getStreetLines } = useStrassennameUtils();
    const res = getStreetLines({ strassenname: "Genau20Zeic MiBla F" } as any);
    expect(res.length).toEqual(2);
    expect(res[0]).toBe("Genau20Zeic ");
    expect(res[1]).toBe("MiBla F");
  });

  it("getStreetLines: kurzer Name mit Leerzeichen (<= 17 Zeichen) bleibt ein Element", () => {
    const { getStreetLines } = useStrassennameUtils();
    const res = getStreetLines({ strassenname: "Kleine Allee" } as any);
    expect(res).toEqual(["Kleine Allee"]);
  });

  it("getStreetLines: langer Name mit Leerzeichen (> 17 Zeichen) wird am ersten Leerzeichen gesplittet", () => {
    const { getStreetLines } = useStrassennameUtils();
    const longWithSpace = "VeryLongStreetname ExampleStreet";
    // length > 20 -> should split at first space
    const res = getStreetLines({ strassenname: longWithSpace } as any);
    expect(res.length).toBe(2);
    expect(res[0]).toBe("VeryLongStreetname ");
    expect(res[1]).toBe("ExampleStreet");
  });

  it("getStreetLines: langer Name mit Bindestrich wird am Bindestrich gesplittet (Bindestrich bleibt im ersten Teil)", () => {
    const { getStreetLines } = useStrassennameUtils();
    const langeMitBindestrich = "EinSehrLanger-TeilRest";
    expect(langeMitBindestrich.length).toBeGreaterThan(20);

    const res = getStreetLines({ strassenname: langeMitBindestrich } as any);

    expect(res.length).toBe(2);
    // Der erste Teil soll den Bindestrich am Ende enthalten
    expect(res[0].endsWith("-")).toBe(true);
    // Der zweite Teil ist alles hinter dem Bindestrich
    expect(res[1]).toBe("TeilRest");
  });

  it("getStreetLines: undefined knotenarm liefert ein Array mit einem leeren String", () => {
    const { getStreetLines } = useStrassennameUtils();
    const res = getStreetLines(undefined);
    expect(res).toEqual([""]);
  });

  it("getStreetLines: leerer strassenname liefert ein Array mit einem leeren String", () => {
    const { getStreetLines } = useStrassennameUtils();
    const res = getStreetLines({ strassenname: "" } as any);
    expect(res).toEqual([""]);
  });
});

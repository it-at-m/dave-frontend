import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import type LadeVerkehrsbeziehungDTO from "@/types/zaehlung/LadeVerkehrsbeziehungDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type LaengsverkehrDTO from "@/types/zaehlung/LaengsverkehrDTO";
import type QuerungsverkehrDTO from "@/types/zaehlung/QuerungsverkehrDTO";
import type VerkehrsbeziehungDTO from "@/types/zaehlung/VerkehrsbeziehungDTO";
import type ZaehlstelleOptionsDTO from "@/types/zaehlung/ZaehlstelleOptionsDTO";

import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import Bewegungsrichtung from "@/types/enum/Bewegungsrichtung";
import Erhebungsstelle from "@/types/enum/Erhebungsstelle";
import Himmelsrichtung from "@/types/enum/Himmelsrichtung";
import Zaehlart from "@/types/enum/Zaehlart";
import { useReportTools } from "@/util/ReportTools";

vi.mock("vue-router", () => {
  return {
    useRoute: () => ({ params: {} }),
  };
});

function createZaehlung(zaehlart: Zaehlart) {
  return {
    id: "1234",
    zaehlart: zaehlart,
    knotenarme: [
      { nummer: 2, strassenname: "Zweistraße" },
      { nummer: 4, strassenname: "Vierstraße" },
    ] as LadeKnotenarmDTO[],
    verkehrsbeziehungen: [] as LadeVerkehrsbeziehungDTO[],
    laengsverkehr: [] as LaengsverkehrDTO[],
    querungsverkehr: [] as QuerungsverkehrDTO[],
  } as LadeZaehlungDTO;
}

function createOptions() {
  return {
    chosenVerkehrsbeziehungen: [] as VerkehrsbeziehungDTO[],
    chosenLaengsverkehre: [] as LaengsverkehrDTO[],
    chosenQuerungsverkehre: [] as QuerungsverkehrDTO[],
  } as ZaehlstelleOptionsDTO;
}

describe("ReportTools", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("createHeading: Leerer Titel, wenn vonKnotenarm und nachKnotenarm null sind (nicht QjS, FjS, Qu).", () => {
    const { createHeading } = useReportTools();
    const zaehlstelleStore = useZaehlstelleStore();

    const zaehlung = createZaehlung(Zaehlart.N);
    zaehlstelleStore.setZaehlungen([zaehlung]);

    const options = createOptions();
    zaehlstelleStore.setFilteroptions(options);

    expect(createHeading(Erhebungsstelle.ZAEHLSTELLE)).toBe("");
  });

  it("createHeading: Wenn nur vonKnotenarm gesetzt ist, dann dieser im Titel (nicht QjS, FjS, Qu).", () => {
    const { createHeading } = useReportTools();
    const zaehlstelleStore = useZaehlstelleStore();

    const zaehlung = createZaehlung(Zaehlart.N);
    zaehlstelleStore.setZaehlungen([zaehlung]);

    const options = createOptions();
    options.vonKnotenarm = 2;
    zaehlstelleStore.setFilteroptions(options);

    expect(createHeading(Erhebungsstelle.ZAEHLSTELLE)).toBe(
      "von  Zweistraße (2) "
    );
  });

  it("createHeading: Wenn nur nachKnotenarm gesetzt ist, dann dieser im Titel (nicht QjS, FjS, Qu).", () => {
    const { createHeading } = useReportTools();
    const zaehlstelleStore = useZaehlstelleStore();

    const zaehlung = createZaehlung(Zaehlart.N);
    zaehlstelleStore.setZaehlungen([zaehlung]);

    const options = createOptions();
    options.nachKnotenarm = 4;
    zaehlstelleStore.setFilteroptions(options);

    expect(createHeading(Erhebungsstelle.ZAEHLSTELLE)).toBe(
      " nach Vierstraße (4)"
    );
  });

  it("createHeading: Wenn vonKnotenarm und nachKnotenarm gesetzt, dann beide im Titel (nicht QjS, FjS, Qu).", () => {
    const { createHeading } = useReportTools();
    const zaehlstelleStore = useZaehlstelleStore();

    const zaehlung = createZaehlung(Zaehlart.N);
    zaehlstelleStore.setZaehlungen([zaehlung]);

    const options = createOptions();
    options.vonKnotenarm = 2;
    options.nachKnotenarm = 4;
    zaehlstelleStore.setFilteroptions(options);

    expect(createHeading(Erhebungsstelle.ZAEHLSTELLE)).toBe(
      "von  Zweistraße (2)  nach Vierstraße (4)"
    );
  });

  it("createHeading: Für QjS mit allen ausgewählten Verkehrsbeziehungen wird 'Gesamte Zählstelle' zurückgegeben.", () => {
    const { createHeading } = useReportTools();
    const zaehlstelleStore = useZaehlstelleStore();

    const vb1 = {
      von: 2,
      nach: 4,
      strassenseite: Himmelsrichtung.N,
    } as LadeVerkehrsbeziehungDTO as VerkehrsbeziehungDTO;
    const vb2 = {
      von: 2,
      nach: 4,
      strassenseite: Himmelsrichtung.S,
    } as LadeVerkehrsbeziehungDTO as VerkehrsbeziehungDTO;

    const zaehlung = createZaehlung(Zaehlart.QJS);
    zaehlung.verkehrsbeziehungen = [vb1, vb2] as LadeVerkehrsbeziehungDTO[];
    zaehlstelleStore.setZaehlungen([zaehlung]);

    const options = createOptions();
    options.chosenVerkehrsbeziehungen = [vb1, vb2];
    zaehlstelleStore.setFilteroptions(options);

    expect(createHeading(Erhebungsstelle.ZAEHLSTELLE)).toBe(
      "Gesamte Zählstelle"
    );
  });

  it("createHeading: Für QjS mit nicht allen ausgewählten Verkehrsbeziehungen wird 'Zählstelle - Teilauswahl' zurückgegeben.", () => {
    const { createHeading } = useReportTools();
    const zaehlstelleStore = useZaehlstelleStore();

    const vb1 = {
      von: 2,
      nach: 4,
      strassenseite: Himmelsrichtung.N,
    } as LadeVerkehrsbeziehungDTO as VerkehrsbeziehungDTO;
    const vb2 = {
      von: 2,
      nach: 4,
      strassenseite: Himmelsrichtung.S,
    } as LadeVerkehrsbeziehungDTO as VerkehrsbeziehungDTO;

    const zaehlung = createZaehlung(Zaehlart.QJS);
    zaehlung.verkehrsbeziehungen = [vb1, vb2] as LadeVerkehrsbeziehungDTO[];
    zaehlstelleStore.setZaehlungen([zaehlung]);

    const options = createOptions();
    options.chosenVerkehrsbeziehungen = [vb1];
    zaehlstelleStore.setFilteroptions(options);

    expect(createHeading(Erhebungsstelle.ZAEHLSTELLE)).toBe(
      "Zählstelle - Teilauswahl"
    );
  });

  it("createHeading: Für FjS mit allen ausgewählten Verkehrsbeziehungen wird 'Gesamte Zählstelle' zurückgegeben.", () => {
    const { createHeading } = useReportTools();
    const zaehlstelleStore = useZaehlstelleStore();

    const lv1 = {
      knotenarm: 2,
      strassenseite: Himmelsrichtung.N,
      richtung: Bewegungsrichtung.EIN,
    } as LaengsverkehrDTO;
    const lv2 = {
      knotenarm: 2,
      strassenseite: Himmelsrichtung.S,
      richtung: Bewegungsrichtung.EIN,
    } as LaengsverkehrDTO;

    const zaehlung = createZaehlung(Zaehlart.FJS);
    zaehlung.laengsverkehr = [lv1, lv2];
    zaehlstelleStore.setZaehlungen([zaehlung]);

    const options = createOptions();
    options.chosenLaengsverkehre = [lv1, lv2];
    zaehlstelleStore.setFilteroptions(options);

    expect(createHeading(Erhebungsstelle.ZAEHLSTELLE)).toBe(
      "Gesamte Zählstelle"
    );
  });

  it("createHeading: Für FjS mit nicht allen ausgewählten Verkehrsbeziehungen wird 'Zählstelle - Teilauswahl' zurückgegeben.", () => {
    const { createHeading } = useReportTools();
    const zaehlstelleStore = useZaehlstelleStore();

    const lv1 = {
      knotenarm: 2,
      strassenseite: Himmelsrichtung.N,
      richtung: Bewegungsrichtung.EIN,
    } as LaengsverkehrDTO;
    const lv2 = {
      knotenarm: 2,
      strassenseite: Himmelsrichtung.S,
      richtung: Bewegungsrichtung.EIN,
    } as LaengsverkehrDTO;

    const zaehlung = createZaehlung(Zaehlart.FJS);
    zaehlung.laengsverkehr = [lv1, lv2];
    zaehlstelleStore.setZaehlungen([zaehlung]);

    const options = createOptions();
    options.chosenLaengsverkehre = [lv2];
    zaehlstelleStore.setFilteroptions(options);

    expect(createHeading(Erhebungsstelle.ZAEHLSTELLE)).toBe(
      "Zählstelle - Teilauswahl"
    );
  });

  it("createHeading: Für Qu mit allen ausgewählten Verkehrsbeziehungen wird 'Gesamte Zählstelle' zurückgegeben.", () => {
    const { createHeading } = useReportTools();
    const zaehlstelleStore = useZaehlstelleStore();

    const qv1 = {
      knotenarm: 2,
      richtung: Himmelsrichtung.N,
    } as QuerungsverkehrDTO;
    const qv2 = {
      knotenarm: 2,
      richtung: Himmelsrichtung.S,
    } as QuerungsverkehrDTO;

    const zaehlung = createZaehlung(Zaehlart.QU);
    zaehlung.querungsverkehr = [qv1, qv2];
    zaehlstelleStore.setZaehlungen([zaehlung]);

    const options = createOptions();
    options.chosenQuerungsverkehre = [qv1, qv2];
    zaehlstelleStore.setFilteroptions(options);

    expect(createHeading(Erhebungsstelle.ZAEHLSTELLE)).toBe(
      "Gesamte Zählstelle"
    );
  });

  it("createHeading: Für Qu mit nicht allen ausgewählten Verkehrsbeziehungen wird 'Zählstelle - Teilauswahl' zurückgegeben.", () => {
    const { createHeading } = useReportTools();
    const zaehlstelleStore = useZaehlstelleStore();

    const qv1 = {
      knotenarm: 2,
      richtung: Himmelsrichtung.N,
    } as QuerungsverkehrDTO;
    const qv2 = {
      knotenarm: 2,
      richtung: Himmelsrichtung.S,
    } as QuerungsverkehrDTO;

    const zaehlung = createZaehlung(Zaehlart.QU);
    zaehlung.querungsverkehr = [qv1, qv2];
    zaehlstelleStore.setZaehlungen([zaehlung]);

    const options = createOptions();
    options.chosenQuerungsverkehre = [qv2];
    zaehlstelleStore.setFilteroptions(options);

    expect(createHeading(Erhebungsstelle.ZAEHLSTELLE)).toBe(
      "Zählstelle - Teilauswahl"
    );
  });
});

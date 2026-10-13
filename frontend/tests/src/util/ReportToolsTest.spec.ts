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
      "von Zweistraße (2)"
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
      "nach Vierstraße (4)"
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
      "von Zweistraße (2) nach Vierstraße (4)"
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

  it("sanitizeHtml: Harmloser HTML-Input bleibt erhalten", () => {
    const { sanitizeHtml } = useReportTools();

    const allowedHtml1 =
      '<p>Hello <strong>World</strong>. Visit <a href="https://example.com">Link</a> or <a href="mailto:foo@example.com">Email</a></p>';
    expect(sanitizeHtml(allowedHtml1)).toBe(allowedHtml1);

    const allowedHtml2 = "Knotenarme:<br>1 1<br>2 2<br>";
    expect(sanitizeHtml(allowedHtml2)).toBe(allowedHtml2);
  });

  it("sanitizeHtml: Schädlicher / nicht erlaubter HTML-Input wird entfernt", () => {
    const { sanitizeHtml } = useReportTools();

    const notAllowedHtml1 =
      "<p>Click <a href=\"javascript:alert('XSS')\">here</a></p><script>alert('x')</script>";
    const expected1 = "<p>Click <a>here</a></p>";
    expect(sanitizeHtml(notAllowedHtml1)).toBe(expected1);

    const notAllowedHtml2 =
      '<p onclick="doEvil()" style="color:red" class="foo">Hi</p>';
    const expected2 = "<p>Hi</p>";
    expect(sanitizeHtml(notAllowedHtml2)).toBe(expected2);

    const notAllowedHtml3 =
      'Before<img src="https://example.com/pic.png" alt="pic">After';
    const expected3 = "BeforeAfter";
    expect(sanitizeHtml(notAllowedHtml3)).toBe(expected3);

    const notAllowedHtml4 = '<a href="/local/path">Local</a>';
    const expected4 = "<a>Local</a>";
    expect(sanitizeHtml(notAllowedHtml4)).toBe(expected4);
  });
});

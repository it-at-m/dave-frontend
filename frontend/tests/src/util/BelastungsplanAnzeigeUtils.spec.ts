import { beforeEach, describe, expect, it, vi } from "vitest";
import { computed } from "vue";

// Verändbare Filter‑Objekte, die die Stores per Referenz zurückliefern
let messstelleFilterOptions: Record<string, any> = {
  zeitauswahl: "",
  zeitblock: Zeitblock.ZB_06_22,
};
let zaehlstelleFilterOptions: Record<string, any> = {
  zeitauswahl: "",
  zeitblock: Zeitblock.ZB_06_22,
};

// Es werden nur die Stores gemockt. Die Enums und zeitblockInfo werden absichtlich NICHT gemockt;
// die Tests verwenden die echten Implementierungen aus dem src-Verzeichnis.
vi.mock("@/store/MessstelleStore", () => ({
  useMessstelleStore: () => ({ getFilteroptions: messstelleFilterOptions }),
}));
vi.mock("@/store/ZaehlstelleStore", () => ({
  useZaehlstelleStore: () => ({ getFilteroptions: zaehlstelleFilterOptions }),
}));

// Importiere das Util und die echten Enums/Info-Map erst, nachdem die Store-Mocks gesetzt wurden
import { useBelastungsplanAnzeigeUtils } from "@/util/BelastungsplanAnzeigeUtils";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import Zeitblock, { zeitblockInfo } from "@/types/enum/Zeitblock";

describe("BelastungsplanAnzeigeUtils - getZeitauswahlAndAdditionalZeitblockWhenSpitzenstundeIsChosen and computed props", () => {
  beforeEach(() => {
    // Standardwerte vor jedem Test zurücksetzen
    messstelleFilterOptions.zeitauswahl = "";
    messstelleFilterOptions.zeitblock = Zeitblock.ZB_06_22;
    zaehlstelleFilterOptions.zeitauswahl = "";
    zaehlstelleFilterOptions.zeitblock = Zeitblock.ZB_06_22;
  });

  it("adds block suffix for SPITZENSTUNDE_KFZ (messstelle computed)", () => {
    messstelleFilterOptions.zeitauswahl = Zeitauswahl.SPITZENSTUNDE_KFZ;
    messstelleFilterOptions.zeitblock = Zeitblock.ZB_06_22;

    const utils = useBelastungsplanAnzeigeUtils();
    const computedValue = utils.zeitauswahlAndAdditionalZeitblockWhenSpitzenstundeIsChosenForMessstelle as ReturnType<typeof computed>;

    expect(computedValue.value).toBe(
      `${Zeitauswahl.SPITZENSTUNDE_KFZ} (Block ${zeitblockInfo.get(Zeitblock.ZB_06_22)?.title})`
    );
  });

  it("adds block suffix for SPITZENSTUNDE_RAD (zaehlstelle computed)", () => {
    zaehlstelleFilterOptions.zeitauswahl = Zeitauswahl.SPITZENSTUNDE_RAD;
    zaehlstelleFilterOptions.zeitblock = Zeitblock.ZB_00_24;

    const utils = useBelastungsplanAnzeigeUtils();
    const computedValue = utils.zeitauswahlAndAdditionalZeitblockWhenSpitzenstundeIsChosenForZaehlstelle as ReturnType<
      typeof computed
    >;

    expect(computedValue.value).toBe(
      `${Zeitauswahl.SPITZENSTUNDE_RAD} (Block ${zeitblockInfo.get(Zeitblock.ZB_00_24)?.title})`
    );
  });

  it("adds block suffix for SPITZENSTUNDE_FUSS (messstelle)", () => {
    messstelleFilterOptions.zeitauswahl = Zeitauswahl.SPITZENSTUNDE_FUSS;
    messstelleFilterOptions.zeitblock = Zeitblock.ZB_00_24;

    const utils = useBelastungsplanAnzeigeUtils();
    const computedValue = utils.zeitauswahlAndAdditionalZeitblockWhenSpitzenstundeIsChosenForMessstelle as ReturnType<
      typeof computed
    >;

    expect(computedValue.value).toBe(
      `${Zeitauswahl.SPITZENSTUNDE_FUSS} (Block ${zeitblockInfo.get(Zeitblock.ZB_00_24)?.title})`
    );
  });

  it("returns plain zeitauswahl when not a Spitzenstunde (messstelle)", () => {
    messstelleFilterOptions.zeitauswahl = Zeitauswahl.TAGESWERT;
    messstelleFilterOptions.zeitblock = Zeitblock.ZB_06_22;

    const utils = useBelastungsplanAnzeigeUtils();
    const computedValue = utils.zeitauswahlAndAdditionalZeitblockWhenSpitzenstundeIsChosenForMessstelle as ReturnType<
      typeof computed
    >;

    expect(computedValue.value).toBe(Zeitauswahl.TAGESWERT);
  });

  it("returns plain zeitauswahl when not a Spitzenstunde (zaehlstelle)", () => {
    zaehlstelleFilterOptions.zeitauswahl = Zeitauswahl.TAGESWERT;
    zaehlstelleFilterOptions.zeitblock = Zeitblock.ZB_06_22;

    const utils = useBelastungsplanAnzeigeUtils();
    const computedValue = utils.zeitauswahlAndAdditionalZeitblockWhenSpitzenstundeIsChosenForZaehlstelle as ReturnType<
      typeof computed
    >;

    expect(computedValue.value).toBe(Zeitauswahl.TAGESWERT);
  });

  it("handles unknown zeitblock key (zeitblockInfo missing) - returns '(Block undefined)' suffix", () => {
    messstelleFilterOptions.zeitauswahl = Zeitauswahl.SPITZENSTUNDE_KFZ;
    messstelleFilterOptions.zeitblock = "UNKNOWN_KEY";

    const utils = useBelastungsplanAnzeigeUtils();
    const computedValue = utils.zeitauswahlAndAdditionalZeitblockWhenSpitzenstundeIsChosenForMessstelle as ReturnType<
      typeof computed
    >;

    // Durch optional chaining wird title zu 'undefined', daher ergibt sich der Suffix " (Block undefined)"
    expect(computedValue.value).toBe(`${Zeitauswahl.SPITZENSTUNDE_KFZ} (Block undefined)`);
  });

  it("handles null zeitblock value gracefully", () => {
    messstelleFilterOptions.zeitauswahl = Zeitauswahl.SPITZENSTUNDE_KFZ;
    // @ts-ignore: test passing null
    messstelleFilterOptions.zeitblock = null;

    const utils = useBelastungsplanAnzeigeUtils();
    const computedValue = utils.zeitauswahlAndAdditionalZeitblockWhenSpitzenstundeIsChosenForMessstelle as ReturnType<
      typeof computed
    >;

    expect(computedValue.value).toBe(`${Zeitauswahl.SPITZENSTUNDE_KFZ} (Block undefined)`);
  });

  it("handles empty zeitauswahl (returns empty string) for both computed props", () => {
    messstelleFilterOptions.zeitauswahl = "";
    messstelleFilterOptions.zeitblock = Zeitblock.ZB_06_22;
    zaehlstelleFilterOptions.zeitauswahl = "";
    zaehlstelleFilterOptions.zeitblock = Zeitblock.ZB_06_22;

    const utils = useBelastungsplanAnzeigeUtils();
    const computedValueMessstelle = utils.zeitauswahlAndAdditionalZeitblockWhenSpitzenstundeIsChosenForMessstelle as ReturnType<
      typeof computed
    >;
    const computedValueZaehlstelle = utils.zeitauswahlAndAdditionalZeitblockWhenSpitzenstundeIsChosenForZaehlstelle as ReturnType<
      typeof computed
    >;

    expect(computedValueMessstelle.value).toBe("");
    expect(computedValueZaehlstelle.value).toBe("");
  });

  it("computed values are independent for messstelle and zaehlstelle stores", () => {
    // Messstelle auf SPITZENSTUNDE_KFZ setzen und Zählstelle auf TAGESWERT
    messstelleFilterOptions.zeitauswahl = Zeitauswahl.SPITZENSTUNDE_KFZ;
    messstelleFilterOptions.zeitblock = Zeitblock.ZB_06_22;

    zaehlstelleFilterOptions.zeitauswahl = Zeitauswahl.TAGESWERT;
    zaehlstelleFilterOptions.zeitblock = Zeitblock.ZB_00_24;

    const utils = useBelastungsplanAnzeigeUtils();
    const computedMess = utils.zeitauswahlAndAdditionalZeitblockWhenSpitzenstundeIsChosenForMessstelle as ReturnType<
      typeof computed
    >;
    const computedZaehl = utils.zeitauswahlAndAdditionalZeitblockWhenSpitzenstundeIsChosenForZaehlstelle as ReturnType<
      typeof computed
    >;

    expect(computedMess.value).toBe(`${Zeitauswahl.SPITZENSTUNDE_KFZ} (Block ${zeitblockInfo.get(Zeitblock.ZB_06_22)?.title})`);
    expect(computedZaehl.value).toBe(Zeitauswahl.TAGESWERT);
  });
});

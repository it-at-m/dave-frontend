import type { FahrzeugOptionsDTO, OptionsmenueSettingsDTO } from "@/api/client";
import type MessfaehigkeitDTO from "@/types/messstelle/MessfaehigkeitDTO";

import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";

import { Fahrzeugklasse, ZaehldatenIntervall } from "@/api/client";
import { useOptionsmenueSettingsStore } from "@/store/OptionsmenueSettingsStore";

describe("OptionsmenueSettingsStore.ts", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("setOptionsmenueSettingsByMessfaehigkeiten", () => {
    const optionsmenueSettingsStore = useOptionsmenueSettingsStore();

    const settings1 = {
      intervall: ZaehldatenIntervall.StundeHalb,
      fahrzeugklasse: Fahrzeugklasse.SummeKfz,
      kraftfahrzeugverkehrChoosableIntervals: [
        ZaehldatenIntervall.StundeViertel,
      ],
      schwerverkehrChoosableIntervals: undefined,
      gueterverkehrChoosableIntervals: undefined,
      schwerverkehrsanteilProzentChoosableIntervals: undefined,
      gueterverkehrsanteilProzentChoosableIntervals: undefined,
      radverkehrChoosableIntervals: undefined,
      fussverkehrChoosableIntervals: undefined,
      lastkraftwagenChoosableIntervals: undefined,
      lastzuegeChoosableIntervals: undefined,
      busseChoosableIntervals: undefined,
      kraftraederChoosableIntervals: undefined,
      personenkraftwagenChoosableIntervals: undefined,
      lieferwagenChoosableIntervals: undefined,
    } as OptionsmenueSettingsDTO;
    const settings2 = {
      intervall: ZaehldatenIntervall.StundeKomplett,
      fahrzeugklasse: Fahrzeugklasse.AchtPlusEins,
      kraftfahrzeugverkehrChoosableIntervals: undefined,
      schwerverkehrChoosableIntervals: [
        ZaehldatenIntervall.StundeViertel,
        ZaehldatenIntervall.StundeKomplett,
      ],
      gueterverkehrChoosableIntervals: undefined,
      schwerverkehrsanteilProzentChoosableIntervals: undefined,
      gueterverkehrsanteilProzentChoosableIntervals: undefined,
      radverkehrChoosableIntervals: undefined,
      fussverkehrChoosableIntervals: undefined,
      lastkraftwagenChoosableIntervals: undefined,
      lastzuegeChoosableIntervals: undefined,
      busseChoosableIntervals: undefined,
      kraftraederChoosableIntervals: undefined,
      personenkraftwagenChoosableIntervals: undefined,
      lieferwagenChoosableIntervals: undefined,
    } as OptionsmenueSettingsDTO;
    const settings3 = {
      intervall: ZaehldatenIntervall.StundeHalb,
      fahrzeugklasse: Fahrzeugklasse.AchtPlusEins,
      kraftfahrzeugverkehrChoosableIntervals: undefined,
      schwerverkehrChoosableIntervals: [
        ZaehldatenIntervall.StundeViertel,
        ZaehldatenIntervall.StundeHalb,
        ZaehldatenIntervall.StundeKomplett,
      ],
      gueterverkehrChoosableIntervals: undefined,
      schwerverkehrsanteilProzentChoosableIntervals: undefined,
      gueterverkehrsanteilProzentChoosableIntervals: undefined,
      radverkehrChoosableIntervals: undefined,
      fussverkehrChoosableIntervals: undefined,
      lastkraftwagenChoosableIntervals: undefined,
      lastzuegeChoosableIntervals: [ZaehldatenIntervall.StundeViertel],
      busseChoosableIntervals: undefined,
      kraftraederChoosableIntervals: undefined,
      personenkraftwagenChoosableIntervals: undefined,
      lieferwagenChoosableIntervals: undefined,
    } as OptionsmenueSettingsDTO;

    optionsmenueSettingsStore.setOptionsmenueSettingsByIntervallAndFahrzeugklasse(
      [settings1, settings2, settings3]
    );

    const messfaehigkeit1 = {
      gueltigAb: "2025-02-01",
      gueltigBis: "2025-02-05",
      intervall: ZaehldatenIntervall.StundeKomplett,
      fahrzeugklasse: Fahrzeugklasse.AchtPlusEins,
    } as MessfaehigkeitDTO;
    const messfaehigkeit2 = {
      gueltigAb: "2025-02-06",
      gueltigBis: "2025-02-08",
      intervall: ZaehldatenIntervall.StundeHalb,
      fahrzeugklasse: Fahrzeugklasse.AchtPlusEins,
    } as MessfaehigkeitDTO;
    optionsmenueSettingsStore.setOptionsmenueSettingsByMessfaehigkeiten([
      messfaehigkeit1,
      messfaehigkeit2,
    ]);

    const result =
      optionsmenueSettingsStore.getOptionsmenueSettingsByMessfaehigkeiten;

    const expected = {
      intervall: undefined,
      fahrzeugklasse: undefined,
      kraftfahrzeugverkehrChoosableIntervals: [],
      schwerverkehrChoosableIntervals: [
        ZaehldatenIntervall.StundeViertel,
        ZaehldatenIntervall.StundeKomplett,
      ],
      gueterverkehrChoosableIntervals: [],
      schwerverkehrsanteilProzentChoosableIntervals: [],
      gueterverkehrsanteilProzentChoosableIntervals: [],
      radverkehrChoosableIntervals: [],
      fussverkehrChoosableIntervals: [],
      lastkraftwagenChoosableIntervals: [],
      lastzuegeChoosableIntervals: [],
      busseChoosableIntervals: [],
      kraftraederChoosableIntervals: [],
      personenkraftwagenChoosableIntervals: [],
      lieferwagenChoosableIntervals: [],
    } as OptionsmenueSettingsDTO;

    expect(result).toStrictEqual(expected);
  });

  it("setOptionsmenueSettingsByMessfaehigkeiten_DefaultSettingsAvailable", () => {
    const optionsmenueSettingsStore = useOptionsmenueSettingsStore();

    const settings1 = {
      intervall: undefined,
      fahrzeugklasse: undefined,
      kraftfahrzeugverkehrChoosableIntervals: [
        ZaehldatenIntervall.StundeKomplett,
      ],
      schwerverkehrChoosableIntervals: [],
      gueterverkehrChoosableIntervals: [],
      schwerverkehrsanteilProzentChoosableIntervals: [],
      gueterverkehrsanteilProzentChoosableIntervals: [],
      radverkehrChoosableIntervals: [],
      fussverkehrChoosableIntervals: [],
      lastkraftwagenChoosableIntervals: [],
      lastzuegeChoosableIntervals: [],
      busseChoosableIntervals: [],
      kraftraederChoosableIntervals: [],
      personenkraftwagenChoosableIntervals: [],
      lieferwagenChoosableIntervals: [],
    } as OptionsmenueSettingsDTO;

    optionsmenueSettingsStore.setOptionsmenueSettingsByIntervallAndFahrzeugklasse(
      [settings1]
    );

    const messfaehigkeit1 = {
      gueltigAb: "2025-02-01",
      gueltigBis: "2025-02-05",
      intervall: ZaehldatenIntervall.StundeKomplett,
      fahrzeugklasse: Fahrzeugklasse.AchtPlusEins,
    } as MessfaehigkeitDTO;
    const messfaehigkeit2 = {
      gueltigAb: "2025-02-06",
      gueltigBis: "2025-02-08",
      intervall: ZaehldatenIntervall.StundeHalb,
      fahrzeugklasse: Fahrzeugklasse.AchtPlusEins,
    } as MessfaehigkeitDTO;
    optionsmenueSettingsStore.setOptionsmenueSettingsByMessfaehigkeiten([
      messfaehigkeit1,
      messfaehigkeit2,
    ]);

    const result =
      optionsmenueSettingsStore.getOptionsmenueSettingsByMessfaehigkeiten;

    expect(result).toStrictEqual(settings1);
  });

  it("setOptionsmenueSettingsByMessfaehigkeiten_NoDefaultSettingsAvailable", () => {
    const optionsmenueSettingsStore = useOptionsmenueSettingsStore();

    const messfaehigkeit1 = {
      gueltigAb: "2025-02-01",
      gueltigBis: "2025-02-05",
      intervall: ZaehldatenIntervall.StundeKomplett,
      fahrzeugklasse: Fahrzeugklasse.AchtPlusEins,
    } as MessfaehigkeitDTO;
    const messfaehigkeit2 = {
      gueltigAb: "2025-02-06",
      gueltigBis: "2025-02-08",
      intervall: ZaehldatenIntervall.StundeHalb,
      fahrzeugklasse: Fahrzeugklasse.AchtPlusEins,
    } as MessfaehigkeitDTO;
    optionsmenueSettingsStore.setOptionsmenueSettingsByMessfaehigkeiten([
      messfaehigkeit1,
      messfaehigkeit2,
    ]);

    const result =
      optionsmenueSettingsStore.getOptionsmenueSettingsByMessfaehigkeiten;

    const defaultIntervals = [
      ZaehldatenIntervall.StundeViertel,
      ZaehldatenIntervall.StundeHalb,
      ZaehldatenIntervall.StundeKomplett,
    ];
    const expected = {
      intervall: undefined,
      fahrzeugklasse: undefined,
      kraftfahrzeugverkehrChoosableIntervals: defaultIntervals,
      schwerverkehrChoosableIntervals: defaultIntervals,
      gueterverkehrChoosableIntervals: defaultIntervals,
      schwerverkehrsanteilProzentChoosableIntervals: defaultIntervals,
      gueterverkehrsanteilProzentChoosableIntervals: defaultIntervals,
      radverkehrChoosableIntervals: defaultIntervals,
      fussverkehrChoosableIntervals: defaultIntervals,
      lastkraftwagenChoosableIntervals: defaultIntervals,
      lastzuegeChoosableIntervals: defaultIntervals,
      busseChoosableIntervals: defaultIntervals,
      kraftraederChoosableIntervals: defaultIntervals,
      personenkraftwagenChoosableIntervals: defaultIntervals,
      lieferwagenChoosableIntervals: defaultIntervals,
    } as OptionsmenueSettingsDTO;

    expect(expected).toStrictEqual(result);
  });

  it("getSmallestCommonDenominatorOfIntervallForChosenFahrzeugOptions_WithAllIntervalsSetToAllOptions", () => {
    const optionsmenueSettingsStore = useOptionsmenueSettingsStore();

    const fahrzeugOptions = {
      kraftfahrzeugverkehr: true,
      schwerverkehr: true,
      gueterverkehr: true,
      schwerverkehrsanteilProzent: true,
      gueterverkehrsanteilProzent: true,
      radverkehr: true,
      fussverkehr: true,
      lastkraftwagen: true,
      lastzuege: true,
      busse: true,
      kraftraeder: true,
      personenkraftwagen: true,
      lieferwagen: true,
    } as FahrzeugOptionsDTO;

    const defaultIntervals = [
      ZaehldatenIntervall.StundeViertel,
      ZaehldatenIntervall.StundeHalb,
      ZaehldatenIntervall.StundeKomplett,
    ];

    const optionsmenueSettings = {
      intervall: undefined,
      fahrzeugklasse: undefined,
      kraftfahrzeugverkehrChoosableIntervals: defaultIntervals,
      schwerverkehrChoosableIntervals: defaultIntervals,
      gueterverkehrChoosableIntervals: defaultIntervals,
      schwerverkehrsanteilProzentChoosableIntervals: defaultIntervals,
      gueterverkehrsanteilProzentChoosableIntervals: defaultIntervals,
      radverkehrChoosableIntervals: defaultIntervals,
      fussverkehrChoosableIntervals: defaultIntervals,
      lastkraftwagenChoosableIntervals: defaultIntervals,
      lastzuegeChoosableIntervals: defaultIntervals,
      busseChoosableIntervals: defaultIntervals,
      kraftraederChoosableIntervals: defaultIntervals,
      personenkraftwagenChoosableIntervals: defaultIntervals,
      lieferwagenChoosableIntervals: defaultIntervals,
    } as OptionsmenueSettingsDTO;

    const result =
      optionsmenueSettingsStore.getSmallestCommonDenominatorOfIntervallForChosenFahrzeugOptions(
        optionsmenueSettings,
        fahrzeugOptions
      );

    const expected = [
      ZaehldatenIntervall.StundeViertel,
      ZaehldatenIntervall.StundeHalb,
      ZaehldatenIntervall.StundeKomplett,
    ] as Array<ZaehldatenIntervall>;

    expect(result).toStrictEqual(expected);
  });

  it("getSmallestCommonDenominatorOfIntervallForChosenFahrzeugOptions_WithSomeIntervalsSetToAllOptions", () => {
    const optionsmenueSettingsStore = useOptionsmenueSettingsStore();

    const fahrzeugOptions = {
      kraftfahrzeugverkehr: true,
      schwerverkehr: true,
      gueterverkehr: true,
      schwerverkehrsanteilProzent: true,
      gueterverkehrsanteilProzent: true,
      radverkehr: true,
      fussverkehr: true,
      lastkraftwagen: true,
      lastzuege: true,
      busse: true,
      kraftraeder: true,
      personenkraftwagen: true,
      lieferwagen: true,
    } as FahrzeugOptionsDTO;

    const defaultIntervals = [
      ZaehldatenIntervall.StundeViertel,
      ZaehldatenIntervall.StundeHalb,
      ZaehldatenIntervall.StundeKomplett,
    ];

    const optionsmenueSettings = {
      intervall: undefined,
      fahrzeugklasse: undefined,
      kraftfahrzeugverkehrChoosableIntervals: defaultIntervals,
      schwerverkehrChoosableIntervals: defaultIntervals,
      gueterverkehrChoosableIntervals: defaultIntervals,
      schwerverkehrsanteilProzentChoosableIntervals: [
        ZaehldatenIntervall.StundeViertel,
        ZaehldatenIntervall.StundeKomplett,
      ],
      gueterverkehrsanteilProzentChoosableIntervals: defaultIntervals,
      radverkehrChoosableIntervals: defaultIntervals,
      fussverkehrChoosableIntervals: defaultIntervals,
      lastkraftwagenChoosableIntervals: defaultIntervals,
      lastzuegeChoosableIntervals: [ZaehldatenIntervall.StundeViertel],
      busseChoosableIntervals: defaultIntervals,
      kraftraederChoosableIntervals: [
        ZaehldatenIntervall.StundeViertel,
        ZaehldatenIntervall.StundeKomplett,
      ],
      personenkraftwagenChoosableIntervals: defaultIntervals,
      lieferwagenChoosableIntervals: defaultIntervals,
    } as OptionsmenueSettingsDTO;

    const result =
      optionsmenueSettingsStore.getSmallestCommonDenominatorOfIntervallForChosenFahrzeugOptions(
        optionsmenueSettings,
        fahrzeugOptions
      );

    const expected = [
      ZaehldatenIntervall.StundeViertel,
    ] as Array<ZaehldatenIntervall>;

    expect(result).toStrictEqual(expected);
  });

  it("getSmallestCommonDenominatorOfIntervallForChosenFahrzeugOptions_WithSomeIntervalsSetToSomeOptions", () => {
    const optionsmenueSettingsStore = useOptionsmenueSettingsStore();

    const fahrzeugOptions = {
      kraftfahrzeugverkehr: true,
      schwerverkehr: false,
      gueterverkehr: false,
      schwerverkehrsanteilProzent: true,
      gueterverkehrsanteilProzent: false,
      radverkehr: false,
      fussverkehr: false,
      lastkraftwagen: false,
      lastzuege: false,
      busse: false,
      kraftraeder: true,
      personenkraftwagen: false,
      lieferwagen: false,
    } as FahrzeugOptionsDTO;

    const optionsmenueSettings = {
      intervall: undefined,
      fahrzeugklasse: undefined,
      kraftfahrzeugverkehrChoosableIntervals: [
        ZaehldatenIntervall.StundeViertel,
        ZaehldatenIntervall.StundeHalb,
        ZaehldatenIntervall.StundeKomplett,
      ],
      schwerverkehrChoosableIntervals: undefined,
      gueterverkehrChoosableIntervals: undefined,
      schwerverkehrsanteilProzentChoosableIntervals: [
        ZaehldatenIntervall.StundeViertel,
        ZaehldatenIntervall.StundeHalb,
        ZaehldatenIntervall.StundeKomplett,
      ],
      gueterverkehrsanteilProzentChoosableIntervals: undefined,
      radverkehrChoosableIntervals: undefined,
      fussverkehrChoosableIntervals: undefined,
      lastkraftwagenChoosableIntervals: undefined,
      lastzuegeChoosableIntervals: [ZaehldatenIntervall.StundeViertel],
      busseChoosableIntervals: undefined,
      kraftraederChoosableIntervals: [
        ZaehldatenIntervall.StundeViertel,
        ZaehldatenIntervall.StundeKomplett,
      ],
      personenkraftwagenChoosableIntervals: undefined,
      lieferwagenChoosableIntervals: undefined,
    } as OptionsmenueSettingsDTO;

    const result =
      optionsmenueSettingsStore.getSmallestCommonDenominatorOfIntervallForChosenFahrzeugOptions(
        optionsmenueSettings,
        fahrzeugOptions
      );

    const expected = [
      ZaehldatenIntervall.StundeViertel,
      ZaehldatenIntervall.StundeKomplett,
    ] as Array<ZaehldatenIntervall>;

    expect(result).toStrictEqual(expected);
  });

  it("getOptionsmenueSettingsWithAllOptions", () => {
    const optionsmenueSettingsStore = useOptionsmenueSettingsStore();

    const result =
      optionsmenueSettingsStore.getOptionsmenueSettingsWithAllOptions();

    const defaultIntervals = [
      ZaehldatenIntervall.StundeViertel,
      ZaehldatenIntervall.StundeHalb,
      ZaehldatenIntervall.StundeKomplett,
    ];
    const expected = {
      intervall: undefined,
      fahrzeugklasse: undefined,
      kraftfahrzeugverkehrChoosableIntervals: defaultIntervals,
      schwerverkehrChoosableIntervals: defaultIntervals,
      gueterverkehrChoosableIntervals: defaultIntervals,
      schwerverkehrsanteilProzentChoosableIntervals: defaultIntervals,
      gueterverkehrsanteilProzentChoosableIntervals: defaultIntervals,
      radverkehrChoosableIntervals: defaultIntervals,
      fussverkehrChoosableIntervals: defaultIntervals,
      lastkraftwagenChoosableIntervals: defaultIntervals,
      lastzuegeChoosableIntervals: defaultIntervals,
      busseChoosableIntervals: defaultIntervals,
      kraftraederChoosableIntervals: defaultIntervals,
      personenkraftwagenChoosableIntervals: defaultIntervals,
      lieferwagenChoosableIntervals: defaultIntervals,
    } as OptionsmenueSettingsDTO;

    expect(result).toStrictEqual(expected);
  });

  it("getSmallestCommonDenominatorOfIntervallsForEachFahrzeugkategorieAndFahrzeugart", () => {
    const optionsmenueSettingsStore = useOptionsmenueSettingsStore();

    const defaultIntervals = [
      ZaehldatenIntervall.StundeViertel,
      ZaehldatenIntervall.StundeHalb,
      ZaehldatenIntervall.StundeKomplett,
    ];
    const settings1 = {
      intervall: ZaehldatenIntervall.StundeHalb,
      fahrzeugklasse: Fahrzeugklasse.SummeKfz,
      kraftfahrzeugverkehrChoosableIntervals: defaultIntervals,
      schwerverkehrChoosableIntervals: defaultIntervals,
      gueterverkehrChoosableIntervals: defaultIntervals,
      schwerverkehrsanteilProzentChoosableIntervals: defaultIntervals,
      gueterverkehrsanteilProzentChoosableIntervals: defaultIntervals,
      radverkehrChoosableIntervals: defaultIntervals,
      fussverkehrChoosableIntervals: defaultIntervals,
      lastkraftwagenChoosableIntervals: defaultIntervals,
      lastzuegeChoosableIntervals: defaultIntervals,
      busseChoosableIntervals: defaultIntervals,
      kraftraederChoosableIntervals: defaultIntervals,
      personenkraftwagenChoosableIntervals: defaultIntervals,
      lieferwagenChoosableIntervals: defaultIntervals,
    } as OptionsmenueSettingsDTO;

    const settings2 = {
      intervall: ZaehldatenIntervall.StundeViertel,
      fahrzeugklasse: Fahrzeugklasse.AchtPlusEins,
      kraftfahrzeugverkehrChoosableIntervals: [
        ZaehldatenIntervall.StundeViertel,
      ],
      schwerverkehrChoosableIntervals: [
        ZaehldatenIntervall.StundeViertel,
        ZaehldatenIntervall.StundeHalb,
      ],
      gueterverkehrChoosableIntervals: [
        ZaehldatenIntervall.StundeViertel,
        ZaehldatenIntervall.StundeHalb,
        ZaehldatenIntervall.StundeKomplett,
      ],
      schwerverkehrsanteilProzentChoosableIntervals: [
        ZaehldatenIntervall.StundeViertel,
      ],
      gueterverkehrsanteilProzentChoosableIntervals: [
        ZaehldatenIntervall.StundeViertel,
        ZaehldatenIntervall.StundeHalb,
      ],
      radverkehrChoosableIntervals: [
        ZaehldatenIntervall.StundeViertel,
        ZaehldatenIntervall.StundeHalb,
        ZaehldatenIntervall.StundeKomplett,
      ],
      fussverkehrChoosableIntervals: [],
      lastkraftwagenChoosableIntervals: [],
      lastzuegeChoosableIntervals: [],
      busseChoosableIntervals: undefined,
      kraftraederChoosableIntervals: undefined,
      personenkraftwagenChoosableIntervals: undefined,
      lieferwagenChoosableIntervals: [ZaehldatenIntervall.StundeViertel],
    } as OptionsmenueSettingsDTO;

    const result =
      optionsmenueSettingsStore.getSmallestCommonDenominatorOfIntervallsForEachFahrzeugkategorieAndFahrzeugart(
        [settings1, settings2]
      );

    const expected = {
      intervall: undefined,
      fahrzeugklasse: undefined,
      kraftfahrzeugverkehrChoosableIntervals: [
        ZaehldatenIntervall.StundeViertel,
      ],
      schwerverkehrChoosableIntervals: [
        ZaehldatenIntervall.StundeViertel,
        ZaehldatenIntervall.StundeHalb,
      ],
      gueterverkehrChoosableIntervals: [
        ZaehldatenIntervall.StundeViertel,
        ZaehldatenIntervall.StundeHalb,
        ZaehldatenIntervall.StundeKomplett,
      ],
      schwerverkehrsanteilProzentChoosableIntervals: [
        ZaehldatenIntervall.StundeViertel,
      ],
      gueterverkehrsanteilProzentChoosableIntervals: [
        ZaehldatenIntervall.StundeViertel,
        ZaehldatenIntervall.StundeHalb,
      ],
      radverkehrChoosableIntervals: [
        ZaehldatenIntervall.StundeViertel,
        ZaehldatenIntervall.StundeHalb,
        ZaehldatenIntervall.StundeKomplett,
      ],
      fussverkehrChoosableIntervals: [],
      lastkraftwagenChoosableIntervals: [],
      lastzuegeChoosableIntervals: [],
      busseChoosableIntervals: [],
      kraftraederChoosableIntervals: [],
      personenkraftwagenChoosableIntervals: [],
      lieferwagenChoosableIntervals: [ZaehldatenIntervall.StundeViertel],
    } as OptionsmenueSettingsDTO;

    expect(result).toStrictEqual(expected);
  });

  it("getOptionsmenueSettingsByIntervallAndFahrzeugklasse", () => {
    const optionsmenueSettingsStore = useOptionsmenueSettingsStore();

    const settings1 = {
      intervall: ZaehldatenIntervall.StundeHalb,
      fahrzeugklasse: Fahrzeugklasse.SummeKfz,
      kraftfahrzeugverkehrChoosableIntervals: [
        ZaehldatenIntervall.StundeViertel,
      ],
      schwerverkehrChoosableIntervals: undefined,
      gueterverkehrChoosableIntervals: undefined,
      schwerverkehrsanteilProzentChoosableIntervals: undefined,
      gueterverkehrsanteilProzentChoosableIntervals: undefined,
      radverkehrChoosableIntervals: undefined,
      fussverkehrChoosableIntervals: undefined,
      lastkraftwagenChoosableIntervals: undefined,
      lastzuegeChoosableIntervals: undefined,
      busseChoosableIntervals: undefined,
      kraftraederChoosableIntervals: undefined,
      personenkraftwagenChoosableIntervals: undefined,
      lieferwagenChoosableIntervals: undefined,
    } as OptionsmenueSettingsDTO;
    const settings2 = {
      intervall: ZaehldatenIntervall.StundeKomplett,
      fahrzeugklasse: Fahrzeugklasse.AchtPlusEins,
      kraftfahrzeugverkehrChoosableIntervals: undefined,
      schwerverkehrChoosableIntervals: [ZaehldatenIntervall.StundeKomplett],
      gueterverkehrChoosableIntervals: undefined,
      schwerverkehrsanteilProzentChoosableIntervals: undefined,
      gueterverkehrsanteilProzentChoosableIntervals: undefined,
      radverkehrChoosableIntervals: undefined,
      fussverkehrChoosableIntervals: undefined,
      lastkraftwagenChoosableIntervals: undefined,
      lastzuegeChoosableIntervals: undefined,
      busseChoosableIntervals: undefined,
      kraftraederChoosableIntervals: undefined,
      personenkraftwagenChoosableIntervals: undefined,
      lieferwagenChoosableIntervals: undefined,
    } as OptionsmenueSettingsDTO;

    optionsmenueSettingsStore.setOptionsmenueSettingsByIntervallAndFahrzeugklasse(
      [settings1, settings2]
    );

    let expected =
      optionsmenueSettingsStore.getOptionsmenueSettingsByIntervallAndFahrzeugklasse(
        Fahrzeugklasse.SummeKfz,
        ZaehldatenIntervall.StundeHalb
      );
    expect(expected).toStrictEqual(settings1);

    expected =
      optionsmenueSettingsStore.getOptionsmenueSettingsByIntervallAndFahrzeugklasse(
        Fahrzeugklasse.AchtPlusEins,
        ZaehldatenIntervall.StundeKomplett
      );
    expect(expected).toStrictEqual(settings2);

    expected =
      optionsmenueSettingsStore.getOptionsmenueSettingsByIntervallAndFahrzeugklasse(
        Fahrzeugklasse.ZweiPlusEins,
        ZaehldatenIntervall.StundeKomplett
      );
    expect(expected).eq(undefined);

    expected =
      optionsmenueSettingsStore.getOptionsmenueSettingsByIntervallAndFahrzeugklasse(
        undefined,
        undefined
      );
    expect(expected).eq(undefined);
  });

  it("getMapKeyOfIntervallAndFahrzeugklasse", () => {
    const optionsmenueSettingsStore = useOptionsmenueSettingsStore();

    let result =
      optionsmenueSettingsStore.getMapKeyOfIntervallAndFahrzeugklasse(
        undefined,
        undefined
      );
    let expected = "default-default";
    expect(expected).eq(result);

    result = optionsmenueSettingsStore.getMapKeyOfIntervallAndFahrzeugklasse(
      undefined,
      ZaehldatenIntervall.StundeHalb
    );
    expected = "default-StundeHalb";
    expect(expected).eq(result);

    result = optionsmenueSettingsStore.getMapKeyOfIntervallAndFahrzeugklasse(
      Fahrzeugklasse.SummeKfz,
      undefined
    );
    expected = "SummeKfz-default";
    expect(expected).eq(result);

    result = optionsmenueSettingsStore.getMapKeyOfIntervallAndFahrzeugklasse(
      Fahrzeugklasse.SummeKfz,
      ZaehldatenIntervall.StundeHalb
    );
    expected = "SummeKfz-StundeHalb";
    expect(expected).eq(result);
  });
});

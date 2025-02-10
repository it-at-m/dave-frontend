import type OptionsmenueSettingsDTO from "@/types/common/OptionsmenueSettingsDTO";

import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";

import { useOptionsmenueSettingsStore } from "@/store/OptionsmenueSettingsStore";
import Fahrzeugklasse from "@/types/enum/Fahrzeugklasse";
import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";

describe("OptionsmenueSettingsStore.ts", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("getOptionsmenueSettingsWithAllOptions", () => {
    const optionsmenueSettingsStore = useOptionsmenueSettingsStore();

    const result =
      optionsmenueSettingsStore.getOptionsmenueSettingsWithAllOptions();

    const defaultIntervals = [
      ZaehldatenIntervall.STUNDE_VIERTEL,
      ZaehldatenIntervall.STUNDE_HALB,
      ZaehldatenIntervall.STUNDE_KOMPLETT,
    ];
    const expected = {
      intervall: ZaehldatenIntervall.STUNDE_HALB,
      fahrzeugklasse: Fahrzeugklasse.SUMME_KFZ,
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
      ZaehldatenIntervall.STUNDE_VIERTEL,
      ZaehldatenIntervall.STUNDE_HALB,
      ZaehldatenIntervall.STUNDE_KOMPLETT,
    ];
    const settings1 = {
      intervall: ZaehldatenIntervall.STUNDE_HALB,
      fahrzeugklasse: Fahrzeugklasse.SUMME_KFZ,
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
      intervall: ZaehldatenIntervall.STUNDE_VIERTEL,
      fahrzeugklasse: Fahrzeugklasse.ACHT_PLUS_EINS,
      kraftfahrzeugverkehrChoosableIntervals: [
        ZaehldatenIntervall.STUNDE_VIERTEL,
      ],
      schwerverkehrChoosableIntervals: [
        ZaehldatenIntervall.STUNDE_VIERTEL,
        ZaehldatenIntervall.STUNDE_HALB,
      ],
      gueterverkehrChoosableIntervals: [
        ZaehldatenIntervall.STUNDE_VIERTEL,
        ZaehldatenIntervall.STUNDE_HALB,
        ZaehldatenIntervall.STUNDE_KOMPLETT,
      ],
      schwerverkehrsanteilProzentChoosableIntervals: [
        ZaehldatenIntervall.STUNDE_VIERTEL,
      ],
      gueterverkehrsanteilProzentChoosableIntervals: [
        ZaehldatenIntervall.STUNDE_VIERTEL,
        ZaehldatenIntervall.STUNDE_HALB,
      ],
      radverkehrChoosableIntervals: [
        ZaehldatenIntervall.STUNDE_VIERTEL,
        ZaehldatenIntervall.STUNDE_HALB,
        ZaehldatenIntervall.STUNDE_KOMPLETT,
      ],
      fussverkehrChoosableIntervals: [],
      lastkraftwagenChoosableIntervals: [],
      lastzuegeChoosableIntervals: [],
      busseChoosableIntervals: undefined,
      kraftraederChoosableIntervals: undefined,
      personenkraftwagenChoosableIntervals: undefined,
      lieferwagenChoosableIntervals: [ZaehldatenIntervall.STUNDE_VIERTEL],
    } as OptionsmenueSettingsDTO;

    const result =
      optionsmenueSettingsStore.getSmallestCommonDenominatorOfIntervallsForEachFahrzeugkategorieAndFahrzeugart(
        [settings1, settings2]
      );

    const expected = {
      intervall: ZaehldatenIntervall.STUNDE_HALB,
      fahrzeugklasse: Fahrzeugklasse.SUMME_KFZ,
      kraftfahrzeugverkehrChoosableIntervals: [
        ZaehldatenIntervall.STUNDE_VIERTEL,
      ],
      schwerverkehrChoosableIntervals: [
        ZaehldatenIntervall.STUNDE_VIERTEL,
        ZaehldatenIntervall.STUNDE_HALB,
      ],
      gueterverkehrChoosableIntervals: [
        ZaehldatenIntervall.STUNDE_VIERTEL,
        ZaehldatenIntervall.STUNDE_HALB,
        ZaehldatenIntervall.STUNDE_KOMPLETT,
      ],
      schwerverkehrsanteilProzentChoosableIntervals: [
        ZaehldatenIntervall.STUNDE_VIERTEL,
      ],
      gueterverkehrsanteilProzentChoosableIntervals: [
        ZaehldatenIntervall.STUNDE_VIERTEL,
        ZaehldatenIntervall.STUNDE_HALB,
      ],
      radverkehrChoosableIntervals: [
        ZaehldatenIntervall.STUNDE_VIERTEL,
        ZaehldatenIntervall.STUNDE_HALB,
        ZaehldatenIntervall.STUNDE_KOMPLETT,
      ],
      fussverkehrChoosableIntervals: [],
      lastkraftwagenChoosableIntervals: [],
      lastzuegeChoosableIntervals: [],
      busseChoosableIntervals: [],
      kraftraederChoosableIntervals: [],
      personenkraftwagenChoosableIntervals: [],
      lieferwagenChoosableIntervals: [ZaehldatenIntervall.STUNDE_VIERTEL],
    } as OptionsmenueSettingsDTO;

    expect(result).toStrictEqual(expected);
  });

  it("getOptionsmenueSettingsByIntervallAndFahrzeugklasse", () => {
    const optionsmenueSettingsStore = useOptionsmenueSettingsStore();

    const settings1 = {
      intervall: ZaehldatenIntervall.STUNDE_HALB,
      fahrzeugklasse: Fahrzeugklasse.SUMME_KFZ,
      kraftfahrzeugverkehrChoosableIntervals: [
        ZaehldatenIntervall.STUNDE_VIERTEL,
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
      intervall: ZaehldatenIntervall.STUNDE_KOMPLETT,
      fahrzeugklasse: Fahrzeugklasse.ACHT_PLUS_EINS,
      kraftfahrzeugverkehrChoosableIntervals: undefined,
      schwerverkehrChoosableIntervals: [ZaehldatenIntervall.STUNDE_KOMPLETT],
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
        Fahrzeugklasse.SUMME_KFZ,
        ZaehldatenIntervall.STUNDE_HALB
      );
    expect(expected).toStrictEqual(settings1);

    expected =
      optionsmenueSettingsStore.getOptionsmenueSettingsByIntervallAndFahrzeugklasse(
        Fahrzeugklasse.ACHT_PLUS_EINS,
        ZaehldatenIntervall.STUNDE_KOMPLETT
      );
    expect(expected).toStrictEqual(settings2);

    expected =
      optionsmenueSettingsStore.getOptionsmenueSettingsByIntervallAndFahrzeugklasse(
        Fahrzeugklasse.ZWEI_PLUS_EINS,
        ZaehldatenIntervall.STUNDE_KOMPLETT
      );
    expect(expected).eq(undefined);

    expected =
      optionsmenueSettingsStore.getOptionsmenueSettingsByIntervallAndFahrzeugklasse(
        undefined,
        undefined
      );
    expect(expected).eq(undefined);
  });
});

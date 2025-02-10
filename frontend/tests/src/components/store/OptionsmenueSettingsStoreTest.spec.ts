import {beforeEach, describe, expect, it} from "vitest";
import {createPinia, setActivePinia} from "pinia";
import {useOptionsmenueSettingsStore} from "@/store/OptionsmenueSettingsStore";
import type OptionsmenueSettingsDTO from "@/types/common/OptionsmenueSettingsDTO";
import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";
import Fahrzeugklasse from "@/types/enum/Fahrzeugklasse";


describe("OptionsmenueSettingsStore.ts", () => {

    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("getOptionsmenueSettingsWithAllOptions", () => {
        const optionsmenueSettingsStore = useOptionsmenueSettingsStore();

        const result = optionsmenueSettingsStore.getOptionsmenueSettingsWithAllOptions();

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
            kraftfahrzeugverkehrChoosableIntervals: [ZaehldatenIntervall.STUNDE_VIERTEL],
            schwerverkehrChoosableIntervals: [ZaehldatenIntervall.STUNDE_VIERTEL, ZaehldatenIntervall.STUNDE_HALB],
            gueterverkehrChoosableIntervals: [ZaehldatenIntervall.STUNDE_VIERTEL, ZaehldatenIntervall.STUNDE_HALB, ZaehldatenIntervall.STUNDE_KOMPLETT],
            schwerverkehrsanteilProzentChoosableIntervals: [ZaehldatenIntervall.STUNDE_VIERTEL],
            gueterverkehrsanteilProzentChoosableIntervals: [ZaehldatenIntervall.STUNDE_VIERTEL, ZaehldatenIntervall.STUNDE_HALB],
            radverkehrChoosableIntervals: [ZaehldatenIntervall.STUNDE_VIERTEL, ZaehldatenIntervall.STUNDE_HALB, ZaehldatenIntervall.STUNDE_KOMPLETT],
            fussverkehrChoosableIntervals: [],
            lastkraftwagenChoosableIntervals: [],
            lastzuegeChoosableIntervals: [],
            busseChoosableIntervals: undefined,
            kraftraederChoosableIntervals: undefined,
            personenkraftwagenChoosableIntervals: undefined,
            lieferwagenChoosableIntervals: [ZaehldatenIntervall.STUNDE_VIERTEL],
        } as OptionsmenueSettingsDTO;

        const result = optionsmenueSettingsStore.getSmallestCommonDenominatorOfIntervallsForEachFahrzeugkategorieAndFahrzeugart(
            [settings1, settings2]
        );

        const expected = {
            intervall: ZaehldatenIntervall.STUNDE_HALB,
            fahrzeugklasse: Fahrzeugklasse.SUMME_KFZ,
            kraftfahrzeugverkehrChoosableIntervals: [ZaehldatenIntervall.STUNDE_VIERTEL],
            schwerverkehrChoosableIntervals: [ZaehldatenIntervall.STUNDE_VIERTEL, ZaehldatenIntervall.STUNDE_HALB],
            gueterverkehrChoosableIntervals: [ZaehldatenIntervall.STUNDE_VIERTEL, ZaehldatenIntervall.STUNDE_HALB, ZaehldatenIntervall.STUNDE_KOMPLETT],
            schwerverkehrsanteilProzentChoosableIntervals: [ZaehldatenIntervall.STUNDE_VIERTEL],
            gueterverkehrsanteilProzentChoosableIntervals: [ZaehldatenIntervall.STUNDE_VIERTEL, ZaehldatenIntervall.STUNDE_HALB],
            radverkehrChoosableIntervals: [ZaehldatenIntervall.STUNDE_VIERTEL, ZaehldatenIntervall.STUNDE_HALB, ZaehldatenIntervall.STUNDE_KOMPLETT],
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



})
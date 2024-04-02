import OptionsDTO from "@/types/zaehlung/OptionsDTO";
import Zaehldauer from "@/types/enum/Zaehldauer";
import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";
import Zeitblock from "@/types/enum/Zeitblock";
import Zeitauswahl from "@/types/enum/Zeitauswahl";

const state = {
    /**
     * Initial werden die vorgegebenen Filteroptionen gesetzt.
     */
    filteroptions: {},
    zeitblock: "",
    zeitauswahl: "",
    history: false,
};

const getters = {
    getFilteroptions(state: any): OptionsDTO {
        return state.filteroptions;
    },
    isDifferenzdatenDarstellung(state: any): boolean {
        return state.filteroptions.differenzdatenDarstellen;
    },
    isBlackprintMode(state: any): boolean {
        return state.filteroptions.blackPrintMode;
    },
    getZeitblock(state: any): string {
        return state.zeitblock;
    },
    getZeitauswahl(state: any): string {
        return state.zeitauswahl;
    },
    isHistory(state: any): boolean {
        return state.history;
    },
};

const mutations = {
    setFilteroptions(state: any, payload: OptionsDTO) {
        state.filteroptions = payload;
        state.history = false;
    },
    setFilteroptionsHistory(state: any, payload: OptionsDTO) {
        state.filteroptions = payload;
        state.history = true;
    },
    setZeitblock(state: any, payload: string) {
        state.zeitblock = payload;
    },
    setZeitauswahl(state: any, payload: string) {
        state.zeitauswahl = payload;
    },
    reloadFilteroptions(state: any) {
        state.filteroptions = Object.assign({}, state.filteroptions);
    },
};

const actions = {
    /**
     * Setzt die übergebenen Filteroptionen.
     *
     * @param context
     * @param payload
     */
    setFilteroptions(context: any, payload: OptionsDTO) {
        context.commit("setFilteroptions", payload);
    },
    setFilteroptionsHistory(context: any, payload: OptionsDTO) {
        context.commit("setFilteroptionsHistory", payload);
    },
    /**
     * Setzt die Filteroptionen auf ihren ursprünglichen Wert zurück.
     *
     * @param context
     */
    resetFilteroptions(context: any) {
        context.commit("setFilteroptions", {
            zaehldauer: Zaehldauer.DAUER_24_STUNDEN,
            intervall: ZaehldatenIntervall.STUNDE_VIERTEL,
            zeitblock: Zeitblock.ZB_00_24,
            zeitauswahl: Zeitauswahl.TAGESWERT,
            kraftfahrzeugverkehr: false,
            schwerverkehr: false,
            gueterverkehr: false,
            schwerverkehrsanteilProzent: false,
            gueterverkehrsanteilProzent: false,
            radverkehr: false,
            fussverkehr: false,
            lastkraftwagen: false,
            lastzuege: false,
            busse: false,
            kraftraeder: false,
            personenkraftwagen: false,
            pkwEinheiten: false,
            stundensumme: true,
            blocksumme: true,
            tagessumme: true,
            spitzenstunde: true,
            spitzenstundeKfz: true,
            spitzenstundeRad: false,
            spitzenstundeFuss: false,
            mittelwert: false,
            beschriftung: false,
            datentabelle: false,
            fahrzeugklassenStapeln: false,
            werteHundertRunden: false,
            differenzdatenDarstellen: false,
            basisdatum: null,
            vergleichsdatum: null,
            vonKnotenarm: null,
            // Setzen aller möglichen Knotenarme als Defaultwert da "vonKnotenarm" gleich "null"
            vonIds: [1, 2, 3, 4, 5, 6, 7, 8],
            nachKnotenarm: null,
            // Setzen aller möglichen Knotenarme als Defaultwert da "nachKnotenarm" gleich "null"
            nachIds: [1, 2, 3, 4, 5, 6, 7, 8],
            blackPrintMode: false,
            ganglinieYAchse1MaxValue: null,
            ganglinieYAchse2MaxValue: null,
            idVergleichszaehlungZeitreihe: null,
            zeitreiheGesamt: false,
        });
    },
    reloadFilteroptions(context: any) {
        context.commit("reloadFilteroptions");
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};

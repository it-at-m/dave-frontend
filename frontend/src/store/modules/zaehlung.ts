import LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import LadeKnotenarmComperator from "@/types/zaehlung/LadeKnotenarmComperator";
import LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import LadeZaehlungComperator from "@/types/zaehlung/LadeZaehlungComperator";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";

export interface StartEndeUhrzeitIntervalls {
    startUhrzeitIntervalls: string;
    endeUhrzeitIntervalls: string;
}

const state = {
    aktiveZaehlung: DefaultObjectCreator.createDefaultLadeZaehlungDto(),
    zaehlungen: [] as LadeZaehlungDTO[],
    inaktiveZaehlungen: [] as LadeZaehlungDTO[],
    sortedKnotenarme: [] as LadeKnotenarmDTO[],
    inaktiveZaehlungenVorhanden: false,
    startEndeUhrzeitIntervalls:
        DefaultObjectCreator.createDefaultStartEndeUhrzeitIntervalls(),
};

const getters = {
    // aktive Zählung
    getAktiveZaehlung(state: any) {
        return state.aktiveZaehlung;
    },
    // ID der aktiven Zählung
    getZaehlungsId(state: any) {
        if (state.aktiveZaehlung.id) {
            return state.aktiveZaehlung.id;
        }
        return undefined;
    },
    // Knotenarme der aktiven Zählung
    getKnotenarme(state: any): LadeKnotenarmDTO[] {
        if (state.aktiveZaehlung.knotenarme) {
            return state.aktiveZaehlung.knotenarme;
        }
        return [];
    },
    // sortierte Knotenarme der aktiven Zählung
    getSortedKnotenarme(state: any): LadeKnotenarmDTO[] {
        if (state.aktiveZaehlung.knotenarme) {
            return state.aktiveZaehlung.knotenarme;
        }
        return [];
    },
    // Liste aller Zählungen
    getZaehlungen(state: any): LadeZaehlungDTO[] {
        return state.zaehlungen;
    },
    //
    getInaktiveZaehlungen(state: any): LadeZaehlungDTO[] {
        return state.inaktiveZaehlungen;
    },
    isInaktiveZaehlungen(state: any): boolean {
        return state.inaktiveZaehlungenVorhanden;
    },
    // Zählung einer bestimmten ID
    getZaehlungById(state: any) {
        return (id: string): LadeZaehlungDTO | undefined => {
            const selected = state.zaehlungen.filter(
                (z: LadeZaehlungDTO) => z.id === id
            ) as LadeZaehlungDTO[];
            if (selected.length === 1) {
                return selected[0];
            } else if (selected.length > 1) {
                return selected[0];
            }
            return undefined;
        };
    },
    getStartEndeUhrzeitIntervalls(state: any): StartEndeUhrzeitIntervalls {
        return state.startEndeUhrzeitIntervalls;
    },
};

const mutations = {
    setZaehlungen(
        state: any,
        payload: { zs: LadeZaehlungDTO[]; isAnwender: boolean }
    ) {
        if (payload.isAnwender) {
            // Alles Sonderzaehlungen ausfiltern
            state.zaehlungen = payload.zs.filter(
                (value) => !value.sonderzaehlung
            );
        } else {
            state.zaehlungen = payload.zs;
        }
    },
    setZaehlungAlsAktiv(state: any, id: string) {
        if (state.zaehlungen.length > 0) {
            let aktiv = [] as LadeZaehlungDTO[];
            if (id) {
                // wenn eine ID übergeben wird, dann nimm diese als aktive Zählung
                aktiv = state.zaehlungen.filter(
                    (z: LadeZaehlungDTO) => z.id === id
                ) as LadeZaehlungDTO[];
            } else {
                // ansonsten ist es die neuste Zählung
                aktiv.push(
                    state.zaehlungen.sort(LadeZaehlungComperator.sortByDatum)[0]
                );
            }

            if (aktiv.length > 0) {
                // neue aktive Zählung setzen
                state.aktiveZaehlung = aktiv[0];
                // sortierte Knotenarme setzen
                state.sortedKnotenarme = aktiv[0].knotenarme.sort(
                    LadeKnotenarmComperator.sortByNumber
                );
                // inaktive Zählungen aktualisieren und sortieren
                const iz = state.zaehlungen.filter(
                    (z: LadeZaehlungDTO) => z.id != state.aktiveZaehlung.id
                ) as LadeZaehlungDTO[];
                state.inaktiveZaehlungen = iz.sort(
                    LadeZaehlungComperator.sortByDatum
                );
                // Wenn inaktive Zählungen vorhanden sind, dann Wert auf true setzen
                if (iz.length > 0) {
                    state.inaktiveZaehlungenVorhanden = true;
                } else {
                    state.inaktiveZaehlungenVorhanden = false;
                }
            }
        }
    },
    setStartEndeUhrzeitIntervalls(
        state: any,
        payload: StartEndeUhrzeitIntervalls
    ) {
        state.startEndeUhrzeitIntervalls = payload;
    },
};

const actions = {
    setZaehlungen(
        context: any,
        payload: { zs: LadeZaehlungDTO[]; id: string; isAnwender: boolean }
    ) {
        context.commit("setZaehlungen", {
            zs: payload.zs,
            isAnwender: payload.isAnwender,
        });
        context.commit("setZaehlungAlsAktiv", payload.id);
    },
    setZaehlungAlsAktiv(context: any, id: string) {
        context.commit("setZaehlungAlsAktiv", id);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};

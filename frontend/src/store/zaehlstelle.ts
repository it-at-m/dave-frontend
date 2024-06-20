import ZaehlstelleHeaderDTO from "@/types/zaehlstelle/ZaehlstelleHeaderDTO";
import { defineStore } from "pinia";
import { computed, ref, Ref } from "vue";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import OptionsDTO from "@/types/zaehlung/OptionsDTO";
import LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import { StartEndeUhrzeitIntervalls } from "@/types/zaehlung/StartEndeUhrzeitIntervalls";
import { useUserStore } from "@/store/user";
import LadeZaehlungComperator from "@/types/zaehlung/LadeZaehlungComperator";
import LadeKnotenarmComperator from "@/types/zaehlung/LadeKnotenarmComperator";
import { useRoute } from "vue-router/composables";

export const useZaehlstelleStore = defineStore("zaehlstelleStore", () => {
    const route = useRoute();
    // ref()s become state properties
    const zaehlstelleHeader: Ref<ZaehlstelleHeaderDTO> = ref(
        DefaultObjectCreator.createDefaultZaehlstelleHeaderDTO()
    );
    const activeTab: Ref<number> = ref(0);
    const filteroptions: Ref<OptionsDTO> = ref(
        DefaultObjectCreator.createDefaultZaehlstelleOptionsDto()
    );
    const zeitblock: Ref<string> = ref("");
    const zeitauswahl: Ref<string> = ref("");
    const history: Ref<boolean> = ref(false);
    const sizeBelastungsplanSvg: Ref<number> = ref(0);
    const maxSizeBelastungsplanSvg: Ref<number> = ref(0);
    const minSizeBelastungsplanSvg: Ref<number> = ref(0);
    const sizeBelastungsplanSvgSchematischeUebersicht: Ref<number> = ref(0);
    const maxSizeBelastungsplanSvgSchematischeUebersicht: Ref<number> = ref(0);
    const minSizeBelastungsplanSvgSchematischeUebersicht: Ref<number> = ref(0);

    const aktiveZaehlung: Ref<LadeZaehlungDTO> = ref(
        DefaultObjectCreator.createDefaultLadeZaehlungDto()
    );
    const zaehlungen: Ref<Array<LadeZaehlungDTO>> = ref([]);
    const inaktiveZaehlungen: Ref<Array<LadeZaehlungDTO>> = ref([]);
    const sortedKnotenarme: Ref<Array<LadeKnotenarmDTO>> = ref([]);
    const inaktiveZaehlungenVorhanden: Ref<boolean> = ref(false);
    const startEndeUhrzeitIntervalls: Ref<StartEndeUhrzeitIntervalls> = ref(
        DefaultObjectCreator.createDefaultStartEndeUhrzeitIntervalls()
    );
    // computed()s become getters
    const getZaehlstelleHeader = computed(() => zaehlstelleHeader.value);
    const getActiveTab = computed(() => activeTab.value);
    const getFilteroptions = computed(() => filteroptions.value);
    const isDifferenzdatenDarstellung = computed(
        () => filteroptions.value.differenzdatenDarstellen
    );
    const isBlackprintMode = computed(() => filteroptions.value.blackPrintMode);
    const getZeitblock = computed(() => zeitblock.value);
    const getZeitauswahl = computed(() => zeitauswahl.value);
    const isHistory = computed(() => history.value);
    const getSizeBelastungsplanSvg = computed(
        () => sizeBelastungsplanSvg.value
    );
    const getMaxSizeBelastungsplanSvg = computed(
        () => maxSizeBelastungsplanSvg.value
    );
    const getMinSizeBelastungsplanSvg = computed(
        () => minSizeBelastungsplanSvg.value
    );
    const getSizeBelastungsplanSvgSchematischeUebersicht = computed(
        () => sizeBelastungsplanSvgSchematischeUebersicht.value
    );
    const getMaxSizeBelastungsplanSvgSchematischeUebersicht = computed(
        () => maxSizeBelastungsplanSvgSchematischeUebersicht.value
    );
    const getMinSizeBelastungsplanSvgSchematischeUebersicht = computed(
        () => minSizeBelastungsplanSvgSchematischeUebersicht.value
    );
    const getAktiveZaehlung = computed(() => aktiveZaehlung.value);
    const getZaehlungsId = computed(() => aktiveZaehlung.value.id ?? undefined);
    const getKnotenarme = computed(() => aktiveZaehlung.value.knotenarme ?? []);
    const getSortedKnotenarme = computed(
        () => aktiveZaehlung.value.knotenarme ?? []
    );
    const getZaehlungen = computed(() => zaehlungen.value);
    const getInaktiveZaehlungen = computed(() => inaktiveZaehlungen.value);
    const hasInaktiveZaehlungen = computed(
        () => inaktiveZaehlungenVorhanden.value
    );
    const getZaehlungById = computed((id: string) => {
        const selected = zaehlungen.value.filter(
            (z: LadeZaehlungDTO) => z.id === id
        ) as LadeZaehlungDTO[];
        if (selected.length === 1) {
            return selected[0];
        } else if (selected.length > 1) {
            return selected[0];
        }
        return undefined;
    });
    const getStartEndeUhrzeitIntervalls = computed(
        () => startEndeUhrzeitIntervalls.value
    );
    // function()s become actions
    function setZaehlstelleHeader(payload: ZaehlstelleHeaderDTO) {
        payload.zaehlungen = [];
        zaehlstelleHeader.value = payload;
    }
    function setActiveTab(payload: number) {
        activeTab.value = payload;
    }
    function setFilteroptions(payload: OptionsDTO) {
        filteroptions.value = payload;
        history.value = false;
    }
    function setFilteroptionsHistory(payload: OptionsDTO) {
        filteroptions.value = payload;
        history.value = true;
    }
    function setZeitblock(payload: string) {
        zeitblock.value = payload;
    }
    function setZeitauswahl(payload: string) {
        zeitauswahl.value = payload;
    }
    function reloadFilteroptions() {
        filteroptions.value = Object.assign({}, filteroptions.value);
    }
    function resetFilteroptions() {
        filteroptions.value =
            DefaultObjectCreator.createDefaultZaehlstelleOptionsDto();
    }
    function setSizeBelastungsplanSvg(payload: number) {
        sizeBelastungsplanSvg.value = payload;
    }
    function setMaxSizeBelastungsplanSvg(payload: number) {
        maxSizeBelastungsplanSvg.value = payload;
    }
    function setMinSizeBelastungsplanSvg(payload: number) {
        minSizeBelastungsplanSvg.value = payload;
    }
    function resetSizeBelastungsplanSvg() {
        sizeBelastungsplanSvg.value = minSizeBelastungsplanSvg.value;
    }
    function setSizeBelastungsplanSvgSchematischeUebersicht(payload: number) {
        sizeBelastungsplanSvgSchematischeUebersicht.value = payload;
    }
    function setMaxSizeBelastungsplanSvgSchematischeUebersicht(
        payload: number
    ) {
        maxSizeBelastungsplanSvgSchematischeUebersicht.value = payload;
    }
    function setMinSizeBelastungsplanSvgSchematischeUebersicht(
        payload: number
    ) {
        minSizeBelastungsplanSvgSchematischeUebersicht.value = payload;
    }
    function resetSizeBelastungsplanSvgSchematischeUebersicht() {
        sizeBelastungsplanSvgSchematischeUebersicht.value =
            minSizeBelastungsplanSvgSchematischeUebersicht.value;
    }
    function setZaehlungen(payload: Array<LadeZaehlungDTO>) {
        const userStore = useUserStore();
        if (userStore.hasAuthorities && userStore.isAnwender) {
            zaehlungen.value = payload.filter((value) => !value.sonderzaehlung);
        } else {
            zaehlungen.value = payload;
        }
        setZaehlungAlsAktiv(route.params.zaehlungId);
    }
    function setZaehlungAlsAktiv(payload: string) {
        if (zaehlungen.value.length > 0) {
            let aktiv = [] as LadeZaehlungDTO[];
            if (payload) {
                // wenn eine ID übergeben wird, dann nimm diese als aktive Zählung
                aktiv = zaehlungen.value.filter(
                    (z: LadeZaehlungDTO) => z.id === payload
                ) as LadeZaehlungDTO[];
            } else {
                // ansonsten ist es die neuste Zählung
                aktiv.push(
                    zaehlungen.value.sort(LadeZaehlungComperator.sortByDatum)[0]
                );
            }

            if (aktiv.length > 0) {
                // neue aktive Zählung setzen
                aktiveZaehlung.value = aktiv[0];
                // sortierte Knotenarme setzen
                sortedKnotenarme.value = aktiv[0].knotenarme.sort(
                    LadeKnotenarmComperator.sortByNumber
                );
                // inaktive Zählungen aktualisieren und sortieren
                const iz = zaehlungen.value.filter(
                    (z: LadeZaehlungDTO) => z.id != aktiveZaehlung.value.id
                ) as LadeZaehlungDTO[];
                inaktiveZaehlungen.value = iz.sort(
                    LadeZaehlungComperator.sortByDatum
                );
                // Wenn inaktive Zählungen vorhanden sind, dann Wert auf true setzen
                if (iz.length > 0) {
                    inaktiveZaehlungenVorhanden.value = true;
                } else {
                    inaktiveZaehlungenVorhanden.value = false;
                }
            }
        }
    }
    function setStartEndeUhrzeitIntervalls(
        payload: StartEndeUhrzeitIntervalls
    ) {
        startEndeUhrzeitIntervalls.value = payload;
    }

    return {
        getZaehlstelleHeader,
        getActiveTab,
        getFilteroptions,
        isDifferenzdatenDarstellung,
        isBlackprintMode,
        getZeitblock,
        getZeitauswahl,
        isHistory,
        getSizeBelastungsplanSvg,
        getMaxSizeBelastungsplanSvg,
        getMinSizeBelastungsplanSvg,
        getSizeBelastungsplanSvgSchematischeUebersicht,
        getMaxSizeBelastungsplanSvgSchematischeUebersicht,
        getMinSizeBelastungsplanSvgSchematischeUebersicht,
        getAktiveZaehlung,
        getZaehlungsId,
        getKnotenarme,
        getSortedKnotenarme,
        getZaehlungen,
        getInaktiveZaehlungen,
        hasInaktiveZaehlungen,
        getZaehlungById,
        getStartEndeUhrzeitIntervalls,
        setZaehlstelleHeader,
        setActiveTab,
        setFilteroptions,
        setFilteroptionsHistory,
        setZeitblock,
        setZeitauswahl,
        reloadFilteroptions,
        resetFilteroptions,
        setSizeBelastungsplanSvg,
        setMaxSizeBelastungsplanSvg,
        setMinSizeBelastungsplanSvg,
        resetSizeBelastungsplanSvg,
        setSizeBelastungsplanSvgSchematischeUebersicht,
        setMaxSizeBelastungsplanSvgSchematischeUebersicht,
        setMinSizeBelastungsplanSvgSchematischeUebersicht,
        resetSizeBelastungsplanSvgSchematischeUebersicht,
        setZaehlungen,
        setZaehlungAlsAktiv,
        setStartEndeUhrzeitIntervalls,
    };
});
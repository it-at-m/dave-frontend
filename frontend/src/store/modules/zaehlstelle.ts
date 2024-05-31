import ZaehlstelleHeaderDTO from "@/types/zaehlstelle/ZaehlstelleHeaderDTO";
import { defineStore } from "pinia";
import { computed, ref, Ref } from "vue";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import OptionsDTO from "@/types/zaehlung/OptionsDTO";

export const useZaehlstelleStore = defineStore("zaehlstelleStore", () => {
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
    };
});

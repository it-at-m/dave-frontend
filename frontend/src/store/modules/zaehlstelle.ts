import ZaehlstelleHeaderDTO from "@/types/zaehlstelle/ZaehlstelleHeaderDTO";
import { defineStore } from "pinia";
import { computed, ref, Ref } from "vue";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";

export const useZaehlstelleStore = defineStore("zaehlstelleStore", () => {
    // ref()s become state properties
    const zaehlstelleHeader: Ref<ZaehlstelleHeaderDTO> = ref(
        DefaultObjectCreator.createDefaultZaehlstelleHeaderDTO()
    );
    const activeTab = ref(0);
    const sizeBelastungsplanSvg: Ref<number> = ref(0);
    const maxSizeBelastungsplanSvg: Ref<number> = ref(0);
    const minSizeBelastungsplanSvg: Ref<number> = ref(0);
    const sizeBelastungsplanSvgSchematischeUebersicht: Ref<number> = ref(0);
    const maxSizeBelastungsplanSvgSchematischeUebersicht: Ref<number> = ref(0);
    const minSizeBelastungsplanSvgSchematischeUebersicht: Ref<number> = ref(0);
    // computed()s become getters
    const getZaehlstelleHeader = computed(() => zaehlstelleHeader.value);
    const getActiveTab = computed(() => activeTab.value);
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
        getSizeBelastungsplanSvg,
        getMaxSizeBelastungsplanSvg,
        getMinSizeBelastungsplanSvg,
        getSizeBelastungsplanSvgSchematischeUebersicht,
        getMaxSizeBelastungsplanSvgSchematischeUebersicht,
        getMinSizeBelastungsplanSvgSchematischeUebersicht,
        setZaehlstelleHeader,
        setActiveTab,
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

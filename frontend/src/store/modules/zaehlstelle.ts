import ZaehlstelleHeaderDTO from "@/types/zaehlstelle/ZaehlstelleHeaderDTO";
import { defineStore } from "pinia";
import { computed, ref, Ref } from "vue";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";

export const useZaehlstelleStore = defineStore("zaehlstelle", () => {
    // ref()s become state properties
    const zaehlstelleHeader: Ref<ZaehlstelleHeaderDTO> = ref(
        DefaultObjectCreator.createDefaultZaehlstelleHeaderDTO()
    );
    const activeTab = ref(0);
    // computed()s become getters
    const getZaehlstelleHeader = computed(() => zaehlstelleHeader.value);
    const getActiveTab = computed(() => activeTab.value);
    // function()s become actions
    function setZaehlstelleHeader(payload: ZaehlstelleHeaderDTO) {
        payload.zaehlungen = [];
        zaehlstelleHeader.value = payload;
    }
    function setActiveTab(payload: number) {
        activeTab.value = payload;
    }

    return {
        getZaehlstelleHeader,
        getActiveTab,
        setZaehlstelleHeader,
        setActiveTab,
    };
});

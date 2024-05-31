import MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import DetektierteFahrzeugart from "@/types/enum/DetektierteFahrzeugart";
import { defineStore } from "pinia";
import { computed, ref, Ref } from "vue";

export const useMessstelleStore = defineStore("messstelleStore", () => {
    // ref()s become state properties
    const messstelleInfo: Ref<MessstelleInfoDTO> = ref({} as MessstelleInfoDTO);
    const activeTab: Ref<number> = ref(0);
    // computed()s become getters
    const getMessstelleInfo = computed(() => messstelleInfo.value);
    const getActiveTab = computed(() => activeTab.value);
    const isKfzMessstelle = computed(
        () =>
            messstelleInfo.value.detektierteVerkehrsarten ===
            DetektierteFahrzeugart.KFZ
    );
    // function()s become actions
    function setActiveTab(payload: number) {
        activeTab.value = payload;
    }
    function setMessstelleInfo(payload: MessstelleInfoDTO) {
        messstelleInfo.value = payload;
    }

    return {
        getMessstelleInfo,
        getActiveTab,
        isKfzMessstelle,
        setActiveTab,
        setMessstelleInfo,
    };
});

import MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import DetektierteFahrzeugart from "@/types/enum/DetektierteFahrzeugart";
import { defineStore } from "pinia";
import { computed, ref, Ref } from "vue";
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import _ from "lodash";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";

export const useMessstelleStore = defineStore("messstelleStore", () => {
    // ref()s become state properties
    const messstelleInfo: Ref<MessstelleInfoDTO> = ref({} as MessstelleInfoDTO);
    const activeTab: Ref<number> = ref(0);
    const filterOptions: Ref<MessstelleOptionsDTO> = ref(
        DefaultObjectCreator.createDefaultMessstelleOptions()
    );
    const direction: Ref<string> = ref("");
    const history: Ref<boolean> = ref(false);
    const belastungsplanMinSize: Ref<number> = ref(0);
    const belastungsplanMaxSize: Ref<string> = ref("");
    const belastungsplanChosenSize: Ref<number> = ref(1);
    // computed()s become getters
    const getMessstelleInfo = computed(() => messstelleInfo.value);
    const getActiveTab = computed(() => activeTab.value);
    const isKfzMessstelle = computed(
        () =>
            messstelleInfo.value.detektierteVerkehrsarten ===
            DetektierteFahrzeugart.KFZ
    );
    const getFilteroptions = computed(() => filterOptions.value);
    const getDirection = computed(() => direction.value);
    const isHistory = computed(() => history.value);
    const getBelastungsplanMinSize = computed(
        () => belastungsplanMinSize.value
    );
    const getBelastungsplanMaxSize = computed(
        () => belastungsplanMinSize.value
    );
    const getBelastungsplanChosenSize = computed(
        () => belastungsplanChosenSize.value
    );
    // function()s become actions
    function setActiveTab(payload: number) {
        activeTab.value = payload;
    }
    function setMessstelleInfo(payload: MessstelleInfoDTO) {
        messstelleInfo.value = payload;
    }
    function setFilteroptions(payload: MessstelleOptionsDTO) {
        filterOptions.value = payload;
        history.value = false;
    }
    function setFilteroptionsHistory(payload: MessstelleOptionsDTO) {
        filterOptions.value = payload;
        history.value = true;
    }
    function setDirection(payload: string) {
        direction.value = payload;
    }
    function reloadFilteroptions() {
        filterOptions.value = _.cloneDeep(filterOptions.value);
    }
    function setBelastungsplanMinSize(payload: number) {
        belastungsplanMinSize.value = payload;
    }
    function setBelastungsplanMaxSize(payload: string) {
        belastungsplanMaxSize.value = payload;
    }
    function setBelastungsplanChosenSize(payload: number) {
        belastungsplanChosenSize.value = payload;
    }

    return {
        getMessstelleInfo,
        getActiveTab,
        isKfzMessstelle,
        getFilteroptions,
        getDirection,
        isHistory,
        getBelastungsplanMinSize,
        getBelastungsplanMaxSize,
        getBelastungsplanChosenSize,
        setActiveTab,
        setMessstelleInfo,
        setFilteroptions,
        setFilteroptionsHistory,
        setDirection,
        reloadFilteroptions,
        setBelastungsplanMinSize,
        setBelastungsplanMaxSize,
        setBelastungsplanChosenSize,
    };
});

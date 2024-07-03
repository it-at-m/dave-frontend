import BaseAsset from "@/types/pdfreport/assets/BaseAsset";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

/**
 * Dieser Store ist eine Art Queue, um ein oder mehrere Assets in die ReportView zu bringen. Die Datenhaltung erfolgt
 * dann in der Queue selbst. Der Store muss nach jedem Sortiervorgang, hinzufügen, löschen etc. wieder geupdated werden.
 */
export const usePdfReportStore = defineStore("pdfReportStore", () => {
    // ref()s become state properties
    const assets = ref<Array<BaseAsset>>([]);
    const hasTitlePage= ref(false);
    // computed()s become getters
    const getAssets = computed(() => assets.value);
    const getHasTitlePage = computed(() => hasTitlePage.value);
    // function()s become actions
    function addAsset(payload: BaseAsset) {
        assets.value.push(payload);
    }
    function addAssets(payload: Array<BaseAsset>) {
        assets.value.push(...payload);
    }
    function setAssets(payload: Array<BaseAsset>) {
        assets.value = payload;
    }
    function setHasTitlePage() {
        hasTitlePage.value = true;
    }

    return {
        getAssets,
        getHasTitlePage,
        addAsset,
        addAssets,
        setAssets,
        setHasTitlePage,
    };
});

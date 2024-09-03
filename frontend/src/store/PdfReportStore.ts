import { defineStore } from "pinia";
import { computed, ref } from "vue";

import BaseAsset from "@/types/pdfreport/assets/BaseAsset";

/**
 * Dieser Store ist eine Art Queue, um ein oder mehrere Assets in die ReportView zu bringen. Die Datenhaltung erfolgt
 * dann in der Queue selbst. Der Store muss nach jedem Sortiervorgang, hinzufügen, löschen etc. wieder geupdated werden.
 */
export const usePdfReportStore = defineStore("pdfReportStore", () => {
  const assets = ref<Array<BaseAsset>>([]);
  const hasTitlePage = ref(false);

  const getAssets = computed(() => assets.value);
  const getHasTitlePage = computed(() => hasTitlePage.value);

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

import type MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";

import { cloneDeep } from "lodash";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import DefaultObjectCreator from "@/util/DefaultObjectCreator";

export const useGesamtauswertungStore = defineStore(
  "gesamtauswertungStore",
  () => {
    const auswertungMessstelleOptions = ref<MessstelleAuswertungOptionsDTO>(
      DefaultObjectCreator.createDefaultMessstelleAuswertungOptions()
    );

    const getAuswertungMessstelleOptions = computed(
      () => auswertungMessstelleOptions.value
    );

    function setAuswertungMessstelleOptions(
      payload: MessstelleAuswertungOptionsDTO
    ) {
      auswertungMessstelleOptions.value = cloneDeep(payload);
    }

    return { getAuswertungMessstelleOptions, setAuswertungMessstelleOptions };
  }
);

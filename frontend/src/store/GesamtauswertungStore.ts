import type MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";
import type LadeZaehldatenSteplineDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenSteplineDTO";

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
    const zaehldatenMessstellen = ref<LadeZaehldatenSteplineDTO>(
      DefaultObjectCreator.createDefaultLadeZaehldatenSteplineDTO()
    );

    const getAuswertungMessstelleOptions = computed(
      () => auswertungMessstelleOptions.value
    );
    const getZaehldatenMessstellen = computed(
      () => zaehldatenMessstellen.value
    );

    function setAuswertungMessstelleOptions(
      payload: MessstelleAuswertungOptionsDTO
    ) {
      auswertungMessstelleOptions.value = cloneDeep(payload);
    }
    function setZaehldatenMessstellen(payload: LadeZaehldatenSteplineDTO) {
      zaehldatenMessstellen.value = cloneDeep(payload);
    }

    return {
      getAuswertungMessstelleOptions,
      getZaehldatenMessstellen,
      setAuswertungMessstelleOptions,
      setZaehldatenMessstellen,
    };
  }
);

import type MapConfigurationDTO from "@/types/configuration/MapConfigurationDTO";

import { defineStore } from "pinia";
import { computed, ref } from "vue";

import DefaultObjectCreator from "@/util/DefaultObjectCreator";

export const useMapConfigStore = defineStore("mapConfigStore", () => {
  const mapConfig = ref<MapConfigurationDTO>(
    DefaultObjectCreator.createDefaultMapConfigDTO()
  );

  const getMapConfig = computed(() => mapConfig.value);

  function setMapConfig(payload: MapConfigurationDTO) {
    mapConfig.value = payload;
  }

  return {
    getMapConfig,
    setMapConfig,
  };
});

import { defineStore } from "pinia";
import { computed, ref } from "vue";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import type MapConfigDTO from "@/types/karte/MapConfigDTO";

export const useMapConfigStore = defineStore("mapConfigStore", () => {
  const mapConfig = ref<MapConfigDTO>(
      DefaultObjectCreator.createDefaultMapConfigDTO()
  );

  const getMapConfig = computed(() => mapConfig.value);

  function setMapConfig(payload: MapConfigDTO) {
    mapConfig.value = payload;
  }

  return {
    getMapConfig,
    setMapConfig
  };
});

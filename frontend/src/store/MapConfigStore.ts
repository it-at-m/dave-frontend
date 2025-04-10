import { defineStore } from "pinia";
import { computed, ref } from "vue";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import type MapConfigDTO from "@/types/init/MapConfigDTO";

export const useMapConfigStore = defineStore("mapOptionsStore", () => {
  const mapConfig = ref<MapConfigDTO>(
      DefaultObjectCreator.createMapConfig()
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

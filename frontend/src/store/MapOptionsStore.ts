import type MapOptions from "@/types/karte/MapOptions";

import { defineStore } from "pinia";
import { computed, ref } from "vue";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";

export const useMapOptionsStore = defineStore("mapOptionsStore", () => {
  const mapOptions = ref<MapOptions>(
      DefaultObjectCreator.createMapOptions()
  );

  const getMapOptions = computed(() => mapOptions.value);

  function setMapOptions(payload: MapOptions) {
    mapOptions.value = payload;
  }

  function resetMapOptions() {
    mapOptions.value = DefaultObjectCreator.createMapOptions();
  }

  return {
    getMapOptions,
    setMapOptions,
    resetMapOptions,
  };
});

import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type MapOptions from "@/types/karte/MapOptions";

export const useMapOptionsStore = defineStore("mapOptionsStore", () => {
  const mapOptions = ref<MapOptions | undefined>(undefined);

  const getMapOptions = computed(() => mapOptions.value);

  function setMapOptions(payload: MapOptions) {
    mapOptions.value = payload;
  }

  return {
    getMapOptions,
    setMapOptions,
  };
});

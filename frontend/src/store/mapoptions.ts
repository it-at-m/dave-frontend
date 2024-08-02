import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type MapOptions from "@/types/karte/MapOptions";

export const useMapOptionsStore = defineStore("mapOptionsStore", () => {
  // ref()s become state properties
  const mapOptions = ref<MapOptions | undefined>(undefined);
  // computed()s become getters
  const getMapOptions = computed(() => mapOptions.value);
  // function()s become actions
  function setMapOptions(payload: MapOptions) {
    mapOptions.value = payload;
  }

  return {
    getMapOptions,
    setMapOptions,
  };
});

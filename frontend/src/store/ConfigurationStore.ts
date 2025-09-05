import type ConfigurationDTO from "@/types/configuration/ConfigurationDTO";

import { defineStore } from "pinia";
import { computed, ref } from "vue";

import DefaultObjectCreator from "@/util/DefaultObjectCreator";

export const useConfigurationStore = defineStore("configurationStore", () => {
  const configuration = ref<ConfigurationDTO>(
    DefaultObjectCreator.createDefaultConfigurationDTO()
  );

  const getMapConfiguration = computed(() => configuration.value.map);

  const getZaehlstelleConfiguration = computed(
    () => configuration.value.zaehlstelle
  );

  function setConfiguration(payload: ConfigurationDTO) {
    configuration.value = payload;
  }

  return {
    getMapConfiguration,
    getZaehlstelleConfiguration,
    setConfiguration,
  };
});

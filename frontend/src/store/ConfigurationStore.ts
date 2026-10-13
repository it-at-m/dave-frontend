import type ConfigurationDTO from "@/types/configuration/ConfigurationDTO";

import { defineStore } from "pinia";
import { computed, ref } from "vue";

import DefaultObjectCreator from "@/util/DefaultObjectCreator";

export const useConfigurationStore = defineStore("configurationStore", () => {
  const configuration = ref<ConfigurationDTO>(
    DefaultObjectCreator.createDefaultConfigurationDTO()
  );

  const getZaehlstelleConfiguration = computed(
    () => configuration.value.zaehlstelle
  );

  const getTenantConfiguration = computed(() => configuration.value.tenant);

  function setConfiguration(payload: ConfigurationDTO) {
    configuration.value = payload;
  }

  return {
    getZaehlstelleConfiguration,
    getTenantConfiguration,
    setConfiguration,
  };
});

import type OptionsmenueSettingsDTO from "@/types/common/OptionsmenueSettingsDTO";
import type Fahrzeugklasse from "@/types/enum/Fahrzeugklasse";
import type ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";

import { isNil, toArray } from "lodash";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useOptionsmenueSettingsStore = defineStore(
  "optionsmenueSettingsStore",
  () => {
    const DEFAULT_KEY: string = "default";

    const optionsmenueSettingsByIntervallAndFahrzeugklasse = ref<
      Map<string, OptionsmenueSettingsDTO>
    >(new Map<string, OptionsmenueSettingsDTO>());

    function setOptionsmenueSettingsByIntervallAndFahrzeugklasse(
      payload: Array<OptionsmenueSettingsDTO> | undefined
    ): void {
      optionsmenueSettingsByIntervallAndFahrzeugklasse.value = new Map<
        string,
        OptionsmenueSettingsDTO
      >();
      toArray(payload).forEach((optionsmenueSettings) => {
        const key = getMapKeyOfIntervallAndFahrzeugklasse(
          optionsmenueSettings.fahrzeugklasse,
          optionsmenueSettings.intervall
        );
        optionsmenueSettingsByIntervallAndFahrzeugklasse.value.set(
          key,
          optionsmenueSettings
        );
      });
    }

    function getOptionsmenueSettingsByIntervallAndFahrzeugklasse(
      fahrzeugklasse: Fahrzeugklasse | undefined,
      intervall: ZaehldatenIntervall | undefined
    ): OptionsmenueSettingsDTO | undefined {
      const key = getMapKeyOfIntervallAndFahrzeugklasse(
        fahrzeugklasse,
        intervall
      );
      return optionsmenueSettingsByIntervallAndFahrzeugklasse.value.get(key);
    }

    /**
     * Erstellt auf Basis der im Parameter gegeben Fahrzeugklasse und den Intervall den Schlüssel
     * für die im Store hinterlegte Map.
     *
     * @param fahrzeugklasse
     * @param intervall
     */
    function getMapKeyOfIntervallAndFahrzeugklasse(
      fahrzeugklasse: Fahrzeugklasse | undefined,
      intervall: ZaehldatenIntervall | undefined
    ): string {
      if (isNil(fahrzeugklasse) && isNil(intervall)) {
        return DEFAULT_KEY + "-" + DEFAULT_KEY;
      } else if (isNil(fahrzeugklasse) && !isNil(intervall)) {
        return DEFAULT_KEY + "-" + intervall;
      } else if (!isNil(fahrzeugklasse) && isNil(intervall)) {
        return fahrzeugklasse + "-" + DEFAULT_KEY;
      } else {
        return fahrzeugklasse + "-" + intervall;
      }
    }

    return {
      setOptionsmenueSettingsByIntervallAndFahrzeugklasse,
      getOptionsmenueSettingsByIntervallAndFahrzeugklasse,
    };
  }
);

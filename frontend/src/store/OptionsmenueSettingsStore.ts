import type OptionsmenueSettingsDTO from "@/types/common/OptionsmenueSettingsDTO";
import type MessfaehigkeitDTO from "@/types/messstelle/MessfaehigkeitDTO";

import { intersection, isEmpty, isNil, toArray, union } from "lodash";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import Fahrzeugklasse from "@/types/enum/Fahrzeugklasse";
import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";

export const useOptionsmenueSettingsStore = defineStore(
  "optionsmenueSettingsStore",
  () => {
    const DEFAULT_KEY: string = "default";

    const optionsmenueSettingsByIntervallAndFahrzeugklasse = ref<
      Map<string, OptionsmenueSettingsDTO>
    >(new Map<string, OptionsmenueSettingsDTO>());

    const optionsmenueSettingsByMessfaehigkeiten = ref<OptionsmenueSettingsDTO>(
      getOptionsmenueSettingsWithAllOptions()
    );

    const intervalleByOptionsmenueSettingsAccordingMessfaehigkeiten = computed(
      () =>
        union(
          optionsmenueSettingsByMessfaehigkeiten.value
            .kraftfahrzeugverkehrChoosableIntervals,
          optionsmenueSettingsByMessfaehigkeiten.value
            .schwerverkehrChoosableIntervals,
          optionsmenueSettingsByMessfaehigkeiten.value
            .gueterverkehrChoosableIntervals,
          optionsmenueSettingsByMessfaehigkeiten.value
            .schwerverkehrsanteilProzentChoosableIntervals,
          optionsmenueSettingsByMessfaehigkeiten.value
            .gueterverkehrsanteilProzentChoosableIntervals,
          optionsmenueSettingsByMessfaehigkeiten.value
            .radverkehrChoosableIntervals,
          optionsmenueSettingsByMessfaehigkeiten.value
            .fussverkehrChoosableIntervals,
          optionsmenueSettingsByMessfaehigkeiten.value
            .lastkraftwagenChoosableIntervals,
          optionsmenueSettingsByMessfaehigkeiten.value
            .lastzuegeChoosableIntervals,
          optionsmenueSettingsByMessfaehigkeiten.value.busseChoosableIntervals,
          optionsmenueSettingsByMessfaehigkeiten.value
            .kraftraederChoosableIntervals,
          optionsmenueSettingsByMessfaehigkeiten.value
            .personenkraftwagenChoosableIntervals,
          optionsmenueSettingsByMessfaehigkeiten.value
            .lieferwagenChoosableIntervals
        )
    );

    const getOptionsmenueSettingsByMessfaehigkeiten = computed(
      () => optionsmenueSettingsByMessfaehigkeiten.value
    );

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

    function setOptionsmenueSettingsByMessfaehigkeiten(
      messfaehigkeiten: Array<MessfaehigkeitDTO> | undefined
    ) {
      let optionsmenueSettings = toArray(messfaehigkeiten)
        .map((messfaehigkeit) => {
          return getOptionsmenueSettingsByIntervallAndFahrzeugklasse(
            messfaehigkeit.fahrzeugklassen,
            messfaehigkeit.intervall
          );
        })
        .filter((settingsOptionsmenue) => !isNil(settingsOptionsmenue));

      // Setzen der Defaultsettings falls keine Settings auf Basis der Messfaehigkeiten extrahiert werden konnten.
      if (isEmpty(optionsmenueSettings)) {
        const defaultSettingsOptionsmenue =
          getOptionsmenueSettingsByIntervallAndFahrzeugklasse(
            undefined,
            undefined
          );
        if (isNil(defaultSettingsOptionsmenue)) {
          // When no default settings are available -> All is allowed
          optionsmenueSettings = [getOptionsmenueSettingsWithAllOptions()];
        } else {
          optionsmenueSettings = [defaultSettingsOptionsmenue];
        }
      }

      // Aggregation der gefundenen Settings mittels Schnittmengenbildung der Intervalle.
      const initialSettings = {
        intervall: ZaehldatenIntervall.STUNDE_HALB,
        fahrzeugklasse: Fahrzeugklasse.SUMME_KFZ,
      } as OptionsmenueSettingsDTO;
      optionsmenueSettingsByMessfaehigkeiten.value =
        optionsmenueSettings.reduce(
          (
            previousSettings: OptionsmenueSettingsDTO,
            currentSettings: OptionsmenueSettingsDTO
          ) => {
            currentSettings.kraftfahrzeugverkehrChoosableIntervals =
              intersection(
                toArray(
                  previousSettings.kraftfahrzeugverkehrChoosableIntervals
                ),
                toArray(currentSettings.kraftfahrzeugverkehrChoosableIntervals)
              );
            currentSettings.schwerverkehrChoosableIntervals = intersection(
              toArray(previousSettings.schwerverkehrChoosableIntervals),
              toArray(currentSettings.schwerverkehrChoosableIntervals)
            );
            currentSettings.gueterverkehrChoosableIntervals = intersection(
              toArray(previousSettings.gueterverkehrChoosableIntervals),
              toArray(currentSettings.gueterverkehrChoosableIntervals)
            );
            currentSettings.schwerverkehrsanteilProzentChoosableIntervals =
              intersection(
                toArray(
                  previousSettings.schwerverkehrsanteilProzentChoosableIntervals
                ),
                toArray(
                  currentSettings.schwerverkehrsanteilProzentChoosableIntervals
                )
              );
            currentSettings.gueterverkehrsanteilProzentChoosableIntervals =
              intersection(
                toArray(
                  previousSettings.gueterverkehrsanteilProzentChoosableIntervals
                ),
                toArray(
                  currentSettings.gueterverkehrsanteilProzentChoosableIntervals
                )
              );
            currentSettings.radverkehrChoosableIntervals = intersection(
              toArray(previousSettings.radverkehrChoosableIntervals),
              toArray(currentSettings.radverkehrChoosableIntervals)
            );
            currentSettings.fussverkehrChoosableIntervals = intersection(
              toArray(previousSettings.fussverkehrChoosableIntervals),
              toArray(currentSettings.fussverkehrChoosableIntervals)
            );
            currentSettings.lastkraftwagenChoosableIntervals = intersection(
              toArray(previousSettings.lastkraftwagenChoosableIntervals),
              toArray(currentSettings.lastkraftwagenChoosableIntervals)
            );
            currentSettings.lastzuegeChoosableIntervals = intersection(
              toArray(previousSettings.lastzuegeChoosableIntervals),
              toArray(currentSettings.lastzuegeChoosableIntervals)
            );
            currentSettings.busseChoosableIntervals = intersection(
              toArray(previousSettings.busseChoosableIntervals),
              toArray(currentSettings.busseChoosableIntervals)
            );
            currentSettings.kraftraederChoosableIntervals = intersection(
              toArray(previousSettings.kraftraederChoosableIntervals),
              toArray(currentSettings.kraftraederChoosableIntervals)
            );
            currentSettings.personenkraftwagenChoosableIntervals = intersection(
              toArray(previousSettings.personenkraftwagenChoosableIntervals),
              toArray(currentSettings.personenkraftwagenChoosableIntervals)
            );
            currentSettings.lieferwagenChoosableIntervals = intersection(
              toArray(previousSettings.lieferwagenChoosableIntervals),
              toArray(currentSettings.lieferwagenChoosableIntervals)
            );
            return currentSettings;
          },
          initialSettings
        );
    }

    function getOptionsmenueSettingsWithAllOptions(): OptionsmenueSettingsDTO {
      const defaultIntervals = [
        ZaehldatenIntervall.STUNDE_VIERTEL,
        ZaehldatenIntervall.STUNDE_HALB,
        ZaehldatenIntervall.STUNDE_KOMPLETT,
      ];
      return {
        intervall: ZaehldatenIntervall.STUNDE_HALB,
        fahrzeugklasse: Fahrzeugklasse.SUMME_KFZ,
        kraftfahrzeugverkehrChoosableIntervals: defaultIntervals,
        schwerverkehrChoosableIntervals: defaultIntervals,
        gueterverkehrChoosableIntervals: defaultIntervals,
        schwerverkehrsanteilProzentChoosableIntervals: defaultIntervals,
        gueterverkehrsanteilProzentChoosableIntervals: defaultIntervals,
        radverkehrChoosableIntervals: defaultIntervals,
        fussverkehrChoosableIntervals: defaultIntervals,
        lastkraftwagenChoosableIntervals: defaultIntervals,
        lastzuegeChoosableIntervals: defaultIntervals,
        busseChoosableIntervals: defaultIntervals,
        kraftraederChoosableIntervals: defaultIntervals,
        personenkraftwagenChoosableIntervals: defaultIntervals,
        lieferwagenChoosableIntervals: defaultIntervals,
      } as OptionsmenueSettingsDTO;
    }

    return {
      intervalleByOptionsmenueSettingsAccordingMessfaehigkeiten,
      getOptionsmenueSettingsByMessfaehigkeiten,
      setOptionsmenueSettingsByMessfaehigkeiten,
      setOptionsmenueSettingsByIntervallAndFahrzeugklasse,
    };
  }
);

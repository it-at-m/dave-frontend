import { computed } from "vue";

import { useMessstelleStore } from "@/store/MessstelleStore";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import { zeitblockInfo } from "@/types/enum/Zeitblock";

export function useBelastungsplanAnzeigeUtils() {
  const zaehlstelleStore = useZaehlstelleStore();
  const messstelleStore = useMessstelleStore();

  const chosenOptionsCopy = computed(() => {
    return messstelleStore.getFilteroptions;
  });

  const chosenOptionsCopyFahrzeuge = computed(() => {
    return chosenOptionsCopy.value.fahrzeuge;
  });

  const isSvpInBelastungsPlan = computed(() => {
    let actualNumberOfSelectedKfzSvAndGv = 0;
    if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
      actualNumberOfSelectedKfzSvAndGv++;
    }
    if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
      actualNumberOfSelectedKfzSvAndGv++;
    }
    if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
      actualNumberOfSelectedKfzSvAndGv++;
    }
    return (
      chosenOptionsCopyFahrzeuge.value.schwerverkehrsanteilProzent &&
      (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr ||
        chosenOptionsCopyFahrzeuge.value.schwerverkehr ||
        chosenOptionsCopyFahrzeuge.value.gueterverkehr) &&
      actualNumberOfSelectedKfzSvAndGv < 3
    );
  });

  /**
   * Hilfsmethode, um zu schauen, ob der Wert GV% im Belastungsplan angezeigt wird.
   * Dies ist nur der Fall, wenn KFZ, SV oder GV aktiviert sind und inklusive GV_P nicht
   * mehr wie 3 Verkehrsarten (ohne RAD und FUSS) ausgewählt sind
   */
  const isGvpInBelastungsPlan = computed(() => {
    let actualNumberOfSelectedKfzSvGvAndSvp = 0;
    if (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr) {
      actualNumberOfSelectedKfzSvGvAndSvp++;
    }
    if (chosenOptionsCopyFahrzeuge.value.schwerverkehr) {
      actualNumberOfSelectedKfzSvGvAndSvp++;
    }
    if (chosenOptionsCopyFahrzeuge.value.gueterverkehr) {
      actualNumberOfSelectedKfzSvGvAndSvp++;
    }
    if (chosenOptionsCopyFahrzeuge.value.schwerverkehrsanteilProzent) {
      actualNumberOfSelectedKfzSvGvAndSvp++;
    }
    return (
      chosenOptionsCopyFahrzeuge.value.gueterverkehrsanteilProzent &&
      (chosenOptionsCopyFahrzeuge.value.kraftfahrzeugverkehr ||
        chosenOptionsCopyFahrzeuge.value.schwerverkehr ||
        chosenOptionsCopyFahrzeuge.value.gueterverkehr) &&
      actualNumberOfSelectedKfzSvGvAndSvp < 3
    );
  });

  const zeitauswahlAndAdditionalZeitblockWhenSpitzenstundeIsChosenForZaehlstelle =
    computed<string>(() => {
      return getZeitauswahlAndAdditionalZeitblockWhenSpitzenstundeIsChosen(
        zaehlstelleStore.getFilteroptions.zeitauswahl,
        zaehlstelleStore.getFilteroptions.zeitblock
      );
    });

  const zeitauswahlAndAdditionalZeitblockWhenSpitzenstundeIsChosenForMessstelle =
    computed<string>(() => {
      return getZeitauswahlAndAdditionalZeitblockWhenSpitzenstundeIsChosen(
        messstelleStore.getFilteroptions.zeitauswahl,
        messstelleStore.getFilteroptions.zeitblock
      );
    });

  function getZeitauswahlAndAdditionalZeitblockWhenSpitzenstundeIsChosen(
    zeitauswahl: string,
    zeitblock: string
  ): string {
    let zeitauswahlWithZeitblock = zeitauswahl;
    if (
      zeitauswahl === Zeitauswahl.SPITZENSTUNDE_KFZ ||
      zeitauswahl === Zeitauswahl.SPITZENSTUNDE_RAD ||
      zeitauswahl === Zeitauswahl.SPITZENSTUNDE_FUSS
    ) {
      zeitauswahlWithZeitblock =
        zeitauswahlWithZeitblock +
        " (Block " +
        zeitblockInfo.get(zeitblock)?.title +
        ")";
    }
    return zeitauswahlWithZeitblock;
  }

  return {
    isGvpInBelastungsPlan,
    isSvpInBelastungsPlan,
    zeitauswahlAndAdditionalZeitblockWhenSpitzenstundeIsChosenForZaehlstelle,
    zeitauswahlAndAdditionalZeitblockWhenSpitzenstundeIsChosenForMessstelle,
  };
}

import { computed } from "vue";

import { useMessstelleStore } from "@/store/MessstelleStore";

export function belastungsplanAnzeigeUtils() {
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

  return { isGvpInBelastungsPlan, isSvpInBelastungsPlan };
}

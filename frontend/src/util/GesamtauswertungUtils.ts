import type FahrzeugOptions from "@/types/messstelle/FahrzeugOptions";

import {
  AuswertungsZeitraum,
  auswertungszeitraumToText,
} from "@/types/enum/AuswertungCategories";

export function useGesamtauswertungUtils() {
  function getSelectedVerkehrsartenAsText(fahrzeuge: FahrzeugOptions) {
    const selectedValues: Array<string> = [];
    if (fahrzeuge.kraftfahrzeugverkehr) {
      selectedValues.push(`KFZ`);
    }
    if (fahrzeuge.schwerverkehr) {
      selectedValues.push(`SV`);
    }
    if (fahrzeuge.gueterverkehr) {
      selectedValues.push(`GV`);
    }
    if (fahrzeuge.schwerverkehrsanteilProzent) {
      selectedValues.push(`SV %`);
    }
    if (fahrzeuge.gueterverkehrsanteilProzent) {
      selectedValues.push(`GV %`);
    }
    if (fahrzeuge.personenkraftwagen) {
      selectedValues.push(`Pkw`);
    }
    if (fahrzeuge.lastkraftwagen) {
      selectedValues.push(`Lkw`);
    }
    if (fahrzeuge.lastzuege) {
      selectedValues.push(`Lz`);
    }
    if (fahrzeuge.lieferwagen) {
      selectedValues.push(`Lfw`);
    }
    if (fahrzeuge.busse) {
      selectedValues.push(`Bus`);
    }
    if (fahrzeuge.kraftraeder) {
      selectedValues.push(`Krad`);
    }
    if (fahrzeuge.radverkehr) {
      selectedValues.push(`Rad`);
    }
    if (fahrzeuge.fussverkehr) {
      selectedValues.push(`Fuß`);
    }
    return selectedValues.join(", ");
  }

  function getSelectedJahresintervallAsText(
    zeitraum: Array<AuswertungsZeitraum>
  ) {
    const helper: Array<string> = [];
    zeitraum.forEach((key) => {
      const value = auswertungszeitraumToText.get(key);
      if (value) {
        helper.push(value.title);
      }
    });
    // TODO ggfs sortieren
    return helper.join(", ");
  }

  return {
    getSelectedVerkehrsartenAsText,
    getSelectedJahresintervallAsText,
  };
}

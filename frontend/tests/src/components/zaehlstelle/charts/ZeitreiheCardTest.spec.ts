import type { LadeZaehldatenZeitreiheDTO } from "@/api/client";

import { shallowMount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { routeLocationKey } from "vue-router";

import ZeitreiheCard from "@/components/zaehlstelle/charts/ZeitreiheCard.vue";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import Fahrzeug from "@/types/enum/Fahrzeug";
import Zeitauswahl from "@/types/enum/Zeitauswahl";

const spitzenstunden = [
  Zeitauswahl.SPITZENSTUNDE_KFZ,
  Zeitauswahl.SPITZENSTUNDE_RAD,
  Zeitauswahl.SPITZENSTUNDE_FUSS,
];

function mountZeitreihe(isTabZeitreiheActive = false) {
  const pinia = createPinia();
  const zaehldatenZeitreihe: LadeZaehldatenZeitreiheDTO = {
    datum: [],
    fehlendeWerteMeldung: [],
    tageswertNichtVorhanden: [],
    kfz: [],
    sv: [],
    gv: [],
    rad: [],
    fuss: [],
    svAnteilInProzent: [],
    gvAnteilInProzent: [],
    gesamt: [],
  };
  const wrapper = shallowMount(ZeitreiheCard, {
    props: { zaehldatenZeitreihe, isTabZeitreiheActive },
    global: {
      plugins: [pinia],
      provide: { [routeLocationKey as symbol]: {} },
      stubs: { VCard: { template: "<div><slot /></div>" } },
    },
  });
  const zaehlstelleStore = useZaehlstelleStore(pinia);
  const showInfo = vi.spyOn(useSnackbarStore(pinia), "showInfo");
  return { wrapper, zaehlstelleStore, showInfo, zaehldatenZeitreihe };
}

function spitzenstundenHinweis(zeitauswahl: Zeitauswahl) {
  return `Es ist keine Anzeige mit der Zeitauswahl ${zeitauswahl} möglich. Bitte eine andere Zeitauswahl einstellen.`;
}

describe("ZeitreiheCard.vue", () => {
  it("zeigt den Hinweis bei wiederholten Reiterwechseln für Kfz, Rad und Fuß", async () => {
    const { wrapper, zaehlstelleStore, showInfo } = mountZeitreihe();

    for (const spitzenstunde of spitzenstunden) {
      await wrapper.setProps({ isTabZeitreiheActive: false });
      zaehlstelleStore.getFilteroptions.zeitauswahl = Zeitauswahl.TAGESWERT;
      await nextTick();
      zaehlstelleStore.getFilteroptions.zeitauswahl = spitzenstunde;
      await nextTick();
      showInfo.mockClear();

      await wrapper.setProps({ isTabZeitreiheActive: true });
      expect(showInfo).toHaveBeenCalledExactlyOnceWith(
        spitzenstundenHinweis(spitzenstunde)
      );

      await wrapper.setProps({ isTabZeitreiheActive: false });
      showInfo.mockClear();
      await wrapper.setProps({ isTabZeitreiheActive: true });
      expect(showInfo).toHaveBeenCalledExactlyOnceWith(
        spitzenstundenHinweis(spitzenstunde)
      );
    }
    wrapper.unmount();
  });

  it("zeigt den Hinweis beim direkten Wechsel zwischen Spitzenstunden in der Zeitreihe", async () => {
    const { wrapper, zaehlstelleStore, showInfo } = mountZeitreihe(true);

    for (const spitzenstunde of spitzenstunden) {
      showInfo.mockClear();
      zaehlstelleStore.getFilteroptions.zeitauswahl = spitzenstunde;
      await nextTick();
      expect(showInfo).toHaveBeenCalledExactlyOnceWith(
        spitzenstundenHinweis(spitzenstunde)
      );
    }

    showInfo.mockClear();
    zaehlstelleStore.getFilteroptions.zeitauswahl = Zeitauswahl.TAGESWERT;
    await nextTick();
    expect(showInfo).not.toHaveBeenCalled();
    wrapper.unmount();
  });

  it("zeigt bei Spitzenstunden außerhalb der Zeitreihe keinen Hinweis", async () => {
    const { wrapper, zaehlstelleStore, showInfo } = mountZeitreihe();

    for (const spitzenstunde of spitzenstunden) {
      zaehlstelleStore.getFilteroptions.zeitauswahl = spitzenstunde;
      await nextTick();
    }
    expect(showInfo).not.toHaveBeenCalled();
    wrapper.unmount();
  });

  it("zeigt weiterhin den Tageswert-Hinweis für fehlenden Fußverkehr", async () => {
    const { wrapper, zaehlstelleStore, showInfo, zaehldatenZeitreihe } =
      mountZeitreihe(true);
    zaehlstelleStore.getFilteroptions.zeitauswahl = Zeitauswahl.TAGESWERT;
    zaehlstelleStore.getFilteroptions.fussverkehr = true;

    await wrapper.setProps({
      zaehldatenZeitreihe: {
        ...zaehldatenZeitreihe,
        tageswertNichtVorhanden: [[Fahrzeug.FUSS]],
      },
    });

    expect(showInfo).toHaveBeenCalledExactlyOnceWith(
      "Für den Fußverkehr ist nur bei Ganztageszählungen ein Tageswert vorhanden"
    );
    wrapper.unmount();
  });
});

<template>
  <div>
    <panel-header
      font-size="0.875rem"
      font-weight="bold"
      padding="10px 0 0 0"
      header-text="Zeitintervall"
    ></panel-header>
    <panel-header
      font-size="small"
      font-weight="normal"
      padding="0 0 10px 0"
      header-text="(außer Belastungsplan und Zeitreihe)"
    ></panel-header>
    <v-row>
      <v-col cols="8">
        <v-hover v-model="hoverZeitintervall">
          <v-autocomplete
            v-model="chosenOptionsCopy.intervall"
            :items="messdatenIntervalle"
            label="Zeitintervall"
            variant="filled"
            density="compact"
            :disabled="isIntervallChangingLocked"
          ></v-autocomplete>
        </v-hover>
      </v-col>
      <v-col cols="4">
        <v-row
          align="start"
          justify="center"
          dense
        >
          {{ helpTextZeitintervall }}
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script setup lang="ts">
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

import { computed, ref, watch } from "vue";

import PanelHeader from "@/components/common/PanelHeader.vue";
import { useMessstelleStore } from "@/store/messstelle";
import Fahrzeug from "@/types/enum/Fahrzeug";
import ZaehldatenIntervall, {
  ZaehldatenIntervallToSelect,
} from "@/types/enum/ZaehldatenIntervall";
import Zeitauswahl from "@/types/enum/Zeitauswahl";

const emit = defineEmits<{
  (e: "input", i: MessstelleOptionsDTO): void;
}>();

interface Props {
  value: MessstelleOptionsDTO;
}

const hoverZeitintervall = ref(false);

const chosenOptionsCopy = computed({
  get: () => props.value,
  set: (payload: MessstelleOptionsDTO) => emit("input", payload),
});

const props = defineProps<Props>();
const messstelleStore = useMessstelleStore();

const messdatenIntervalle = computed(() => {
  if (
    messstelleStore.getActiveMessfaehigkeit.intervall ===
      ZaehldatenIntervall.STUNDE_KOMPLETT ||
    (messstelleStore.getActiveMessfaehigkeit.intervall ===
      ZaehldatenIntervall.STUNDE_VIERTEL_EINGESCHRAENKT &&
      notOnlyKfzSelected.value)
  ) {
    return ZaehldatenIntervallToSelect.filter((value) => {
      return value.value === ZaehldatenIntervall.STUNDE_KOMPLETT;
    });
  } else {
    return ZaehldatenIntervallToSelect;
  }
});

const notOnlyKfzSelected = computed(() => {
  const fahrzeuge = chosenOptionsCopy.value.fahrzeuge;
  return (
    fahrzeuge.busse ||
    fahrzeuge.fussverkehr ||
    fahrzeuge.gueterverkehr ||
    fahrzeuge.schwerverkehr ||
    fahrzeuge.gueterverkehrsanteilProzent ||
    fahrzeuge.schwerverkehrsanteilProzent ||
    fahrzeuge.kraftraeder ||
    fahrzeuge.lastkraftwagen ||
    fahrzeuge.lastzuege ||
    fahrzeuge.lieferwagen ||
    fahrzeuge.personenkraftwagen ||
    fahrzeuge.radverkehr
  );
});

const isIntervallChangingLocked = computed(() => {
  return (
    (isZeitauswahlSpitzenstunde.value &&
      chosenOptionsCopy.value.zeitraum.length != 2) ||
    (isZeitauswahlSpitzenstundeKfz.value &&
      chosenOptionsCopy.value.zeitraum.length == 2)
  );
});

const isZeitauswahlSpitzenstundeKfz = computed(() => {
  return chosenOptionsCopy.value.zeitauswahl == Zeitauswahl.SPITZENSTUNDE_KFZ;
});

const isZeitauswahlSpitzenstunde = computed(() => {
  return (
    chosenOptionsCopy.value.zeitauswahl == Zeitauswahl.SPITZENSTUNDE_KFZ ||
    chosenOptionsCopy.value.zeitauswahl == Zeitauswahl.SPITZENSTUNDE_RAD ||
    chosenOptionsCopy.value.zeitauswahl == Zeitauswahl.SPITZENSTUNDE_FUSS
  );
});

const helpTextZeitintervall = computed(() => {
  if (hoverZeitintervall.value) {
    if (
      messstelleStore.getActiveMessfaehigkeit.intervall ===
        ZaehldatenIntervall.STUNDE_VIERTEL_EINGESCHRAENKT &&
      notOnlyKfzSelected.value
    ) {
      return `Es sind Verkehrsarten und / oder Fahrzeugkategorien ausgewählt für die nur 60 Minuten Intervalle vorliegen.`;
    }
    if (
      messstelleStore.getActiveMessfaehigkeit.intervall ===
      ZaehldatenIntervall.STUNDE_VIERTEL_EINGESCHRAENKT
    ) {
      return `Nur für die Fahrzeugkategorie ${Fahrzeug.KFZ} liegen 15 und 30 Minuten Intervalle vor.`;
    }
    if (
      messstelleStore.getActiveMessfaehigkeit.intervall ===
      ZaehldatenIntervall.STUNDE_KOMPLETT
    ) {
      return `Auf Grund der Messfähigkeit der Messstelle können nur 60 Minuten als Intervallgröße ausgewählt werden.`;
    }
  }
  return "";
});

watch(
  () => chosenOptionsCopy.value.zeitauswahl,
  () => {
    if (isIntervallChangingLocked.value) {
      chosenOptionsCopy.value.intervall = ZaehldatenIntervall.STUNDE_VIERTEL;
    }
  }
);
</script>

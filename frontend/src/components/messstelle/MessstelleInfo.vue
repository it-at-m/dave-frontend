<template>
  <v-container
    class="pa-0"
    fluid
  >
    <v-row no-gutters>
      <v-sheet
        color="white"
        width="100%"
        class="px-4 py-2 text-primary text-caption"
        height="72px"
      >
        <v-row
          no-gutters
          class="pa-0 ma-0"
        >
          <v-col
            cols="12"
            lg="8"
          >
            <v-row no-gutters>
              <span v-tooltip:bottom="'Datum letzte plausible Messung'"
                >letzter Messtag:
                {{ datumLetztePlausibleMessung }}
              </span>
            </v-row>
            <v-row no-gutters>
              <span class="text-truncate">
                <span
                  v-tooltip:bottom="aufbauIcon.tooltip"
                  class="d-inline-flex pr-1"
                >
                  <v-icon
                    size="small"
                    color="primary"
                    class="mb-1 mr-1"
                    :icon="aufbauIcon.iconPath"
                  />
                  {{ formatDate(messstelle.realisierungsdatum) }}
                </span>

                <span
                  v-if="abbauDatumExists"
                  v-tooltip:bottom="abbauIcon.tooltip"
                  class="d-inline-flex px-1"
                  >|
                  <v-icon
                    size="small"
                    color="primary"
                    class="mb-1 mx-1"
                    :icon="abbauIcon.iconPath"
                  />
                  {{ formatDate(messstelle.abbaudatum) }}
                </span>
              </span>
            </v-row>
            <v-row no-gutters>
              <span class="text-truncate align-end">
                <detektierte-fahrzeugart-icon
                  :detektierte-fahrzeugart="detektierteVerkehrsart"
                  color="primary"
                />
                <fahrzeugklassen-icon
                  :fahrzeugklasse="fahrzeugKlasse"
                  color="primary"
                  size="small"
                />
                <messstelle-kommentar :kommentar="messstelle.kommentar" />
              </span>
            </v-row>
          </v-col>
          <v-col
            lg
            class="hidden-md-and-down"
          >
            <v-spacer />
          </v-col>
          <v-col
            lg
            class="hidden-md-and-down"
          >
            <messstelle-geometrie
              :height="60"
              :width="60"
              active-color="#1565C0"
              passive-color="#EEEEEE"
              :knotenarme="messstelle.messquerschnitte"
            />
          </v-col>
        </v-row>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";

import { computed } from "vue";

import DetektierteFahrzeugartIcon from "@/components/messstelle/DetektierteFahrzeugartIcon.vue";
import FahrzeugklassenIcon from "@/components/messstelle/icons/FahrzeugklassenIcon.vue";
import MessstelleGeometrie from "@/components/messstelle/MessstelleGeometrie.vue";
import MessstelleKommentar from "@/components/messstelle/MessstelleKommentar.vue";
import IconTooltip from "@/types/util/IconTooltip";

interface Props {
  messstelle: MessstelleInfoDTO;
}

const props = defineProps<Props>();

const aufbauIcon = new IconTooltip("mdi-elevator-up", "Aufbaudatum");
const abbauIcon = new IconTooltip("mdi-elevator-down", "Abbaudatum");

const datumLetztePlausibleMessung = computed(() => {
  return formatDate(props.messstelle.datumLetztePlausibleMessung.toString());
});

function formatDate(date: string): string {
  if (!date) {
    return "";
  }
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}`;
}

const fahrzeugKlasse = computed(() => {
  if (props.messstelle.messquerschnitte.length > 0) {
    return props.messstelle.fahrzeugKlassen;
  } else {
    return "k.A.";
  }
});

const detektierteVerkehrsart = computed(() => {
  if (props.messstelle.messquerschnitte.length > 0) {
    return props.messstelle.detektierteVerkehrsarten;
  } else {
    return undefined;
  }
});

const abbauDatumExists = computed(() => {
  return props.messstelle.abbaudatum != null;
});
</script>

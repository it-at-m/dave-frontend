<template>
  <v-container
    class="pa-0"
    fluid
  >
    <v-row no-gutters>
      <v-sheet
        color="white"
        width="100%"
        class="px-4 py-2 text-primary font-weight-regular overflow-y-auto"
        height="72px"
      >
        <v-row
          no-gutters
          class="pa-0 ma-0"
        >
          <v-col cols="10">
            <v-row no-gutters>
              <v-col cols="8">
                <span
                  v-tooltip:bottom="'Datum letzte plausible Messung'"
                  class="text--body-1"
                  >letzter Messtag:
                  {{ datumLetztePlausibleMessung }}
                </span>
              </v-col>
              <v-spacer />
              <v-col cols="3">
                <verkehrsart-icon
                  :detektierte-verkehrsart="detektierteVerkehrsart"
                  color="primary"
                />
                <fahrzeugklassen-icon
                  v-if="messstelle.detektierteVerkehrsart !== Verkehrsart.RAD"
                  :fahrzeugklasse="fahrzeugklasse"
                  color="primary"
                  size="default"
                />
                <messstelle-kommentar
                  v-if="messstelle.kommentar"
                  :kommentar="messstelle.kommentar"
                />
              </v-col>
            </v-row>
            <v-row
              no-gutters
              class="ma-0 mt-1"
            >
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
                  {{ dateUtils.formatDate(messstelle.realisierungsdatum) }}
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
                  {{ dateUtils.formatDate(messstelle.abbaudatum) }}
                </span>
              </span>
            </v-row>
          </v-col>
          <v-col
            cols="2"
            class="hidden-md-and-down"
            style="justify-items: center"
          >
            <messstelle-geometrie
              :height="56"
              :width="60"
              active-color="#1565C0"
              passive-color="#EEEEEE"
              :messquerschnitte="messstelle.messquerschnitte"
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

import FahrzeugklassenIcon from "@/components/messstelle/icons/FahrzeugklassenIcon.vue";
import MessstelleGeometrie from "@/components/messstelle/MessstelleGeometrie.vue";
import MessstelleKommentar from "@/components/messstelle/MessstelleKommentar.vue";
import VerkehrsartIcon from "@/components/messstelle/VerkehrsartIcon.vue";
import Verkehrsart from "@/types/enum/Verkehrsart";
import IconTooltip from "@/types/util/IconTooltip";
import { useDateUtils } from "@/util/DateUtils";

interface Props {
  messstelle: MessstelleInfoDTO;
}

const props = defineProps<Props>();

const dateUtils = useDateUtils();

const aufbauIcon = new IconTooltip("mdi-elevator-up", "Aufbaudatum");
const abbauIcon = new IconTooltip("mdi-elevator-down", "Abbaudatum");

const datumLetztePlausibleMessung = computed(() => {
  return dateUtils.formatDate(props.messstelle.datumLetztePlausibleMessung);
});

const fahrzeugklasse = computed(() => {
  if (props.messstelle.messquerschnitte.length > 0) {
    return props.messstelle.fahrzeugklasse;
  } else {
    return "k.A.";
  }
});

const detektierteVerkehrsart = computed(() => {
  if (props.messstelle.messquerschnitte.length > 0) {
    return props.messstelle.detektierteVerkehrsart;
  } else {
    return undefined;
  }
});

const abbauDatumExists = computed(() => {
  return props.messstelle.abbaudatum != null;
});
</script>

<template>
  <v-row
    no-gutters
    style="background-color: #ef9a9a"
  >
    <!-- red lighten-3 -->
    <v-col
      v-if="sonderzaehlung"
      cols="1"
      align-self="center"
    >
      <sonderzaehlung-icon :large="isLarge" />
    </v-col>
    <v-col :cols="getMaxCols">
      <v-sheet
        width="100%"
        :color="hover ? hoverColor : color"
        class="px-4 pt-2"
        :style="{ cursor: `${hover ? 'pointer' : 'default'}` }"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        @click="openZaehlung"
      >
        <v-row no-gutters>
          <span class="text-body-2"
            >{{ dateUtils.getShortVersionOfDate(date) }} |
            {{ projektName }}</span
          ><br />
        </v-row>
        <v-row
          no-gutters
          class="ma-0"
        >
          <zaehlart-icon
            :zaehlart="zaehlart"
            :color="iconColor"
          />
          <wetter-icon
            :wetter="wetter"
            :color="iconColor"
          />
          <zaehldauer-icon
            :zaehldauer="zaehldauer"
            :color="iconColor"
          />
          <quelle-icon
            :quelle="quelle"
            :color="iconColor"
          />
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";

import QuelleIcon from "@/components/zaehlstelle/icons/QuelleIcon.vue";
import SonderzaehlungIcon from "@/components/zaehlstelle/icons/SonderzaehlungIcon.vue";
import WetterIcon from "@/components/zaehlstelle/icons/WetterIcon.vue";
import ZaehlartIcon from "@/components/zaehlstelle/icons/ZaehlartIcon.vue";
import ZaehldauerIcon from "@/components/zaehlstelle/icons/ZaehldauerIcon.vue";
import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import { useDateUtils } from "@/util/DateUtils";

interface Props {
  id: string;
  datum: string;
  projektName: string;
  zaehlart: string;
  wetter: string;
  zaehldauer: string;
  quelle: string;
  sonderzaehlung: boolean;
  color: string;
  hoverColor: string;
  iconColor: string;
}

const props = defineProps<Props>();

const zaehlstelleStore = useZaehlstelleStore();
const display = useDisplay();
const dateUtils = useDateUtils();

const hover = ref(false);

const date = computed(() => {
  if (props.datum && Date.parse(props.datum)) {
    return new Date(props.datum);
  }
  return new Date();
});

const getMaxCols = computed(() => {
  return props.sonderzaehlung ? 11 : 12;
});

const isLarge = computed(() => {
  return display.xlAndUp.value;
});

/**
 * Die Zählung wird über den store auf aktiv gesetzt.
 */
function openZaehlung(): void {
  zaehlstelleStore.setZaehlungAlsAktiv(props.id);
}
</script>

<template>
  <v-row
      no-gutters
      style="background-color: #ef9a9a"
  >
    <!-- red lighten-3 -->
    <v-col
        v-if="sonderzaehlung"
        cols="12"
        md="1"
        align-self="center"
        :class="isLarge ? '' : 'px-1'"
    >
      <sonderzaehlung-icon :large="isLarge"/>
    </v-col>
    <v-col
        cols="12"
        :md="getMaxCols"
    >
      <v-sheet
          width="100%"
          :color="hover ? hoverColor : color"
          class="px-4 py-2"
          @mouseover="hover = true"
          @mouseleave="hover = false"
          :style="{ cursor: `${hover ? 'pointer' : 'default'}` }"
          @click="openZaehlung"
      >
                    <span
                        class="text-body-2"
                    >{{ $d(date, "short", "de-DE") }} |
                        {{ projektName }}</span
                    ><br/>
        <zaehlart-icon
            dense
            :zaehlart="zaehlart"
            :color="iconColor"
        />
        <wetter-icon
            dense
            :wetter="wetter"
            :color="iconColor"
        />
        <zaehldauer-icon
            dense
            :zaehldauer="zaehldauer"
            :color="iconColor"
        />
        <quelle-icon
            dense
            :quelle="quelle"
            :color="iconColor"
        />
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
// Komponenten
import WetterIcon from "@/components/zaehlstelle/icons/WetterIcon.vue";
import QuelleIcon from "@/components/zaehlstelle/icons/QuelleIcon.vue";
import ZaehldauerIcon from "@/components/zaehlstelle/icons/ZaehldauerIcon.vue";
import ZaehlartIcon from "@/components/zaehlstelle/icons/ZaehlartIcon.vue";
import SonderzaehlungIcon from "@/components/zaehlstelle/icons/SonderzaehlungIcon.vue";
import {computed, ref} from "vue";
import {useZaehlstelleStore} from "@/store/zaehlstelle";
import {useDisplay} from "vuetify";

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
  return display.xl.value;
});

/**
 * Die Zählung wird über den store auf aktiv gesetzt.
 */
function openZaehlung(): void {
  zaehlstelleStore.setZaehlungAlsAktiv(props.id);
}
</script>
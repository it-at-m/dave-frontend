<template>
  <v-sheet
    class="overflow-y-auto px-0"
    color="transparent"
  >
    <v-row
      v-for="(messquerschnitt, index) in props.messstelle.messquerschnitte"
      :key="messquerschnitt.mstId"
      no-gutters
    >
      <v-sheet
        class="mx-auto px-4 py-2"
        tile
        :color="calcRowColor(index)"
        width="100%"
      >
        <span class="text-body-2">
          ID MQ: {{ messquerschnitt.mqId }} |
          <fahrtrichtung-icon
            size="small"
            :fahrtrichtung="messquerschnitt.fahrtrichtung"
          />
        </span>
        <br />
        <fahrspuren-icon
          size="small"
          :fahrspuren="messquerschnitt.anzahlFahrspuren"
        />
        <br />
        <span class="text-caption">
          {{ messquerschnitt.standort }}
        </span>
      </v-sheet>
    </v-row>
  </v-sheet>
</template>

<script setup lang="ts">
import type MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";

import FahrspurenIcon from "@/components/messstelle/icons/FahrspurenIcon.vue";
import FahrtrichtungIcon from "@/components/messstelle/icons/FahrtrichtungIcon.vue";
import { useAlternateRowColor } from "@/util/AlternateRowColorUtil";

interface Props {
  messstelle: MessstelleInfoDTO;
}

const props = defineProps<Props>();
const { calcRowColor } = useAlternateRowColor();
</script>

<template>
  <v-sheet
    width="100%"
    color="transparent"
    class="pa-4"
    :min-height="minheight"
    :height="height"
  >
    <span class="text-caption">Messstelle</span>
    <br />
    <span class="text-h5">{{ mstId }}</span>
    <br />
    <span class="text-caption">{{ standort }} </span>
    <br />
    <span class="text-caption"
      >Stadtbezirk {{ stadtbezirkNummer }}, {{ stadtbezirk }}
    </span>
  </v-sheet>
</template>
<script setup lang="ts">
interface Props {
  mstId: string;
  stadtbezirkNummer: number;
  stadtbezirk: string;
  standort?: string;
  height: string;
  minheight: string;
}
defineProps<Props>();
</script>

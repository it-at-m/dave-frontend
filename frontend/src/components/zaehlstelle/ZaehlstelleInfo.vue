<template>
  <v-sheet
    width="100%"
    :height="height"
    :min-height="minheight"
    color="transparent"
    class="pa-4"
  >
    <span class="text-caption">Zählstelle</span><br />
    <span class="text-h5">{{ nummer }}</span
    ><br /><br />
    <div class="text-caption text-truncate">{{ kreuzungsname }}</div>
    <span class="text-caption"
      >Stadtbezirk {{ stadtbezirkNummer }}, {{ stadtbezirk }}</span
    >
  </v-sheet>
</template>
<script setup lang="ts">
/**
 * Basisinformationen zur Zählstelle
 */
interface Props {
  height: string;
  minheight: string;
  nummer?: string;
  kreuzungsname?: string;
  stadtbezirkNummer?: string;
  stadtbezirk?: string;
}

withDefaults(defineProps<Props>(), {
  nummer: "",
  kreuzungsname: "",
  stadtbezirkNummer: "",
  stadtbezirk: "",
});
</script>

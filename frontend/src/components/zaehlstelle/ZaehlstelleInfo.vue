<template>
  <v-sheet
      width="100%"
      :height="height"
      :min-height="minheight"
      color="transparent"
      class="pa-4"
  >
    <span class="caption">Zählstelle</span><br/>
    <span class="headline">{{ nummer }}</span><br/><br/>
    <div class="caption text-truncate">{{ kreuzungsname }}</div>
    <span class="caption">Stadtbezirk {{ stadtbezirkNummer }}, {{ stadtbezirk }}</span>
  </v-sheet>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

/**
 * Basisinformationen zur Zählstelle
 */
@Component
export default class ZaehlstelleInfo extends Vue {
  // Höhe der Komponente (sollte die selbe wie die der Karte sein)
  @Prop() height!: string;
  @Prop({default: "160px"}) minheight!: string;
  // Daten zur Zählstelle
  @Prop({default: ""}) nummer?: string;
  @Prop({default: ""}) kreuzungsname?: string;
  @Prop({default: ""}) stadtbezirkNummer?: string;
  @Prop({default: ""}) stadtbezirk?: string;
}
</script>
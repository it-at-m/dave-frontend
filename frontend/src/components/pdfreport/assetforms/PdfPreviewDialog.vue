<template>
  <!-- v-if-Hack to reset Dialog -->
  <v-dialog
      v-if="open"
      v-model="open"
      max-width="900px"
      v-on:click:outside="cancel"
  >
    <v-card width="900px">
      <v-card-title class="title grey--text text--lighten-1 grey lighten-2 mb-3" autofocus>
        Vorschau
      </v-card-title>
      <v-sheet
          width="100%"
          :max-height="getContentSheetHeight"
          class="overflow-y-auto overflow-x-hidden"
      >
        <v-card-text>
          <vue-pdf-embed
              ref="pdfEmbed"
              :source="previewSource"
          />
        </v-card-text>
      </v-sheet>
      <v-speed-dial
          v-model="fab"
          absolute
          bottom
          right
          open-on-hover
      >
        <template v-slot:activator>
          <v-btn
              v-model="fab"
              dark
              fab
              :color="fabColor"
          >
            <v-icon v-if="fab">
              mdi-close-thick
            </v-icon>
            <v-icon v-else>
              mdi-plus-thick
            </v-icon>
          </v-btn>
        </template>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                fab
                dark
                small
                color="secondary"
                @click="downloadPdf"
                v-bind="attrs"
                v-on="on"
            >
              <v-icon>mdi-printer</v-icon>
            </v-btn>
          </template>
          <span>Report herunterladen</span>
        </v-tooltip>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                fab
                dark
                small
                color="secondary"
                @click="cancel"
                v-bind="attrs"
                v-on="on"
            >
              <v-icon>mdi-eye-off</v-icon>
            </v-btn>
          </template>
          <span>Vorschau schließen</span>
        </v-tooltip>
      </v-speed-dial>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed';

@Component({
  components: {
    VuePdfEmbed
  }
})
export default class DeleteDialog extends Vue {

  @Prop() source!: Uint8Array;

  @Prop() open: boolean = false;

  private fab: boolean = false;

  get fabColor(): string {
    return this.fab ? "grey darken-1" : "secondary"
  }

  downloadPdf(): void {
    this.$emit("download");
  }

  get previewSource(): Uint8Array {
    return this.source;
  }

  /**
   * Verlässt das Formular ohne zu speichern.
   */
  cancel(): void {
    this.$emit("cancel");
  }

  get getContentSheetHeight() {
    if (this.$vuetify.breakpoint.xl) {
      return "750px";
    }
    return "400px";
  }
}
</script>
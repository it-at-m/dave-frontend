<template>
  <v-dialog
      v-model="open"
      width="80vh"
      height="60vh"
      v-on:click:outside="cancel"
  >
    <v-card>
      <v-card-title class="title grey--text text--lighten-1 grey lighten-2 mb-3">
        <v-icon color="grey lighten-1" class="mr-2">mdi-text</v-icon>
        Text Abschnitt bearbeiten
      </v-card-title>
      <v-card-text>
        <v-sheet
            width="100%"
            max-height="200px"
            min-height="200px"
            class="overflow-y-auto"
        >
          <p class="pt-2" :style="{fontSize: asset.size}" v-html="asset.text"/>
        </v-sheet>
        <v-divider></v-divider>
        <v-form class="mx-3" ref="form">
          <v-container>
            <v-row>
              <v-col>
                <v-textarea
                    label="Text Abschnitt"
                    v-model="asset.text"
                    prepend-icon="mdi-feather"
                    hint="Sie können innerhalb des Textes (auf eigene Gefahr) HTML Notation verwenden. Sollte das PDF nicht mehr generiert werden können, so achten Sie bitte darauf, dass alle Elemente geschlossen wurden. Beispiel: <p>text...</p>"
                    persistent-hint
                    outlined
                    dense
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-toolbar flat>
                  <v-btn
                      icon
                      @click="addBoldText">
                    <v-icon>mdi-format-bold</v-icon>
                  </v-btn>
                  <v-btn
                      icon
                      @click="addItalicText">
                    <v-icon>mdi-format-italic</v-icon>
                  </v-btn>
                  <v-divider
                      class="mx-4"
                      vertical
                  />
                  <v-btn
                      icon
                      @click="changeTextSize(`xx-small`)"
                      :input-value="asset.size==='xx-small'"
                  >
                    <v-icon large>mdi-size-xxs</v-icon>
                  </v-btn>
                  <v-btn
                      icon
                      @click="changeTextSize(`x-small`)"
                      :input-value="asset.size==='x-small'"
                  >
                    <v-icon large>mdi-size-xs</v-icon>
                  </v-btn>
                  <v-btn
                      icon
                      @click="changeTextSize(`small`)"
                      :input-value="asset.size==='small'"
                  >
                    <v-icon large>mdi-size-s</v-icon>
                  </v-btn>
                  <v-btn
                      icon
                      @click="changeTextSize(`medium`)"
                      :input-value="asset.size==='medium'"
                  >
                    <v-icon large>mdi-size-m</v-icon>
                  </v-btn>
                  <v-btn
                      icon
                      @click="changeTextSize(`large`)"
                      :input-value="asset.size==='large'"
                  >
                    <v-icon large>mdi-size-l</v-icon>
                  </v-btn>
                  <v-btn
                      icon
                      @click="changeTextSize(`x-large`)"
                      :input-value="asset.size==='x-large'"
                  >
                    <v-icon large>mdi-size-xl</v-icon>
                  </v-btn>
                  <v-btn
                      icon
                      @click="changeTextSize(`xx-large`)"
                      :input-value="asset.size==='xx-large'"
                  >
                    <v-icon large>mdi-size-xxl</v-icon>
                  </v-btn>
                  <v-btn
                      icon
                      @click="changeTextSize(`xxx-large`)"
                      :input-value="asset.size==='xxx-large'"
                  >
                    <v-icon large>mdi-size-xxxl</v-icon>
                  </v-btn>
                </v-toolbar>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            text
            @click="save"
        >
          Speichern
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'

/* eslint-disable no-unused-vars */
import TextAsset from "@/types/pdfreport/assets/TextAsset";
/* eslint-enable no-unused-vars */

@Component
export default class TextAssetForm extends Vue {

  @Prop({default: false}) open: boolean = false
  @Prop() text?: TextAsset

  asset?: TextAsset = new TextAsset("")

  @Watch("text")
  copyAsset(asset: TextAsset): void {
    if (asset) {
      this.asset = Object.assign({}, asset)
    }
  }

  /**
   * Um den Text im Array zu "speichern", wird es als Event an die View geschickt.
   */
  save(): void {
    if (this.asset?.text && this.asset.text.length > 0) {
      const event = {}
      Object.assign(event, this.asset)
      this.$emit("save", event)
    } else {
      this.cancel()
    }

  }

  /**
   * Verläßt das Formular ohne zu speichern.
   */
  cancel(): void {
    this.$emit("cancel", Object.assign({}, this.asset))
  }

  private addBoldText() {
    if(this.asset) {
      this.asset.text = `${this.asset.text?.trim()} <strong>Text einfügen</strong>`;
    }
  }

  private addItalicText() {
    if(this.asset) {
      this.asset.text = `${this.asset.text?.trim()} <em>Text einfügen</em>`;
    }
  }

  private changeTextSize(size:string): void {
    if(this.asset) {
      this.asset.size = size;
    }
  }
}
</script>

<template>
  <v-dialog
      v-model="open"
      width="80vh"
      height="60vh"
      v-on:click:outside="cancel"
  >
    <v-card>
      <v-card-title class="title grey--text text--lighten-1 grey lighten-2 mb-3">
        <v-icon color="grey lighten-1" class="mr-2">mdi-image</v-icon>
        Bildeinstellungen bearbeiten
      </v-card-title>
      <v-card-text>
        <p class="caption">(Die Höhe der Grafik wird nur bis max. 200px angezeigt. Im Dokument ist sie dann in voller
          Höhe zu sehen)</p>
        <v-sheet
            width="100%"
            height="200px"
            color="grey lighten-4"
            outlined
        >
          <v-img
              :src="asset.image"
              :width="`${asset.width}%`"
              max-height="200px"
          ></v-img>
        </v-sheet>
        <p>{{ asset.caption }}</p>
        <v-divider></v-divider>
        <v-form class="mx-3" ref="form">
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                    label="Bildunterschrift"
                    v-model="asset.caption"
                    prepend-icon="mdi-message-image"
                    outlined
                    dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-file-input
                    label="Bilder vom Rechner hoch laden."
                    accept="image/*"
                    prepend-icon="mdi-image-plus"
                    outlined
                    dense
                    show-size
                    v-on:change="upload($event)"
                ></v-file-input>
              </v-col>
              <v-col>
                <v-slider
                    v-model="asset.width"
                    label="Breite in %"
                    thumb-color="red"
                    thumb-label="always"
                    prepend-icon="mdi-image-size-select-large"
                ></v-slider>
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
import ImageAsset from "@/types/pdfreport/assets/ImageAsset";
/* eslint-enable no-unused-vars */

@Component
export default class ImageAssetForm extends Vue {

  @Prop({default: false}) open: boolean = false
  @Prop({default: new ImageAsset("", "")}) image?: ImageAsset

  asset?: ImageAsset = new ImageAsset("", "")

  @Watch("image")
  copyAsset(asset: ImageAsset): void {
    if (asset) {
      this.asset = Object.assign({}, asset)
    }
  }

  /**
   * Speichert den Base64 String des Bildes im ImageAsset Objekt.
   *
   * @param file
   */
  upload(file: File): void {
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const base64 = reader.result
        if (this.asset && base64 && !(base64 instanceof ArrayBuffer)) {
          this.asset.image = base64
        }
      }
      reader.onerror = (error) => {
        console.error('Die Datein konnte nicht verarbeitet werden: ', error)
      }
    } else {
      console.warn("Datei wurde nicht geladen.")
    }
  }

  /**
   * Um das Bild im Array zu "speichern", wird es als Event an die View geschickt.
   */
  save(): void {
    if (this.asset?.image && this.asset.image?.length > 0) {
      const event = {}
      Object.assign(event, this.asset)
      this.$emit("save", event)
      const form = this.$refs.form as HTMLFormElement
      form.reset()
    } else {
      this.cancel()
    }

  }

  /**
   * Verläßt das Formular ohne zu speichern.
   */
  cancel(): void {
    this.$emit("cancel", this.asset)
    const form = this.$refs.form as HTMLFormElement
    form.reset()
  }
}
</script>
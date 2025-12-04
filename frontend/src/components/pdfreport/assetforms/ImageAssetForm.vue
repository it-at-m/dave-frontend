<template>
  <v-dialog
    v-model="openEditImageDialog"
    height="60vh"
    width="100vh"
  >
    <v-card>
      <v-card-title class="text-h6 text-grey-darken-2 mb-3 bg-grey-lighten-2">
        <v-icon
          class="mr-2"
          icon="mdi-image"
        />
        Bildeinstellungen bearbeiten
      </v-card-title>
      <v-card-text>
        <p class="text-caption">
          (Die Höhe der Grafik wird nur bis max. 200px angezeigt. Im Dokument
          ist sie dann in voller Höhe zu sehen)
        </p>
        <v-sheet
          color="grey-lighten-4"
          height="200px"
          width="100%"
        >
          <v-img
            :src="asset.image"
            :width="`${asset.width}%`"
            max-height="200px"
          />
        </v-sheet>
        <p>{{ asset.caption }}</p>
        <v-divider />
        <v-form
          ref="form"
          class="mx-3"
        >
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="asset.caption"
                  density="compact"
                  label="Bildunterschrift"
                  prepend-icon="mdi-message-image"
                  variant="outlined"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-file-input
                  v-model="selectedFile"
                  accept="image/*"
                  density="compact"
                  label="Bilder vom Rechner hoch laden."
                  prepend-icon="mdi-image-plus"
                  show-size
                  variant="outlined"
                />
              </v-col>
              <v-col>
                <v-slider
                  v-model="asset.width"
                  label="Breite in %"
                  prepend-icon="mdi-image-size-select-large"
                  thumb-color="red"
                  thumb-label="always"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          class="text-none"
          color="primary"
          text="Speichern"
          @click="save"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

import ImageAsset from "@/types/pdfreport/assets/ImageAsset";
import TextAsset from "@/types/pdfreport/assets/TextAsset";

interface Props {
  image: ImageAsset;
}

const props = defineProps<Props>();
const openEditImageDialog = defineModel<boolean>({ required: true });

const emits = defineEmits<{
  (e: "save", v: TextAsset): void;
}>();

const asset = ref(new ImageAsset("", ""));

const selectedFile = ref<File | undefined>(undefined);

watch(
  selectedFile,
  () => {
    if (selectedFile.value) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile.value);
      reader.onload = () => {
        const base64 = reader.result;
        if (asset.value && base64 && !(base64 instanceof ArrayBuffer)) {
          asset.value.image = base64;
        }
      };
    } else {
      asset.value.image = undefined;
    }
  },
  { deep: true, immediate: true }
);

/**
 * Um das Bild im Array zu "speichern", wird es als Event an die View geschickt.
 */
function save(): void {
  if (asset.value.image && asset.value.image?.length > 0) {
    emits("save", Object.assign({}, asset.value));
  } else {
    openEditImageDialog.value = false;
  }
}

watch(openEditImageDialog, () => {
  if (props.image) {
    asset.value = Object.assign({}, props.image);
  }
});
</script>

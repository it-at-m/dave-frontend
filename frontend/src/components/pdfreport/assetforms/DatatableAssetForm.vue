<template>
  <v-dialog
    v-model="openEditDatatableDialog"
    width="100vh"
    height="60vh"
  >
    <v-card>
      <v-card-title class="text-h6 text-grey-darken-2 mb-3 bg-grey-lighten-2">
        <v-icon
          class="mr-2"
          icon="mdi-text"
        />
        Tabellenbeschreibung bearbeiten
      </v-card-title>
      <v-card-text>
        <v-sheet
          width="100%"
          max-height="200px"
          min-height="200px"
          class="overflow-y-auto"
        >
          <p>{{ asset.text }}</p>
        </v-sheet>
        <v-divider />
        <v-form
          ref="form"
          class="mx-3"
        >
          <v-container>
            <v-row>
              <v-col>
                <v-textarea
                  v-model="asset.text"
                  label="Text Abschnitt"
                  prepend-icon="mdi-feather"
                  hint="Sie können innerhalb des Textes (auf eigene Gefahr) HTML Notation verwenden. Sollte das PDF nicht mehr generiert werden können, so achten Sie bitte darauf, dass alle Elemente geschlossen wurden. Beispiel: <p>text...</p>"
                  persistent-hint
                  variant="outlined"
                  density="compact"
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

<script setup lang="ts">
import type { DatatableAsset, TextAsset } from "@/api/client";
import type Options from "@/types/zaehlung/Options";

import { ref, watch } from "vue";

import { useAssetUtil } from "@/util/AssetUtil";

interface Props {
  datatable: DatatableAsset;
}

const props = defineProps<Props>();
const openEditDatatableDialog = defineModel<boolean>({ required: true });

const emits = defineEmits<{
  (e: "save", v: TextAsset): void;
}>();

const assetUtil = useAssetUtil();

const asset = ref(assetUtil.createDatatableAsset({} as Options, "", ""));

/**
 * Um das Bild im Array zu "speichern", wird es als Event an die View geschickt.
 */
function save(): void {
  emits("save", Object.assign({}, asset.value));
}

watch(openEditDatatableDialog, () => {
  if (props.datatable) {
    asset.value = Object.assign({}, props.datatable);
  }
});
</script>

<template>
  <v-dialog
    v-model="openEditTextDialog"
    width="100vh"
    height="60vh"
  >
    <v-card>
      <v-card-title class="text-h6 text-grey-darken-2 mb-3 bg-grey-lighten-2">
        <v-icon
          class="mr-2"
          icon="mdi-text"
        />
        Text Abschnitt bearbeiten
      </v-card-title>
      <v-card-text>
        <v-sheet
          width="100%"
          max-height="200px"
          min-height="200px"
          class="overflow-y-auto"
        >
          <p
            class="pt-2"
            :style="{ fontSize: asset.size }"
            v-html="asset.text"
          />
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
            <v-row>
              <v-col>
                <v-toolbar
                  flat
                  color="transparent"
                >
                  <v-btn
                    icon="mdi-format-bold"
                    @click="addBoldText"
                  />
                  <v-btn
                    icon="mdi-format-italic"
                    @click="addItalicText"
                  />
                  <v-divider
                    class="mx-4"
                    vertical
                  />
                  <v-btn
                    icon="mdi-size-xxs"
                    size="large"
                    :active="asset.size === 'xx-small'"
                    @click="changeTextSize(`xx-small`)"
                  />
                  <v-btn
                    icon="mdi-size-xs"
                    size="large"
                    :active="asset.size === 'x-small'"
                    @click="changeTextSize(`x-small`)"
                  />
                  <v-btn
                    icon="mdi-size-s"
                    size="large"
                    :active="asset.size === 'small'"
                    @click="changeTextSize(`small`)"
                  />
                  <v-btn
                    icon="mdi-size-m"
                    size="large"
                    :active="asset.size === 'medium'"
                    @click="changeTextSize(`medium`)"
                  />
                  <v-btn
                    icon="mdi-size-l"
                    size="large"
                    :active="asset.size === 'large'"
                    @click="changeTextSize(`large`)"
                  />
                  <v-btn
                    icon="mdi-size-xl"
                    size="large"
                    :active="asset.size === 'x-large'"
                    @click="changeTextSize(`x-large`)"
                  />
                  <v-btn
                    icon="mdi-size-xxl"
                    size="large"
                    :active="asset.size === 'xx-large'"
                    @click="changeTextSize(`xx-large`)"
                  />
                  <v-btn
                    icon="mdi-size-xxxl"
                    :active="asset.size === 'xxx-large'"
                    @click="changeTextSize(`xxx-large`)"
                  />
                </v-toolbar>
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
import { ref, watch } from "vue";

import TextAsset from "@/types/pdfreport/assets/TextAsset";

interface Props {
  text: TextAsset;
}

const props = defineProps<Props>();
const openEditTextDialog = defineModel<boolean>({ required: true });

const emits = defineEmits<{
  (e: "save", v: TextAsset): void;
}>();

const asset = ref(new TextAsset(""));

/**
 * Um den Text im Array zu "speichern", wird es als Event an die View geschickt.
 */
function save(): void {
  if (asset.value.text && asset.value.text.length > 0) {
    emits("save", Object.assign({}, asset.value));
  } else {
    asset.value = new TextAsset("");
    openEditTextDialog.value = false;
  }
}

function addBoldText() {
  if (asset.value) {
    asset.value.text = `${asset.value.text?.trim()} <strong>Text einfügen</strong>`;
  }
}

function addItalicText() {
  if (asset.value) {
    asset.value.text = `${asset.value.text?.trim()} <em>Text einfügen</em>`;
  }
}

function changeTextSize(size: string): void {
  if (asset.value) {
    asset.value.size = size;
  }
}

watch(openEditTextDialog, () => {
  if (props.text) {
    asset.value = Object.assign({}, props.text);
  }
});
</script>

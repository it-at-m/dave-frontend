<template>
  <v-dialog
    v-model="openDialog"
    width="25vh"
    height="25vh"
    @click:outside="cancelDialog"
  >
    <v-card>
      <v-card-title class="text-h6 text-grey-lighten-1 bg-grey-lighten-2 mb-3">
        <v-icon
          color="grey-lighten-1"
          class="mr-2"
          >mdi-trash-can</v-icon
        >
        Element entfernen
      </v-card-title>
      <v-card-text>
        <p>Wollen Sie das Element wirklich aus dem PDF Report entfernen?</p>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          variant="text"
          @click="deleteAsset"
        >
          <v-icon start> mdi-alarm-light-outline </v-icon>
          Löschen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  value: boolean;
  assetId: number;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: "delete", v: number): void;
  (e: "cancelDialog"): void;
  (e: "input", v: boolean): void;
}>();

const openDialog = computed({
  get: () => props.value,
  set: (payload: boolean) => emits("input", payload),
});

function deleteAsset(): void {
  emits("delete", props.assetId);
}

/**
 * Verläßt das Formular ohne zu speichern.
 */
function cancelDialog(): void {
  emits("cancelDialog");
}
</script>

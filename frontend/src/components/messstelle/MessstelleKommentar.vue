<template>
  <span v-if="kommentar">
    <v-btn
      v-tooltip:bottom="'Kommentar anzeigen'"
      color="secondary"
      icon="mdi-comment-text"
      size="small"
      height="20px"
      class="ml-n2"
      variant="text"
      @click="showDialog = true"
    />
    <v-dialog
      v-model="showDialog"
      max-width="600px"
    >
      <v-card class="rounded-0">
        <v-card-title class="text-h5 grey-lighten-2">
          <v-icon
            start
            icon="mdi-comment-multiple"
          />
          Informationen
        </v-card-title>
        <br />
        <v-card-text> {{ kommentar }} </v-card-text>
      </v-card>

      <v-footer>
        <v-spacer />
        <v-btn
          class="text-none"
          color="grey-lighten-1"
          text="Schließen"
          @click="showDialog = false"
        />
        <v-spacer />
      </v-footer>
    </v-dialog>
  </span>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  kommentar?: string;
}

defineProps<Props>();

const showDialog = ref(false);
</script>

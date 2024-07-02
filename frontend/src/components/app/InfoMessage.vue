<template>
  <v-menu offset-y>
    <template #activator="{ props }">
      <v-tooltip location="bottom">
        <template #activator="{ on: tooltip }">
          <v-btn
            icon
            size="small"
            :disabled="!hasInfoMessage"
            class="ml-2"
            props""v-on="v-bind="
            @click="openDialogAndLoadData"
          >
            <v-icon>mdi-message-text-outline</v-icon>
          </v-btn>
        </template>
        Infonachricht
      </v-tooltip>
    </template>

    <v-dialog
      v-model="showDialog"
      max-width="600px"
      height="300px"
      persistent
    >
      <v-card
        width="100%"
        flat
      >
        <v-card-title>
          <v-icon start>mdi-email</v-icon>
          Information der Administratoren
          <v-spacer />
          <v-btn
            icon
            @click="closeDialog"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-sheet
            width="100%"
            height="338px"
            class="d-flex flex-column"
          >
            <p style="white-space: pre-line">
              {{ infomessage.content }}
            </p>
          </v-sheet>
        </v-card-text>

        <v-card-actions style="position: absolute; bottom: 0; right: 0">
          <v-btn
            color="secondary"
            @click="closeDialog()"
          >
            Schließen
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-menu>
</template>

<script lang="ts" setup>
/* eslint-disable no-unused-vars */
import type InfoMessageDTO from "@/types/app/InfoMessageDTO";

import { computed, onMounted, ref } from "vue";

import InfoMessageService from "@/api/service/InfoMessageService";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";

/* eslint-enable no-unused-vars */

const infomessage = ref<InfoMessageDTO>(
  DefaultObjectCreator.createDefaultInfoMessageDto()
);

const showDialog = ref(false);

onMounted(() => {
  loadInfoMessage();
});

function loadInfoMessage(): void {
  InfoMessageService.getActiveInfoMessage().then((message: InfoMessageDTO) => {
    infomessage.value = message;
  });
}

const hasInfoMessage = computed(() => {
  return infomessage.value.gueltig;
});

function closeDialog() {
  showDialog.value = false;
}

function openDialogAndLoadData(): void {
  loadInfoMessage();
  showDialog.value = true;
}
</script>

<template>
  <v-tooltip location="bottom">
    <template #activator="{ props }">
      <v-btn
          v-bind="props"
          icon="mdi-message-text-outline"
          :disabled="!hasInfoMessage"
          @click="openDialogAndLoadData"
      >
      </v-btn>
    </template>
    Infonachricht
  </v-tooltip>

  <v-dialog
      v-model="showDialog"
      max-width="600px"
      persistent
  >
    <v-card
        width="100%"
        height="420px"
        flat
    >
      <v-card-title class="d-flex justify-space-between align-center">
        <div>
        <v-icon color="grey">mdi-email</v-icon>
        Information der Administratoren
        </div>
        <v-btn
            icon="mdi-close"
            variant="text"
            @click="closeDialog"
        ></v-btn>
      </v-card-title>
      <v-card-text>
        <v-sheet
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
            class="text-none"
            variant="flat"
            @click="closeDialog()"
        >
          Schließen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from "vue";
import type InfoMessageDTO from "@/types/app/InfoMessageDTO";
import InfoMessageService from "@/api/service/InfoMessageService";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";

const infomessage = ref<InfoMessageDTO>(
    DefaultObjectCreator.createDefaultInfoMessageDto()
);

const showDialog = ref(false);

onMounted(() => {
    loadInfoMessage();
});

function loadInfoMessage(): void {
    InfoMessageService.getActiveInfoMessage().then(
        (message: InfoMessageDTO) => {
            infomessage.value = message;
        }
    );
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
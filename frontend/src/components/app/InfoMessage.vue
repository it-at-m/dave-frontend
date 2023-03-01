<template>
  <v-menu
      offset-y
  >
    <template v-slot:activator="{ on: dialog }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn
              icon
              small
              :disabled="!hasInfoMessage"
              v-on="{ ...tooltip, ...dialog }"
              class="ml-2"
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
      <v-card width="100%" flat>

        <v-card-title>
          <v-icon left>mdi-email</v-icon>
          Information der Administratoren
          <v-spacer/>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-sheet
              width="100%"
              height="338px"
              class="d-flex flex-column"
          >
            <p style="white-space: pre-line;">
              {{ this.infomessage.content }}
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

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
/* eslint-disable no-unused-vars */
import InfoMessageDTO from "@/types/InfoMessageDTO";
import InfoMessageService from "@/api/service/InfoMessageService";
/* eslint-enable no-unused-vars */

@Component
export default class InfoMessage extends Vue {

  private infomessage: InfoMessageDTO = {} as InfoMessageDTO;

  private showDialog: boolean = false;

  mounted() {
    this.loadInfoMessage();
  }

  private loadInfoMessage(): void {
    InfoMessageService.getActiveInfoMessage().then((message: InfoMessageDTO) => {
      this.infomessage = message;
    });
  }

  /**
   * Gibt ein Boolean zurück, ob es eine Infonachricht gibt
   */
  get hasInfoMessage(): boolean {
    return this.infomessage.gueltig;
  }

  private closeDialog() {
    this.showDialog = false;
  }

  private openDialogAndLoadData(): void {
    this.loadInfoMessage();
    this.showDialog = true;
  }
}
</script>
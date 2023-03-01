<template>
  <v-snackbar
      id="snackbar"
      v-model="show"
      :color="color"
      :timeout="timeout"
      left bottom
      vertical
  >
    <div style="font-size: medium">
      {{ snackbarTextPart1 }}
    </div>
    <div style="font-size: small">
      {{ snackbarTextPart2 }}
    </div>
    <v-btn
        color="primary"
        text
        @click="show = false"
        v-if="color === 'error'"
    >
      Schließen
    </v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {Levels} from "@/api/error";

@Component
export default class TheSnackbar extends Vue {

  private static defaultTimeout: number = 6000;

  private show: boolean = false;
  private timeout: number = TheSnackbar.defaultTimeout;
  private snackbarTextPart1: string = '';
  private snackbarTextPart2: string = '';
  private color: string = 'info';

  @Watch('$store.state.snackbar.switch')
  setToast(): void {
    this.show = false;
    setTimeout(() => {
      this.snackbarTextPart1 = this.$store.state.snackbar.snackbarTextPart1;
      this.snackbarTextPart2 = this.$store.state.snackbar.snackbarTextPart2;
      this.color = this.$store.state.snackbar.level;
      switch (this.color) {
        case Levels.ERROR: {
          this.timeout = 0;
          break;
        }
        case Levels.WARNING: {
          this.timeout = 8000;
          break;
        }
        case Levels.SUCCESS: {
          this.timeout = 4000;
          break;
        }
        default: {
          this.timeout = 6000;
          break;
        }
      }
      this.show = true;
    }, 100);
  }
}
</script>


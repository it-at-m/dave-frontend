<template>
    <v-snackbar
        id="snackbar"
        v-model="show"
        :color="color"
        :timeout="timeout"
        vertical
        location="bottom left"
    >
      <template v-slot:text>
        <div class="text-subtitle-1 pb-2">{{snackbarTextPart1}}</div>
        <p>{{ snackbarTextPart2 }}</p>
      </template>

      <template v-slot:actions>
        <v-btn
            v-if="color === 'error'"
            class="text-none"
            color="primary"
            text="Schließen"
            variant="text"
            @click="show = false"
        />
      </template>

    </v-snackbar>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { Levels } from "@/api/error";
import { useSnackbarStore } from "@/store/snackbar";

const defaultTimeout = 6000;

const show = ref(false);
const timeout = ref(defaultTimeout);
const snackbarTextPart1 = ref<string | undefined>("");
const snackbarTextPart2 = ref<string | undefined>("");
const color = ref(Levels.INFO);

const snackbarStore = useSnackbarStore();

watch(
    () => snackbarStore.trigger,
    () => {
        show.value = false;
        setTimeout(() => {
            snackbarTextPart1.value = snackbarStore.getTextPart1;
            snackbarTextPart2.value = snackbarStore.getTextPart2;
            color.value = snackbarStore.getLevel;
            switch (color.value) {
                case Levels.ERROR: {
                    timeout.value = -1;
                    break;
                }
                case Levels.WARNING: {
                    timeout.value = 8000;
                    break;
                }
                case Levels.SUCCESS: {
                    timeout.value = 4000;
                    break;
                }
                default: {
                    timeout.value = 6000;
                    break;
                }
            }
            show.value = true;
        }, 100);
    }
);
</script>


<template>
    <v-snackbar
        id="snackbar"
        v-model="show"
        :color="color"
        :timeout="timeout"
        left
        bottom
        vertical
    >
        <div style="font-size: medium">
            {{ snackbarTextPart1 }}
        </div>
        <div style="font-size: small">
            {{ snackbarTextPart2 }}
        </div>
        <v-btn
            v-if="color === 'error'"
            color="primary"
            text
            @click="show = false"
        >
            Schließen
        </v-btn>
    </v-snackbar>
</template>

<script lang="ts" setup>
import { Ref, ref, watch } from "vue";
import { Levels } from "@/api/error";
import { useSnackbarStore } from "@/store/snackbar";

const defaultTimeout = 6000;

const show = ref(false);
const timeout = ref(defaultTimeout);
const snackbarTextPart1: Ref<string | undefined> = ref("");
const snackbarTextPart2: Ref<string | undefined> = ref("");
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
                    timeout.value = 0;
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


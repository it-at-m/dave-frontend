<template>
    <!-- v-if-Hack to reset Dialog -->
    <v-dialog
        v-if="openDialog"
        v-model="openDialog"
        max-width="900px"
        @click:outside="cancelDialog"
    >
        <v-card width="900px">
            <v-card-title
                class="text-h6 grey--text text--lighten-1 grey lighten-2 mb-3"
                autofocus
            >
                Vorschau
            </v-card-title>
            <v-sheet
                width="100%"
                :max-height="getContentSheetHeight"
                class="overflow-y-auto overflow-x-hidden"
            >
                <v-card-text>
                    <vue-pdf-embed
                        ref="pdfEmbed"
                        :source="previewSource"
                    />
                </v-card-text>
            </v-sheet>
            <v-speed-dial
                v-model="fab"
                absolute
                bottom
                right
                open-on-hover
            >
                <template #activator>
                    <v-btn
                        v-model="fab"
                        dark
                        fab
                        :color="fabColor"
                    >
                        <v-icon v-if="fab"> mdi-close-thick </v-icon>
                        <v-icon v-else> mdi-plus-thick </v-icon>
                    </v-btn>
                </template>
                <v-tooltip left>
                    <template #activator="{ props }">
                        <v-btn
                            fab
                            dark
                            small
                            color="secondary"
                            v-bind="props"
                            @click="downloadPdf"
                        >
                            <v-icon>mdi-printer</v-icon>
                        </v-btn>
                    </template>
                    <span>Report herunterladen</span>
                </v-tooltip>
                <v-tooltip left>
                    <template #activator="{ props }">
                        <v-btn
                            fab
                            dark
                            small
                            color="secondary"
                            v-bind="props"
                            @click="cancelDialog"
                        >
                            <v-icon>mdi-eye-off</v-icon>
                        </v-btn>
                    </template>
                    <span>Vorschau schließen</span>
                </v-tooltip>
            </v-speed-dial>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import VuePdfEmbed from 'vue-pdf-embed'
import {useDisplay} from "vuetify";

interface Props {
    source: Uint8Array;
}

const props = defineProps<Props>();
const openPreviewDialog = defineModel<boolean>({ required: true });

const display = useDisplay();

const emits = defineEmits<{
    (e: "download"): void;
    (e: "cancelDialog"): void;
    (e: "input", v: boolean): void;
}>();

const openDialog = computed({
    get: () => openPreviewDialog.value,
    set: (payload: boolean) => emits("input", payload),
});

const fab = ref(false);

const fabColor = computed(() => {
    return fab.value ? "grey darken-1" : "secondary";
});

const getContentSheetHeight = computed(() => {
    if (display.xl.value) {
        return "750px";
    }
    return "400px";
});

const previewSource = computed<Uint8Array>(() => {
  return props.source;
});

function downloadPdf(): void {
    emits("download");
}

/**
 * Verlässt das Formular ohne zu speichern.
 */
function cancelDialog(): void {
    fab.value = false;
    emits("cancelDialog");
}
</script>
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
                class="text-h6 text-grey-darken-2 mb-3 bg-grey-lighten-2"
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
                open-on-hover
            >
              <template #activator="{ props: activatorProps }">
                    <v-btn
                        key="speed-dial-show-preview-pdf"
                        v-model="fab"
                        color="secondary"
                        :icon="fab ? 'mdi-close-thick' : 'mdi-plus-thick'"
                        class="mr-4 mb-4"
                        elevation="6"
                        location="bottom end"
                        position="fixed"
                        size="large"
                        style="z-index: 400"
                        v-bind="activatorProps"
                    />
                </template>
                <v-tooltip location="left">
                  <template #activator="{ props }">
                        <v-btn
                            key="download-pdf-btn"
                            color="secondary"
                            icon="mdi-printer"
                            size="small"
                            v-bind="props"
                            @click="downloadPdf"
                        />
                    </template>
                    <span>Report herunterladen</span>
                </v-tooltip>
                <v-tooltip location="left">
                  <template #activator="{ props }">
                        <v-btn
                            key="cancel-dialog-btn"
                            color="secondary"
                            icon="mdi-eye-off"
                            size="small"
                            v-bind="props"
                            @click="cancelDialog"
                        />
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
const openPreviewPdfDialog = defineModel<boolean>({ required: true });

const display = useDisplay();

const emits = defineEmits<{
    (e: "download"): void;
    (e: "cancelDialog"): void;
    (e: "input", v: boolean): void;
}>();

const openDialog = computed({
    get: () => openPreviewPdfDialog.value,
    set: (payload: boolean) => emits("input", payload),
});

const fab = ref(false);

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
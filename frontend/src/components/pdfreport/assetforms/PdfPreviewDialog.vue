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
                    <template #activator="{ on, attrs }">
                        <v-btn
                            fab
                            dark
                            small
                            color="secondary"
                            v-bind="attrs"
                            @click="downloadPdf"
                            v-on="on"
                        >
                            <v-icon>mdi-printer</v-icon>
                        </v-btn>
                    </template>
                    <span>Report herunterladen</span>
                </v-tooltip>
                <v-tooltip left>
                    <template #activator="{ on, attrs }">
                        <v-btn
                            fab
                            dark
                            small
                            color="secondary"
                            v-bind="attrs"
                            @click="cancelDialog"
                            v-on="on"
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
import VuePdfEmbed from "vue-pdf-embed/dist/vue2-pdf-embed";
import { computed, ComputedRef, ref } from "vue";
import { useVuetify } from "@/util/useVuetify";

interface Props {
    value: boolean;
    source: Uint8Array;
}

const props = defineProps<Props>();
const vuetify = useVuetify();

const emits = defineEmits<{
    (e: "download"): void;
    (e: "cancelDialog"): void;
    (e: "input", v: boolean): void;
}>();

const openDialog = computed({
    get: () => props.value,
    set: (payload: boolean) => emits("input", payload),
});

const fab = ref(false);

const fabColor: ComputedRef<string> = computed(() => {
    return fab.value ? "grey darken-1" : "secondary";
});

const previewSource: ComputedRef<Uint8Array> = computed(() => {
    return props.source;
});

const getContentSheetHeight: ComputedRef<string> = computed(() => {
    if (vuetify.breakpoint.xl) {
        return "750px";
    }
    return "400px";
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
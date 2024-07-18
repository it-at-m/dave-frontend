<template>
    <v-dialog
        v-model="openDialog"
        width="100vh"
        height="60vh"
        @click:outside="cancelDialog"
    >
        <v-card>
            <v-card-title
                class="text-h6 text-grey-darken-2 mb-3 bg-grey-lighten-2"
            >
                <v-icon class="mr-2">mdi-text</v-icon>
                Tabellenbeschreibung bearbeiten
            </v-card-title>
            <v-card-text>
                <v-sheet
                    width="100%"
                    max-height="200px"
                    min-height="200px"
                    class="overflow-y-auto"
                >
                    <p>{{ asset.text }}</p>
                </v-sheet>
                <v-divider/>
                <v-form
                    ref="form"
                    class="mx-3"
                >
                    <v-container>
                        <v-row>
                            <v-col>
                                <v-textarea
                                    v-model="asset.text"
                                    label="Text Abschnitt"
                                    prepend-icon="mdi-feather"
                                    hint="Sie können innerhalb des Textes (auf eigene Gefahr) HTML Notation verwenden. Sollte das PDF nicht mehr generiert werden können, so achten Sie bitte darauf, dass alle Elemente geschlossen wurden. Beispiel: <p>text...</p>"
                                    persistent-hint
                                    variant="outlined"
                                    density="compact"
                                />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
            <v-divider/>

            <v-card-actions>
                <v-spacer/>
                <v-btn
                    color="primary"
                    @click="save"
                >
                    Speichern
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import DatatableAsset from "@/types/pdfreport/assets/DatatableAsset";
import type OptionsDTO from "@/types/zaehlung/OptionsDTO";
import TextAsset from "@/types/pdfreport/assets/TextAsset";
import { computed, ref, watch } from "vue";

interface Props {
    datatable: DatatableAsset;
}

const props = defineProps<Props>();
const openEditDatatableDialog = defineModel<boolean>({ required: true });

const emits = defineEmits<{
    (e: "save", v: TextAsset): void;
    (e: "cancelDialog"): void;
    (e: "input", v: boolean): void;
}>();

const asset = ref(new DatatableAsset({} as OptionsDTO, "", ""));

const openDialog = computed({
    get: () => openEditDatatableDialog.value,
    set: (payload: boolean) => emits("input", payload),
});

/**
 * Um das Bild im Array zu "speichern", wird es als Event an die View geschickt.
 */
function save(): void {
    emits("save", Object.assign({}, asset.value));
}

/**
 * Verläßt das Formular ohne zu speichern.
 */
function cancelDialog(): void {
    emits("cancelDialog");
}

watch(openDialog, () => {
    if (props.datatable) {
        asset.value = Object.assign({}, props.datatable);
    }
});
</script>

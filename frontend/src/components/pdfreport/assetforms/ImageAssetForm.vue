<template>
    <v-dialog
        v-model="openDialog"
        width="80vh"
        height="60vh"
        @click:outside="cancelDialog"
    >
        <v-card>
            <v-card-title
                class="text-h6 grey--text text--lighten-1 grey lighten-2 mb-3"
            >
                <v-icon
                    color="grey lighten-1"
                    class="mr-2"
                    >mdi-image</v-icon
                >
                Bildeinstellungen bearbeiten
            </v-card-title>
            <v-card-text>
                <p class="text-caption">
                    (Die Höhe der Grafik wird nur bis max. 200px angezeigt. Im
                    Dokument ist sie dann in voller Höhe zu sehen)
                </p>
                <v-sheet
                    width="100%"
                    height="200px"
                    color="grey lighten-4"
                    outlined
                >
                    <v-img
                        :src="asset.image"
                        :width="`${asset.width}%`"
                        max-height="200px"
                    ></v-img>
                </v-sheet>
                <p>{{ asset.caption }}</p>
                <v-divider></v-divider>
                <v-form
                    ref="form"
                    class="mx-3"
                >
                    <v-container>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    v-model="asset.caption"
                                    label="Bildunterschrift"
                                    prepend-icon="mdi-message-image"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-file-input
                                    label="Bilder vom Rechner hoch laden."
                                    accept="image/*"
                                    prepend-icon="mdi-image-plus"
                                    outlined
                                    dense
                                    show-size
                                    @change="upload($event)"
                                ></v-file-input>
                            </v-col>
                            <v-col>
                                <v-slider
                                    v-model="asset.width"
                                    label="Breite in %"
                                    thumb-color="red"
                                    thumb-label="always"
                                    prepend-icon="mdi-image-size-select-large"
                                ></v-slider>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="save"
                >
                    Speichern
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import ImageAsset from "@/types/pdfreport/assets/ImageAsset";
import TextAsset from "@/types/pdfreport/assets/TextAsset";
import { computed, ref, watch } from "vue";

interface Props {
    image: ImageAsset;
}

const props = defineProps<Props>();
const openEditImageDialog = defineModel<boolean>({ required: true });

const emits = defineEmits<{
    (e: "save", v: TextAsset): void;
    (e: "cancelDialog"): void;
    (e: "input", v: boolean): void;
}>();

const asset = ref(new ImageAsset("", ""));

const openDialog = computed({
    get: () => openEditImageDialog.value,
    set: (payload: boolean) => emits("input", payload),
});

/**
 * Speichert den Base64 String des Bildes im ImageAsset Objekt.
 *
 * @param file
 */
function upload(file: File): void {
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64 = reader.result;
            if (asset.value && base64 && !(base64 instanceof ArrayBuffer)) {
                asset.value.image = base64;
            }
        };
    }
}

/**
 * Um das Bild im Array zu "speichern", wird es als Event an die View geschickt.
 */
function save(): void {
    if (asset.value.image && asset.value.image?.length > 0) {
        emits("save", Object.assign({}, asset.value));
    } else {
        cancelDialog();
    }
}

/**
 * Verläßt das Formular ohne zu speichern.
 */
function cancelDialog(): void {
    emits("cancelDialog");
}

watch(openDialog, () => {
    if (props.image) {
        asset.value = Object.assign({}, props.image);
    }
});
</script>
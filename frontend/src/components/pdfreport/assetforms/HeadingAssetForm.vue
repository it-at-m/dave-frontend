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
                <v-icon class="mr-2">{{ icon }}</v-icon>
                Überschrift bearbeiten
            </v-card-title>
            <v-card-text>
                <v-sheet
                    width="100%"
                    height="200px"
                >
                    <h1 v-if="style === 'h1'">{{ asset.text }}</h1>
                    <h2 v-if="style === 'h2'">{{ asset.text }}</h2>
                    <h3 v-if="style === 'h3'">{{ asset.text }}</h3>
                    <h4 v-if="style === 'h4'">{{ asset.text }}</h4>
                    <h5 v-if="style === 'h5'">{{ asset.text }}</h5>
                </v-sheet>
                <v-divider/>
                <v-form
                    ref="form"
                    class="mx-3"
                >
                    <v-container>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    v-model="asset.text"
                                    label="Überschrift"
                                    prepend-icon="mdi-format-text-variant-outline"
                                    variant="outlined"
                                    density="compact"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-select
                                    v-model="asset.type"
                                    :items="items"
                                    label="Art der Überschrift"
                                    prepend-icon="mdi-format-header-pound"
                                    variant="outlined"
                                    density="compact"
                                    @change="setIconAndStyle(asset)"
                                ></v-select>
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
import HeadingAsset from "@/types/pdfreport/assets/HeadingAsset";
import AssetTypesEnum from "@/types/pdfreport/assets/AssetTypesEnum";
import TextAsset from "@/types/pdfreport/assets/TextAsset";
import { computed, ref, watch } from "vue";

interface Props {
    heading: HeadingAsset;
}

const props = defineProps<Props>();
const openEditHeadingDialog = defineModel<boolean>({ required: true });

const emits = defineEmits<{
    (e: "save", v: TextAsset): void;
    (e: "cancelDialog"): void;
    (e: "input", v: boolean): void;
}>();

const asset = ref(new HeadingAsset("", AssetTypesEnum.HEADING1));
const icon = ref("mdi-format-header-1");
const style = ref("h1");

const items: Array<string> = [
    AssetTypesEnum.HEADING1,
    AssetTypesEnum.HEADING2,
    AssetTypesEnum.HEADING3,
    AssetTypesEnum.HEADING4,
    AssetTypesEnum.HEADING5,
];

const openDialog = computed({
    get: () => openEditHeadingDialog.value,
    set: (payload: boolean) => emits("input", payload),
});

function setIconAndStyle(headingAsset: HeadingAsset): void {
    // Icons und Style sind abhängig von der Überschriftsgröße
    if (headingAsset.type === AssetTypesEnum.HEADING1) {
        icon.value = "mdi-format-header-1";
        style.value = "h1";
    }

    if (headingAsset.type === AssetTypesEnum.HEADING2) {
        icon.value = "mdi-format-header-2";
        style.value = "h2";
    }

    if (headingAsset.type === AssetTypesEnum.HEADING3) {
        icon.value = "mdi-format-header-3";
        style.value = "h3";
    }

    if (headingAsset.type === AssetTypesEnum.HEADING4) {
        icon.value = "mdi-format-header-4";
        style.value = "h4";
    }

    if (headingAsset.type === AssetTypesEnum.HEADING5) {
        icon.value = "mdi-format-header-5";
        style.value = "h5";
    }
}

/**
 * Um die Überschrift im Array zu "speichern", wird es als Event an die View geschickt.
 */
function save(): void {
    if (asset.value.text && asset.value.text.length > 0) {
        emits("save", Object.assign({}, asset.value));
    } else {
        cancelDialog();
    }
}

/**
 * Verläßt das Formular ohne zu speichern.
 */
function cancelDialog(): void {
    asset.value = new HeadingAsset("", AssetTypesEnum.HEADING1);
    emits("cancelDialog");
}

watch(openDialog, () => {
    if (props.heading) {
        asset.value = Object.assign({}, props.heading);
    }
});
</script>
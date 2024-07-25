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
                <v-icon class="mr-2" icon="mdi-trash-can"/>
                Element entfernen
            </v-card-title>
            <v-card-text class="text-body-1">
                <p>
                    Wollen Sie das Element wirklich aus dem PDF Report entfernen?
                </p>
            </v-card-text>
            <v-divider/>

            <v-card-actions>
                <v-spacer/>
                <v-btn
                    class="text-none"
                    color="error"
                    append-icon="mdi-alarm-light-outline"
                    text="Löschen"
                    @click="deleteAsset"
                />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
    assetId: number;
}

const props = defineProps<Props>();
const openDeleteDialog = defineModel<boolean>({ required: true });

const emits = defineEmits<{
    (e: "delete", v: number): void;
    (e: "cancelDialog"): void;
    (e: "input", v: boolean): void;
}>();

const openDialog = computed({
    get: () => openDeleteDialog.value,
    set: (payload: boolean) => emits("input", payload),
});

function deleteAsset(): void {
    emits("delete", props.assetId);
}

/**
 * Verläßt das Formular ohne zu speichern.
 */
function cancelDialog(): void {
    emits("cancelDialog");
}
</script>
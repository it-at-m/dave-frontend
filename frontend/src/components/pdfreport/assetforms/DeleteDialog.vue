<template>
    <v-dialog
        v-model="open"
        width="25vh"
        height="25vh"
        @click:outside="cancel"
    >
        <v-card>
            <v-card-title
                class="text-h6 grey--text text--lighten-1 grey lighten-2 mb-3"
            >
                <v-icon
                    color="grey lighten-1"
                    class="mr-2"
                    >mdi-trash-can</v-icon
                >
                Element entfernen
            </v-card-title>
            <v-card-text>
                <p>
                    Wollen Sie das Element wirklich aus dem PDF Report
                    entfernen?
                </p>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="error"
                    text
                    @click="deleteAsset"
                >
                    <v-icon left> mdi-alarm-light-outline </v-icon>
                    Löschen
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class DeleteDialog extends Vue {
    @Prop({ default: false }) open: boolean | undefined;
    @Prop() assetId!: number;

    deleteAsset(): void {
        this.$emit("delete", this.assetId);
    }

    /**
     * Verläßt das Formular ohne zu speichern.
     */
    cancel(): void {
        this.$emit("cancel");
    }
}
</script>
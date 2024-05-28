<template>
    <v-dialog
        v-model="open"
        width="80vh"
        height="60vh"
        @click:outside="cancel"
    >
        <v-card>
            <v-card-title
                class="text-h6 grey--text text--lighten-1 grey lighten-2 mb-3"
            >
                <v-icon
                    color="grey lighten-1"
                    class="mr-2"
                    >mdi-text</v-icon
                >
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
                <v-divider></v-divider>
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
                                    outlined
                                    dense
                                ></v-textarea>
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

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import DatatableAsset from "@/types/pdfreport/assets/DatatableAsset";
/* eslint-disable no-unused-vars */
import OptionsDTO from "@/types/zaehlung/OptionsDTO";
/* eslint-enable no-unused-vars */

@Component
export default class DatatableAssetForm extends Vue {
    @Prop({ default: false }) open: boolean | undefined;
    @Prop() datatable?: DatatableAsset;

    asset: DatatableAsset = new DatatableAsset({} as OptionsDTO, "", "");

    @Watch("datatable")
    copyAsset(asset: DatatableAsset): void {
        if (asset) {
            this.asset = Object.assign({}, asset);
        }
    }

    /**
     * Um den Text im Array zu "speichern", wird es als Event an die View geschickt.
     */
    save(): void {
        const event = {};
        Object.assign(event, this.asset);
        this.$emit("save", event);
    }

    /**
     * Verläßt das Formular ohne zu speichern.
     */
    cancel(): void {
        this.$emit("cancel", Object.assign({}, this.asset));
    }
}
</script>

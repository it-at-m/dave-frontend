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
                    >{{ icon }}</v-icon
                >
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
                <v-divider></v-divider>
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
                                    outlined
                                    dense
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
                                    outlined
                                    dense
                                    @change="setIconAndStyle(asset)"
                                ></v-select>
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

/* eslint-disable no-unused-vars */
import HeadingAsset from "@/types/pdfreport/assets/HeadingAsset";
import AssetTypesEnum from "@/types/pdfreport/assets/AssetTypesEnum";
/* eslint-enable no-unused-vars */

@Component
export default class HeadingAssetForm extends Vue {
    @Prop({ default: false }) open: boolean | undefined;
    @Prop() heading?: HeadingAsset;

    asset: HeadingAsset = new HeadingAsset("", AssetTypesEnum.HEADING1);
    icon = "mdi-format-header-1";
    style = "h1";

    items: string[] = [
        AssetTypesEnum.HEADING1,
        AssetTypesEnum.HEADING2,
        AssetTypesEnum.HEADING3,
        AssetTypesEnum.HEADING4,
        AssetTypesEnum.HEADING5,
    ];

    @Watch("heading")
    copyAsset(asset: HeadingAsset): void {
        if (asset) {
            this.setIconAndStyle(asset);
            this.asset = Object.assign({}, asset);
        }
    }

    /**
     *
     */
    setIconAndStyle(asset: HeadingAsset): void {
        // Icons und Style sind abhängig von der Überschriftsgröße
        if (asset.type === AssetTypesEnum.HEADING1) {
            this.icon = "mdi-format-header-1";
            this.style = "h1";
        }

        if (asset.type === AssetTypesEnum.HEADING2) {
            this.icon = "mdi-format-header-2";
            this.style = "h2";
        }

        if (asset.type === AssetTypesEnum.HEADING3) {
            this.icon = "mdi-format-header-3";
            this.style = "h3";
        }

        if (asset.type === AssetTypesEnum.HEADING4) {
            this.icon = "mdi-format-header-4";
            this.style = "h4";
        }

        if (asset.type === AssetTypesEnum.HEADING5) {
            this.icon = "mdi-format-header-5";
            this.style = "h5";
        }
    }

    /**
     * Um die Überschrift im Array zu "speichern", wird es als Event an die View geschickt.
     */
    save(): void {
        if (this.asset?.text && this.asset.text.length > 0) {
            const event = {};
            Object.assign(event, this.asset);
            this.$emit("save", event);
        } else {
            this.cancel();
        }
    }

    /**
     * Verläßt das Formular ohne zu speichern.
     */
    cancel(): void {
        this.$emit("cancel", Object.assign({}, this.asset));
    }
}
</script>
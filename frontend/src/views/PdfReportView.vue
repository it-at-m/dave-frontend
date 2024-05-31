<template>
    <v-container
        class="pa-0"
        fluid
    >
        <v-sheet
            class="ma-10 pa-5"
            elevation="2"
            outlined
            width="80%"
        >
            <draggable
                :scroll-sensitivity="250"
                :list="assets"
                :force-fallback="true"
                ghost-class="ghost"
                @end="dragging = false"
                @start="dragging = true"
            >
                <v-card
                    v-for="asset in assets"
                    :key="asset.id"
                    class="ma-3"
                    elevation="0"
                >
                    <v-app-bar
                        color="rgba(0, 0, 0, 0)"
                        dense
                        flat
                        @mouseout="setClickable(0)"
                        @mouseover="setClickable(asset.id)"
                    >
                        <v-icon color="grey lighten-2">{{
                            icon(asset)
                        }}</v-icon>
                        <v-divider
                            class="mx-4"
                            vertical
                        ></v-divider>
                        <span
                            class="grey--text text--lighten-2 text-body-1 font-weight-regular pl-0"
                        >
                            {{ header(asset) }}
                        </span>
                        <v-spacer></v-spacer>
                        <v-btn
                            v-show="clickable === asset.id && isEditable(asset)"
                            icon
                            @click="edit(asset)"
                        >
                            <v-icon>mdi-lead-pencil</v-icon>
                        </v-btn>
                        <v-btn
                            v-show="clickable === asset.id"
                            icon
                            @click="deleteAsset(asset)"
                        >
                            <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                    </v-app-bar>
                    <v-card-text
                        :style="{ cursor: selectedCursor }"
                        @mouseover="draggable = true"
                    >
                        <h1 v-if="isHeading1(asset)">
                            {{ getTextOfAsset(asset) }}
                        </h1>
                        <h2 v-if="isHeading2(asset)">
                            {{ getTextOfAsset(asset) }}
                        </h2>
                        <h3 v-if="isHeading3(asset)">
                            {{ getTextOfAsset(asset) }}
                        </h3>
                        <h4 v-if="isHeading4(asset)">
                            {{ getTextOfAsset(asset) }}
                        </h4>
                        <h5 v-if="isHeading5(asset)">
                            {{ getTextOfAsset(asset) }}
                        </h5>
                        <p
                            v-if="isText(asset)"
                            :style="{ fontSize: getSizeOfAsset(asset) }"
                            v-html="getTextOfAsset(asset)"
                        />
                        <v-divider v-if="isPageBreak(asset)"></v-divider>
                        <v-divider v-if="isNewline(asset)"></v-divider>
                        <p v-if="isDatatable(asset)">
                            {{ getTextOfAsset(asset) }}
                        </p>
                        <p v-if="isDatatableMessstelle(asset)">
                            {{ getTextOfAsset(asset) }}
                        </p>
                        <p v-if="isZaehlungskenngroesse(asset)">
                            {{ getTextOfAsset(asset) }}
                        </p>
                        <DisplayImageAsset
                            v-if="isImage(asset)"
                            :caption="getCaptionOfAsset(asset)"
                            :image="getImageOfAsset(asset)"
                            :width="`${getWidthOfAsset(asset)}%`"
                        ></DisplayImageAsset>
                    </v-card-text>
                </v-card>
                <v-toolbar>
                    <v-tooltip bottom>
                        <template #activator="{ on, attrs }">
                            <v-btn
                                v-bind="attrs"
                                icon
                                v-on="on"
                                @click="createTextAsset"
                            >
                                <v-icon>mdi-text</v-icon>
                            </v-btn>
                        </template>
                        <span> Freitext </span>
                    </v-tooltip>
                    <v-divider
                        class="mx-4"
                        vertical
                    ></v-divider>
                    <v-tooltip bottom>
                        <template #activator="{ on, attrs }">
                            <v-btn
                                v-bind="attrs"
                                icon
                                v-on="on"
                                @click="createHeadingAsset('h1')"
                            >
                                <v-icon>mdi-format-header-1</v-icon>
                            </v-btn>
                        </template>
                        <span> Überschrift 1 </span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template #activator="{ on, attrs }">
                            <v-btn
                                v-bind="attrs"
                                icon
                                v-on="on"
                                @click="createHeadingAsset('h2')"
                            >
                                <v-icon>mdi-format-header-2</v-icon>
                            </v-btn>
                        </template>
                        <span> Überschrift 2 </span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template #activator="{ on, attrs }">
                            <v-btn
                                v-bind="attrs"
                                icon
                                v-on="on"
                                @click="createHeadingAsset('h3')"
                            >
                                <v-icon>mdi-format-header-3</v-icon>
                            </v-btn>
                        </template>
                        <span> Überschrift 3 </span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template #activator="{ on, attrs }">
                            <v-btn
                                v-bind="attrs"
                                icon
                                v-on="on"
                                @click="createHeadingAsset('h4')"
                            >
                                <v-icon>mdi-format-header-4</v-icon>
                            </v-btn>
                        </template>
                        <span> Überschrift 4 </span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template #activator="{ on, attrs }">
                            <v-btn
                                v-bind="attrs"
                                icon
                                v-on="on"
                                @click="createHeadingAsset('h5')"
                            >
                                <v-icon>mdi-format-header-5</v-icon>
                            </v-btn>
                        </template>
                        <span> Überschrift 5 </span>
                    </v-tooltip>
                    <v-divider
                        class="mx-4"
                        vertical
                    ></v-divider>
                    <v-tooltip bottom>
                        <template #activator="{ on, attrs }">
                            <v-btn
                                v-bind="attrs"
                                icon
                                v-on="on"
                                @click="createPagebreakAsset"
                            >
                                <v-icon>mdi-format-page-break</v-icon>
                            </v-btn>
                        </template>
                        <span> Seitenumbruch </span>
                    </v-tooltip>
                    <v-divider
                        class="mx-4"
                        vertical
                    ></v-divider>
                    <v-tooltip bottom>
                        <template #activator="{ on, attrs }">
                            <v-btn
                                v-bind="attrs"
                                icon
                                v-on="on"
                                @click="createNewlineAsset"
                            >
                                <v-icon>mdi-format-text-wrapping-wrap</v-icon>
                            </v-btn>
                        </template>
                        <span> Zeilenumbruch </span>
                    </v-tooltip>
                    <v-divider
                        class="mx-4"
                        vertical
                    ></v-divider>
                    <v-tooltip bottom>
                        <template #activator="{ on, attrs }">
                            <v-btn
                                v-bind="attrs"
                                icon
                                v-on="on"
                                @click="createImageAsset"
                            >
                                <v-icon>mdi-image</v-icon>
                            </v-btn>
                        </template>
                        <span> Bild hinzufügen </span>
                    </v-tooltip>
                    <v-spacer></v-spacer>
                    <v-icon color="grey lighten-2">mdi-heart</v-icon>
                </v-toolbar>
            </draggable>
        </v-sheet>

        <v-speed-dial
            v-model="fab"
            fixed
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
                        @click="generatePdf"
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
                        @click="previewPdf"
                        v-on="on"
                    >
                        <v-icon>mdi-eye</v-icon>
                    </v-btn>
                </template>
                <span>Vorschau öffnen</span>
            </v-tooltip>
        </v-speed-dial>
        <ImageAssetForm
            v-model="editImage"
            :image="imageAsset"
            @cancelDialog="cancel()"
            @save="save($event)"
        ></ImageAssetForm>
        <DatatableAssetForm
            v-model="editDatatable"
            :datatable="datatableAsset"
            @cancelDialog="cancel()"
            @save="save($event)"
        ></DatatableAssetForm>
        <HeadingAssetForm
            v-model="editHeading"
            :heading="headingAsset"
            @cancelDialog="cancel()"
            @save="save($event)"
        ></HeadingAssetForm>
        <TextAssetForm
            v-model="editText"
            :text="textAsset"
            @cancelDialog="cancel()"
            @save="save($event)"
        ></TextAssetForm>
        <DeleteDialog
            v-model="deleteDialog"
            :asset-id="assetId"
            @cancelDialog="cancel()"
            @delete="deleteIt($event)"
        ></DeleteDialog>

        <pdf-preview-dialog
            v-model="previewPdfDialog"
            :source="previewSource"
            @cancelDialog="cancel"
            @download="downloadPdf"
        />
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

// Components
import draggable from "vuedraggable";
import DisplayImageAsset from "@/components/pdfreport/assets/DisplayImageAsset.vue";
import ImageAssetForm from "@/components/pdfreport/assetforms/ImageAssetForm.vue";
import HeadingAssetForm from "@/components/pdfreport/assetforms/HeadingAssetForm.vue";
import TextAssetForm from "@/components/pdfreport/assetforms/TextAssetForm.vue";
import DatatableAssetForm from "@/components/pdfreport/assetforms/DatatableAssetForm.vue";
import DeleteDialog from "@/components/pdfreport/assetforms/DeleteDialog.vue";

/* eslint-disable no-unused-vars */
import BaseAsset from "../types/pdfreport/assets/BaseAsset";
import HeadingAsset from "../types/pdfreport/assets/HeadingAsset";
import TextAsset from "@/types/pdfreport/assets/TextAsset";
import AssetTypesEnum from "@/types/pdfreport/assets/AssetTypesEnum";
import ImageAsset from "@/types/pdfreport/assets/ImageAsset";
import PagebreakAsset from "@/types/pdfreport/assets/PagebreakAsset";
import GeneratePdfService from "@/api/service/GeneratePdfService";
import OptionsDTO from "@/types/zaehlung/OptionsDTO";
/* eslint-enable no-unused-vars */
// Utils
import DatatableAsset from "@/types/pdfreport/assets/DatatableAsset";
import _ from "lodash";
import PdfPreviewDialog from "@/components/pdfreport/assetforms/PdfPreviewDialog.vue";
import NewlineAsset from "@/types/pdfreport/assets/NewlineAsset";
import ZaehlungskenngroessenAsset from "@/types/pdfreport/assets/ZaehlungskenngroessenAsset";
import MessstelleDatatableAsset from "@/types/pdfreport/assets/MessstelleDatatableAsset";
import { useDaveUtils } from "@/util/DaveUtils";
import { useSnackbarStore } from "@/store/modules/snackbar";
import { usePdfReportStore } from "@/store/modules/pdfReport";
import { useUserStore } from "@/store/modules/user";

@Component({
    components: {
        PdfPreviewDialog,
        draggable,
        DisplayImageAsset,
        ImageAssetForm,
        HeadingAssetForm,
        TextAssetForm,
        DatatableAssetForm,
        DeleteDialog,
    },
})
export default class PdfReportView extends Vue {
    // mouse events
    clickable = 0;
    draggable = false;
    dragging = false;

    // Formulare
    editImage = false;
    editHeading = false;
    editText = false;
    editDatatable = false;
    deleteDialog = false;
    previewPdfDialog = false;

    // die einzelnen Assets
    imageAsset: ImageAsset = new ImageAsset("", "");
    headingAsset: HeadingAsset = new HeadingAsset("", AssetTypesEnum.HEADING1);
    textAsset: TextAsset = new TextAsset("");
    datatableAsset: DatatableAsset = new DatatableAsset(
        {} as OptionsDTO,
        "",
        ""
    );
    pdfReportStore = usePdfReportStore();
    userStore = useUserStore();

    // liste der Assets
    assets: BaseAsset[] = this.assetsFromStore;

    assetId = 0;
    loadingPdf = false;

    // bearbeitbare Assest
    editables: string[] = [
        AssetTypesEnum.TEXT,
        AssetTypesEnum.IMAGE,
        AssetTypesEnum.HEADING1,
        AssetTypesEnum.HEADING2,
        AssetTypesEnum.HEADING3,
        AssetTypesEnum.HEADING4,
        AssetTypesEnum.HEADING5,
        AssetTypesEnum.DATATABLE,
        AssetTypesEnum.DATATABLE_MESSSTELLE,
    ];

    fab = false;
    private pdfSourceAsBlob: any;
    private pdfSourceForPreview: Uint8Array = new Uint8Array();

    get fabColor(): string {
        return this.fab ? "grey darken-1" : "secondary";
    }
    get department(): string {
        return this.userStore.getDepartment;
    }

    created() {
        if (!this.pdfReportStore.getHasTitlePage) {
            this.createFirstPage();
        }
    }

    /**
     * Erstellt die Titelseite des PDF Reports.
     */
    createFirstPage(): void {
        // Damit die FirstPage immer oben steht wenn die Seite das erste mal angesurft wird aber schon Assets dem Report hinzugefügt wurden:
        // Assets reversen, Titelpage in umgekehrter Reihenfolge hinzufügen und Assets nochmals reversen
        this.assets.reverse();
        // Seitenumbruch
        this.assets.push(new PagebreakAsset());
        // Datum
        this.save(
            new HeadingAsset(
                "erstellt am " + this.$d(new Date(), "short", "de-DE"),
                AssetTypesEnum.HEADING3
            )
        );
        // Autor
        const name = this.userStore.getName;
        const department = this.department;
        this.save(
            new HeadingAsset(`${name} (${department})`, AssetTypesEnum.HEADING3)
        );
        // Untertitel
        this.save(new HeadingAsset("Untertitel", AssetTypesEnum.HEADING2));
        // Titel
        this.save(new HeadingAsset("Zählungsreport", AssetTypesEnum.HEADING1));
        this.assets.reverse();

        // Titel wurde erstellt
        this.pdfReportStore.setHasTitlePage();
    }

    // Assets werden aus dem Store geladen
    get assetsFromStore(): BaseAsset[] {
        return _.cloneDeep(this.pdfReportStore.getAssets);
    }

    /**
     * Der Drag & Drop Cursor.
     */
    get selectedCursor(): string {
        let cursor = "default";
        if (this.draggable) {
            cursor = "grab";
        }
        if (this.dragging) {
            cursor = "grabbing";
        }
        return cursor;
    }

    // Immer wenn sich das assets-Array, oder ein Objekt in diesem, ändert => Speichern im Store
    @Watch("assets", { deep: true })
    saveAssetsInStore(assets: BaseAsset[]) {
        this.pdfReportStore.setAssets(_.cloneDeep(assets));
    }

    edit(asset: BaseAsset): void {
        if (this.isImage(asset)) {
            this.editImage = true;
            this.imageAsset = asset;
        }

        if (
            this.isHeading1(asset) ||
            this.isHeading2(asset) ||
            this.isHeading3(asset) ||
            this.isHeading4(asset) ||
            this.isHeading5(asset)
        ) {
            this.editHeading = true;
            this.headingAsset = asset;
        }

        if (this.isText(asset)) {
            this.editText = true;
            this.textAsset = asset;
        }

        if (this.isDatatable(asset)) {
            this.editDatatable = true;
            this.datatableAsset = asset;
        }

        if (this.isDatatableMessstelle(asset)) {
            this.editDatatable = true;
            this.datatableAsset = asset;
        }
    }

    isEditable(asset: BaseAsset): boolean {
        return this.editables.includes(asset.type);
    }

    deleteAsset(asset: BaseAsset): void {
        this.assetId = asset.id;
        this.deleteDialog = true;
    }

    deleteIt(id: number): void {
        const assets = this.assets.filter((a) => a.id !== id) as BaseAsset[];
        this.assets = assets;
        this.deleteDialog = false;
    }

    createImageAsset(): void {
        this.editImage = true;
        this.imageAsset = new ImageAsset(" ", "");
        this.imageAsset.width = 80;
    }

    createHeadingAsset(type: string): void {
        if (type === "h1") {
            this.headingAsset = new HeadingAsset("", AssetTypesEnum.HEADING1);
        }
        if (type === "h2") {
            this.headingAsset = new HeadingAsset("", AssetTypesEnum.HEADING2);
        }
        if (type === "h3") {
            this.headingAsset = new HeadingAsset("", AssetTypesEnum.HEADING3);
        }
        if (type === "h4") {
            this.headingAsset = new HeadingAsset("", AssetTypesEnum.HEADING4);
        }
        if (type === "h5") {
            this.headingAsset = new HeadingAsset("", AssetTypesEnum.HEADING5);
        }
        this.editHeading = true;
    }

    createTextAsset(): void {
        this.textAsset = new TextAsset("");
        this.editText = true;
    }

    createPagebreakAsset(): void {
        this.assets.push(new PagebreakAsset());
    }

    createNewlineAsset(): void {
        this.assets.push(new NewlineAsset());
    }

    /**
     * Setzt die id des Assets, damit bei click auf die App Leiste das Asset wieder gefunden und übergeben werden kann.
     *
     * @param id
     */
    setClickable(id: number): void {
        this.clickable = id;
    }

    /**
     * Event Methode um neu erstellte oder veränderte Daten zu speichern.
     *
     * @param asset
     */
    save(asset: BaseAsset) {
        //  Dialog schließen
        this.cancel();

        // In Array speichern
        const a = this.assets.filter((a) => a.id === asset.id) as BaseAsset[];
        // Wenn was gefunden wurde, dann muss das geupdatet werden

        if (a.length > 0) {
            Object.assign(a[0], asset);
        } else {
            // Wenn nichts gefunden wird, dann dem Array einfach hinzu fügen
            this.assets.push(asset);
        }
        // Wir müssen hier ein leeres Objekt setzen, damit die Dialog Componente
        // es mitbekommt, wenn das selbe Objekt nochmal angezeigt werden soll. Das
        // ist nur beim Image notwendig, da hier in der Dialog Componente ein Reset
        // durchgeführt wird.
        if (this.isImage(asset)) {
            this.imageAsset = new ImageAsset("", "");
        }
    }

    /**
     * Schließt einen Bearbeitungsdialog.
     */
    cancel() {
        //  Dialog(e) schließen
        this.editImage = false;
        this.editHeading = false;
        this.editText = false;
        this.editDatatable = false;
        this.deleteDialog = false;
        this.previewPdfDialog = false;
    }

    getTextOfAsset(asset: BaseAsset): string | undefined {
        let result = undefined;
        if (
            this.isHeading1(asset) ||
            this.isHeading2(asset) ||
            this.isHeading3(asset) ||
            this.isHeading4(asset) ||
            this.isHeading5(asset)
        ) {
            result = (asset as HeadingAsset).text;
        } else if (this.isDatatable(asset)) {
            result = (asset as DatatableAsset).text;
        } else if (this.isDatatableMessstelle(asset)) {
            result = (asset as MessstelleDatatableAsset).text;
        } else if (this.isZaehlungskenngroesse(asset)) {
            result = (asset as ZaehlungskenngroessenAsset).text;
        } else if (this.isText(asset)) {
            result = (asset as TextAsset).text;
        }
        return result;
    }

    getSizeOfAsset(asset: BaseAsset): string | undefined {
        let result = undefined;
        if (this.isText(asset)) {
            result = (asset as TextAsset).size;
        }
        return result;
    }

    getCaptionOfAsset(asset: BaseAsset): string | undefined {
        let result = undefined;
        if (this.isImage(asset)) {
            result = (asset as ImageAsset).caption;
        }
        return result;
    }
    getWidthOfAsset(asset: BaseAsset): number | undefined {
        let result = undefined;
        if (this.isImage(asset)) {
            result = (asset as ImageAsset).width;
        }
        return result;
    }
    getImageOfAsset(asset: BaseAsset): string | undefined {
        let result = undefined;
        if (this.isImage(asset)) {
            result = (asset as ImageAsset).image;
        }
        return result;
    }

    isHeading1(asset: BaseAsset): boolean {
        return asset.type === AssetTypesEnum.HEADING1;
    }

    isText(asset: BaseAsset): boolean {
        return asset.type === AssetTypesEnum.TEXT;
    }

    isHeading2(asset: BaseAsset): boolean {
        return asset.type === AssetTypesEnum.HEADING2;
    }

    isHeading3(asset: BaseAsset): boolean {
        return asset.type === AssetTypesEnum.HEADING3;
    }

    isHeading4(asset: BaseAsset): boolean {
        return asset.type === AssetTypesEnum.HEADING4;
    }

    isHeading5(asset: BaseAsset): boolean {
        return asset.type === AssetTypesEnum.HEADING5;
    }

    isImage(asset: BaseAsset): boolean {
        return asset.type === AssetTypesEnum.IMAGE;
    }

    isPageBreak(asset: BaseAsset): boolean {
        return asset.type === AssetTypesEnum.PAGEBREAK;
    }

    isNewline(asset: BaseAsset): boolean {
        return asset.type === AssetTypesEnum.NEWLINE;
    }

    isDatatable(asset: BaseAsset): boolean {
        return asset.type === AssetTypesEnum.DATATABLE;
    }
    isDatatableMessstelle(asset: BaseAsset): boolean {
        return asset.type === AssetTypesEnum.DATATABLE_MESSSTELLE;
    }

    isZaehlungskenngroesse(asset: BaseAsset): boolean {
        return asset.type === AssetTypesEnum.ZAEHLUNGSKENNGROESSEN;
    }

    /**
     * Erzeugt das Icon zu den einzelnen Assets.
     */
    icon(asset: BaseAsset): string {
        let icon = "mdi-mushroom-outline";

        if (this.isHeading1(asset)) {
            icon = "mdi-format-header-1";
        }

        if (this.isText(asset)) {
            icon = "mdi-text";
        }

        if (this.isHeading2(asset)) {
            icon = "mdi-format-header-2";
        }

        if (this.isHeading3(asset)) {
            icon = "mdi-format-header-3";
        }

        if (this.isHeading4(asset)) {
            icon = "mdi-format-header-4";
        }

        if (this.isHeading5(asset)) {
            icon = "mdi-format-header-5";
        }

        if (this.isImage(asset)) {
            icon = "mdi-image";
        }

        if (this.isPageBreak(asset)) {
            icon = "mdi-format-page-break";
        }

        if (this.isNewline(asset)) {
            icon = "mdi-format-text-wrapping-wrap";
        }

        if (this.isDatatable(asset)) {
            icon = "mdi-view-list";
        }

        if (this.isDatatableMessstelle(asset)) {
            icon = "mdi-view-list";
        }

        if (this.isZaehlungskenngroesse(asset)) {
            icon = "mdi-numeric";
        }

        return icon;
    }

    /**
     * Erzeugt die Überschrift über den einzelnen Assets
     *
     * @param asset
     */
    header(asset: BaseAsset): string {
        let header = "";
        if (this.isHeading1(asset)) {
            header = "Dokumentüberschrift";
        }

        if (this.isHeading2(asset)) {
            header = "Zwischenüberschrift Ebene 2";
        }

        if (this.isHeading3(asset)) {
            header = "Zwischenüberschrift Ebene 3";
        }

        if (this.isHeading4(asset)) {
            header = "Zwischenüberschrift Ebene 4";
        }

        if (this.isHeading5(asset)) {
            header = "Zwischenüberschrift Ebene 5";
        }

        if (this.isText(asset)) {
            header = "Freitext";
        }

        if (this.isImage(asset)) {
            header = "Bild, Karte oder Diagramm";
        }

        if (this.isPageBreak(asset)) {
            header = "Seitenumbruch";
        }

        if (this.isNewline(asset)) {
            header = "Zeilenumbruch";
        }

        if (this.isDatatable(asset)) {
            header = "Datentabelle";
        }

        if (this.isDatatableMessstelle(asset)) {
            header = "Datentabelle";
        }

        if (this.isZaehlungskenngroesse(asset)) {
            header = "Zählungskenngrößen";
        }

        return header;
    }

    generatePdf() {
        let formData = new FormData();
        this.loadingPdf = true;

        formData.append(
            "assets",
            new Blob([JSON.stringify(this.assets)], {
                type: "application/json",
            })
        );

        this.fetchPdf(formData);
    }

    private fetchPdf(formData: any) {
        formData.append("department", this.department);
        GeneratePdfService.postPdfCustomFetchReport(formData)
            .then((res) => {
                res.blob().then((blob) => {
                    this.pdfSourceAsBlob = blob;
                    this.downloadPdf();
                });
            })
            .catch((error) => useSnackbarStore().showApiError(error))
            .finally(() => (this.loadingPdf = false));
    }

    previewPdf() {
        let formData = new FormData();
        this.loadingPdf = true;

        formData.append(
            "assets",
            new Blob([JSON.stringify(this.assets)], {
                type: "application/json",
            })
        );

        formData.append("department", this.department);
        GeneratePdfService.postPdfCustomFetchReport(formData)
            .then((res) => {
                res.blob().then((blob) => {
                    blob.arrayBuffer().then((value) => {
                        this.pdfSourceForPreview = new Uint8Array(value);
                        this.previewPdfDialog = true;
                    });
                    this.pdfSourceAsBlob = blob;
                });
            })
            .catch((error) => useSnackbarStore().showApiError(error))
            .finally(() => (this.loadingPdf = false));
    }

    downloadPdf() {
        let filename = `report_${Date.now()}.pdf`;
        useDaveUtils().downloadFile(this.pdfSourceAsBlob, filename);
    }

    get previewSource(): Uint8Array {
        return this.pdfSourceForPreview;
    }
}
</script>

<template>
    <v-sheet
        ref="sheet"
        :min-height="height"
    >
        <!--
    Dieses Overlay wird benötigt, da sich das SVG (aus welchen Gründen auch immer) nur zeichnet wenn der Benutzer es "sehen" kann.
    Wenn das Element bspw. im Belastungsplan Tab wäre würde man nach Änderung der Filteroptionen immer erst auf den
    Belastungsplan Tab wechseln müssen bevor das SVG richtig gezeichnet würde.

    Das Element belastungsplan-kreuzung-svg-schematische-uebersicht wird benötigt für die schematische Übersicht in den
    PDFs der Ganglinie, Listenausgabe und Zeitreihe und muss dementsprechend auch in diesen Tabs immer aktuell gezeichnet sein.

    Der z-index wurde gewählt, da der Benutzer dieses Element nie zu selbst zu Gesicht bekommen soll. Durch den hohen
    negativen Z-Index verschwindet das Element hinter allen anderen Elementen der eigentlichen Anwendung.
    -->
        <v-overlay
            value="true"
            opacity="0"
            z-index="-99999999"
        >
            <belastungsplan-kreuzung-svg-schematische-uebersicht
                :dimension="contentHeight"
                :data="belastungsplanData"
                :doc-mode="false"
                :geometrie-mode="true"
                @print="storeSvgSchematischeUebersicht($event)"
            ></belastungsplan-kreuzung-svg-schematische-uebersicht>
        </v-overlay>
        <v-banner
            v-if="!hasZaehlungen"
            single-line
        >
            <v-icon
                slot="icon"
                color="error"
                size="36"
            >
                mdi-alert-decagram-outline
            </v-icon>
            Zu dieser Zählstelle sind aktuell noch keine Zählungen im System
            vorhanden.
        </v-banner>
        <v-tabs
            v-if="hasZaehlungen"
            v-model="activeTab"
            fixed-tabs
            background-color="grey darken-1"
            dark
            icons-and-text
            slider-color="grey lighten-1"
            slider-size="8"
        >
            <!-- Kopfzeile -->
            <v-tab>
                Belastungsplan
                <v-icon>mdi-arrow-decision</v-icon>
            </v-tab>
            <v-tab>
                Ganglinie
                <v-icon>mdi-chart-histogram</v-icon>
            </v-tab>
            <v-tab>
                Listenausgabe
                <v-icon>mdi-table</v-icon>
            </v-tab>
            <v-tab>
                Heatmap
                <v-icon>mdi-chart-bubble</v-icon>
            </v-tab>
            <v-tab>
                Zeitreihe
                <v-icon>mdi-timer-sand</v-icon>
            </v-tab>
        </v-tabs>
        <v-tabs-items
            v-if="hasZaehlungen"
            v-model="activeTab"
            class="d-flex flex-column align-stretch"
        >
            <!-- Inhalte -->
            <v-tab-item>
                <v-sheet
                    :max-height="contentHeight"
                    width="100%"
                    class="overflow-y-auto"
                >
                    <belastungsplan-kreuzung-svg
                        v-show="!belastungsplanData.kreisverkehr"
                        :dimension="contentHeight"
                        :data="belastungsplanData"
                        :doc-mode="false"
                        :geometrie-mode="true"
                        @print="storeSvg($event)"
                    ></belastungsplan-kreuzung-svg>

                    <belastungsplan-card
                        v-show="belastungsplanData.kreisverkehr"
                        ref="belastungsplanCard"
                        :dimension="contentHeight"
                        :belastungsplan-data="belastungsplanData"
                        :loaded="belastungsplanDataLoaded"
                        :zaehlung-id="zaehlungsId"
                    ></belastungsplan-card>
                </v-sheet>
                <loader :value="belastungsplanLoading"></loader>
            </v-tab-item>
            <v-tab-item>
                <v-sheet
                    :min-height="contentHeight"
                    :max-height="contentHeight"
                    width="100%"
                    class="overflow-y-auto"
                >
                    <step-line-card
                        ref="steplineCard"
                        :zaehldaten-stepline="zaehldatenStepline"
                    ></step-line-card>
                </v-sheet>
                <loader :value="chartDataLoading"></loader>
            </v-tab-item>
            <v-tab-item>
                <v-sheet
                    :max-height="contentHeight"
                    width="100%"
                >
                    <zaehldaten-listenausgabe
                        :listenausgabe-data="listenausgabeData"
                        :height="contentHeight"
                    >
                    </zaehldaten-listenausgabe>
                </v-sheet>
                <loader :value="chartDataLoading"></loader>
            </v-tab-item>
            <v-tab-item>
                <v-sheet
                    :max-height="contentHeight"
                    width="100%"
                    class="overflow-y-auto"
                >
                    <heatmap-card
                        ref="heatmapCard"
                        :zaehldaten-heatmap="zaehldatenHeatmapData"
                    ></heatmap-card>
                </v-sheet>
                <loader :value="chartDataLoading"></loader>
            </v-tab-item>
            <v-tab-item>
                <v-sheet
                    :max-height="contentHeight"
                    width="100%"
                    class="overflow-y-auto"
                >
                    <zeitreihe-card
                        ref="zeitreiheCard"
                        :zaehldaten-zeitreihe="zaehldatenZeitreihe"
                    >
                    </zeitreihe-card>
                </v-sheet>
                <loader :value="zeitreiheLoading"></loader>
            </v-tab-item>
        </v-tabs-items>

        <!-- Speed Dial Listenausgabe -->
        <v-speed-dial
            v-if="isTabListenausgabe"
            v-model="fab"
            absolute
            bottom
            right
            open-on-hover
        >
            <template #activator>
                <v-btn
                    v-show="isFabShown"
                    v-model="fab"
                    dark
                    fab
                    :color="fabColor"
                    :loading="loadingFile"
                >
                    <v-icon v-if="fab"> mdi-close-thick </v-icon>
                    <v-icon v-else> mdi-file </v-icon>
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
                        <v-icon>mdi-file-pdf-box</v-icon>
                    </v-btn>
                </template>
                <span>PDF</span>
            </v-tooltip>
            <v-tooltip left>
                <template #activator="{ on, attrs }">
                    <v-btn
                        fab
                        dark
                        small
                        color="secondary"
                        v-bind="attrs"
                        @click="generateCsv"
                        v-on="on"
                    >
                        <v-icon>mdi-file-delimited</v-icon>
                    </v-btn>
                </template>
                <span>CSV</span>
            </v-tooltip>
            <v-tooltip left>
                <template #activator="{ on, attrs }">
                    <v-btn
                        fab
                        dark
                        small
                        color="secondary"
                        v-bind="attrs"
                        @click="openPdfReportDialog"
                        v-on="on"
                    >
                        <v-icon>mdi-file-chart</v-icon>
                    </v-btn>
                </template>
                <span>PDF Report Menü öffnen</span>
            </v-tooltip>
            <v-tooltip left>
                <template #activator="{ on, attrs }">
                    <v-btn
                        fab
                        dark
                        small
                        color="secondary"
                        v-bind="attrs"
                        @click="addChartToPdfReport"
                        v-on="on"
                    >
                        <v-icon>mdi-chart-box-plus-outline</v-icon>
                    </v-btn>
                </template>
                <span>Tabelle dem PDF Report hinzufügen</span>
            </v-tooltip>
        </v-speed-dial>

        <!-- Speed Dial alles außer Listenausgabe-->
        <v-speed-dial
            v-else
            v-model="fab"
            absolute
            bottom
            right
            open-on-hover
        >
            <template #activator>
                <v-btn
                    v-show="isFabShown"
                    v-model="fab"
                    dark
                    fab
                    :color="fabColor"
                    :loading="loadingFile"
                >
                    <v-icon v-if="fab"> mdi-close-thick </v-icon>
                    <v-icon v-else> mdi-file </v-icon>
                </v-btn>
            </template>
            <v-tooltip
                v-if="!isTabHeatmap"
                left
            >
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
                        <v-icon>mdi-file-pdf-box</v-icon>
                    </v-btn>
                </template>
                <span>Chart als PDF drucken</span>
            </v-tooltip>
            <v-tooltip left>
                <template #activator="{ on, attrs }">
                    <v-btn
                        fab
                        dark
                        small
                        color="secondary"
                        v-bind="attrs"
                        @click="openPdfReportDialog"
                        v-on="on"
                    >
                        <v-icon>mdi-file-chart</v-icon>
                    </v-btn>
                </template>
                <span>PDF Report Menü öffnen</span>
            </v-tooltip>
            <v-tooltip left>
                <template #activator="{ on, attrs }">
                    <v-btn
                        fab
                        dark
                        small
                        color="secondary"
                        v-bind="attrs"
                        @click="addChartToPdfReport"
                        v-on="on"
                    >
                        <v-icon>mdi-chart-box-plus-outline</v-icon>
                    </v-btn>
                </template>
                <span>Diagramm dem PDF Report hinzufügen</span>
            </v-tooltip>

            <v-tooltip left>
                <template #activator="{ on, attrs }">
                    <v-btn
                        fab
                        dark
                        small
                        color="secondary"
                        v-bind="attrs"
                        @click="saveGraphAsImage"
                        v-on="on"
                    >
                        <v-icon>mdi-download</v-icon>
                    </v-btn>
                </template>
                <span>Graph herunterladen</span>
            </v-tooltip>
        </v-speed-dial>
        <pdf-report-menue v-model="pdfReportDialog"> </pdf-report-menue>
    </v-sheet>
</template>
<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from "vue-property-decorator";

// Komponenenten
import BelastungsplanCard from "@/components/zaehlstelle/charts/BelastungsplanCard.vue";
import ZaehldatenListenausgabe from "@/components/zaehlstelle/charts/ZaehldatenListenausgabe.vue";
import StepLineCard from "@/components/zaehlstelle/charts/StepLineCard.vue";
import HeatmapCard from "@/components/zaehlstelle/charts/HeatmapCard.vue";
import ZeitreiheCard from "@/components/zaehlstelle/charts/ZeitreiheCard.vue";
import BelastungsplanKreuzungSvg from "@/components/zaehlstelle/charts/BelastungsplanKreuzungSvg.vue";
import BelastungsplanKreuzungSvgSchematischeUebersicht from "@/components/zaehlstelle/charts/BelastungsplanKreuzungSvgSchematischeUebersicht.vue";
import Loader from "@/components/common/Loader.vue";
import PdfReportMenue from "@/components/zaehlstelle/PdfReportMenue.vue";

// Typen
/* eslint-disable no-unused-vars */
import LadeZaehldatumDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatumDTO";
import LadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanDTO";
import LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import LadeProcessedZaehldatenDTO from "@/types/zaehlung/zaehldaten/LadeProcessedZaehldatenDTO";
import LadeZaehldatenSteplineDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenSteplineDTO";
import LadeZaehldatenHeatmapDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenHeatmapDTO";
import OptionsDTO from "@/types/zaehlung/OptionsDTO";
import ZaehlstelleHeaderDTO from "@/types/zaehlstelle/ZaehlstelleHeaderDTO";
import CsvDTO from "@/types/CsvDTO";
import LadeZaehldatenZeitreiheDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenZeitreiheDTO";
import { StartEndeUhrzeitIntervalls } from "@/store/modules/zaehlung";
/* eslint-enable no-unused-vars */
// API Services
import LadeZaehldatenService from "@/api/service/LadeZaehldatenService";
import GeneratePdfService from "@/api/service/GeneratePdfService";

// Util
import DaveUtils from "@/util/DaveUtils";
import GenerateCsvService from "@/api/service/GenerateCsvService";
import ImageAsset from "@/types/pdfreport/assets/ImageAsset";
import DatatableAsset from "@/types/pdfreport/assets/DatatableAsset";
import _ from "lodash";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import { Levels } from "@/api/error";
import HeadingAsset from "@/types/pdfreport/assets/HeadingAsset";
import AssetTypesEnum from "@/types/pdfreport/assets/AssetTypesEnum";
import ZaehlstelleHistoryItem from "@/types/app/ZaehlstelleHistoryItem";

// Refactoring: Synergieeffekt mit MessstelleDiagramme nutzen
@Component({
    components: {
        BelastungsplanCard,
        ZaehldatenListenausgabe,
        StepLineCard,
        HeatmapCard,
        ZeitreiheCard,
        BelastungsplanKreuzungSvg,
        BelastungsplanKreuzungSvgSchematischeUebersicht,
        Loader,
        PdfReportMenue,
    },
})
export default class ZaehldatenDiagramme extends Vue {
    @Prop({ default: "100%" }) height?: string;
    @Prop() contentHeight?: string;
    @Prop({ default: true }) hasZaehlungen!: boolean;

    belastungsplanLoading = false;
    chartDataLoading = false;

    // Dialog zum PDF Report
    pdfReportDialog = false;

    // Belastungsplan Kreuzung
    private belastungsplanDTO: LadeBelastungsplanDTO =
        {} as LadeBelastungsplanDTO;
    private belastungsplanLoaded = false;
    private belastungsplanSvg: Blob | null = null;
    private belastungsplanPngBase64 = "";
    private belastungsplanSchematischeUebersichtSvg: Blob | null = null;
    private belastungsplanSchematischeUebersichtPngBase64 = "";

    // Stepline
    private zaehldatenSteplineDTO: LadeZaehldatenSteplineDTO =
        {} as LadeZaehldatenSteplineDTO;

    // Listenausgabe
    private listenausgabeDTO: Array<LadeZaehldatumDTO> = [];

    // Heatmap
    private zaehldatenHeatmap: LadeZaehldatenHeatmapDTO =
        {} as LadeZaehldatenHeatmapDTO;

    // Zeitreihe
    zaehldatenZeitreihe: LadeZaehldatenZeitreiheDTO =
        {} as LadeZaehldatenZeitreiheDTO;
    zeitreiheLoading = false;

    // Fab
    fab = false;
    isFabShown = true;
    isTabListenausgabe = false;
    isTabHeatmap = false;

    activeTab = 0;

    private static readonly TAB_BELASTUNGSPLAN: number = 0;
    private static readonly TAB_GANGLINIE: number = 1;
    private static readonly TAB_LISTENAUSGABE: number = 2;
    private static readonly TAB_HEATMAP: number = 3;
    private static readonly TAB_ZEITREIHE: number = 4;
    private static readonly BELASTUNGSPLAN_PNG_DIMENSION: number = 1400;
    private static readonly BELASTUNGSPLAN_SCHEMATISCHE_UEBERSICHT_PNG_DIMENSION: number = 1400;
    private static readonly REQUEST_PART_CHART_AS_BASE64_PNG: string =
        "chartAsBase64Png";
    private static readonly REQUEST_PART_SCHEMATISCHE_UEBERSICHT_AS_BASE64_PNG: string =
        "schematischeUebersichtAsBase64Png";

    loadingFile = false;

    @Ref("belastungsplanCard") readonly belastungsplanCard!: BelastungsplanCard;
    @Ref("steplineCard") readonly steplineCard!: StepLineCard;
    @Ref("heatmapCard") readonly heatmapCard!: HeatmapCard;
    @Ref("zeitreiheCard") readonly zeitreiheCard!: ZeitreiheCard;

    @Watch("options")
    optionsChanged(): void {
        this.loadData();
    }

    @Watch("activeTab")
    changePdfFabVisibility(active: number): void {
        this.$store.commit("changetabevent", active);
        this.isTabListenausgabe = [
            ZaehldatenDiagramme.TAB_LISTENAUSGABE,
        ].includes(this.activeTab);
        this.isTabHeatmap = [ZaehldatenDiagramme.TAB_HEATMAP].includes(
            this.activeTab
        );
        if (
            [
                ZaehldatenDiagramme.TAB_BELASTUNGSPLAN,
                ZaehldatenDiagramme.TAB_GANGLINIE,
                ZaehldatenDiagramme.TAB_LISTENAUSGABE,
                ZaehldatenDiagramme.TAB_HEATMAP,
                ZaehldatenDiagramme.TAB_ZEITREIHE,
            ].includes(this.activeTab)
        ) {
            this.isFabShown = true;
        } else {
            this.isFabShown = false;
        }
    }

    @Watch("belastungsplanSvg")
    storeBelastungsplanSvgAsPng(): void {
        if (this.belastungsplanSvg != null) {
            const image = new Image();
            image.onload = () => {
                const canvas = document.createElement("canvas");
                const dimension =
                    ZaehldatenDiagramme.BELASTUNGSPLAN_PNG_DIMENSION;
                canvas.width = dimension;
                canvas.height = dimension;
                const context = canvas.getContext("2d");
                if (context) {
                    context.drawImage(image, 0, 0, dimension, dimension);
                    // Image Asset erstellen und in Variable speichern
                    const base64 = canvas.toDataURL("image/jpg");
                    this.belastungsplanPngBase64 = base64;
                }
            };
            image.src = URL.createObjectURL(this.belastungsplanSvg);
        }
    }

    @Watch("belastungsplanSchematischeUebersichtSvg")
    storeBelastungsplanSchematischeUebersichtSvgAsPng(): void {
        if (this.belastungsplanSchematischeUebersichtSvg != null) {
            const image = new Image();
            image.onload = () => {
                const canvas = document.createElement("canvas");
                const dimension =
                    ZaehldatenDiagramme.BELASTUNGSPLAN_SCHEMATISCHE_UEBERSICHT_PNG_DIMENSION;
                canvas.width = dimension;
                canvas.height = dimension;
                const context = canvas.getContext("2d");
                if (context) {
                    context.drawImage(image, 0, 0, dimension, dimension);
                    // Image Asset erstellen und in Variable speichern
                    const base64 = canvas.toDataURL("image/jpg");
                    this.belastungsplanSchematischeUebersichtPngBase64 = base64;
                }
            };
            image.src = URL.createObjectURL(
                this.belastungsplanSchematischeUebersichtSvg
            );
        }
    }

    openPdfReportDialog(): void {
        this.pdfReportDialog = true;
    }

    get fabColor(): string {
        return this.fab ? "grey darken-1" : "secondary";
    }

    // Die Option werden aus dem Store geladen
    get options(): OptionsDTO {
        return this.$store.getters.getFilteroptions;
    }

    // Die Zählungsid wird aus dem Store geladen
    get zaehlungsId(): string {
        return this.$store.getters.getZaehlungsId;
    }

    // Die Zählung an sich wird aus dem Store geladen
    get selectedZaehlung(): LadeZaehlungDTO {
        return this.$store.getters.getAktiveZaehlung;
    }

    /**
     * Die Requests für alle Diagramme werden abgesetzt.
     */
    loadData() {
        const o = Object.assign({}, this.options) as OptionsDTO;
        o.zaehldauer = this.zaehlung.zaehldauer;
        // requests abschicken
        this.loadBelastungsplan(o);
        this.loadProcessedChartData(o);
        this.loadZeitreihe(o);

        // Save HistoryItem
        const selectedZaehlung = this.selectedZaehlung;
        const zaehlstelle = this.$store.getters.getZaehlstelle;
        this.$store.commit(
            "history/addHistoryItem",
            new ZaehlstelleHistoryItem(
                selectedZaehlung.id,
                selectedZaehlung.datum,
                selectedZaehlung.projektName,
                zaehlstelle.nummer,
                zaehlstelle.id,
                Object.assign({}, this.options)
            )
        );
    }

    private loadZeitreihe(options: OptionsDTO) {
        this.zeitreiheLoading = true;
        let zaehlstelle: ZaehlstelleHeaderDTO =
            this.$store.getters.getZaehlstelle;
        LadeZaehldatenService.ladeZeitreihe(
            zaehlstelle.id,
            this.zaehlung.id,
            options
        )
            .then((dto: LadeZaehldatenZeitreiheDTO) => {
                this.zaehldatenZeitreihe = dto;
            })
            .finally(() => {
                this.zeitreiheLoading = false;
            });
    }

    private loadBelastungsplan(options: OptionsDTO) {
        this.belastungsplanLoading = true;
        LadeZaehldatenService.ladeBelastungsplan(this.zaehlung.id, options)
            .then((dto: LadeBelastungsplanDTO) => {
                this.belastungsplanDTO = dto;
                this.belastungsplanLoaded = true;
            })
            .finally(() => {
                this.belastungsplanLoading = false;
            });
    }

    private loadProcessedChartData(options: OptionsDTO) {
        this.resetStartEndeUhrzeitIntervallsInStore();
        this.chartDataLoading = true;
        LadeZaehldatenService.ladeZaehldatenProcessed(this.zaehlung.id, options)
            .then((processedZaehldaten: LadeProcessedZaehldatenDTO) => {
                this.listenausgabeDTO =
                    processedZaehldaten.zaehldatenTable.zaehldaten;
                this.zaehldatenSteplineDTO =
                    processedZaehldaten.zaehldatenStepline;
                this.zaehldatenHeatmap = processedZaehldaten.zaehldatenHeatmap;
                this.setMaxRangeYAchse();
            })
            .finally(() => {
                this.chartDataLoading = false;
                this.storeStartAndEndeUhrzeitOfIntervalls(
                    this.listenausgabeData
                );
            });
    }

    private setMaxRangeYAchse() {
        let ganglinieYAchse1MaxValue: number | null =
            this.options.ganglinieYAchse1MaxValue;
        if (
            ganglinieYAchse1MaxValue !== undefined &&
            ganglinieYAchse1MaxValue !== null &&
            ganglinieYAchse1MaxValue > 0
        ) {
            this.zaehldatenSteplineDTO.rangeMax = ganglinieYAchse1MaxValue;
        }

        let ganglinieYAchse2MaxValue: number | null =
            this.options.ganglinieYAchse2MaxValue;
        if (
            ganglinieYAchse2MaxValue !== undefined &&
            ganglinieYAchse2MaxValue !== null &&
            ganglinieYAchse2MaxValue > 0
        ) {
            this.zaehldatenSteplineDTO.rangeMaxPercent =
                ganglinieYAchse2MaxValue;
        }
    }

    /**
     * Bekommt das aktuelle Belastungsplan Diagramm als SVG. Dieses wird dann
     * in eine Variable gespeichert und kann jederzeit gedruckt werden.
     *
     * @param svg
     */
    storeSvg(svg: Blob) {
        this.belastungsplanSvg = svg;
    }

    storeSvgSchematischeUebersicht(svg: Blob) {
        this.belastungsplanSchematischeUebersichtSvg = svg;
    }

    /**
     * Fügt dem PDF Report das aktuell angezeigte Chart hinzu.
     */
    addChartToPdfReport(): void {
        let type = "";
        // Belastungsplan
        if (this.activeTab === ZaehldatenDiagramme.TAB_BELASTUNGSPLAN) {
            type = "Der Belastungsplan";
            if (this.belastungsplanDTO.kreisverkehr) {
                // Kreisverkehr
                this.addImageToReport(
                    this.getKreisverkehrBase64(),
                    this.createCaption("Belastungsplan"),
                    false
                );
            } else {
                // Kreuzung
                this.addImageToReport(
                    this.belastungsplanPngBase64,
                    this.createCaption("Belastungsplan"),
                    false
                );
            }
        }
        // Ganglinie
        if (this.activeTab === ZaehldatenDiagramme.TAB_GANGLINIE) {
            type = "Die Ganglinie";

            this.addImageToReport(
                this.getGanglinieBase64(),
                this.createCaption("Ganglinie"),
                true
            );
        }
        // Heatmap
        if (this.activeTab === ZaehldatenDiagramme.TAB_HEATMAP) {
            type = "Die Heatmap";
            this.addImageToReport(
                this.getHeatmapBase64(),
                this.createCaption("Heatmap"),
                true
            );
        }
        // Zeitreihe
        if (this.activeTab === ZaehldatenDiagramme.TAB_ZEITREIHE) {
            type = "Die Zeitreihe";
            this.addImageToReport(
                this.getZeitreiheBase64(),
                this.createCaption("Zeitreihe"),
                true
            );
        }
        // Listenausgabe
        if (this.activeTab === ZaehldatenDiagramme.TAB_LISTENAUSGABE) {
            type = "Die Datentabelle";
            this.addHeadingToReport();
            const datatableAsset: DatatableAsset = new DatatableAsset(
                Object.assign({}, this.options),
                this.zaehlungsId,
                this.createCaption("Datentabelle")
            );
            this.$store.dispatch("addAsset", datatableAsset);
        }
        this.$store.dispatch("snackbar/showToast", {
            snackbarTextPart1: `${type} wurde dem PDF Report hinzugefügt.`,
            level: Levels.SUCCESS,
        });
    }

    createCaption(diagram: string): string {
        const zdate = this.$d(
            Date.parse(this.selectedZaehlung.datum),
            "short",
            "de-DE"
        );
        return `${diagram} zur Zählung vom ${zdate} für Zählstelle ${this.zaehlstelle.nummer}`;
    }

    /**
     * Base 64 String des Kreisverkehrs
     */
    private getKreisverkehrBase64(): string {
        return this.belastungsplanCard.belastungsplanKreisverkehr.chart.getDataURL(
            {
                pixelRatio: 2,
                backgroundColor: "#fff",
                excludeComponents: ["toolbox"],
            }
        );
    }

    /**
     * Base 64 String der Ganglinie
     */
    private getGanglinieBase64(): string {
        return this.steplineCard.steplineForPdf.chart.getDataURL({
            pixelRatio: 2,
            backgroundColor: "#fff",
            excludeComponents: ["toolbox"],
        });
    }

    /**
     * Base64 String der Heatmap
     */
    private getHeatmapBase64(): string {
        return this.heatmapCard.heatmapChart.chart.getDataURL({
            pixelRatio: 2,
            backgroundColor: "#fff",
            excludeComponents: ["toolbox"],
        });
    }

    /**
     * Base64 String der Zeitreihe
     */
    private getZeitreiheBase64(): string {
        return this.zeitreiheCard.zeitreiheForPdf.chart.getDataURL({
            pixelRatio: 2,
            backgroundColor: "#fff",
            excludeComponents: ["toolbox"],
        });
    }

    /**
     * Sendet die übergebenen Bildaten und Bildunterschrift als "ImageAsset" an den Vuex Store.
     *
     * @param base64
     * @param name
     */
    addImageToReport(base64: string, name: string, heading: boolean): void {
        if (heading) {
            this.addHeadingToReport();
        }
        const imageAsset = new ImageAsset(name, base64);
        imageAsset.width = 100;
        this.$store.dispatch("addAsset", imageAsset);
    }

    addHeadingToReport(): void {
        // Calculate Heading
        let chartTitle = "";
        if (this.options.vonKnotenarm !== null) {
            this.zaehlung.knotenarme.forEach((knotenarm) => {
                if (knotenarm.nummer === this.options.vonKnotenarm) {
                    if (!this.zaehlung.kreisverkehr) {
                        chartTitle = "von ";
                    }
                    chartTitle = `${chartTitle} ${knotenarm.strassenname} (${knotenarm.nummer}) `;
                }
            });
        }

        if (this.options.nachKnotenarm !== null) {
            this.zaehlung.knotenarme.forEach((knotenarm) => {
                if (knotenarm.nummer === this.options.nachKnotenarm) {
                    chartTitle = `${chartTitle} nach ${knotenarm.strassenname} (${knotenarm.nummer})`;
                }
            });
        }

        if (chartTitle !== "") {
            const headingAsset = new HeadingAsset(
                chartTitle,
                AssetTypesEnum.HEADING5
            );
            this.$store.dispatch("addAsset", headingAsset);
        }
    }

    // PDF
    generatePdf() {
        let formData = new FormData();
        this.loadingFile = true;

        const o = Object.assign({}, this.options) as OptionsDTO;
        o.zaehldauer = this.zaehlung.zaehldauer;

        formData.append(
            "options",
            new Blob([JSON.stringify(o)], {
                type: "application/json",
            })
        );

        // Belastungsplan
        if (this.activeTab === ZaehldatenDiagramme.TAB_BELASTUNGSPLAN) {
            // Kreisverkehr
            if (this.belastungsplanDTO.kreisverkehr) {
                formData.append(
                    ZaehldatenDiagramme.REQUEST_PART_CHART_AS_BASE64_PNG,
                    new Blob([this.getKreisverkehrBase64()], {
                        type: "image/png",
                    })
                );
            } else {
                // Kreuzung
                formData.append(
                    ZaehldatenDiagramme.REQUEST_PART_CHART_AS_BASE64_PNG,
                    this.belastungsplanPngBase64
                );
            }
            this.fetchPdf(formData, "belastungsplan");

            // Ganglinie
        } else if (this.activeTab === ZaehldatenDiagramme.TAB_GANGLINIE) {
            formData.append(
                ZaehldatenDiagramme.REQUEST_PART_CHART_AS_BASE64_PNG,
                new Blob([this.getGanglinieBase64()], {
                    type: "image/png",
                })
            );
            formData.append(
                ZaehldatenDiagramme.REQUEST_PART_SCHEMATISCHE_UEBERSICHT_AS_BASE64_PNG,
                this.belastungsplanSchematischeUebersichtPngBase64
            );
            this.fetchPdf(formData, "ganglinie");
            // Listenausgabe
        } else if (this.activeTab === ZaehldatenDiagramme.TAB_LISTENAUSGABE) {
            formData.append(
                ZaehldatenDiagramme.REQUEST_PART_SCHEMATISCHE_UEBERSICHT_AS_BASE64_PNG,
                this.belastungsplanSchematischeUebersichtPngBase64
            );
            this.fetchPdf(formData, "datentabelle");
            // Zeitreihe
        } else if (this.activeTab === ZaehldatenDiagramme.TAB_ZEITREIHE) {
            formData.append(
                ZaehldatenDiagramme.REQUEST_PART_CHART_AS_BASE64_PNG,
                new Blob([this.getZeitreiheBase64()], {
                    type: "image/png",
                })
            );
            formData.append(
                ZaehldatenDiagramme.REQUEST_PART_SCHEMATISCHE_UEBERSICHT_AS_BASE64_PNG,
                this.belastungsplanSchematischeUebersichtPngBase64
            );
            this.fetchPdf(formData, "zeitreihe");
        } else {
            this.loadingFile = false;
        }
    }

    private fetchPdf(formData: any, type: string) {
        formData.append(
            "department",
            this.$store.getters["user/getDepartment"]
        );
        GeneratePdfService.postPdfCustomFetchTemplate(
            type,
            this.zaehlung.id,
            formData
        )
            .then((res) => {
                res.blob().then((blob) => {
                    // Erster Buchstabe soll im Dateinamen groß geschrieben sein, also z. B. Ganglinie statt ganglinie.
                    let typeForFilename: string =
                        type.charAt(0).toUpperCase() + type.slice(1);

                    // Beispiel: 251101K_15-11-2020_Belastungsplan.pdf
                    let filename = `${this.getFileName()}_${typeForFilename}.pdf`;
                    DaveUtils.downloadFile(blob, filename);
                });
            })
            .catch((error) => this.$store.dispatch("snackbar/showError", error))
            .finally(() => (this.loadingFile = false));
    }

    generateCsv() {
        this.loadingFile = true;
        const optionsDTO = Object.assign({}, this.options) as OptionsDTO;
        optionsDTO.zaehldauer = this.zaehlung.zaehldauer;

        GenerateCsvService.generateCsv(this.zaehlung.id, optionsDTO)
            .then((result: CsvDTO) => {
                // Beispiel: 251101K_15-11-2020_Listenausgabe.csv
                let filename = `${this.getFileName()}_Listenausgabe.csv`;

                let csvContent =
                    "data:text/csv;charset=utf-8," + result.csvAsString;

                let encodedUri = encodeURI(csvContent);
                let link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", filename);
                document.body.appendChild(link); // Required for FF

                link.click();
            })
            .catch((error: any) => {
                this.$store.dispatch("snackbar/showError", error);
            })
            .finally(() => (this.loadingFile = false));
    }

    private getFileName(): string {
        let zaehlstelle: ZaehlstelleHeaderDTO =
            this.$store.getters.getZaehlstelle;

        let dateForFilename: string = new Date(this.zaehlung.datum)
            .toISOString()
            .split("T")[0];

        // Beispiel: 251101K_15-11-2020
        return `${zaehlstelle.nummer}${this.zaehlung.zaehlart}_${dateForFilename}`;
    }

    /**
     * Diese Methode speichert die Start- und Enduhrzeit des ersten und letzten Zeitintervalls
     * der im Parameter gegebenen Zähldaten im Store.
     *
     * @param listenausgabeData
     */
    private storeStartAndEndeUhrzeitOfIntervalls(
        listenausgabeData: Array<LadeZaehldatumDTO>
    ): void {
        const intervalls: Array<LadeZaehldatumDTO> = listenausgabeData.filter(
            (zaehldatum) => {
                return _.isEmpty(zaehldatum.type);
            }
        );
        const firstIntervall: LadeZaehldatumDTO | undefined =
            _.first(intervalls);
        const lastIntervall: LadeZaehldatumDTO | undefined = _.last(intervalls);
        if (!_.isEmpty(firstIntervall) && !_.isEmpty(lastIntervall)) {
            const startEndeUhrzeitIntervalls: StartEndeUhrzeitIntervalls = {
                startUhrzeitIntervalls: firstIntervall?.startUhrzeit,
                endeUhrzeitIntervalls: lastIntervall?.endeUhrzeit,
            } as StartEndeUhrzeitIntervalls;
            this.$store.commit(
                "setStartEndeUhrzeitIntervalls",
                startEndeUhrzeitIntervalls
            );
        }
    }

    /**
     * Zurücksetzen der Start- und Endeuhrzeit des ersten und letzten Zeitintervalls.
     */
    private resetStartEndeUhrzeitIntervallsInStore() {
        this.$store.commit(
            "setStartEndeUhrzeitIntervalls",
            DefaultObjectCreator.createDefaultStartEndeUhrzeitIntervalls()
        );
    }

    // Computed Properties
    get belastungsplanData() {
        return this.belastungsplanDTO;
    }

    get belastungsplanDataLoaded() {
        return this.belastungsplanLoaded;
    }

    get zaehldatenStepline() {
        return this.zaehldatenSteplineDTO;
    }

    get listenausgabeData() {
        return this.listenausgabeDTO;
    }

    get zaehldatenHeatmapData() {
        return this.zaehldatenHeatmap;
    }

    get zaehlung() {
        return this.selectedZaehlung;
    }

    get zaehlstelle(): ZaehlstelleHeaderDTO {
        return this.$store.getters.getZaehlstelle;
    }

    /**
     * Speichert das aktuell offene Diagramm als Png bzw SVG (Kreuzung-Belastungsplan)
     */
    saveGraphAsImage(): void {
        this.loadingFile = true;

        let filename: string = this.getFileName();
        let encodedUri = "";
        // Belastungsplan
        if (this.activeTab === ZaehldatenDiagramme.TAB_BELASTUNGSPLAN) {
            filename += "_Belastungsplan";
            // Kreisverkehr
            if (this.belastungsplanDTO.kreisverkehr) {
                encodedUri = this.getKreisverkehrBase64();
            } else {
                // Kreuzung
                if (this.belastungsplanSvg != null)
                    encodedUri = URL.createObjectURL(this.belastungsplanSvg);
            }
            // Ganglinie
        } else if (this.activeTab === ZaehldatenDiagramme.TAB_GANGLINIE) {
            filename += "_Ganglinie";
            encodedUri = this.getGanglinieBase64();
            // Listenausgabe
        } else if (this.activeTab === ZaehldatenDiagramme.TAB_HEATMAP) {
            filename += "_Heatmap";
            encodedUri = this.getHeatmapBase64();
            // Zeitreihe
        } else if (this.activeTab === ZaehldatenDiagramme.TAB_ZEITREIHE) {
            filename += "_Zeitreihe";
            encodedUri = this.getZeitreiheBase64();
        }

        if (encodedUri !== "") {
            let link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", filename);
            document.body.appendChild(link); // Required for FF

            link.click();
        }

        this.loadingFile = false;
    }
}
</script>
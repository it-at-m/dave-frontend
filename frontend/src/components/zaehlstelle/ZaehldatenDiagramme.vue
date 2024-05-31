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
                :data="belastungsplanDTO"
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
                        v-show="!belastungsplanDTO.kreisverkehr"
                        :dimension="contentHeight"
                        :data="belastungsplanDTO"
                        :doc-mode="false"
                        :geometrie-mode="true"
                        @print="storeSvg($event)"
                    ></belastungsplan-kreuzung-svg>

                    <belastungsplan-card
                        v-show="belastungsplanDTO.kreisverkehr"
                        ref="belastungsplanCard"
                        :dimension="contentHeight"
                        :belastungsplan-data="belastungsplanDTO"
                        :loaded="false"
                        :zaehlung-id="zaehlungsId"
                    ></belastungsplan-card>
                </v-sheet>
                <progress-loader :value="belastungsplanLoading" />
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
                        :zaehldaten-stepline="zaehldatenSteplineDTO"
                    ></step-line-card>
                </v-sheet>
                <progress-loader :value="chartDataLoading" />
            </v-tab-item>
            <v-tab-item>
                <v-sheet
                    :max-height="contentHeight"
                    width="100%"
                >
                    <zaehldaten-listenausgabe
                        :listenausgabe-data="listenausgabeDTO"
                        :height="contentHeight"
                    >
                    </zaehldaten-listenausgabe>
                </v-sheet>
                <progress-loader :value="chartDataLoading" />
            </v-tab-item>
            <v-tab-item>
                <v-sheet
                    :max-height="contentHeight"
                    width="100%"
                    class="overflow-y-auto"
                >
                    <heatmap-card
                        ref="heatmapCard"
                        :zaehldaten-heatmap="zaehldatenHeatmap"
                    ></heatmap-card>
                </v-sheet>
                <progress-loader :value="chartDataLoading" />
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
                <progress-loader :value="zeitreiheLoading" />
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
<script setup lang="ts">
import { computed, ComputedRef, ref, Ref, watch } from "vue";

// Komponenenten
import BelastungsplanCard from "@/components/zaehlstelle/charts/BelastungsplanCard.vue";
import ZaehldatenListenausgabe from "@/components/zaehlstelle/charts/ZaehldatenListenausgabe.vue";
import StepLineCard from "@/components/zaehlstelle/charts/StepLineCard.vue";
import HeatmapCard from "@/components/zaehlstelle/charts/HeatmapCard.vue";
import ZeitreiheCard from "@/components/zaehlstelle/charts/ZeitreiheCard.vue";
import BelastungsplanKreuzungSvg from "@/components/zaehlstelle/charts/BelastungsplanKreuzungSvg.vue";
import BelastungsplanKreuzungSvgSchematischeUebersicht from "@/components/zaehlstelle/charts/BelastungsplanKreuzungSvgSchematischeUebersicht.vue";
import PdfReportMenue from "@/components/zaehlstelle/PdfReportMenue.vue";
// Typen
import LadeZaehldatumDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatumDTO";
import LadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanDTO";
import LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import LadeProcessedZaehldatenDTO from "@/types/zaehlung/zaehldaten/LadeProcessedZaehldatenDTO";
import LadeZaehldatenSteplineDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenSteplineDTO";
import LadeZaehldatenHeatmapDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenHeatmapDTO";
import OptionsDTO from "@/types/zaehlung/OptionsDTO";
import ZaehlstelleHeaderDTO from "@/types/zaehlstelle/ZaehlstelleHeaderDTO";
import CsvDTO from "@/types/common/CsvDTO";
import LadeZaehldatenZeitreiheDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenZeitreiheDTO";
import { StartEndeUhrzeitIntervalls } from "@/store/modules/zaehlung";
// API Services
import LadeZaehldatenService from "@/api/service/LadeZaehldatenService";
import GeneratePdfService from "@/api/service/GeneratePdfService";
// Util
import GenerateCsvService from "@/api/service/GenerateCsvService";
import _ from "lodash";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import ZaehlstelleHistoryItem from "@/types/history/ZaehlstelleHistoryItem";
import { useStore } from "@/util/useStore";
import { useReportTools } from "@/util/reportTools";
import Erhebungsstelle from "@/types/enum/Erhebungsstelle";
import ProgressLoader from "@/components/common/ProgressLoader.vue";
import { useDaveUtils } from "@/util/DaveUtils";
import { useHistoryStore } from "@/store/modules/history";
import { useZaehlstelleStore } from "@/store/modules/zaehlstelle";
import { useSnackbarStore } from "@/store/modules/snackbar";
import { useUserStore } from "@/store/modules/user";

// Refactoring: Synergieeffekt mit MessstelleDiagramme nutzen
interface Props {
    height?: string;
    contentHeight?: string;
    hasZaehlungen?: boolean;
}

withDefaults(defineProps<Props>(), {
    height: "100%",
    hasZaehlungen: true,
});

const TAB_BELASTUNGSPLAN = 0;
const TAB_GANGLINIE = 1;
const TAB_LISTENAUSGABE = 2;
const TAB_HEATMAP = 3;
const TAB_ZEITREIHE = 4;
const BELASTUNGSPLAN_PNG_DIMENSION = 1400;
const BELASTUNGSPLAN_SCHEMATISCHE_UEBERSICHT_PNG_DIMENSION = 1400;
const REQUEST_PART_CHART_AS_BASE64_PNG = "chartAsBase64Png";
const REQUEST_PART_SCHEMATISCHE_UEBERSICHT_AS_BASE64_PNG =
    "schematischeUebersichtAsBase64Png";

const belastungsplanLoading: Ref<boolean> = ref(false);
const chartDataLoading: Ref<boolean> = ref(false);
const pdfReportDialog: Ref<boolean> = ref(false);

// Belastungsplan Kreuzung
const belastungsplanDTO: Ref<LadeBelastungsplanDTO> = ref(
    {} as LadeBelastungsplanDTO
);
const belastungsplanLoaded: Ref<boolean> = ref(false);
const belastungsplanSvg = ref<Blob>();
const belastungsplanPngBase64 = ref("");
const belastungsplanSchematischeUebersichtSvg = ref<Blob>();
const belastungsplanSchematischeUebersichtPngBase64 = ref("");

const zaehldatenSteplineDTO: Ref<LadeZaehldatenSteplineDTO> = ref(
    {} as LadeZaehldatenSteplineDTO
);
const listenausgabeDTO: Ref<Array<LadeZaehldatumDTO>> = ref([]);
const zaehldatenHeatmap: Ref<LadeZaehldatenHeatmapDTO> = ref(
    {} as LadeZaehldatenHeatmapDTO
);
const zaehldatenZeitreihe: Ref<LadeZaehldatenZeitreiheDTO> = ref(
    {} as LadeZaehldatenZeitreiheDTO
);
const zeitreiheLoading: Ref<boolean> = ref(false);

const fab: Ref<boolean> = ref(false);
const isFabShown: Ref<boolean> = ref(true);
const isTabListenausgabe: Ref<boolean> = ref(false);
const isTabHeatmap: Ref<boolean> = ref(false);

const activeTab: Ref<number> = ref(0);
const loadingFile: Ref<boolean> = ref(false);

const belastungsplanCard = ref<InstanceType<
    typeof BelastungsplanCard
> | null>();
const steplineCard = ref<InstanceType<typeof StepLineCard> | null>();
const heatmapCard = ref<InstanceType<typeof HeatmapCard> | null>();
const zeitreiheCard = ref<InstanceType<typeof ZeitreiheCard> | null>();

const store = useStore();
const snackbarStore = useSnackbarStore();
const userStore = useUserStore();
const zaehlstelleStore = useZaehlstelleStore();
const historyStore = useHistoryStore();
const reportTools = useReportTools();
const daveUtils = useDaveUtils();

const fabColor: ComputedRef<string> = computed(() => {
    return fab.value ? "grey darken-1" : "secondary";
});

const options: ComputedRef<OptionsDTO> = computed(() => {
    return store.getters.getFilteroptions;
});

const zaehlungsId: ComputedRef<string> = computed(() => {
    return store.getters.getZaehlungsId;
});
const selectedZaehlung: ComputedRef<LadeZaehlungDTO> = computed(() => {
    return store.getters.getAktiveZaehlung;
});

const zaehlstelle: ComputedRef<ZaehlstelleHeaderDTO> = computed(() => {
    return zaehlstelleStore.getZaehlstelleHeader;
});

watch(options, () => {
    loadData();
});

watch(activeTab, (active) => {
    zaehlstelleStore.setActiveTab(active);
    isTabListenausgabe.value = [TAB_LISTENAUSGABE].includes(activeTab.value);
    isTabHeatmap.value = [TAB_HEATMAP].includes(activeTab.value);
    isFabShown.value = [
        TAB_BELASTUNGSPLAN,
        TAB_GANGLINIE,
        TAB_LISTENAUSGABE,
        TAB_HEATMAP,
        TAB_ZEITREIHE,
    ].includes(activeTab.value);
});

watch(belastungsplanSvg, () => {
    if (belastungsplanSvg.value) {
        const image = new Image();
        image.onload = () => {
            const canvas = document.createElement("canvas");
            const dimension = BELASTUNGSPLAN_PNG_DIMENSION;
            canvas.width = dimension;
            canvas.height = dimension;
            const context = canvas.getContext("2d");
            if (context) {
                context.drawImage(image, 0, 0, dimension, dimension);
                // Image Asset erstellen und in Variable speichern
                belastungsplanPngBase64.value = canvas.toDataURL("image/jpg");
            }
        };
        image.src = URL.createObjectURL(belastungsplanSvg.value);
    }
});

watch(belastungsplanSchematischeUebersichtSvg, () => {
    if (belastungsplanSchematischeUebersichtSvg.value) {
        const image = new Image();
        image.onload = () => {
            const canvas = document.createElement("canvas");
            const dimension =
                BELASTUNGSPLAN_SCHEMATISCHE_UEBERSICHT_PNG_DIMENSION;
            canvas.width = dimension;
            canvas.height = dimension;
            const context = canvas.getContext("2d");
            if (context) {
                context.drawImage(image, 0, 0, dimension, dimension);
                // Image Asset erstellen und in Variable speichern
                belastungsplanSchematischeUebersichtPngBase64.value =
                    canvas.toDataURL("image/jpg");
            }
        };
        image.src = URL.createObjectURL(
            belastungsplanSchematischeUebersichtSvg.value
        );
    }
});

function loadData(): void {
    const o = Object.assign({}, options.value) as OptionsDTO;
    o.zaehldauer = selectedZaehlung.value.zaehldauer;
    // requests abschicken
    loadBelastungsplan(o);
    loadProcessedChartData(o);
    loadZeitreihe(o);

    // Save HistoryItem
    historyStore.addHistoryItem(
        new ZaehlstelleHistoryItem(
            selectedZaehlung.value.id,
            selectedZaehlung.value.datum,
            selectedZaehlung.value.projektName,
            zaehlstelle.value.nummer,
            zaehlstelle.value.id,
            Object.assign({}, options.value)
        )
    );
}

function loadZeitreihe(options: OptionsDTO): void {
    zeitreiheLoading.value = true;
    LadeZaehldatenService.ladeZeitreihe(
        zaehlstelle.value.id,
        selectedZaehlung.value.id,
        options
    )
        .then((dto: LadeZaehldatenZeitreiheDTO) => {
            zaehldatenZeitreihe.value = dto;
        })
        .finally(() => {
            zeitreiheLoading.value = false;
        });
}

function loadBelastungsplan(options: OptionsDTO) {
    belastungsplanLoading.value = true;
    LadeZaehldatenService.ladeBelastungsplan(selectedZaehlung.value.id, options)
        .then((dto: LadeBelastungsplanDTO) => {
            belastungsplanDTO.value = dto;
            belastungsplanLoaded.value = true;
        })
        .finally(() => {
            belastungsplanLoading.value = false;
        });
}

function loadProcessedChartData(options: OptionsDTO) {
    resetStartEndeUhrzeitIntervallsInStore();
    chartDataLoading.value = true;
    LadeZaehldatenService.ladeZaehldatenProcessed(
        selectedZaehlung.value.id,
        options
    )
        .then((processedZaehldaten: LadeProcessedZaehldatenDTO) => {
            listenausgabeDTO.value =
                processedZaehldaten.zaehldatenTable.zaehldaten;
            zaehldatenSteplineDTO.value =
                processedZaehldaten.zaehldatenStepline;
            zaehldatenHeatmap.value = processedZaehldaten.zaehldatenHeatmap;
            setMaxRangeYAchse();
        })
        .finally(() => {
            chartDataLoading.value = false;
            storeStartAndEndeUhrzeitOfIntervalls(listenausgabeDTO.value);
        });
}

function openPdfReportDialog(): void {
    pdfReportDialog.value = true;
}

/**
 * Bekommt das aktuelle Belastungsplan Diagramm als SVG. Dieses wird dann
 * in eine Variable gespeichert und kann jederzeit gedruckt werden.
 *
 * @param svg
 */
function storeSvg(svg: Blob) {
    belastungsplanSvg.value = svg;
}

function storeSvgSchematischeUebersicht(svg: Blob) {
    belastungsplanSchematischeUebersichtSvg.value = svg;
}

/**
 * Diese Methode speichert die Start- und Enduhrzeit des ersten und letzten Zeitintervalls
 * der im Parameter gegebenen Zähldaten im Store.
 *
 * @param listenausgabeData
 */
function storeStartAndEndeUhrzeitOfIntervalls(
    listenausgabeData: Array<LadeZaehldatumDTO>
): void {
    const intervalls: Array<LadeZaehldatumDTO> = listenausgabeData.filter(
        (zaehldatum) => {
            return _.isEmpty(zaehldatum.type);
        }
    );
    const firstIntervall: LadeZaehldatumDTO | undefined = _.first(intervalls);
    const lastIntervall: LadeZaehldatumDTO | undefined = _.last(intervalls);
    if (!_.isEmpty(firstIntervall) && !_.isEmpty(lastIntervall)) {
        const startEndeUhrzeitIntervalls: StartEndeUhrzeitIntervalls = {
            startUhrzeitIntervalls: firstIntervall?.startUhrzeit,
            endeUhrzeitIntervalls: lastIntervall?.endeUhrzeit,
        } as StartEndeUhrzeitIntervalls;
        store.commit(
            "setStartEndeUhrzeitIntervalls",
            startEndeUhrzeitIntervalls
        );
    }
}

/**
 * Zurücksetzen der Start- und Endeuhrzeit des ersten und letzten Zeitintervalls.
 */
function resetStartEndeUhrzeitIntervallsInStore(): void {
    store.commit(
        "setStartEndeUhrzeitIntervalls",
        DefaultObjectCreator.createDefaultStartEndeUhrzeitIntervalls()
    );
}

function setMaxRangeYAchse() {
    let ganglinieYAchse1MaxValue: number | null =
        options.value.ganglinieYAchse1MaxValue;
    if (
        ganglinieYAchse1MaxValue !== undefined &&
        ganglinieYAchse1MaxValue !== null &&
        ganglinieYAchse1MaxValue > 0
    ) {
        zaehldatenSteplineDTO.value.rangeMax = ganglinieYAchse1MaxValue;
    }

    let ganglinieYAchse2MaxValue: number | null =
        options.value.ganglinieYAchse2MaxValue;
    if (
        ganglinieYAchse2MaxValue !== undefined &&
        ganglinieYAchse2MaxValue !== null &&
        ganglinieYAchse2MaxValue > 0
    ) {
        zaehldatenSteplineDTO.value.rangeMaxPercent = ganglinieYAchse2MaxValue;
    }
}

/**
 * Fügt dem PDF Report das aktuell angezeigte Chart hinzu.
 */
function addChartToPdfReport(): void {
    switch (activeTab.value) {
        case TAB_BELASTUNGSPLAN:
            if (belastungsplanDTO.value.kreisverkehr) {
                reportTools.addChartToPdfReport(
                    Erhebungsstelle.ZAEHLSTELLE,
                    "Der",
                    "Belastungsplan",
                    getKreisverkehrBase64(),
                    false
                );
            } else {
                reportTools.addChartToPdfReport(
                    Erhebungsstelle.ZAEHLSTELLE,
                    "Der",
                    "Belastungsplan",
                    belastungsplanPngBase64.value,
                    false
                );
            }
            break;
        case TAB_GANGLINIE:
            reportTools.addChartToPdfReport(
                Erhebungsstelle.ZAEHLSTELLE,
                "Die",
                "Ganglinie",
                getGanglinieBase64(),
                true
            );
            break;
        case TAB_HEATMAP:
            reportTools.addChartToPdfReport(
                Erhebungsstelle.ZAEHLSTELLE,
                "Die",
                "Heatmap",
                getHeatmapBase64(),
                true
            );
            break;
        case TAB_ZEITREIHE:
            reportTools.addChartToPdfReport(
                Erhebungsstelle.ZAEHLSTELLE,
                "Die",
                "Zeitreihe",
                getZeitreiheBase64(),
                true
            );
            break;
        case TAB_LISTENAUSGABE:
            reportTools.addDatatableToPdfReport(
                Erhebungsstelle.ZAEHLSTELLE,
                "Die",
                "Datentabelle"
            );
            break;
    }
}

/**
 * Speichert das aktuell offene Diagramm als Png bzw SVG (Kreuzung-Belastungsplan)
 */
function saveGraphAsImage(): void {
    loadingFile.value = true;

    let encodedUri = undefined;
    let type = "";

    switch (activeTab.value) {
        case TAB_BELASTUNGSPLAN:
            type = "Belastungsplan";
            if (belastungsplanDTO.value.kreisverkehr) {
                encodedUri = getKreisverkehrBase64();
            } else if (belastungsplanSvg.value) {
                // Kreuzung
                encodedUri = URL.createObjectURL(belastungsplanSvg.value);
            }
            break;
        case TAB_GANGLINIE:
            type = "Ganglinie";
            encodedUri = getGanglinieBase64();
            break;
        case TAB_HEATMAP:
            type = "Heatmap";
            encodedUri = getHeatmapBase64();
            break;
        case TAB_ZEITREIHE:
            type = "Zeitreihe";
            encodedUri = getZeitreiheBase64();
            break;
    }

    if (encodedUri && type) {
        reportTools.saveGraphAsImage(
            Erhebungsstelle.ZAEHLSTELLE,
            type,
            [selectedZaehlung.value.datum],
            encodedUri
        );
    }
    loadingFile.value = false;
}

/**
 * Base 64 String des Kreisverkehrs
 */
function getKreisverkehrBase64(): string | undefined {
    return belastungsplanCard?.value?.belastungsplanKreisverkehr?.chart?.getDataURL(
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
function getGanglinieBase64(): string | undefined {
    return steplineCard?.value?.steplineForPdf?.chart?.getDataURL({
        pixelRatio: 2,
        backgroundColor: "#fff",
        excludeComponents: ["toolbox"],
    });
}

/**
 * Base64 String der Heatmap
 */
function getHeatmapBase64(): string | undefined {
    return heatmapCard?.value?.heatmapChart?.chart?.getDataURL({
        pixelRatio: 2,
        backgroundColor: "#fff",
        excludeComponents: ["toolbox"],
    });
}

/**
 * Base64 String der Zeitreihe
 */
function getZeitreiheBase64(): string | undefined {
    return zeitreiheCard?.value?.zeitreiheForPdf?.chart?.getDataURL({
        pixelRatio: 2,
        backgroundColor: "#fff",
        excludeComponents: ["toolbox"],
    });
}

// PDF
function generatePdf() {
    let formData = new FormData();
    loadingFile.value = true;

    const o = Object.assign({}, options.value) as OptionsDTO;
    o.zaehldauer = selectedZaehlung.value.zaehldauer;

    formData.append(
        "options",
        new Blob([JSON.stringify(o)], {
            type: "application/json",
        })
    );

    // Belastungsplan
    if (activeTab.value === TAB_BELASTUNGSPLAN) {
        // Kreisverkehr
        const kreisverkehrBase64 = getKreisverkehrBase64();
        if (belastungsplanDTO.value.kreisverkehr && kreisverkehrBase64) {
            formData.append(
                REQUEST_PART_CHART_AS_BASE64_PNG,
                new Blob([kreisverkehrBase64], {
                    type: "image/png",
                })
            );
        } else {
            // Kreuzung
            formData.append(
                REQUEST_PART_CHART_AS_BASE64_PNG,
                belastungsplanPngBase64.value
            );
        }
        fetchPdf(formData, "belastungsplan");

        // Ganglinie
    } else if (activeTab.value === TAB_GANGLINIE) {
        const ganglinieBase64 = getGanglinieBase64();
        if (ganglinieBase64) {
            formData.append(
                REQUEST_PART_CHART_AS_BASE64_PNG,
                new Blob([ganglinieBase64], {
                    type: "image/png",
                })
            );
        }
        formData.append(
            REQUEST_PART_SCHEMATISCHE_UEBERSICHT_AS_BASE64_PNG,
            belastungsplanSchematischeUebersichtPngBase64.value
        );
        fetchPdf(formData, "ganglinie");
        // Listenausgabe
    } else if (activeTab.value === TAB_LISTENAUSGABE) {
        formData.append(
            REQUEST_PART_SCHEMATISCHE_UEBERSICHT_AS_BASE64_PNG,
            belastungsplanSchematischeUebersichtPngBase64.value
        );
        fetchPdf(formData, "datentabelle");
        // Zeitreihe
    } else if (activeTab.value === TAB_ZEITREIHE) {
        const zeitreiheBase64 = getZeitreiheBase64();
        if (zeitreiheBase64) {
            formData.append(
                REQUEST_PART_CHART_AS_BASE64_PNG,
                new Blob([zeitreiheBase64], {
                    type: "image/png",
                })
            );
        }
        formData.append(
            REQUEST_PART_SCHEMATISCHE_UEBERSICHT_AS_BASE64_PNG,
            belastungsplanSchematischeUebersichtPngBase64.value
        );
        fetchPdf(formData, "zeitreihe");
    } else {
        loadingFile.value = false;
    }
}

function fetchPdf(formData: FormData, type: string) {
    formData.append("department", userStore.getDepartment);
    GeneratePdfService.postPdfCustomFetchTemplateZaehlung(
        type,
        selectedZaehlung.value.id,
        formData
    )
        .then((res) => {
            res.blob().then((blob) => {
                // Erster Buchstabe soll im Dateinamen groß geschrieben sein, also z. B. Ganglinie statt ganglinie.
                const typeForFilename: string =
                    type.charAt(0).toUpperCase() + type.slice(1);
                const filename = `${reportTools.getFileName(
                    Erhebungsstelle.ZAEHLSTELLE,
                    typeForFilename,
                    [selectedZaehlung.value.datum]
                )}.pdf`;
                daveUtils.downloadFile(blob, filename);
            });
        })
        .catch((error) => snackbarStore.showApiError(error))
        .finally(() => (loadingFile.value = false));
}

function generateCsv() {
    loadingFile.value = true;
    const optionsDTO = Object.assign({}, options.value) as OptionsDTO;
    optionsDTO.zaehldauer = selectedZaehlung.value.zaehldauer;

    GenerateCsvService.generateCsv(selectedZaehlung.value.id, optionsDTO)
        .then((result: CsvDTO) => {
            // Beispiel: 251101K_15-11-2020_Listenausgabe.csv
            const filename = `${reportTools.getFileName(
                Erhebungsstelle.ZAEHLSTELLE,
                "Listenausgabe",
                [selectedZaehlung.value.datum]
            )}.csv`;

            daveUtils.downloadCsv(result.csvAsString, filename);
        })
        .catch((error) => {
            snackbarStore.showApiError(error);
        })
        .finally(() => (loadingFile.value = false));
}
</script>
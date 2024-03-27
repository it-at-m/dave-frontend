<template>
    <v-sheet
        ref="sheet"
        :min-height="height"
    >
        <v-tabs
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
            <tooltipTab
                :is-disabled="isBiggerThanFiveYears"
                :tooltip-text="ZEITRAUM_GROESSER_FUENF_JAHRE"
                icon="mdi-chart-histogram"
                tab-name="Ganglinie"
            />
            <tooltipTab
                :is-disabled="isBiggerThanFiveYears"
                :tooltip-text="ZEITRAUM_GROESSER_FUENF_JAHRE"
                icon="mdi-table"
                tab-name="listenausgabe"
            />
            <tooltipTab
                :is-disabled="isBiggerThanFiveYears"
                :tooltip-text="ZEITRAUM_GROESSER_FUENF_JAHRE"
                icon="mdi-chart-bubble"
                tab-name="Heatmap"
            />
            <v-tab>
                Zeitreihe
                <v-icon>mdi-timer-sand</v-icon>
            </v-tab>
        </v-tabs>
        <v-tabs-items
            v-model="activeTab"
            class="d-flex flex-column align-stretch"
        >
            <!-- Inhalte -->
            <v-tab-item>
                <v-sheet
                    v-if="
                        belastungsplanDataDTO.ladeBelastungsplanMessquerschnittDataDTOList
                    "
                    :max-height="contentHeight"
                    width="100%"
                    class="overflow-y-auto"
                >
                    <belastungsplan-messquerschnitt-card
                        :belastungsplan-data="belastungsplanDataDTO"
                        :dimension="contentHeight"
                    />
                </v-sheet>
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
                <loader :value="chartDataLoading"></loader>
            </v-tab-item>
            <v-tab-item>
                <v-sheet
                    :max-height="contentHeight"
                    width="100%"
                >
                    <messwerte-listenausgabe
                        :listenausgabe-data="listenausgabeDTO"
                        :height="contentHeight"
                    >
                    </messwerte-listenausgabe>
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
                        :zaehldaten-heatmap="zaehldatenHeatmapDTO"
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
                    <v-card ref="zeitreiheCard">
                        <v-card-title>
                            <v-icon>mdi-account-hard-hat-outline</v-icon>
                            Under Construction
                            <v-icon>mdi-car-wrench</v-icon>
                        </v-card-title>
                    </v-card>
                </v-sheet>
            </v-tab-item>
        </v-tabs-items>

        <!-- Speed Dial alles außer Listenausgabe-->
        <speed-dial
            v-show="showSpeedial"
            :is-listenausgabe="isTabListenausgabe"
            :is-not-heatmap="isNotTabHeatmap"
            :loading-file="loadingFile"
            @addChartToPdfReport="addChartToPdfReport"
            @saveGraphAsImage="saveGraphAsImage"
            @openPdfReportDialog="openPdfReportDialog"
            @generateCsv="generateCsv"
        />
        <pdf-report-menue-messstelle
            v-model="pdfReportDialog"
            @close="closePdfReportDialog"
        />
    </v-sheet>
</template>
<script setup lang="ts">
import { computed, ComputedRef, ref, Ref, watch } from "vue";
import LadeZaehldatenSteplineDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenSteplineDTO";
import BelastungsplanCard from "@/components/zaehlstelle/charts/BelastungsplanCard.vue";
import StepLineCard from "@/components/zaehlstelle/charts/StepLineCard.vue";
import HeatmapCard from "@/components/zaehlstelle/charts/HeatmapCard.vue";
import ZeitreiheCard from "@/components/zaehlstelle/charts/ZeitreiheCard.vue";
import LadeMessdatenService from "@/api/service/LadeMessdatenService";
import LadeProcessedMessdatenDTO from "@/types/messstelle/LadeProcessedMessdatenDTO";
import Loader from "@/components/common/Loader.vue";
import { useStore } from "@/api/util/useStore";
import { useRoute } from "vue-router/composables";
import SpeedDial from "@/components/messstelle/charts/SpeedDial.vue";
import { useReportTools } from "@/util/reportTools";
import LadeZaehldatenHeatmapDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenHeatmapDTO";
import LadeZaehldatumDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatumDTO";
import MesswerteListenausgabe from "@/components/messstelle/charts/MesswerteListenausgabe.vue";
import BelastungsplanMessquerschnitteDTO from "@/types/messstelle/BelastungsplanMessquerschnitteDTO";
import BelastungsplanMessquerschnittCard from "@/components/messstelle/charts/BelastungsplanMessquerschnittCard.vue";
import MessstelleHistoryItem from "@/types/app/MessstelleHistoryItem";
import MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import _ from "lodash";
import PdfReportMenueMessstelle from "@/components/messstelle/PdfReportMenueMessstelle.vue";
import GenerateCsvService from "@/api/service/GenerateCsvService";
import CsvDTO from "@/types/CsvDTO";
import TooltipTab from "@/components/messstelle/charts/TooltipTab.vue";

// Refactoring: Synergieeffekt mit ZaehldatenDiagramme nutzen

const ZEITRAUM_GROESSER_FUENF_JAHRE =
    "Da der Zeitraum größer 5 Jahre ist steht die anzeige nicht zur verfügung";

interface Props {
    height?: string;
    contentHeight?: string;
}

withDefaults(defineProps<Props>(), {
    height: "100%",
});

const chartDataLoading: Ref<boolean> = ref(false);

const zaehldatenSteplineDTO: Ref<LadeZaehldatenSteplineDTO> = ref(
    {} as LadeZaehldatenSteplineDTO
);

const zaehldatenHeatmapDTO: Ref<LadeZaehldatenHeatmapDTO> = ref(
    {} as LadeZaehldatenHeatmapDTO
);

const listenausgabeDTO: Ref<Array<LadeZaehldatumDTO>> = ref([]);

const belastungsplanDataDTO = ref({} as BelastungsplanMessquerschnitteDTO);

// Wieder entfernen, wenn alle Tabs fertig sind
const showSpeedial: Ref<boolean> = ref(false);

const isTabListenausgabe: Ref<boolean> = ref(false);
const isNotTabHeatmap: Ref<boolean> = ref(false);
const pdfReportDialog: Ref<boolean> = ref(false);

const activeTab: Ref<number> = ref(0);

const loadingFile: Ref<boolean> = ref(false);

const TAB_BELASTUNGSPLAN = 0;
const TAB_GANGLINIE = 1;
const TAB_LISTENAUSGABE = 2;
const TAB_HEATMAP = 3;
const TAB_ZEITREIHE = 4;

const belastungsplanCard = ref<BelastungsplanCard>();
const steplineCard = ref<StepLineCard>();
const heatmapCard = ref<HeatmapCard>();
const zeitreiheCard = ref<ZeitreiheCard>();

const store = useStore();
const route = useRoute();
const reportTools = useReportTools();

const messstelleId: ComputedRef<string> = computed(() => {
    return route.params.messstelleId;
});

const options: ComputedRef<MessstelleOptionsDTO> = computed(() => {
    return store.getters["filteroptionsMessstelle/getFilteroptions"];
});

const isBiggerThanFiveYears = computed(() => {
    let zeitraum = options.value.zeitraum;
    const differenceInMs = Math.abs(
        new Date(zeitraum[0]).valueOf() - new Date(zeitraum[1]).valueOf()
    );
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
    const differenceInYears = Math.floor(differenceInDays / 365);
    return differenceInYears >= 5;
});

watch(isBiggerThanFiveYears, () => {
    if (isBiggerThanFiveYears) {
        activeTab.value = TAB_BELASTUNGSPLAN;
    }
});

watch(activeTab, (active) => {
    store.dispatch("messstelleInfo/setActiveTab", active);
    isTabListenausgabe.value = TAB_LISTENAUSGABE === activeTab.value;
    isNotTabHeatmap.value = TAB_HEATMAP !== activeTab.value;
    showSpeedial.value = [
        TAB_GANGLINIE,
        TAB_HEATMAP,
        TAB_LISTENAUSGABE,
    ].includes(activeTab.value);
});

watch(options, () => {
    loadProcessedChartData();
});

function loadProcessedChartData() {
    chartDataLoading.value = true;
    LadeMessdatenService.ladeMessdatenProcessed(
        messstelleId.value,
        options.value
    )
        .then((processedZaehldaten: LadeProcessedMessdatenDTO) => {
            zaehldatenSteplineDTO.value =
                processedZaehldaten.zaehldatenStepline;
            zaehldatenHeatmapDTO.value = processedZaehldaten.zaehldatenHeatmap;
            listenausgabeDTO.value =
                processedZaehldaten.zaehldatenTable.zaehldaten;
            belastungsplanDataDTO.value =
                processedZaehldaten.listBelastungsplanMessquerschnitteDTO;
            setMaxRangeYAchse();
        })
        .finally(() => {
            chartDataLoading.value = false;
            const messstelle: MessstelleInfoDTO =
                store.getters["messstelleInfo/getMessstelleInfo"];
            store.commit(
                "history/addHistoryItem",
                new MessstelleHistoryItem(
                    messstelle.id,
                    messstelle.mstId,
                    messstelle.standort,
                    _.cloneDeep(options.value)
                )
            );
        });
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
    if (activeTab.value === TAB_GANGLINIE) {
        reportTools.addChartToPdfReport(
            getGanglinieBase64(),
            "Ganglinie",
            "Die"
        );
    }
    if (activeTab.value === TAB_HEATMAP) {
        reportTools.addChartToPdfReport(getHeatmapBase64(), "Heatmap", "Die");
    }
    if (activeTab.value === TAB_LISTENAUSGABE) {
        reportTools.addDatatabelToPdfReport(
            _.cloneDeep(options.value),
            "Datentabelle",
            "Die"
        );
    }
}

/**
 * Speichert das aktuell offene Diagramm als Png bzw SVG (Kreuzung-Belastungsplan)
 */
function saveGraphAsImage(): void {
    loadingFile.value = true;
    if (activeTab.value === TAB_GANGLINIE) {
        reportTools.saveGraphAsImage(
            getGanglinieBase64(),
            "Ganglinie",
            options.value.zeitraum
        );
    } else if (activeTab.value === TAB_HEATMAP) {
        reportTools.saveGraphAsImage(
            getHeatmapBase64(),
            "Heatmap",
            options.value.zeitraum
        );
    }
    loadingFile.value = false;
}

function generateCsv() {
    loadingFile.value = true;
    const optionsDTO = _.cloneDeep(options.value);

    GenerateCsvService.generateCsvMst(messstelleId.value, optionsDTO)
        .then((result: CsvDTO) => {
            // Beispiel: 251101K_15-11-2020_Listenausgabe.csv
            let filename = `${reportTools.getFileName(
                "Listenausgabe",
                options.value.zeitraum
            )}.csv`;

            let csvContent =
                "data:text/csv;charset=utf-8," + result.csvAsString;

            let encodedUri = encodeURI(csvContent);
            let link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", filename);
            document.body.appendChild(link); // Required for FF

            link.click();
        })
        .catch((error) => {
            store.dispatch("snackbar/showError", error);
        })
        .finally(() => (loadingFile.value = false));
}

/**
 * Base 64 String der Ganglinie
 */
function getGanglinieBase64(): string {
    return steplineCard?.value?.steplineForPdf.chart.getDataURL({
        pixelRatio: 2,
        backgroundColor: "#fff",
        excludeComponents: ["toolbox"],
    });
}

/**
 * Base 64 String der Heatmap
 */
function getHeatmapBase64(): string {
    return heatmapCard?.value?.heatmapChart.chart.getDataURL({
        pixelRatio: 2,
        backgroundColor: "#fff",
        excludeComponents: ["toolbox"],
    });
}

function openPdfReportDialog(): void {
    pdfReportDialog.value = true;
}

function closePdfReportDialog(): void {
    pdfReportDialog.value = false;
}
</script>
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
                        ref="belastungsplanCard"
                        :belastungsplan-data="belastungsplanDataDTO"
                        :dimension="contentHeight"
                        @print="storeSvg($event)"
                    />
                </v-sheet>
            </v-tab-item>
            <v-tab-item>
                <banner-messtelle-tabs v-if="isBiggerThanFiveYears" />
                <v-sheet
                    v-else
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
                <progress-loader :value="chartDataLoading"></progress-loader>
            </v-tab-item>
            <v-tab-item>
                <banner-messtelle-tabs v-if="isBiggerThanFiveYears" />
                <v-sheet
                    v-else
                    :max-height="contentHeight"
                    width="100%"
                >
                    <messwerte-listenausgabe
                        :listenausgabe-data="listenausgabeDTO"
                        :height="contentHeight"
                    >
                    </messwerte-listenausgabe>
                </v-sheet>
                <progress-loader :value="chartDataLoading"></progress-loader>
            </v-tab-item>
            <v-tab-item>
                <banner-messtelle-tabs v-if="isBiggerThanFiveYears" />
                <v-sheet
                    v-else
                    :max-height="contentHeight"
                    width="100%"
                    class="overflow-y-auto"
                >
                    <heatmap-card
                        ref="heatmapCard"
                        :zaehldaten-heatmap="zaehldatenHeatmapDTO"
                    ></heatmap-card>
                </v-sheet>
                <progress-loader :value="chartDataLoading"></progress-loader>
            </v-tab-item>
        </v-tabs-items>

        <!-- Speed Dial alles außer Listenausgabe-->
        <speed-dial
            :is-listenausgabe="isTabListenausgabe"
            :is-not-heatmap="isNotTabHeatmap"
            :loading-file="loadingFile"
            @addChartToPdfReport="addChartToPdfReport"
            @saveGraphAsImage="saveGraphAsImage"
            @openPdfReportDialog="openPdfReportDialog"
            @generateCsv="generateCsv"
            @generatePdf="generatePdf"
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
import StepLineCard from "@/components/zaehlstelle/charts/StepLineCard.vue";
import HeatmapCard from "@/components/zaehlstelle/charts/HeatmapCard.vue";
import LadeMessdatenService from "@/api/service/LadeMessdatenService";
import LadeProcessedMessdatenDTO from "@/types/messstelle/LadeProcessedMessdatenDTO";
import ProgressLoader from "@/components/common/ProgressLoader.vue";
import { useStore } from "@/util/useStore";
import { useRoute } from "vue-router/composables";
import SpeedDial from "@/components/messstelle/charts/SpeedDial.vue";
import { useReportTools } from "@/util/reportTools";
import LadeZaehldatenHeatmapDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenHeatmapDTO";
import LadeZaehldatumDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatumDTO";
import MesswerteListenausgabe from "@/components/messstelle/charts/MesswerteListenausgabe.vue";
import BelastungsplanMessquerschnitteDTO from "@/types/messstelle/BelastungsplanMessquerschnitteDTO";
import BelastungsplanMessquerschnittCard from "@/components/messstelle/charts/BelastungsplanMessquerschnittCard.vue";
import MessstelleHistoryItem from "@/types/history/MessstelleHistoryItem";
import MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import _ from "lodash";
import PdfReportMenueMessstelle from "@/components/messstelle/PdfReportMenueMessstelle.vue";
import GenerateCsvService from "@/api/service/GenerateCsvService";
import CsvDTO from "@/types/common/CsvDTO";
import BannerMesstelleTabs from "@/components/messstelle/charts/BannerMesstelleTabs.vue";
import GeneratePdfService from "@/api/service/GeneratePdfService";
import { useDaveUtils } from "@/util/DaveUtils";
import Erhebungsstelle from "@/types/enum/Erhebungsstelle";
import { useHistoryStore } from "@/store/modules/history";
import { useSnackbarStore } from "@/store/modules/snackbar";

// Refactoring: Synergieeffekt mit ZaehldatenDiagramme nutzen

interface Props {
    height?: string;
    contentHeight?: string;
}

withDefaults(defineProps<Props>(), {
    height: "100%",
});

const REQUEST_PART_CHART_AS_BASE64_PNG = "chartAsBase64Png";
const BELASTUNGSPLAN_PNG_DIMENSION = 1400;
const REQUEST_PART_SCHEMATISCHE_UEBERSICHT_AS_BASE64_PNG =
    "schematischeUebersichtAsBase64Png";

const chartDataLoading: Ref<boolean> = ref(false);

const zaehldatenSteplineDTO: Ref<LadeZaehldatenSteplineDTO> = ref(
    {} as LadeZaehldatenSteplineDTO
);

const zaehldatenHeatmapDTO: Ref<LadeZaehldatenHeatmapDTO> = ref(
    {} as LadeZaehldatenHeatmapDTO
);

const listenausgabeDTO: Ref<Array<LadeZaehldatumDTO>> = ref([]);

const belastungsplanDataDTO = ref({} as BelastungsplanMessquerschnitteDTO);

const isTabListenausgabe: Ref<boolean> = ref(false);
const isNotTabHeatmap: Ref<boolean> = ref(true);
const pdfReportDialog: Ref<boolean> = ref(false);

const activeTab: Ref<number> = ref(0);

const loadingFile: Ref<boolean> = ref(false);

const TAB_BELASTUNGSPLAN = 0;
const TAB_GANGLINIE = 1;
const TAB_LISTENAUSGABE = 2;
const TAB_HEATMAP = 3;

const belastungsplanCard = ref<typeof BelastungsplanMessquerschnittCard>();
const steplineCard = ref<InstanceType<typeof StepLineCard> | null>();
const heatmapCard = ref<InstanceType<typeof HeatmapCard> | null>();
const belastungsplanSvg = ref<Blob>();
const belastungsplanPngBase64 = ref("");

const store = useStore();
const snackbarStore = useSnackbarStore();
const historyStore = useHistoryStore();
const route = useRoute();
const reportTools = useReportTools();
const daveUtils = useDaveUtils();

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
});

watch(options, () => {
    loadProcessedChartData();
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
                processedZaehldaten.belastungsplanMessquerschnitte;
            setMaxRangeYAchse();
        })
        .catch((error) => {
            snackbarStore.showApiError(error);
        })
        .finally(() => {
            chartDataLoading.value = false;
            const messstelle: MessstelleInfoDTO =
                store.getters["messstelleInfo/getMessstelleInfo"];
            historyStore.addHistoryItem(
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
    if (activeTab.value === TAB_BELASTUNGSPLAN) {
        reportTools.addChartToPdfReport(
            Erhebungsstelle.MESSSTELLE,
            "Der",
            "Belastungsplan",
            belastungsplanPngBase64.value,
            false
        );
    }

    if (activeTab.value === TAB_GANGLINIE) {
        reportTools.addChartToPdfReport(
            Erhebungsstelle.MESSSTELLE,
            "Die",
            "Ganglinie",
            getGanglinieBase64(),
            true
        );
    }
    if (activeTab.value === TAB_HEATMAP) {
        reportTools.addChartToPdfReport(
            Erhebungsstelle.MESSSTELLE,
            "Die",
            "Heatmap",
            getHeatmapBase64(),
            true
        );
    }
    if (activeTab.value === TAB_LISTENAUSGABE) {
        reportTools.addDatatableToPdfReport(
            Erhebungsstelle.MESSSTELLE,
            "Die",
            "Datentabelle"
        );
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
        case TAB_GANGLINIE:
            type = "Ganglinie";
            encodedUri = getGanglinieBase64();
            break;
        case TAB_HEATMAP:
            type = "Heatmap";
            encodedUri = getHeatmapBase64();
            break;
        case TAB_BELASTUNGSPLAN:
            type = "Belastungsplan";
            if (belastungsplanSvg.value) {
                encodedUri = URL.createObjectURL(belastungsplanSvg.value);
            }
            break;
    }

    if (encodedUri && type) {
        reportTools.saveGraphAsImage(
            Erhebungsstelle.MESSSTELLE,
            type,
            options.value.zeitraum,
            encodedUri
        );
    }

    loadingFile.value = false;
}

function generateCsv() {
    loadingFile.value = true;
    const optionsDTO = _.cloneDeep(options.value);

    GenerateCsvService.generateCsvMst(messstelleId.value, optionsDTO)
        .then((result: CsvDTO) => {
            const filename = `${reportTools.getFileName(
                Erhebungsstelle.MESSSTELLE,
                "Listenausgabe",
                options.value.zeitraum
            )}.csv`;
            daveUtils.downloadCsv(result.csvAsString, filename);
        })
        .catch((error) => {
            snackbarStore.showApiError(error);
        })
        .finally(() => (loadingFile.value = false));
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
 * Base 64 String der Heatmap
 */
function getHeatmapBase64(): string | undefined {
    return heatmapCard?.value?.heatmapChart?.chart?.getDataURL({
        pixelRatio: 2,
        backgroundColor: "#fff",
        excludeComponents: ["toolbox"],
    });
}

function storeSvg(svg: Blob): void {
    belastungsplanSvg.value = svg;
}

function openPdfReportDialog(): void {
    pdfReportDialog.value = true;
}

function closePdfReportDialog(): void {
    pdfReportDialog.value = false;
}

function generatePdf(): void {
    let formData = new FormData();
    let type = "";
    loadingFile.value = true;

    formData.append(
        "options",
        new Blob([JSON.stringify(options.value)], {
            type: "application/json",
        })
    );

    switch (activeTab.value) {
        case TAB_BELASTUNGSPLAN:
            if (belastungsplanSvg.value) {
                type = "belastungsplan";
                formData.append(
                    REQUEST_PART_CHART_AS_BASE64_PNG,
                    belastungsplanPngBase64.value
                );
            }
            break;
        case TAB_GANGLINIE:
            type = "ganglinie";
            formData.append(
                REQUEST_PART_CHART_AS_BASE64_PNG,
                new Blob([getGanglinieBase64() ?? ""], {
                    type: "image/png",
                })
            );
            if (belastungsplanSvg.value) {
                formData.append(
                    REQUEST_PART_SCHEMATISCHE_UEBERSICHT_AS_BASE64_PNG,
                    belastungsplanPngBase64.value
                );
            }
            break;
        case TAB_LISTENAUSGABE:
            type = "datentabelle";
            if (belastungsplanSvg.value) {
                formData.append(
                    REQUEST_PART_SCHEMATISCHE_UEBERSICHT_AS_BASE64_PNG,
                    belastungsplanPngBase64.value
                );
            }
            break;
    }
    fetchPdf(formData, type);
}

function fetchPdf(formData: FormData, type: string) {
    formData.append("department", store.getters["user/getDepartment"]);
    GeneratePdfService.postPdfCustomFetchTemplateMessstelle(
        type,
        messstelleId.value,
        formData
    )
        .then((res) => {
            res.blob().then((blob) => {
                // Erster Buchstabe soll im Dateinamen groß geschrieben sein, also z. B. Ganglinie statt ganglinie.
                const typeForFilename: string =
                    type.charAt(0).toUpperCase() + type.slice(1);

                // Beispiel: 251101K_15-11-2020_Belastungsplan.pdf
                const filename = `${reportTools.getFileName(
                    Erhebungsstelle.MESSSTELLE,
                    typeForFilename,
                    options.value.zeitraum
                )}.pdf`;
                daveUtils.downloadFile(blob, filename);
            });
        })
        .catch((error) => snackbarStore.showApiError(error))
        .finally(() => (loadingFile.value = false));
}
</script>
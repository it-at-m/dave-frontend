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
                    :max-height="contentHeight"
                    width="100%"
                    class="overflow-y-auto"
                >
                    <v-card ref="belastungsplanCard">
                        <v-card-title>
                            <v-icon>mdi-account-hard-hat-outline</v-icon>
                            Under Construction
                            <v-icon>mdi-car-wrench</v-icon>
                        </v-card-title>
                    </v-card>
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
                    <v-card>
                        <v-card-title>
                            <v-icon>mdi-account-hard-hat-outline</v-icon>
                            Under Construction
                            <v-icon>mdi-car-wrench</v-icon>
                        </v-card-title>
                    </v-card>
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
                        :zaehldaten-heatmap="zaehldatenHeatmap"
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
        />
    </v-sheet>
</template>
<script setup lang="ts">
import { computed, ComputedRef, onMounted, ref, Ref, watch } from "vue";
import LadeZaehldatenSteplineDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenSteplineDTO";
import BelastungsplanCard from "@/components/zaehlstelle/charts/BelastungsplanCard.vue";
import StepLineCard from "@/components/zaehlstelle/charts/StepLineCard.vue";
import HeatmapCard from "@/components/zaehlstelle/charts/HeatmapCard.vue";
import ZeitreiheCard from "@/components/zaehlstelle/charts/ZeitreiheCard.vue";
import LadeMessdatenService from "@/api/service/LadeMessdatenService";
import LadeProcessedZaehldatenDTO from "@/types/zaehlung/zaehldaten/LadeProcessedZaehldatenDTO";
import Loader from "@/components/common/Loader.vue";
import { useStore } from "@/api/util/useStore";
import { useRoute } from "vue-router/composables";
import SpeedDial from "@/components/messstelle/charts/SpeedDial.vue";
import { useReportTools } from "@/util/reportTools";
import LadeZaehldatenHeatmapDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenHeatmapDTO";

// Refactoring: Synergieeffekt mit ZaehldatenDiagramme nutzen

interface Props {
    height?: string;
    contentHeight?: string;
}

withDefaults(defineProps<Props>(), {
    height: "100%",
});

const chartDataLoading: Ref<boolean> = ref(false);

// Stepline
const zaehldatenSteplineDTO: Ref<LadeZaehldatenSteplineDTO> = ref(
    {} as LadeZaehldatenSteplineDTO
);

// Heatmap
const zaehldatenHeatmapDTO: Ref<LadeZaehldatenHeatmapDTO> = ref(
    {} as LadeZaehldatenHeatmapDTO
);

// Wieder entfernen, wenn alle Tabs fertig sind
const showSpeedial: Ref<boolean> = ref(false);

const isTabListenausgabe: Ref<boolean> = ref(false);
const isNotTabHeatmap: Ref<boolean> = ref(false);

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

onMounted(() => {
    loadData();
});

const messstelleId: ComputedRef<string> = computed(() => {
    return route.params.messstelleId;
});

const zaehldatenStepline: ComputedRef<LadeZaehldatenSteplineDTO> = computed(
    () => {
        return zaehldatenSteplineDTO.value;
    }
);

const zaehldatenHeatmap: ComputedRef<LadeZaehldatenHeatmapDTO> = computed(
    () => {
        return zaehldatenHeatmapDTO.value;
    }
);

watch(activeTab, (active) => {
    store.dispatch("messstelleInfo/setActiveTab", active);
    isTabListenausgabe.value = TAB_LISTENAUSGABE === activeTab.value;
    isNotTabHeatmap.value = TAB_HEATMAP !== activeTab.value;
    showSpeedial.value = [TAB_GANGLINIE, TAB_HEATMAP].includes(activeTab.value);
});

/**
 * Die Requests für alle Diagramme werden abgesetzt.
 */
function loadData() {
    loadProcessedChartData();
}

function loadProcessedChartData() {
    chartDataLoading.value = true;
    LadeMessdatenService.ladeMessdatenProcessed(messstelleId.value)
        .then((processedZaehldaten: LadeProcessedZaehldatenDTO) => {
            zaehldatenSteplineDTO.value =
                processedZaehldaten.zaehldatenStepline;
            zaehldatenHeatmapDTO.value = processedZaehldaten.zaehldatenHeatmap;
        })
        .finally(() => {
            chartDataLoading.value = false;
        });
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
    // Heatmap
    if (activeTab.value === TAB_HEATMAP) {
        reportTools.addChartToPdfReport(getHeatmapBase64(), "Heatmap", "Die");
    }
}

/**
 * Speichert das aktuell offene Diagramm als Png bzw SVG (Kreuzung-Belastungsplan)
 */
function saveGraphAsImage(): void {
    loadingFile.value = true;
    if (activeTab.value === TAB_GANGLINIE) {
        reportTools.saveGraphAsImage(getGanglinieBase64(), "Ganglinie");
    } else if (activeTab.value === TAB_HEATMAP) {
        reportTools.saveGraphAsImage(getHeatmapBase64(), "Heatmap");
    }
    loadingFile.value = false;
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
</script>
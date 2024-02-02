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
                    <v-card ref="heatmapCard">
                        <heatmap-card
                            ref="heatmapCard"
                            :zaehldaten-heatmap="zaehldatenHeatmap"
                        ></heatmap-card>
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

        <!-- Wenn alle Grafiken da, dann analog ZaehldatenDiagramme machen -->
        <v-speed-dial
            v-if="isTabStepLine || isTabHeatmap"
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
                    <v-icon v-if="fab"> mdi-close-thick</v-icon>
                    <v-icon v-else> mdi-file</v-icon>
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
import { Levels } from "@/api/error";
import ImageAsset from "@/types/pdfreport/assets/ImageAsset";
import Loader from "@/components/common/Loader.vue";
import { useStore } from "@/api/util/useStore";
import MessstelleInfoDTO from "@/types/MessstelleInfoDTO";
import HeadingAsset from "@/types/pdfreport/assets/HeadingAsset";
import AssetTypesEnum from "@/types/pdfreport/assets/AssetTypesEnum";
import { useRoute } from "vue-router/composables";
import LadeZaehldatenHeatmapDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatenHeatmapDTO";

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

// Stepline
const zaehldatenHeatmapDTO: Ref<LadeZaehldatenHeatmapDTO> = ref(
    {} as LadeZaehldatenHeatmapDTO
);

// Fab
const fab: Ref<boolean> = ref(false);
const isFabShown: Ref<boolean> = ref(true);
const isTabStepLine: Ref<boolean> = ref(false);
const isTabHeatmap: Ref<boolean> = ref(false);

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

onMounted(() => {
    loadData();
});

const fabColor: ComputedRef<string> = computed(() => {
    return fab.value ? "grey darken-1" : "secondary";
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

const messstelle: ComputedRef<MessstelleInfoDTO> = computed(() => {
    return store.getters["messstelleInfo/getMessstelleInfo"];
});

watch(activeTab, (active) => {
    store.dispatch("messstelleInfo/setActiveTab", active);
    isTabStepLine.value = [TAB_GANGLINIE].includes(activeTab.value);
    isFabShown.value = [
        TAB_BELASTUNGSPLAN,
        TAB_GANGLINIE,
        TAB_LISTENAUSGABE,
        TAB_HEATMAP,
        TAB_ZEITREIHE,
    ].includes(activeTab.value);
});

watch(
    () => messstelleId.value,
    () => {
        loadData();
    }
);

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
    let type = "";
    // Ganglinie
    if (activeTab.value === TAB_GANGLINIE) {
        type = "Die Ganglinie";

        addImageToReport(
            getGanglinieBase64(),
            createCaption("Ganglinie"),
            true
        );
    }
    // Heatmap
    if (activeTab.value === TAB_HEATMAP) {
        type = "Die Heatmap";
        addImageToReport(getHeatmapBase64(), createCaption("Heatmap"), true);
    }

    store.dispatch("snackbar/showToast", {
        snackbarTextPart1: `${type} wurde dem PDF Report hinzugefügt.`,
        level: Levels.SUCCESS,
    });
}

function createCaption(diagram: string): string {
    return `${diagram} zur Messstelle ${messstelle.value.mstId}`;
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

/**
 * Sendet die übergebenen Bildaten und Bildunterschrift als "ImageAsset" an den Vuex Store.
 *
 * @param base64
 * @param name
 * @param heading
 */
function addImageToReport(
    base64: string,
    name: string,
    heading: boolean
): void {
    if (heading) {
        addHeadingToReport();
    }
    const imageAsset = new ImageAsset(name, base64);
    imageAsset.width = 100;
    store.dispatch("addAsset", imageAsset);
}

function addHeadingToReport(): void {
    let chartTitle = "";
    if (chartTitle !== "") {
        const headingAsset = new HeadingAsset(
            chartTitle,
            AssetTypesEnum.HEADING5
        );
        store.dispatch("addAsset", headingAsset);
    }
}

function getFileName(): string {
    let dateForFilename: string = new Date(
        messstelle.value.datumLetztePlausibleMessung
    )
        .toISOString()
        .split("T")[0];

    // Beispiel: 251101K_15-11-2020
    return `${messstelle.value.mstId}_${dateForFilename}`;
}

/**
 * Speichert das aktuell offene Diagramm als Png bzw SVG (Kreuzung-Belastungsplan)
 */
function saveGraphAsImage(): void {
    loadingFile.value = true;

    let filename: string = getFileName();
    let encodedUri = "";
    // Ganglinie
    if (activeTab.value === TAB_GANGLINIE) {
        filename += "_Ganglinie";
        encodedUri = getGanglinieBase64();
        // Listenausgabe
    } else if (activeTab.value === TAB_HEATMAP) {
        filename += "_Heatmap";
        encodedUri = getHeatmapBase64();
        // Zeitreihe
    }

    if (encodedUri !== "") {
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", filename);
        document.body.appendChild(link); // Required for FF
        link.click();
    }
    loadingFile.value = false;
}
</script>
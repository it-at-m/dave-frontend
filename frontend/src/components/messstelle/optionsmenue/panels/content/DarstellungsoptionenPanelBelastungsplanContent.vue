<template>
    <v-expansion-panel-content>
        <panel-header
            font-size="0.875rem"
            font-weight="bold"
            padding="10px 0 0 0"
            header-text="Belastungsplan"
        ></panel-header>
        <v-row
            align="start"
            justify="center"
            dense
        >
            <v-col cols="4">
                <v-hover v-model="hoverWerteHundertRunden">
                    <v-checkbox
                        v-model="chosenOptionsCopy.werteHundertRunden"
                        :label="'Werte auf 100 Runden'"
                        hide-details
                        style="margin-bottom: 12px"
                        color="grey darken-1"
                        dense
                    ></v-checkbox>
                </v-hover>
                <v-hover v-model="hoverSizeBelastungsplan">
                    <v-slider
                        v-model="sizeBelastungsplan"
                        label="Belastungsplangröße"
                        :max="maxSizeBelastungsplanSvg"
                        :min="minSizeBelastungsplanSvg"
                    />
                </v-hover>
            </v-col>
            <v-col cols="4">
                <v-hover v-model="hoverBlackPrintMode">
                    <v-checkbox
                        v-model="chosenOptionsCopy.blackPrintMode"
                        :label="'schwarz-weiß Druckausgabe'"
                        hide-details
                        style="margin-bottom: 12px"
                        color="grey darken-1"
                        dense
                    ></v-checkbox>
                </v-hover>
            </v-col>
            <v-col cols="4">
                <v-card flat>
                    {{ helpTextBelastungsplan }}
                </v-card>
            </v-col>
        </v-row>
    </v-expansion-panel-content>
</template>

<script setup lang="ts">
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import { computed, ref, watch } from "vue";
import PanelHeader from "@/components/common/PanelHeader.vue";
import { useStore } from "@/api/util/useStore";

interface Props {
    value: MessstelleOptionsDTO;
}

const props = defineProps<Props>();
const emit = defineEmits<(e: "input", v: MessstelleOptionsDTO) => void>();
const store = useStore();

const hoverWerteHundertRunden = ref(false);
const hoverSizeBelastungsplan = ref(false);
const hoverBlackPrintMode = ref(false);
const sizeBelastungsplan = ref(0);

const chosenOptionsCopy = computed({
    get: () => props.value,
    set: (payload: MessstelleOptionsDTO) => emit("input", payload),
});

const helpTextBelastungsplan = computed(() => {
    if (hoverWerteHundertRunden.value) {
        return "";
    }
    if (hoverBlackPrintMode.value) {
        return "";
    }
    if (hoverSizeBelastungsplan.value) {
        return "";
    }
    return "";
});

watch(sizeBelastungsplan, () => {
    store.dispatch("setSizeBelastungsplanSvg", sizeBelastungsplan.value);
});

const maxSizeBelastungsplanSvg = computed(() => {
    return store.getters.getMaxSizeBelastungsplanSvg;
});

const minSizeBelastungsplanSvg = computed(() => {
    return store.getters.getMinSizeBelastungsplanSvg;
});
</script>

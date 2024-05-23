<template>
    <v-expansion-panel>
        <v-expansion-panel-header>
            <div>
                <v-icon left>mdi-clock-time-four-outline</v-icon>
                Zeitauswahl
            </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="mt-1">
            <panel-header
                font-size="0.875rem"
                font-weight="bold"
                padding="10px 0 0 0"
                header-text="Zeitauswahl"
            ></panel-header>

            <v-row
                align="start"
                justify="center"
                dense
            >
                <v-col cols="8">
                    <v-radio-group
                        v-model="zeitauswahl"
                        mandatory
                        @change="zeitauswahlChanged"
                    >
                        <v-row>
                            <v-col cols="6">
                                <v-hover v-model="hoverTageswert">
                                    <v-radio
                                        label="Tageswert"
                                        value="Tageswert"
                                        color="grey darken-1"
                                    ></v-radio>
                                </v-hover>
                                <v-hover v-model="hoverBlock">
                                    <v-radio
                                        label="Block"
                                        value="Block"
                                        color="grey darken-1"
                                    ></v-radio>
                                </v-hover>
                                <v-hover v-model="hoverStunde">
                                    <v-radio
                                        label="Stunde"
                                        value="Stunde"
                                        color="grey darken-1"
                                    ></v-radio>
                                </v-hover>
                            </v-col>
                            <v-col cols="6">
                                <v-hover v-model="hoverSpitzenstundeKfz">
                                    <v-radio
                                        label="Spitzenstunde KFZ"
                                        value="Spitzenstunde KFZ"
                                        color="grey darken-1"
                                        :disabled="isTypeDisabled('KFZ')"
                                    ></v-radio>
                                </v-hover>
                                <v-hover v-model="hoverSpitzenstundeRad">
                                    <v-radio
                                        label="Spitzenstunde Rad"
                                        value="Spitzenstunde Rad"
                                        color="grey darken-1"
                                        :disabled="isTypeDisabled('RAD')"
                                    ></v-radio>
                                </v-hover>
                                <v-hover v-model="hoverSpitzenstundeFuss">
                                    <v-radio
                                        label="Spitzenstunde Fuß"
                                        value="Spitzenstunde Fuß"
                                        color="grey darken-1"
                                        :disabled="isTypeDisabled('FUSS')"
                                    ></v-radio>
                                </v-hover>
                            </v-col>
                        </v-row>
                    </v-radio-group>
                </v-col>
                <v-col cols="4">
                    <v-card flat>
                        {{ helpTextZeitauswahl }}
                    </v-card>
                </v-col>
            </v-row>
            <!-- Auszuwählende Zeitblöcke für Blockauswahl oder Spitzenstunde -->
            <v-row no-gutters>
                <v-col cols="4">
                    <v-hover
                        v-if="isZeitauswahlSpitzenstundeOrBlock"
                        v-model="hoverSelectBlockOrSpitzenstunde"
                    >
                        <v-select
                            v-if="isZeitauswahlSpitzenstundeOrBlock"
                            v-model="zeitblock"
                            label="Zeitblock"
                            :items="zeitblockValues"
                            filled
                            dense
                        >
                        </v-select>
                    </v-hover>
                    <!-- Auszuwählende Stunden -->
                    <v-hover
                        v-if="isZeitauswahlStunde"
                        v-model="hoverSelectStunde"
                    >
                        <v-select
                            v-if="isZeitauswahlStunde"
                            v-model="zeitblock"
                            label="Stunde"
                            :items="stuendlichValues"
                            filled
                            dense
                        >
                        </v-select>
                    </v-hover>
                </v-col>
                <v-spacer />
            </v-row>

            <v-divider></v-divider>
            <panel-header
                font-size="0.875rem"
                font-weight="bold"
                padding="10px 0 0 0"
                header-text="Zeitintervall"
            ></panel-header>
            <panel-header
                font-size="small"
                font-weight="normal"
                padding="0 0 10px 0"
                header-text="(außer Belastungsplan und Zeitreihe)"
            ></panel-header>

            <v-row
                align="start"
                justify="center"
                dense
            >
                <v-col cols="4">
                    <v-hover v-model="hoverSelectZeitintervall">
                        <v-select
                            v-model="intervall"
                            :items="zaehldatenIntervalle"
                            label="Zeitintervall"
                            filled
                            dense
                            :disabled="isZeitauswahlSpitzenstunde"
                        ></v-select>
                    </v-hover>
                </v-col>
                <v-spacer />
                <v-col cols="4">
                    <v-card flat>
                        {{ helpTextZeitintervall }}
                    </v-card>
                </v-col>
            </v-row>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script setup lang="ts">
import LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import OptionsDTO from "@/types/zaehlung/OptionsDTO";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import ZaehldatenIntervall, {
    ZaehldatenIntervallToSelect,
} from "@/types/enum/ZaehldatenIntervall";
import Zeitblock, { zeitblockInfo } from "@/types/enum/Zeitblock";
import KeyVal from "@/types/KeyVal";
import ZeitblockStuendlich, {
    zeitblockStuendlichInfo,
} from "@/types/enum/ZeitblockStuendlich";
import PanelHeader from "@/components/common/PanelHeader.vue";
import Zaehldauer from "@/types/enum/Zaehldauer";
import { useStore } from "@/api/util/useStore";
import { computed, onMounted, Ref, ref, watch } from "vue";
import { useZaehlstelleUtils } from "@/util/ZaehlstelleUtils";

interface Props {
    zaehlung?: LadeZaehlungDTO;
}

const props = defineProps<Props>();
const store = useStore();
const zaehlstelleUtils = useZaehlstelleUtils();

const emits = defineEmits<{
    (e: "zeitauswahl", v: string): void;
    (e: "zeitblock", v: string): void;
    (e: "intervall", v: ZaehldatenIntervall): void;
}>();

const zeitauswahl = ref(Zeitauswahl.TAGESWERT.valueOf());
const zeitblock = ref(Zeitblock.ZB_00_24.valueOf());
const intervall = ref(ZaehldatenIntervall.STUNDE_VIERTEL);

// Zeitauswahl
const hoverTageswert = ref(false);
const hoverBlock = ref(false);
const hoverStunde = ref(false);
const hoverSpitzenstundeKfz = ref(false);
const hoverSpitzenstundeRad = ref(false);
const hoverSpitzenstundeFuss = ref(false);

const hoverSelectBlockOrSpitzenstunde = ref(false);
const hoverSelectStunde = ref(false);

// Zeitintervall
const hoverSelectZeitintervall = ref(false);

onMounted(() => {
    update(options.value);
});

const options: Ref<OptionsDTO> = computed(() => {
    return store.getters.getFilteroptions;
});

const activeZaehlung: Ref<LadeZaehlungDTO> = computed(() => {
    return store.getters.getAktiveZaehlung;
});

const isZeitauswahlSpitzenstundeOrBlock = computed(() => {
    return (
        zeitauswahl.value === Zeitauswahl.BLOCK ||
        isZeitauswahlSpitzenstunde.value
    );
});

const isZeitauswahlStunde = computed(() => {
    return zeitauswahl.value === Zeitauswahl.STUNDE;
});

const isZeitauswahlSpitzenstunde = computed(() => {
    return (
        zeitauswahl.value === Zeitauswahl.SPITZENSTUNDE_KFZ ||
        zeitauswahl.value === Zeitauswahl.SPITZENSTUNDE_RAD ||
        zeitauswahl.value === Zeitauswahl.SPITZENSTUNDE_FUSS
    );
});

const helpTextZeitauswahl = computed(() => {
    if (hoverTageswert.value) {
        return "";
    }
    if (hoverBlock.value) {
        return "";
    }
    if (hoverStunde.value) {
        return "";
    }
    if (hoverSpitzenstundeKfz.value) {
        return "Stunde der höchsten Belastung des Kraftfahrzeugverkehrs an einem Knoten (gleitend).";
    }
    if (hoverSpitzenstundeRad.value) {
        return "Stunde der höchsten Belastung des Radverkehrs an einem Knoten (gleitend).";
    }
    if (hoverSpitzenstundeFuss.value) {
        return "Stunde der höchsten Belastung des Fußverkehrs an einem Knoten (gleitend).";
    }
    if (hoverSelectBlockOrSpitzenstunde.value) {
        return "";
    }
    if (hoverSelectStunde.value) {
        return "";
    }
    return "";
});

const helpTextZeitintervall = computed(() => {
    if (hoverSelectZeitintervall.value) {
        return "";
    }
    return "";
});

/**
 * Lädt - abhängig von der aktuellen Zählung - die Labels und Werte für das Zeitblock Select Control
 * Wurde bei der Zeitauswahl die Option Spitzenstunde gewählt, so wird der Zeitblock 0-24 Uhr an
 * den Array der Zeitblöcke angehangen.
 */
const zeitblockValues: Ref<Array<KeyVal>> = computed(() => {
    let result = new Array<KeyVal>();
    // die möglichen Blöcke aus der Zählung
    const blocks: Zeitblock[] = props.zaehlung?.zeitauswahl
        .blocks as Zeitblock[];

    if (blocks && Array.isArray(blocks)) {
        // Select Control mit den entsprechenden text/value Werten füllen
        blocks.forEach((b) => {
            const kv = zeitblockInfo.get(b);
            if (kv) {
                result.push(kv);
            }
        });
        // Block 0-24 bei Zeitauswahl Spitzenstunde hinzufügen falls kein Zeitblock ZB_06_19 oder ZB_06_22 existiert.
        if (
            isZeitauswahlSpitzenstunde.value &&
            !result.some(
                (keyVal) => keyVal === zeitblockInfo.get(Zeitblock.ZB_06_19)
            ) &&
            !result.some(
                (keyVal) => keyVal === zeitblockInfo.get(Zeitblock.ZB_06_22)
            )
        ) {
            if (activeZaehlung.value.zaehldauer === Zaehldauer.SONSTIGE) {
                const zeitBlockMaximal: KeyVal = {} as KeyVal;
                zeitBlockMaximal.value = Zeitblock.ZB_00_24;
                zeitBlockMaximal.text = "maximal";
                result.push(zeitBlockMaximal);
            } else {
                result.push(zeitblockInfo.get(Zeitblock.ZB_00_24) as KeyVal);
            }
        }
    }
    return result;
});

/**
 * Lädt - abhängig von der aktuellen Zählung - die Labels und Werte für das Stunden Select Control
 */
const stuendlichValues: Ref<Array<KeyVal>> = computed(() => {
    let result = new Array<KeyVal>();
    // die möglichen Stunden aus der Zählung
    const hrs = props.zaehlung?.zeitauswahl.hours as ZeitblockStuendlich[];

    if (hrs && typeof Array.isArray(hrs)) {
        // Select Control mit den entsprechenden text/value Werten füllen
        hrs.forEach((h) => {
            const kv = zeitblockStuendlichInfo.get(h);
            if (kv) {
                result.push(kv);
            }
        });
    }
    return result;
});

/**
 * Gibt die ZaehldatenIntervalle zurück welche für den Intervall Select zur Anzeige relevant sind.
 */
const zaehldatenIntervalle: Ref<Array<KeyVal>> = computed(() => {
    return ZaehldatenIntervallToSelect;
});

/**
 * Wird der Tageswert gewählt, so gibt es kein Dropdown Menü, da die Ansicht dann immer
 * über den kompletten Tag geht. Deshalb muss hier auf das "Change" event der Checkbox
 * Gruppe gelauscht werden.
 */
function zeitauswahlChanged() {
    if (zeitauswahl.value === Zeitauswahl.TAGESWERT) {
        zeitblock.value = Zeitblock.ZB_00_24;
    }
    // Der erste Eintrag wird als ausgewählt gesetzt
    if (isZeitauswahlSpitzenstundeOrBlock.value) {
        const zb = zeitblockInfo.get(zeitblockValues.value[0].value)?.value;
        if (zb) {
            zeitblock.value = zb;
        }
    }
    //Der erste Eintrag wird als ausgewählt gesetzt
    if (zeitauswahl.value === Zeitauswahl.STUNDE) {
        const zs = zeitblockStuendlichInfo.get(
            stuendlichValues.value[0].value
        )?.value;
        if (zs) {
            zeitblock.value = zs;
        }
    }
}

// Setzt die Auswahlelemente auf der Oberfläche zurück, oder mit den
//  übergebenen Werten im Optionsobjekt
function update(newOptions: OptionsDTO) {
    newOptions.zeitauswahl === null
        ? (zeitauswahl.value = Zeitauswahl.TAGESWERT)
        : (zeitauswahl.value = newOptions.zeitauswahl);
    newOptions.zeitblock === null
        ? (zeitblock.value = Zeitblock.ZB_00_24)
        : (zeitblock.value = newOptions.zeitblock);
    newOptions.intervall === null
        ? (intervall.value = ZaehldatenIntervall.STUNDE_VIERTEL)
        : (intervall.value = newOptions.intervall);
}

/**
 * Überprüft, ob eine Verkehrsart bei der Zählung erfasst wurde.
 * Wenn nicht, so wird die dazugehörige Checkbox deaktiviert.
 */
function isTypeDisabled(type: string): boolean {
    return zaehlstelleUtils.isTypeDisabled(type, activeZaehlung.value);
}

// Wenn sich die Optionen ändern, dann soll sich auch die Auswahl auf der
// Oberfläche ändern.
watch(options, (newOptions: OptionsDTO) => {
    update(newOptions);
});

watch(zeitauswahl, () => {
    emits("zeitauswahl", zeitauswahl.value);
});

watch(zeitblock, () => {
    emits("zeitblock", zeitblock.value);
});

watch(intervall, () => {
    emits("intervall", intervall.value);
});
</script>
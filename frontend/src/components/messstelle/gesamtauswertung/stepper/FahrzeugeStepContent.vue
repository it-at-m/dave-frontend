<template>
    <div>
        <v-row
            align="start"
            justify="center"
            dense
            class="my-0"
            no-gutters
        >
            <v-col cols="6">
                <strong>Verkehrsarten</strong>
            </v-col>
            <v-col cols="6">
                <v-btn
                    dense
                    text
                    @click="selectOrDeselectAllVerkehrsarten()"
                >
                    {{ labelSelectOrDeselectAllVerkehrsarten }}
                </v-btn>
            </v-col>
        </v-row>
        <v-row
            align="start"
            justify="center"
            dense
            class="my-0"
            no-gutters
        >
            <v-col cols="6">
                <v-checkbox
                    v-model="auswertungOptionsFahrzeuge.kraftfahrzeugverkehr"
                    label="Kraftfahrzeugverkehr (KFZ)"
                    :disabled="isTypeDisabled('KFZ')"
                    hide-details
                    dense
                ></v-checkbox>
            </v-col>
            <v-spacer />
        </v-row>
        <v-row
            align="start"
            justify="center"
            dense
            class="my-0"
            no-gutters
        >
            <v-col cols="6">
                <v-checkbox
                    v-model="auswertungOptionsFahrzeuge.schwerverkehr"
                    label="Schwerverkehr (SV)"
                    :disabled="isTypeDisabled('SV')"
                    hide-details
                    dense
                ></v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-checkbox
                    v-model="
                        auswertungOptionsFahrzeuge.schwerverkehrsanteilProzent
                    "
                    label="Schwerverkehrsanteil [%]"
                    :disabled="isTypeDisabled('SV_P')"
                    hide-details
                    dense
                ></v-checkbox>
            </v-col>
        </v-row>
        <v-row
            align="start"
            justify="center"
            dense
            class="my-0"
            no-gutters
        >
            <v-col cols="6">
                <v-checkbox
                    v-model="auswertungOptionsFahrzeuge.gueterverkehr"
                    label="Güterverkehr (GV)"
                    :disabled="isTypeDisabled('GV')"
                    hide-details
                    dense
                ></v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-checkbox
                    v-model="
                        auswertungOptionsFahrzeuge.gueterverkehrsanteilProzent
                    "
                    label="Güterverkehrsanteil [%]"
                    :disabled="isTypeDisabled('GV_P')"
                    hide-details
                    dense
                ></v-checkbox>
            </v-col>
        </v-row>
        <v-row
            align="start"
            justify="center"
            dense
            class="my-0"
            no-gutters
        >
            <v-col cols="6">
                <v-checkbox
                    v-model="auswertungOptionsFahrzeuge.radverkehr"
                    label="Radverkehr (Rad)"
                    :disabled="isTypeDisabled('RAD')"
                    hide-details
                    dense
                ></v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-checkbox
                    v-model="auswertungOptionsFahrzeuge.fussverkehr"
                    label="Fußgänger (Fuß)"
                    :disabled="isTypeDisabled('FUSS')"
                    hide-details
                    dense
                ></v-checkbox>
            </v-col>
        </v-row>

        <v-divider class="my-2" />

        <v-row
            align="start"
            justify="center"
            dense
            class="my-0"
            no-gutters
        >
            <v-col cols="6">
                <strong>Fahrzeugkategorien</strong>
            </v-col>
            <v-col cols="6">
                <v-btn
                    dense
                    text
                    @click="selectOrDeselectAll()"
                >
                    {{ labelSelectOrDeselectAll }}
                </v-btn>
            </v-col>
        </v-row>
        <v-row
            align="start"
            justify="center"
            dense
            class="my-0"
            no-gutters
        >
            <v-col cols="6">
                <v-checkbox
                    v-model="auswertungOptionsFahrzeuge.personenkraftwagen"
                    label="Personenkraftwagen (Pkw)"
                    :disabled="isTypeDisabled('PKW')"
                    hide-details
                    dense
                ></v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-checkbox
                    v-model="auswertungOptionsFahrzeuge.kraftraeder"
                    label="Krafträder (Krad)"
                    :disabled="isTypeDisabled('KRAD')"
                    hide-details
                    dense
                ></v-checkbox>
            </v-col>
        </v-row>
        <v-row
            align="start"
            justify="center"
            dense
            class="my-0"
            no-gutters
        >
            <v-col cols="6">
                <v-checkbox
                    v-model="auswertungOptionsFahrzeuge.lastkraftwagen"
                    label="Lastkraftwagen (Lkw)"
                    :disabled="isTypeDisabled('LKW')"
                    hide-details
                    dense
                ></v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-checkbox
                    v-model="auswertungOptionsFahrzeuge.lieferwagen"
                    label="Lieferwagen (Lfw)"
                    :disabled="isTypeDisabled('LFW')"
                    hide-details
                    dense
                ></v-checkbox>
            </v-col>
        </v-row>
        <v-row
            align="start"
            justify="center"
            dense
            class="my-0"
            no-gutters
        >
            <v-col cols="6">
                <v-checkbox
                    v-model="auswertungOptionsFahrzeuge.lastzuege"
                    label="Lastzüge (Lz)"
                    :disabled="isTypeDisabled('LZ')"
                    hide-details
                    dense
                ></v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-checkbox
                    v-model="auswertungOptionsFahrzeuge.busse"
                    label="Bus"
                    :disabled="isTypeDisabled('BUS')"
                    hide-details
                    dense
                ></v-checkbox>
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";
import { computed, onMounted, ref, watch } from "vue";
import Fahrzeug from "@/types/enum/Fahrzeug";

interface Props {
    value: MessstelleAuswertungOptionsDTO;
}

const props = defineProps<Props>();

const emits = defineEmits<{
    (e: "input", v: MessstelleAuswertungOptionsDTO): void;
}>();

const selectOrDeselectAllVerkehrsartenVmodel = ref(false);
const selectOrDeselectAllVmodel = ref(false);

const auswertungOptions = computed({
    get: () => props.value,
    set: (payload: MessstelleAuswertungOptionsDTO) => emits("input", payload),
});
const auswertungOptionsFahrzeuge = computed(() => {
    return auswertungOptions.value.fahrzeuge;
});

onMounted(() => {
    calculateSelectOrDeselectVerkehrsarten();
    calculateSelectOrDeselect();
});

watch(
    auswertungOptions,
    () => {
        calculateSelectOrDeselectVerkehrsarten();
        calculateSelectOrDeselect();
    },
    { deep: true }
);

const labelSelectOrDeselectAllVerkehrsarten = computed(() => {
    return selectOrDeselectAllVerkehrsartenVmodel.value
        ? "Alles abwählen"
        : "Alles auswählen";
});

const labelSelectOrDeselectAll = computed(() => {
    return selectOrDeselectAllVmodel.value
        ? "Alles abwählen"
        : "Alles auswählen";
});

function calculateSelectOrDeselectVerkehrsarten(): void {
    let counter = 0;
    let maxSelectable = 0;
    if (isTypeEnabled(Fahrzeug.KFZ)) {
        if (auswertungOptionsFahrzeuge.value.kraftfahrzeugverkehr) {
            counter++;
        }
        maxSelectable++;
    }
    if (isTypeEnabled(Fahrzeug.SV)) {
        if (auswertungOptionsFahrzeuge.value.schwerverkehr) {
            counter++;
        }
        maxSelectable++;
    }
    if (isTypeEnabled(Fahrzeug.GV)) {
        if (auswertungOptionsFahrzeuge.value.gueterverkehr) {
            counter++;
        }
        maxSelectable++;
    }
    if (isTypeEnabled(Fahrzeug.SV_P)) {
        if (auswertungOptionsFahrzeuge.value.schwerverkehrsanteilProzent) {
            counter++;
        }
        maxSelectable++;
    }
    if (isTypeEnabled(Fahrzeug.GV_P)) {
        if (auswertungOptionsFahrzeuge.value.gueterverkehrsanteilProzent) {
            counter++;
        }
        maxSelectable++;
    }
    if (isTypeEnabled(Fahrzeug.RAD)) {
        if (auswertungOptionsFahrzeuge.value.radverkehr) {
            counter++;
        }
        maxSelectable++;
    }
    if (isTypeEnabled(Fahrzeug.FUSS)) {
        if (auswertungOptionsFahrzeuge.value.fussverkehr) {
            counter++;
        }
        maxSelectable++;
    }
    // counter > maxSelectable/2 => abwählen
    // sonst => auswählen
    selectOrDeselectAllVerkehrsartenVmodel.value = counter > maxSelectable / 2;
}

function calculateSelectOrDeselect() {
    let counter = 0;
    let maxSelectable = 0;
    if (isTypeEnabled(Fahrzeug.PKW)) {
        if (auswertungOptionsFahrzeuge.value.personenkraftwagen) {
            counter++;
        }
        maxSelectable++;
    }
    if (isTypeEnabled(Fahrzeug.LKW)) {
        if (auswertungOptionsFahrzeuge.value.lastkraftwagen) {
            counter++;
        }
        maxSelectable++;
    }
    if (isTypeEnabled(Fahrzeug.LZ)) {
        if (auswertungOptionsFahrzeuge.value.lastzuege) {
            counter++;
        }
        maxSelectable++;
    }
    if (isTypeEnabled(Fahrzeug.BUS)) {
        if (auswertungOptionsFahrzeuge.value.busse) {
            counter++;
        }
        maxSelectable++;
    }
    if (isTypeEnabled(Fahrzeug.KRAD)) {
        if (auswertungOptionsFahrzeuge.value.kraftraeder) {
            counter++;
        }
        maxSelectable++;
    }
    if (isTypeEnabled(Fahrzeug.LFW)) {
        if (auswertungOptionsFahrzeuge.value.lieferwagen) {
            counter++;
        }
        maxSelectable++;
    }
    // counter > maxSelectable/2 => abwählen
    // sonst => auswählen
    selectOrDeselectAllVmodel.value = counter > maxSelectable / 2;
}

function selectOrDeselectAllVerkehrsarten(): void {
    selectOrDeselectAllVerkehrsartenVmodel.value =
        !selectOrDeselectAllVerkehrsartenVmodel.value;
    if (isTypeEnabled(Fahrzeug.KFZ)) {
        auswertungOptionsFahrzeuge.value.kraftfahrzeugverkehr =
            selectOrDeselectAllVerkehrsartenVmodel.value;
    }
    if (isTypeEnabled(Fahrzeug.SV)) {
        auswertungOptionsFahrzeuge.value.schwerverkehr =
            selectOrDeselectAllVerkehrsartenVmodel.value;
    }
    if (isTypeEnabled(Fahrzeug.GV)) {
        auswertungOptionsFahrzeuge.value.gueterverkehr =
            selectOrDeselectAllVerkehrsartenVmodel.value;
    }
    if (isTypeEnabled(Fahrzeug.SV_P)) {
        auswertungOptionsFahrzeuge.value.schwerverkehrsanteilProzent =
            selectOrDeselectAllVerkehrsartenVmodel.value;
    }
    if (isTypeEnabled(Fahrzeug.GV_P)) {
        auswertungOptionsFahrzeuge.value.gueterverkehrsanteilProzent =
            selectOrDeselectAllVerkehrsartenVmodel.value;
    }
    if (isTypeEnabled(Fahrzeug.RAD)) {
        auswertungOptionsFahrzeuge.value.radverkehr =
            selectOrDeselectAllVerkehrsartenVmodel.value;
    }
    if (isTypeEnabled(Fahrzeug.FUSS)) {
        auswertungOptionsFahrzeuge.value.fussverkehr =
            selectOrDeselectAllVerkehrsartenVmodel.value;
    }
}

function selectOrDeselectAll(): void {
    selectOrDeselectAllVmodel.value = !selectOrDeselectAllVmodel.value;
    if (isTypeEnabled(Fahrzeug.PKW)) {
        auswertungOptionsFahrzeuge.value.personenkraftwagen =
            selectOrDeselectAllVmodel.value;
    }
    if (isTypeEnabled(Fahrzeug.LKW)) {
        auswertungOptionsFahrzeuge.value.lastkraftwagen =
            selectOrDeselectAllVmodel.value;
    }
    if (isTypeEnabled(Fahrzeug.LZ)) {
        auswertungOptionsFahrzeuge.value.lastzuege =
            selectOrDeselectAllVmodel.value;
    }
    if (isTypeEnabled(Fahrzeug.BUS)) {
        auswertungOptionsFahrzeuge.value.busse =
            selectOrDeselectAllVmodel.value;
    }
    if (isTypeEnabled(Fahrzeug.KRAD)) {
        auswertungOptionsFahrzeuge.value.kraftraeder =
            selectOrDeselectAllVmodel.value;
    }
    if (isTypeEnabled(Fahrzeug.LFW)) {
        auswertungOptionsFahrzeuge.value.lieferwagen =
            selectOrDeselectAllVmodel.value;
    }
}
function isTypeDisabled(type: string): boolean {
    return false;
}

function isTypeEnabled(type: string): boolean {
    return !isTypeDisabled(type);
}
</script>

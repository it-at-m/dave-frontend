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
                    :disabled="
                        isTypeDisabled(Fahrzeug.KFZ) &&
                        isTypeDisabled(Fahrzeug.RAD)
                    "
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
                    v-model="auswertungOptions.fahrzeuge.kraftfahrzeugverkehr"
                    label="Kraftfahrzeugverkehr (KFZ)"
                    :disabled="isTypeDisabled(Fahrzeug.KFZ)"
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
                    v-model="auswertungOptions.fahrzeuge.schwerverkehr"
                    label="Schwerverkehr (SV)"
                    :disabled="isTypeDisabled(Fahrzeug.SV)"
                    hide-details
                    dense
                ></v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-checkbox
                    v-model="
                        auswertungOptions.fahrzeuge.schwerverkehrsanteilProzent
                    "
                    label="Schwerverkehrsanteil [%]"
                    :disabled="isTypeDisabled(Fahrzeug.SV_P)"
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
                    v-model="auswertungOptions.fahrzeuge.gueterverkehr"
                    label="Güterverkehr (GV)"
                    :disabled="isTypeDisabled(Fahrzeug.GV)"
                    hide-details
                    dense
                ></v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-checkbox
                    v-model="
                        auswertungOptions.fahrzeuge.gueterverkehrsanteilProzent
                    "
                    label="Güterverkehrsanteil [%]"
                    :disabled="isTypeDisabled(Fahrzeug.GV_P)"
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
                    v-model="auswertungOptions.fahrzeuge.radverkehr"
                    label="Radverkehr (Rad)"
                    :disabled="isTypeDisabled(Fahrzeug.RAD)"
                    hide-details
                    dense
                ></v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-checkbox
                    v-model="auswertungOptions.fahrzeuge.fussverkehr"
                    label="Fußgänger (Fuß)"
                    :disabled="isTypeDisabled(Fahrzeug.FUSS)"
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
                    :disabled="isTypeDisabled(Fahrzeug.KFZ)"
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
                    v-model="auswertungOptions.fahrzeuge.personenkraftwagen"
                    label="Personenkraftwagen (Pkw)"
                    :disabled="isTypeDisabled(Fahrzeug.PKW)"
                    hide-details
                    dense
                ></v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-checkbox
                    v-model="auswertungOptions.fahrzeuge.kraftraeder"
                    label="Krafträder (Krad)"
                    :disabled="isTypeDisabled(Fahrzeug.KRAD)"
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
                    v-model="auswertungOptions.fahrzeuge.lastkraftwagen"
                    label="Lastkraftwagen (Lkw)"
                    :disabled="isTypeDisabled(Fahrzeug.LKW)"
                    hide-details
                    dense
                ></v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-checkbox
                    v-model="auswertungOptions.fahrzeuge.lieferwagen"
                    label="Lieferwagen (Lfw)"
                    :disabled="isTypeDisabled(Fahrzeug.LFW)"
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
                    v-model="auswertungOptions.fahrzeuge.lastzuege"
                    label="Lastzüge (Lz)"
                    :disabled="isTypeDisabled(Fahrzeug.LZ)"
                    hide-details
                    dense
                ></v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-checkbox
                    v-model="auswertungOptions.fahrzeuge.busse"
                    label="Bus"
                    :disabled="isTypeDisabled(Fahrzeug.BUS)"
                    hide-details
                    dense
                ></v-checkbox>
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import type MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";
import {computed, onMounted, ref, watch} from "vue";
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

const verkehrsartenWatch = computed(() => {
    return auswertungOptions.value.verfuegbareVerkehrsarten;
});

onMounted(() => {
    calculateSelectOrDeselectVerkehrsarten();
    calculateSelectOrDeselect();
});

watch(verkehrsartenWatch, () => {
    preassignFahrzeuge();
});

function preassignFahrzeuge() {
    const rad = auswertungOptions.value.verfuegbareVerkehrsarten.includes(
        Fahrzeug.RAD
    );
    const kfz = auswertungOptions.value.verfuegbareVerkehrsarten.includes(
        Fahrzeug.KFZ
    );
    resetFahrzeuge();
    if (rad && !kfz) {
        auswertungOptions.value.fahrzeuge.radverkehr = true;
    } else if (!rad && kfz) {
        auswertungOptions.value.fahrzeuge.kraftfahrzeugverkehr = true;
    }
    calculateSelectOrDeselectVerkehrsarten();
    calculateSelectOrDeselect();
}

function resetFahrzeuge() {
    auswertungOptions.value.fahrzeuge.kraftfahrzeugverkehr = false;
    auswertungOptions.value.fahrzeuge.schwerverkehr = false;
    auswertungOptions.value.fahrzeuge.gueterverkehr = false;
    auswertungOptions.value.fahrzeuge.schwerverkehrsanteilProzent = false;
    auswertungOptions.value.fahrzeuge.gueterverkehrsanteilProzent = false;
    auswertungOptions.value.fahrzeuge.radverkehr = false;
    auswertungOptions.value.fahrzeuge.fussverkehr = false;
    auswertungOptions.value.fahrzeuge.lastkraftwagen = false;
    auswertungOptions.value.fahrzeuge.lastzuege = false;
    auswertungOptions.value.fahrzeuge.busse = false;
    auswertungOptions.value.fahrzeuge.kraftraeder = false;
    auswertungOptions.value.fahrzeuge.personenkraftwagen = false;
    auswertungOptions.value.fahrzeuge.lieferwagen = false;
}

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
        if (auswertungOptions.value.fahrzeuge.kraftfahrzeugverkehr) {
            counter++;
        }
        maxSelectable++;
    }
    if (isTypeEnabled(Fahrzeug.SV)) {
        if (auswertungOptions.value.fahrzeuge.schwerverkehr) {
            counter++;
        }
        maxSelectable++;
    }
    if (isTypeEnabled(Fahrzeug.GV)) {
        if (auswertungOptions.value.fahrzeuge.gueterverkehr) {
            counter++;
        }
        maxSelectable++;
    }
    if (isTypeEnabled(Fahrzeug.SV_P)) {
        if (auswertungOptions.value.fahrzeuge.schwerverkehrsanteilProzent) {
            counter++;
        }
        maxSelectable++;
    }
    if (isTypeEnabled(Fahrzeug.GV_P)) {
        if (auswertungOptions.value.fahrzeuge.gueterverkehrsanteilProzent) {
            counter++;
        }
        maxSelectable++;
    }
    if (isTypeEnabled(Fahrzeug.RAD)) {
        if (auswertungOptions.value.fahrzeuge.radverkehr) {
            counter++;
        }
        maxSelectable++;
    }
    if (isTypeEnabled(Fahrzeug.FUSS)) {
        if (auswertungOptions.value.fahrzeuge.fussverkehr) {
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
        if (auswertungOptions.value.fahrzeuge.personenkraftwagen) {
            counter++;
        }
        maxSelectable++;
    }
    if (isTypeEnabled(Fahrzeug.LKW)) {
        if (auswertungOptions.value.fahrzeuge.lastkraftwagen) {
            counter++;
        }
        maxSelectable++;
    }
    if (isTypeEnabled(Fahrzeug.LZ)) {
        if (auswertungOptions.value.fahrzeuge.lastzuege) {
            counter++;
        }
        maxSelectable++;
    }
    if (isTypeEnabled(Fahrzeug.BUS)) {
        if (auswertungOptions.value.fahrzeuge.busse) {
            counter++;
        }
        maxSelectable++;
    }
    if (isTypeEnabled(Fahrzeug.KRAD)) {
        if (auswertungOptions.value.fahrzeuge.kraftraeder) {
            counter++;
        }
        maxSelectable++;
    }
    if (isTypeEnabled(Fahrzeug.LFW)) {
        if (auswertungOptions.value.fahrzeuge.lieferwagen) {
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
        auswertungOptions.value.fahrzeuge.kraftfahrzeugverkehr =
            selectOrDeselectAllVerkehrsartenVmodel.value;
    }
    if (isTypeEnabled(Fahrzeug.SV)) {
        auswertungOptions.value.fahrzeuge.schwerverkehr =
            selectOrDeselectAllVerkehrsartenVmodel.value;
    }
    if (isTypeEnabled(Fahrzeug.GV)) {
        auswertungOptions.value.fahrzeuge.gueterverkehr =
            selectOrDeselectAllVerkehrsartenVmodel.value;
    }
    if (isTypeEnabled(Fahrzeug.SV_P)) {
        auswertungOptions.value.fahrzeuge.schwerverkehrsanteilProzent =
            selectOrDeselectAllVerkehrsartenVmodel.value;
    }
    if (isTypeEnabled(Fahrzeug.GV_P)) {
        auswertungOptions.value.fahrzeuge.gueterverkehrsanteilProzent =
            selectOrDeselectAllVerkehrsartenVmodel.value;
    }
    if (isTypeEnabled(Fahrzeug.RAD)) {
        auswertungOptions.value.fahrzeuge.radverkehr =
            selectOrDeselectAllVerkehrsartenVmodel.value;
    }
    if (isTypeEnabled(Fahrzeug.FUSS)) {
        auswertungOptions.value.fahrzeuge.fussverkehr =
            selectOrDeselectAllVerkehrsartenVmodel.value;
    }
}

function selectOrDeselectAll(): void {
    selectOrDeselectAllVmodel.value = !selectOrDeselectAllVmodel.value;
    if (isTypeEnabled(Fahrzeug.PKW)) {
        auswertungOptions.value.fahrzeuge.personenkraftwagen =
            selectOrDeselectAllVmodel.value;
    }
    if (isTypeEnabled(Fahrzeug.LKW)) {
        auswertungOptions.value.fahrzeuge.lastkraftwagen =
            selectOrDeselectAllVmodel.value;
    }
    if (isTypeEnabled(Fahrzeug.LZ)) {
        auswertungOptions.value.fahrzeuge.lastzuege =
            selectOrDeselectAllVmodel.value;
    }
    if (isTypeEnabled(Fahrzeug.BUS)) {
        auswertungOptions.value.fahrzeuge.busse =
            selectOrDeselectAllVmodel.value;
    }
    if (isTypeEnabled(Fahrzeug.KRAD)) {
        auswertungOptions.value.fahrzeuge.kraftraeder =
            selectOrDeselectAllVmodel.value;
    }
    if (isTypeEnabled(Fahrzeug.LFW)) {
        auswertungOptions.value.fahrzeuge.lieferwagen =
            selectOrDeselectAllVmodel.value;
    }
}
function isTypeDisabled(type: string): boolean {
    return !isTypeEnabled(type);
}

function isTypeEnabled(type: string): boolean {
    if (type === Fahrzeug.RAD) {
        return auswertungOptions.value.verfuegbareVerkehrsarten.includes(type);
    } else if (type === Fahrzeug.FUSS) {
        return false;
    } else {
        return auswertungOptions.value.verfuegbareVerkehrsarten.includes(
            Fahrzeug.KFZ
        );
    }
}
</script>

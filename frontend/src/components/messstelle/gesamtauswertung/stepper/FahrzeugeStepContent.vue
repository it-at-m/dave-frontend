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
          class="text-none"
          density="compact"
          :disabled="
            isTypeDisabled(Fahrzeug.KFZ) && isTypeDisabled(Fahrzeug.RAD)
          "
          :text="labelSelectOrDeselectAllVerkehrsarten"
          @click="selectOrDeselectAllVerkehrsarten()"
        />
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
          density="compact"
        />
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
          density="compact"
        />
      </v-col>
      <v-col cols="6">
        <v-checkbox
          v-model="auswertungOptions.fahrzeuge.schwerverkehrsanteilProzent"
          label="Schwerverkehrsanteil [%]"
          :disabled="isTypeDisabled(Fahrzeug.SV_P)"
          hide-details
          density="compact"
        />
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
          density="compact"
        />
      </v-col>
      <v-col cols="6">
        <v-checkbox
          v-model="auswertungOptions.fahrzeuge.gueterverkehrsanteilProzent"
          label="Güterverkehrsanteil [%]"
          :disabled="isTypeDisabled(Fahrzeug.GV_P)"
          hide-details
          density="compact"
        />
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
          density="compact"
        />
      </v-col>
      <v-col cols="6">
        <v-checkbox
          v-model="auswertungOptions.fahrzeuge.fussverkehr"
          label="Fußgänger (Fuß)"
          :disabled="isTypeDisabled(Fahrzeug.FUSS)"
          hide-details
          density="compact"
        />
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
          class="text-none"
          density="compact"
          :disabled="isTypeDisabled(Fahrzeug.KFZ)"
          :text="labelSelectOrDeselectAll"
          @click="selectOrDeselectAll()"
        />
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
          density="compact"
        />
      </v-col>
      <v-col cols="6">
        <v-checkbox
          v-model="auswertungOptions.fahrzeuge.kraftraeder"
          label="Krafträder (Krad)"
          :disabled="isTypeDisabled(Fahrzeug.KRAD)"
          hide-details
          density="compact"
        />
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
          density="compact"
        />
      </v-col>
      <v-col cols="6">
        <v-checkbox
          v-model="auswertungOptions.fahrzeuge.lieferwagen"
          label="Lieferwagen (Lfw)"
          :disabled="isTypeDisabled(Fahrzeug.LFW)"
          hide-details
          density="compact"
        />
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
          density="compact"
        />
      </v-col>
      <v-col cols="6">
        <v-checkbox
          v-model="auswertungOptions.fahrzeuge.busse"
          label="Bus"
          :disabled="isTypeDisabled(Fahrzeug.BUS)"
          hide-details
          density="compact"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import type MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";

import { computed, onMounted, ref } from "vue";

import Fahrzeug from "@/types/enum/Fahrzeug";

const auswertungOptions = defineModel<MessstelleAuswertungOptionsDTO>({
  required: true,
});

const selectOrDeselectAllVerkehrsartenVmodel = ref(false);
const selectOrDeselectAllVmodel = ref(false);

onMounted(() => {
  calculateSelectOrDeselectVerkehrsarten();
  calculateSelectOrDeselect();
});

const labelSelectOrDeselectAllVerkehrsarten = computed(() => {
  return selectOrDeselectAllVerkehrsartenVmodel.value
    ? "Alles abwählen"
    : "Alles auswählen";
});

const labelSelectOrDeselectAll = computed(() => {
  return selectOrDeselectAllVmodel.value ? "Alles abwählen" : "Alles auswählen";
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
    auswertungOptions.value.fahrzeuge.busse = selectOrDeselectAllVmodel.value;
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

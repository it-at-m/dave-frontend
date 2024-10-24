<template>
  <div>
    <v-autocomplete
      v-model="auswertungOptions.mstIds"
      :items="messstellen"
      class="mt-4"
      density="compact"
      chips
      label="Messstellen"
      multiple
      clearable
      :disabled="disableMessstelle"
      persistent-hint
      variant="outlined"
      closable-chips
      :hint="messstelleHint"
    >
      <template #prepend-item>
        <v-btn
          class="text-none"
          width="100%"
          variant="flat"
          :text="buttonText"
          @click="buttonClick"
        />
      </template>
    </v-autocomplete>

    <div v-if="auswertungOptions.mstIds.length === 1">
      <v-autocomplete
        v-model="direction"
        label="Richtung"
        :items="richtungValues"
        variant="filled"
        density="compact"
        :readonly="richtungValues.length === 1"
        persistent-hint
        :hint="directionHint"
        @update:model-value="preassignMqIdsInOptions"
      />

      <v-autocomplete
        v-model="auswertungOptions.mqIds"
        label="Lage"
        :items="lageValues"
        :readonly="isLageReadonly"
        variant="filled"
        density="compact"
        multiple
        :rules="[REQUIRED]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type KeyVal from "@/types/common/KeyVal";
import type MessquerschnittAuswertungDTO from "@/types/messstelle/auswertung/MessquerschnittAuswertungDTO";
import type MessstelleAuswertungDTO from "@/types/messstelle/auswertung/MessstelleAuswertungDTO";
import type MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";

import { computed, onMounted, ref, watch } from "vue";

import MessstelleAuswertungService from "@/api/service/MessstelleAuswertungService";
import { himmelsRichtungenTextLong } from "@/types/enum/Himmelsrichtungen";
import { useMessstelleUtils } from "@/util/MessstelleUtils";

const auswertungOptions = defineModel<MessstelleAuswertungOptionsDTO>({
  required: true,
});

const messstelleUtils = useMessstelleUtils();

onMounted(() => {
  loadAllVisibleMessstellen();
});

const allVisibleMessstellen = ref<Array<MessstelleAuswertungDTO>>([]);
const direction = ref(messstelleUtils.alleRichtungen);

watch(
  () => auswertungOptions.value.mstIds,
  () => {
    setDefaultDirection();
    setVerfuegbareVerkehrsarten();
  }
);

const messstellen = computed<Array<KeyVal>>(() => {
  const result: Array<KeyVal> = [];
  allVisibleMessstellen.value.forEach((mst) => {
    result.push({
      title: `${mst.mstId}-${mst.standort ?? ""} (${
        mst.detektierteVerkehrsarten ?? ""
      })`,
      value: mst.mstId,
    });
  });
  return result;
});

const richtungValues = computed<Array<KeyVal>>(() => {
  const result: Array<KeyVal> = [];
  if (auswertungOptions.value.mstIds.length === 1) {
    for (const messstelle of allVisibleMessstellen.value) {
      if (messstelle.mstId === auswertungOptions.value.mstIds[0]) {
        if (messstelle.messquerschnitte.length > 1) {
          result.push({
            title: messstelleUtils.alleRichtungen,
            value: messstelleUtils.alleRichtungen,
          });
        }
        messstelle.messquerschnitte.forEach(
          (querschnitt: MessquerschnittAuswertungDTO) => {
            const keyVal: KeyVal = {
              title:
                himmelsRichtungenTextLong.get(querschnitt.fahrtrichtung) ??
                "Fehler bei der Bestimmung der Himmelsrichtung.",
              value: querschnitt.fahrtrichtung,
            };
            if (!result.includes(keyVal)) {
              result.push(keyVal);
            }
          }
        );
        break;
      }
    }
  }
  return result;
});

const lageValues = computed<Array<KeyVal>>(() => {
  const result: Array<KeyVal> = [];
  if (auswertungOptions.value.mstIds.length === 1) {
    for (const messstelle of allVisibleMessstellen.value) {
      if (messstelle.mstId === auswertungOptions.value.mstIds[0]) {
        messstelle.messquerschnitte.forEach(
          (querschnitt: MessquerschnittAuswertungDTO) => {
            if (
              querschnitt.fahrtrichtung === direction.value ||
              direction.value === messstelleUtils.alleRichtungen
            ) {
              result.push({
                title: `${querschnitt.mqId} - ${querschnitt.standort}`,
                value: querschnitt.mqId,
              });
            }
          }
        );
        break;
      }
    }
  }
  return result;
});

const isLageReadonly = computed(() => {
  return (
    direction.value === messstelleUtils.alleRichtungen ||
    lageValues.value.length === 1
  );
});

const showSelectAllButton = computed(() => {
  return (
    auswertungOptions.value.mstIds.length <=
    allVisibleMessstellen.value.length / 2
  );
});

const directionHint = computed(() => {
  let hint = "";
  if (auswertungOptions.value.mstIds.length > 1) {
    hint =
      "Wenn mehrere Messstellen ausgewählt wurden, kann kein Messquerschnitt ausgewählt werden.";
  }
  return hint;
});

const messstelleHint = computed(() => {
  let hint = "";
  if (auswertungOptions.value.mstIds.length > 1) {
    hint =
      "Wenn mehrere Messstellen ausgewählt wurden, kann kein Messquerschnitt ausgewählt werden.";
  } else if (disableMessstelle.value) {
    hint =
      "Wenn ein Messquerschnitt ausgewählt wurde, kann die Messstelle nicht mehr geändert werden.";
  }
  return hint;
});

const disableMessstelle = computed(() => {
  return (
    auswertungOptions.value.mqIds.length !== 0 &&
    direction.value !== messstelleUtils.alleRichtungen &&
    auswertungOptions.value.mqIds.length > 0 &&
    richtungValues.value.length > 1
  );
});

const buttonText = computed(() => {
  return showSelectAllButton.value ? "Alle auswählen" : "Alle abwählen";
});

function loadAllVisibleMessstellen(): void {
  MessstelleAuswertungService.getAllVisibleMessstellen().then(
    (messstellen: Array<MessstelleAuswertungDTO>) => {
      allVisibleMessstellen.value = messstellen;
    }
  );
}

function setDefaultDirection(): void {
  resetMqsIfNecessary();
  if (auswertungOptions.value.mstIds.length === 1) {
    for (const messstelle of allVisibleMessstellen.value) {
      if (messstelle.mstId === auswertungOptions.value.mstIds[0]) {
        if (messstelle.messquerschnitte.length === 1) {
          direction.value = messstelle.messquerschnitte[0].fahrtrichtung;
        } else if (messstelle.messquerschnitte.length > 1) {
          direction.value = messstelleUtils.alleRichtungen;
        }
      }
    }
    preassignMqIdsInOptions();
  }
}

function setVerfuegbareVerkehrsarten() {
  auswertungOptions.value.verfuegbareVerkehrsarten = [];
  if (auswertungOptions.value.mstIds.length > 0) {
    for (const messstelle of allVisibleMessstellen.value) {
      if (
        auswertungOptions.value.mstIds.includes(messstelle.mstId) &&
        !auswertungOptions.value.verfuegbareVerkehrsarten.includes(
          messstelle.detektierteVerkehrsarten
        )
      ) {
        auswertungOptions.value.verfuegbareVerkehrsarten.push(
          messstelle.detektierteVerkehrsarten
        );
      }
      if (auswertungOptions.value.verfuegbareVerkehrsarten.length === 2) {
        break;
      }
    }
  }
}

function preassignMqIdsInOptions() {
  auswertungOptions.value.mqIds = [];
  lageValues.value.forEach((value) =>
    auswertungOptions.value.mqIds.push(value.value)
  );
}

function buttonClick() {
  if (showSelectAllButton.value) {
    selectAllMessstellen();
  } else {
    deselectAllMessstellen();
  }
}

function selectAllMessstellen() {
  auswertungOptions.value.mstIds = [];
  allVisibleMessstellen.value.forEach((mst: MessstelleAuswertungDTO) => {
    auswertungOptions.value.mstIds.push(mst.mstId);
  });
}

function deselectAllMessstellen() {
  auswertungOptions.value.mstIds = [];
}

function resetMqsIfNecessary() {
  if (auswertungOptions.value.mstIds.length > 1)
    auswertungOptions.value.mqIds = [];
}

function REQUIRED(v: Array<string>) {
  if (v.length > 0) return true;
  return "Es muss mindestens ein Messquerschnitt ausgewählt sein.";
}
</script>

<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      <div>
        <v-icon
          start
          icon="mdi-arrow-decision"
        />
        Messquerschnitt
      </div>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <panel-header
        font-size="0.875rem"
        font-weight="bold"
        padding="10px 0 0 0"
        header-text="Vorhandene Messquerschnitte (Richtungen)"
      />
      <v-row no-gutters>
        <v-col cols="4">
          <v-select
            v-model="direction"
            label="Richtung"
            :items="richtungValues"
            :disabled="richtungValues.length === 1"
            variant="filled"
            density="compact"
            @update:model-value="updateOptions"
            @mouseover="hoverDirection = true"
            @mouseleave="hoverDirection = false"
          />
        </v-col>
        <v-spacer />
        <v-col cols="4">
          <v-card
            variant="flat"
            height="72px"
          >
            {{ helpTextDirection }}
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="4">
          <v-select
            v-model="chosenOptionsCopy.messquerschnittIds"
            label="Lage"
            :items="lageValues"
            :disabled="isLageReadonly"
            variant="filled"
            multiple
            :rules="[REQUIRED]"
            density="compact"
            @update:model-value="updateLage"
            @mouseover="hoverLage = true"
            @mouseleave="hoverLage = false"
          />
        </v-col>
        <v-spacer />
        <v-col cols="4">
          <v-card flat>
            <div v-if="hoverLage">{{ helpTextLageHover }}</div>
            <div>{{ helpTextLage }}</div>
          </v-card>
        </v-col>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import type KeyVal from "@/types/common/KeyVal";
import type MessquerschnittInfoDTO from "@/types/messstelle/MessquerschnittInfoDTO";
import type MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

import { cloneDeep } from "lodash";
import { computed, ref, watch } from "vue";

import PanelHeader from "@/components/common/PanelHeader.vue";
import { useMessstelleStore } from "@/store/MessstelleStore";
import Himmelsrichtungen, {
  himmelsRichtungenTextLong,
} from "@/types/enum/Himmelsrichtungen";
import { useMessstelleUtils } from "@/util/MessstelleUtils";

const chosenOptionsCopy = defineModel<MessstelleOptionsDTO>({ required: true });

const hoverDirection = ref(false);
const hoverLage = ref(false);
const messstelleStore = useMessstelleStore();
const messstelleUtils = useMessstelleUtils();

const MIND_EIN_MESSQUERSCHNITT =
  "Es muss mindestens ein Messquerschnitt ausgewählt sein.";

const messstelle = computed<MessstelleInfoDTO>(() => {
  return messstelleStore.getMessstelleInfo;
});

const isLageReadonly = computed(() => {
  return (
    direction.value === messstelleUtils.alleRichtungen ||
    lageValues.value.length === 1
  );
});

const direction = computed({
  get: () => messstelleStore.getDirection,
  set: (payload: string) => messstelleStore.setDirection(payload),
});

const richtungValues = computed<Array<KeyVal>>(() => {
  const result: Array<KeyVal> = [];
  const exisitingDirection: Array<Himmelsrichtungen> = [];
  if (messstelle.value.messquerschnitte.length > 1) {
    result.push({
      title: messstelleUtils.alleRichtungen,
      value: messstelleUtils.alleRichtungen,
    });
  }
  messstelle.value.messquerschnitte.forEach(
    (querschnitt: MessquerschnittInfoDTO) => {
      let himmelsrichtungAsText = himmelsRichtungenTextLong.get(
        querschnitt.fahrtrichtung
      );
      if (himmelsrichtungAsText === undefined) {
        himmelsrichtungAsText =
          "Fehler bei der Bestimmung der Himmelsrichtung.";
      }
      if (!exisitingDirection.includes(querschnitt.fahrtrichtung)) {
        const keyVal: KeyVal = {
          title: himmelsrichtungAsText,
          value: querschnitt.fahrtrichtung,
        };
        result.push(keyVal);
        exisitingDirection.push(querschnitt.fahrtrichtung);
      }
    }
  );
  return result;
});

const lageValues = computed<Array<KeyVal>>(() => {
  const result: Array<KeyVal> = [];
  if (messstelle.value.messquerschnitte) {
    messstelle.value.messquerschnitte.forEach(
      (querschnitt: MessquerschnittInfoDTO) => {
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
  }
  return result;
});

const helpTextDirection = computed(() => {
  let text = "";
  if (hoverDirection.value) {
    text =
      "Ein Messquerschnitt beinhaltet die Daten aller Fahrstreifen einer Richtung.";
  }
  return text;
});

const helpTextLage = computed(() => {
  let text = "";
  if (direction.value === messstelleUtils.alleRichtungen) {
    text =
      "Hinweis: Um einzelne Messquerschnitte auszuwählen, muss zuvor eine Richtung bestimmt werden.";
  } else if (chosenOptionsCopy.value.messquerschnittIds.length === 0) {
    text = MIND_EIN_MESSQUERSCHNITT;
  }
  return text;
});

const helpTextLageHover = computed(() => {
  let text = "";
  if (
    direction.value !== messstelleUtils.alleRichtungen &&
    lageValues.value.length === 1
  ) {
    text = "Für die gewählte Richtung liegt nur ein Messquerschnitt vor.";
  }
  return text;
});

const zeitauswahl = computed(() => {
  return chosenOptionsCopy.value.zeitauswahl;
});

const previousSelectedStructures = ref<Array<string>>(
  chosenOptionsCopy.value.messquerschnittIds
);

watch(zeitauswahl, () => {
  previousSelectedStructures.value = chosenOptionsCopy.value.messquerschnittIds;
});

function updateOptions() {
  chosenOptionsCopy.value.messquerschnittIds = [];
  lageValues.value.forEach((value) =>
    chosenOptionsCopy.value.messquerschnittIds.push(value.value)
  );

  previousSelectedStructures.value = cloneDeep(
    chosenOptionsCopy.value.messquerschnittIds
  );
}

function updateLage(lageValue: Array<string>) {
  previousSelectedStructures.value = lageValue;
}

function REQUIRED(v: Array<string>) {
  if (v.length > 0) return true;
  return MIND_EIN_MESSQUERSCHNITT;
}
</script>

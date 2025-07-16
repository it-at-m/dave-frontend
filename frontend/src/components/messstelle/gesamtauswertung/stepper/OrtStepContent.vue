<template>
  <div>
    <v-autocomplete
      v-model="selectedMsts"
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
      @update:model-value="selectMessstellen"
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

    <div v-if="selectedMsts.length === 1">
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
        v-model="selectedMqs"
        label="Lage"
        :items="lageValues"
        :readonly="isLageReadonly"
        variant="filled"
        density="compact"
        multiple
        :rules="[REQUIRED]"
        @update:model-value="saveIds"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type KeyVal from "@/types/common/KeyVal";
import type KeyValObject from "@/types/common/KeyValObject";
import type MessquerschnittAuswertungDTO from "@/types/messstelle/auswertung/MessquerschnittAuswertungDTO";
import type MessstelleAuswertungDTO from "@/types/messstelle/auswertung/MessstelleAuswertungDTO";
import type MessstelleAuswertungIdDTO from "@/types/messstelle/auswertung/MessstelleAuswertungIdDTO";
import type MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";

import { toArray } from "lodash";
import { computed, onMounted, ref } from "vue";

import { himmelsRichtungenTextLong } from "@/types/enum/Himmelsrichtungen";
import { useMessstelleUtils } from "@/util/MessstelleUtils";

const auswertungOptions = defineModel<MessstelleAuswertungOptionsDTO>({
  required: true,
});

interface Props {
  allVisibleMessstellen: Array<MessstelleAuswertungDTO>;
}

const props = defineProps<Props>();

const messstelleUtils = useMessstelleUtils();

const direction = ref("");

const selectedMsts = ref<Array<MessstelleAuswertungDTO>>([]);
const selectedMqs = ref<Array<MessquerschnittAuswertungDTO>>([]);

onMounted(() => {
  const selectedMstIds = auswertungOptions.value.messstelleAuswertungIds.map(
    (value) => value.mstId
  );
  messstellen.value.forEach((messstelle) => {
    if (
      selectedMstIds.includes(
        (messstelle.value as MessstelleAuswertungDTO).mstId
      )
    ) {
      selectedMsts.value.push(messstelle.value as MessstelleAuswertungDTO);
    }
  });
  const selectedMqIds = auswertungOptions.value.messstelleAuswertungIds.flatMap(
    (value) => value.mqIds
  );
  if (selectedMsts.value.length === 1) {
    selectedMqs.value = selectedMsts.value[0].messquerschnitte.filter(
      (messquerschnitt) => selectedMqIds.includes(messquerschnitt.mqId)
    );
  } else if (selectedMsts.value.length > 1) {
    selectedMqs.value = selectedMsts.value.flatMap(
      (messstelle) => messstelle.messquerschnitte
    );
  }
  if (selectedMqs.value.length === 1) {
    direction.value = selectedMqs.value[0].fahrtrichtung;
  } else if (selectedMqs.value.length > 1) {
    const unique = [
      ...new Set(
        selectedMqs.value.map(
          (messquerschnitt) => messquerschnitt.fahrtrichtung
        )
      ),
    ];
    if (unique.length === 1) {
      direction.value = selectedMqs.value[0].fahrtrichtung;
    } else {
      direction.value = messstelleUtils.alleRichtungen;
    }
  }
});

function selectMessstellen() {
  setDefaultDirection();
  if (selectedMsts.value.length >= 1) {
    auswertungOptions.value.messstelleAuswertungIds = [];
    selectedMsts.value.forEach((messstelleAuswertungId) => {
      const item = {
        mstId: messstelleAuswertungId.mstId,
        mqIds: toArray(messstelleAuswertungId.messquerschnitte).map(
          (mq) => mq.mqId
        ),
      } as MessstelleAuswertungIdDTO;
      auswertungOptions.value.messstelleAuswertungIds.push(item);
    });
    setVerfuegbareVerkehrsarten();
  }
}

function saveIds() {
  const item = {
    mstId: selectedMsts.value[0].mstId,
    mqIds: toArray(selectedMqs.value).map((mq) => mq.mqId),
  } as MessstelleAuswertungIdDTO;
  auswertungOptions.value.messstelleAuswertungIds = [item];
  // setVerfuegbareVerkehrsarten();
}

const messstellen = computed<Array<KeyValObject>>(() => {
  const result: Array<KeyValObject> = props.allVisibleMessstellen.map((mst) => {
    return {
      title: `${mst.mstId}-${mst.standort ?? ""} (${
        mst.detektierteVerkehrsarten ?? ""
      })`,
      value: mst,
    };
  });
  return result;
});

const richtungValues = computed<Array<KeyVal>>(() => {
  const result: Array<KeyVal> = [];
  if (selectedMsts.value.length === 1) {
    if (selectedMsts.value[0].messquerschnitte.length > 1) {
      result.push({
        title: messstelleUtils.alleRichtungen,
        value: messstelleUtils.alleRichtungen,
      });
    }
    selectedMsts.value[0].messquerschnitte.forEach(
      (querschnitt: MessquerschnittAuswertungDTO) => {
        const keyVal: KeyVal = {
          title:
            himmelsRichtungenTextLong.get(querschnitt.fahrtrichtung) ??
            "Fehler bei der Bestimmung der Himmelsrichtung.",
          value: querschnitt.fahrtrichtung,
        };
        if (
          result.filter((entry) => {
            return entry.title === keyVal.title;
          }).length === 0
        ) {
          result.push(keyVal);
        }
      }
    );
  }
  return result;
});

const lageValues = computed<Array<KeyValObject>>(() => {
  const result: Array<KeyValObject> = [];
  if (selectedMsts.value.length === 1) {
    selectedMsts.value[0].messquerschnitte.forEach(
      (querschnitt: MessquerschnittAuswertungDTO) => {
        if (
          querschnitt.fahrtrichtung === direction.value ||
          direction.value === messstelleUtils.alleRichtungen
        ) {
          result.push({
            title: `${querschnitt.mqId} - ${querschnitt.standort}`,
            value: querschnitt,
          });
        }
      }
    );
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
    auswertungOptions.value.messstelleAuswertungIds.length <=
    props.allVisibleMessstellen.length / 2
  );
});

const directionHint = computed(() => {
  let hint = "";
  if (auswertungOptions.value.messstelleAuswertungIds.length > 1) {
    hint =
      "Wenn mehrere Messstellen ausgewählt wurden, kann kein Messquerschnitt ausgewählt werden.";
  }
  return hint;
});

const messstelleHint = computed(() => {
  let hint = "";
  if (auswertungOptions.value.messstelleAuswertungIds.length > 1) {
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
    auswertungOptions.value.messstelleAuswertungIds.length > 0 &&
    auswertungOptions.value.messstelleAuswertungIds[0].mqIds.length > 0 &&
    direction.value !== messstelleUtils.alleRichtungen &&
    richtungValues.value.length > 1
  );
});

const buttonText = computed(() => {
  return showSelectAllButton.value ? "Alle auswählen" : "Alle abwählen";
});

function setDefaultDirection(): void {
  if (selectedMsts.value.length === 1) {
    if (selectedMsts.value[0].messquerschnitte.length === 1) {
      direction.value = selectedMsts.value[0].messquerschnitte[0].fahrtrichtung;
    } else if (selectedMsts.value[0].messquerschnitte.length > 1) {
      direction.value = messstelleUtils.alleRichtungen;
    }
    preassignMqIdsInOptions();
  }
}

function setVerfuegbareVerkehrsarten() {
  auswertungOptions.value.verfuegbareVerkehrsarten = [];
  if (auswertungOptions.value.messstelleAuswertungIds.length > 0) {
    for (const messstelle of props.allVisibleMessstellen) {
      if (
        existsMstIdInAuswertungIds(messstelle.mstId) &&
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

function existsMstIdInAuswertungIds(mstId: string) {
  return auswertungOptions.value.messstelleAuswertungIds.find(
    (value) => value.mstId === mstId
  );
}

function preassignMqIdsInOptions() {
  selectedMqs.value = toArray(
    lageValues.value.map((value) => value.value as MessquerschnittAuswertungDTO)
  );
  saveIds();
}

function buttonClick() {
  if (showSelectAllButton.value) {
    selectAllMessstellen();
  } else {
    deselectAllMessstellen();
  }
}

function selectAllMessstellen() {
  auswertungOptions.value.messstelleAuswertungIds =
    props.allVisibleMessstellen.map((mst) => {
      const item = { mstId: mst.mstId, mqIds: [] } as MessstelleAuswertungIdDTO;
      item.mqIds = mst.messquerschnitte.map((mq) => mq.mqId);
      return item;
    });
}

function deselectAllMessstellen() {
  auswertungOptions.value.messstelleAuswertungIds = [];
}

function REQUIRED(v: Array<string>) {
  if (v.length > 0) return true;
  return "Es muss mindestens ein Messquerschnitt ausgewählt sein.";
}
</script>

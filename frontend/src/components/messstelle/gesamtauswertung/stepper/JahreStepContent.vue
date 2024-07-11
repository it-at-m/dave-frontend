<template>
    <v-autocomplete
        v-model="auswertungOptions.jahre"
        :items="jahre"
        class="mt-4"
        density="compact"
        label="Jahre"
        multiple
        chips
        clearable
        closable-chips
        variant="outlined"
    >
      <template #append-item>
        <v-btn
            class="text-none"
            width="100%"
            flat
            :text="buttonText"
            @click="buttonClick"
        ></v-btn>
      </template>
    </v-autocomplete>
</template>

<script setup lang="ts">
import {computed} from "vue";
import type KeyVal from "@/types/common/KeyVal";
import type MessstelleAuswertungOptionsDTO from "@/types/messstelle/auswertung/MessstelleAuswertungOptionsDTO";

const auswertungOptions = defineModel<MessstelleAuswertungOptionsDTO>({required: true});

const jahre  = computed<Array<KeyVal>>(() => {
    const result: Array<KeyVal> = [];
    const actualDate = new Date();
    for (let index = 2006; index <= actualDate.getFullYear(); index++) {
        result.push({
            title: `${index}`,
            value: `${index}`,
        });
    }
    return result;
});

const showSelectAllButton = computed(() => {
  const helper = jahre.value.length / 2;
  return auswertungOptions.value.jahre.length <= helper;
});

const buttonText = computed(() => {
  return showSelectAllButton.value ? "Alle auswählen" : "Alle abwählen";
});

function buttonClick() {
  if (showSelectAllButton.value) {
    selectAll();
  } else {
    deselectAll();
  }
}

function selectAll() {
  auswertungOptions.value.jahre = [];
  jahre.value.forEach(item => {
    auswertungOptions.value.jahre.push(item.value);
  })
}

function deselectAll() {
  auswertungOptions.value.jahre = [];
}
</script>

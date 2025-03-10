<template>
  <!-- https://vue3datepicker.com/ -->
  <vue-date-picker
    v-model="choosenDate"
    class="ml-1 mt-2 mb-3"
    position="left"
    placeholder="Datum eingeben ..."
    auto-apply
    :config="GENERAL_DATE_PICKER_CONFIG"
    :text-input="TEXT_INPUT_OPTIONS"
    :locale="LOCAL_OPTIONS"
    :format="TEXT_INPUT_OPTIONS.format"
    :enable-time-picker="false"
    :disabled="props.disabled"
    :required="props.required"
    :clearable="false"
    ignore-time-validation
    :teleport="true"
    :week-numbers="WEEK_NUMBER_OPTIONS"
    :six-weeks="SIX_WEEK_CALENDAR_OPTIONS"
    :markers="markers"
  >
    <!--    https://vue3datepicker.com/props/look-and-feel/#day-class-->
    <template
      #dp-input="{
        value,
        onInput,
        onEnter,
        onTab,
        onClear,
        onBlur,
        onKeypress,
        onPaste,
        onFocus,
      }"
    >
      <v-text-field
        :label="label"
        :model-value="value"
        :disabled="props.disabled"
        :required="props.required"
        variant="filled"
        density="compact"
        clearable
        @blur="onBlur"
        @input="onInput"
        @click:clear="onClear"
        @keyup.enter="onEnter"
        @keyup.tab="onTab"
        @keyup="onKeypress"
        @paste="onPaste"
        @focus="onFocus"
      />
    </template>
  </vue-date-picker>
</template>

<script setup lang="ts">
import type { DatePickerMarker, GeneralConfig } from "@vuepic/vue-datepicker";

import VueDatePicker from "@vuepic/vue-datepicker";

import "@vuepic/vue-datepicker/dist/main.css";

import { isNil } from "lodash";
import { computed } from "vue";

interface Props {
  label?: string; // Bezeichnung des Datumsfelds
  required?: boolean; // Ist das Datumsfeld ein Pflichtfeld
  disabled?: boolean; // Ob das Datumsfeld deaktiviert sein soll
  auffaelligeTage?: Array<string>;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  required: false,
  disabled: false,
  auffaelligeTage: undefined,
});

const theDate = defineModel<Date | undefined>();

const choosenDate = computed({
  get() {
    let date = undefined;
    if (!isNil(theDate.value)) {
      date = theDate.value;
      date.setHours(5);
    }
    return date;
  },

  set(date: Date | undefined) {
    if (!isNil(date)) {
      date.setHours(5);
    }
    theDate.value = date;
  },
});

// https://vue3datepicker.com/props/localization/#locale
const LOCAL_OPTIONS: string = "de-DE";

// https://vue3datepicker.com/props/look-and-feel/#six-weeks
const SIX_WEEK_CALENDAR_OPTIONS: any = "center";

// https://vue3datepicker.com/props/calendar-configuration/#week-numbers
const WEEK_NUMBER_OPTIONS: any = {
  type: "iso",
};

// https://vue3datepicker.com/props/modes-configuration/#text-input-configuration
const TEXT_INPUT_OPTIONS: any = {
  enterSubmit: true,
  tabSubmit: true,
  format: "dd.MM.yyyy",
};

// https://vue3datepicker.com/props/general-configuration/#config
const GENERAL_DATE_PICKER_CONFIG: GeneralConfig = {
  setDateOnMenuClose: true,
  keepActionRow: false,
};

function getMarker(datum: string) {
  return {
    date: datum,
    type: "line",
    tooltip: [{ text: "auffälliger Tag", color: "red" }],
  } as DatePickerMarker;
}

// https://vue3datepicker.com/props/general-configuration/#markers
const markers = computed(() => {
  const markers: Array<DatePickerMarker> = [];
  if (props.auffaelligeTage) {
    props.auffaelligeTage.forEach((value) => {
      markers.push(getMarker(value));
    });
  }
  return markers;
});
</script>

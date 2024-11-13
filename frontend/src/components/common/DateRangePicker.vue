<template>
  <!-- https://vue3datepicker.com/ -->
  <vue-date-picker
    v-model="dateRange"
    range
    position="left"
    :multi-calendars="MULTI_CALENDAR_OPTIONS"
    class="mb-3"
    placeholder="Datum eingeben ..."
    :config="GENERAL_DATE_PICKER_CONFIG"
    :text-input="TEXT_INPUT_OPTIONS"
    :locale="'de-DE'"
    :format="format"
    :enable-time-picker="false"
    :disabled="props.disabled"
    :required="props.required"
    :clearable="false"
    auto-apply
  >
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
        density="compact"
        :model-value="value"
        variant="underlined"
        validate-on="blur"
        :rules="[(toCheck: string) => validateTextDate(toCheck)]"
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
import type { GeneralConfig } from "@vuepic/vue-datepicker";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useDateUtils } from "@/util/DateUtils";
import _ from "lodash";

interface Props {
  label?: string; // Bezeichnung des Datumsfelds
  required?: boolean; // Ist das Datumsfeld ein Pflichtfeld
  disabled?: boolean; // Ob das Datumsfeld deaktiviert sein soll
  minDate: string; // Ob das Datumsfeld deaktiviert sein soll
  maxDate: string; // Ob das Datumsfeld deaktiviert sein soll
}

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

const props = withDefaults(defineProps<Props>(), {
  label: "",
  required: false,
  disabled: false,
});

const dateRange = defineModel<Array<Date> | undefined>();

const MULTI_CALENDAR_OPTIONS: any = {
  solo: true,
}

// https://vue3datepicker.com/props/modes-configuration/#text-input-configuration
const TEXT_INPUT_OPTIONS: any = {
  enterSubmit: true,
  tabSubmit: true,
  openMenu: "toggle",
  format: "dd.MM.yyyy",
};

// https://vue3datepicker.com/props/general-configuration/#config
const GENERAL_DATE_PICKER_CONFIG: GeneralConfig = {
  setDateOnMenuClose: true,
};

// https://vue3datepicker.com/props/formatting/#format
const format = (dateRange: Array<Date>) => {
  let dateRangeText = "";
  if (!_.isEmpty(dateRange)) {
    const firstDate = _.head(dateRange);
    const firstDateText = _.isNil(firstDate) ? "" : firstDate.toLocaleDateString("de-DE", options);
    const lastDate = _.last(dateRange);
    const lastDateText = _.isNil(lastDate) ? "" : lastDate.toLocaleDateString("de-DE", options);
    dateRangeText = `${firstDateText}  -  ${lastDateText}`;
  }
  return dateRangeText;
};

const dateUtils = useDateUtils();
function validateTextDate(toCheck: string) {
  if (!toCheck) {
    return true;
  }
  return (
    dateUtils.isDateBetweenAsStrings(
      dateUtils.formatDateAsStringToISO(toCheck),
      props.minDate,
      props.maxDate
    ) || "Das eingegebene Datum liegt außerhalb des gültigen Bereichs."
  );
}
</script>

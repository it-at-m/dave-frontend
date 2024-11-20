<template>
  <!-- https://vue3datepicker.com/ -->
  <vue-date-picker
    v-model="choosenDates"
    class="ml-1 mt-2 mb-3"
    range
    position="left"
    :multi-calendars="MULTI_CALENDAR_OPTIONS"
    placeholder="Datum eingeben ..."
    :config="GENERAL_DATE_PICKER_CONFIG"
    :text-input="TEXT_INPUT_OPTIONS"
    :locale="LOCAL_OPTIONS"
    :format="format"
    :enable-time-picker="false"
    :disabled="props.disabled"
    :required="props.required"
    :clearable="false"
    :min-date="minDateProp"
    :max-date="maxDateProp"
    :week-numbers="WEEK_NUMBER_OPTIONS"
    :six-weeks="SIX_WEEK_CALENDAR_OPTIONS"
    cancel-text="Abbrechen"
    select-text="Datum Auswählen"
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
        :model-value="value"
        density="compact"
        variant="underlined"
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

import { head, isEmpty, isNil, last, split, toArray, toString } from "lodash";
import moment from "moment";
import { computed } from "vue";

import { useDateUtils } from "@/util/DateUtils";

interface Props {
  label?: string; // Bezeichnung des Datumsfelds
  required?: boolean; // Ist das Datumsfeld ein Pflichtfeld
  disabled?: boolean; // Ob das Datumsfeld deaktiviert sein soll
  minDate: Date; // Ob das Datumsfeld deaktiviert sein soll
  maxDate: Date; // Ob das Datumsfeld deaktiviert sein soll
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

const minDateProp = computed(() => {
  if (!isNil(props.minDate)) {
    props.minDate.setHours(5);
  }
  return props.minDate;
});

const maxDateProp = computed(() => {
  if (!isNil(props.maxDate)) {
    props.maxDate.setHours(5);
  }
  return props.maxDate;
});

const dateRange = defineModel<Array<Date> | undefined>();

const choosenDates = computed({
  get() {
    return isNil(dateRange.value)
      ? undefined
      : dateRange.value.map((date) => {
          if (!isNil(date)) {
            date.setHours(5);
          }
          return date;
        });
  },

  set(dates: Array<Date> | undefined) {
    dateRange.value = toArray(dates).map((date) => {
      if (!isNil(date)) {
        date.setHours(5);
      }
      return date;
    });
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

// https://vue3datepicker.com/props/modes-configuration/#multi-calendars-configuration
const MULTI_CALENDAR_OPTIONS: any = {
  solo: true,
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
};

// https://vue3datepicker.com/props/formatting/#format
const format = (dateRange: Array<Date>) => {
  let dateRangeText = "";
  if (!isEmpty(dateRange)) {
    const firstDate = head(dateRange);
    const firstDateText = isNil(firstDate)
      ? ""
      : firstDate.toLocaleDateString(LOCAL_OPTIONS, options);
    const lastDate = last(dateRange);
    const lastDateText = isNil(lastDate)
      ? ""
      : lastDate.toLocaleDateString(LOCAL_OPTIONS, options);
    dateRangeText = `${firstDateText}  -  ${lastDateText}`;
  }
  return dateRangeText;
};

function validateTextDate(dateRangeToCheck: string): string | boolean {
  const startAndEndDate = split(dateRangeToCheck, "-").map((date) =>
    date.trim()
  );

  const startDateText = toString(head(startAndEndDate));
  const isStartDateValid = useDateUtils().isDateValid(startDateText);
  if (isStartDateValid) {
    const startDate = new Date(startDateText);
    if (!isNil(minDateProp.value) && startDate < minDateProp.value) {
      const minDatePropText = minDateProp.value.toLocaleDateString(
        LOCAL_OPTIONS,
        options
      );
      return `Das gewählte Startdatum ist vor dem kleinstmöglichen Startdatum ${minDatePropText}`;
    }
    if (!isNil(maxDateProp.value) && startDate > maxDateProp.value) {
      const maxDatePropText = maxDateProp.value.toLocaleDateString(
        LOCAL_OPTIONS,
        options
      );
      return `Das gewählte Startdatum ist nach dem höchstmöglichen Enddatum ${maxDatePropText}`;
    }
  }

  const endDateText = toString(last(startAndEndDate));
  const isEndDateValid = useDateUtils().isDateValid(endDateText);
  if (isEndDateValid) {
    const endDate = new Date(endDateText);
    if (!isNil(minDateProp.value) && endDate < minDateProp.value) {
      const minDatePropText = minDateProp.value.toLocaleDateString(
        LOCAL_OPTIONS,
        options
      );
      return `Das gewählte Enddatum ist vor dem kleinstmöglichen Startdatum ${minDatePropText}`;
    }
    if (!isNil(maxDateProp.value) && endDate > maxDateProp.value) {
      const maxDatePropText = maxDateProp.value.toLocaleDateString(
        LOCAL_OPTIONS,
        options
      );
      return `Das gewählte Enddatum ist nach dem höchstmöglichen Enddatum ${maxDatePropText}`;
    }
  }

  return true;
}
</script>

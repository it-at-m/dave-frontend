<template>
  <v-row class="pl-0 ma-0">
    <v-field-label>
      {{ props.label }}
    </v-field-label>
  </v-row>
  <v-row :class="dateValidationMessage.length > 0 ? 'mb-0' : 'mb-3'">
    <v-col class="my-0" cols="12">
      <!-- https://vue3datepicker.com/ -->
      <vue-date-picker
          v-model="date"
          placeholder="Datum eingeben ..."
          :config="GENERAL_DATE_PICKER_CONFIG"
          :text-input="TEXT_INPUT_OPTIONS"
          :locale="'de-DE'"
          :format="format"
          :enable-time-picker="false"
          :disabled="props.disabled"
          :required="props.required"
          :select-text="'Übernehmen'"
          :cancel-text="'Abbrechen'"
      />
    </v-col>
  </v-row>
  <div
      v-if="dateValidationMessage.length > 0"
      class="pl-2 pt-0 mt-0 mb-3 text-body-2">
      {{ dateValidationMessage}}
  </div>
</template>

<script setup lang="ts">
import VueDatePicker, {type GeneralConfig} from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {useDateUtils} from "@/util/DateUtils";
import {computed} from "vue";
import _ from "lodash";
import moment from "moment";

interface Props {
  label?: string; // Bezeichnung des Datumsfelds
  required?: boolean; // Ist das Datumsfeld ein Pflichtfeld
  disabled?: boolean; // Ob das Datumsfeld deaktiviert sein soll
  minDate: string; // Ob das Datumsfeld deaktiviert sein soll
  maxDate: string; // Ob das Datumsfeld deaktiviert sein soll
}

const options : Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
};

const props = withDefaults(defineProps<Props>(), {
  label: "",
  required: false,
  disabled: false,
});
const date = defineModel<Date | undefined>();

// https://vue3datepicker.com/props/modes-configuration/#text-input-configuration
const TEXT_INPUT_OPTIONS: any = {
  enterSubmit: true,
  tabSubmit: true,
  openMenu: 'toggle',
  format: 'dd.MM.yyyy',
};

// https://vue3datepicker.com/props/general-configuration/#config
const GENERAL_DATE_PICKER_CONFIG: GeneralConfig = {
  setDateOnMenuClose: true,
}

// https://vue3datepicker.com/props/formatting/#format
const format = (date: Date) => {
  return date.toLocaleDateString('de-DE', options);
};

const dateValidationMessage = computed<string>(() => {
  let validationMessage = "";
  if (!_.isNil(date.value) && moment.utc(date.value).isValid()) {
    const dateToCheck = date.value.toLocaleDateString('de-DE', options);
    const isDateBetween = useDateUtils().isDateBetweenAsStrings(
        useDateUtils().formatDateAsStringToISO(dateToCheck),
        props.minDate,
        props.maxDate
    );
    validationMessage = isDateBetween ? "" : "Das eingegebene Datum liegt außerhalb des gültigen Bereichs.";
  }
  return validationMessage;
})
</script>

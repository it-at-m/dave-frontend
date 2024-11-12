<template>
  <v-row class="mb-1">
    <v-col cols="12">
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
</template>

<script setup lang="ts">
import VueDatePicker, {type GeneralConfig} from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

interface Props {
  label?: string; // Bezeichnung des Datumsfelds
  required?: boolean; // Ist das Datumsfeld ein Pflichtfeld
  disabled?: boolean; // Ob das Datumsfeld deaktiviert sein soll
  minDate: string; // Ob das Datumsfeld deaktiviert sein soll
  maxDate: string; // Ob das Datumsfeld deaktiviert sein soll
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  required: false,
  disabled: false,
});
const date = defineModel<Date | undefined>();

// https://vue3datepicker.com/props/modes-configuration/#text-input-configuration
const TEXT_INPUT_OPTIONS = {
  enterSubmit: true,
  tabSubmit: true,
  openMenu: 'toggle',
  format: 'dd.MM.yyyy',
};

// https://vue3datepicker.com/props/general-configuration/#config
const GENERAL_DATE_PICKER_CONFIG = {
  setDateOnMenuClose: true,
}

// https://vue3datepicker.com/props/formatting/#format
const format = (date: Date) => {
  const options : Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  return date.toLocaleDateString('de-DE', options);
};
</script>

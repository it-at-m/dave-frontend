<template>
  <vue-date-picker
      v-model="date"
      placeholder="Datum eingeben ..."
      :text-input="TEXT_INPUT_OPTIONS"
      :format="format"
      :enable-time-picker="false"
  />
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {useDateUtils} from "@/util/DateUtils";

interface Props {
  label?: string; // Bezeichnung des Datumsfelds
  required?: boolean; // Ist das Datumsfeld ein Pflichtfeld
  disabled?: boolean; // Ob das Datumsfeld deaktiviert sein soll
  minDate: string; // Ob das Datumsfeld deaktiviert sein soll
  maxDate: string; // Ob das Datumsfeld deaktiviert sein soll
}

const dateUtils = useDateUtils();

interface Emits {
  (event: "blur", value: Date | undefined): void;
}

const TEXT_INPUT_OPTIONS = {
  format: 'dd.MM.yyyy',
};
const DISPLAY_FORMAT = "DD.MM.YYYY";

const props = withDefaults(defineProps<Props>(), {
  label: "",
  required: false,
  disabled: false,
});
const emit = defineEmits<Emits>();
const date = defineModel<Date | undefined>();

const format = (date: Date) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  } as Intl.DateTimeFormatOptions;
  return date.toLocaleDateString('de-DE', options);
};
function validateTextDate(toCheck: string) {
  return (
      dateUtils.isDateBetweenAsStrings(
          dateUtils.formatDateAsStringToISO(toCheck),
          props.minDate,
          props.maxDate
      ) || "Das eingegebene Datum liegt außerhalb des gültigen Bereichs."
  );
};
</script>

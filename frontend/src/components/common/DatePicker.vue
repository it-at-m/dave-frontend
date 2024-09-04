<template>
  <v-dialog
    v-model="datePickerActive"
    width="290px"
  >
    <template #activator="{ props: activatorProps }">
      <v-text-field
        id="datum"
        v-model="textFieldDate"
        variant="underlined"
        validate-on="input"
        :hint="displayFormat"
        :disabled="disabled"
        :required="required"
        density="compact"
        :rules="[(toCheck) => validateTextDate(toCheck)]"
        @blur="blur"
      >
        <template #label>
          {{ label }}
          <span
            v-if="required"
            class="text-secondary"
          >
            *
          </span>
        </template>
        <template #append-inner>
          <v-icon v-bind="activatorProps">mdi-calendar</v-icon>
        </template>
      </v-text-field>
    </template>
    <!-- Picker für die tagesgenaue Auswahl -->
    <v-date-picker
      id="datum_datePicker"
      v-model="datePickerDate"
      :disabled="disabled"
      :min="minDate"
      :max="maxDate"
      :weekdays="[1, 2, 3, 4, 5, 6, 0]"
      color="primary"
      @update:model-value="deactivateDatePicker"
    />
  </v-dialog>
</template>

<script setup lang="ts">
import _ from "lodash";
import moment from "moment";
import { computed, ref } from "vue";

import { useDateUtils } from "@/util/DateUtils";

interface Props {
  label?: string; // Bezeichnung des Datumsfelds
  required?: boolean; // Ist das Datumsfeld ein Pflichtfeld
  disabled?: boolean; // Ob das Datumsfeld deaktiviert sein soll
  minDate: string; // Ob das Datumsfeld deaktiviert sein soll
  maxDate: string; // Ob das Datumsfeld deaktiviert sein soll
}

interface Emits {
  (event: "blur", value: Date | undefined): void;
}

const ISO_FORMAT = "YYYY-MM-DD";
const DISPLAY_FORMAT = "DD.MM.YYYY";
const props = withDefaults(defineProps<Props>(), {
  label: "",
  required: false,
  disabled: false,
});
const emit = defineEmits<Emits>();
const date = defineModel<Date | undefined>();
const datePickerActive = ref(false);
const displayFormat = ref(DISPLAY_FORMAT);

const datePickerDate = computed({
  get() {
    if (!_.isNil(date.value)) {
      const parsedValue = moment.utc(date.value);
      if (!parsedValue.isSame(0)) {
        return moment(parsedValue.format(ISO_FORMAT)).toDate();
      }
    }

    /* undefined, null und der Unix Timestamp 0 gelten als "leere" Werte
    und werden deshalb als heutiges Datum dargestellt. */
    return new Date();
  },

  set(value: Date) {
    // Hack damit die Zeit korrekt umgerechnet wird.
    value.setHours(5);
    date.value = value;
  },
});

const textFieldDate = computed({
  get() {
    if (!_.isNil(date.value)) {
      const parsedValue = moment.utc(date.value);
      if (!parsedValue.isSame(0)) {
        return parsedValue.local().format(displayFormat.value);
      }
    }

    /* undefined, null und der Unix Timestamp 0 gelten als "leere" Werte
    und werden deshalb als leerer String dargestellt. */
    return "";
  },

  set(value: string) {
    /* Hier wird das Datum im "strict mode" geparsed, um den Nutzer-Input
    möglichst strikt zu validieren (https://momentjs.com/docs/#/parsing/is-valid/). */
    const parsedValue = moment.utc(value, displayFormat.value, true);
    if (parsedValue.isValid()) {
      date.value = parsedValue.toDate();
    } else {
      date.value = undefined;
    }
  },
});

function deactivateDatePicker(): void {
  datePickerActive.value = false;
}

function blur(): void {
  emit("blur", date.value);
}

const dateUtils = useDateUtils();
function validateTextDate(toCheck: string) {
  return (
    dateUtils.isDateBetweenAsStrings(
      dateUtils.formatDateAsStringToISO(toCheck),
      props.minDate,
      props.maxDate
    ) || "Das eingegebene Datum liegt außerhalb des gültigen Bereichs."
  );
}
</script>

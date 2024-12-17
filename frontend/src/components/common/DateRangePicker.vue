<template>
  <div>
    <panel-header
      font-size="0.875rem"
      font-weight="bold"
      padding="10px 0 0 0"
      header-text="Zeitraum"
    />
    <v-row dense>
      <v-col cols="8">
        <v-row
          dense
          class="mr-3 mt-0 pt-0"
        >
          <v-col cols="6">
            <date-picker
              v-model="startDate"
              label="Startdatum"
              :disabled="props.disabled"
              :required="props.required"
            />
          </v-col>
          <v-col cols="6">
            <date-picker
              v-model="endDate"
              label="Enddatum"
              :disabled="props.disabled"
              :required="props.required"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <div
          v-if="
            isAnwender ||
            isDateRange ||
            isStartDateOutOfRange ||
            isEndDateOutOfRange ||
            endDateBeforeStartDate
          "
        >
          <p>Hinweise:</p>
          <p v-if="endDateBeforeStartDate">
            {{ messageEndDateBeforeStartDate }}
          </p>
          <p v-if="isStartDateOutOfRange">
            {{ messageStartDateOutOfRange }}
          </p>
          <p v-if="isEndDateOutOfRange">
            {{ messageEndDateOutOfRange }}
          </p>
          <p v-if="isAnwender">
            Als Anwender beträgt der maximal mögliche Auswahlzeitraum 5 Jahre.
          </p>
          <p v-if="isDateRange">
            Alle Auswertungen stellen Durchschnittswerte des ausgewählten
            Zeitraums dar.
          </p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import "@vuepic/vue-datepicker/dist/main.css";

import {cloneDeep, gt, isEmpty, isEqual, isNil, lt} from "lodash";
import { computed, onMounted, ref, watch } from "vue";

import DatePicker from "@/components/common/DatePicker.vue";
import PanelHeader from "@/components/common/PanelHeader.vue";
import { useDateUtils } from "@/util/DateUtils";

interface Props {
  label?: string;
  required?: boolean;
  disabled?: boolean;
  minDate?: Date;
  minDateDescription?: string;
  maxDate?: Date;
  maxDateDescription?: string;
  isAnwender?: boolean; // Handelt es sich beim User um einen Anwender
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  required: false,
  disabled: false,
  isAnwender: false,
});

const dateUtils = useDateUtils();

const startDate = ref<Date | undefined>();

const endDate = ref<Date | undefined>();

const dateRange = defineModel<Array<Date> | undefined>();

onMounted(() => {
  if (!isNil(props.maxDate)) {
    startDate.value = cloneDeep(props.maxDate);
    endDate.value = cloneDeep(props.maxDate);
  }
});

const endDateBeforeStartDate = computed(() => {
  return (
    !isNil(startDate.value) &&
    !isNil(endDate.value) &&
    lt(endDate.value, startDate.value)
  );
});

const messageEndDateBeforeStartDate = computed(() => {
  let message = "";
  if (endDateBeforeStartDate.value) {
    message = "Das Enddatum ist vor dem Startdatum.";
  }
  return message;
});

const isStartDateOutOfRange = computed(() => {
  return !isEmpty(messageStartDateOutOfRange.value);
});

const messageStartDateOutOfRange = computed<string>(() => {
  const startDateWithoutTimeInformation = cloneDeep(startDate.value);
  startDateWithoutTimeInformation?.setHours(0);
  startDateWithoutTimeInformation?.setMinutes(0);
  startDateWithoutTimeInformation?.setSeconds(0);
  startDateWithoutTimeInformation?.setMilliseconds(0);
  const minDateWithoutTimeInformation = cloneDeep(props.minDate);
  minDateWithoutTimeInformation?.setHours(0);
  minDateWithoutTimeInformation?.setMinutes(0);
  minDateWithoutTimeInformation?.setSeconds(0);
  minDateWithoutTimeInformation?.setMilliseconds(0);
  const maxDateWithoutTimeInformation = cloneDeep(props.maxDate);
  maxDateWithoutTimeInformation?.setHours(0);
  maxDateWithoutTimeInformation?.setMinutes(0);
  maxDateWithoutTimeInformation?.setSeconds(0);
  maxDateWithoutTimeInformation?.setMilliseconds(0);

  let message = "";
  if (!isNil(startDateWithoutTimeInformation) && lt(startDateWithoutTimeInformation, minDateWithoutTimeInformation)) {
    message = `Das Startdatum ist vor dem ${props.minDateDescription}.`;
  } else if (!isNil(startDateWithoutTimeInformation) && gt(startDateWithoutTimeInformation, maxDateWithoutTimeInformation)) {
    message = `Das Startdatum ist nach dem ${props.maxDateDescription}.`;
  }
  return message;
});

const isEndDateOutOfRange = computed(() => {
  return !isEmpty(messageEndDateOutOfRange.value);
});

const messageEndDateOutOfRange = computed<string>(() => {
  const endDateWithoutTimeInformation = cloneDeep(endDate.value);
  endDateWithoutTimeInformation?.setHours(0);
  endDateWithoutTimeInformation?.setMinutes(0);
  endDateWithoutTimeInformation?.setSeconds(0);
  endDateWithoutTimeInformation?.setMilliseconds(0);
  const minDateWithoutTimeInformation = cloneDeep(props.minDate);
  minDateWithoutTimeInformation?.setHours(0);
  minDateWithoutTimeInformation?.setMinutes(0);
  minDateWithoutTimeInformation?.setSeconds(0);
  minDateWithoutTimeInformation?.setMilliseconds(0);
  const maxDateWithoutTimeInformation = cloneDeep(props.maxDate);
  maxDateWithoutTimeInformation?.setHours(0);
  maxDateWithoutTimeInformation?.setMinutes(0);
  maxDateWithoutTimeInformation?.setSeconds(0);
  maxDateWithoutTimeInformation?.setMilliseconds(0);

  let message = "";
  if (!isNil(endDateWithoutTimeInformation) && lt(endDateWithoutTimeInformation, minDateWithoutTimeInformation)) {
    message = `Das Enddatum ist vor dem ${props.minDateDescription}.`;
  } else if (!isNil(endDateWithoutTimeInformation) && gt(endDateWithoutTimeInformation, maxDateWithoutTimeInformation)) {
    message = `Das Enddatum ist nach dem ${props.maxDateDescription}.`;
  }
  return message;
});

const isDateRange = computed(() => {
  let isRange = false;
  if (!isNil(startDate.value) && !isNil(endDate.value)) {
    const startDateIso = dateUtils.formatDateToISO(startDate.value);
    const endDateIso = dateUtils.formatDateToISO(endDate.value);
    isRange = !isEqual(startDateIso, endDateIso);
  }
  return isRange;
});

watch(
  () => [startDate.value, endDate.value],
  () => {
    if (isNil(startDate.value) && isNil(endDate.value)) {
      dateRange.value = [];
    } else if (!isNil(startDate.value) && isNil(endDate.value)) {
      dateRange.value = [startDate.value, startDate.value];
    } else if (isNil(startDate.value) && !isNil(endDate.value)) {
      dateRange.value = [endDate.value, endDate.value];
    } else if (!isNil(startDate.value) && !isNil(endDate.value)) {
      dateRange.value = [startDate.value, endDate.value];
    }
  },
  { immediate: true }
);
</script>

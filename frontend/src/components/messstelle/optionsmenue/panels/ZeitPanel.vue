<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      <div>
        <v-icon
          start
          icon="mdi-clock-time-four-outline"
        />
        Zeit
      </div>
    </v-expansion-panel-title>
    <v-expansion-panel-text class="mt-1">
      <date-range-picker
        v-model="chosenOptionsCopy.zeitraumStartAndEndDate"
        :min-date="minDate"
        :min-date-description="minDateDescription"
        :max-date="maxDate"
        :max-date-description="maxDateDescription"
        :is-anwender="isAnwender"
      />

      <v-divider />

      <tages-typ-radiogroup
        v-if="isDateRange"
        v-model="chosenOptionsCopy"
        :is-chosen-tages-typ-valid="isChosenTagesTypValid"
      />
      <v-divider v-if="isDateRange" />

      <zeitauswahl-radiogroup
        v-model="chosenOptionsCopy"
        :messstelle-detektierte-fahrzeugart="
          messstelleInfo.detektierteVerkehrsarten
        "
      />
      <zeitauswahl-stunde-or-block v-model="chosenOptionsCopy" />
      <v-spacer />
      <v-divider v-if="!isDateBiggerFiveYears" />
      <zeit-intervall
        v-if="!isDateBiggerFiveYears"
        v-model="chosenOptionsCopy"
      />
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import type ChosenTagesTypValidDTO from "@/types/messstelle/ChosenTagesTypValidDTO";
import type MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import type NichtPlausibleTageDTO from "@/types/messstelle/NichtPlausibleTageDTO";

import { defaults, isNil } from "lodash";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import MessstelleOptionsmenuService from "@/api/service/MessstelleOptionsmenuService";
import DateRangePicker from "@/components/common/DateRangePicker.vue";
import TagesTypRadiogroup from "@/components/messstelle/optionsmenue/panels/TagesTypRadiogroup.vue";
import ZeitauswahlRadiogroup from "@/components/messstelle/optionsmenue/panels/ZeitauswahlRadiogroup.vue";
import ZeitauswahlStundeOrBlock from "@/components/messstelle/optionsmenue/panels/ZeitauswahlStundeOrBlock.vue";
import ZeitIntervall from "@/components/messstelle/optionsmenue/panels/ZeitIntervall.vue";
import { useMessstelleStore } from "@/store/MessstelleStore";
import { useUserStore } from "@/store/UserStore";
import StartAndEndDate from "@/types/common/StartAndEndDate";
import { useDateUtils } from "@/util/DateUtils";
import { useOptionsmenuUtils } from "@/util/OptionsmenuUtils";

const route = useRoute();

const chosenOptionsCopy = defineModel<MessstelleOptionsDTO>({ required: true });

const messstelleStore = useMessstelleStore();
const userStore = useUserStore();
const dateUtils = useDateUtils();
const isChosenTagesTypValid = ref(true);

const isDateRange = computed(() => {
  const chosenDates = [
    dateUtils.formatDateToISO(
      chosenOptionsCopy.value.zeitraumStartAndEndDate.startDate
    ),
    dateUtils.formatDateToISO(
      chosenOptionsCopy.value.zeitraumStartAndEndDate.endDate
    ),
  ];
  return dateUtils.isDateRange(chosenDates);
});

onMounted(() => {
  const messstelleId = route.params.messstelleId as string;
  MessstelleOptionsmenuService.getNichtPlausibleTage(messstelleId).then(
    (nichtPlausibleTageDTO: NichtPlausibleTageDTO) =>
      (nichtPlausibleTage.value = nichtPlausibleTageDTO.nichtPlausibleTage)
  );
});

const messstelleInfo = computed<MessstelleInfoDTO>(() => {
  return messstelleStore.getMessstelleInfo;
});

const nichtPlausibleTage = ref<Array<string>>([]);

const { isDateBiggerFiveYears } = useOptionsmenuUtils(chosenOptionsCopy.value);

const isAnwender = computed(() => {
  return userStore.hasAuthorities && userStore.isAnwender;
});

const chosenOptionsCopyStartAndEndDatum = computed(() => {
  return (
    chosenOptionsCopy.value.zeitraumStartAndEndDate ??
    new StartAndEndDate(undefined, undefined)
  );
});

const chosenOptionsCopyTagesTyp = computed(() => {
  return chosenOptionsCopy.value.tagesTyp ?? "";
});

const minDateDescription = ref<string>("");

const minDate = ref<Date>();

watch(
  () => [messstelleInfo.value.realisierungsdatum],
  () => {
    const startdatum = new Date("2006-01-01");
    const realisierungsdatum = new Date(
      messstelleInfo.value.realisierungsdatum
    );
    if (
      dateUtils.isValidIsoDate(messstelleInfo.value.realisierungsdatum) &&
      realisierungsdatum >= startdatum
    ) {
      minDateDescription.value = "Realisierungsdatum";
      minDate.value = realisierungsdatum;
    } else {
      minDateDescription.value = "frühestmöglichen Datum";
      minDate.value = startdatum;
    }
  },
  { immediate: true }
);

const maxDateDescription = ref<string>("");

const maxDate = ref<Date>();

watch(
  () => [
    messstelleInfo.value.datumLetztePlausibleMessung,
    messstelleInfo.value.abbaudatum,
  ],
  () => {
    if (
      dateUtils.isValidIsoDate(messstelleInfo.value.datumLetztePlausibleMessung)
    ) {
      maxDateDescription.value = "Datum der letzten plausiblen Messung";
      maxDate.value = new Date(
        messstelleInfo.value.datumLetztePlausibleMessung
      );
    } else if (dateUtils.isValidIsoDate(messstelleInfo.value.abbaudatum)) {
      maxDateDescription.value = "Abbaudatum";
      maxDate.value = new Date(messstelleInfo.value.abbaudatum);
    } else {
      // Yesterday
      maxDateDescription.value = "gestrigen Datum";
      maxDate.value = new Date(new Date().setDate(new Date().getDate() - 1));
    }
  },
  { immediate: true }
);

watch(
  [chosenOptionsCopyTagesTyp, chosenOptionsCopyStartAndEndDatum],
  () => {
    if (
      !isNil(chosenOptionsCopy.value.zeitraumStartAndEndDate) &&
      !isNil(chosenOptionsCopy.value.zeitraumStartAndEndDate.startDate) &&
      !isNil(chosenOptionsCopy.value.zeitraumStartAndEndDate.endDate) &&
      chosenOptionsCopy.value.tagesTyp
    ) {
      const chosenTagesTypValidRequestDto = {
        startDate: dateUtils.formatDateToISO(
          chosenOptionsCopy.value.zeitraumStartAndEndDate.startDate
        ),
        endDate: dateUtils.formatDateToISO(
          chosenOptionsCopy.value.zeitraumStartAndEndDate.endDate
        ),
        tagesTyp: defaults(chosenOptionsCopy.value.tagesTyp, ""),
      };
      MessstelleOptionsmenuService.isTagesTypValid(
        chosenTagesTypValidRequestDto
      ).then((chosenTagesTypValidDto: ChosenTagesTypValidDTO) => {
        isChosenTagesTypValid.value = chosenTagesTypValidDto.isValid;
      });
    }
  },
  { deep: true }
);

watch(
  chosenOptionsCopyStartAndEndDatum,
  () => {
    const isoDate = dateUtils.formatDateToISO(
      chosenOptionsCopy.value.zeitraumStartAndEndDate.startDate
    );
    messstelleStore.calculateActiveMessfaehigkeit(isoDate);
  },
  { deep: true }
);
</script>

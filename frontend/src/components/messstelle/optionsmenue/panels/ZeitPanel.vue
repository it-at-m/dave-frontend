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
          v-model="zeitraum"
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

import { toArray } from "lodash";
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
import { useDateUtils } from "@/util/DateUtils";
import { useOptionsmenuUtils } from "@/util/OptionsmenuUtils";

const route = useRoute();

const chosenOptionsCopy = defineModel<MessstelleOptionsDTO>({ required: true });

const messstelleStore = useMessstelleStore();
const userStore = useUserStore();
const dateUtils = useDateUtils();
const isChosenTagesTypValid = ref(true);

const isDateRange = computed(() => {
  return dateUtils.isDateRange(chosenOptionsCopy.value.zeitraum);
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

const chosenOptionsCopyZeitraum = computed(() => {
  return chosenOptionsCopy.value.zeitraum ?? [];
});

const chosenOptionsCopyWochentag = computed(() => {
  return chosenOptionsCopy.value.tagesTyp ?? "";
});

const isAnwender = computed(() => {
  return userStore.hasAuthorities && userStore.isAnwender;
});

const minDateDescription = ref<string>("");

const minDate = computed(() => {
  const startdatum = new Date("2006-01-01");
  const realisierungsdatum = new Date(messstelleInfo.value.realisierungsdatum);
  if (dateUtils.isValidIsoDate(messstelleInfo.value.realisierungsdatum) && realisierungsdatum >= startdatum) {
    minDateDescription.value = "Realisierungsdatum";
    return realisierungsdatum;
  } else {
    minDateDescription.value = "frühestmöglichen Datum";
    return startdatum;
  }
});

const maxDateDescription = ref<string>("");

const maxDate = computed(() => {
  if (
    dateUtils.isValidIsoDate(messstelleInfo.value.datumLetztePlausibleMessung)
  ) {
    maxDateDescription.value = "Datum der letzten plausiblen Messung";
    return new Date(messstelleInfo.value.datumLetztePlausibleMessung);
  } else if (dateUtils.isValidIsoDate(messstelleInfo.value.abbaudatum)) {
    maxDateDescription.value = "Abbaudatum";
    return new Date(messstelleInfo.value.abbaudatum);
  } else {
    // Yesterday
    maxDateDescription.value = "gestrigen Datum";
    return new Date(new Date().setDate(new Date().getDate() - 1));
  }
});

const zeitraum = computed({
  get() {
    return toArray(chosenOptionsCopy.value.zeitraum).map(
      (date) => new Date(date)
    );
  },

  set(dates: Array<Date> | undefined) {
    const newZeitraum = toArray(dates).map((date) =>
      dateUtils.formatDateToISO(date)
    );
    chosenOptionsCopy.value.zeitraum = newZeitraum;
  },
});

watch([chosenOptionsCopyWochentag, chosenOptionsCopyZeitraum], () => {
  if (
    chosenOptionsCopyZeitraum.value.length === 2 &&
    chosenOptionsCopyZeitraum.value[0] &&
    chosenOptionsCopyZeitraum.value[1] &&
    chosenOptionsCopy.value.tagesTyp
  ) {
    const chosenTagesTypValidRequestDto = {
      startDate: chosenOptionsCopyZeitraum.value[0],
      endDate: chosenOptionsCopyZeitraum.value[1],
      tagesTyp: chosenOptionsCopy.value.tagesTyp,
    };
    MessstelleOptionsmenuService.isTagesTypValid(
      chosenTagesTypValidRequestDto
    ).then((chosenTagesTypValidDto: ChosenTagesTypValidDTO) => {
      isChosenTagesTypValid.value = chosenTagesTypValidDto.isValid;
    });
  }
});

watch(chosenOptionsCopyZeitraum, () => {
  calculateChoosableOptions();
});

function calculateChoosableOptions(): void {
  messstelleStore.calculateActiveMessfaehigkeit(
    chosenOptionsCopy.value.zeitraum[0]
  );
}
</script>

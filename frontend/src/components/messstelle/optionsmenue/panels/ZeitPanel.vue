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
      <panel-header
        font-size="0.875rem"
        font-weight="bold"
        padding="10px 0 0 0"
        header-text="Zeitraum"
      />
      <v-row
        no-gutters
        class="mt-3"
      >
        <v-col
          cols="8"
          class="pr-2"
        >
          <!--                    <v-date-picker-->
          <!--                        v-model="chosenOptionsCopy.zeitraum"-->
          <!--                        event-color="red"-->
          <!--                        full-width-->
          <!--                        no-title-->
          <!--                        :events="nichtPlausibleTage"-->
          <!--                        multiple="range"-->
          <!--                        :allowed-dates="allowedDatesRangeDatePicker"-->
          <!--                        locale="de-DE"-->
          <!--                        first-day-of-week="1"-->
          <!--                        :picker-date.sync="pickerDate"-->
          <!--                        :min="minDate"-->
          <!--                        :max="maxDate"-->
          <!--                        @update:modelValue="checkIfDateIsAlreadySelected"-->
          <!--                    />-->
          <v-date-picker
            v-model="dateValue"
            hide-header
            locale="de-DE"
            first-day-of-week="1"
            multiple="range"
            :min="minDate"
            :max="maxDate"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="formattedDateInput"
            :label="getChosenDateAsText"
            :rules="[
              RULE_EINGABE_HAT_PLAUSIBLES_FORMAT,
              RULE_EINGABE_TAG_ODER_ZEITRAUM_HAT_PLAUSIBLE_MESSUNG,
            ]"
          />
          <p>Hinweise:</p>
          <p>
            An den rot markierten Tagen sind keine plausiblen Messwerte
            vorhanden
          </p>
          <p v-if="isAnwender">
            Als Anwender beträgt der maximal mögliche Auswahlzeitraum 5 Jahre
          </p>
          <p v-if="isZeitraum">
            Alle Auswertungen stellen Durchschnittswerte des ausgewählten
            Zeitraums dar
          </p>
        </v-col>
      </v-row>
      <v-divider />

      <tages-typ-radiogroup
        v-if="chosenOptionsCopyZeitraum.length == 2"
        v-model="chosenOptionsCopy"
        :is-chosen-tages-typ-valid="isChosenTagesTypValid"
      />
      <v-divider v-if="chosenOptionsCopyZeitraum.length == 2" />

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

import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import MessstelleOptionsmenuService from "@/api/service/MessstelleOptionsmenuService";
import PanelHeader from "@/components/common/PanelHeader.vue";
import TagesTypRadiogroup from "@/components/messstelle/optionsmenue/panels/TagesTypRadiogroup.vue";
import ZeitauswahlRadiogroup from "@/components/messstelle/optionsmenue/panels/ZeitauswahlRadiogroup.vue";
import ZeitauswahlStundeOrBlock from "@/components/messstelle/optionsmenue/panels/ZeitauswahlStundeOrBlock.vue";
import ZeitIntervall from "@/components/messstelle/optionsmenue/panels/ZeitIntervall.vue";
import { useMessstelleStore } from "@/store/messstelle";
import { useUserStore } from "@/store/user";
import { useDateUtils } from "@/util/DateUtils";
import { useOptionsmenuUtils } from "@/util/OptionsmenuUtils";

const route = useRoute();

const chosenOptionsCopy = defineModel<MessstelleOptionsDTO>({ required: true });

const messstelleStore = useMessstelleStore();
const userStore = useUserStore();
const dateUtils = useDateUtils();
const isChosenTagesTypValid = ref(true);
const pickerDate = ref("");
onMounted(() => {
  // TODO: via Prop injecten
  const messstelleId = route.params.messstelleId as string;
  MessstelleOptionsmenuService.getNichtPlausibleTage(messstelleId).then(
    (nichtPlausibleTageDTO: NichtPlausibleTageDTO) =>
      (nichtPlausibleTage.value = nichtPlausibleTageDTO.nichtPlausibleTage)
  );
});

const messstelleInfo = computed<MessstelleInfoDTO>(() => {
  return messstelleStore.getMessstelleInfo;
});

const getSortedDateRange = computed(() => {
  return dateUtils.sortDatesDescAsStrings(
    chosenOptionsCopyZeitraum.value.slice()
  );
});

const nichtPlausibleTage = ref<Array<string>>([]);

const { isDateBiggerFiveYears } = useOptionsmenuUtils(chosenOptionsCopy.value);

const chosenOptionsCopyZeitraum = computed(() => {
  return chosenOptionsCopy.value.zeitraum ?? [];
});

const chosenOptionsCopyWochentag = computed(() => {
  return chosenOptionsCopy.value.tagesTyp ?? "";
});

const getChosenDateAsText = computed(() => {
  if (chosenOptionsCopyZeitraum.value.length == 1) {
    return "ausgewähltes Datum";
  } else if (chosenOptionsCopyZeitraum.value.length == 2) {
    return "ausgewählter Zeitraum";
  } else {
    return "";
  }
});

const isZeitraum = computed(() => {
  return chosenOptionsCopyZeitraum.value.length == 2;
});

const isAnwender = computed(() => {
  return userStore.hasAuthorities && userStore.isAnwender;
});

const minDate = computed(() => {
  if (messstelleInfo.value.realisierungsdatum >= "2006-01-01")
    return messstelleInfo.value.realisierungsdatum;
  else return "2006-01-01";
});

const maxDate = computed(() => {
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
    .toISOString()
    .slice(0, 10);
  return messstelleInfo.value.abbaudatum ?? yesterday;
});

const formattedDateInput = computed({
  get: () => {
    const zeitraum = chosenOptionsCopyZeitraum.value.slice(0);
    if (zeitraum.length == 1) {
      return dateUtils.formatDate(chosenOptionsCopyZeitraum.value[0]);
    } else if (zeitraum.length == 2) {
      const sortedDates = dateUtils.sortDatesDescAsStrings(zeitraum);
      return `${dateUtils.formatDate(
        sortedDates[1]
      )} - ${dateUtils.formatDate(sortedDates[0])}`;
    } else {
      return "";
    }
  },
  set: (newValue) => {
    const NEW_DATE = newValue.replace(/\s/g, "");
    if (NEW_DATE.length == 10) {
      chosenOptionsCopy.value.zeitraum = [dateUtils.formatDateToISO(NEW_DATE)];
    } else if (NEW_DATE.length == 21) {
      const [datum1, datum2] = NEW_DATE.split("-");
      chosenOptionsCopy.value.zeitraum = [
        dateUtils.formatDateToISO(datum1),
        dateUtils.formatDateToISO(datum2),
      ];
    }
  },
});

const dateValue = ref<Array<Date>>([new Date()]);

function allowedDatesRangeDatePicker(val: Date) {
  const today = new Date();
  return val < today;
}

function RULE_EINGABE_HAT_PLAUSIBLES_FORMAT() {
  const dates = chosenOptionsCopyZeitraum.value;
  const falschesFormat = "Datumsformat ist nicht korrekt";
  const keinDatum = "Dieses Datum existiert nicht";
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (dates.length == 1) {
    const dateObj = new Date(dates[0]).toString();
    if (!dateRegex.test(dates[0])) {
      return falschesFormat;
    }
    if (dateObj == "Invalid Date") {
      return keinDatum;
    }
    return true;
  }
  if (dates.length == 2) {
    const DATE_OBJ_1 = new Date(dates[0]).toString();
    const DATE_OBJ_2 = new Date(dates[1]).toString();
    if (!dateRegex.test(dates[0]) || !dateRegex.test(dates[1])) {
      return falschesFormat;
    }
    if (DATE_OBJ_1 == "Invalid Date" || DATE_OBJ_2 == "Invalid Date") {
      return keinDatum;
    }
    return true;
  }
  return true;
}

function RULE_EINGABE_TAG_ODER_ZEITRAUM_HAT_PLAUSIBLE_MESSUNG() {
  if (
    chosenOptionsCopyZeitraum.value.length == 1 &&
    nichtPlausibleTage.value.includes(chosenOptionsCopyZeitraum.value[0])
  ) {
    return "Tag hat keine plausible Messung";
  }
  if (chosenOptionsCopyZeitraum.value.length == 2) {
    const filter = getAllDatesBetweenTwoDates();
    const tageAsDates: number[] = nichtPlausibleTage.value.map(
      (dateAsString: string) => new Date(dateAsString).valueOf()
    );
    if (filter.every((day) => tageAsDates.includes(day.valueOf()))) {
      return "Kein plausibler Tag im Zeitraum";
    }
    const zeitraum = chosenOptionsCopyZeitraum.value.slice();
    const sortedDates = dateUtils.sortDatesDescAsStrings(zeitraum);
    const timeDifferenceInMilliseconds =
      new Date(sortedDates[0]).valueOf() - new Date(sortedDates[1]).valueOf();
    const timeDifferenceInYears =
      timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24 * 365);
    if (isAnwender.value && timeDifferenceInYears > 5) {
      return "Der Ausgewählte Zeitraum ist zu groß";
    }
  }
  return true;
}

function getAllDatesBetweenTwoDates(): Date[] {
  const zeitraum = chosenOptionsCopyZeitraum.value.slice();
  const sortedDates = dateUtils.sortDatesDescAsStrings(zeitraum);
  const datesArray = [];
  const startDate = new Date(sortedDates[1]);
  const endDate = new Date(sortedDates[0]);
  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    datesArray.push(new Date(date));
  }
  return datesArray;
}

function checkIfDateIsAlreadySelected(val: string[]) {
  if (val.length == 2 && val[0] == val[1]) {
    chosenOptionsCopyZeitraum.value.splice(0, 1);
  }
}

watch([chosenOptionsCopyWochentag, chosenOptionsCopyZeitraum], () => {
  if (
    getSortedDateRange.value[0] &&
    getSortedDateRange.value[1] &&
    chosenOptionsCopy.value.tagesTyp
  ) {
    const chosenTagesTypValidRequestDto = {
      startDate: getSortedDateRange.value[1],
      endDate: getSortedDateRange.value[0],
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
  if (
    chosenOptionsCopyZeitraum.value.length == 1 &&
    chosenOptionsCopyZeitraum.value[0] ==
      messstelleInfo.value.datumLetztePlausibleMessung
  ) {
    pickerDate.value = messstelleInfo.value.datumLetztePlausibleMessung;
  } else {
    pickerDate.value = chosenOptionsCopyZeitraum.value[0];
  }
  calculateChoosableOptions();
});

function calculateChoosableOptions(): void {
  messstelleStore.calculateActiveMessfaehigkeit(
    dateUtils.sortDatesAscAsStrings(chosenOptionsCopy.value.zeitraum)[0]
  );
}
</script>

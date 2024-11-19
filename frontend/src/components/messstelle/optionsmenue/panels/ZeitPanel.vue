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
      <v-row dense>
        <v-col cols="8">
          <v-row
            dense
            class="mt-0 pt-0"
          >
            <v-col cols="6">
              <date-range-picker
                v-model="zeitraum"
                :min-date="minDate"
                :max-date="maxDate"
                label="Datumsauswahl"
              />
            </v-col>
            <v-col cols="6" />
          </v-row>
        </v-col>
        <v-col cols="4">
          <div v-if="isAnwender || isDateRange">
            <p>Hinweise:</p>
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

import { head, isEqual, isNil, last, toArray } from "lodash";
import moment from "moment/moment";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import MessstelleOptionsmenuService from "@/api/service/MessstelleOptionsmenuService";
import DateRangePicker from "@/components/common/DateRangePicker.vue";
import PanelHeader from "@/components/common/PanelHeader.vue";
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
  const startDate = head(chosenOptionsCopy.value.zeitraum);
  const isValidStartDate = moment(startDate, "YYYY-MM-DD", true).isValid();
  const endDate = last(chosenOptionsCopy.value.zeitraum);
  const isValidEndDate = moment(endDate, "YYYY-MM-DD", true).isValid();
  return isValidStartDate && isValidEndDate && !isEqual(startDate, endDate);
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

const minDate = computed(() => {
  const startdatum = new Date("2006-01-01");
  const realisierungsdatum = new Date(messstelleInfo.value.realisierungsdatum);
  if (
    !isNil(messstelleInfo.value.realisierungsdatum) &&
    realisierungsdatum >= startdatum
  )
    return realisierungsdatum;
  else return startdatum;
});

const maxDate = computed(() => {
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  return isNil(messstelleInfo.value.abbaudatum)
    ? yesterday
    : new Date(messstelleInfo.value.abbaudatum);
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

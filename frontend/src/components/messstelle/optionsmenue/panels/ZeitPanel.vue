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
        class="mt-3"
      >
        <v-col
          cols="4"
        >
          <date-picker v-model="dateValueVon" :minDate="minDate" :maxDate="maxDate" label="von"/>
        </v-col>
        <v-col
          cols="4"
        >
          <date-picker v-model="dateValueBis" :minDate="minDateRange" :maxDate="maxDate" label="bis"/>
        </v-col>
        <v-spacer/>
        <v-col cols="4">
          <div v-if="isAnwender || isZeitraum">
            <p>Hinweise:</p>
            <p v-if="isAnwender">
              Als Anwender beträgt der maximal mögliche Auswahlzeitraum 5 Jahre.
            </p>
            <p v-if="isZeitraum">
              Alle Auswertungen stellen Durchschnittswerte des ausgewählten
              Zeitraums dar.
            </p>
          </div>
        </v-col>
      </v-row>
      <v-divider />

      <tages-typ-radiogroup
        v-if="isZeitraum"
        v-model="chosenOptionsCopy"
        :is-chosen-tages-typ-valid="isChosenTagesTypValid"
      />
      <v-divider v-if="isZeitraum" />

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

import {computed, onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";

import MessstelleOptionsmenuService from "@/api/service/MessstelleOptionsmenuService";
import PanelHeader from "@/components/common/PanelHeader.vue";
import TagesTypRadiogroup from "@/components/messstelle/optionsmenue/panels/TagesTypRadiogroup.vue";
import ZeitauswahlRadiogroup from "@/components/messstelle/optionsmenue/panels/ZeitauswahlRadiogroup.vue";
import ZeitauswahlStundeOrBlock from "@/components/messstelle/optionsmenue/panels/ZeitauswahlStundeOrBlock.vue";
import ZeitIntervall from "@/components/messstelle/optionsmenue/panels/ZeitIntervall.vue";
import {useMessstelleStore} from "@/store/messstelle";
import {useUserStore} from "@/store/user";
import {useDateUtils} from "@/util/DateUtils";
import {useOptionsmenuUtils} from "@/util/OptionsmenuUtils";
import DatePicker from "@/components/common/DatePicker.vue";

const route = useRoute();

const chosenOptionsCopy = defineModel<MessstelleOptionsDTO>({ required: true });

const messstelleStore = useMessstelleStore();
const userStore = useUserStore();
const dateUtils = useDateUtils();
const isChosenTagesTypValid = ref(true);
// TODO Zeitraum via Checkbox steuern
const needRange = ref(chosenOptionsCopy.value.zeitraum.length > 1);
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

const isZeitraum = computed(() => {
  return chosenOptionsCopyZeitraum.value.length == 2 && dateValueVon.value.valueOf() !== dateValueBis.value.valueOf();
});

const isAnwender = computed(() => {
  return userStore.hasAuthorities && userStore.isAnwender;
});

const minDate = computed(() => {
  if (messstelleInfo.value.realisierungsdatum >= "2006-01-01")
    return messstelleInfo.value.realisierungsdatum;
  else return "2006-01-01";
});

const minDateRange = computed(() => {
  return dateUtils.formatDateToISO(dateValueVon.value);
})

const maxDate = computed(() => {
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
    .toISOString()
    .slice(0, 10);
  return messstelleInfo.value.abbaudatum ?? yesterday;
});

const dateValueVon = ref<Date>(new Date(chosenOptionsCopy.value.zeitraum[0]));
const dateValueBis = ref<Date>(chosenOptionsCopy.value.zeitraum.length === 2 ? new Date(chosenOptionsCopy.value.zeitraum[1]) : dateValueVon.value);

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
  calculateChoosableOptions();
});
watch(dateValueVon, () => {
  if (dateValueVon.value) {
    saveDateValueVon();
    validateRange();
  }
});
watch(dateValueBis, () => {
  if (dateValueBis.value) {
    saveDateValueBis();
  }
});

function validateRange() {
  if (dateValueVon.value.valueOf() > dateValueBis.value.valueOf()) {
    dateValueBis.value = dateValueVon.value;
  }
}

function calculateChoosableOptions(): void {
  messstelleStore.calculateActiveMessfaehigkeit(
    dateUtils.sortDatesAscAsStrings(chosenOptionsCopy.value.zeitraum)[0]
  );
}

function saveDateValueVon() {
  const dateToSave = dateUtils.formatDateToISO(dateValueVon.value);
  if (chosenOptionsCopy.value.zeitraum.length === 0) {
    chosenOptionsCopy.value.zeitraum.push(dateToSave);
  } else {
    chosenOptionsCopy.value.zeitraum[0] = dateToSave;
  }
}

function saveDateValueBis() {
  const dateToSave = dateUtils.formatDateToISO(dateValueBis.value);
  if (chosenOptionsCopy.value.zeitraum.length === 2) {
    chosenOptionsCopy.value.zeitraum[1] = dateToSave;
  } else {
    chosenOptionsCopy.value.zeitraum.push(dateToSave);
  }
}
</script>

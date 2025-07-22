import type MessfaehigkeitDTO from "@/types/messstelle/MessfaehigkeitDTO";
import type MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

import { cloneDeep, isNil, toArray } from "lodash";
import moment from "moment";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import Verkehrsart from "@/types/enum/Verkehrsart";
import { useDateUtils } from "@/util/DateUtils";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";

export const useMessstelleStore = defineStore("messstelleStore", () => {
  const dateUtils = useDateUtils();

  const messstelleInfo = ref<MessstelleInfoDTO>({} as MessstelleInfoDTO);
  const activeTab = ref(0);
  const filterOptions = ref<MessstelleOptionsDTO>(
    DefaultObjectCreator.createDefaultMessstelleOptions()
  );
  const direction = ref("");
  const history = ref(false);
  const belastungsplanMinSize = ref(0);
  const belastungsplanMaxSize = ref("");
  const belastungsplanChosenSize = ref(1);
  const includedMeasuringDays = ref(0);
  const requestedMeasuringDays = ref(0);

  const getMessstelleInfo = computed(() => messstelleInfo.value);
  const getMaxPossibleDateForMessstelle = computed(() => {
    let maxDate: Date;
    if (
      dateUtils.isValidIsoDate(messstelleInfo.value.datumLetztePlausibleMessung)
    ) {
      maxDate = new Date(messstelleInfo.value.datumLetztePlausibleMessung);
    } else if (dateUtils.isValidIsoDate(messstelleInfo.value.abbaudatum)) {
      maxDate = new Date(messstelleInfo.value.abbaudatum);
    } else {
      // Yesterday
      maxDate = new Date(new Date().setDate(new Date().getDate() - 1));
    }
    return maxDate;
  });
  const getActiveTab = computed(() => activeTab.value);
  const isKfzMessstelle = computed(
    () => messstelleInfo.value.detektierteVerkehrsart === Verkehrsart.KFZ
  );
  const getFilteroptions = computed(() => filterOptions.value);
  const getDirection = computed(() => direction.value);
  const isHistory = computed(() => history.value);
  const getBelastungsplanMinSize = computed(() => belastungsplanMinSize.value);
  const getBelastungsplanMaxSize = computed(() => belastungsplanMinSize.value);
  const getBelastungsplanChosenSize = computed(
    () => belastungsplanChosenSize.value
  );
  const getIncludedMeasuringDays = computed(() => includedMeasuringDays.value);
  const getRequestedMeasuringDays = computed(
    () => requestedMeasuringDays.value
  );

  function setActiveTab(payload: number) {
    activeTab.value = payload;
  }
  function setMessstelleInfo(payload: MessstelleInfoDTO) {
    messstelleInfo.value = payload;
  }
  function setFilteroptions(payload: MessstelleOptionsDTO) {
    filterOptions.value = payload;
    history.value = false;
  }
  function setFilteroptionsHistory(payload: MessstelleOptionsDTO) {
    filterOptions.value = payload;
    history.value = true;
  }
  function setDirection(payload: string) {
    direction.value = payload;
  }
  function reloadFilteroptions() {
    filterOptions.value = cloneDeep(filterOptions.value);
  }
  function setBelastungsplanMinSize(payload: number) {
    belastungsplanMinSize.value = payload;
  }
  function setBelastungsplanMaxSize(payload: string) {
    belastungsplanMaxSize.value = payload;
  }
  function setBelastungsplanChosenSize(payload: number) {
    belastungsplanChosenSize.value = payload;
  }
  function getMessfaehigkeitenForGivenZeitraum(
    start: Date | undefined,
    end: Date | undefined
  ): Array<MessfaehigkeitDTO> {
    return toArray(messstelleInfo.value.messfaehigkeiten).filter(
      (messfaehigkeit) => {
        const gueltigAb = isNil(messfaehigkeit.gueltigAb)
          ? undefined
          : moment(messfaehigkeit.gueltigAb);
        const gueltigBis = isNil(messfaehigkeit.gueltigBis)
          ? undefined
          : moment(messfaehigkeit.gueltigBis);
        const startDate = isNil(start) ? undefined : moment(start);
        const endDate = isNil(end) ? undefined : moment(end);

        let isGueltigAbBetween = gueltigAb?.isBetween(
          startDate,
          endDate,
          "day",
          "[]"
        );
        let isGueltigBisBetween = gueltigBis?.isBetween(
          startDate,
          endDate,
          "day",
          "[]"
        );
        let isStartDateBetween = startDate?.isBetween(
          gueltigAb,
          gueltigBis,
          "day",
          "[]"
        );
        let isEndDateBetween = endDate?.isBetween(
          gueltigAb,
          gueltigBis,
          "day",
          "[]"
        );

        isGueltigAbBetween = !isNil(isGueltigAbBetween) && isGueltigAbBetween;
        isGueltigBisBetween =
          !isNil(isGueltigBisBetween) && isGueltigBisBetween;
        isStartDateBetween = !isNil(isStartDateBetween) && isStartDateBetween;
        isEndDateBetween = !isNil(isEndDateBetween) && isEndDateBetween;

        return (
          isGueltigAbBetween ||
          isGueltigBisBetween ||
          isStartDateBetween ||
          isEndDateBetween
        );
      }
    );
  }
  function setIncludedMeasuringDays(payload: number) {
    includedMeasuringDays.value = payload;
  }
  function setRequestedMeasuringDays(payload: number) {
    requestedMeasuringDays.value = payload;
  }

  return {
    getMessstelleInfo,
    getActiveTab,
    isKfzMessstelle,
    getFilteroptions,
    getDirection,
    isHistory,
    getBelastungsplanMinSize,
    getBelastungsplanMaxSize,
    getBelastungsplanChosenSize,
    getIncludedMeasuringDays,
    getRequestedMeasuringDays,
    setActiveTab,
    setMessstelleInfo,
    getMaxPossibleDateForMessstelle,
    setFilteroptions,
    setFilteroptionsHistory,
    setDirection,
    reloadFilteroptions,
    setBelastungsplanMinSize,
    setBelastungsplanMaxSize,
    setBelastungsplanChosenSize,
    getMessfaehigkeitenForGivenZeitraum,
    setIncludedMeasuringDays,
    setRequestedMeasuringDays,
  };
});

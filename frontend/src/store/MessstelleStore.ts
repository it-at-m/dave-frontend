import type MessfaehigkeitDTO from "@/types/messstelle/MessfaehigkeitDTO";
import type MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

import _ from "lodash";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import DetektierteFahrzeugart from "@/types/enum/DetektierteFahrzeugart";
import { useDateUtils } from "@/util/DateUtils";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import { useMessfaehigkeitRanking } from "@/util/MessfaehigkeitRanking";

export const useMessstelleStore = defineStore("messstelleStore", () => {
  const dateUtils = useDateUtils();
  const messfaehigkeitRanking = useMessfaehigkeitRanking();

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
  // Actual calculated values of Messfähigkeit for the selected day or time range
  const actualMessfaehigkeit = ref<MessfaehigkeitDTO>(
    DefaultObjectCreator.createDefaultMessfaehigkeitDTO()
  );
  const includedMeasuringDays = ref(0);
  const requestedMeasuringDays = ref(0);

  const getMessstelleInfo = computed(() => messstelleInfo.value);
  const getActiveTab = computed(() => activeTab.value);
  const isKfzMessstelle = computed(
    () =>
      messstelleInfo.value.detektierteVerkehrsarten ===
      DetektierteFahrzeugart.KFZ
  );
  const getFilteroptions = computed(() => filterOptions.value);
  const getDirection = computed(() => direction.value);
  const isHistory = computed(() => history.value);
  const getBelastungsplanMinSize = computed(() => belastungsplanMinSize.value);
  const getBelastungsplanMaxSize = computed(() => belastungsplanMinSize.value);
  const getBelastungsplanChosenSize = computed(
    () => belastungsplanChosenSize.value
  );
  const getActualMessfaehigkeit = computed(() => actualMessfaehigkeit.value);
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
    filterOptions.value = _.cloneDeep(filterOptions.value);
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
  function calculateActualMessfaehigkeit(
    selectedAb: string,
    selectedBis?: string
  ): void {
    actualMessfaehigkeit.value.gueltigAb = selectedAb;
    actualMessfaehigkeit.value.gueltigBis = selectedBis
      ? selectedBis
      : selectedAb;
    messstelleInfo.value.messfaehigkeiten.forEach(
      (faehigkeit: MessfaehigkeitDTO) => {
        if (selectedBis) {
          if (
            dateUtils.intersectsRange(
              selectedAb,
              selectedBis,
              faehigkeit.gueltigAb,
              faehigkeit.gueltigBis
            )
          ) {
            actualMessfaehigkeit.value.fahrzeugklassen =
              messfaehigkeitRanking.getMinFahrzeugklassen(
                faehigkeit.fahrzeugklassen,
                actualMessfaehigkeit.value.fahrzeugklassen
              );
            actualMessfaehigkeit.value.intervall =
              messfaehigkeitRanking.getMinIntervall(
                faehigkeit.intervall,
                actualMessfaehigkeit.value.intervall
              );
          }
        } else {
          // single day selected
          if (
            dateUtils.isDateBetweenAsStrings(
              selectedAb,
              faehigkeit.gueltigAb,
              faehigkeit.gueltigBis
            )
          ) {
            actualMessfaehigkeit.value.fahrzeugklassen =
              faehigkeit.fahrzeugklassen;
            actualMessfaehigkeit.value.intervall = faehigkeit.intervall;
          }
        }
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
    getActualMessfaehigkeit,
    getIncludedMeasuringDays,
    getRequestedMeasuringDays,
    setActiveTab,
    setMessstelleInfo,
    setFilteroptions,
    setFilteroptionsHistory,
    setDirection,
    reloadFilteroptions,
    setBelastungsplanMinSize,
    setBelastungsplanMaxSize,
    setBelastungsplanChosenSize,
    calculateActualMessfaehigkeit,
    setIncludedMeasuringDays,
    setRequestedMeasuringDays,
  };
});

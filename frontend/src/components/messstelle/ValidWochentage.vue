<template>
    <v-sheet>
      <v-icon class="pr-3" icon="mdi-chart-line"/>
      <span>
        Von den ausgewählten {{ zeitraumRange }} Tagen
        {{ getChosenWochentageNumberText }} in die Auswertung
        eingeflossen
      </span>
    </v-sheet>
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import MessstelleOptionsmenuService from "@/api/service/MessstelleOptionsmenuService";
import type {ValidWochentageInPeriodDto} from "@/types/messstelle/ValidWochentageInPeriodDto";
import TagesTyp from "@/types/enum/TagesTyp";
import {useDateUtils} from "@/util/DateUtils";
import {useRoute} from "vue-router";
import {useSnackbarStore} from "@/store/snackbar";
import {useMessstelleStore} from "@/store/messstelle";

const messstelleStore = useMessstelleStore();
const snackbarStore = useSnackbarStore();
const numberValidWochentage = ref({} as ValidWochentageInPeriodDto);
const dateUtils = useDateUtils();
const route = useRoute();

onMounted(() => {
    getValidWochentage();
});

const chosenOptions = computed(() => {
    return messstelleStore.getFilteroptions;
});

const chosenOptionsZeitraum = computed(() => {
    return chosenOptions.value.zeitraum;
});

const chosenOptionsTagesTyp = computed(() => {
    return chosenOptions.value.tagesTyp;
});

const zeitraumRange = computed(() => {
    const sortedDates = dateUtils.sortDatesDescAsStrings(
        chosenOptions.value.zeitraum.slice()
    );
    const startDate = new Date(sortedDates[1]);
    const endDate = new Date(sortedDates[0]);
    const differenceInMs = Math.abs(endDate.valueOf() - startDate.valueOf());
    return differenceInMs / (1000 * 60 * 60 * 24) + 1;
});

const validWochentageRequestDto = computed(() => {
    const sortedDates = dateUtils.sortDatesDescAsStrings(
        chosenOptions.value.zeitraum.slice()
    );
    return {
        startDate: sortedDates[1],
        endDate: sortedDates[0],
        messstelleId: route.params.messstelleId as string,
      // TODO als prop injecten
    };
});

const getChosenWochentageNumber = computed(() => {
    switch (chosenOptions.value.tagesTyp) {
        case TagesTyp.MO_SO: {
            return numberValidWochentage.value.numberOfValidTagesTypMoSo;
        }
        case TagesTyp.SAMSTAG: {
            return numberValidWochentage.value.numberOfValidTagesTypMoSo;
        }
        case TagesTyp.SONNTAG_FEIERTAG: {
            return numberValidWochentage.value
                .numberOfValidTagesTypSonntagFeiertag;
        }
        case TagesTyp.WERKTAG_DI_MI_DO: {
            return numberValidWochentage.value.numberOfValidTagesTypDiMiDo;
        }
        case TagesTyp.WERKTAG_MO_FR: {
            return numberValidWochentage.value.numberOfValidTagesTypMoFr;
        }
        case TagesTyp.WERKTAG_FERIEN: {
            return numberValidWochentage.value
                .numberOfValidTagesTypWerktagFerien;
        }
        default: {
            return "";
        }
    }
});

const getChosenWochentageNumberText = computed(() => {
    if (getChosenWochentageNumber.value == 1) {
        return "ist 1 Tag";
    } else {
        return `sind ${getChosenWochentageNumber.value} Tage`;
    }
});

watch([chosenOptionsZeitraum, chosenOptionsTagesTyp], () => {
    getValidWochentage();
});

function getValidWochentage() {
    MessstelleOptionsmenuService.getValidWochentageInPeriod(
        validWochentageRequestDto.value
    )
        .then((response) => {
            numberValidWochentage.value = response;
        })
        .catch((error) => {
            snackbarStore.showApiError(error);
        });
}
</script>

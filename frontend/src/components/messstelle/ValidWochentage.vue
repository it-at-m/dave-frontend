<template>
    <v-sheet>
        <v-menu
            color="secondary"
            offset-x
        >
            <template #activator="{ on, props }">
                <button
                    v-bind="props"
                    class="text-sm-left px-4 py-2 white--text button-background-color"
                    v-on="on"
                >
                    Von den ausgewählten {{ zeitraumRange }} Tagen sind
                    {{ getChosenWochentageNumber }} Tage in die Auswertung
                    eingeflossen
                </button>
            </template>
            <v-list class="text-caption">
                <v-list-item class="py-0 my-0">
                    Von {{ zeitraumRange }} ausgewählten Tagen liegen für
                    {{ totalValidWochentage }} Wochentage plausible Daten vor
                </v-list-item>
                <v-list-item>
                    {{ numberValidWochentage.numberOfValidTagesTypDiMiDo }}
                    Di/Mi/Do
                </v-list-item>
                <v-list-item>
                    {{ numberValidWochentage.numberOfValidTagesTypMoFr }}
                    Mo-Fr
                </v-list-item>
                <v-list-item>
                    {{ numberValidWochentage.numberOfValidTagesTypSamstag }}
                    Sa
                </v-list-item>
                <v-list-item>
                    {{
                        numberValidWochentage.numberOfValidTagesTypSonntagFeiertag
                    }}
                    So/Feiertag
                </v-list-item>
                <v-list-item>
                    {{ numberValidWochentage.numberOfValidTagesTypMoSo }}
                    Mo-So
                </v-list-item>
                <v-list-item>
                    {{
                        numberValidWochentage.numberOfValidTagesTypWerktagFerien
                    }}
                    Werktag/Ferien
                </v-list-item>
            </v-list>
        </v-menu>
    </v-sheet>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "@/api/util/useStore";
import MessstelleOptionsmenuService from "@/api/service/MessstelleOptionsmenuService";
import { ValidWochentageInPeriodDto } from "@/types/messstelle/ValidWochentageInPeriodDto";
import TagesTyp from "@/types/enum/TagesTyp";
import { useDateUtils } from "@/util/DateUtils";
import { useRoute } from "vue-router/composables";

const store = useStore();
const numberValidWochentage = ref({} as ValidWochentageInPeriodDto);
const dateUtils = useDateUtils();
const route = useRoute();

onMounted(() => {
    getValidWochentage();
});

const chosenOptions = computed(() => {
    return store.getters["filteroptionsMessstelle/getFilteroptions"];
});

const zeitraumRange = computed(() => {
    const sortedDates = dateUtils.sortDatesDescAsStrings(
        chosenOptions.value.zeitraum.slice()
    );
    const startDate = new Date(sortedDates[1]);
    const endDate = new Date(sortedDates[0]);
    const differenceInMs = Math.abs(endDate.valueOf() - startDate.valueOf());
    return differenceInMs / (1000 * 60 * 60 * 24);
});

const totalValidWochentage = computed(() => {
    return (
        numberValidWochentage.value.numberOfValidTagesTypMoSo +
        numberValidWochentage.value.numberOfValidTagesTypMoFr +
        numberValidWochentage.value.numberOfValidTagesTypDiMiDo +
        numberValidWochentage.value.numberOfValidTagesTypSamstag +
        numberValidWochentage.value.numberOfValidTagesTypSonntagFeiertag +
        numberValidWochentage.value.numberOfValidTagesTypWerktagFerien
    );
});

const validWochentageRequestDto = computed(() => {
    const sortedDates = dateUtils.sortDatesDescAsStrings(
        chosenOptions.value.zeitraum.slice()
    );
    return {
        startDate: sortedDates[1],
        endDate: sortedDates[0],
        messstelleId: route.params.messstelleId,
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

watch([chosenOptions.value.zeitraum, chosenOptions.value.tagesTyp], () => {
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
            store.dispatch("snackbar/showError", error);
        });
}
</script>

<style scoped>
.v-list-item {
    min-height: 0;
}

.button-background-color {
    background-color: #f57c00;
}
</style>

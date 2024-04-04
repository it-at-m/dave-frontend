<template>
    <div>
        <v-menu offset-x>
            <template #activator="{ on, props }">
                <v-btn
                    v-bind="props"
                    width="100%"
                    elevation="0"
                    v-on="on"
                >
                    test
                </v-btn>
            </template>
            <v-list>
                <v-list-item>
                    <v-list-item-title>test</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from "vue";
import { useStore } from "@/api/util/useStore";
import MessstelleOptionsmenuService from "@/api/service/MessstelleOptionsmenuService";
import { ValidWochentageInPeriodRequestDto } from "@/types/messstelle/ValidWochentageInPeriodRequestDto";
import { ValidWochentageInPeriodDto } from "@/types/messstelle/ValidWochentageInPeriodDto";
import { valid } from "semver";
import TagesTyp from "@/types/enum/TagesTyp";

const store = useStore();
const numberValidWochentage = ref({} as ValidWochentageInPeriodDto);

const chosenOptions = computed(() => {
    return store.getters["filteroptionsMessstelle/getFilteroptions"];
});

const validWochentageRequestDto = computed(() => {
    return {
        startDate: chosenOptions.value.zeitraum[1],
        endDate: chosenOptions.value.zeitraum[0],
        messstelleId: "testid",
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

watch(chosenOptions, () => {
    MessstelleOptionsmenuService.getValidWochentageInPeriod(
        validWochentageRequestDto.value
    ).then((response) => {
        numberValidWochentage.value = response;
    });
});
</script>

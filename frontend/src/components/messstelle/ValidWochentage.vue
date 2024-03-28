<template>
    <div>test</div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from "vue";
import { useStore } from "@/api/util/useStore";
import MessstelleOptionsmenuService from "@/api/service/MessstelleOptionsmenuService";
import { ValidWochentageInPeriodRequestDto } from "@/types/messstelle/ValidWochentageInPeriodRequestDto";
import { ValidWochentageInPeriodDto } from "@/types/messstelle/ValidWochentageInPeriodDto";
import { valid } from "semver";

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

watch(chosenOptions, () => {
    console.log("dont");
    /* MessstelleOptionsmenuService.getValidWochentageInPeriod(
        validWochentageRequestDto.value
    ).then((response) => {
        numberValidWochentage.value = response;
    });*/
});
</script>

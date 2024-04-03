<template>
    <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
    >
        <v-autocomplete
            v-model="values"
            :items="jahre"
            outlined
            dense
            chips
            small-chips
            label="Jahre"
            multiple
        ></v-autocomplete>
    </v-card>
</template>

<script setup lang="ts">

import { computed } from "vue";

const jahre = computed(() => {
    // TODO Einschränkung der Jahre je nach Zeitintervall
    const years = [];
    for (let index = 2006; index <= new Date().getFullYear(); index++) {
        years.push(index);
    }
    return years;
});
</script>

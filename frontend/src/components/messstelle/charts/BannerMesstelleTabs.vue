<template>
    <v-banner>
        <v-icon
            color="error"
            size="36"
            icon="mdi-alert-decagram-outline"
        />
        {{ ZEITRAUM_GROESSER_FUENF_JAHRE }}
    </v-banner>
</template>
<script setup lang="ts">
const ZEITRAUM_GROESSER_FUENF_JAHRE =
    "Da der Zeitraum größer als 5 Jahre ist steht die Anzeige nicht zur Verfügung";
</script>
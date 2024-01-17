<template>
    <v-sheet
        width="100%"
        color="transparent"
        class="pa-4"
        :min-height="props.minheight"
        :height="props.height"
    >
        <span class="text-caption">Messstelle</span>
        <br />
        <span class="text-h5">{{ mstId }}</span>
        <br /><br />
        <span class="text-caption">{{ standort }} </span>
        <br />
        <span class="text-caption"
            >{{ stadtbezirk }} - {{ stadtbezirkNummer }}
        </span>
    </v-sheet>
</template>
<script setup lang="ts">
interface Props {
    mstId: string;
    stadtbezirkNummer: number;
    stadtbezirk: string;
    standort: string;
    height: string;
    minheight: string;
}
defineProps<Props>();
</script>


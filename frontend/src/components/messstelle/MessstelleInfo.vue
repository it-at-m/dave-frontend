<template>
    <v-sheet
        width="100%"
        color="transparent"
        class="pa-4"
        :min-height="props.minheight"
        :height="props.height"
    >
        <span class="text-caption">Messstelle</span><br />
        <span class="text-h5">{{ props.id }}</span
        ><br /><br />
        <span class="text-caption"
            >Stadtbezirk {{ props.stadtbezirkNummer }}</span
        >
    </v-sheet>
</template>
<script setup lang="ts">
interface Props {
    id: string;
    stadtbezirkNummer: number;
    height: string;
    minheight: string;
}

const props = defineProps<Props>();
</script>


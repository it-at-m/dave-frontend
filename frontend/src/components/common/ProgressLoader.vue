<template>
    <v-overlay
        absolute
        :value="value"
    >
        <v-progress-circular
            :size="120"
            :width="10"
            value="30"
            color="grey lighten-3"
            indeterminate
        >
            laden
        </v-progress-circular>
    </v-overlay>
</template>

<script lang="ts" setup>
interface Props {
    value: boolean;
}

defineProps<Props>();
</script>
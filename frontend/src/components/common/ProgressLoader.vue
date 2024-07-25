<template>
    <v-overlay
        absolute
        :value="value"
    >
        <v-progress-circular
            :size="120"
            :width="10"
            color="grey-lighten-3"
            indeterminate
        >
          <template v-slot:default> laden </template>
        </v-progress-circular>
    </v-overlay>
</template>

<script lang="ts" setup>
interface Props {
    value: boolean;
}

defineProps<Props>();
</script>
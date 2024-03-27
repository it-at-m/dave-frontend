<template>
    <v-tooltip
        :disabled="!isDisabled"
        top
    >
        <template #activator="{ on }">
            <div
                style="width: 100%"
                class="d-flex justify-center"
                v-on="on"
            >
                <v-tab :disabled="isDisabled">
                    {{ tabName }}
                    <v-icon>{{ icon }}</v-icon>
                </v-tab>
            </div>
        </template>
        <span>{{ tooltipText }}</span>
    </v-tooltip>
</template>
<script setup lang="ts">
interface Props {
    isDisabled: boolean;
    tooltipText: string;
    icon: string;
    tabName: string;
}

defineProps<Props>();
</script>
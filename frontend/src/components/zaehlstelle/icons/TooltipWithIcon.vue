<template>
    <v-tooltip bottom>
        <template #activator="{ on, attrs }">
            <v-icon
                :small="small"
                :large="large"
                :x-large="xLarge"
                :dense="dense"
                class="mr-1"
                :color="color"
                v-bind="attrs"
                v-on="on"
                >{{ icon }}
            </v-icon>
        </template>
        <span>{{ tooltip }}</span>
    </v-tooltip>
</template>
<script setup lang="ts">
interface Props {
    small?: boolean;
    large?: boolean;
    xLarge?: boolean;
    dense?: boolean;
    color?: string;
    icon?: string;
    tooltip?: string;
}

withDefaults(defineProps<Props>(), {
    small: false,
    large: false,
    xLarge: false,
    dense: false,
    color: "black",
});
</script>
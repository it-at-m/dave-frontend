<template>
    <div :style="headerStyle">{{ headerText }}</div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
interface Props {
    fontSize?: string;
    fontWeight?: string;
    padding?: string;
    headerText: string;
}

const props = withDefaults(defineProps<Props>(), {
    fontSize: "medium",
    fontWeight: "normal",
});

const headerStyle = computed(() => {
    let headerStyle = `font-size: ${props.fontSize}; font-weight: ${props.fontWeight};`;
    if (props.padding) {
        headerStyle = `${headerStyle} padding: ${props.padding}`;
    }
    return headerStyle;
});
</script>
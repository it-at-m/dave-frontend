<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
  >
    <text
      x="16"
      y="26"
      class="svg-text"
      text-anchor="middle"
      fill="currentColor"
    >
      {{ iconText }}
    </text>
  </svg>
</template>
<script setup lang="ts">
const iconText = defineModel<string>({
  required: true,
});
</script>
<style lang="css">
.svg-text {
  font: bold 23px Arial;
  font-stretch: condensed;
}
</style>

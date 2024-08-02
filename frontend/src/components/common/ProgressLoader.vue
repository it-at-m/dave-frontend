<template>
  <v-overlay
    v-model="showLoader"
    class="align-center justify-center"
    contained
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

const showLoader = defineModel<boolean>({ required: true });

</script>

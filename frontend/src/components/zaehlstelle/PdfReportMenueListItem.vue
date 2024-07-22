<template>
  <v-list-item>
    <template v-slot:prepend>
      <v-checkbox v-model="checkbox"/>
    </template>
    <v-list-item-title>{{ title }}</v-list-item-title>
    <v-list-item-subtitle>{{ subtitle }}</v-list-item-subtitle>
  </v-list-item>
</template>

<script setup lang="ts">

const checkbox = defineModel<boolean>({required: true});

interface Props {
  title?: string;
  subtitle?: string;
}

withDefaults(defineProps<Props>(), {
  title: "",
  subtitle: "",
});

</script>
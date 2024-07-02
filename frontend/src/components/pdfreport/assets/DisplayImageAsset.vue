<template>
  <v-sheet width="100%">
    <v-row no-gutters>
      <v-col>
        <v-img
          :src="image"
          :width="width"
          max-width="100%"
          max-height="200px"
        ></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <span class="text-caption text-grey-lighten-1">{{ caption }}</span>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup lang="ts">
interface Props {
  caption?: string;
  image?: string;
  width?: string;
}

withDefaults(defineProps<Props>(), {
  width: "100%",
});
</script>

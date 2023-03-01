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

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Loader extends Vue {
  // Properties
  @Prop({default: false}) value!: boolean

}
</script>
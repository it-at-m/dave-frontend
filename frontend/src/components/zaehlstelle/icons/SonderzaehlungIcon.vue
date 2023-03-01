<template>
  <tooltip-with-icon
      :x-large="large"
      :dense="dense"
      :color="color"
      :icon="icon.iconPath"
      :tooltip="icon.tooltip"
  ></tooltip-with-icon>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import TooltipWithIcon from "@/components/zaehlstelle/icons/TooltipWithIcon.vue"
import IconTooltip from "@/types/util/IconTooltip";

@Component({
  components: {
    TooltipWithIcon
  }
})
export default class SonderzaehlungIcon extends Vue {
  @Prop({default: false}) large?: boolean
  @Prop({default: false}) dense?: boolean
  @Prop({default: "white"}) color?: string

  /**
   * Lädt das richtige MDI Icon aus der Liste.
   */
  get icon() {
    return new IconTooltip("mdi-alpha-s", "Sonderzählung")
  }
}
</script>
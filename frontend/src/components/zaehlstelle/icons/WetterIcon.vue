<template>
  <base-icon
      :small="small"
      :dense="dense"
      :color="color"
      :icon="icon.iconPath"
      :tooltip="icon.tooltip"
  ></base-icon>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import BaseIcon from "@/components/zaehlstelle/icons/TooltipWithIcon.vue"
import IconTooltip from "@/types/util/IconTooltip";
import Wetter from "@/types/enum/Wetter"

@Component({
  components: {
    BaseIcon
  }
})
export default class WetterIcon extends Vue {

  @Prop({default: false}) small?: boolean
  @Prop({default: false}) dense?: boolean
  @Prop({default: "black"}) color?: string
  @Prop() wetter!: string

  /**
   * Lädt das richtige MDI Icon aus der Liste.
   */
  get icon() {
    if (!WetterIcon.wetterIcons().has(this.wetter)) {
      return new IconTooltip("mdi-cloud-question", "Keine Information zum Wetter")
    }
    return WetterIcon.wetterIcons().get(this.wetter)
  }

  /**
   * Alle Wetter Icons zu den Schlüsseln.
   */
  static wetterIcons(): Map<string, IconTooltip> {
    return new Map([
      [Wetter.SUNNY, new IconTooltip("mdi-weather-sunny", "Sonnig")],
      [Wetter.SUNNY_COLD, new IconTooltip("mdi-weather-hazy", "Sonnig, kalt")],
      [Wetter.CLOUDY, new IconTooltip("mdi-weather-partly-cloudy", "Bewölkt")],
      [Wetter.RAINY, new IconTooltip("mdi-weather-rainy", "Regnerisch (Schauer)")],
      [Wetter.CONTINUOUS_RAINY, new IconTooltip("mdi-weather-pouring", "Regnerisch (dauerhaft)")],
      [Wetter.FOGGY, new IconTooltip("mdi-weather-fog", "Neblig")],
      [Wetter.SNOWY, new IconTooltip("mdi-weather-snowy-heavy", "Schneefall")]
    ])
  }

}
</script>
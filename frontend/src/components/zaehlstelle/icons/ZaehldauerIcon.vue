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
import { Component, Prop, Vue } from "vue-property-decorator";
import BaseIcon from "@/components/zaehlstelle/icons/TooltipWithIcon.vue";
import IconTooltip from "@/types/util/IconTooltip";
import Zaehldauer from "@/types/enum/Zaehldauer";

@Component({
    components: {
        BaseIcon,
    },
})
export default class ZaehldauerIcon extends Vue {
    @Prop({ default: false }) small?: boolean;
    @Prop({ default: false }) dense?: boolean;
    @Prop({ default: "black" }) color?: string;
    @Prop() zaehldauer!: string;

    /**
     * Lädt das richtige Zähldauer Icon aus der Liste.
     */
    get icon() {
        let result = ZaehldauerIcon.zaehldauerIcons().get(this.zaehldauer);
        if (result === undefined) {
            result = new IconTooltip(
                "mdi-help-box",
                "Keine Information zur Zähldauer"
            );
        }
        return result;
    }

    /**
     * Alle Zähldauer Icons zu den Schlüsseln.
     */
    static zaehldauerIcons(): Map<string, IconTooltip> {
        return new Map([
            [
                Zaehldauer.DAUER_2_X_4_STUNDEN,
                new IconTooltip("$zaehldauer2x4h", "2x4h Zählung"),
            ],
            [
                Zaehldauer.DAUER_24_STUNDEN,
                new IconTooltip("$zaehldauer24h", "24h Zählung"),
            ],
            [
                Zaehldauer.DAUER_16_STUNDEN,
                new IconTooltip("$zaehldauer16h", "16h Zählung"),
            ],
            [
                Zaehldauer.DAUER_13_STUNDEN,
                new IconTooltip("$zaehldauer13h", "13h Zählung"),
            ],
            [
                Zaehldauer.SONSTIGE,
                new IconTooltip("$zaehldauerSoZ", "Sonstige Zählung"),
            ],
        ]);
    }
}
</script>
<template>
    <tooltip-with-icon
        :small="small"
        :dense="dense"
        :color="color"
        :icon="icon.iconPath"
        :tooltip="icon.tooltip"
    ></tooltip-with-icon>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import TooltipWithIcon from "@/components/zaehlstelle/icons/TooltipWithIcon.vue";
import IconTooltip from "@/types/util/IconTooltip";
import Quelle from "@/types/enum/Quelle";

@Component({
    components: {
        TooltipWithIcon,
    },
})
export default class QuelleIcon extends Vue {
    @Prop({ default: false }) small?: boolean;
    @Prop({ default: false }) dense?: boolean;
    @Prop({ default: "black" }) color?: string;
    @Prop() quelle!: string;

    /**
     * Lädt das richtige MDI Icon aus der Liste.
     */
    get icon() {
        if (!QuelleIcon.quelleIcons().has(this.quelle)) {
            return new IconTooltip(
                "mdi-help-box",
                "Keine Information zur Quelle"
            );
        }
        return QuelleIcon.quelleIcons().get(this.quelle);
    }

    /**
     * Alle Quelle Icons zu den Schlüsseln.
     */
    static quelleIcons(): Map<string, IconTooltip> {
        return new Map([
            [
                Quelle.MANUALLY,
                new IconTooltip("mdi-clipboard-account", "Manuelle Zählung"),
            ],
            [Quelle.DETECTOR, new IconTooltip("mdi-robot", "Detektorzählung")],
            [Quelle.RADAR, new IconTooltip("mdi-radar", "Radarzählung")],
            [Quelle.VIDEO, new IconTooltip("mdi-video", "Videozählung")],
        ]);
    }
}
</script>
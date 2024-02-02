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

@Component({
    components: {
        BaseIcon,
    },
})
export default class FahrspurenIcon extends Vue {
    @Prop({ default: false }) small?: boolean;
    @Prop({ default: false }) dense?: boolean;
    @Prop({ default: "black" }) color?: string;
    @Prop() fahrspuren!: number;

    /**
     * Lädt das richtige MDI Icon aus der Liste.
     */
    get icon() {
        let result = FahrspurenIcon.fahrspurenIcons().get(this.fahrspuren);
        if (result === undefined) {
            result = new IconTooltip(
                "mdi-help",
                "Keine Information zur Fahrspurenanzahl"
            );
        }
        return result;
    }

    /**
     * Alle Zahlen-Icons zu den Schlüsseln.
     */
    // todo: wie viele fahrspuren gibt es maximal?
    static fahrspurenIcons(): Map<number, IconTooltip> {
        return new Map([
            [0, new IconTooltip("mdi-numeric-0-box", "keine Fahrspur")],
            [1, new IconTooltip("mdi-numeric-1-box", "eine Fahrspur")],
            [2, new IconTooltip("mdi-numeric-2-box", "zwei Fahrspuren")],
            [3, new IconTooltip("mdi-numeric-3-box", "drei Fahrspuren")],
            [4, new IconTooltip("mdi-numeric-4-box", "vier Fahrspuren")],
            [5, new IconTooltip("mdi-numeric-5-box", "fünf Fahrspuren")],
            [6, new IconTooltip("mdi-numeric-6-box", "sechs Fahrspuren")],
            [7, new IconTooltip("mdi-numeric-7-box", "sieben Fahrspuren")],
        ]);
    }
}
</script>
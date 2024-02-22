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
export default class FahrzeugklassenIcon extends Vue {
    @Prop({ default: false }) small?: boolean;
    @Prop({ default: false }) dense?: boolean;
    @Prop({ default: "black" }) color?: string;
    @Prop() fahrzeugklasse!: string;

    /**
     * Lädt das richtige SVG Icon aus der Liste.
     */
    get icon() {
        let result = FahrzeugklassenIcon.fahrzeugklassenIcons().get(
            this.fahrzeugklasse
        );
        if (result === undefined) {
            result = new IconTooltip(
                "mdi-help",
                "Keine Information zu den Fahrzeugklassen"
            );
        }
        return result;
    }

    /**
     * Alle Fahrzeugklassen Icons zu den Schlüsseln.
     */
    static fahrzeugklassenIcons(): Map<string, IconTooltip> {
        return new Map([
            ["8+1", new IconTooltip("$achtUndEins", "Fahrzeugklassen: 8+1")],
            ["QKFZ", new IconTooltip("$qkfz", "Fahrzeugklassen: QKFZ")],
            //todo: ist bei QPKW + QLKW ein leerzeichen dazwischen?
            [
                "QPKW + QLKW",
                new IconTooltip("$qpkwLkw", "Fahrzeugklassen: QPKW + QLKW"),
            ],
        ]);
    }
}
</script>
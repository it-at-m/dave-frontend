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
import Zaehlart from "@/types/enum/Zaehlart";

@Component({
    components: {
        TooltipWithIcon,
    },
})
export default class ZaehlartIcon extends Vue {
    @Prop({ default: false }) small?: boolean;
    @Prop({ default: false }) dense?: boolean;
    @Prop({ default: "black" }) color?: string;
    @Prop() zaehlart!: string;

    /**
     * Lädt das richtige MDI Icon aus der Liste.
     */
    get icon() {
        let result = ZaehlartIcon.zaehlartIcons().get(this.zaehlart);
        if (result === undefined) {
            result = new IconTooltip(
                "mdi-help-box",
                "Keine Information zur Zählart"
            );
        }
        return result;
    }

    /**
     * Alle Zählarten Icons zu den Schlüsseln
     */
    static zaehlartIcons(): Map<string, IconTooltip> {
        return new Map([
            [Zaehlart.N, new IconTooltip("$artN", "Standardzählung")],
            [
                Zaehlart.H,
                new IconTooltip(
                    "$artH",
                    "Hauptverkehrsrichtung/Oberfläche/Hoch"
                ),
            ],
            [Zaehlart.Q, new IconTooltip("$artQ", "Querschnitt")],
            [Zaehlart.QB, new IconTooltip("$artQB", "Bahnschnitt")],
            [
                Zaehlart.QH,
                new IconTooltip(
                    "$artQH",
                    "Querschnitt/Hauptverkehrsrichtung/Oberfläche/Hoch"
                ),
            ],
            [Zaehlart.QI, new IconTooltip("$artQI", "Isarschnitt")],
            [Zaehlart.QR, new IconTooltip("$artQR", "Querschnitt Radverkehr")],
            [Zaehlart.QS, new IconTooltip("$artQSt", "Stadtgrenzzählung")],
            [
                Zaehlart.Q_,
                new IconTooltip("$artQS", "Querschnitt/Sonderzählung"),
            ],
            [
                Zaehlart.QT,
                new IconTooltip(
                    "$artQT",
                    "Querschnitt Tunnel/Unterführung/Tief"
                ),
            ],
            [Zaehlart.R, new IconTooltip("$artR", "Radverkehrszählung")],
            [Zaehlart.T, new IconTooltip("$artT", "Tunnel/Unterführung/Tief")],
            [Zaehlart.TK, new IconTooltip("$artTK", "Teilknoten")],
        ]);
    }
}
</script>
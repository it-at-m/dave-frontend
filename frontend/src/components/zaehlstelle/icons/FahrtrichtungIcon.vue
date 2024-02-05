<template>
    <base-icon
        :small="small"
        :dense="dense"
        color="black"
        :icon="icon.iconPath"
        :tooltip="icon.tooltip"
    ></base-icon>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BaseIcon from "@/components/zaehlstelle/icons/TooltipWithIcon.vue";
import IconTooltip from "@/types/util/IconTooltip";
import Himmelsrichtungen from "@/types/enum/Himmelsrichtungen";

@Component({
    components: {
        BaseIcon,
    },
})
export default class FahrtrichtungIcon extends Vue {
    @Prop({ default: false }) small?: boolean;
    @Prop({ default: false }) dense?: boolean;
    @Prop() fahrtrichtung!: string;

    /**
     * Lädt das richtige MDI Icon aus der Liste.
     */
    get icon() {
        let result = FahrtrichtungIcon.himmelsrichtungIcons().get(
            this.fahrtrichtung
        );
        if (result === undefined) {
            result = new IconTooltip(
                "mdi-arrow-all",
                "Keine Information zur Fahrtrichtung"
            );
        }
        return result;
    }

    /**
     * Alle Richtungs Icons zu den Schlüsseln.
     */
    static himmelsrichtungIcons(): Map<string, IconTooltip> {
        return new Map([
            [
                Himmelsrichtungen.NORD,
                new IconTooltip(
                    "mdi-arrow-up-thin-circle-outline",
                    "Fahrtrichtung: Nord"
                ),
            ],
            [
                Himmelsrichtungen.SUED,
                new IconTooltip(
                    "mdi-arrow-down-thin-circle-outline",
                    "Fahrtrichtung: Süd"
                ),
            ],
            [
                Himmelsrichtungen.OST,
                new IconTooltip(
                    "mdi-arrow-right-thin-circle-outline",
                    "Fahrtrichtung: Ost"
                ),
            ],
            [
                Himmelsrichtungen.WEST,
                new IconTooltip(
                    "mdi-arrow-left-thin-circle-outline",
                    "Fahrtrichtung: West"
                ),
            ],
        ]);
    }
}
</script>
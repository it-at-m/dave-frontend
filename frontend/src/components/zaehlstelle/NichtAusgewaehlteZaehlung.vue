<template>
    <v-hover v-model="hover">
        <v-row
            no-gutters
            style="background-color: #ef9a9a"
        >
            <!-- red lighten-3 -->
            <v-col
                v-if="sonderzaehlung"
                cols="12"
                md="1"
                align-self="center"
                :class="isLarge ? '' : 'px-1'"
            >
                <sonderzaehlung-icon :large="isLarge" />
            </v-col>
            <v-col
                cols="12"
                :md="getMaxCols"
            >
                <v-sheet
                    width="100%"
                    :color="hover ? hoverColor : color"
                    outlined
                    class="px-4 py-2"
                    @click="openZaehlung"
                >
                    <span class="text-body-2"
                        >{{ $d(date, "short", "de-DE") }} |
                        {{ projektName }}</span
                    ><br />
                    <zaehlart-icon
                        dense
                        :zaehlart="zaehlart"
                        :color="iconColor"
                    ></zaehlart-icon>
                    <wetter-icon
                        dense
                        :wetter="wetter"
                        :color="iconColor"
                    ></wetter-icon>
                    <zaehldauer-icon
                        dense
                        :zaehldauer="zaehldauer"
                        :color="iconColor"
                    ></zaehldauer-icon>
                    <quelle-icon
                        dense
                        :quelle="quelle"
                        :color="iconColor"
                    ></quelle-icon>
                </v-sheet>
            </v-col>
        </v-row>
    </v-hover>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

// Komponenten
import WetterIcon from "@/components/zaehlstelle/icons/WetterIcon.vue";
import QuelleIcon from "@/components/zaehlstelle/icons/QuelleIcon.vue";
import ZaehldauerIcon from "@/components/zaehlstelle/icons/ZaehldauerIcon.vue";
import ZaehlartIcon from "@/components/zaehlstelle/icons/ZaehlartIcon.vue";
import SonderzaehlungIcon from "@/components/zaehlstelle/icons/SonderzaehlungIcon.vue";

@Component({
    components: {
        SonderzaehlungIcon,
        WetterIcon,
        QuelleIcon,
        ZaehldauerIcon,
        ZaehlartIcon,
    },
})
export default class NichtAusgeweahlteZaehlung extends Vue {
    @Prop() datum?: string;
    @Prop() projektName?: string;
    @Prop() zaehlart?: string;
    @Prop() wetter?: string;
    @Prop() zaehldauer?: number;
    @Prop() quelle?: boolean;
    @Prop({ default: false }) sonderzaehlung?: boolean;
    @Prop() color?: string;
    @Prop() hoverColor?: string;
    @Prop() id?: string;
    @Prop({ default: "black" }) iconColor?: string;

    private hover = false;

    /**
     * es muss für i18n ein Datumsobjekt erzeugt werden.
     */
    get date(): Date {
        if (this.datum && Date.parse(this.datum)) {
            return new Date(this.datum);
        }
        return new Date();
    }

    get getMaxCols(): number {
        return this.sonderzaehlung ? 11 : 12;
    }

    get isLarge(): boolean {
        return this.$vuetify.breakpoint.name === "xl";
    }

    /**
     * Die Zählung wird über den store auf aktiv gesetzt.
     */
    openZaehlung() {
        this.$store.dispatch("setZaehlungAlsAktiv", this.id);
    }
}
</script>
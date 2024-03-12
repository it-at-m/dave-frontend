import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify, { colors } from "vuetify/lib";

// Zaehldauer
import Zaehldauer2x4h from "@/components/zaehlstelle/icons/ZaehldauerIcons/Zaehldauer2x4hIcon.vue";
import Zaehldauer24h from "@/components/zaehlstelle/icons/ZaehldauerIcons/Zaehldauer24hIcon.vue";
import Zaehldauer16h from "@/components/zaehlstelle/icons/ZaehldauerIcons/Zaehldauer16hIcon.vue";
import Zaehldauer13h from "@/components/zaehlstelle/icons/ZaehldauerIcons/Zaehldauer13hIcon.vue";
import ZaehldauerSoZ from "@/components/zaehlstelle/icons/ZaehldauerIcons/ZaehldauerSoZIcon.vue";

// Zaehlart
import ArtN from "@/components/zaehlstelle/icons/ArtIcons/ArtN.vue";
import ArtH from "@/components/zaehlstelle/icons/ArtIcons/ArtH.vue";
import ArtQ from "@/components/zaehlstelle/icons/ArtIcons/ArtQ.vue";
import ArtQB from "@/components/zaehlstelle/icons/ArtIcons/ArtQB.vue";
import ArtQH from "@/components/zaehlstelle/icons/ArtIcons/ArtQH.vue";
import ArtQI from "@/components/zaehlstelle/icons/ArtIcons/ArtQI.vue";
import ArtQR from "@/components/zaehlstelle/icons/ArtIcons/ArtQR.vue";
import ArtQS from "@/components/zaehlstelle/icons/ArtIcons/ArtQS.vue";
import ArtQSt from "@/components/zaehlstelle/icons/ArtIcons/ArtQSt.vue";
import ArtQT from "@/components/zaehlstelle/icons/ArtIcons/ArtQT.vue";
import ArtR from "@/components/zaehlstelle/icons/ArtIcons/ArtR.vue";
import ArtT from "@/components/zaehlstelle/icons/ArtIcons/ArtT.vue";
import ArtTK from "@/components/zaehlstelle/icons/ArtIcons/ArtTK.vue";

//Fahrzeugklasse
import AchtUndEins from "@/components/messstelle/icons/FahrzeugklasseIcons/AchtUndEinsIcon.vue";
import QKFZIcon from "@/components/messstelle/icons/FahrzeugklasseIcons/QKFZIcon.vue";
import QpkwLkwIcon from "@/components/messstelle/icons/FahrzeugklasseIcons/QpkwLkwIcon.vue";

Vue.use(Vuetify);

const theme = {
    themes: {
        light: {
            primary: colors.blue.darken3,
            secondary: colors.orange.darken2,
            accent: colors.blue.darken4,
            success: colors.green.lighten2,
            error: colors.red.lighten2,
        },
    },
};

export default new Vuetify({
    theme: theme,
    icons: {
        values: {
            // Zaehlart
            artN: {
                component: ArtN,
            },
            artH: {
                component: ArtH,
            },
            artQ: {
                component: ArtQ,
            },
            artQB: {
                component: ArtQB,
            },
            artQH: {
                component: ArtQH,
            },
            artQI: {
                component: ArtQI,
            },
            artQR: {
                component: ArtQR,
            },
            artQS: {
                component: ArtQS,
            },
            artQSt: {
                component: ArtQSt,
            },
            artQT: {
                component: ArtQT,
            },
            artR: {
                component: ArtR,
            },
            artT: {
                component: ArtT,
            },
            artTK: {
                component: ArtTK,
            },
            // Zaehldauer
            zaehldauer2x4h: {
                component: Zaehldauer2x4h,
            },
            zaehldauer24h: {
                component: Zaehldauer24h,
            },
            zaehldauer16h: {
                component: Zaehldauer16h,
            },
            zaehldauer13h: {
                component: Zaehldauer13h,
            },
            zaehldauerSoZ: {
                component: ZaehldauerSoZ,
            },
            // Fahrzeugklasse
            achtUndEins: {
                component: AchtUndEins,
            },
            qkfz: {
                component: QKFZIcon,
            },
            qpkwLkw: {
                component: QpkwLkwIcon,
            },
        },
    },
});

import "@mdi/font/css/materialdesignicons.css";

import { createVuetify } from "vuetify";
import colors from "vuetify/util/colors";

import "@fontsource/roboto";
import "vuetify/styles";

import { mdi, aliases as mdiAliases } from "vuetify/iconsets/mdi";
import {
  VStepperVertical,
  VStepperVerticalItem,
} from "vuetify/labs/components";
import { de } from "vuetify/locale";

//Fahrzeugklasse
import achtPlusEins from "@/components/messstelle/icons/FahrzeugklasseIcons/AchtPlusEinsIcon.vue";
import summeKfz from "@/components/messstelle/icons/FahrzeugklasseIcons/SummeKfzIcon.vue";
import zweiPlusEins from "@/components/messstelle/icons/FahrzeugklasseIcons/ZweiPlusEinsIcon.vue";
// Zaehlart
import artH from "@/components/zaehlstelle/icons/ArtIcons/ArtH.vue";
import artN from "@/components/zaehlstelle/icons/ArtIcons/ArtN.vue";
import artQ from "@/components/zaehlstelle/icons/ArtIcons/ArtQ.vue";
import artQB from "@/components/zaehlstelle/icons/ArtIcons/ArtQB.vue";
import artQH from "@/components/zaehlstelle/icons/ArtIcons/ArtQH.vue";
import artQI from "@/components/zaehlstelle/icons/ArtIcons/ArtQI.vue";
import artQR from "@/components/zaehlstelle/icons/ArtIcons/ArtQR.vue";
import artQS from "@/components/zaehlstelle/icons/ArtIcons/ArtQS.vue";
import artQSt from "@/components/zaehlstelle/icons/ArtIcons/ArtQSt.vue";
import artQT from "@/components/zaehlstelle/icons/ArtIcons/ArtQT.vue";
import artR from "@/components/zaehlstelle/icons/ArtIcons/ArtR.vue";
import artT from "@/components/zaehlstelle/icons/ArtIcons/ArtT.vue";
import artTK from "@/components/zaehlstelle/icons/ArtIcons/ArtTK.vue";
// Zaehldauer
import zaehldauer2x4h from "@/components/zaehlstelle/icons/ZaehldauerIcons/Zaehldauer2x4hIcon.vue";
import zaehldauer13h from "@/components/zaehlstelle/icons/ZaehldauerIcons/Zaehldauer13hIcon.vue";
import zaehldauer16h from "@/components/zaehlstelle/icons/ZaehldauerIcons/Zaehldauer16hIcon.vue";
import zaehldauer24h from "@/components/zaehlstelle/icons/ZaehldauerIcons/Zaehldauer24hIcon.vue";
import zaehldauerSoZ from "@/components/zaehlstelle/icons/ZaehldauerIcons/ZaehldauerSoZIcon.vue";

const theme = {
  themes: {
    light: {
      colors: {
        primary: colors.blue.darken3,
        secondary: colors.orange.darken2,
        accent: colors.blue.darken4,
        success: colors.green.lighten2,
        error: colors.red.lighten2,
      },
    },
  },
};

export default createVuetify({
  theme: theme,
  icons: {
    defaultSet: "mdi",
    sets: {
      mdi,
    },
    aliases: {
      ...mdiAliases,
      // Zaehldauer
      zaehldauer2x4h,
      zaehldauer24h,
      zaehldauer16h,
      zaehldauer13h,
      zaehldauerSoZ,
      // Zaehlart
      artN,
      artH,
      artQ,
      artQB,
      artQH,
      artQI,
      artQR,
      artQS,
      artQSt,
      artQT,
      artR,
      artT,
      artTK,
      //Fahrzeugklasse
      achtPlusEins,
      summeKfz,
      zweiPlusEins,
    },
  },
  locale: {
    locale: "de",
    messages: { de },
  },
  components: {
    VStepperVertical,
    VStepperVerticalItem,
  },
  defaults: {
    VSelect: {
      itemColor: "primary",
    },
  },
});

<template>
  <v-app>
    <TheSnackbar />

    <v-app-bar
      color="primary"
      height="50"
      class="px-4"
    >
      <v-row align="center">
        <v-col
          cols="3"
          class="d-flex align-center justify-start"
        >
          <router-link
            to="/"
            style="text-decoration: none"
          >
            <v-toolbar-title class="text-white font-weight-medium">
              <span class="font-weight-medium">DAVe</span>
              <span class="font-weight-thin"> | Mobilitätsreferat</span>
            </v-toolbar-title>
          </router-link>
        </v-col>
        <v-spacer />
        <v-col
          cols="4"
          class="d-flex align-center justify-center"
        >
          <search-input-field />
        </v-col>
        <v-spacer />
        <v-col
          cols="3"
          class="d-flex align-center justify-end"
        >
          <v-btn
            v-tooltip:bottom="'Gesamtauswertungen'"
            icon="mdi-clipboard-pulse-outline"
            to="/auswertung"
          />
          <v-btn
            v-tooltip:bottom="'PDF-Report'"
            icon="mdi-file-chart"
            to="/pdfreport"
          />
          <visit-history />
          <info-message />
          <v-btn
            v-tooltip:bottom="'Anwenderhandbuch'"
            icon="mdi-clippy"
            @click="navigateToHandbuch"
          />
          <span> {{ loggedInUser }} </span>
        </v-col>
      </v-row>
    </v-app-bar>

    <router-view
      v-slot="{ Component }"
      :key="$route.fullPath"
    >
      <v-fade-transition mode="out-in">
        <component :is="Component" />
      </v-fade-transition>
    </router-view>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";

import goldTrophy from "@/../public/easteregg/trophy-outline-gold.svg";
import silverTrophy from "@/../public/easteregg/trophy-outline-silver.svg";
import SsoUserInfoService from "@/api/service/SsoUserInfoService";
import VersionInfoService from "@/api/service/VersionInfoService";
import InfoMessage from "@/components/app/InfoMessage.vue";
import SearchInputField from "@/components/app/SearchInputField.vue";
import VisitHistory from "@/components/app/VisitHistory.vue";
import TheSnackbar from "@/components/common/TheSnackbar.vue";
import { useSnackbarStore } from "@/store/snackbar";
import { useUserStore } from "@/store/user";
import SsoUserInfoResponse from "@/types/app/SsoUserInfoResponse";
import VersionInfoResponse from "@/types/app/VersionInfoResponse";

const URL_HANDBUCH_LINK =
  "https://wilma.muenchen.de/web/senders/af10dc2a-8da5-4d24-815a-b6a9df4c686b/documents/330c5be9-2ee3-4438-8623-6557755260d3";

const loggedInUser = ref("no-security");
const backendVersion = ref("");
const frontendVersion = ref("");

const snackbarStore = useSnackbarStore();
const userStore = useUserStore();

created();

function created() {
  SsoUserInfoService.getUserInfo()
    .then((ssoUserInfoResponse: SsoUserInfoResponse) => {
      userStore.setSsoUserInfoResponse(ssoUserInfoResponse);
      loggedInUser.value = userStore.getName;
    })
    .catch((error) => {
      snackbarStore.showApiError(error);
      return false;
    });
  VersionInfoService.getFrontendInfo()
    .then((frontendInfoResponse: VersionInfoResponse) => {
      frontendVersion.value = frontendInfoResponse.application.version;
    })
    .catch(() => {
      frontendVersion.value = "error";
    });
  VersionInfoService.getBackendInfo()
    .then((backendInfoResponse: VersionInfoResponse) => {
      backendVersion.value = backendInfoResponse.application.version;
    })
    .catch(() => {
      backendVersion.value = "error";
    });
  window.addEventListener("keypress", shortCuts);
}

function navigateToHandbuch() {
  window.open(URL_HANDBUCH_LINK);
}

// Easter Egg
const easterEgg = ref<Array<string>>([]);
const easterEggReq = ref<Array<string>>(["B", "o", "u", "l", "e"]);
function shortCuts(event: KeyboardEvent) {
  const location = window.location.host;
  if (location.includes("localhost") || location.includes("muenchen")) {
    if (easterEggReq.value.includes(event.key)) {
      easterEgg.value.push(event.key);
      if (
        easterEgg.value.length === easterEggReq.value.length &&
        easterEgg.value.join() === easterEggReq.value.join()
      ) {
        const split = loggedInUser.value.split(" ");
        if (
          split.length === 2 &&
          split[0].startsWith("R") &&
          split[1].startsWith("B")
        ) {
          window.open(goldTrophy, "Image", "width=700,height=700");
        } else {
          window.open(silverTrophy, "Image", "width=700,height=700");
        }
        easterEgg.value = [];
      }
    } else {
      easterEgg.value = [];
    }
  }
}
</script>

<style>
/* Alle Hinweise werden nun rot eingefärbt */
.v-messages {
  color: #e57373 !important;
}

.dave-default {
  --app-bar-height: 50px;
  width: 100%;
  height: 100%;
  /* Um auf der Y-Achse direkt unter der App Bar zu liegen */
  padding-top: var(--app-bar-height);
  position: fixed;
}
</style>

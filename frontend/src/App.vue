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
                  @click.native="clear"
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
              <v-tooltip location="bottom">
                <template #activator="{ props }">
                  <v-btn
                      v-bind="props"
                      icon="mdi-clipboard-pulse-outline"
                      to="/auswertung"
                  >
                  </v-btn>
                </template>
                <span> Gesamtauswertungen </span>
              </v-tooltip>
              <v-tooltip location="bottom">
                <template #activator="{ props }">
                  <v-btn
                      v-bind="props"
                      icon="mdi-file-chart"
                      to="/pdfreport"
                  >
                  </v-btn>
                </template>
                <span> PDF-Report </span>
              </v-tooltip>
              <visit-history />
              <info-message />
              <v-tooltip location="bottom">
                <template #activator="{ props }">
                  <v-btn
                      v-bind="props"
                      icon="mdi-clippy"
                      @click="navigateToHandbuch"
                  >
                  </v-btn>
                </template>
                <span> Anwenderhandbuch </span>
              </v-tooltip>
              <span> {{ loggedInUser }} </span>
            </v-col>
          </v-row>
        </v-app-bar>

      <router-view v-slot="{ Component }" :key="$route.fullPath">
        <v-fade-transition mode="out-in">
          <component :is="Component" />
        </v-fade-transition>
      </router-view>
    </v-app>
</template>

<script setup lang="ts">
import {ref} from "vue";
import TheSnackbar from "@/components/common/TheSnackbar.vue";
import SsoUserInfoService from "@/api/service/SsoUserInfoService";
import VersionInfoService from "@/api/service/VersionInfoService";
import SsoUserInfoResponse from "@/types/app/SsoUserInfoResponse";
import VersionInfoResponse from "@/types/app/VersionInfoResponse";
import InfoMessage from "@/components/app/InfoMessage.vue";
import VisitHistory from "@/components/app/VisitHistory.vue";
import goldTrophy from "@/../public/easteregg/trophy-outline-gold.svg";
import silverTrophy from "@/../public/easteregg/trophy-outline-silver.svg";
import {useSnackbarStore} from "@/store/snackbar";
import {useUserStore} from "@/store/user";
import SearchInputField from "@/components/app/SearchInputField.vue";
import {useSearchStore} from "@/store/search";

const URL_HANDBUCH_LINK =
    "https://wilma.muenchen.de/web/senders/af10dc2a-8da5-4d24-815a-b6a9df4c686b/documents/330c5be9-2ee3-4438-8623-6557755260d3";

const loggedInUser = ref("no-security");
const backendVersion = ref("");
const frontendVersion = ref("");

const searchStore = useSearchStore();
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

function clear(): void {
  searchStore.setLastSearchQuery("");
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
</style>

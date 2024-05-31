<template>
    <v-app>
        <TheSnackbar />

        <!--  clipped-right: Gibt an, auf welcher Seite der Navigation-Drawer eingeblendet werden soll und dort soll die Toolbar bleiben  -->
        <v-app-bar
            app
            clipped-right
            color="primary"
            dark
        >
            <router-link
                to="/"
                @click.native="clear"
            >
                <v-toolbar-title class="white--text">
                    <span class="font-weight-medium">DAVe</span>
                    <span class="font-weight-thin"> | Mobilitätsreferat</span>
                </v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>
            <v-autocomplete
                id="suchfeld"
                v-model="selectedSuggestion"
                :items="suggestions"
                :search-input.sync="searchQuery"
                clearable
                color="black"
                flat
                hide-details
                label="Suche"
                no-filter
                prepend-inner-icon="mdi-magnify"
                return-object
                solo-inverted
                @keyup.enter="searchOrShowSelectedSuggestion"
                @keyup.delete="deleteChar"
                @update:list-index="updateSearchQuery"
                @update:search-input="suggest"
                @click:clear="clear"
            >
                <template #no-data>
                    <v-list class="pa-3">
                        <v-list-item-title>
                            Keine Suchvorschläge...
                        </v-list-item-title>
                    </v-list>
                </template>
                <template #item="{ item }">
                    <v-list-item-content>
                        <v-list-item-title
                            v-if="item.type === SUGGESTION_TYPE_SEARCH_TEXT"
                            @click="searchForSuggestion(item.text)"
                        >
                            <v-icon small>mdi-format-text</v-icon>
                            {{ item.text }}
                        </v-list-item-title>
                        <v-list-item-title
                            v-if="item.type === SUGGESTION_TYPE_VORSCHLAG"
                            @click="searchForSuggestion(item.text)"
                        >
                            <v-icon small>mdi-magnify</v-icon>
                            {{ item.text }}
                        </v-list-item-title>
                        <v-list-item-title
                            v-if="item.type === SUGGESTION_TYPE_ZAEHLSTELLE"
                            @click="showZaehlstelle(item)"
                        >
                            <v-icon small>mdi-map-marker</v-icon>
                            {{ item.text }}
                        </v-list-item-title>
                        <v-list-item-title
                            v-if="item.type === SUGGESTION_TYPE_ZAEHLUNG"
                            @click="showZaehlung(item)"
                        >
                            <v-icon small>mdi-counter</v-icon>
                            {{ item.text }}
                        </v-list-item-title>
                        <v-list-item-title
                            v-if="item.type === SUGGESTION_TYPE_MESSSTELLE"
                            @click="showMessstelle(item)"
                        >
                            <v-icon small>mdi-cards-diamond</v-icon>
                            {{ item.text }}
                        </v-list-item-title>
                    </v-list-item-content>
                </template>
            </v-autocomplete>
            <v-tooltip
                v-model="showtooltip"
                bottom
                nudge-right="180"
            >
                <template #activator="{ attrs }">
                    <v-btn
                        v-bind="attrs"
                        class="ml-2"
                        icon
                        @click="showtooltip = !showtooltip"
                    >
                        <v-icon>mdi-information</v-icon>
                    </v-btn>
                </template>
                <span>
                    <b>Beispiele, wonach gesucht werden kann:</b><br />
                    * Zählstellnummer / -art (123456, 123456T, ...)<br />
                    * Schlagwörter (Bahn, Isar, Tunnel, Brücke, ...)<br />
                    * Monat (Januar, Februar, ...)<br />
                    * Jahreszeit (Frühling, Sommer, ...)<br />
                    * Projektname / -nummer (U1022, VZ Stadtgrenzen 2019,
                    ...)<br />
                    * Straßen- / Platzname (Rosenheimerplatz, Dachauer Straße,
                    ...)<br />
                    * Datumsbereich (von TT.MM.YYYY bis TT.MM.YYYY)<br />
                    * Messstellennummer / -name (4203,...)<br />
                    <!--            Es fehlt noch: Wetter, Schulzeit, (erweiterte) Zählsituation-->
                </span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                    <v-btn
                        v-bind="attrs"
                        class="mr-2"
                        icon
                        small
                        to="/auswertung"
                        v-on="on"
                    >
                        <v-icon>mdi-clipboard-pulse-outline</v-icon>
                    </v-btn>
                </template>
                <span> Gesamtauswertungen </span>
            </v-tooltip>
            <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                    <v-btn
                        v-bind="attrs"
                        icon
                        small
                        to="/pdfreport"
                        v-on="on"
                    >
                        <v-icon>mdi-file-chart</v-icon>
                    </v-btn>
                </template>
                <span> PDF-Report </span>
            </v-tooltip>
            <visit-history />
            <info-message />
            <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                    <v-btn
                        v-bind="attrs"
                        class="ml-2 mr-2"
                        icon
                        small
                        v-on="on"
                        @click="navigateToHandbuch"
                    >
                        <v-icon>mdi-clippy</v-icon>
                    </v-btn>
                </template>
                <span> Anwenderhandbuch </span>
            </v-tooltip>
            <span> {{ loggedInUser }} </span>
        </v-app-bar>
        <v-main>
            <v-fade-transition mode="out-in">
                <!--    Damit Seite auch bei ID Aenderung reloadet wird muss der :key angegeben werden -->
                <router-view :key="$route.fullPath"></router-view>
            </v-fade-transition>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import TheSnackbar from "@/components/common/TheSnackbar.vue";
import SsoUserInfoService from "@/api/service/SsoUserInfoService";
import VersionInfoService from "@/api/service/VersionInfoService";
import SsoUserInfoResponse from "@/types/app/SsoUserInfoResponse";
import VersionInfoResponse from "@/types/app/VersionInfoResponse";
import Suggest from "@/types/suche/Suggest";
import SucheService from "@/api/service/SucheService";
import SucheComplexSuggestsDTO from "@/types/suche/SucheComplexSuggestsDTO";
import SucheWordSuggestDTO from "@/types/suche/SucheWordSuggestDTO";
import SucheZaehlungSuggestDTO from "@/types/suche/SucheZaehlungSuggestDTO";
import SucheZaehlstelleSuggestDTO from "@/types/suche/SucheZaehlstelleSuggestDTO";
import DefaultObjectCreator from "@/util/DefaultObjectCreator";
import InfoMessage from "@/components/app/InfoMessage.vue";
import SucheMessstelleSuggestDTO from "@/types/suche/SucheMessstelleSuggestDTO";
import VisitHistory from "@/components/app/VisitHistory.vue";
import goldTrophy from "@/../public/easteregg/trophy-outline-gold.svg";
import silverTrophy from "@/../public/easteregg/trophy-outline-silver.svg";
import { useStore } from "@/util/useStore";
import { useRoute, useRouter } from "vue-router/composables";
import { useSnackbarStore } from "@/store/modules/snackbar";
import { useSearchStore } from "@/store/modules/search";

const SUGGESTION_TYPE_SEARCH_TEXT = "searchtext";

const SUGGESTION_TYPE_VORSCHLAG = "vorschlag";

const SUGGESTION_TYPE_ZAEHLSTELLE = "zaehlstelle";

const SUGGESTION_TYPE_ZAEHLUNG = "zaehlung";

const SUGGESTION_TYPE_MESSSTELLE = "messstelle";
const URL_HANDBUCH_LINK =
    "https://wilma.muenchen.de/web/senders/af10dc2a-8da5-4d24-815a-b6a9df4c686b/documents/330c5be9-2ee3-4438-8623-6557755260d3";

const showtooltip = ref(false);
const loggedInUser = ref("no-security");
const backendVersion = ref("");
const frontendVersion = ref("");
const searchQuery = ref("");
const lastSuggestQuery = ref("");
const suggestions: Ref<Array<Suggest>> = ref([]);
const selectedSuggestion: Ref<Suggest | null> = ref(
    DefaultObjectCreator.createDefaultSuggestion()
);

const store = useStore();
const snackbarStore = useSnackbarStore();
const searchStore = useSearchStore();
const router = useRouter();
const route = useRoute();

created();

function created() {
    SsoUserInfoService.getUserInfo()
        .then((ssoUserInfoResponse: SsoUserInfoResponse) => {
            store.dispatch("user/setSsoUserInfoResponse", ssoUserInfoResponse);
            loggedInUser.value = store.getters["user/getName"];
        })
        .catch(() => {
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

function suggest(query: string) {
    if (query !== "" && query != null) {
        lastSuggestQuery.value = query;
        SucheService.getSuggestions(query)
            .then((response: SucheComplexSuggestsDTO) => {
                suggestions.value = [];

                suggestions.value.push(
                    new Suggest(query, SUGGESTION_TYPE_SEARCH_TEXT, "", "", "")
                );

                response.wordSuggests.forEach((word: SucheWordSuggestDTO) => {
                    suggestions.value.push(
                        new Suggest(
                            word.text,
                            SUGGESTION_TYPE_VORSCHLAG,
                            "",
                            "",
                            ""
                        )
                    );
                });

                response.zaehlungenSuggests.forEach(
                    (zaehlung: SucheZaehlungSuggestDTO) => {
                        suggestions.value.push(
                            new Suggest(
                                zaehlung.text,
                                SUGGESTION_TYPE_ZAEHLUNG,
                                zaehlung.zaehlstelleId,
                                zaehlung.id,
                                ""
                            )
                        );
                    }
                );

                response.zaehlstellenSuggests.forEach(
                    (zaehlstelle: SucheZaehlstelleSuggestDTO) => {
                        suggestions.value.push(
                            new Suggest(
                                zaehlstelle.text,
                                SUGGESTION_TYPE_ZAEHLSTELLE,
                                zaehlstelle.id,
                                "",
                                ""
                            )
                        );
                    }
                );

                response.messstellenSuggests.forEach(
                    (messstelle: SucheMessstelleSuggestDTO) => {
                        suggestions.value.push(
                            new Suggest(
                                messstelle.text,
                                SUGGESTION_TYPE_MESSSTELLE,
                                "",
                                "",
                                messstelle.id
                            )
                        );
                    }
                );
            })
            .catch((error) => snackbarStore.showApiError(error));
    } else if (
        lastSuggestQuery.value !== "" &&
        lastSuggestQuery.value != null
    ) {
        lastSuggestQuery.value = query;
        suggestions.value = [];
    }
}

function clear() {
    searchQuery.value = "";
    selectedSuggestion.value = DefaultObjectCreator.createDefaultSuggestion();
    searchStore.setLastSearchQuery(searchQuery.value);
    search();
}

function searchOrShowSelectedSuggestion() {
    if (selectedSuggestion.value == null) {
        search();
    } else if (selectedSuggestion.value.type === SUGGESTION_TYPE_VORSCHLAG) {
        searchForSuggestion(selectedSuggestion.value.text);
    } else if (selectedSuggestion.value.type === SUGGESTION_TYPE_ZAEHLSTELLE) {
        showZaehlstelle(selectedSuggestion.value);
    } else if (selectedSuggestion.value.type === SUGGESTION_TYPE_ZAEHLUNG) {
        showZaehlung(selectedSuggestion.value);
    } else if (selectedSuggestion.value.type === SUGGESTION_TYPE_MESSSTELLE) {
        showMessstelle(selectedSuggestion.value);
    } else {
        search();
    }
}

function search() {
    if (searchQuery.value == null) {
        searchQuery.value = "";
    }
    searchStore.setLastSearchQuery(searchQuery.value);
    const routeName = route.name;
    if (
        (routeName === "zaehlstelle" ||
            routeName === "messstelle" ||
            routeName === "pdfreport" ||
            routeName === "auswertung") &&
        searchQuery.value !== ""
    ) {
        router.push(`/`);
    }

    SucheService.searchErhebungsstelle(searchQuery.value)
        .then((result) => {
            searchStore.setSearchResult(result);
        })
        .catch((error) => {
            snackbarStore.showApiError(error);
        });
}

function searchForSuggestion(query: string) {
    searchQuery.value = query;
    search();
}

function showZaehlstelle(item: Suggest) {
    selectedSuggestion.value = DefaultObjectCreator.createDefaultSuggestion();
    router.push(`/zaehlstelle/${item.zaehlstelleId}`);
}

function showZaehlung(item: Suggest) {
    selectedSuggestion.value = DefaultObjectCreator.createDefaultSuggestion();
    router.push(`/zaehlstelle/${item.zaehlstelleId}/${item.zaehlungId}`);
}

function showMessstelle(item: Suggest) {
    selectedSuggestion.value = DefaultObjectCreator.createDefaultSuggestion();
    router.push(`/messstelle/${item.mstId}`);
}

function updateSearchQuery(itemIndex: number) {
    if (itemIndex >= 0) {
        searchQuery.value = suggestions.value[itemIndex].text;
    }
}

function deleteChar() {
    if (selectedSuggestion.value != null) {
        selectedSuggestion.value.type = "";
    }
    suggest(searchQuery.value);
}

function navigateToHandbuch() {
    window.open(URL_HANDBUCH_LINK);
}

// Easter Egg
const easterEgg: Ref<Array<string>> = ref([]);
const easterEggReq: Ref<Array<string>> = ref(["B", "o", "u", "l", "e"]);
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

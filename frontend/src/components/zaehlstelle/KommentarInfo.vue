<template>
    <div v-if="kommentarArray.length > 0">
      <v-btn
          v-tooltip:bottom="icon.tooltip"
          color="secondary"
          :icon="icon.iconPath"
          size="small"
          height="20px"
          class="ml-n1"
          variant="text"
          @click="showDialog = true"
      />

        <v-dialog
            v-model="showDialog"
            max-width="600px"
        >
            <v-card>
                <v-card-title class="text-h5 grey-lighten-2">
                    <v-icon left>mdi-comment-multiple</v-icon>
                    Informationen
                </v-card-title>
                <br />
                <v-card-text>
                    <div
                        v-for="(item, index) in kommentarArray"
                        :key="index"
                    >
                        <strong class="text-subtitle-2">{{ item.title }}</strong>
                        <p>{{ item.value }}</p>
                    </div>
                </v-card-text>

                <v-footer>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="text-none"
                        color="grey-lighten-1"
                        text="=Schließen"
                        @click="showDialog = false"
                    />
                    <v-spacer></v-spacer>
                </v-footer>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import type KeyVal from "@/types/common/KeyVal";
import { computed, ref } from "vue";
import IconTooltip from "@/types/util/IconTooltip";

interface Props {
    kommentarZaehlstelle?: string;
    kommentarZaehlung?: string;
    zaehlsituation?: string;
    zaehlsituationErweitert?: string;
}

const props = defineProps<Props>();

// Variables
const showDialog = ref(false);

// Constants
const KOMMENTARE_ANZEIGEN = "Kommentare anzeigen";
const KOMMENTAR_ANZEIGEN = "Kommentar anzeigen";

/** Berechnet, welches Icon und welcher Tooltip angezeigt werden sollen
 * Es werden vier Fälle unterschieden, die sich in den Icons unterscheiden:
 * 1.) Nur Zählstellenkommentar vorhanden
 * 2.) Zählstellenkommentar und Zählungsinformationen vorhanden
 * 3.) Kein Zählstellenkommentar vorhanden, nur eine Zählungsinformation vorhanden
 * 4.) Kein Zählstellenkommentar vorhanden, mehrere Zählungsinformationen vorhanden
 *
 * Wenn ein Zählstellenkommentar vorhanden ist werden comment-text Icons benutzt, wenn keiner vorhanden ist werden
 * die normalen comment Icons benutzt. Bei mehr als einem Kommentar werden -multiple Icons benutzt.
 */
const icon = computed(() => {
    if (props.kommentarZaehlstelle) {
        // Zählstellenkommentar vorhanden
        if (
            props.kommentarZaehlung ||
            props.zaehlsituation ||
            props.zaehlsituationErweitert
        ) {
            // Info von Zählstelle UND Zählung liegt vor
            return new IconTooltip(
                "mdi-comment-text-multiple",
                KOMMENTARE_ANZEIGEN
            );
        } else {
            // Nur Info von Zählstelle liegt vor
            return new IconTooltip("mdi-comment-text", KOMMENTAR_ANZEIGEN);
        }
    }
    // Zählstellenkommentar NICHT vorhanden
    else if (kommentarArray.value.length > 1)
        // Mehrere Kommentare vorhanden
        return new IconTooltip("mdi-comment-multiple", KOMMENTARE_ANZEIGEN);
    else {
        // Nur ein Kommentar vorhanden
        return new IconTooltip("mdi-comment", KOMMENTAR_ANZEIGEN);
    }
});

// Zusammenbauen der Kommentare in ein Array. Hier wird auch die Anzeigereihenfolge bestimmt.
const kommentarArray = computed(() => {
    let kommArr: KeyVal[] = [] as KeyVal[];
    addToArrayIfNotEmpty(
        kommArr,
        "Kommentar zur Zählstelle",
        props.kommentarZaehlstelle
    );
    addToArrayIfNotEmpty(
        kommArr,
        "Kommentar zur Zählung",
        props.kommentarZaehlung
    );
    addToArrayIfNotEmpty(kommArr, "Zählsituation", props.zaehlsituation);
    addToArrayIfNotEmpty(
        kommArr,
        "Erweiterte Zählsituation",
        props.zaehlsituationErweitert
    );
    return kommArr;
});

// Hilfsfunktionen
function addToArrayIfNotEmpty(
    kommArr: KeyVal[],
    title: string,
    value: string | undefined
): void {
    if (value) {
        kommArr.push({ title: title, value: value });
    }
}
</script>
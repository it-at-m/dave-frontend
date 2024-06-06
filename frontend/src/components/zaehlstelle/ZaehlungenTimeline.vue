<template>
    <v-sheet
        with="100%"
        color="transparent"
    >
        <v-sheet
            v-if="!isNotEmpty"
            id="empty"
            class="d-flex align-center justify-center pa-4 mx-auto"
        >
            <span class="text-caption grey--text text--lighten-1"
                >Für diese Zählstelle sind keine weiteren Zählungen
                vorhanden.</span
            >
        </v-sheet>
        <v-tooltip
            v-if="isNotEmpty"
            right
            class="pl-5"
        >
            <template #activator="{ on, attrs }">
                <v-text-field
                    v-model="query"
                    color="grey darken-1"
                    label="Zählung suchen"
                    dense
                    outlined
                    prepend-inner-icon="mdi-magnify"
                    hide-details
                    class="px-4 my-2"
                >
                    <template #append>
                        <v-icon
                            v-bind="attrs"
                            v-on="on"
                            >mdi-information-outline
                        </v-icon>
                    </template>
                </v-text-field>
            </template>
            <span>
                <b>Beispiele, wonach gefiltert werden kann:</b><br />
                * Datum (20.01.2009)<br />
                * Monat (Januar, Februar, ...)<br />
                * Jahreszeit (Frühling, Sommer, ...)<br />
                * Projektname / -nummer (U1022, VZ Stadtgrenzen 2019, ...)<br />
                * Zählart (Q, QS, ...)<br />
                <!--            Es fehlt noch: Wetter, Schulzeit, (erweiterte) Zählsituation-->
            </span>
        </v-tooltip>
        <v-sheet
            v-if="isNotEmpty"
            width="100%"
            color="transparent"
            class="overflow-y-auto"
            :max-height="listheight"
        >
            <nicht-ausgewaehlte-zaehlung
                v-for="(z, index) in filteredZaehlungen"
                :id="z.id"
                :key="z.id"
                :datum="z.datum"
                :projekt-name="z.projektName"
                :zaehlart="z.zaehlart"
                :wetter="z.wetter"
                :zaehldauer="z.zaehldauer"
                :quelle="z.quelle"
                :sonderzaehlung="z.sonderzaehlung"
                :color="calcRowColor(index)"
                hover-color="grey lighten-1"
                icon-color="black"
            >
            </nicht-ausgewaehlte-zaehlung>
        </v-sheet>
    </v-sheet>
</template>
<script setup lang="ts">
import NichtAusgewaehlteZaehlung from "@/components/zaehlstelle/NichtAusgewaehlteZaehlung.vue";

// Typen
/* eslint-disable no-unused-vars */
import { zaehlartText } from "@/types/enum/Zaehlart";
import { DateTimeFormatOptions } from "vue-i18n";
import { computed, ref, watch } from "vue";
import { useZaehlstelleStore } from "@/store/zaehlstelle";

/* eslint-enable no-unused-vars */

interface Props {
    listheight: string;
    externalQuery: string;
}

const props = defineProps<Props>();

const zaehlstelleStore = useZaehlstelleStore();

const query = ref("");
const dateOptions: DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
};

watch(
    () => props.externalQuery,
    (newQuery) => {
        updateQuery(newQuery);
    }
);

function updateQuery(n: string) {
    // statt nach dem Buchstaben wollen wir nach dem Text der Zählart suchen
    const q = zaehlartText.get(n);
    if (q) {
        // schreibt man den Text in "query", wird automatisch der Filter ausgeführt
        query.value = q;
        if (filteredZaehlungen.value.length > 0) {
            // Wenn eine oder mehr als eine Zählung gefunden wird, so wird die erste
            // Zählung in der Liste auf aktiv gesetzt.
            zaehlstelleStore.setZaehlungAlsAktiv(
                filteredZaehlungen.value[0].id
            );
        }
    }
}

// Prüft, ob in der Liste der inaktiven Zählungen mindestens ein Eintrag ist. Wenn
// nicht, dann werden Liste und Suchfeld nicht angezeigt.
const isNotEmpty = computed(() => {
    return zaehlstelleStore.hasInaktiveZaehlungen;
});

/**
 * Filtert die Zählungen nach den Suchwörter.
 */
const filteredZaehlungen = computed(() => {
    let filteredZs = zaehlstelleStore.getInaktiveZaehlungen;
    if (query.value.length > 0) {
        if (
            !props.externalQuery &&
            (query.value === props.externalQuery ||
                query.value == zaehlartText.get(props.externalQuery))
        ) {
            filteredZs = filteredZs.filter(
                (z) =>
                    z.zaehlart.toLowerCase() ===
                        props.externalQuery.trim().toLowerCase() &&
                    // Suche nach einem Zählartbuchstaben ist manchaml schwierig,
                    // deshalb kann hier nach dem ganzen Text gesucht werden
                    zaehlartText
                        .get(z.zaehlart)
                        ?.toLowerCase()
                        .includes(query.value.trim().toLocaleLowerCase())
            );
        } else {
            const words: string[] = query.value.split(" ");
            words.forEach((w) => {
                filteredZs = filteredZs.filter(
                    (z) =>
                        new Date(z.datum)
                            .toLocaleDateString("de-De", dateOptions)
                            .includes(w.toLowerCase()) ||
                        z.monat.toLowerCase().includes(w.toLowerCase()) ||
                        z.jahreszeit.toLowerCase().includes(w.toLowerCase()) ||
                        z.projektName.toLowerCase().includes(w.toLowerCase()) ||
                        z.zaehlart.toLowerCase().includes(w.toLowerCase()) ||
                        // Suche nach einem Zählartbuchstaben ist manchaml schwierig,
                        // deshalb kann hier nach dem ganzen Text gesucht werden
                        zaehlartText
                            .get(z.zaehlart)
                            ?.toLowerCase()
                            .includes(w.toLocaleLowerCase())
                );
            });
        }
    }
    return filteredZs;
});

/**
 * Die einzelenen Zeilen werden unterschiedlich farblich markiert. Dazu wird eine
 * modolo Berechnung durchgeführt.
 *
 * @param index
 */
function calcRowColor(index: number): string {
    const ungerade = index % 2 > 0;
    if (ungerade) {
        return "grey lighten-4";
    }
    return "grey lighten-2";
}
</script>
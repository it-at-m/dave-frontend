<template>
    <v-menu offset-y>
        <template #activator="{ on: dialog }">
            <v-tooltip bottom>
                <template #activator="{ on: tooltip }">
                    <v-btn
                        icon
                        small
                        :disabled="!isHistory"
                        class="ml-2"
                        v-on="{ ...tooltip, ...dialog }"
                    >
                        <v-icon>mdi-history</v-icon>
                    </v-btn>
                </template>
                Historie
            </v-tooltip>
        </template>
        <v-list>
            <v-list-item
                v-for="(item, index) in items"
                :key="index"
                two-line
                @click="select(item)"
            >
                <v-list-item-content>
                    <v-list-item-title
                        >{{ item.zaehlstelleNr }} ({{
                            $d(item.viewtime, "time", "de-DE")
                        }})</v-list-item-title
                    >
                    <v-list-item-subtitle
                        >{{ $d(item.zaehlungDatum, "short", "de-DE") }}
                        {{ item.zaehlungProjektName }}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

/* eslint-disable no-unused-vars */
import ZaehlstelleHeaderDTO from "@/types/zaehlstelle/ZaehlstelleHeaderDTO";
import LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import HistoryItem from "@/types/app/HistoryItem";
import OptionsDTO from "@/types/zaehlung/OptionsDTO";
/* eslint-enable no-unused-vars */

@Component
export default class History extends Vue {
    activeHistoryItem!: HistoryItem;
    options?: OptionsDTO | undefined = undefined;
    // HACK - siehe unten
    cnt = 0;

    get items(): HistoryItem[] {
        return this.$store.getters.getHistoryItems;
    }

    get zaehlung(): LadeZaehlungDTO {
        return this.$store.getters.getAktiveZaehlung;
    }

    get optionen(): OptionsDTO {
        return this.$store.getters.getFilteroptions;
    }

    get isHistory(): boolean {
        if (this.items.length > 0) {
            return true;
        }
        return false;
    }

    select(item: HistoryItem): void {
        this.$router.push(
            `/zaehlstelle/${item.zaehlstelleId}/${item.zaehlungId}`
        );
    }

    /**
     * Erzeugt einen neuen Eintrag in der Historie und speichert diesen im Store.
     *
     * @param   zaehlung  Die aktiv ausgewählte Zählung.
     */
    @Watch("zaehlung")
    storeZaehlung(zaehlung: LadeZaehlungDTO): void {
        // Das "alte" History Item im Store speichern
        if (this.activeHistoryItem) {
            this.$store.dispatch(
                "addHistoryItem",
                Object.assign({}, this.activeHistoryItem)
            );
        }

        // aktuelle Zählstelle zur Zählung holen
        const zaehlstelle = this.$store.getters
            .getZaehlstelle as ZaehlstelleHeaderDTO;

        if (zaehlung && zaehlstelle) {
            this.activeHistoryItem = new HistoryItem(
                zaehlung.id,
                this.convertDate(zaehlung.datum),
                zaehlung.projektName,
                zaehlstelle.nummer,
                zaehlstelle.id
            );
        } else {
            console.warn(
                "Die Zählung, bzw. die Zählstelle konnte nicht aus dem Store geladen werden."
            );
        }

        // Schauen, ob die Zählstelle noch in der Historie ist
        const revisited = this.items.filter(
            (item: HistoryItem) => item.zaehlungId === zaehlung.id
        ) as HistoryItem[];

        // Wenn ein Eintrag vorhanden ist, dann werden die Anzeige Optionen wieder gesetzt
        if (revisited.length > 0) {
            this.options = revisited[0].optionsEinstellungen as OptionsDTO;
            // HACK - siehe unten
            this.cnt = 1;
        }
    }

    /**
     * Kopiert die gesetzten Optionen, damit diese bei Wiederauswahl der Zählung erneut gesetzt werden können.
     *
     * @param   optionen  Die aktuellen Optionen aus dem Store.
     */
    @Watch("optionen")
    addOptionen(optionen: OptionsDTO): void {
        if (optionen) {
            // Von den Optionen machen wir eine Kopie, da die sonst dauernd über den
            // store verändert werden.
            this.activeHistoryItem.optionsEinstellungen = Object.assign(
                {},
                optionen
            );
        } else {
            console.warn(
                "Die Optionseinstellungen für den History Eintrag konnten nicht gespeichert werden."
            );
        }

        // Das ist ein absoluter HACK, weil "created()" in ZaehlstelleView immer zweimal aufgerufen wird. Dadurch
        // werden die gemerkten Optionen immer sofort wieder überschrieben. Damit das nicht passiert, muss man den
        // zweiten Aufruf abwarten und dann erst die gemerkten Optionen übergeben.
        //
        // Die deutlich schönere Lösung wäre, dass "created()" nur einmal aufgerufen wird. Es ist allerdings nicht klar,
        // woher der zweite Aufruf kommt.
        this.cnt++;
        if (this.options && this.cnt === 3) {
            const o = Object.assign({}, this.options);
            this.options = undefined;
            this.$store.dispatch("setFilteroptions", o);
        }
    }

    /**
     * Konvertiert den Datums String in ein richtiges Datum.
     *
     * @param date
     */
    convertDate(date: string): Date {
        if (!Date.parse(date)) {
            console.warn(
                `Datum der Zählung (${date}) konnte nicht gelesen werden.`
            );
            return new Date();
        }
        return new Date(date);
    }
}
</script>
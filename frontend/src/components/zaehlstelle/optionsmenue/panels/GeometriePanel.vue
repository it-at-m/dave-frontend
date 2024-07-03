<template>
    <v-expansion-panel>
        <v-expansion-panel-header>
            <div>
                <v-icon left>mdi-arrow-decision</v-icon>
                Fahrbeziehungen
            </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="mt-1">
            <panel-header
                font-size="0.875rem"
                font-weight="bold"
                padding="10px 0 10px 0"
                header-text="Fahrbeziehungen zwischen den Knotenarmen"
            ></panel-header>

            <v-row
                align="start"
                justify="center"
                dense
            >
                <v-col cols="4">
                    <v-hover v-model="hoverSelectVon">
                        <v-select
                            v-model="von"
                            :items="vonKnotenarme"
                            label="Von Knotenarm"
                            item-text="strassenname"
                            item-value="nummer"
                            filled
                            dense
                        ></v-select>
                    </v-hover>
                    <v-hover v-model="hoverSelectNach">
                        <v-select
                            v-model="nach"
                            :items="nachKnotenarme"
                            label="Nach Knotenarm"
                            item-text="strassenname"
                            item-value="nummer"
                            filled
                            dense
                        ></v-select>
                    </v-hover>
                    <div v-if="beideRichtungenAnzeigen">
                        <v-hover v-model="hoverBeideRichtungen">
                            <v-checkbox
                                v-model="beideRichtungen"
                                :label="'Zulaufend/Ablaufend'"
                                hide-details
                                style="margin-bottom: 12px"
                                color="grey darken-1"
                                dense
                                :disabled="!beideRichtungenAnzeigen"
                            />
                        </v-hover>
                    </div>
                </v-col>
                <v-spacer />
                <v-col cols="4">
                    <v-card flat>
                        <div
                            v-if="hoverBeideRichtungen"
                            style="color: red"
                        >
                            {{ helpTextFahrbeziehung }}
                        </div>
                        <div v-else>
                            {{ helpTextFahrbeziehung }}
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script setup lang="ts">
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type KnotenarmVerbindungen from "@/types/zaehlung/KnotenarmVerbindungen";
import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import type OptionsDTO from "@/types/zaehlung/OptionsDTO";
import LadeKnotenarmComperator from "@/types/zaehlung/LadeKnotenarmComperator";
import type LadeFahrbeziehungDTO from "@/types/zaehlung/LadeFahrbeziehungDTO";
import PanelHeader from "@/components/common/PanelHeader.vue";
import _ from "lodash";
import { computed, onMounted, ref, watch } from "vue";
import { useZaehlstelleStore } from "@/store/zaehlstelle";

interface Props {
    zaehlung?: LadeZaehlungDTO;
}

const props = defineProps<Props>();
const zaehlstelleStore = useZaehlstelleStore();
const emits = defineEmits<{
    (e: "beideRichtungen", v: boolean): void;
    (e: "von", v: Array<number>): void;
    (e: "nach", v: Array<number>): void;
}>();

/**
 * Je im von-Dropdown wählbaren Knotenarm werden die für den nach-Dropdown möglichen Zielknotenarme vorgehalten.
 */
const moeglicheBeziehungenVon = ref(new Map<number, KnotenarmVerbindungen>());
/**
 * Je im nach-Dropdown wählbaren Knotenarm werden die für den von-Dropdown möglichen Knotenarme vorgehalten.
 */
const moeglicheBeziehungenNach = ref(new Map<number, KnotenarmVerbindungen>());

/**
 * Der gewählte von-Knotenarm
 */
const von = ref(-1);
/**
 * Der gewählte nach-Knotenarm
 */
const nach = ref(-1);

const alle = { nummer: 0, strassenname: "Alle Knotenarme" };

const beideRichtungen = ref(false);
const hoverSelectVon = ref(false);
const hoverSelectNach = ref(false);
const hoverBeideRichtungen = ref(false);

const options = computed<OptionsDTO>(() => {
    return zaehlstelleStore.getFilteroptions;
});

// Lädt die "von" Knotenarme für den aktuell gewählten "nach" Knotenarm
const vonKnotenarme = computed<Array<LadeKnotenarmDTO>>(() => {
    const k = moeglicheBeziehungenNach.value.get(nach.value);
    if (k) {
        return k.moeglicheVerbindungen.sort(
            LadeKnotenarmComperator.sortByNumber
        );
    } else {
        return [alle];
    }
});
// Lädt die "nach" Knotenarme für den aktuell gewählten "von" Knotenarm
const nachKnotenarme = computed<Array<LadeKnotenarmDTO>>(() => {
    const k = moeglicheBeziehungenVon.value.get(von.value);
    if (k) {
        return k.moeglicheVerbindungen.sort(
            LadeKnotenarmComperator.sortByNumber
        );
    } else {
        return [alle];
    }
});

const helpTextFahrbeziehung = computed(() => {
    if (hoverSelectVon.value) {
        return "Auf den Knoten zulaufende Fahrtrichtung.";
    }
    if (hoverSelectNach.value) {
        return "Vom Knoten ablaufende Fahrtrichtung.";
    }
    if (hoverBeideRichtungen.value) {
        return "Zulaufende und Ablaufende Fahrtrichtung. Hat nur eine Auswirkung auf den Belastungsplan.";
    }
    return "";
});

/**
 * reaktiver Getter zum Steuern der Anzeige der Checkbox
 * fuer den Zulauf/Ablauf
 */
const beideRichtungenAnzeigen = computed(() => {
    return von.value > 0 || nach.value > 0;
});

// Setzt die Auswahlelemente auf der Oberfläche zurück, oder mit den
//  übergebenen Werten im Optionsobjekt
function reset(fo: OptionsDTO) {
    fo.vonKnotenarm === null ? (von.value = 0) : (von.value = fo.vonKnotenarm);
    fo.nachKnotenarm === null
        ? (nach.value = 0)
        : (nach.value = fo.nachKnotenarm);
    fo.beideRichtungen === null
        ? (beideRichtungen.value = false)
        : (beideRichtungen.value = fo.beideRichtungen);
}

/**
 * In dieser Methode werden die wählbaren von- und nach-Knotenarme ermittelt.
 *
 * Jeder wählbare von-Knotenarm wird mit den möglichen nach-Knotearmen befüllt.
 * Jeder wählbare nach-Knotenarm wird mit den möglichen von-Knotearmen befüllt.
 *
 * Als Basis zur Ermittlung der relevanten Knotenarme dient die Klasse "LadeFahrbeziehungDTO"
 * welche als relevante Attribute "von" und "nach" für Kreuzungen sowie "knotenarmKreisverkehr"
 * und "hinein" vorhält.
 */
function initFahrbeziehungen(): void {
    // Init default Knotenarmauswahl
    von.value = 0;
    nach.value = 0;

    // Knotenarmbezeichnung je Knotenarm für spätere effiziente Extraktion der Knotenarmbezeichnung.
    const knotenarme: Map<number, string> = new Map<number, string>(
        props.zaehlung?.knotenarme.map((knotenarm) => [
            knotenarm.nummer,
            knotenarm.nummer + " - " + knotenarm.strassenname,
        ])
    );

    // Wird für die Erstellung der Zielknotenarme und eingehenden Knotenarme bei Auswahl "alle" benötigt.
    const alleZielknotenarmeVon: Set<LadeKnotenarmDTO> =
        new Set<LadeKnotenarmDTO>();
    const alleEingehendeKnotenarmeNach: Set<LadeKnotenarmDTO> =
        new Set<LadeKnotenarmDTO>();

    // Befüllung der wählbaren von-Knotenarme mit den möglichen nach-Knotenarmen
    // sowie Befüllung der wählbaren nach-Knotenarme mit den möglichen von-Knotenarmen
    const fahrbeziehungen = props.zaehlung?.fahrbeziehungen;
    if (fahrbeziehungen && Array.isArray(fahrbeziehungen)) {
        fahrbeziehungen?.forEach((fahrbeziehung) => {
            if (isZaehlungForKreuzung()) {
                addVonKnotenarmWithPossibleNachKnotenarm(
                    fahrbeziehung,
                    alleZielknotenarmeVon,
                    knotenarme
                );
                addNachKnotenarmWithPossibleVonKnotenarm(
                    fahrbeziehung,
                    alleEingehendeKnotenarmeNach,
                    knotenarme
                );
            } else {
                // Kreisverkehr
                if (fahrbeziehung.knotenarm != null && fahrbeziehung.hinein) {
                    alleEingehendeKnotenarmeNach.add({
                        nummer: fahrbeziehung.knotenarm,
                        strassenname: getKnotenarmBezeichnung(
                            fahrbeziehung.knotenarm,
                            knotenarme
                        ),
                    });
                }
            }
        });

        // Nachfolgend werden die eingehenden bzw. ausgehenden Beziehungen bei Auswahl von "alle" gesetzt.
        let kv: KnotenarmVerbindungen;
        if (isZaehlungForKreuzung()) {
            let kv = {
                knotenarm: alle,
                moeglicheVerbindungen: _.union(
                    [alle],
                    Array.from(alleZielknotenarmeVon.values())
                ),
                moeglicheVerbindungenIds: _.union(
                    [alle],
                    Array.from(alleZielknotenarmeVon.values())
                ).map((knotenarm) => knotenarm.nummer),
            };
            moeglicheBeziehungenVon.value.set(alle.nummer, kv);
        } else {
            // Kreisverkehr
            let kv = {
                knotenarm: alle,
                moeglicheVerbindungen: [alle],
                moeglicheVerbindungenIds: [alle.nummer],
            };
            moeglicheBeziehungenVon.value.set(alle.nummer, kv);
        }
        // Kreuzung und Kreisverkehr
        kv = {
            knotenarm: alle,
            moeglicheVerbindungen: _.union(
                [alle],
                Array.from(alleEingehendeKnotenarmeNach.values())
            ),
            moeglicheVerbindungenIds: _.union(
                [alle],
                Array.from(alleEingehendeKnotenarmeNach.values())
            ).map((knotenarm) => knotenarm.nummer),
        };
        moeglicheBeziehungenNach.value.set(alle.nummer, kv);
    }
}

/**
 * Diese Methode fügt an den wählbaren Knotenarm für das Dropdown von-Knotenarm
 * die möglichen nach-Knotenarme an.
 */
function addVonKnotenarmWithPossibleNachKnotenarm(
    fahrbeziehung: LadeFahrbeziehungDTO,
    alleZielknotenarmeVon: Set<LadeKnotenarmDTO>,
    knotenarme: Map<number, string>
): void {
    if (moeglicheBeziehungenVon.value.has(fahrbeziehung.von)) {
        // Erweitern bereits vorhandener von-Knotenarm um zusätzlichen möglichen nach-Knotenarm
        const kv: KnotenarmVerbindungen | undefined =
            moeglicheBeziehungenVon.value.get(fahrbeziehung.von);
        kv?.moeglicheVerbindungen.push({
            nummer: fahrbeziehung.nach,
            strassenname: getKnotenarmBezeichnung(
                fahrbeziehung.nach,
                knotenarme
            ),
        });
        kv?.moeglicheVerbindungenIds.push(fahrbeziehung.nach);
    } else {
        // Erstbefüllung noch nicht vorhandener von-Knotenarm
        const kv: KnotenarmVerbindungen = {
            knotenarm: {
                nummer: fahrbeziehung.von,
                strassenname: getKnotenarmBezeichnung(
                    fahrbeziehung.von,
                    knotenarme
                ),
            },
            moeglicheVerbindungen: [
                alle,
                {
                    nummer: fahrbeziehung.nach,
                    strassenname: getKnotenarmBezeichnung(
                        fahrbeziehung.nach,
                        knotenarme
                    ),
                },
            ],
            moeglicheVerbindungenIds: [alle.nummer, fahrbeziehung.nach],
        };
        moeglicheBeziehungenVon.value.set(fahrbeziehung.von, kv);
    }
    alleZielknotenarmeVon.add({
        nummer: fahrbeziehung.nach,
        strassenname: getKnotenarmBezeichnung(fahrbeziehung.nach, knotenarme),
    });
}

/**
 * Diese Methode fügt an den wählbaren Knotenarm für das Dropdown nach-Knotenarm
 * die möglichen von-Knotenarme an.
 */
function addNachKnotenarmWithPossibleVonKnotenarm(
    fahrbeziehung: LadeFahrbeziehungDTO,
    alleEingehendeKnotenarmeNach: Set<LadeKnotenarmDTO>,
    knotenarme: Map<number, string>
): void {
    if (moeglicheBeziehungenNach.value.has(fahrbeziehung.nach)) {
        // Erweitern bereits vorhandener nach-Knotenarm um zusätzlichen möglichen von-Knotenarm
        const kv: KnotenarmVerbindungen | undefined =
            moeglicheBeziehungenNach.value.get(fahrbeziehung.nach);
        kv?.moeglicheVerbindungen.push({
            nummer: fahrbeziehung.von,
            strassenname: getKnotenarmBezeichnung(
                fahrbeziehung.von,
                knotenarme
            ),
        });
        kv?.moeglicheVerbindungenIds.push(fahrbeziehung.von);
    } else {
        // Erstbefüllung noch nicht vorhandener nach-Knotenarm
        const kv: KnotenarmVerbindungen = {
            knotenarm: {
                nummer: fahrbeziehung.nach,
                strassenname: getKnotenarmBezeichnung(
                    fahrbeziehung.nach,
                    knotenarme
                ),
            },
            moeglicheVerbindungen: [
                alle,
                {
                    nummer: fahrbeziehung.von,
                    strassenname: getKnotenarmBezeichnung(
                        fahrbeziehung.von,
                        knotenarme
                    ),
                },
            ],
            moeglicheVerbindungenIds: [alle.nummer, fahrbeziehung.von],
        };
        moeglicheBeziehungenNach.value.set(fahrbeziehung.nach, kv);
    }
    alleEingehendeKnotenarmeNach.add({
        nummer: fahrbeziehung.von,
        strassenname: getKnotenarmBezeichnung(fahrbeziehung.von, knotenarme),
    });
}

/**
 * true falls die aktuelle Zählung eine Kreuzung darstellt, andernfalls false.
 */
function isZaehlungForKreuzung(): boolean {
    return (
        props.zaehlung?.kreisverkehr !== undefined &&
        !props.zaehlung?.kreisverkehr
    );
}

/**
 * Die Methode extrahiert für den Knotenarm im Parameter folgende Knotenarmbezeichnung:
 *
 * "NUMMER_KNOTENARM - STRASSENNAME"
 *
 * Ist in der Map der gegebene Knotenarm nicht vorhanden,
 * so wird der Fluchtwert "Kein Knotenarm gefunden" zurückgegeben.
 *
 * @param knotenarm für den der Knotenarmbezeichner erstellt werden soll.
 * @param knotenarme Map bestehend aus dem Knotenarmbezeichnung je Knotenarm
 */
function getKnotenarmBezeichnung(
    knotenarm: number,
    knotenarme: Map<number, string>
): string {
    const strassenname: string | undefined = knotenarme.get(knotenarm);
    return strassenname === undefined
        ? "Kein Knotenarm gefunden"
        : strassenname;
}

watch(beideRichtungen, () => {
    emits("beideRichtungen", beideRichtungen.value);
});

/**
 * Auswahl geändert? Event zum Aktualisieren des Optionsobjektes schicken!
 * @param n gewählter Knotenarm
 */
watch(von, (n: number) => {
    let vonCopy = [n];
    if (n === 0) {
        const nachK = moeglicheBeziehungenNach.value.get(von.value);
        if (nachK) {
            // werden die möglichen Zielknoten übergeben
            vonCopy = nachK.moeglicheVerbindungenIds;
        }
    }
    emits("von", vonCopy);
});

/**
 * Auswahl geändert? Event zum Aktualisieren des Optionsobjektes schicken!
 * @param n gewählter Knotenarm
 */
watch(nach, (n: number) => {
    let nachCopy = [n];
    // wenn das Ziel "alle" sind...
    if (n === 0) {
        const vonK = moeglicheBeziehungenVon.value.get(von.value);
        if (vonK) {
            // werden die möglichen Zielknoten übergeben
            nachCopy = vonK.moeglicheVerbindungenIds;
        }
    }
    emits("nach", nachCopy);
});

watch(
    () => props.zaehlung,
    () => {
        initFahrbeziehungen();
    },
    { immediate: true }
);

onMounted(() => {
    // Von und nach Werte auf die Werte aus dem Options Objekt aus dem Store setzen.
    //
    // Es ist wichtig, dass diese Funktion ausgeführt wird, nachdem die Fahrbeziehungen
    // aufbereitet wurden, da durch das Setzen von "von" und "nach" in den entspechenden
    // watch Methoden automatisch die richtigen "vonIds" und "nachIds" gesetzt werden. Damit
    // ist sichergestellt, dass bei einer 1 : n Beziehung alle "nach" Knotenarme in der
    // ZaehlungInfo angezeigt werden.
    reset(options.value);
});
</script>
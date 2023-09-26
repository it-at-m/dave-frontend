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

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

// Typen
/* eslint-disable no-unused-vars */
import LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import KnotenarmVerbindungen from "@/types/zaehlung/KnotenarmVerbindungen";
import LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import OptionsDTO from "@/types/zaehlung/OptionsDTO";
import LadeKnotenarmComperator from "@/types/zaehlung/LadeKnotenarmComperator";
import LadeFahrbeziehungDTO from "@/types/zaehlung/LadeFahrbeziehungDTO";
/* eslint-enable no-unused-vars */
import PanelHeader from "@/components/common/PanelHeader.vue";
import _ from "lodash";

@Component({
    components: { PanelHeader },
})
export default class GeometriePanel extends Vue {
    @Prop() zaehlung?: LadeZaehlungDTO;

    /**
     * Je im von-Dropdown wählbaren Knotenarm werden die für den nach-Dropdown möglichen Zielknotenarme vorgehalten.
     */
    moeglicheBeziehungenVon = new Map<number, KnotenarmVerbindungen>();
    /**
     * Je im nach-Dropdown wählbaren Knotenarm werden die für den von-Dropdown möglichen Knotenarme vorgehalten.
     */
    moeglicheBeziehungenNach = new Map<number, KnotenarmVerbindungen>();

    /**
     * Der gewählte von-Knotenarm
     */
    von = -1;

    /**
     * Der gewählte nach-Knotenarm
     */
    nach = -1;

    vonIds = new Array<number>();
    alle = { nummer: 0, strassenname: "Alle Knotenarme" };

    private beideRichtungen = false;

    private hoverSelectVon = false;
    private hoverSelectNach = false;
    private hoverBeideRichtungen = false;

    // Lädt die "von" Knotenarme für den aktuell gewählten "nach" Knotenarm
    get vonKnotenarme(): LadeKnotenarmDTO[] | undefined {
        const k = this.moeglicheBeziehungenNach.get(this.nach);
        if (k) {
            return k.moeglicheVerbindungen.sort(
                LadeKnotenarmComperator.sortByNumber
            );
        } else {
            return [this.alle];
        }
    }

    // Lädt die "nach" Knotenarme für den aktuell gewählten "von" Knotenarm
    get nachKnotenarme(): LadeKnotenarmDTO[] | undefined {
        const k = this.moeglicheBeziehungenVon.get(this.von);
        if (k) {
            return k.moeglicheVerbindungen.sort(
                LadeKnotenarmComperator.sortByNumber
            );
        } else {
            return [this.alle];
        }
    }

    get helpTextFahrbeziehung(): string {
        if (this.hoverSelectVon) {
            return "Auf den Knoten zulaufende Fahrtrichtung.";
        }
        if (this.hoverSelectNach) {
            return "Vom Knoten ablaufende Fahrtrichtung.";
        }
        if (this.hoverBeideRichtungen) {
            return "Zulaufende und Ablaufende Fahrtrichtung. Hat nur eine Auswirkung auf den Belastungsplan.";
        }
        return "";
    }

    /**
     * reaktiver Getter zum Steuern der Anzeige der Checkbox
     * fuer den Zulauf/Ablauf
     */
    get beideRichtungenAnzeigen(): boolean {
        return this.von > 0 || this.nach > 0;
    }

    // Watcher

    /**
     * Hier werden die Kreuzungsbeziehungen erstellt sobald eine neue Zaehlung gesetzt wird.
     */
    @Watch("zaehlung", { immediate: true })
    zaehlungChanged() {
        this.initFahrbeziehungen();
    }

    /**
     * Auswahl geändert? Event zum Aktualisieren des Optionsobjektes schicken!
     */
    @Watch("beideRichtungen")
    storeBeideRichtungen() {
        this.$emit("beideRichtungen", this.beideRichtungen);
    }

    /**
     * Auswahl geändert? Event zum Aktualisieren des Optionsobjektes schicken!
     * @param n gewählter Knotenarm
     */
    @Watch("von")
    storeVon(n: number) {
        let von = [n];
        if (n === 0) {
            const nachK = this.moeglicheBeziehungenNach.get(this.von);
            if (nachK) {
                // werden die möglichen Zielknoten übergeben
                von = nachK.moeglicheVerbindungenIds;
            } else {
                console.warn(
                    "Für Knotenarm '" +
                        this.nach +
                        "' konnten keine Fahrbeziehungen geladen werden."
                );
            }
        }
        this.$emit("von", von);
    }

    /**
     * Auswahl geändert? Event zum Aktualisieren des Optionsobjektes schicken!
     * @param n gewählter Knotenarm
     */
    @Watch("nach")
    storeNach(n: number) {
        let nach = [n];
        // wenn das Ziel "alle" sind...
        if (n === 0) {
            const vonK = this.moeglicheBeziehungenVon.get(this.von);
            if (vonK) {
                // werden die möglichen Zielknoten übergeben
                nach = vonK.moeglicheVerbindungenIds;
            } else {
                console.warn(
                    "Für Knotenarm '" +
                        this.von +
                        "' konnten keine Fahrbeziehungen geladen werden."
                );
            }
        }
        this.$emit("nach", nach);
    }

    // Wenn sich die Optionen ändern, dann soll sich auch die Auswahl auf der
    // Oberfläche ändern.
    @Watch("options")
    optionsChanged(n: OptionsDTO) {
        this.reset(n);
    }

    // reaktiver getter auf den Store
    get options(): OptionsDTO {
        return this.$store.getters.getFilteroptions;
    }

    // Setzt die Auswahlelemente auf der Oberfläche zurück, oder mit den
    //  übergebenen Werten im Optionsobjekt
    reset(fo: OptionsDTO) {
        fo.vonKnotenarm === null
            ? (this.von = 0)
            : (this.von = fo.vonKnotenarm);
        fo.nachKnotenarm === null
            ? (this.nach = 0)
            : (this.nach = fo.nachKnotenarm);
        fo.beideRichtungen === null
            ? (this.beideRichtungen = false)
            : (this.beideRichtungen = fo.beideRichtungen);
    }

    mounted() {
        // Von und nach Werte auf die Werte aus dem Options Objekt aus dem Store setzen.
        //
        // Es ist wichtig, dass diese Funktion ausgeführt wird, nachdem die Fahrbeziehungen
        // aufbereitet wurden, da durch das Setzen von "von" und "nach" in den entspechenden
        // watch Methoden automatisch die richtigen "vonIds" und "nachIds" gesetzt werden. Damit
        // ist sichergestellt, dass bei einer 1 : n Beziehung alle "nach" Knotenarme in der
        // ZaehlungInfo angezeigt werden.
        const fo = this.$store.getters.getFilteroptions as OptionsDTO;
        this.reset(fo);
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
    private initFahrbeziehungen(): void {
        // Init default Knotenarmauswahl
        this.von = 0;
        this.nach = 0;

        // Knotenarmbezeichnung je Knotenarm für spätere effiziente Extraktion der Knotenarmbezeichnung.
        const knotenarme: Map<number, string> = new Map<number, string>(
            this.zaehlung?.knotenarme.map((knotenarm) => [
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
        const fahrbeziehungen = this.zaehlung?.fahrbeziehungen;
        if (fahrbeziehungen && Array.isArray(fahrbeziehungen)) {
            fahrbeziehungen?.forEach((fahrbeziehung) => {
                if (this.isZaehlungForKreuzung()) {
                    this.addVonKnotenarmWithPossibleNachKnotenarm(
                        fahrbeziehung,
                        alleZielknotenarmeVon,
                        knotenarme
                    );
                    this.addNachKnotenarmWithPossibleVonKnotenarm(
                        fahrbeziehung,
                        alleEingehendeKnotenarmeNach,
                        knotenarme
                    );
                } else {
                    // Kreisverkehr
                    if (
                        fahrbeziehung.knotenarm != null &&
                        fahrbeziehung.hinein
                    ) {
                        alleEingehendeKnotenarmeNach.add({
                            nummer: fahrbeziehung.knotenarm,
                            strassenname: this.getKnotenarmBezeichnung(
                                fahrbeziehung.knotenarm,
                                knotenarme
                            ),
                        });
                    }
                }
            });

            // Nachfolgend werden die eingehenden bzw. ausgehenden Beziehungen bei Auswahl von "alle" gesetzt.
            let kv: KnotenarmVerbindungen;
            if (this.isZaehlungForKreuzung()) {
                let kv = {
                    knotenarm: this.alle,
                    moeglicheVerbindungen: _.union(
                        [this.alle],
                        Array.from(alleZielknotenarmeVon.values())
                    ),
                    moeglicheVerbindungenIds: _.union(
                        [this.alle],
                        Array.from(alleZielknotenarmeVon.values())
                    ).map((knotenarm) => knotenarm.nummer),
                };
                this.moeglicheBeziehungenVon.set(this.alle.nummer, kv);
            } else {
                // Kreisverkehr
                let kv = {
                    knotenarm: this.alle,
                    moeglicheVerbindungen: [this.alle],
                    moeglicheVerbindungenIds: [this.alle.nummer],
                };
                this.moeglicheBeziehungenVon.set(this.alle.nummer, kv);
            }
            // Kreuzung und Kreisverkehr
            kv = {
                knotenarm: this.alle,
                moeglicheVerbindungen: _.union(
                    [this.alle],
                    Array.from(alleEingehendeKnotenarmeNach.values())
                ),
                moeglicheVerbindungenIds: _.union(
                    [this.alle],
                    Array.from(alleEingehendeKnotenarmeNach.values())
                ).map((knotenarm) => knotenarm.nummer),
            };
            this.moeglicheBeziehungenNach.set(this.alle.nummer, kv);
        }
    }

    /**
     * Diese Methode fügt an den wählbaren Knotenarm für das Dropdown von-Knotenarm
     * die möglichen nach-Knotenarme an.
     */
    private addVonKnotenarmWithPossibleNachKnotenarm(
        fahrbeziehung: LadeFahrbeziehungDTO,
        alleZielknotenarmeVon: Set<LadeKnotenarmDTO>,
        knotenarme: Map<number, string>
    ): void {
        if (this.moeglicheBeziehungenVon.has(fahrbeziehung.von)) {
            // Erweitern bereits vorhandener von-Knotenarm um zusätzlichen möglichen nach-Knotenarm
            const kv: KnotenarmVerbindungen | undefined =
                this.moeglicheBeziehungenVon.get(fahrbeziehung.von);
            kv?.moeglicheVerbindungen.push({
                nummer: fahrbeziehung.nach,
                strassenname: this.getKnotenarmBezeichnung(
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
                    strassenname: this.getKnotenarmBezeichnung(
                        fahrbeziehung.von,
                        knotenarme
                    ),
                },
                moeglicheVerbindungen: [
                    this.alle,
                    {
                        nummer: fahrbeziehung.nach,
                        strassenname: this.getKnotenarmBezeichnung(
                            fahrbeziehung.nach,
                            knotenarme
                        ),
                    },
                ],
                moeglicheVerbindungenIds: [
                    this.alle.nummer,
                    fahrbeziehung.nach,
                ],
            };
            this.moeglicheBeziehungenVon.set(fahrbeziehung.von, kv);
        }
        alleZielknotenarmeVon.add({
            nummer: fahrbeziehung.nach,
            strassenname: this.getKnotenarmBezeichnung(
                fahrbeziehung.nach,
                knotenarme
            ),
        });
    }

    /**
     * Diese Methode fügt an den wählbaren Knotenarm für das Dropdown nach-Knotenarm
     * die möglichen von-Knotenarme an.
     */
    private addNachKnotenarmWithPossibleVonKnotenarm(
        fahrbeziehung: LadeFahrbeziehungDTO,
        alleEingehendeKnotenarmeNach: Set<LadeKnotenarmDTO>,
        knotenarme: Map<number, string>
    ): void {
        if (this.moeglicheBeziehungenNach.has(fahrbeziehung.nach)) {
            // Erweitern bereits vorhandener nach-Knotenarm um zusätzlichen möglichen von-Knotenarm
            const kv: KnotenarmVerbindungen | undefined =
                this.moeglicheBeziehungenNach.get(fahrbeziehung.nach);
            kv?.moeglicheVerbindungen.push({
                nummer: fahrbeziehung.von,
                strassenname: this.getKnotenarmBezeichnung(
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
                    strassenname: this.getKnotenarmBezeichnung(
                        fahrbeziehung.nach,
                        knotenarme
                    ),
                },
                moeglicheVerbindungen: [
                    this.alle,
                    {
                        nummer: fahrbeziehung.von,
                        strassenname: this.getKnotenarmBezeichnung(
                            fahrbeziehung.von,
                            knotenarme
                        ),
                    },
                ],
                moeglicheVerbindungenIds: [this.alle.nummer, fahrbeziehung.von],
            };
            this.moeglicheBeziehungenNach.set(fahrbeziehung.nach, kv);
        }
        alleEingehendeKnotenarmeNach.add({
            nummer: fahrbeziehung.von,
            strassenname: this.getKnotenarmBezeichnung(
                fahrbeziehung.von,
                knotenarme
            ),
        });
    }

    /**
     * true falls die aktuelle Zählung eine Kreuzung darstellt, andernfalls false.
     */
    public isZaehlungForKreuzung(): boolean {
        return (
            this.zaehlung?.kreisverkehr !== undefined &&
            !this.zaehlung?.kreisverkehr
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
    public getKnotenarmBezeichnung(
        knotenarm: number,
        knotenarme: Map<number, string>
    ): string {
        const strassenname: string | undefined = knotenarme.get(knotenarm);
        return strassenname === undefined
            ? "Kein Knotenarm gefunden"
            : strassenname;
    }
}
</script>
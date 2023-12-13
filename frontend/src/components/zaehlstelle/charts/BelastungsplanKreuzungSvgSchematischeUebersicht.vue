<template>
    <v-sheet
        id="belastungsplanSchematischeUebersicht"
        :height="dimension"
        :width="dimension"
    ></v-sheet>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

// Typen
/* eslint-disable no-unused-vars */
import LadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanDTO";
import LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import LadeFahrbeziehungDTO from "@/types/zaehlung/LadeFahrbeziehungDTO";
import Fahrtrichtungsarten from "@/types/enum/Fahrtrichtungsarten";
import BelastungsplanFahrbeziehung from "@/types/zaehlung/BelastungsplanFahrbeziehung";
import BelastungsplanKnotenarm from "@/types/zaehlung/BelastungsplanKnotenarm";
import BelastungsplanFahrbeziehungComperator from "@/types/zaehlung/BelastungsplanFahrbeziehungComperator";
import LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import LadeKnotenarmComperator from "@/types/zaehlung/LadeKnotenarmComperator";
import OptionsDTO from "@/types/zaehlung/OptionsDTO";
import BerechnungsMatrix from "@/types/zaehlung/BerechnungsMatrix";
import ZaehlstelleHeaderDTO from "@/types/zaehlstelle/ZaehlstelleHeaderDTO";
/* eslint-enable no-unused-vars */
import * as SVG from "@svgdotjs/svg.js";

@Component
export default class BelastungsplanKreuzungSvgSchematischeUebersicht extends Vue {
    @Prop() data!: LadeBelastungsplanDTO;
    @Prop({ default: "600vh" }) dimension!: string;
    @Prop({ default: 20 }) maxlineWidth!: number;
    @Prop({ default: 3 }) lineGap!: number;
    @Prop({ default: "#E0E0E0" }) shadowColor!: string;
    @Prop({ default: "#757575" }) legendColor!: string;
    @Prop({ default: 0.5 }) shadowOpacity!: number;
    // Grafischer Modus, um zu dokumentieren, wie die Winkelverbindungen
    // 45° / 135° errechnet werden.
    @Prop({ default: false }) docMode!: boolean;
    // Farben Differenzdatendarstellung
    @Prop({ default: "#F44336" }) zunahmeValueColor!: string;
    @Prop({ default: "#4CAF50" }) abnahmeValueColor!: string;
    @Prop({ default: "#000000" }) gleichValueColor!: string;
    // Soll die Geometrieauswahl im Belastungsplan gezeigt werden
    @Prop({ default: false }) geometrieMode!: boolean;
    @Prop({ default: "#E0E0E0" }) inaktivColor!: string;

    fontfamily = "Roboto, Arial, Helvetica, sans-serif";

    // die Basis Werte zum Errechnen der Positionen
    viewbox = 1400;

    // Prozentwerte um die Strecken zu errechnen
    prozentDiagram = 0.9;
    prozentSpalt = 0.05;
    prozentMaxFahrtrichtungWidth = 0.12;

    // Wert, um wie viel die Knotenarmnummer vergößert werden soll
    knotenarmnummerVergroesserung = 110;

    rotation: Map<number, number> = new Map<number, number>([
        [1, 90],
        [2, 180],
        [3, 270],
        [4, 0],
        [5, 135],
        [6, 225],
        [7, 315],
        [8, 45],
    ]);

    rotationLabel: Map<number, number> = new Map<number, number>([
        [1, 270],
        [2, 0],
        [3, 270],
        [4, 0],
        [5, 315],
        [6, 45],
        [7, 315],
        [8, 45],
    ]);

    rotationNumber: Map<number, number> = new Map<number, number>([
        [1, 270],
        [2, 180],
        [3, 90],
        [4, 0],
        [5, 225],
        [6, 135],
        [7, 45],
        [8, 315],
    ]);

    // werden initial errechnet und sind dann gesetzt
    vonMaxValue = 0;
    nachMaxValue = 0;
    lineWidth = 0;
    fahrtrichtungWidth = 0;
    highestFahrbeziehungsValue = 0;
    lowestFahrbeziehungsValue = 1000000;

    fahrbeziehungsTypen: Map<number, BelastungsplanFahrbeziehung[]> = new Map<
        number,
        BelastungsplanFahrbeziehung[]
    >();
    knotenarme: Map<number, BelastungsplanKnotenarm> = new Map<
        number,
        BelastungsplanKnotenarm
    >();
    prozentWerte: Map<number, boolean> = new Map<number, boolean>();

    canvas!: SVG.Svg;
    documentationGroup!: SVG.G;

    mounted() {
        this.canvas = SVG.SVG()
            .addTo("#belastungsplanSchematischeUebersicht")
            .size(this.dimension, this.dimension)
            .viewbox(0, 0, this.viewbox, this.viewbox);
        this.$store.dispatch(
            "setSizeBelastungsplanSvgSchematischeUebersicht",
            this.sizeBelastungsplan.replace("px", "")
        );
        this.$store.dispatch(
            "setMaxSizeBelastungsplanSvgSchematischeUebersicht",
            this.maxSizeBelastungsplan
        );
        this.$store.dispatch(
            "setMinSizeBelastungsplanSvgSchematischeUebersicht",
            this.minSizeBelastungsplan
        );
    }

    /**
     * Diese Methode zeichnet die schematische Übersicht des Belastungsplans immer, wenn sich die Daten ändern und kein Kreisverkehr ausgewählt ist.
     */
    @Watch("data")
    redrawOnNewData(data: LadeBelastungsplanDTO) {
        if (!this.data.kreisverkehr) {
            this.calcFahrbeziehungen(data);
        }
    }

    /**
     * Diese Methode zeichnet den Belastungsplan
     */
    draw() {
        const canvas = this.canvas;
        const cleanseMap = new Map<number, SVG.G>();
        canvas.clear();
        // ausgewählter Knotenarm bei Geometrieauswahl
        let selectedKnotenarm = 0;
        // Es wird eine Hilfs-Gruppe erstellt, mit der die Positionen der Fahrbeziehungen im Raum ermittelt werden können.
        // diese wird im Anschluss wieder gelöscht
        this.documentationGroup = canvas.group();
        this.documentationGroup
            .rect(this.viewbox, this.viewbox)
            .fill({ color: "white", opacity: this.docMode ? 0.3 : 0.0 });

        // Die Knotenarme werden einzeln in das Diagramm eingefügt
        let knotenarme = this.zaehlung.knotenarme as LadeKnotenarmDTO[];
        if (knotenarme) {
            let ks = Object.assign(new Array<LadeKnotenarmDTO>(), knotenarme);
            ks = ks.sort(LadeKnotenarmComperator.sortByNumber).reverse();
            ks.forEach((k) => {
                let r = this.calcRotation(k.nummer);
                const g = this.fahrtrichtungVon(k.nummer).rotate(r) as SVG.G;
                cleanseMap.set(k.nummer, g);
                // Wenn der Knotenarm ausgewählt wurde, dann merken wir uns die
                // Nummer, um ihn später nach oben setzen zu können.
                if (this.isSelectedKnotenarm(k.nummer)) {
                    selectedKnotenarm = k.nummer;
                }
            });

            // Wenn die Säuberung zu schnell nach der Transformation erfolgte, sind
            // Fehler aufgetreten. Deshalb die eigene Liste.
            cleanseMap.forEach((group, knotenarmnummer) => {
                const matrix = group.transform();
                const m = new BerechnungsMatrix(
                    matrix.a,
                    matrix.b,
                    matrix.c,
                    matrix.d,
                    matrix.e,
                    matrix.f
                );
                const cleanGroup = this.cleansePaths(group, m) as SVG.G;
                cleanseMap.set(knotenarmnummer, cleanGroup);
            });

            //  Wenn wir noch eine Geometrieauswahl haben, dann muss die ausgewählte Gruppe nach oben
            if (selectedKnotenarm > 0) {
                cleanseMap.get(selectedKnotenarm)!.front();
            }
        }
        // Wenn man die Dokumentation braucht, dann sollte sie ganz vorne sein
        if (this.docMode) {
            this.documentationGroup.front();
        } else {
            // ansonsten werden die Hilfspfade wieder aus dem Diagramm entfernt
            this.documentationGroup.remove();
        }

        // Druckdatei an übergeordnete Komponente übergeben. Die kann dann gedruckt werden oder auch nicht.
        // Die Datei wird automatisch ersetzt, sobald sich etwas am Chart verändert.
        //
        // Um den Belastungsplan in ein Bitmap umwandeln zu können, muss hier eine absolute Größe gesetzt werden.
        const size = this.sizeBelastungsplan;
        const ex = this.canvas
            .flatten(this.canvas)
            .size(size, size)
            .svg() as string;
        this.$emit(
            "print",
            new Blob([ex], { type: "image/svg+xml;charset=utf-8" })
        );
    }

    /**
     * Prüft, ob in der Geometrieauswahl des Optionsmenüs dieser Knotenarm ausgewählt wurde.
     *
     * @param knotenarmnummer
     */
    isSelectedKnotenarm(knotenarmnummer: number): boolean {
        if (
            this.geometrieMode &&
            this.vonIds.length === 1 &&
            this.vonIds.includes(knotenarmnummer)
        ) {
            return true;
        }
        return false;
    }

    /**
     * Säubert die Pfade so, dass sie keine Transformationen mehr benötigen. Das hat beim PDF
     * Druck zu Problemen geführt.
     *
     * @param source  Knotenarm Gruppe
     * @param matrix  Berechnungsmatrix für die Gruppe
     */
    cleansePaths(source: SVG.G, matrix: BerechnungsMatrix): SVG.G {
        const sink = this.canvas.group();
        source.children().forEach((child) => {
            // In den Gruppen sind die Pfade. Diese werden neu gebaut
            if (child instanceof SVG.G) {
                // Gruppe für die Pfade erstellen
                const pg = sink.group();
                // Alle Kinder der Pfadgruppe durch gehen
                child.children().forEach((sub) => {
                    if (sub instanceof SVG.Path) {
                        // Fahrbeziehung klonen, damit eigenschaften wie Linienstärke, Farbe usw. erhalten bleiben
                        const clone = sub.clone();
                        // Den Pfad für Position nach der Drehung berechnen
                        const path = this.recreatePath(matrix, clone.array());
                        // Den Pfad erneuern (alle anderen Eigenschaften bleiben bei plot erhalten).
                        clone.plot(path);
                        // Zur neuen Gruppe hinzufügen.
                        pg.add(clone);
                    }
                });
                child.remove();
            }
        });
        return sink;
    }

    /**
     * Erzeugt einen neuen SVG Pfad als String.
     *
     * @param svgMatrix   SVG Berechnungsmatrix
     * @param pathArray   der alte Pfad als Path Array
     */
    recreatePath(
        svgMatrix: BerechnungsMatrix,
        pathArray: SVG.PathArray
    ): string {
        let path = "";
        // Jeden Eintrag des Path Arrays auslesen, umrechnen und an den neuen Pfadstring
        // dran hängen.
        pathArray.forEach((item) => {
            // M und L - Gerade
            if (item[0] === "M" || item[0] === "L") {
                const xy = this.matrix(svgMatrix, item[1], item[2]);
                path = `${path} ${item[0]}${xy[0]} ${xy[1]}`;
            }
            // Q - Kurven
            if (item[0] === "Q") {
                const xy1 = this.matrix(svgMatrix, item[1], item[2]);
                const xy2 = this.matrix(svgMatrix, item[3], item[4]);
                path = `${path} ${item[0]}${xy1[0]} ${xy1[1]} ${xy2[0]} ${xy2[1]}`;
            }
        });
        return path.trim();
    }

    /**
     * Berechnet die Lage der neuen Punkte anhand der SVG Berechnungs Matrix und den
     * alten Koordinaten.
     *
     * @param matrix  SVG Berechnungsmatrix
     * @param x       alter X Wert
     * @param y       alter Y Wert
     */
    matrix(matrix: BerechnungsMatrix, x: number, y: number): number[] {
        const nx = matrix.a! * x + matrix.c! * y + matrix.e!;
        const ny = matrix.b! * x + matrix.d! * y + matrix.f!;
        return [nx, ny];
    }

    /**
     * Ermittelt die Farbe der Fahrbeziehung. Die ausgewählte Fahrbeziehung soll schwarz sein, alle anderen inaktiv.
     *
     * @param vonKnotenarm
     * @param nachKnotenarm
     * @param vonWert         der Wert, den die Fahrbeziehung repräsentiert
     */
    // eslint-disable-next-line no-unused-vars
    lineColor(
        vonKnotenarm: number,
        nachKnotenarm: number,
        vonWert: number
    ): string {
        let color = "#000000";

        if (this.geometrieMode && this.vonIds.length > 0) {
            if (
                !(
                    this.vonIds.includes(vonKnotenarm) &&
                    this.nachIds.includes(nachKnotenarm)
                )
            ) {
                color = this.inaktivColor;
            }
        }

        return color;
    }

    /**
     * Erzeugt die Linien und Beschriftungen je Knotenarm.
     *
     * @param knotenarmnummer Die Knotenarmnummer.
     */
    fahrtrichtungVon(knotenarmnummer: number): SVG.G {
        const canvas = this.canvas;
        // Es wird alles gruppiert, damit wir es später einfach so drehen können, dass der Knotenarm richtig sitzt.
        const knotenarmGroup = canvas.group() as SVG.G;

        // TODO hilfs rechteck einfügen um das Achteck darstellen zu können -- löschen
        const a = this.seite / (1 + Math.sqrt(2));
        knotenarmGroup
            .rect(this.seite, a)
            .fill({ color: "red", opacity: 0.0 })
            .x(this.chartPosition)
            .y(this.viewbox / 2 - a / 2);
        // Knotenarm Infos
        const knotenarm = this.knotenarme.get(knotenarmnummer);

        // Einstellungen
        // die Transparenz der Hilfsquadrate. Sollte in der Regel 0.0 sein
        const opacity = 0.0;
        // maximale Breite der Linie + die Lücke zwischen den Linien
        const line = this.lineWidth + this.lineGap;

        if (this.fahrbeziehungsTypen.has(knotenarmnummer) && knotenarm) {
            // Gruppe für alle Fahrbeziehungen eines Knotenarms
            const fahrbeziehungsGroup = canvas.group() as SVG.G;
            fahrbeziehungsGroup
                .rect(this.viewbox, this.viewbox)
                .fill({ color: "white", opacity: opacity });
            // hier werden die Schattenlinien der Fahrbeziehungen je Knotenarm gesammelt
            const shadowGroup = canvas.group() as SVG.G;
            shadowGroup
                .rect(this.viewbox, this.viewbox)
                .fill({ color: "white", opacity: opacity });
            shadowGroup.back();

            // Die Sortierung ist wichtig, weil sie vorgibt, in welcher Reihenfolge die Fahrbeziehungen auf der
            // Fahrtrichtung angeordnet werden.
            let fbts = this.fahrbeziehungsTypen
                .get(knotenarmnummer)
                ?.sort(
                    BelastungsplanFahrbeziehungComperator.sortByFahrtrichtungsart
                ) as BelastungsplanFahrbeziehung[];

            // Jede Fahrbeziehung des Knotenarms wird durchiteriert. Je nach Fahrbeziehungstyp (Rechtsabbieger 90°,
            // geradeaus, usw.) wird die Linie gezeichnet. Je Fahrbeziehung hat genau einen Fahrbeziehungstypen.
            fbts.forEach((fbt) => {
                // Die Position der Fahrbeziehung in der Fahrtrichtung "von"
                const vonPosition = this.knotenarme
                    .get(knotenarmnummer)!
                    .findFahrbeziehungVonPosition(fbt.fahrbeziehungsTyp);

                // Die Position der Fahrbeziehung in der Fahrtrichtung "nach"
                let nachPosition = this.knotenarme
                    .get(fbt.nach)!
                    .findFahrbeziehungsNachPosition(fbt.fahrbeziehungsTyp);

                // Der Startpunkt
                const startX = this.chartPosition;
                const startY =
                    this.viewbox / 2 + this.basis / 2 - vonPosition * line;

                // rechts 45°
                if (fbt.fahrbeziehungsTyp === Fahrtrichtungsarten.RECHTS45) {
                    const start = new SVG.Point(startX, startY);
                    const achteck1 = new SVG.Point(
                        this.chartPosition,
                        this.chartPosition + this.ecke + this.calcA()
                    );
                    const achteck2 = new SVG.Point(
                        this.chartPosition + this.ecke + this.calcA(),
                        this.chartPosition
                    );
                    const path = this.zielPunkt(
                        achteck1,
                        new SVG.Point(
                            achteck1.x + this.ecke,
                            achteck1.y + this.ecke
                        ),
                        achteck2,
                        new SVG.Point(
                            achteck2.x + this.ecke,
                            achteck2.y + this.ecke
                        ),
                        start,
                        nachPosition,
                        this.ecke / 4,
                        true
                    );
                    fahrbeziehungsGroup
                        .path(path)
                        .stroke({
                            width: this.lineWidth,
                            color: this.lineColor(
                                knotenarmnummer,
                                fbt.nach,
                                fbt.total
                            ),
                        })
                        .attr("fill", "none");
                    shadowGroup
                        .path(path)
                        .stroke({
                            width: this.lineWidth,
                            color: this.shadowColor,
                            opacity: this.shadowOpacity,
                        })
                        .attr("fill", "none");
                }

                // rechts 90°
                if (fbt.fahrbeziehungsTyp === Fahrtrichtungsarten.RECHTS90) {
                    const zielX =
                        startX +
                        this.ecke +
                        this.spalt +
                        nachPosition * this.line;
                    const zielY = this.viewbox - this.chartPosition;
                    const path = `M${startX} ${startY}
                        L${
                            startX + this.ecke + nachPosition * this.line
                        } ${startY}
                        Q${zielX} ${startY}
                         ${zielX} ${startY + this.spalt}
                        L${zielX} ${zielY}`;
                    fahrbeziehungsGroup
                        .path(path)
                        .stroke({
                            width: this.lineWidth,
                            color: this.lineColor(
                                knotenarmnummer,
                                fbt.nach,
                                fbt.total
                            ),
                        })
                        .attr("fill", "none");
                    shadowGroup
                        .path(path)
                        .stroke({
                            width: this.lineWidth,
                            color: this.shadowColor,
                            opacity: this.shadowOpacity,
                        })
                        .attr("fill", "none");
                }

                // rechts 135°
                if (fbt.fahrbeziehungsTyp === Fahrtrichtungsarten.RECHTS135) {
                    const start = new SVG.Point(startX, startY);
                    const achteck1 = new SVG.Point(
                        this.chartPosition + this.ecke + this.calcA(),
                        this.chartPosition + this.seite
                    );
                    const achteck2 = new SVG.Point(
                        this.chartPosition,
                        this.chartPosition + this.ecke
                    );
                    const path = this.zielPunkt(
                        achteck1,
                        new SVG.Point(
                            achteck1.x + this.ecke,
                            achteck1.y - this.ecke
                        ),
                        achteck2,
                        new SVG.Point(
                            achteck2.x + this.ecke,
                            achteck2.y - this.ecke
                        ),
                        start,
                        nachPosition,
                        this.ecke + this.spalt,
                        false
                    );
                    fahrbeziehungsGroup
                        .path(path)
                        .stroke({
                            width: this.lineWidth,
                            color: this.lineColor(
                                knotenarmnummer,
                                fbt.nach,
                                fbt.total
                            ),
                        })
                        .attr("fill", "none");
                    shadowGroup
                        .path(path)
                        .stroke({
                            width: this.lineWidth,
                            color: this.shadowColor,
                            opacity: this.shadowOpacity,
                        })
                        .attr("fill", "none");
                }

                // geradeaus
                if (fbt.fahrbeziehungsTyp === Fahrtrichtungsarten.GERADE) {
                    const path = `M${startX} ${startY} L${
                        startX + this.seite
                    } ${startY}`;
                    fahrbeziehungsGroup.path(path).stroke({
                        width: this.lineWidth,
                        color: this.lineColor(
                            knotenarmnummer,
                            fbt.nach,
                            fbt.total
                        ),
                    });
                    shadowGroup.path(path).stroke({
                        width: this.lineWidth,
                        color: this.shadowColor,
                        opacity: this.shadowOpacity,
                    });
                }

                // links 45°
                if (fbt.fahrbeziehungsTyp === Fahrtrichtungsarten.LINKS45) {
                    const start = new SVG.Point(startX, startY);
                    const achteck1 = new SVG.Point(
                        this.chartPosition + this.ecke,
                        this.chartPosition
                    );
                    const achteck2 = new SVG.Point(
                        this.chartPosition + this.seite,
                        this.chartPosition + this.ecke + this.calcA()
                    );
                    const path = this.zielPunkt(
                        achteck1,
                        new SVG.Point(
                            achteck1.x - this.ecke,
                            achteck1.y + this.ecke
                        ),
                        achteck2,
                        new SVG.Point(
                            achteck2.x - this.ecke,
                            achteck2.y + this.ecke
                        ),
                        start,
                        nachPosition,
                        this.ecke - this.spalt,
                        false
                    );
                    fahrbeziehungsGroup
                        .path(path)
                        .stroke({
                            width: this.lineWidth,
                            color: this.lineColor(
                                knotenarmnummer,
                                fbt.nach,
                                fbt.total
                            ),
                        })
                        .attr("fill", "none");
                    shadowGroup
                        .path(path)
                        .stroke({
                            width: this.lineWidth,
                            color: this.shadowColor,
                            opacity: this.shadowOpacity,
                        })
                        .attr("fill", "none");
                }

                // links 90°
                if (fbt.fahrbeziehungsTyp === Fahrtrichtungsarten.LINKS90) {
                    const zielX =
                        startX +
                        this.seite -
                        this.ecke -
                        this.spalt -
                        nachPosition * line;
                    const path = `M${startX} ${startY}
                        L${
                            startX + this.seite / 2 - this.seite * 0.07
                        } ${startY}
                        Q${zielX} ${startY}
                         ${zielX} ${startY - this.mitte / 2}
                        L${zielX} ${this.chartPosition}`;
                    fahrbeziehungsGroup
                        .path(path)
                        .stroke({
                            width: this.lineWidth,
                            color: this.lineColor(
                                knotenarmnummer,
                                fbt.nach,
                                fbt.total
                            ),
                        })
                        .attr("fill", "none");
                    shadowGroup
                        .path(path)
                        .stroke({
                            width: this.lineWidth,
                            color: this.shadowColor,
                            opacity: this.shadowOpacity,
                        })
                        .attr("fill", "none");
                }

                // links 135°
                if (fbt.fahrbeziehungsTyp === Fahrtrichtungsarten.LINKS135) {
                    const start = new SVG.Point(startX, startY);
                    const achteck1 = new SVG.Point(
                        this.chartPosition + this.seite,
                        this.chartPosition + this.ecke
                    );
                    const achteck2 = new SVG.Point(
                        this.chartPosition + this.ecke,
                        this.chartPosition + this.seite
                    );
                    const path = this.zielPunkt(
                        achteck1,
                        new SVG.Point(
                            achteck1.x - this.ecke,
                            achteck1.y - this.ecke
                        ),
                        achteck2,
                        new SVG.Point(
                            achteck2.x - this.ecke,
                            achteck2.y - this.ecke
                        ),
                        start,
                        nachPosition,
                        this.seite / 2 - this.spalt,
                        false
                    );
                    fahrbeziehungsGroup
                        .path(path)
                        .stroke({
                            width: this.lineWidth,
                            color: this.lineColor(
                                knotenarmnummer,
                                fbt.nach,
                                fbt.total
                            ),
                        })
                        .attr("fill", "none");
                    shadowGroup
                        .path(path)
                        .stroke({
                            width: this.lineWidth,
                            color: this.shadowColor,
                            opacity: this.shadowOpacity,
                        })
                        .attr("fill", "none");
                }

                // Uturn
                if (fbt.fahrbeziehungsTyp === Fahrtrichtungsarten.UTURN) {
                    const wendeX = startX + this.ecke * 0.75;
                    const querX = wendeX + this.spalt;
                    const zielY =
                        this.chartPosition +
                        this.ecke +
                        this.spalt +
                        nachPosition * line;
                    const path = `M${startX} ${startY}
                        L${wendeX} ${startY}
                        Q${querX} ${startY}
                         ${querX} ${startY - this.spalt}
                        L${querX} ${zielY + this.spalt}
                        Q${querX} ${zielY}
                         ${wendeX} ${zielY}
                        L${startX} ${zielY}`;
                    fahrbeziehungsGroup
                        .path(path)
                        .stroke({
                            width: this.lineWidth,
                            color: this.lineColor(
                                knotenarmnummer,
                                fbt.nach,
                                fbt.total
                            ),
                        })
                        .attr("fill", "none");
                    shadowGroup
                        .path(path)
                        .stroke({
                            width: this.lineWidth,
                            color: this.shadowColor,
                            opacity: this.shadowOpacity,
                        })
                        .attr("fill", "none");
                }
            });

            knotenarmGroup.add(shadowGroup).add(fahrbeziehungsGroup);

            // ================================
            // Beschriftungen
            // ================================

            // Knotenarm Nummer
            let r = this.rotationNumber.get(knotenarmnummer);
            if (!r) {
                r = 0;
            }
            knotenarmGroup
                .text((add) => {
                    add.tspan(knotenarmnummer + "");
                })
                .font({
                    size: this.lineWidth + this.knotenarmnummerVergroesserung,
                    family: this.fontfamily,
                    anchor: "middle",
                })
                .attr("alignment-baseline", "central")
                .cx(this.chartPosition + this.ecke - this.spalt * 4) // Radius des Kreises
                .cy(this.viewbox / 2) // Einrückungstiefe der Nummer
                .rotate(r);
            knotenarmGroup
                .circle(this.lineWidth + this.knotenarmnummerVergroesserung)
                .stroke({ width: 10, color: "black" })
                .fill("none")
                .cx(this.chartPosition + this.ecke - this.spalt * 4)
                .cy(this.viewbox / 2);
            //
            // Labels
            // Spaltenbreite
            const colWidth = Math.ceil(
                (this.chartPosition - this.lineGap * 5 - 15) / 3
            );
            //
            // Für die Beschriftung der Fahrbeziehungen wird eine eigene Gruppe erzeugt
            const fahrbeziehungenLabelRotationGroup = canvas.group();
            // Ein Rechteck, so groß wie der Viewport, um einen Drehpunkt um die Mitte zu haben
            fahrbeziehungenLabelRotationGroup
                .rect(this.viewbox, this.viewbox)
                .fill({ color: "white", opacity: opacity });
            //
            // ========
            // Nach Labels
            // ========

            // Die Fahrbeziehungen 1, 2, 5, 6 werden rechts beschriftet und dann gedreht
            const ausgleich = knotenarm.ausgleich * line;
            let yNach =
                this.chartPosition +
                this.ecke +
                this.spalt +
                this.basis -
                (knotenarm.anzahlNachFahrbeziehungen * this.lineWidth) / 2 -
                this.lineGap -
                ausgleich;
            let yD1 =
                this.chartPosition +
                this.ecke +
                this.spalt +
                this.basis +
                line / 2 -
                ausgleich;
            let yD2 =
                this.chartPosition +
                this.ecke +
                this.spalt +
                this.basis -
                knotenarm.anzahlNachFahrbeziehungen * this.lineWidth +
                this.lineGap -
                ausgleich;
            let xc1 = this.chartPosition + this.seite + colWidth;
            let xc3 = this.chartPosition + this.seite + colWidth * 3;
            let xD1 = xc1 - colWidth + this.lineGap;
            let xD2 = xD1 + 50;

            // Die Fahrbeziehungen 3, 4, 7, 8 werden links beschriftet und dann gedreht
            if ([3, 4, 7, 8].includes(knotenarmnummer)) {
                yNach =
                    this.chartPosition +
                    this.ecke +
                    this.spalt +
                    (knotenarm.anzahlNachFahrbeziehungen * this.lineWidth) / 2 -
                    this.lineWidth +
                    this.lineGap +
                    ausgleich;
                yD1 =
                    this.chartPosition +
                    this.ecke +
                    this.spalt -
                    this.lineWidth / 2 +
                    ausgleich;
                yD2 =
                    this.chartPosition +
                    this.ecke +
                    this.spalt +
                    knotenarm.anzahlNachFahrbeziehungen * this.lineWidth +
                    ausgleich;
                xc1 = colWidth;
                xc3 = colWidth * 3;
                xD1 = xc3 + this.chartPosition - colWidth * 3 - this.lineGap;
                xD2 = xD1 - 50;
            }

            // ========
            // Dreieck
            // ========
            if (this.geometrieMode && this.nachIds.length > 0) {
                if (this.nachIds.includes(knotenarmnummer)) {
                    if (knotenarm.anzahlNachFahrbeziehungen > 0) {
                        // Dreieck
                        const dreieck = `M${xD1} ${yD1} L${xD2} ${
                            yNach + line / 2
                        } L${xD1} ${yD2} z`;
                        fahrbeziehungenLabelRotationGroup
                            .path(dreieck)
                            .stroke({ width: 2, color: "black" })
                            .attr("fill", "black");
                    }
                }
            }

            fahrbeziehungenLabelRotationGroup.rotate(
                this.calcLabelRotation(knotenarmnummer)
            );
        }
        return knotenarmGroup;
    }

    /**
     * Prüft, ob sich zwei Knotenarme gegenüber liegen.
     */
    isGegenueber(von: number, nach: number): boolean {
        if (
            (von === 1 && nach === 3) ||
            (von === 5 && nach === 7) ||
            (von === 2 && nach === 4) ||
            (von === 6 && nach === 8) ||
            (von === 3 && nach === 1) ||
            (von === 7 && nach === 5) ||
            (von === 4 && nach === 2) ||
            (von === 8 && nach === 6)
        ) {
            return true;
        }
        return false;
    }

    /**
     * Hier werden alle Daten gesammelt bzw. aufbereitet, die zur Anzeige des Diagramms notwendig sind. Diese
     * Methode wird aufgerufen, wenn über das Property "data" die Daten zur Darstellung des Belastungsplanes
     * erneuert werden.
     *
     * @param data  Die Anzeigedaten des Belastungsplanes.
     */
    calcFahrbeziehungen(data: LadeBelastungsplanDTO) {
        // alte Daten ggf. leeren
        this.knotenarme.clear();
        this.fahrbeziehungsTypen.clear();
        this.highestFahrbeziehungsValue = 0;
        this.lowestFahrbeziehungsValue = 0;
        // Die Datentypen der Werteblöcke werden extrahiert
        this.prozentWerte.set(0, data.value1.percent);
        this.prozentWerte.set(1, data.value2.percent);
        this.prozentWerte.set(2, data.value3.percent);
        // Aus der aktuellen Zählung (diese ist im $store) werden die Fahrbeziehungen geladen.
        const fbs = this.zaehlung.fahrbeziehungen as LadeFahrbeziehungDTO[];
        if (fbs && Array.isArray(fbs)) {
            // Für jede Fahrbeziehung werden die Daten aufbereitet
            fbs.forEach((fb) => {
                // Wenn es für den Knotenarm noch keinen Eintrag für die Fahrbeziehungstypen gibt,
                // dann muss dieser angelegt werden.
                if (!this.fahrbeziehungsTypen.has(fb.von)) {
                    this.fahrbeziehungsTypen.set(
                        fb.von,
                        new Array<BelastungsplanFahrbeziehung>()
                    );
                }

                // Für Knotenarme, die nur eingehende Fahrbeziehungen haben.
                if (!this.fahrbeziehungsTypen.has(fb.nach)) {
                    this.fahrbeziehungsTypen.set(
                        fb.nach,
                        new Array<BelastungsplanFahrbeziehung>()
                    );
                }

                // Wenn es für den Knotenarm noch keinen Eintrag in den Knotenarmen gibt,
                // dann muss dieser angelegt werden. Das muss sowohl für "von" als auch für
                // "nach" gemacht werden.

                // "von" checken und ggf. anlegen
                if (!this.knotenarme.has(fb.von)) {
                    this.knotenarme.set(
                        fb.von,
                        new BelastungsplanKnotenarm(
                            data.streets[fb.von - 1],
                            fb.von
                        )
                    );
                }
                let knotenarmVon = this.knotenarme.get(fb.von);
                this.anzeigeWerte(knotenarmVon, data);
                // "nach" checken und ggf. anlegen
                if (!this.knotenarme.has(fb.nach)) {
                    this.knotenarme.set(
                        fb.nach,
                        new BelastungsplanKnotenarm(
                            data.streets[fb.nach - 1],
                            fb.nach
                        )
                    );
                }
                let knotenarmNach = this.knotenarme.get(fb.nach);
                this.anzeigeWerte(knotenarmNach, data);

                // Fahrbeziehungstypen (Rechts-/Linksabbieger usw.) ermitteln
                let belastungsplanFahrbeziehungen =
                    this.fahrbeziehungsTypen.get(
                        fb.von
                    ) as BelastungsplanFahrbeziehung[];
                let belastungsplanFahrbeziehung =
                    new BelastungsplanFahrbeziehung(
                        this.calcFahrbeziehungstype(fb.von, fb.nach),
                        fb.nach
                    ) as BelastungsplanFahrbeziehung;
                belastungsplanFahrbeziehungen.push(belastungsplanFahrbeziehung);

                const v = fb.von - 1;
                const n = fb.nach - 1;

                // Fahrwerte zu den einzelnen Fahrbeziehungen zuordnen
                belastungsplanFahrbeziehung.value1 = data.value1.values[v][n];
                if (data.value2.filled) {
                    belastungsplanFahrbeziehung.value2 =
                        data.value2.values[v][n];
                }
                if (data.value3.filled) {
                    belastungsplanFahrbeziehung.value3 =
                        data.value3.values[v][n];
                }

                if (knotenarmVon) {
                    // von Zähler hoch setzen
                    knotenarmVon.plusFahrbeziehungenVon();
                    if (
                        this.positiveNumber(
                            knotenarmVon.anzahlVonFahrbeziehungen
                        ) > this.vonMaxValue
                    )
                        this.vonMaxValue = this.positiveNumber(
                            knotenarmVon.anzahlVonFahrbeziehungen
                        );
                    // den höchsten und niedrigsten Wert einer Fahrbeziehung ermitteln
                    // (gilt hier nur der KFZ Verkehr?)
                    if (
                        this.positiveNumber(data.value1.values[v][n]) >
                        this.highestFahrbeziehungsValue
                    )
                        this.highestFahrbeziehungsValue = this.positiveNumber(
                            data.value1.values[v][n]
                        );
                    if (
                        this.positiveNumber(data.value1.values[v][n]) <
                        this.lowestFahrbeziehungsValue
                    )
                        this.lowestFahrbeziehungsValue = this.positiveNumber(
                            data.value1.values[v][n]
                        );
                    // Fahrbeziehungstyp wird gesetzt um später die Position der Linien berrechnen zu können
                    knotenarmVon.addVonFahrbeziehungsType(
                        belastungsplanFahrbeziehung.fahrbeziehungsTyp
                    );
                }

                if (knotenarmNach) {
                    // nach Zähler hoch setzen
                    knotenarmNach.plusFahrbeziehungenNach();
                    if (
                        this.positiveNumber(
                            knotenarmNach.anzahlNachFahrbeziehungen
                        ) > this.nachMaxValue
                    )
                        this.nachMaxValue = this.positiveNumber(
                            knotenarmNach.anzahlNachFahrbeziehungen
                        );
                    // den Typ der eingehenden Verbindung speichern
                    knotenarmNach.addNachFahrbeziehungsTyp(
                        belastungsplanFahrbeziehung.fahrbeziehungsTyp
                    );
                }
            });

            // Im Nachgang werden die Positionen der "geradeaus" Fahrbeziehungen ermittelt. Diese sind
            // wichtig, weil daran die anderen Fahrbeziehungen ausgerichtet werden. D.h. auf der "nach"
            // Seite muss ich wissen, auf welcher Position die gerade Fahrbeziehung im "von" plaziert ist, um die
            //  anderen eingehenden Fahrbeziehungen danach ausrichten zu können.
            this.knotenarme.forEach((k) => {
                let gegenueber = 0;
                if ([5, 2, 6, 1].includes(k.knotenarmNummer)) {
                    gegenueber = k.knotenarmNummer + 2;
                }

                if ([8, 4, 7, 3].includes(k.knotenarmNummer)) {
                    gegenueber = k.knotenarmNummer - 2;
                }
                if (this.knotenarme.has(gegenueber)) {
                    this.fahrbeziehungenAusrichten(
                        k,
                        this.knotenarme.get(gegenueber)!
                    );
                }

                // Es werden die Summen in die Knotenarem geschrieben
                const knummer = k.knotenarmNummer - 1;
                k.vonTotalValue1 = data.value1.sumIn[knummer];
                k.nachTotalValue1 = data.value1.sumOut[knummer];
                k.totalValue1 = data.value1.sum[knummer];
                // Soll Wert 2 dargestellt werden?
                if (
                    data.value2.filled &&
                    !(this.isDifferenzdatendarstellung && data.value2.percent)
                ) {
                    k.vonTotalValue2 = data.value2.sumIn[knummer];
                    k.nachTotalValue2 = data.value2.sumOut[knummer];
                    k.totalValue2 = data.value2.sum[knummer];
                }
                // Soll Wert 3 dargestellt werden?
                if (
                    data.value3.filled &&
                    !(this.isDifferenzdatendarstellung && data.value3.percent)
                ) {
                    k.vonTotalValue3 = data.value3.sumIn[knummer];
                    k.nachTotalValue3 = data.value3.sumOut[knummer];
                    k.totalValue3 = data.value3.sum[knummer];
                }
            });

            // maximale Linien Dicke berrechnen
            this.calcMaxLineWidth();

            // Belastungsplan ausgeben
            this.draw();
        }
    }

    /**
     * Füllt die Marker, welche Werte überhaupt angezeigt werden.
     *
     * @param knotenarm   Knotenarm
     * @param data        Belastungsplandaten
     */
    anzeigeWerte(
        knotenarm: BelastungsplanKnotenarm | undefined,
        data: LadeBelastungsplanDTO
    ) {
        if (knotenarm) {
            knotenarm.is1Filled = data.value1.filled;
            knotenarm.is2Filled = data.value2.filled;
            knotenarm.is3Filled = data.value3.filled;
        }
    }

    /**
     * Wandelt eine negative Zahl in eine positive um. Das ist bei der Differenzdatendarstellung notwendig,
     * da eine Linie mit -200 genauso breit dargestellt werden muss, wie eine Linie mit +200.
     *
     * @param num   Anzahl der Fahrzeuge
     */
    positiveNumber(num: number): number {
        if (num < 0) {
            return num * -1;
        }
        return num;
    }

    /**
     * Die Fahrbeziehungen sollen so ausgerichtet werden, dass keine Lücken entstehen. Das passiert
     * immer dann, wenn es eine gerade Fahrbeziehung zwischen zwei Knotenarmen gibt und links oder rechts von der
     * Geraden unterschiedlich viele Fahrbeziehung plaziert sind.
     *
     * @param von   "von" Knotenarm
     * @param nach  "nach" Knotenarm
     */
    fahrbeziehungenAusrichten(
        von: BelastungsplanKnotenarm,
        nach: BelastungsplanKnotenarm
    ) {
        if (
            nach.nachFahrbeziehungsTypen.includes(Fahrtrichtungsarten.GERADE) &&
            this.isGegenueber(von.knotenarmNummer, nach.knotenarmNummer)
        ) {
            // Muss für beide Seiten ein Ausgleich erzeugt werden
            this.ausgleichBerechnen(von, nach);
            this.ausgleichBerechnen(nach, von);
        }
    }

    /**
     * Um die Lücken auszugleichen, wird ein Ausgleichswert berechnet. Im Prinzip ist das die Differenz zwischen
     * den gegenüberliegenden Seiten. Dieser Ausgleichswert wird im "NACH" Knotenarm gespeichert und dann zur
     * Berrechnung hinzugezogen. Per Default ist dieser Ausgleichswert 0 (es muss in der Regel nichts ausgeglichen
     * werden). Nur bei den Problemfällen ist er größer oder kleiner 0.
     *
     * @param von   "von" Knotenarm
     * @param nach  "nach" Knotenarm
     */
    ausgleichBerechnen(
        von: BelastungsplanKnotenarm,
        nach: BelastungsplanKnotenarm
    ) {
        // Der Index der Geraden Fahrbeziehung muss voneinander abweichen, um ein Problem zu sein.
        const indexVon = von.vonFahrbeziehungsTypen
            .sort()
            .indexOf(Fahrtrichtungsarten.GERADE);
        const indexNach = nach.findFahrbeziehungsNachPosition(
            Fahrtrichtungsarten.GERADE
        );
        if (indexVon != indexNach) {
            // Ein Problem in der Anzeige tritt aber erst dann auf, wenn auf den gegenüber liegenden Knotenarmen
            // rechte und/oder linke Fahrtrichtungen abweichen.
            nach.ausgleich = indexVon - indexNach;
        }
    }

    /**
     * Berechnet - abhängig vom Knotenarm - die Rotation um die Mitte.
     *
     * @param knotenarmnummer
     */
    calcRotation(knotenarmnummer: number): number {
        let r = this.rotation.get(knotenarmnummer);
        if (!r) {
            r = 0;
        }
        return r;
    }

    /**
     * Berechnet die Rotation für die Labels
     *
     * @param knotenarmnummer
     */
    calcLabelRotation(knotenarmnummer: number): number {
        let r = this.rotationLabel.get(knotenarmnummer);
        if (!r) {
            r = 0;
        }
        return r;
    }

    /**
     * Die maximale Dicke der Linien wird errechnet. Maßgeblich ist hierbei, ob die Summe des
     * größten "von" oder "nach" Knotenarms, mutlipliziert mit der maximalen Linien Stärke und
     * der jeweiligen Lücke zwischen den Linien, größer oder kleiner als die maximale Breite
     * einer Fahrtrichtung ist. Ist sie kleiner, so kann die maximale Linienbreite verwendet
     * werden, ist sie größer, so muss die Linienbreite so weit reduziert werden, dass alle
     * Fahrbeziehungen mit ihrer maximalen Breite aus eine Fahrtrichtung passen.
     */
    calcMaxLineWidth() {
        const mw = this.maxlineWidth + this.lineGap;
        let mv = 0;
        this.vonMaxValue > this.nachMaxValue
            ? (mv = this.vonMaxValue)
            : (mv = this.nachMaxValue);
        if (mv * mw > this.maxFahrtrichtungWidth) {
            // die maximale Breite der Linien muss reduziert werden

            // Der Platz, der nach Abzug der Lücke je Linie bleibt, muss durch die Anzahl
            // der maximalen linien geteilt werden. Die Breite der Linie wird abgerundet,
            // damit wir einen glatten Wert für die Textgröße haben.
            this.lineWidth = Math.ceil(
                (this.maxFahrtrichtungWidth - mv * this.lineGap) / mv
            );
            this.fahrtrichtungWidth = this.maxFahrtrichtungWidth;
        } else {
            // die maximale Breite der Linien kann so bleiben
            this.fahrtrichtungWidth = mv * mw;
            this.lineWidth = this.maxlineWidth;
        }
    }

    /**
     * Typen der ausgehenden Fahrbeziehungen je Knotenarm werden ermittelt. Dies passiert, indem abgefragt wird, wie
     * welche knotenarme miteinander verbunden sind.
     *
     * @param von     "von" Knotenarmnummer
     * @param nach    "nach" Knotenarmnummer
     */
    calcFahrbeziehungstype(von: number, nach: number): number {
        // Uturn
        if (von === nach) {
            return Fahrtrichtungsarten.UTURN;
        }

        // gerade aus
        if (this.isGegenueber(von, nach)) {
            return Fahrtrichtungsarten.GERADE;
        }

        // rechts 45°
        if (
            ([2, 3, 4].includes(von) && von + 3 === nach) ||
            ([5, 6, 7, 8].includes(von) && von - 4 === nach) ||
            (von === 1 && nach === 8)
        ) {
            return Fahrtrichtungsarten.RECHTS45;
        }

        // rechts 90°
        if (
            ([4, 3, 2, 6, 7, 8].includes(von) && von - 1 === nach) ||
            (von === 1 && nach === 4) ||
            (von === 5 && nach === 8)
        ) {
            return Fahrtrichtungsarten.RECHTS90;
        }

        // rechts 135°
        if (
            (von === 1 && nach === 7) ||
            (von === 2 && nach === 8) ||
            (von === 3 && nach === 5) ||
            (von === 4 && nach === 6) ||
            (von === 5 && nach === 4) ||
            (von === 6 && nach === 1) ||
            (von === 7 && nach === 2) ||
            (von === 8 && nach === 3)
        ) {
            return Fahrtrichtungsarten.RECHTS135;
        }

        // links 45°
        if (
            ([1, 2, 3, 4].includes(von) && von + 4 === nach) ||
            ([5, 6, 7].includes(von) && von - 3 === nach) ||
            (von === 8 && nach === 1)
        ) {
            return Fahrtrichtungsarten.LINKS45;
        }

        // links 90°
        if (
            ([1, 2, 3, 5, 6, 7].includes(von) && von + 1 === nach) ||
            (von === 4 && nach === 1) ||
            (von === 8 && nach === 5)
        ) {
            return Fahrtrichtungsarten.LINKS90;
        }

        // links 135°
        if (
            ([1, 2, 3].includes(von) && von + 5 === nach) ||
            (von === 4 && nach === 5) ||
            ([5, 6].includes(von) && nach === von - 2) ||
            (von === 7 && nach === 1) ||
            (von === 8 && nach === 2)
        ) {
            return Fahrtrichtungsarten.LINKS135;
        }

        return -1;
    }

    /**
     * Hier wird der Pfad für die ungeraden Winkelverbindungen (links/rechts 45°/135°) berrechnet. Dazu wird im
     * virtuellen Achteck (wir haben ja eine Kreuzung mit 8 Knotenarmen) eine Gerade zwischen dem Startpunkt (VON) und
     * dem gegenüberliegenden Punkt gezeichnet.
     *
     * Dann wird auf der Seite des Achtecks, auf die die Fahrbeziehung treffen soll (NACH) eine Linie von der einen
     * Achteck-Ecke zur Anderen gezogen. Auf dieser Linie wird dann der Abstand zum Zielpunkt genommen (pointAt).
     * Auf der gegenüberliegenden Seite wird das selbe gemacht (wichtig ist, dass man wirklich den Punkt gegenüber
     * und nicht schräg versetzt ermittelt. Ausschlaggeben ist, von welcher Seite der Pfad gezeichnet wird.). Zwischen
     * den beiden Punkten wird eine Gerade gezogen.
     *
     * Bei den beiden Geraden ist es wichtig, dass sie immer ausgehend vom Ziel bzw. Startpunkt gezeichnet werden,
     * damit später mit "pointAt" die Wendepunkte für die quaadratische kurve abgenommen werden können.
     *
     * An dem Punkt, an dem sich die beiden Geraden treffen ist der Wendepunkt für die quadratische Kurve (Q).
     *
     * Um das grafisch zu veranschaulichen, kann an der Komponente der Doc-Mode aktiviert und an einem (oder auch
     * an mehreren - dann wird es aber schnell unübersichtlich) der vier Fahrtrichtungstypen "doc" auf "true" gesetzt
     * werden. Ruft man jetzt eine Kreuzung auf, die den ausgewählten Fahrtrichtungstyp enthält, so wird das ober
     * Erklärte auch grafisch im Digramm dargestellt.
     *
     * @param achteck1      Der Startpunkt für die "Ziellinie" (muss auf der Seite der eingehenden Fahrbeziehungen des Knotenarms liegen).
     * @param achteck2      Der Zielpunkt für die "Ziellinie".
     * @param achteck3      Der Startpunkt für die der "Ziellinie" gegenüberliegende Gerade (muss dem Startpunkt gegenüber liegen).
     * @param achteck4      Der Zielpunkt für die gegenüberliegende Gerade.
     * @param startPunkt    Der Punkt, an der Pfad der Fahrbeziehung startet.
     * @param positionNach  Die Position, die die aktuelle Fahrbezihungen unter allen "NACH" Fahrbeziehungen des "NACH" Knotenarms einnimmt.
     * @param distanz       Die Entfernung zwischen Start / Ziel Punkt und dem Start der quadratischen Kurve.
     * @param doc           Soll die Berechnung der Punkte grafisch dargestellt werden?
     */
    zielPunkt(
        achteck1: SVG.Point,
        achteck2: SVG.Point,
        achteck3: SVG.Point,
        achteck4: SVG.Point,
        startPunkt: SVG.Point,
        positionNach: number,
        distanz: number,
        doc: boolean
    ): string {
        const positionZielpunkt = this.spalt + positionNach * this.line;
        // Linie am Zielpunkt
        const aZielVon = this.documentationGroup
            .path(`M${achteck1.x} ${achteck1.y}
               L${achteck2.x} ${achteck2.y}`);
        // Zielpunkt
        const point1 = aZielVon.pointAt(positionZielpunkt) as SVG.Point;
        // Linie auf der gegenüberliegenden Seite des Ziels
        const aZielNach = this.documentationGroup
            .path(`M${achteck3.x} ${achteck3.y}
               L${achteck4.x} ${achteck4.y}`);
        // Punkt auf den die Zielpunktgerade trifft
        const point2 = aZielNach.pointAt(positionZielpunkt) as SVG.Point;
        // Zielgerade ziehen
        const pathZiel = this.documentationGroup.path(`M${point1.x} ${point1.y}
               L${point2.x} ${point2.y}`);

        // Schnittpunkt zwischen Start- und Ziellinie berechnen
        // Startlinie
        const startX1 = startPunkt.x;
        const startX2 = startPunkt.x + this.seite;
        const startY1 = startPunkt.y;
        const startY2 = startPunkt.y;
        const startM = (startY2 - startY1) / (startX2 - startX1);
        const startN = startY2 - startM * startX2;

        // Ziellinie
        const zielX1 = point1.x;
        const zielX2 = point2.x;
        const zielY1 = point1.y;
        const zielY2 = point2.y;
        const zielM = (zielY2 - zielY1) / (zielX2 - zielX1);
        const zielN = zielY2 - zielM * zielX2;

        // Schnittpunkte
        const sx = ((zielN - startN) * -1) / (zielM - startM);
        const sy = startM * sx + startN;

        // die Punkte für die Kurven berechnen
        const pathStart = this.documentationGroup.path(`M${startX1} ${startY1}
               L${startX2} ${startY2}`);
        const startKurvenPunkt = pathStart.pointAt(distanz);
        const zielKurvenPunkt = pathZiel.pointAt(distanz);

        // Den Pfad für die Fahrtrichtung erstellen.
        const path = `M${startX1} ${startY1}
                  L${startKurvenPunkt.x} ${startKurvenPunkt.y}
                  Q${sx} ${sy}
                   ${zielKurvenPunkt.x} ${zielKurvenPunkt.y}
                  L${zielX1} ${zielY1}`;

        // Für Dokumentationszwecke können diese Linen in das Diagram gezeichnet werden. In der
        // Regel wird das nicht der Fall sein.
        if (this.docMode && doc) {
            pathStart.stroke({ width: 1, color: "black" }).attr("fill", "none");
            aZielVon.stroke({ width: 2, color: "black" }).attr("fill", "none");
            aZielNach.stroke({ width: 2, color: "black" }).attr("fill", "none");
            pathZiel.stroke({ width: 1, color: "black" }).attr("fill", "none");
            this.documentationGroup
                .circle(10)
                .fill({ color: "green" })
                .move(point1.x - 5, point1.y - 5);
            this.documentationGroup
                .circle(10)
                .fill({ color: "green" })
                .move(startX1 - 5, startY1 - 5);
            this.documentationGroup
                .circle(6)
                .fill({ color: "#f06" })
                .move(point2.x - 3, point2.y - 3);
            this.documentationGroup
                .circle(6)
                .fill({ color: "#f06" })
                .move(startX2 - 3, startY2 - 3);
            this.documentationGroup
                .circle(10)
                .fill({ color: "green" })
                .move(sx - 5, sy - 5);
            this.documentationGroup
                .circle(10)
                .fill({ color: "green" })
                .move(startKurvenPunkt.x - 5, startKurvenPunkt.y - 5);
            this.documentationGroup
                .circle(10)
                .fill({ color: "green" })
                .move(zielKurvenPunkt.x - 5, zielKurvenPunkt.y - 5);
        }
        return path;
    }

    get isDifferenzdatendarstellung(): boolean {
        return false;
    }

    get vonIds() {
        const options = this.$store.getters.getFilteroptions as OptionsDTO;
        return options.vonIds;
    }

    get nachIds() {
        const options = this.$store.getters.getFilteroptions as OptionsDTO;
        return options.nachIds;
    }

    /**
     * Berechnet die Seitenlänge einer der 8 Seiten des Achteecks A.
     */
    calcA(): number {
        return this.seite / (1 + Math.sqrt(2));
    }

    get zaehlung(): LadeZaehlungDTO {
        return this.$store.getters.getAktiveZaehlung as LadeZaehlungDTO;
    }

    get zaehlstelle(): ZaehlstelleHeaderDTO {
        return this.$store.getters.getZaehlstelle as ZaehlstelleHeaderDTO;
    }

    get optionen(): OptionsDTO {
        return this.$store.getters.getFilteroptions as OptionsDTO;
    }

    get maxFahrtrichtungWidth(): number {
        return this.seite * this.prozentMaxFahrtrichtungWidth;
    }

    get seite(): number {
        return this.viewbox * this.prozentDiagram;
    }

    get ecke(): number {
        return (this.seite - this.mitte) / 2;
    }

    /**
     * Die "Mitte" ist immer die Seite des regelmäßigen Achteckes.
     */
    get mitte(): number {
        return this.calcA();
    }

    get spalt(): number {
        return this.seite * this.prozentSpalt;
    }

    get basis(): number {
        return this.calcA() - this.spalt * 2;
    }

    get chartPosition(): number {
        return (this.viewbox - this.seite) / 2;
    }

    get line(): number {
        return this.lineWidth + this.lineGap;
    }

    /**
     * Wenn der Nutzer auf den Tabs navigiert, dann bekommt die Belastungsplan
     * Komponente das als Event mit. Dies ist notwendig, da es Probleme gibt,
     * das SVG zu zeichen, wenn der Tab mit dem Diagramm nicht sichtbar ist.
     */
    get activeTab(): number {
        return this.$store.getters.getChangetabevent as number;
    }

    get sizeBelastungsplan(): string {
        let sizeBelastungsplanSvg: number =
            this.$store.getters.getSizeBelastungsplanSvgSchematischeUebersicht;
        if (sizeBelastungsplanSvg === 0) {
            sizeBelastungsplanSvg = this.minSizeBelastungsplan;
        }
        return sizeBelastungsplanSvg + "px";
    }

    get minSizeBelastungsplan(): number {
        return (
            (parseInt(this.dimension.trim().replace("vh", "")) *
                this.$vuetify.breakpoint.height) /
            100
        );
    }

    get maxSizeBelastungsplan(): number {
        return (
            (parseInt(this.dimension.trim().replace("vh", "")) *
                this.$vuetify.breakpoint.width) /
            100
        );
    }
}
</script>
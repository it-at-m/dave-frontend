<template>
    <v-sheet
        id="belastungsplan"
        :height="dimension"
        :width="dimension"
    />
</template>

<script setup lang="ts">
import type LadeBelastungsplanDTO from "@/types/zaehlung/zaehldaten/LadeBelastungsplanDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type LadeFahrbeziehungDTO from "@/types/zaehlung/LadeFahrbeziehungDTO";
import Fahrtrichtungsarten from "@/types/enum/Fahrtrichtungsarten";
import BelastungsplanFahrbeziehung from "@/types/zaehlung/BelastungsplanFahrbeziehung";
import BelastungsplanKnotenarm from "@/types/zaehlung/BelastungsplanKnotenarm";
import BelastungsplanFahrbeziehungComperator from "@/types/zaehlung/BelastungsplanFahrbeziehungComperator";
import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import LadeKnotenarmComperator from "@/types/zaehlung/LadeKnotenarmComperator";
import type OptionsDTO from "@/types/zaehlung/OptionsDTO";
import BerechnungsMatrix from "@/types/zaehlung/BerechnungsMatrix";
import type ZaehlstelleHeaderDTO from "@/types/zaehlstelle/ZaehlstelleHeaderDTO";
import * as SVG from "@svgdotjs/svg.js";
import Zeitauswahl from "@/types/enum/Zeitauswahl";
import Zeitblock, { zeitblockInfo } from "@/types/enum/Zeitblock";
import { zeitblockStuendlichInfo } from "@/types/enum/ZeitblockStuendlich";
import Zaehldauer from "@/types/enum/Zaehldauer";
import { useVuetify } from "@/util/useVuetify";
import {computed, onMounted, type Ref, ref, watch} from "vue";
import { useDateUtils } from "@/util/DateUtils";
import { useZaehlstelleStore } from "@/store/zaehlstelle";
import type {StartEndeUhrzeitIntervalls} from "@/types/zaehlung/StartEndeUhrzeitIntervalls";
import {useDisplay} from "vuetify";

interface Props {
    data: LadeBelastungsplanDTO;
    dimension?: string;
    maxlineWidth?: number;
    maxLegendLineWidth?: number;
    lineGap?: number;
    shadowColor?: string;
    legendColor?: string;
    shadowOpacity?: number;
    // Grafischer Modus, um zu dokumentieren, wie die Winkelverbindungen
    // 45° / 135° errechnet werden.
    docMode?: boolean;
    // Farben Differenzdatendarstellung
    zunahmeValueColor?: string;
    abnahmeValueColor?: string;
    gleichValueColor?: string;
    // Soll die Geometrieauswahl im Belastungsplan gezeigt werden
    geometrieMode?: boolean;
    inaktivColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
    dimension: "600vh",
    maxlineWidth: 20,
    maxLegendLineWidth: 25,
    lineGap: 3,
    shadowColor: "#E0E0E0",
    legendColor: "#757575",
    shadowOpacity: 0.5,
    docMode: false,
    zunahmeValueColor: "#F44336",
    abnahmeValueColor: "#4CAF50",
    gleichValueColor: "#000000",
    geometrieMode: false,
    inaktivColor: "#E0E0E0",
});

const emits = defineEmits<(e: "print", v: Blob) => void>();

const zaehlstelleStore = useZaehlstelleStore();
const display = useDisplay();
const dateUtils = useDateUtils();

const fontfamily = "Roboto, Arial, Helvetica, sans-serif";

// die Basis Werte zum Errechnen der Positionen
const viewbox = 1400;

// Prozentwerte um die Strecken zu errechnen
const prozentDiagram = 0.6;
const prozentSpalt = 0.05;
const prozentMaxFahrtrichtungWidth = 0.12;

const farben = new Map<number, string>([
    [1, "#000000"],
    [2, "#F44336"],
    [3, "#4CAF50"],
    [4, "#2196F3"],
    [5, "#CDDC39"],
    [6, "#9C27B0"],
    [7, "#FF9800"],
    [8, "#795548"],
]);

const rotation = new Map<number, number>([
    [1, 90],
    [2, 180],
    [3, 270],
    [4, 0],
    [5, 135],
    [6, 225],
    [7, 315],
    [8, 45],
]);

const rotationLabel = new Map<number, number>([
    [1, 270],
    [2, 0],
    [3, 270],
    [4, 0],
    [5, 315],
    [6, 45],
    [7, 315],
    [8, 45],
]);

const rotationNumber = new Map<number, number>([
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
const vonMaxValue = ref(0);
const nachMaxValue = ref(0);
const lineWidth = ref(0);
const fahrtrichtungWidth = ref(0);
const highestFahrbeziehungsValue = ref(0);
const lowestFahrbeziehungsValue = ref(1000000);

const fahrbeziehungsTypen =
    ref<Map<number, BelastungsplanFahrbeziehung[]>>(new Map<number, BelastungsplanFahrbeziehung[]>()) as Ref<Map<number, BelastungsplanFahrbeziehung[]>>;
const knotenarme = ref<Map<number, BelastungsplanKnotenarm>>(
    new Map<number, BelastungsplanKnotenarm>()
) as Ref<Map<number, BelastungsplanKnotenarm>>;
const prozentWerte = ref<Map<number, boolean>>(new Map<number, boolean>());

const canvas = ref<SVG.Svg>(SVG.SVG());
const documentationGroup = ref<SVG.G>(canvas.value.group());

onMounted(() => {
    canvas.value = SVG.SVG()
        .addTo("#belastungsplan")
        .size(props.dimension, props.dimension)
        .viewbox(0, 0, viewbox, viewbox);
    zaehlstelleStore.setSizeBelastungsplanSvg(
        Number.parseInt(sizeBelastungsplan.value.replace("px", ""))
    );
    zaehlstelleStore.setMaxSizeBelastungsplanSvg(maxSizeBelastungsplan.value);
    zaehlstelleStore.setMinSizeBelastungsplanSvg(minSizeBelastungsplan.value);
});

const zaehlung  = computed<LadeZaehlungDTO>(() => {
    return zaehlstelleStore.getAktiveZaehlung;
});

const zaehlstelle = computed<ZaehlstelleHeaderDTO>(() => {
    return zaehlstelleStore.getZaehlstelleHeader;
});

const optionen = computed<OptionsDTO>(() => {
    return zaehlstelleStore.getFilteroptions;
});

const maxFahrtrichtungWidth = computed(() => {
    return seite.value * prozentMaxFahrtrichtungWidth;
});

const seite = computed(() => {
    return viewbox * prozentDiagram;
});

const ecke = computed(() => {
    return (seite.value - mitte.value) / 2;
});

/**
 * Die "Mitte" ist immer die Seite des regelmäßigen Achteckes.
 */
const mitte = computed(() => {
    return calcA();
});

const spalt = computed(() => {
    return seite.value * prozentSpalt;
});

const basis = computed(() => {
    return calcA() - spalt.value * 2;
});

const chartPosition = computed(() => {
    return (viewbox - seite.value) / 2;
});

const line = computed(() => {
    return lineWidth.value + props.lineGap;
});

/**
 * Wenn der Nutzer auf den Tabs navigiert, dann bekommt die Belastungsplan
 * Komponente das als Event mit. Dies ist notwendig, da es Probleme gibt,
 * das SVG zu zeichen, wenn der Tab mit dem Diagramm nicht sichtbar ist.
 */
const activeTab = computed(() => {
    return zaehlstelleStore.getActiveTab;
});

const sizeBelastungsplan = computed(() => {
    let sizeBelastungsplanSvg: number =
        zaehlstelleStore.getSizeBelastungsplanSvg;
    if (sizeBelastungsplanSvg === 0) {
        sizeBelastungsplanSvg = minSizeBelastungsplan.value;
    }
    return sizeBelastungsplanSvg + "px";
});

const minSizeBelastungsplan = computed(() => {
    return (
        (parseInt(props.dimension.trim().replace("vh", "")) *
            display.height.value) /
        100
    );
});

const maxSizeBelastungsplan = computed(() => {
    return (
        (parseInt(props.dimension.trim().replace("vh", "")) *
            display.width.value) /
        100
    );
});

/**
 * Liefert die LineWidth für die Legende
 * Wenn alle 3 Spalten im Belastungsplan gefüllt sind,
 * so wird die maxlineWidth verwendet, ansonsten ist mehr Platz da
 */
const getLegendLineWidth = computed(() => {
    // Wenn alles gefüllt ist, dann die maxLineWidth
    if (
        props.data &&
        props.data.value1.filled &&
        props.data.value2.filled &&
        props.data.value3.filled
    ) {
        return props.maxlineWidth;
    } else {
        // sonst geht mehr
        return props.maxLegendLineWidth;
    }
});

/**
 * Über diesen Wert wird die Liniendicke gesteuert, wenn zu wenig Platz vorhanden ist.
 */
const lineFactor = computed(() => {
    return lineWidth.value / highestFahrbeziehungsValue.value;
});

const isDifferenzdatendarstellung = computed(() => {
    return zaehlstelleStore.isDifferenzdatenDarstellung;
});

/**
 * Holt sich bei einer Diffenzdatendarstellung die Vergleichszählung
 */
const vergleichsZaehlung = computed(() => {
    if (isDifferenzdatendarstellung.value && optionen.value.vergleichszaehlungsId) {
        return zaehlstelleStore.getZaehlungById(
            optionen.value.vergleichszaehlungsId
        );
    }
    return undefined;
});

const isBlackPrintMode = computed(() => {
    return zaehlstelleStore.isBlackprintMode;
});

const vonIds = computed(() => {
    return optionen.value.vonIds;
});

const nachIds = computed(() => {
    return optionen.value.nachIds;
});

const beideRichtungen = computed(() => {
    return optionen.value.beideRichtungen;
});

/**
 * Diese Methode zeichnet den Belastungsplan
 */
function draw() {
    const cleanseMap = new Map<number, SVG.G>();
    canvas.value.clear();
    // ausgewählter Knotenarm bei Geometrieauswahl
    let selectedKnotenarm = 0;
    // Es wird eine Hilfs-Gruppe erstellt, mit der die Positionen der Fahrbeziehungen im Raum ermittelt werden können.
    // diese wird im Anschluss wieder gelöscht
    documentationGroup.value = canvas.value.group();
    documentationGroup.value
        .rect(viewbox, viewbox)
        .fill({ color: "white", opacity: props.docMode ? 0.3 : 0.0 });

    // Die Knotenarme werden einzeln in das Diagramm eingefügt
    let knotenarme = zaehlung.value.knotenarme as LadeKnotenarmDTO[];
    if (knotenarme) {
        let ks = Object.assign(new Array<LadeKnotenarmDTO>(), knotenarme);
        ks = ks.sort(LadeKnotenarmComperator.sortByNumber).reverse();
        ks.forEach((k) => {
            let r = calcRotation(k.nummer);
            const g = fahrtrichtungVon(k.nummer).rotate(r) as SVG.G;
            cleanseMap.set(k.nummer, g);
            // Wenn der Knotenarm ausgewählt wurde, dann merken wir uns die
            // Nummer, um ihn später nach oben setzen zu können.
            if (isSelectedKnotenarm(k.nummer)) {
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
            const cleanGroup = cleansePaths(group, m) as SVG.G;
            cleanseMap.set(knotenarmnummer, cleanGroup);
        });

        //  Wenn wir noch eine Geometrieauswahl haben, dann muss die ausgewählte Gruppe nach oben
        if (selectedKnotenarm > 0) {
            cleanseMap.get(selectedKnotenarm)!.front();
        }
    }
    // Wenn man die Dokumentation braucht, dann sollte sie ganz vorne sein
    if (props.docMode) {
        documentationGroup.value.front();
    } else {
        // ansonsten werden die Hilfspfade wieder aus dem Diagramm entfernt
        documentationGroup.value.remove();
    }

    // Legende erstellen
    legendeNordPfeil();
    legendeLinienStaerke();
    legendeSpalten();
    legendeZaehlstellenInfo();

    // Druckdatei an übergeordnete Komponente übergeben. Die kann dann gedruckt werden oder auch nicht.
    // Die Datei wird automatisch ersetzt, sobald sich etwas am Chart verändert.
    //
    // Um den Belastungsplan in ein Bitmap umwandeln zu können, muss hier eine absolute Größe gesetzt werden.
    const size = sizeBelastungsplan.value;
    const ex = canvas.value
        .flatten(canvas.value)
        .size(size, size)
        .svg() as string;
    emits("print", new Blob([ex], { type: "image/svg+xml;charset=utf-8" }));
}

/**
 * Prüft, ob in der Geometrieauswahl des Optionsmenüs dieser Knotenarm ausgewählt wurde.
 *
 * @param knotenarmnummer
 */
function isSelectedKnotenarm(knotenarmnummer: number): boolean {
    return (
        props.geometrieMode &&
        vonIds.value.length === 1 &&
        vonIds.value.includes(knotenarmnummer)
    );
}

/**
 * Säubert die Pfade so, dass sie keine Transformationen mehr benötigen. Das hat beim PDF
 * Druck zu Problemen geführt.
 *
 * @param source  Knotenarm Gruppe
 * @param matrix  Berechnungsmatrix für die Gruppe
 */
function cleansePaths(source: SVG.G, matrix: BerechnungsMatrix): SVG.G {
    const sink = canvas.value.group();
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
                    const path = recreatePath(matrix, clone.array());
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
function recreatePath(
    svgMatrix: BerechnungsMatrix,
    pathArray: SVG.PathArray
): string {
    let path = "";
    // Jeden Eintrag des Path Arrays auslesen, umrechnen und an den neuen Pfadstring
    // dran hängen.
    pathArray.forEach((item) => {
        // M und L - Gerade
        if (item[0] === "M" || item[0] === "L") {
            const xy = matrix(svgMatrix, item[1], item[2]);
            path = `${path} ${item[0]}${xy[0]} ${xy[1]}`;
        }
        // Q - Kurven
        if (item[0] === "Q") {
            const xy1 = matrix(svgMatrix, item[1], item[2]);
            const xy2 = matrix(svgMatrix, item[3], item[4]);
            path = `${path} ${item[0]}${xy1[0]} ${xy1[1]} ${xy2[0]} ${xy2[1]}`;
        }
    });
    return path.trim();
}

/**
 * Berechnet die Lage der neuen Punkte anhand der SVG Berechnungs Matrix und den
 * alten Koordinanten.
 *
 * @param matrix  SVG Berechnungsmatrix
 * @param x       alter X Wert
 * @param y       alter Y Wert
 */
function matrix(matrix: BerechnungsMatrix, x: number, y: number): number[] {
    const nx = matrix.a! * x + matrix.c! * y + matrix.e!;
    const ny = matrix.b! * x + matrix.d! * y + matrix.f!;
    return [nx, ny];
}

/**
 * Ermittelt die Farbe der Fahrbeziehung. Diese hängt vom Knotenarm ab, aber auch von der
 * Anzeige Auswahl, die der Nutzer im Optionsmenü getroffen hat.
 *
 * @param vonKnotenarm
 * @param nachKnotenarm
 * @param vonWert         der Wert, den die Fahrbeziehung repräsentiert
 */
function lineColor(
    vonKnotenarm: number,
    nachKnotenarm: number,
    vonWert: number
): string {
    // Die Standardfarbe des Knotenarms
    let color = farben.get(vonKnotenarm)!;

    // Bei der Differenzdatendarstellung werden Fahrbeziehungen
    // mit zunehmendem Verkehr Rot, mit abnehmenden Verkehr Grün und
    // alle die gleich geblieben sind mit Schwarz eingefärbt. Die
    // Nummer des Knotenarms spielt hier keine Rolle.
    if (isDifferenzdatendarstellung.value) {
        if (vonWert > 0) color = props.zunahmeValueColor;
        if (vonWert < 0) color = props.abnahmeValueColor;
        if (vonWert === 0) color = props.gleichValueColor;
    }

    // Wenn der schwarz weiß Modus angeschaltet ist, dann werden alle aktiven Fahrbeziehungen
    // schwarz gedruckt.
    if (isBlackPrintMode.value) {
        return "#000000";
    }

    // Wenn die Geometrieauswahl im Belastungsplan angezeigt werden soll ("Zeige von Knotenarm, nach Knotenarm"),
    // Dann werden inaktive Fahrbeziehungen anders eingefärbt, als die aktive Fahrbeziehung.
    if (props.geometrieMode && vonIds.value.length > 0) {
        if (
            !(
                vonIds.value.includes(vonKnotenarm) &&
                nachIds.value.includes(nachKnotenarm)
            )
        ) {
            if (
                !(
                    beideRichtungen.value &&
                    vonIds.value.includes(nachKnotenarm) &&
                    nachIds.value.includes(vonKnotenarm)
                )
            ) {
                color = props.inaktivColor;
            }
        }
    }

    return color;
}

/**
 * Erzeugt die Linien und Beschriftungen je Knotenarm.
 *
 * @param knotenarmnummer Die Knotenarmnummer.
 */
function fahrtrichtungVon(knotenarmnummer: number): SVG.G {
    // Es wird alles gruppiert, damit wir es später einfach so drehen können, dass der Knotenarm richtig sitzt.
    const knotenarmGroup = canvas.value.group() as SVG.G;

    // TODO hilfs rechteck einfügen um das Achteck darstellen zu können -- löschen
    const a = seite.value / (1 + Math.sqrt(2));
    knotenarmGroup
        .rect(seite.value, a)
        .fill({ color: "red", opacity: 0.0 })
        .x(chartPosition.value)
        .y(viewbox / 2 - a / 2);
    // Knotenarm Infos
    const knotenarm = knotenarme.value.get(knotenarmnummer);

    // Einstellungen
    // die Transparenz der Hilfsquadrate. Sollte in der Regel 0.0 sein
    const opacity = 0.0;

    if (fahrbeziehungsTypen.value.has(knotenarmnummer) && knotenarm) {
        // Gruppe für alle Fahrbeziehungen eines Knotenarms
        const fahrbeziehungsGroup = canvas.value.group() as SVG.G;
        fahrbeziehungsGroup
            .rect(viewbox, viewbox)
            .fill({ color: "white", opacity: opacity });
        // hier werden die Schattenlinien der Fahrbeziehungen je Knotenarm gesammelt
        const shadowGroup = canvas.value.group() as SVG.G;
        shadowGroup
            .rect(viewbox, viewbox)
            .fill({ color: "white", opacity: opacity });
        shadowGroup.back();

        // Die Sortierung ist wichtig, weil sie vorgibt, in welcher Reihenfolge die Fahrbeziehungen auf der
        // Fahrtrichtung angeordnet werden.
        let fbts = fahrbeziehungsTypen.value
            .get(knotenarmnummer)
            ?.sort(
                BelastungsplanFahrbeziehungComperator.sortByFahrtrichtungsart
            ) as BelastungsplanFahrbeziehung[];

        // Jede Fahrbeziehung des Knotenarms wird durchiteriert. Je nach Fahrbeziehungstyp (Rechtsabbieger 90°,
        // geradeaus, usw.) wird die Linie gezeichnet. Je Fahrbeziehung hat genau einen Fahrbeziehungstypen.
        fbts.forEach((fbt) => {
            // Die Position der Fahrbeziehung in der Fahrtrichtung "von"
            const vonPosition = knotenarme.value
                .get(knotenarmnummer)!
                .findFahrbeziehungVonPosition(fbt.fahrbeziehungsTyp);

            // Die Position der Fahrbeziehung in der Fahrtrichtung "nach"
            let nachPosition = knotenarme.value
                .get(fbt.nach)!
                .findFahrbeziehungsNachPosition(fbt.fahrbeziehungsTyp);

            // Der Startpunkt
            const startX = chartPosition.value;
            const startY =
                viewbox / 2 + basis.value / 2 - vonPosition * line.value;

            // rechts 45°
            if (fbt.fahrbeziehungsTyp === Fahrtrichtungsarten.RECHTS45) {
                const start = new SVG.Point(startX, startY);
                const achteck1 = new SVG.Point(
                    chartPosition.value,
                    chartPosition.value + ecke.value + calcA()
                );
                const achteck2 = new SVG.Point(
                    chartPosition.value + ecke.value + calcA(),
                    chartPosition.value
                );
                const path = zielPunkt(
                    achteck1,
                    new SVG.Point(
                        achteck1.x + ecke.value,
                        achteck1.y + ecke.value
                    ),
                    achteck2,
                    new SVG.Point(
                        achteck2.x + ecke.value,
                        achteck2.y + ecke.value
                    ),
                    start,
                    nachPosition,
                    ecke.value / 4,
                    true
                );
                fahrbeziehungsGroup
                    .path(path)
                    .stroke({
                        width: calcLineWidth(fbt.total),
                        color: lineColor(knotenarmnummer, fbt.nach, fbt.total),
                    })
                    .attr("fill", "none");
                shadowGroup
                    .path(path)
                    .stroke({
                        width: lineWidth.value,
                        color: props.shadowColor,
                        opacity: props.shadowOpacity,
                    })
                    .attr("fill", "none");
            }

            // rechts 90°
            if (fbt.fahrbeziehungsTyp === Fahrtrichtungsarten.RECHTS90) {
                const zielX =
                    startX +
                    ecke.value +
                    spalt.value +
                    nachPosition * line.value;
                const zielY = viewbox - chartPosition.value;
                const path = `M${startX} ${startY}
                        L${
                            startX + ecke.value + nachPosition * line.value
                        } ${startY}
                        Q${zielX} ${startY}
                         ${zielX} ${startY + spalt.value}
                        L${zielX} ${zielY}`;
                fahrbeziehungsGroup
                    .path(path)
                    .stroke({
                        width: calcLineWidth(fbt.total),
                        color: lineColor(knotenarmnummer, fbt.nach, fbt.total),
                    })
                    .attr("fill", "none");
                shadowGroup
                    .path(path)
                    .stroke({
                        width: lineWidth.value,
                        color: props.shadowColor,
                        opacity: props.shadowOpacity,
                    })
                    .attr("fill", "none");
            }

            // rechts 135°
            if (fbt.fahrbeziehungsTyp === Fahrtrichtungsarten.RECHTS135) {
                const start = new SVG.Point(startX, startY);
                const achteck1 = new SVG.Point(
                    chartPosition.value + ecke.value + calcA(),
                    chartPosition.value + seite.value
                );
                const achteck2 = new SVG.Point(
                    chartPosition.value,
                    chartPosition.value + ecke.value
                );
                const path = zielPunkt(
                    achteck1,
                    new SVG.Point(
                        achteck1.x + ecke.value,
                        achteck1.y - ecke.value
                    ),
                    achteck2,
                    new SVG.Point(
                        achteck2.x + ecke.value,
                        achteck2.y - ecke.value
                    ),
                    start,
                    nachPosition,
                    ecke.value + spalt.value,
                    false
                );
                fahrbeziehungsGroup
                    .path(path)
                    .stroke({
                        width: calcLineWidth(fbt.total),
                        color: lineColor(knotenarmnummer, fbt.nach, fbt.total),
                    })
                    .attr("fill", "none");
                shadowGroup
                    .path(path)
                    .stroke({
                        width: lineWidth.value,
                        color: props.shadowColor,
                        opacity: props.shadowOpacity,
                    })
                    .attr("fill", "none");
            }

            // geradeaus
            if (fbt.fahrbeziehungsTyp === Fahrtrichtungsarten.GERADE) {
                const path = `M${startX} ${startY} L${
                    startX + seite.value
                } ${startY}`;
                fahrbeziehungsGroup.path(path).stroke({
                    width: calcLineWidth(fbt.total),
                    color: lineColor(knotenarmnummer, fbt.nach, fbt.total),
                });
                shadowGroup.path(path).stroke({
                    width: lineWidth.value,
                    color: props.shadowColor,
                    opacity: props.shadowOpacity,
                });
            }

            // links 45°
            if (fbt.fahrbeziehungsTyp === Fahrtrichtungsarten.LINKS45) {
                const start = new SVG.Point(startX, startY);
                const achteck1 = new SVG.Point(
                    chartPosition.value + ecke.value,
                    chartPosition.value
                );
                const achteck2 = new SVG.Point(
                    chartPosition.value + seite.value,
                    chartPosition.value + ecke.value + calcA()
                );
                const path = zielPunkt(
                    achteck1,
                    new SVG.Point(
                        achteck1.x - ecke.value,
                        achteck1.y + ecke.value
                    ),
                    achteck2,
                    new SVG.Point(
                        achteck2.x - ecke.value,
                        achteck2.y + ecke.value
                    ),
                    start,
                    nachPosition,
                    ecke.value - spalt.value,
                    false
                );
                fahrbeziehungsGroup
                    .path(path)
                    .stroke({
                        width: calcLineWidth(fbt.total),
                        color: lineColor(knotenarmnummer, fbt.nach, fbt.total),
                    })
                    .attr("fill", "none");
                shadowGroup
                    .path(path)
                    .stroke({
                        width: lineWidth.value,
                        color: props.shadowColor,
                        opacity: props.shadowOpacity,
                    })
                    .attr("fill", "none");
            }

            // links 90°
            if (fbt.fahrbeziehungsTyp === Fahrtrichtungsarten.LINKS90) {
                const zielX =
                    startX +
                    seite.value -
                    ecke.value -
                    spalt.value -
                    nachPosition * line.value;
                const path = `M${startX} ${startY}
                        L${
                            startX + seite.value / 2 - seite.value * 0.07
                        } ${startY}
                        Q${zielX} ${startY}
                         ${zielX} ${startY - mitte.value / 2}
                        L${zielX} ${chartPosition.value}`;
                fahrbeziehungsGroup
                    .path(path)
                    .stroke({
                        width: calcLineWidth(fbt.total),
                        color: lineColor(knotenarmnummer, fbt.nach, fbt.total),
                    })
                    .attr("fill", "none");
                shadowGroup
                    .path(path)
                    .stroke({
                        width: lineWidth.value,
                        color: props.shadowColor,
                        opacity: props.shadowOpacity,
                    })
                    .attr("fill", "none");
            }

            // links 135°
            if (fbt.fahrbeziehungsTyp === Fahrtrichtungsarten.LINKS135) {
                const start = new SVG.Point(startX, startY);
                const achteck1 = new SVG.Point(
                    chartPosition.value + seite.value,
                    chartPosition.value + ecke.value
                );
                const achteck2 = new SVG.Point(
                    chartPosition.value + ecke.value,
                    chartPosition.value + seite.value
                );
                const path = zielPunkt(
                    achteck1,
                    new SVG.Point(
                        achteck1.x - ecke.value,
                        achteck1.y - ecke.value
                    ),
                    achteck2,
                    new SVG.Point(
                        achteck2.x - ecke.value,
                        achteck2.y - ecke.value
                    ),
                    start,
                    nachPosition,
                    seite.value / 2 - spalt.value,
                    false
                );
                fahrbeziehungsGroup
                    .path(path)
                    .stroke({
                        width: calcLineWidth(fbt.total),
                        color: lineColor(knotenarmnummer, fbt.nach, fbt.total),
                    })
                    .attr("fill", "none");
                shadowGroup
                    .path(path)
                    .stroke({
                        width: lineWidth.value,
                        color: props.shadowColor,
                        opacity: props.shadowOpacity,
                    })
                    .attr("fill", "none");
            }

            // Uturn
            if (fbt.fahrbeziehungsTyp === Fahrtrichtungsarten.UTURN) {
                const wendeX = startX + ecke.value * 0.75;
                const querX = wendeX + spalt.value;
                const zielY =
                    chartPosition.value +
                    ecke.value +
                    spalt.value +
                    nachPosition * line.value;
                const path = `M${startX} ${startY}
                        L${wendeX} ${startY}
                        Q${querX} ${startY}
                         ${querX} ${startY - spalt.value}
                        L${querX} ${zielY + spalt.value}
                        Q${querX} ${zielY}
                         ${wendeX} ${zielY}
                        L${startX} ${zielY}`;
                fahrbeziehungsGroup
                    .path(path)
                    .stroke({
                        width: calcLineWidth(fbt.total),
                        color: lineColor(knotenarmnummer, fbt.nach, fbt.total),
                    })
                    .attr("fill", "none");
                shadowGroup
                    .path(path)
                    .stroke({
                        width: lineWidth.value,
                        color: props.shadowColor,
                        opacity: props.shadowOpacity,
                    })
                    .attr("fill", "none");
            }
        });

        knotenarmGroup.add(shadowGroup).add(fahrbeziehungsGroup);

        // ================================
        // Beschriftungen
        // ================================

        // Knotenarm Nummer
        let r = rotationNumber.get(knotenarmnummer);
        if (!r) {
            r = 0;
        }
        knotenarmGroup
            .text((add) => {
                add.tspan(knotenarmnummer + "");
            })
            .font({
                size: lineWidth.value,
                family: fontfamily,
                anchor: "middle",
            })
            .attr("alignment-baseline", "central")
            .cx(chartPosition.value + ecke.value - spalt.value * 1.5) // Radius des Kreises
            .cy(viewbox / 2) // Einrückungstiefe der Nummer
            .rotate(r);
        knotenarmGroup
            .circle(lineWidth.value + 4)
            .stroke({ width: 2, color: "black" })
            .fill("none")
            .cx(chartPosition.value + ecke.value - spalt.value * 1.5)
            .cy(viewbox / 2);

        // Labels
        // Spaltenbreite
        const colWidth = Math.ceil(
            (chartPosition.value - props.lineGap * 5 - 15) / 3
        );

        // Für die Beschriftung der Fahrbeziehungen wird eine eigene Gruppe erzeugt
        const fahrbeziehungenLabelRotationGroup = canvas.value.group();
        // Ein Rechteck, so groß wie der Viewport, um einen Drehpunkt um die Mitte zu haben
        fahrbeziehungenLabelRotationGroup
            .rect(viewbox, viewbox)
            .fill({ color: "white", opacity: opacity });

        // ========
        // Nach Labels
        // ========

        // Die Fahrbeziehungen 1, 2, 5, 6 werden rechts beschriftet und dann gedreht
        const ausgleich = knotenarm.ausgleich * line.value;
        let yNach =
            chartPosition.value +
            ecke.value +
            spalt.value +
            basis.value -
            (knotenarm.anzahlNachFahrbeziehungen * lineWidth.value) / 2 -
            props.lineGap -
            ausgleich;
        let yD1 =
            chartPosition.value +
            ecke.value +
            spalt.value +
            basis.value +
            line.value / 2 -
            ausgleich;
        let yD2 =
            chartPosition.value +
            ecke.value +
            spalt.value +
            basis.value -
            knotenarm.anzahlNachFahrbeziehungen * lineWidth.value +
            props.lineGap -
            ausgleich;
        let yVonSumme =
            chartPosition.value +
            ecke.value +
            spalt.value +
            knotenarm.anzahlVonFahrbeziehungen * line.value -
            props.lineGap * 2;
        let yVon = chartPosition.value + ecke.value + spalt.value;
        let yKnotenarm = chartPosition.value + seite.value / 2 - line.value / 2;
        let xText =
            chartPosition.value +
            seite.value -
            (ecke.value - spalt.value * 1.5) / 2 +
            5;
        let xc1 = chartPosition.value + seite.value + colWidth;
        let xc2 = chartPosition.value + seite.value + colWidth * 2;
        let xc3 = chartPosition.value + seite.value + colWidth * 3;
        let xD1 = xc1 - colWidth + props.lineGap;
        let xD2 = xD1 + 20;
        let links = false;

        // Die Fahrbeziehungen 3, 4, 7, 8 werden links beschriftet und dann gedreht
        if ([3, 4, 7, 8].includes(knotenarmnummer)) {
            yNach =
                chartPosition.value +
                ecke.value +
                spalt.value +
                (knotenarm.anzahlNachFahrbeziehungen * lineWidth.value) / 2 -
                lineWidth.value +
                props.lineGap +
                ausgleich;
            yD1 =
                chartPosition.value +
                ecke.value +
                spalt.value -
                lineWidth.value / 2 +
                ausgleich;
            yD2 =
                chartPosition.value +
                ecke.value +
                spalt.value +
                knotenarm.anzahlNachFahrbeziehungen * lineWidth.value +
                ausgleich;
            yVonSumme =
                chartPosition.value +
                ecke.value +
                spalt.value +
                basis.value +
                lineWidth.value / 2 +
                props.lineGap;
            yVon =
                chartPosition.value +
                ecke.value +
                spalt.value +
                basis.value -
                knotenarm.anzahlVonFahrbeziehungen * line.value +
                line.value;
            xc1 = colWidth;
            xc2 = colWidth * 2;
            xc3 = colWidth * 3;
            xD1 = xc3 + chartPosition.value - colWidth * 3 - props.lineGap;
            xD2 = xD1 - 20;
            xText =
                chartPosition.value + (ecke.value - spalt.value * 1.5) / 2 - 5;
            links = true;
        }

        // Knotenarmname
        createKnotenarmname(
            fahrbeziehungenLabelRotationGroup,
            knotenarm,
            xText,
            yKnotenarm
        );

        // Knotenarmsumme
        labelZeileErstellen(
            fahrbeziehungenLabelRotationGroup,
            yKnotenarm,
            fillValueArray(knotenarm, [
                knotenarm.totalValue1,
                knotenarm.totalValue2,
                knotenarm.totalValue3,
            ]),
            calculateLabelPosition(knotenarm, [xc1, xc2, xc3], links),
            "bold"
        );

        // ========
        // NACH Labels
        // ========
        if (knotenarm.anzahlNachFahrbeziehungen > 0) {
            // Dreieck
            const dreieck = `M${xD1} ${yD1} L${xD2} ${
                yNach + line.value / 2
            } L${xD1} ${yD2} z`;
            fahrbeziehungenLabelRotationGroup
                .path(dreieck)
                .stroke({ width: 2, color: "black" })
                .attr("fill", "none");

            // Die Werte für die "nach" Fahrbeziehungen des Knotenarmes werden ausgegeben
            labelZeileErstellen(
                fahrbeziehungenLabelRotationGroup,
                yNach,
                fillValueArray(knotenarm, [
                    knotenarm.nachTotalValue1,
                    knotenarm.nachTotalValue2,
                    knotenarm.nachTotalValue3,
                ]),
                calculateLabelPosition(knotenarm, [xc1, xc2, xc3], links),
                "bold"
            );
        }

        // ========
        // VON Labels
        // ========
        let vonLine = 0;
        if ([3, 4, 7, 8].includes(knotenarmnummer)) {
            vonLine = knotenarm.anzahlVonFahrbeziehungen - 1;
        }

        fbts.forEach((fbt) => {
            const y = yVon - lineWidth.value / 2 + line.value * vonLine;
            labelZeileErstellen(
                fahrbeziehungenLabelRotationGroup,
                y,
                fillValueArray(knotenarm, [fbt.value1, fbt.value2, fbt.value3]),
                calculateLabelPosition(knotenarm, [xc1, xc2, xc3], links)
            );

            if ([3, 4, 7, 8].includes(knotenarmnummer)) {
                vonLine--;
            } else {
                vonLine++;
            }
        });

        // "Von" Summen
        if (knotenarm.anzahlVonFahrbeziehungen > 0) {
            labelZeileErstellen(
                fahrbeziehungenLabelRotationGroup,
                yVonSumme,
                fillValueArray(knotenarm, [
                    knotenarm.vonTotalValue1,
                    knotenarm.vonTotalValue2,
                    knotenarm.vonTotalValue3,
                ]),
                calculateLabelPosition(knotenarm, [xc1, xc2, xc3], links),
                "bold"
            );
            // Summenlinie
            let faktorRechts = 2;
            // Die Länge der Summenlinie wird nach der Anzahl der angezeigten Werte ausgerichtet
            if (!links) {
                if (!knotenarm.is2Filled) faktorRechts--;
                if (!knotenarm.is3Filled) faktorRechts--;
            }
            let linieStartX = xc1 - colWidth + 10;
            if (links) {
                if (!knotenarm.is2Filled) linieStartX = xc1;
                if (!knotenarm.is3Filled) linieStartX = xc2;
            }
            fahrbeziehungenLabelRotationGroup
                .line(
                    linieStartX,
                    yVonSumme,
                    xc1 + colWidth * faktorRechts,
                    yVonSumme
                )
                .stroke({ width: 1, color: "black" });
        }

        // fahrbeziehungenLabelRotationGroup.add(fahrbeziehungenLabelGroup)
        fahrbeziehungenLabelRotationGroup.rotate(
            calcLabelRotation(knotenarmnummer)
        );
    }
    return knotenarmGroup;
}

function calculateLabelPosition(
    knotenarm: BelastungsplanKnotenarm,
    werte: number[],
    links: boolean
): number[] {
    if (links) {
        // es ist nur bei den links ausgerichteten Labels notwendig,
        // die nach innen zu schieben.
        const is1 = knotenarm.is1Filled;
        const is2 = knotenarm.is2Filled;
        const is3 = knotenarm.is3Filled;

        // alle Werte da? Dann werden sie so angeordnet, wie gedacht
        if (is1 && is2 && is3) {
            return werte;
        }

        // zwei Werte
        if (is1 && is2 && !is3) {
            return [werte[1], werte[2]];
        }

        // ein Wert
        if (is1 && !is2 && !is3) {
            return [werte[2]];
        }
    }

    return werte;
}

/**
 * Prüft ob die Zählwerte geliefert wurden und bestückt das Rückgabe Array entsprechend.
 *
 * @param knotenarm   Knotenarm
 * @param werte       Ein Array mit den Anzeigewerten.
 */
function fillValueArray(
    knotenarm: BelastungsplanKnotenarm,
    werte: number[]
): number[] {
    const result = [werte[0]];
    if (knotenarm.is2Filled) result[1] = werte[1];
    if (knotenarm.is3Filled) result[2] = werte[2];
    return result;
}

/**
 * Der Knotenarmname wird so angepasst, dass er in die Lücke zwischen Nummern
 * und Summe passt.
 *
 * @param group       Labelgruppe
 * @param knotenarm   Der zu bearbeitende Knotenarm.
 * @param x           X-Position
 * @param y           Y-Position
 */
function createKnotenarmname(
    group: SVG.G,
    knotenarm: BelastungsplanKnotenarm,
    x: number,
    y: number
) {
    // Der Knotenarmname wird umgebrochen, wenn er zu lang ist. Als
    // Merkmal werden hier vorerst nur die Bindestriche genommen.
    let strasse = "";
    if (knotenarm.strasse) {
        strasse = knotenarm.strasse;
    }
    let zweiteZeile = 0;
    let pieces = [strasse];
    let trenner = "";
    const zeichen = strasse.length;
    // Anzahl Zeichen
    if (zeichen > 17) {
        trenner = "-";
        if (strasse.endsWith("str.")) {
            const i = strasse.indexOf("str.");
            pieces[0] = strasse.substring(0, zeichen - 4);
            pieces[1] = strasse.substring(i, 4);
        }
        // Platz
        if (strasse.endsWith("pl.")) {
            const i = strasse.indexOf("pl.");
            pieces[0] = strasse.substring(0, zeichen - 3);
            pieces[1] = strasse.substring(i, 3);
        }
    }
    // Bindestrich
    if (strasse.includes("-")) {
        trenner = "-";
        pieces = strasse.split(trenner);
    }
    // Leerzeichen
    if (strasse.includes(" ")) {
        trenner = " ";
        pieces = strasse.split(trenner);
    }

    if (pieces.length > 1) {
        zweiteZeile = line.value / 2;
    }
    group
        .text((add) => {
            if (pieces.length > 1) {
                const firstAndSecondLineOfStreetnames: Array<string> =
                    getFirstAndSecondLineOfStreetname(trenner, pieces);
                add.tspan(firstAndSecondLineOfStreetnames[0])
                    .x(x)
                    .dy(line.value);
                add.tspan(firstAndSecondLineOfStreetnames[1])
                    .x(x)
                    .dy(line.value);
            } else {
                add.tspan(strasse).x(x);
            }
        })
        .font({
            size: lineWidth.value,
            family: fontfamily,
            anchor: "middle",
        })
        .y(y - zweiteZeile);
}

/**
 * Erzeugt einen Nordpfeil in der linken oberen Ecke.
 */
function legendeNordPfeil() {
    const nord = canvas.value.group();
    const startX = chartPosition.value / 3;
    const startY = chartPosition.value / 3;
    const path = `M${chartPosition.value / 3} ${startY}
                  L${startX + (2 * spalt.value) / 3} ${startY}
                  L${startX + spalt.value / 3} ${startY - spalt.value * 1.5}
                  z`;
    nord.path(path)
        .stroke({ width: 2, color: props.legendColor })
        .attr("fill", "none");

    nord.text((add) => {
        add.tspan("N")
            .x(startX + spalt.value / 3)
            .dy(startY - props.maxlineWidth / 2);
    }).font({
        family: fontfamily,
        size: props.maxlineWidth,
        anchor: "middle",
        fill: props.legendColor,
    });
}

/**
 * Zeigt die Informationen zur Zählstelle rechts oben in der Ecke an.
 */
function legendeZaehlstellenInfo() {
    const info = canvas.value.group();
    const startX = viewbox - ecke.value - spalt.value;
    const startY = chartPosition.value / 7;

    info.text((add) => {
        add.tspan(`Zählstelle ${zaehlstelle.value.nummer}`).font({
            weight: "bold",
        });
        add.tspan(
            `Stadtbezirk ${zaehlstelle.value.stadtbezirkNummer}`
        ).newLine();
        add.tspan(
            `Zähldatum: ${dateUtils.getShortVersionOfDate(
                new Date(zaehlung.value.datum)
            )}`
        ).newLine();
        if (isDifferenzdatendarstellung.value && vergleichsZaehlung.value) {
            const localdate = dateUtils.getShortVersionOfDate(
                new Date(vergleichsZaehlung.value.datum)
            );
            add.tspan(`Vergleichszählung: ${localdate}`).newLine();
        }
    })
        .font({
            family: fontfamily,
            size: props.maxlineWidth,
        })
        .x(startX)
        .y(startY);
}

/**
 * Erzeugt die Benennung der Datenspalten und die entsprechenden Formeln.
 */
function legendeSpalten() {
    const spalten = canvas.value.group();
    const startX = chartPosition.value / 5;
    const startY = viewbox - spalt.value * 4.5;
    const formeln = new Map<string, string>();
    if (isDifferenzdatendarstellung.value) {
        formeln.set("KFZ", "KFZ = KFZ (Basis) - KFZ (Vergleich)");
        formeln.set("SV", "SV = SV (Basis) - SV (Vergleich)");
        formeln.set("GV", "GV = GV (Basis) - GV (Vergleich)");
        formeln.set("SV%", "kein SV% beim Vergleich");
        formeln.set("GV%", "kein GV% beim Vergleich");
        formeln.set("RAD", "RAD = RAD (Basis) - RAD (Vergleich)");
        formeln.set(
            "RAD (KI-Hochrechnung)",
            "RAD-KI = RAD-KI (Basis) - RAD-KI (Vergleich)"
        );
        formeln.set("FUSS", "FUSS = KFZ (Basis) - FUSS (Vergleich)");
    } else {
        formeln.set("KFZ", "KFZ = Pkw + Lkw + Lz + Bus + Krad");
        formeln.set("SV", "SV = Lkw + Lz + Bus");
        formeln.set("GV", "GV = Lkw + Lz");
        formeln.set("SV%", "SV-Anteil = SV : KFZ x 100(%)");
        formeln.set("GV%", "GV-Anteil = GV : KFZ x 100(%)");
        formeln.set("RAD", "");
        formeln.set("RAD (KI-Hochrechnung)", "");
        formeln.set("FUSS", "");
    }

    // Zählzeit
    const zeitauswahl: string = optionen.value.zeitauswahl;
    const zaehlzeitFirstLine: string = zeitauswahl;
    let zaehlzeitSecondLine = "";
    if (zeitauswahl === Zeitauswahl.TAGESWERT) {
        zaehlzeitSecondLine = `${
            zaehlung.value.zaehldauer === Zaehldauer.DAUER_24_STUNDEN
                ? zeitblockInfo.get(Zeitblock.ZB_00_24)?.title
                : "hochgerechnet"
        }`;
    } else if (zeitauswahl === Zeitauswahl.BLOCK) {
        zaehlzeitSecondLine = `${
            zeitblockInfo.get(optionen.value.zeitblock)?.title
        }`;
    } else if (zeitauswahl === Zeitauswahl.STUNDE) {
        zaehlzeitSecondLine = `${
            zeitblockStuendlichInfo.get(optionen.value.zeitblock)?.title
        }`;
    } else if (
        zeitauswahl === Zeitauswahl.SPITZENSTUNDE_KFZ ||
        zeitauswahl === Zeitauswahl.SPITZENSTUNDE_RAD ||
        zeitauswahl === Zeitauswahl.SPITZENSTUNDE_FUSS
    ) {
        const startEndeUhrzeitIntervalls: StartEndeUhrzeitIntervalls =
            zaehlstelleStore.getStartEndeUhrzeitIntervalls;
        zaehlzeitSecondLine = `${startEndeUhrzeitIntervalls.startUhrzeitIntervalls} - ${startEndeUhrzeitIntervalls.endeUhrzeitIntervalls} Uhr`;
    }

    spalten
        .text((add) => {
            add.tspan(`${zaehlzeitFirstLine}`)
                .font({ weight: "bold" })
                .x(startX);
            add.tspan(`${zaehlzeitSecondLine}`).newLine().x(startX);
            add.tspan(``).newLine().x(startX);

            // Spaltenüberschriften
            add.tspan(`${props.data.value1.label}`)
                .font({ weight: "bold" })
                .newLine()
                .x(startX);
            // Datenblock 2 gefüllt?
            if (props.data.value2.filled) {
                add.tspan(`(${props.data.value2.label})`)
                    .font({ weight: "bold" })
                    .x(startX + 60);
            }
            // Datenblock 3 gefüllt?
            if (props.data.value3.filled) {
                add.tspan(`${props.data.value3.label}`)
                    .font({ weight: "bold" })
                    .x(startX + 120);
            }

            // Formeln
            add.tspan(`${formeln.get(props.data.value1.label)}`)
                .newLine()
                .x(startX);
            // Datenblock 2 gefüllt?
            if (props.data.value2.filled) {
                add.tspan(`${formeln.get(props.data.value2.label)}`)
                    .newLine()
                    .x(startX);
            }
            // Datenblock 3 gefüllt?
            if (props.data.value3.filled) {
                add.tspan(`${formeln.get(props.data.value3.label)}`)
                    .newLine()
                    .x(startX);
            }
        })
        .font({
            family: fontfamily,
            size: getLegendLineWidth.value,
        })
        .x(startX)
        .y(startY);
}

/**
 * Erzeugt die Legende für die Linienstärke.
 */
function legendeLinienStaerke() {
    const size = canvas.value.group();
    const startX = viewbox - spalt.value * 5;
    const startY = viewbox - spalt.value * 2.5;
    const path = `M${startX} ${startY}
                  L${startX + 3 * spalt.value} ${startY}
                  L${startX + 3 * spalt.value} ${startY - props.maxlineWidth}
                  z`;
    // Legende für die Farbgebung der Linien bei Differenzdatendarstellung
    // rot = Zunahme
    // grün = Abnahme
    if (isDifferenzdatendarstellung.value) {
        size.rect(lineWidth.value, lineWidth.value)
            .fill(props.zunahmeValueColor)
            .x(startX)
            .y(startY + 35);
        size.rect(lineWidth.value, lineWidth.value)
            .fill(props.abnahmeValueColor)
            .x(startX)
            .y(startY + 35 + 5 + lineWidth.value);

        size.text((add) => {
            add.tspan("Zunahme")
                .x(startX + 28)
                .dy(startY + 35 + lineWidth.value);
        }).font({
            family: fontfamily,
            size: props.maxlineWidth,
        });

        size.text((add) => {
            add.tspan("Abnahme")
                .x(startX + 28)
                .dy(startY + 35 + 5 + lineWidth.value * 2);
        }).font({
            family: fontfamily,
            size: props.maxlineWidth,
        });
    }

    size.path(path)
        .stroke({ width: 2, color: props.legendColor })
        .attr("fill", "none");

    const path2 = `M${startX + 1.5 * spalt.value} ${startY}
                   L${startX + 1.5 * spalt.value} ${
        startY - props.maxlineWidth / 2
    }`;
    size.path(path2)
        .stroke({ width: 2, color: props.legendColor })
        .attr("fill", "none");

    const high =
        highestFahrbeziehungsValue.value +
        (100 - (highestFahrbeziehungsValue.value % 1000));
    size.text((add) => {
        add.tspan(`${high}`)
            .x(startX + 3 * spalt.value)
            .dy(startY + props.maxlineWidth);
    }).font({
        family: fontfamily,
        size: props.maxlineWidth,
        anchor: "middle",
    });

    size.text((add) => {
        add.tspan(`${high / 2}`)
            .x(startX + 1.5 * spalt.value)
            .dy(startY + props.maxlineWidth);
    }).font({
        family: fontfamily,
        size: props.maxlineWidth,
        anchor: "middle",
    });
}

/**
 * Prüft, ob sich zwei Knotenarme gegenüber liegen.
 */
function isGegenueber(von: number, nach: number): boolean {
    return (
        (von === 1 && nach === 3) ||
        (von === 5 && nach === 7) ||
        (von === 2 && nach === 4) ||
        (von === 6 && nach === 8) ||
        (von === 3 && nach === 1) ||
        (von === 7 && nach === 5) ||
        (von === 4 && nach === 2) ||
        (von === 8 && nach === 6)
    );
}

/**
 * Erstellt eine Label Zeile zu einer Fahrbeziehung, bzw. einer Summe.
 *
 * @param group   Die Label Gruppe (g).
 * @param y       Der y Wert zum Ausrichten der Zeile.
 * @param vs      Die Werte der Knotenarme als Array (wichtig - richtige Reihenfolge!).
 * @param xs      Die x Werte der einzelnen Spalten als Array.
 * @param weight  Optional kann die Schriftstärke angegeben werden.
 */
function labelZeileErstellen(
    group: SVG.G,
    y: number,
    vs: number[],
    xs: number[],
    weight?: string
) {
    // default font weight ist "normal"
    if (!weight) {
        weight = "normal";
    }

    for (let i = 0; i < vs.length; i++) {
        let v = `${vs[i]}`;
        if (prozentWerte.value.get(i)) {
            // Beim Differenzdatenvergleich dürfen die % Werte nicht angezeigt werden.
            if (isDifferenzdatendarstellung.value) {
                v = "--";
            } else {
                // wenn es sich um einen Prozentwert handelt, dann eine Nachkommastelle und ein
                // Prozentzeichen
                v = `${vs[i].toFixed(1)}%`;
            }
        }
        group
            .text((add) => {
                if (i === 1) {
                    // die zweite Spalte wird durch Klammern gekennzeichnet
                    add.tspan(`(${v})`).x(xs[i]);
                } else {
                    add.tspan(`${v}`).x(xs[i]);
                }
            })
            .font({
                family: fontfamily,
                size: lineWidth.value,
                weight: weight,
                anchor: "end",
            })
            .x(0)
            .y(y);
    }
}

/**
 * Hier werden alle Daten gesammelt bzw. aufbereitet, die zur Anzeige des Diagramms notwendig sind. Diese
 * Methode wird aufgerufen, wenn über das Property "data" die Daten zur Darstellung des Belastungsplanes
 * erneuert werden.
 *
 * @param data  Die Anzeigedaten des Belastungsplanes.
 */
function calcFahrbeziehungen(data: LadeBelastungsplanDTO) {
    // alte Daten ggf. leeren
    knotenarme.value.clear();
    fahrbeziehungsTypen.value.clear();
    highestFahrbeziehungsValue.value = 0;
    lowestFahrbeziehungsValue.value = 0;
    // Die Datentypen der Werteblöcke werden extrahiert
    prozentWerte.value.set(0, data.value1.percent);
    prozentWerte.value.set(1, data.value2.percent);
    prozentWerte.value.set(2, data.value3.percent);
    // Aus der aktuellen Zählung (diese ist im $store) werden die Fahrbeziehungen geladen.
    const fbs = zaehlung.value.fahrbeziehungen as LadeFahrbeziehungDTO[];
    if (fbs && Array.isArray(fbs)) {
        // Für jede Fahrbeziehung werden die Daten aufbereitet
        fbs.forEach((fb) => {
            // Wenn es für den Knotenarm noch keinen Eintrag für die Fahrbeziehungstypen gibt,
            // dann muss dieser angelegt werden.
            if (!fahrbeziehungsTypen.value.has(fb.von)) {
                fahrbeziehungsTypen.value.set(
                    fb.von,
                    new Array<BelastungsplanFahrbeziehung>()
                );
            }

            // Für Knotenarme, die nur eingehende Fahrbeziehungen haben.
            if (!fahrbeziehungsTypen.value.has(fb.nach)) {
                fahrbeziehungsTypen.value.set(
                    fb.nach,
                    new Array<BelastungsplanFahrbeziehung>()
                );
            }

            // Wenn es für den Knotenarm noch keinen Eintrag in den Knotenarmen gibt,
            // dann muss dieser angelegt werden. Das muss sowohl für "von" als auch für
            // "nach" gemacht werden.

            // "von" checken und ggf. anlegen
            if (!knotenarme.value.has(fb.von)) {
                knotenarme.value.set(
                    fb.von,
                    new BelastungsplanKnotenarm(
                        data.streets[fb.von - 1],
                        fb.von
                    )
                );
            }
            let knotenarmVon = knotenarme.value.get(fb.von);
            anzeigeWerte(knotenarmVon, data);
            // "nach" checken und ggf. anlegen
            if (!knotenarme.value.has(fb.nach)) {
                knotenarme.value.set(
                    fb.nach,
                    new BelastungsplanKnotenarm(
                        data.streets[fb.nach - 1],
                        fb.nach
                    )
                );
            }
            let knotenarmNach = knotenarme.value.get(fb.nach);
            anzeigeWerte(knotenarmNach, data);

            // Fahrbeziehungstypen (Rechts-/Linksabbieger usw.) ermitteln
            let belastungsplanFahrbeziehungen = fahrbeziehungsTypen.value.get(
                fb.von
            ) as BelastungsplanFahrbeziehung[];
            let belastungsplanFahrbeziehung = new BelastungsplanFahrbeziehung(
                calcFahrbeziehungstype(fb.von, fb.nach),
                fb.nach
            ) as BelastungsplanFahrbeziehung;
            belastungsplanFahrbeziehungen.push(belastungsplanFahrbeziehung);

            const v = fb.von - 1;
            const n = fb.nach - 1;

            // Fahrwerte zu den einzelnen Fahrbeziehungen zuordnen
            belastungsplanFahrbeziehung.value1 = data.value1.values[v][n];
            if (data.value2.filled) {
                belastungsplanFahrbeziehung.value2 = data.value2.values[v][n];
            }
            if (data.value3.filled) {
                belastungsplanFahrbeziehung.value3 = data.value3.values[v][n];
            }

            if (knotenarmVon) {
                // von Zähler hoch setzen
                knotenarmVon.plusFahrbeziehungenVon();
                if (
                    positiveNumber(knotenarmVon.anzahlVonFahrbeziehungen) >
                    vonMaxValue.value
                )
                    vonMaxValue.value = positiveNumber(
                        knotenarmVon.anzahlVonFahrbeziehungen
                    );
                // den höchsten und niedrigsten Wert einer Fahrbeziehung ermitteln
                // (gilt hier nur der KFZ Verkehr?)
                if (
                    positiveNumber(data.value1.values[v][n]) >
                    highestFahrbeziehungsValue.value
                )
                    highestFahrbeziehungsValue.value = positiveNumber(
                        data.value1.values[v][n]
                    );
                if (
                    positiveNumber(data.value1.values[v][n]) <
                    lowestFahrbeziehungsValue.value
                )
                    lowestFahrbeziehungsValue.value = positiveNumber(
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
                    positiveNumber(knotenarmNach.anzahlNachFahrbeziehungen) >
                    nachMaxValue.value
                )
                    nachMaxValue.value = positiveNumber(
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
        knotenarme.value.forEach((k) => {
            let gegenueber = 0;
            if ([5, 2, 6, 1].includes(k.knotenarmNummer)) {
                gegenueber = k.knotenarmNummer + 2;
            }

            if ([8, 4, 7, 3].includes(k.knotenarmNummer)) {
                gegenueber = k.knotenarmNummer - 2;
            }
            if (knotenarme.value.has(gegenueber)) {
                fahrbeziehungenAusrichten(k, knotenarme.value.get(gegenueber)!);
            }

            // Es werden die Summen in die Knotenarem geschrieben
            const knummer = k.knotenarmNummer - 1;
            k.vonTotalValue1 = data.value1.sumIn[knummer];
            k.nachTotalValue1 = data.value1.sumOut[knummer];
            k.totalValue1 = data.value1.sum[knummer];
            // Soll Wert 2 dargestellt werden?
            if (
                data.value2.filled &&
                !(isDifferenzdatendarstellung.value && data.value2.percent)
            ) {
                k.vonTotalValue2 = data.value2.sumIn[knummer];
                k.nachTotalValue2 = data.value2.sumOut[knummer];
                k.totalValue2 = data.value2.sum[knummer];
            }
            // Soll Wert 3 dargestellt werden?
            if (
                data.value3.filled &&
                !(isDifferenzdatendarstellung.value && data.value3.percent)
            ) {
                k.vonTotalValue3 = data.value3.sumIn[knummer];
                k.nachTotalValue3 = data.value3.sumOut[knummer];
                k.totalValue3 = data.value3.sum[knummer];
            }
        });

        // maximale Linien Dicke berrechnen
        calcMaxLineWidth();

        // Belastungsplan ausgeben
        draw();
    }
}

/**
 * Füllt die Marker, welche Werte überhaupt angezeigt werden.
 *
 * @param knotenarm   Knotenarm
 * @param data        Belastungsplandaten
 */
function anzeigeWerte(
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
function positiveNumber(num: number): number {
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
function fahrbeziehungenAusrichten(
    von: BelastungsplanKnotenarm,
    nach: BelastungsplanKnotenarm
) {
    if (
        nach.nachFahrbeziehungsTypen.includes(Fahrtrichtungsarten.GERADE) &&
        isGegenueber(von.knotenarmNummer, nach.knotenarmNummer)
    ) {
        // Muss für beide Seiten ein Ausgleich erzeugt werden
        ausgleichBerechnen(von, nach);
        ausgleichBerechnen(nach, von);
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
function ausgleichBerechnen(
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
function calcRotation(knotenarmnummer: number): number {
    let r = rotation.get(knotenarmnummer);
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
function calcLabelRotation(knotenarmnummer: number): number {
    let r = rotationLabel.get(knotenarmnummer);
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
function calcMaxLineWidth() {
    const mw = props.maxlineWidth + props.lineGap;
    let mv: number;
    if (vonMaxValue.value > nachMaxValue.value) {
        mv = vonMaxValue.value;
    } else {
        mv = nachMaxValue.value;
    }
    if (mv * mw > maxFahrtrichtungWidth.value) {
        // die maximale Breite der Linien muss reduziert werden

        // Der Platz, der nach Abzug der Lücke je Linie bleibt, muss durch die Anzahl
        // der maximalen linien geteilt werden. Die Breite der Linie wird abgerundet,
        // damit wir einen glatten Wert für die Textgröße haben.
        lineWidth.value = Math.ceil(
            (maxFahrtrichtungWidth.value - mv * props.lineGap) / mv
        );
        fahrtrichtungWidth.value = maxFahrtrichtungWidth.value;
    } else {
        // die maximale Breite der Linien kann so bleiben
        fahrtrichtungWidth.value = mv * mw;
        lineWidth.value = props.maxlineWidth;
    }
}

/**
 * Die Linienstärke der jeweiligen Fahrbeziehung wird im Verhältnis zur
 * Fahrbeziehung mit der höchsten Anzahl an KFZ berrechnet.
 *
 * @param counts    Die Anzahl der Fahrbeziehungen.
 */
function calcLineWidth(counts: number): number {
    if (counts === 0) {
        return 1.0;
    }
    const lw = positiveNumber(counts) * lineFactor.value;
    // Linien, die dünner als 1.0 Pixel sind, machen
    // wenig Sinn.
    if (lw < 1.0) {
        return 1.0;
    }
    return lw;
}

/**
 * Typen der ausgehenden Fahrbeziehungen je Knotenarm werden ermittelt. Dies passiert, indem abgefragt wird, wie
 * welche knotenarme miteinander verbunden sind.
 *
 * @param von     "von" Knotenarmnummer
 * @param nach    "nach" Knotenarmnummer
 */
function calcFahrbeziehungstype(von: number, nach: number): number {
    // Uturn
    if (von === nach) {
        return Fahrtrichtungsarten.UTURN;
    }

    // gerade aus
    if (isGegenueber(von, nach)) {
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
function zielPunkt(
    achteck1: SVG.Point,
    achteck2: SVG.Point,
    achteck3: SVG.Point,
    achteck4: SVG.Point,
    startPunkt: SVG.Point,
    positionNach: number,
    distanz: number,
    doc: boolean
): string {
    const positionZielpunkt = spalt.value + positionNach * line.value;
    // Linie am Zielpunkt
    const aZielVon = documentationGroup.value.path(`M${achteck1.x} ${achteck1.y}
               L${achteck2.x} ${achteck2.y}`);
    // Zielpunkt
    const point1 = aZielVon.pointAt(positionZielpunkt) as SVG.Point;
    // Linie auf der gegenüberliegenden Seite des Ziels
    const aZielNach = documentationGroup.value
        .path(`M${achteck3.x} ${achteck3.y}
               L${achteck4.x} ${achteck4.y}`);
    // Punkt auf den die Zielpunktgerade trifft
    const point2 = aZielNach.pointAt(positionZielpunkt) as SVG.Point;
    // Zielgerade ziehen
    const pathZiel = documentationGroup.value.path(`M${point1.x} ${point1.y}
               L${point2.x} ${point2.y}`);

    // Schnittpunkt zwischen Start- und Ziellinie berechnen
    // Startlinie
    const startX1 = startPunkt.x;
    const startX2 = startPunkt.x + seite.value;
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
    const pathStart = documentationGroup.value.path(`M${startX1} ${startY1}
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
    if (props.docMode && doc) {
        pathStart.stroke({ width: 1, color: "black" }).attr("fill", "none");
        aZielVon.stroke({ width: 2, color: "black" }).attr("fill", "none");
        aZielNach.stroke({ width: 2, color: "black" }).attr("fill", "none");
        pathZiel.stroke({ width: 1, color: "black" }).attr("fill", "none");
        documentationGroup.value
            .circle(10)
            .fill({ color: "green" })
            .move(point1.x - 5, point1.y - 5);
        documentationGroup.value
            .circle(10)
            .fill({ color: "green" })
            .move(startX1 - 5, startY1 - 5);
        documentationGroup.value
            .circle(6)
            .fill({ color: "#f06" })
            .move(point2.x - 3, point2.y - 3);
        documentationGroup.value
            .circle(6)
            .fill({ color: "#f06" })
            .move(startX2 - 3, startY2 - 3);
        documentationGroup.value
            .circle(10)
            .fill({ color: "green" })
            .move(sx - 5, sy - 5);
        documentationGroup.value
            .circle(10)
            .fill({ color: "green" })
            .move(startKurvenPunkt.x - 5, startKurvenPunkt.y - 5);
        documentationGroup.value
            .circle(10)
            .fill({ color: "green" })
            .move(zielKurvenPunkt.x - 5, zielKurvenPunkt.y - 5);
    }
    return path;
}

/**
 * Berechnet die Seitenlänge einer der 8 Seiten des Achteecks A.
 */
function calcA(): number {
    return seite.value / (1 + Math.sqrt(2));
}

/**
 * Verteilt den Straßennamen anhand der getrenten Wörter auf die erste und zweite Zeile
 * zur Anzeige im Belastungsplan.
 *
 * @param trenner Trennzeichen der einzelnen Wörter (pieces)
 * @param pieces einzelne Wörter des Straßennames
 * @return [firsLine, SecondLine]
 */
function getFirstAndSecondLineOfStreetname(
    trenner: string,
    pieces: Array<string>
): Array<string> {
    let firstLine: string;
    let secondLine: string;

    // In der Mitte teilen
    // Math.floor wirft die Nachkommastellen weg -> 3/2 = 1
    const index: number = Math.floor(pieces.length / 2);
    const streetnames: Array<string> = getStreetnames(index, trenner, pieces);
    firstLine = streetnames[0];
    secondLine = streetnames[1];

    // Ungerade Anzahl -> schauen, wie es am Besten passt
    // FirstLine oder SecondLine mehr Wörter?
    if (pieces.length % 2 === 1) {
        // Variante 1: firstLine weniger Worte als secondLine
        // default -> wurde vor dem <<if (pieces.length % 2 === 1) {>> schon berechnet

        // Variante 2: firstLine mehr Worte als secondLine -> Index aufrunden
        // 3/2 = 1.5 -> 2
        const index: number = Number.parseInt((pieces.length / 2).toFixed(0));
        const streetnames: Array<string> = getStreetnames(
            index,
            trenner,
            pieces
        );
        const firstLineVariante2: string = streetnames[0];
        const secondLineVariante2: string = streetnames[1];

        // Wenn die erste Zeile der zweiten Variante kürzer ist, als die zweite Zeile der ersten Variante,
        // dann wird die zweite Variante verwendet.
        if (firstLineVariante2.length < secondLine.length) {
            firstLine = firstLineVariante2;
            secondLine = secondLineVariante2;
        }
    }
    return [firstLine, secondLine];
}

// Verteilt die Teile (pieces) der Straßennamen auf die first and second Line
// Der index gibt dabei vor, wieviele Teile wohin gehören
function getStreetnames(
    index: number,
    trenner: string,
    pieces: Array<string>
): Array<string> {
    let firstLine = "";
    let secondLine = "";
    for (let i = 0; i < index; i++) {
        firstLine = firstLine + pieces[i] + trenner;
    }

    for (let i = index; i < pieces.length; i++) {
        // Nur ein Trennzeichen hinzufügen, wenn Text vorhanden
        // am Anfang von Zeile 2 soll kein Trennzeichen stehen
        if (secondLine !== "") {
            secondLine = secondLine + trenner;
        }
        secondLine = secondLine + pieces[i];
    }
    return [firstLine, secondLine];
}

/**
 * Diese Methode zeichnet den Balastungsplan immer dann, wenn von einem anderen Tab auf
 * den Belastungsplan Tab gewechselt wird.
 */
watch(activeTab, (tab: number) => {
    if (tab === 0 && !props.data.kreisverkehr) {
        setTimeout(() => {
            calcFahrbeziehungen(props.data);
        }, 350);
    }
});
/**
 * Diese Methode zeichnet den Belastungsplan, wenn er in den Tabs angezeigt wird. Also Tab0
 * aktiv und damit auch sichtbar ist.
 */
watch(
    () => props.data,
    (data: LadeBelastungsplanDTO) => {
        if (activeTab.value === 0 && !data.kreisverkehr) {
            calcFahrbeziehungen(data);
        }
    }
);
</script>

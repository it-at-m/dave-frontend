<template>
    <div>
        <v-dialog
            v-model="openDialog"
            max-width="900px"
            @click:outside="closeDialog"
        >
            <v-card
                width="900px"
                flat
            >
                <v-card-title>
                    <v-icon left>mdi-file-chart</v-icon>
                    Auswahl zum PDF Report
                </v-card-title>

                <v-list
                    flat
                    subheader
                    three-line
                >
                    <v-subheader
                        >Wählen Sie die Inhalte, die dem PDF Report hinzugefügt
                        werden sollen.</v-subheader
                    >
                    <v-list-item>
                        <v-list-item-action>
                            <v-checkbox v-model="messstelleninfo"></v-checkbox>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title
                                >Messstelleninformationen</v-list-item-title
                            >
                            <v-list-item-subtitle
                                >Folgende Informationen werden im PDF Report
                                eingetragen: Messstelle-ID, ID & Standort der
                                Messquerschnitte, Stadtbezirk,
                                Messstellenkommentar.
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-action>
                            <v-checkbox v-model="messinfo"></v-checkbox>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title
                                >Messinformationen</v-list-item-title
                            >
                            <v-list-item-subtitle
                                >Folgende Informationen werden im PDF Report
                                eingetragen: Zeitraum von ... bis / Einzeltag,
                                Wochentag, Statistik zur Auswertung (Anzahl
                                plausible Wochentage)
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-action>
                            <v-checkbox v-model="legende"></v-checkbox>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title>Legende</v-list-item-title>
                            <v-list-item-subtitle
                                >Die Legende enthält Kurzbeschreibungen der
                                einzelnen Zählattribute, z.B. für den
                                Kraftfahrzeugverkehr, Schwerverkehr etc.
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <v-footer>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="secondary"
                        @click="saveItems"
                    >
                        Aktualisiere PDF Report
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="grey lighten-1"
                        @click="closeDialog"
                    >
                        Abbrechen
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-footer>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from "vue";
import MessstelleInfoDTO from "@/types/messstelle/MessstelleInfoDTO";
import { useStore } from "@/util/useStore";
import HeadingAsset from "@/types/pdfreport/assets/HeadingAsset";
import AssetTypesEnum from "@/types/pdfreport/assets/AssetTypesEnum";
import TextAsset from "@/types/pdfreport/assets/TextAsset";
import MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";
import BaseAsset from "@/types/pdfreport/assets/BaseAsset";
import { useDateUtils } from "@/util/DateUtils";
import { tagesTypText } from "@/types/enum/TagesTyp";
import { useSnackbarStore } from "@/store/modules/snackbar";
import { usePdfReportStore } from "@/store/modules/pdfReport";
import { useMessstelleStore } from "@/store/modules/messstelle";

interface Props {
    value: boolean;
}
const props = defineProps<Props>();

const openDialog = computed({
    get: () => props.value,
    set: (payload: boolean) => emits("input", payload),
});

const emits = defineEmits<{
    (e: "close"): void;
    (e: "input", v: boolean): void;
}>();

const store = useStore();
const messstelleStore = useMessstelleStore();
const pdfReportStore = usePdfReportStore();
const snackbarStore = useSnackbarStore();
const dateUtils = useDateUtils();

const messstelleninfo = ref(false);
const messinfo = ref(false);
const legende = ref(false);

const messstelle: Ref<MessstelleInfoDTO> = computed(() => {
    return messstelleStore.getMessstelleInfo;
});

const options: Ref<MessstelleOptionsDTO> = computed(() => {
    return messstelleStore.getFilteroptions;
});

function closeDialog(): void {
    resetCheckboxes();
    emits("close");
}

function resetCheckboxes(): void {
    messstelleninfo.value = false;
    messinfo.value = false;
    legende.value = false;
}

function saveItems(): void {
    if (messstelleninfo.value) {
        createMessstelleInfo();
    }

    if (messinfo.value) {
        createMessInfo();
    }

    if (legende.value) {
        createLegende();
    }

    snackbarStore.showSuccess(
        `Die ausgewählten Informationen wurden dem PDF Report hinzugefügt.`
    );
    closeDialog();
}

function createMessstelleInfo(): void {
    const assets: Array<BaseAsset> = [];
    const headline = new HeadingAsset(
        `Info für Messstelle Id ${messstelle.value.mstId}`,
        AssetTypesEnum.HEADING3
    );
    assets.push(headline);

    const messquerschnittIds = options.value.messquerschnittIds;
    const messquerschnittInfoDTOS = messstelle.value.messquerschnitte.filter(
        (value) => messquerschnittIds.includes(value.mqId)
    );
    if (messquerschnittInfoDTOS.length > 0) {
        let text = "Messquerschnitt(e):<br/>";
        messquerschnittInfoDTOS.forEach((value) => {
            text += `- ${value.mqId}`;
            if (value.standort) {
                text += ` - ${value.standort}`;
            }
            text += "<br/>\n";
        });
        assets.push(new TextAsset(text));
    }
    const stadtbezirk = new TextAsset(
        `Stadtbezirk: ${messstelle.value.stadtbezirk} (${messstelle.value.stadtbezirkNummer})`
    );
    assets.push(stadtbezirk);
    let kommentar = new TextAsset(
        `Messstellenkommentar: ${messstelle.value.kommentar ?? "---"}`
    );
    assets.push(kommentar);
    pdfReportStore.addAssets(assets);
}

function createMessInfo(): void {
    const assets: Array<BaseAsset> = [];

    const zeitraum = options.value.zeitraum;
    let header = `Info zur Messung vom ${dateUtils.formatDate(zeitraum[0])}`;
    if (zeitraum.length === 2) {
        header += ` bis ${dateUtils.formatDate(zeitraum[1])}`;
    }
    header += ` (Mst-Id ${messstelle.value.mstId})`;
    assets.push(new HeadingAsset(header, AssetTypesEnum.HEADING3));

    if (options.value.tagesTyp) {
        const wochentag = new TextAsset(
            `Wochentag (Tagestyp): ${tagesTypText.get(options.value.tagesTyp)}`
        );
        assets.push(wochentag);
    }
    const statistikAuswertung = new TextAsset(
        `Auswertungsstatistik: Exisitiert noch nicht.`
    );
    assets.push(statistikAuswertung);

    pdfReportStore.addAssets(assets);
}

function createLegende(): void {
    const ueberschrift = new HeadingAsset(
        "Legende zu den Kennzahlen",
        AssetTypesEnum.HEADING3
    );
    const legende = new TextAsset(
        "<p>- <b>Kraftfahrzeugverkehr (KFZ)</b>: Der Kraftfahrzeugverkehr ist die Summe der Personenkraftwagen, Krafträder, Busse, Lieferwagen, Lastkraftwagen und Lastzüge.</p>\n" +
            "<p>- <b>Schwerverkehr\t(SV)</b>: Der Schwerverkehr ist die Summe aller Fahrzeuge > 3,5t zul. Gesamtgewicht (Summe aus Bussen, Lastkraftwagen und Lastzüge).</p>\n" +
            "<p>- <b>Güterverkehr (GV)</b>: Der Güterverkehr ist die Summe aller Fahrzeuge > 3,5t zul. Gesamtgewicht ohne Busse (Summe aus Lastkraftwagen und Lastzüge).</p>\n" +
            "<p>- <b>Schwer- und Güterverkehrsanteil</b>: Anteil des Schwer- bzw. Güterverkehrs am Kraftfahrzeugverkehr in Prozent [%].</p>"
    );
    pdfReportStore.addAssets([ueberschrift, legende]);
}
</script>
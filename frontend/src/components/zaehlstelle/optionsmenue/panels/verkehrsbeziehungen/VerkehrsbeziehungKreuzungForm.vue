<template>
  <v-container>
    <v-row
      align="start"
      justify="center"
      dense
    >
      <v-col cols="4">
        <v-select
          v-model="von"
          :items="vonKnotenarme"
          label="Von Knotenarm"
          item-title="strassenname"
          item-value="nummer"
          variant="filled"
          density="comfortable"
          @mouseover="hoverSelectVon = true"
          @mouseleave="hoverSelectVon = false"
        />
        <v-select
          v-model="nach"
          :items="nachKnotenarme"
          label="Nach Knotenarm"
          item-title="strassenname"
          item-value="nummer"
          variant="filled"
          density="comfortable"
          @mouseover="hoverSelectNach = true"
          @mouseleave="hoverSelectNach = false"
        />
        <v-checkbox
          v-if="beideRichtungenAnzeigen"
          v-model="chosenOptionsCopy.beideRichtungen"
          class="mb-3"
          :label="'Zulaufend/Ablaufend'"
          hide-details
          color="quaternary"
          density="compact"
          :disabled="!beideRichtungenAnzeigen"
          @mouseover="hoverBeideRichtungen = true"
          @mouseleave="hoverBeideRichtungen = false"
        />
      </v-col>
      <v-spacer />
      <v-col cols="4">
        <v-card variant="flat">
          <div :style="{ color: `${hoverBeideRichtungen ? 'red' : 'black'}` }">
            {{ helpTextVerkehrsbeziehung }}
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type KnotenarmVerbindungen from "@/types/zaehlung/KnotenarmVerbindungen";
import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import type LadeVerkehrsbeziehungDTO from "@/types/zaehlung/LadeVerkehrsbeziehungDTO";
import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import type ZaehlstelleOptionsDTO from "@/types/zaehlung/ZaehlstelleOptionsDTO";

import { isNil, union } from "lodash";
import { computed, onMounted, ref, watch } from "vue";

import { useZaehlstelleStore } from "@/store/ZaehlstelleStore";
import LadeKnotenarmComperator from "@/types/zaehlung/LadeKnotenarmComperator";

const chosenOptionsCopy = defineModel<ZaehlstelleOptionsDTO>({
  required: true,
});

const zaehlstelleStore = useZaehlstelleStore();

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
const von = ref(0);
/**
 * Der gewählte nach-Knotenarm
 */
const nach = ref(0);

const alle = { nummer: 0, strassenname: "Alle Knotenarme" };

// const beideRichtungen = ref(false);
const hoverSelectVon = ref(false);
const hoverSelectNach = ref(false);
const hoverBeideRichtungen = ref(false);

const activeZaehlung = computed<LadeZaehlungDTO>(() => {
  return zaehlstelleStore.getAktiveZaehlung;
});

// Lädt die "von" Knotenarme für den aktuell gewählten "nach" Knotenarm
const vonKnotenarme = computed<Array<LadeKnotenarmDTO>>(() => {
  const k = moeglicheBeziehungenNach.value.get(nach.value);
  if (k) {
    return k.moeglicheVerbindungen.sort(LadeKnotenarmComperator.sortByNumber);
  } else {
    return [alle];
  }
});
// Lädt die "nach" Knotenarme für den aktuell gewählten "von" Knotenarm
const nachKnotenarme = computed<Array<LadeKnotenarmDTO>>(() => {
  const k = moeglicheBeziehungenVon.value.get(von.value);
  if (k) {
    return k.moeglicheVerbindungen.sort(LadeKnotenarmComperator.sortByNumber);
  } else {
    return [alle];
  }
});

const helpTextVerkehrsbeziehung = computed(() => {
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

watch(
  chosenOptionsCopy,
  () => {
    reset();
  },
  { deep: true }
);

// Setzt die Auswahlelemente auf der Oberfläche zurück, oder mit den
//  Werten im Optionsobjekt
function reset() {
  chosenOptionsCopy.value.vonKnotenarm === null
    ? (von.value = 0)
    : (von.value = chosenOptionsCopy.value.vonKnotenarm);
  chosenOptionsCopy.value.nachKnotenarm === null
    ? (nach.value = 0)
    : (nach.value = chosenOptionsCopy.value.nachKnotenarm);
}

/**
 * In dieser Methode werden die wählbaren von- und nach-Knotenarme ermittelt.
 *
 * Jeder wählbare von-Knotenarm wird mit den möglichen nach-Knotearmen befüllt.
 * Jeder wählbare nach-Knotenarm wird mit den möglichen von-Knotearmen befüllt.
 *
 * Als Basis zur Ermittlung der relevanten Knotenarme dient die Klasse "LadeVerkehrsbeziehungDTO"
 * welche als relevante Attribute "von" und "nach" für Kreuzungen sowie "knotenarmKreisverkehr"
 * und "hinein" vorhält.
 */
function initVerkehrsbeziehungen(): void {
  // Knotenarmbezeichnung je Knotenarm für spätere effiziente Extraktion der Knotenarmbezeichnung.
  const knotenarme: Map<number, string> = new Map<number, string>(
    activeZaehlung.value.knotenarme.map((knotenarm) => [
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
  const verkehrsbeziehungen = activeZaehlung.value.verkehrsbeziehungen;
  if (verkehrsbeziehungen && Array.isArray(verkehrsbeziehungen)) {
    verkehrsbeziehungen?.forEach((verkehrsbeziehung) => {
      if (isZaehlungForKreuzung()) {
        addVonKnotenarmWithPossibleNachKnotenarm(
          verkehrsbeziehung,
          alleZielknotenarmeVon,
          knotenarme
        );
        addNachKnotenarmWithPossibleVonKnotenarm(
          verkehrsbeziehung,
          alleEingehendeKnotenarmeNach,
          knotenarme
        );
      } else {
        // Kreisverkehr
        if (!isNil(verkehrsbeziehung.knotenarm)) {
          if (verkehrsbeziehung.hinein) {
            alleEingehendeKnotenarmeNach.add({
              nummer: verkehrsbeziehung.knotenarm,
              strassenname: getKnotenarmBezeichnung(
                verkehrsbeziehung.knotenarm,
                knotenarme
              ),
            });
          }
          if (verkehrsbeziehung.heraus) {
            alleZielknotenarmeVon.add({
              nummer: verkehrsbeziehung.knotenarm,
              strassenname: getKnotenarmBezeichnung(
                verkehrsbeziehung.knotenarm,
                knotenarme
              ),
            });
          }
        }
      }
    });

    // Nachfolgend werden die eingehenden bzw. ausgehenden Beziehungen bei Auswahl von "alle" gesetzt.
    if (isZaehlungForKreuzung()) {
      const kv: KnotenarmVerbindungen = {
        knotenarm: alle,
        moeglicheVerbindungen: union(
          [alle],
          Array.from(alleZielknotenarmeVon.values())
        ),
        moeglicheVerbindungenIds: union(
          [alle],
          Array.from(alleZielknotenarmeVon.values())
        ).map((knotenarm) => knotenarm.nummer),
      };
      moeglicheBeziehungenVon.value.set(alle.nummer, kv);
    } else {
      // Kreisverkehr
      const kv = {
        knotenarm: alle,
        moeglicheVerbindungen: [alle],
        moeglicheVerbindungenIds: union(
          [alle],
          Array.from(alleZielknotenarmeVon.values())
        ).map((knotenarm) => knotenarm.nummer),
      };
      moeglicheBeziehungenVon.value.set(alle.nummer, kv);
    }
    // Kreuzung und Kreisverkehr
    const kv: KnotenarmVerbindungen = {
      knotenarm: alle,
      moeglicheVerbindungen: union(
        [alle],
        Array.from(alleEingehendeKnotenarmeNach.values())
      ),
      moeglicheVerbindungenIds: union(
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
  verkehrsbeziehung: LadeVerkehrsbeziehungDTO,
  alleZielknotenarmeVon: Set<LadeKnotenarmDTO>,
  knotenarme: Map<number, string>
): void {
  if (moeglicheBeziehungenVon.value.has(verkehrsbeziehung.von)) {
    // Erweitern bereits vorhandener von-Knotenarm um zusätzlichen möglichen nach-Knotenarm
    const kv: KnotenarmVerbindungen | undefined =
      moeglicheBeziehungenVon.value.get(verkehrsbeziehung.von);
    kv?.moeglicheVerbindungen.push({
      nummer: verkehrsbeziehung.nach,
      strassenname: getKnotenarmBezeichnung(verkehrsbeziehung.nach, knotenarme),
    });
    kv?.moeglicheVerbindungenIds.push(verkehrsbeziehung.nach);
  } else {
    // Erstbefüllung noch nicht vorhandener von-Knotenarm
    const kv: KnotenarmVerbindungen = {
      knotenarm: {
        nummer: verkehrsbeziehung.von,
        strassenname: getKnotenarmBezeichnung(
          verkehrsbeziehung.von,
          knotenarme
        ),
      },
      moeglicheVerbindungen: [
        alle,
        {
          nummer: verkehrsbeziehung.nach,
          strassenname: getKnotenarmBezeichnung(
            verkehrsbeziehung.nach,
            knotenarme
          ),
        },
      ],
      moeglicheVerbindungenIds: [alle.nummer, verkehrsbeziehung.nach],
    };
    moeglicheBeziehungenVon.value.set(verkehrsbeziehung.von, kv);
  }

  let alreadyExists = false;
  alleZielknotenarmeVon.forEach((value) => {
    alreadyExists = alreadyExists || value.nummer === verkehrsbeziehung.nach;
  });

  if (!alreadyExists) {
    alleZielknotenarmeVon.add({
      nummer: verkehrsbeziehung.nach,
      strassenname: getKnotenarmBezeichnung(verkehrsbeziehung.nach, knotenarme),
    });
  }
}

/**
 * Diese Methode fügt an den wählbaren Knotenarm für das Dropdown nach-Knotenarm
 * die möglichen von-Knotenarme an.
 */
function addNachKnotenarmWithPossibleVonKnotenarm(
  verkehrsbeziehung: LadeVerkehrsbeziehungDTO,
  alleEingehendeKnotenarmeNach: Set<LadeKnotenarmDTO>,
  knotenarme: Map<number, string>
): void {
  if (moeglicheBeziehungenNach.value.has(verkehrsbeziehung.nach)) {
    // Erweitern bereits vorhandener nach-Knotenarm um zusätzlichen möglichen von-Knotenarm
    const kv: KnotenarmVerbindungen | undefined =
      moeglicheBeziehungenNach.value.get(verkehrsbeziehung.nach);
    kv?.moeglicheVerbindungen.push({
      nummer: verkehrsbeziehung.von,
      strassenname: getKnotenarmBezeichnung(verkehrsbeziehung.von, knotenarme),
    });
    kv?.moeglicheVerbindungenIds.push(verkehrsbeziehung.von);
  } else {
    // Erstbefüllung noch nicht vorhandener nach-Knotenarm
    const kv: KnotenarmVerbindungen = {
      knotenarm: {
        nummer: verkehrsbeziehung.nach,
        strassenname: getKnotenarmBezeichnung(
          verkehrsbeziehung.nach,
          knotenarme
        ),
      },
      moeglicheVerbindungen: [
        alle,
        {
          nummer: verkehrsbeziehung.von,
          strassenname: getKnotenarmBezeichnung(
            verkehrsbeziehung.von,
            knotenarme
          ),
        },
      ],
      moeglicheVerbindungenIds: [alle.nummer, verkehrsbeziehung.von],
    };
    moeglicheBeziehungenNach.value.set(verkehrsbeziehung.nach, kv);
  }

  let alreadyExists = false;
  alleEingehendeKnotenarmeNach.forEach((value) => {
    alreadyExists = alreadyExists || value.nummer === verkehrsbeziehung.von;
  });

  if (!alreadyExists) {
    alleEingehendeKnotenarmeNach.add({
      nummer: verkehrsbeziehung.von,
      strassenname: getKnotenarmBezeichnung(verkehrsbeziehung.von, knotenarme),
    });
  }
}

/**
 * true falls die aktuelle Zählung eine Kreuzung darstellt, andernfalls false.
 */
function isZaehlungForKreuzung(): boolean {
  return (
    activeZaehlung.value.kreisverkehr !== undefined &&
    !activeZaehlung.value.kreisverkehr
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
  return strassenname === undefined ? "Kein Knotenarm gefunden" : strassenname;
}

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
  if (vonCopy.length > 1) {
    chosenOptionsCopy.value.vonKnotenarm = null;
  } else {
    chosenOptionsCopy.value.vonKnotenarm = vonCopy[0];
  }
  chosenOptionsCopy.value.vonIds = vonCopy.filter((value) => value !== 0);
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
  if (nachCopy.length > 1) {
    chosenOptionsCopy.value.nachKnotenarm = null;
  } else {
    chosenOptionsCopy.value.nachKnotenarm = nachCopy[0];
  }
  chosenOptionsCopy.value.nachIds = nachCopy.filter((value) => value !== 0);
});

onMounted(() => {
  initVerkehrsbeziehungen();
  // Von und nach Werte auf die Werte aus dem Options Objekt aus dem Store setzen.
  //
  // Es ist wichtig, dass diese Funktion ausgeführt wird, nachdem die Verkehrsbeziehungen
  // aufbereitet wurden, da durch das Setzen von "von" und "nach" in den entspechenden
  // watch Methoden automatisch die richtigen "vonIds" und "nachIds" gesetzt werden. Damit
  // ist sichergestellt, dass bei einer 1 : n Beziehung alle "nach" Knotenarme in der
  // ZaehlungInfo angezeigt werden.
  reset();
});
</script>

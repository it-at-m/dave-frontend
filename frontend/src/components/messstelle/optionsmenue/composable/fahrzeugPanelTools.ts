import { computed } from "vue";
import Fahrzeug from "@/types/enum/Fahrzeug";
import { useMessstelleStore } from "@/store/messstelle";
import Fahrzeugklasse from "@/types/enum/Fahrzeugklasse";

export function useFahrzeugPanelTools() {
    const messstelleStore = useMessstelleStore();

    const isKfzMessstelle = computed(() => {
        return messstelleStore.isKfzMessstelle;
    });

    const activeFahrzeugklasse = computed(() => {
        return messstelleStore.getActiveMessfaehigkeit.fahrzeugklassen;
    });

    /**
     * Überprüft, ob eine Verkehrsart bei der Zählung erfasst wurde.
     * Wenn nicht, so wird die dazugehörige Checkbox deaktiviert.
     */
    function isTypeDisabled(type: string): boolean {
        if (Fahrzeug.FUSS.toUpperCase() === type.toUpperCase()) {
            return true;
        }
        if (isKfzMessstelle.value) {
            let result = true;
            switch (activeFahrzeugklasse.value) {
                case Fahrzeugklasse.ACHT_PLUS_EINS:
                    result = Fahrzeug.RAD.toUpperCase() === type.toUpperCase();
                    break;
                case Fahrzeugklasse.ZWEI_PLUS_EINS:
                    result = ![
                        Fahrzeug.KFZ.toUpperCase(),
                        Fahrzeug.SV.toUpperCase(),
                        Fahrzeug.SV_P.toUpperCase(),
                    ].includes(type.toUpperCase());
                    break;
                case Fahrzeugklasse.SUMME_KFZ:
                    result = Fahrzeug.KFZ.toUpperCase() !== type.toUpperCase();
                    break;
            }
            return result;
        } else {
            return Fahrzeug.RAD.toUpperCase() !== type.toUpperCase();
        }
    }

    function isTypeEnabled(type: string): boolean {
        return !isTypeDisabled(type);
    }

    return {
        isTypeDisabled,
        isTypeEnabled,
    };
}

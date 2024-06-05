import { computed } from "vue";
import Fahrzeug from "@/types/enum/Fahrzeug";
import { useMessstelleStore } from "@/store/messstelle";

export function useFahrzeugPanelTools() {
    const messstelleStore = useMessstelleStore();

    const actualMessstelle = computed(() => {
        return messstelleStore.getMessstelleInfo;
    });

    const isKfzMessstelle = computed(() => {
        return messstelleStore.isKfzMessstelle;
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
            if (actualMessstelle.value.fahrzeugKlassen === "8+1") {
                return Fahrzeug.RAD.toUpperCase() === type.toUpperCase();
            } else {
                return ![
                    Fahrzeug.KFZ.toUpperCase(),
                    Fahrzeug.SV.toUpperCase(),
                ].includes(type.toUpperCase());
            }
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

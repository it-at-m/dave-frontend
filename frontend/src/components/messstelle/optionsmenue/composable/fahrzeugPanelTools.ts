import { useStore } from "@/api/util/useStore";
import { computed } from "vue";
import Fahrzeug from "@/types/enum/Fahrzeug";

export function useFahrzeugPanelTools() {
    const store = useStore();

    const actualMessstelle = computed(() => {
        return store.getters["messstelleInfo/getMessstelleInfo"];
    });

    const isKfzMessstelle = computed(() => {
        return store.getters["messstelleInfo/isKfzMessstelle"];
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

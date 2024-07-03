import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";

export function useZaehlstelleUtils() {
    /**
     * Überprüft, ob eine Verkehrsart bei der Zählung erfasst wurde.
     * Wenn nicht, so wird die dazugehörige Checkbox deaktiviert.
     */
    function isTypeDisabled(type: string, zaehlung: LadeZaehlungDTO): boolean {
        if (zaehlung === undefined || zaehlung.kategorien === undefined) {
            return true;
        }
        return !zaehlung.kategorien.includes(type);
    }

    return {
        isTypeDisabled,
    };
}

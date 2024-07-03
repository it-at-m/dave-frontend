import type LadeZaehlungDTO from "@/types/zaehlung/LadeZaehlungDTO";
import Zaehlart from "@/types/enum/Zaehlart";

export default class LadeZaehlungComperator {
    /**
     * Sortiert eine Liste von Zählungen nach Datum.
     *
     * @param a
     * @param b
     */
    public static sortByDatum(a: LadeZaehlungDTO, b: LadeZaehlungDTO): number {
        if (a.datum < b.datum) {
            return 1;
        }
        if (a.datum > b.datum) {
            return -1;
        }
        // Gibt es zwei neuste Zählungen mit dem selben Datum und eine davon ist
        // eine "klassische" Zählung, dann wird die als erstes ausgewählt.
        if (a.datum === b.datum) {
            if (a.zaehlart !== Zaehlart.N) {
                return 1;
            }
            if (a.zaehlart === Zaehlart.N) {
                return -1;
            }
        }
        return 0;
    }
}

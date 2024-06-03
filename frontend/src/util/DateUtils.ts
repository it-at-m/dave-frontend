import i18n from "@/i18n";
import { useStore } from "@/api/util/useStore";
import { Levels } from "@/api/error";

export function useDateUtils() {
    const store = useStore();

    function formatDate(date: string): string {
        if (!date) {
            return "";
        }
        const [year, month, day] = date.split("-");
        return `${day}.${month}.${year}`;
    }

    function getTimeOfDate(date: Date): string {
        if (!date) {
            return "";
        }
        return `${i18n.d(date, "time", "de-DE")}`;
    }

    function getShortVersionOfDate(date: Date): string {
        if (!date) {
            return "";
        }
        return `${i18n.d(date, "short", "de-DE")}`;
    }

    function getLongVersionOfDate(date: Date): string {
        if (!date) {
            return "";
        }
        return `${i18n.d(date, "long", "de-DE")}`;
    }

    function sortDatesDescAsStrings(arrayToSort: string[]): string[] {
        return arrayToSort.sort(function (a, b) {
            return new Date(b).valueOf() - new Date(a).valueOf();
        });
    }

    /**
     * es muss für i18n ein Datumsobjekt erzeugt werden.
     */
    function getDatumOfString(datum: string): Date {
        const d = datum;
        if (Date.parse(d)) {
            return new Date(d);
        }
        store.dispatch("snackbar/showError", {
            snackbarTextPart1: `Der angegebene Wert ${datum} kann nicht in ein Datum umgewandelt werden.`,
            level: Levels.ERROR,
        });
        return new Date();
    }

    return {
        sortDatesDescAsStrings,
        formatDate,
        getTimeOfDate,
        getShortVersionOfDate,
        getLongVersionOfDate,
        getDatumOfString,
    };
}

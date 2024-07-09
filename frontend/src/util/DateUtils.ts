import { useI18n } from "vue-i18n-composable";
import { useSnackbarStore } from "@/store/snackbar";

export function useDateUtils() {
    const i18n = useI18n();

    const snackbarStore = useSnackbarStore();

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

    function sortDatesAscAsStrings(arrayToSort: string[]): string[] {
        return arrayToSort.sort(function (a, b) {
            return new Date(a).valueOf() - new Date(b).valueOf();
        });
    }

    function isDateBetweenAsStrings(
        dateToCheck: string,
        dateBefore: string,
        dateAfter: string
    ): boolean {
        return isDateBetween(
            getDatumOfString(dateToCheck),
            getDatumOfString(dateBefore),
            getDatumOfString(dateAfter)
        );
    }
    function isDateBetween(
        dateToCheck: Date,
        dateBefore: Date,
        dateAfter: Date
    ): boolean {
        return (
            dateToCheck.valueOf() >= dateBefore.valueOf() &&
            dateToCheck.valueOf() <= dateAfter.valueOf()
        );
    }

    /**
     * es muss für i18n ein Datumsobjekt erzeugt werden.
     */
    function getDatumOfString(datum: string): Date {
        const d = datum;
        if (Date.parse(d)) {
            return new Date(d);
        }
        snackbarStore.showError(
            `Der angegebene Wert ${datum} kann nicht in ein Datum umgewandelt werden.`
        );
        return new Date();
    }

    return {
        sortDatesDescAsStrings,
        formatDate,
        getTimeOfDate,
        getShortVersionOfDate,
        getLongVersionOfDate,
        getDatumOfString,
        isDateBetween,
        isDateBetweenAsStrings,
        sortDatesAscAsStrings,
    };
}

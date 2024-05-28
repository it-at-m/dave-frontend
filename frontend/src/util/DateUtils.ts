import i18n from "@/i18n";

export function useDateUtils() {
    function formatDate(date: string): string {
        if (!date) {
            return "";
        }
        const [year, month, day] = date.split("-");
        return `${day}.${month}.${year}`;
    }

    function formatDateYYYYMMDD(date: string): string {
        if (!date) {
            return "";
        }
        const [day, month, year] = date.split(".");
        return `${year}-${month}-${day}`;
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

    return {
        sortDatesDescAsStrings,
        formatDate,
        formatDateYYYYMMDD,
        getTimeOfDate,
        getShortVersionOfDate,
        getLongVersionOfDate,
    };
}

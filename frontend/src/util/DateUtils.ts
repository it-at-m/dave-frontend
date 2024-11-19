import i18n from "@/plugins/i18n";
import { useSnackbarStore } from "@/store/SnackbarStore";

export function useDateUtils() {
  const snackbarStore = useSnackbarStore();

  function formatDate(date: string): string {
    if (!date) {
      return "unbekannt";
    }
    if (date.includes("-")) {
      const [year, month, day] = date.split("-");
      return `${day}.${month}.${year}`;
    } else {
      return date;
    }
  }

  function formatDateAsStringToISO(date: string): string {
    if (!date) {
      return "unbekannt";
    }
    if (date.includes(".")) {
      const [day, month, year] = date.split(".");
      return `${year}-${month}-${day}`;
    } else {
      return date;
    }
  }
  function formatDateToISO(date: Date): string {
    if (!date) {
      return "";
    }
    return date.toISOString().slice(0, 10);
  }

  function getTimeOfDate(date: Date): string {
    if (!date) {
      return "";
    }
    return `${i18n.global.d(date, "time", "de-DE")}`;
  }

  function getShortVersionOfDate(date: Date): string {
    if (!date) {
      return "";
    }
    return `${i18n.global.d(date, "short", "de-DE")}`;
  }

  function getLongVersionOfDate(date: Date): string {
    if (!date) {
      return "";
    }
    return `${i18n.global.d(date, "long", "de-DE")}`;
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

  function isDateRangeAsStringValid(range: Array<string>) {
    return isDateRangeValid(
      getDatumOfString(range[0]),
      getDatumOfString(range[1])
    );
  }

  function isDateRangeValid(dateValueVon: Date, dateValueBis: Date) {
    return dateValueBis.valueOf() >= dateValueVon.valueOf();
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
    formatDateToISO,
    getTimeOfDate,
    getShortVersionOfDate,
    getLongVersionOfDate,
    getDatumOfString,
    isDateBetween,
    isDateBetweenAsStrings,
    sortDatesAscAsStrings,
    formatDateAsStringToISO,
    isDateRangeAsStringValid,
    isDateRangeValid,
  };
}

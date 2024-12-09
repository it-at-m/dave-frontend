import { head, isEmpty, isEqual, last, toArray } from "lodash";
import moment from "moment";

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
    if (!isEmpty(datum)) {
      snackbarStore.showError(
        `Der angegebene Wert ${datum} kann nicht in ein Datum umgewandelt werden.`
      );
    }
    return new Date();
  }

  /**
   * Prüft ob es sich um unterschiedliche kalendarische Datumswerte handelt.
   */
  function isDateRange(dates: string[] | undefined) {
    const startDate = head(toArray(dates));
    const isValidStartDate = isValidIsoDate(startDate);
    const endDate = last(toArray(dates));
    const isValidEndDate = isValidIsoDate(endDate);
    return isValidStartDate && isValidEndDate && !isEqual(startDate, endDate);
  }

  /**
   * Prüft ab es sich um ein gültiges Datum im Format "DD.MM.YYYY" handelt.
   */
  function isValidDate(date: string | undefined): boolean {
    return moment(date, "DD.MM.YYYY", true).isValid();
  }

  /**
   * Prüft ab es sich um ein gültiges Datum im ISO-Format "YYYY-MM-DD" handelt.
   */
  function isValidIsoDate(date: string | undefined): boolean {
    return moment(date, "YYYY-MM-DD", true).isValid();
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
    isDateRange,
    isValidDate,
    isValidIsoDate,
  };
}

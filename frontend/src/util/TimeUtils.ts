import { useDateUtils } from "@/util/DateUtils";

export function useTimeUtils() {
  const dateUtils = useDateUtils();

  /**
   *  Funktion die ausgibt, ob der Zeitraum größer 5 Jahre ist.
   *  Schaltjahre werden nicht berücksichtigt, es wird lediglich verglichen,
   *  ob innerhalb des Zeitraums mehr oder weniger als 5 * 365 Tage sind.
   * @param zeitraum 2 Datums, welche nicht sortiert sein müssen
   */
  function isDateRangeBiggerFiveYears(zeitraum: string[]) {
    if (zeitraum.length == 2) {
      const sortedDates = dateUtils.sortDatesDescAsStrings(zeitraum);
      const timeDifferenceInMilliseconds =
        new Date(sortedDates[0]).valueOf() - new Date(sortedDates[1]).valueOf();
      const timeDifferenceInYears =
        timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24 * 365);
      return timeDifferenceInYears > 5;
    }
    return false;
  }

  return { isDateRangeBiggerFiveYears };
}

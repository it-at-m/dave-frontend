import _ from "lodash";

export function useValidationRules() {
  function onlyPositivNumbersBiggerThan(
    toCheck: string,
    minValue: number
  ): boolean | string {
    if (toCheck === null || toCheck === undefined) return true;
    if (!toCheck.trim()) return true;
    const parsed = parseFloat(toCheck);
    if (!isNaN(parsed) && parsed >= minValue) return true;
    return "Das Feld darf nur positive Zahlen enthalten";
  }

  function onlyNumbersInRange(
      toCheck: string,
      minvalue: number,
      maxValueExcluded: number
  ): boolean | string {
    if (toCheck === null || toCheck === undefined) return true;
    if (!toCheck.trim()) return true;
    const parsed = parseFloat(toCheck);
    if (!isNaN(parsed) && _.inRange(parsed, minvalue, maxValueExcluded)) return true;
    return `Das Feld darf nur positive Zahlen kleiner gleich ${maxValueExcluded - 1} enthalten`;
  }

  return {
    onlyPositivNumbersBiggerThan,
    onlyNumbersInRange,
  };
}

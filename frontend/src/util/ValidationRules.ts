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
    maxValue: number
  ): boolean | string {
    if (toCheck === null || toCheck === undefined) return true;
    if (!toCheck.trim()) return true;
    const parsed = parseFloat(toCheck);
    if (!isNaN(parsed) && _.inRange(parsed, minvalue, maxValue)) return true;
    return `Das Feld darf nur positive Zahlen kleiner gleich ${maxValue} enthalten`;
  }

  return {
    onlyPositivNumbersBiggerThan,
    onlyNumbersInRange,
  };
}

import type KeyVal from "@/types/common/KeyVal";

enum HolidayOptions {
  WITH_SCHOOLHOLIDAYS = "WITH_SCHOOLHOLIDAYS",
  ONLY_SCHOOLHOLIDAYS = "ONLY_SCHOOLHOLIDAYS",
  NO_SCHOOLHOLIDAYS = "NO_SCHOOLHOLIDAYS"
}

export const holidayOptionsText = new Map<string, string>([
  [HolidayOptions.WITH_SCHOOLHOLIDAYS, "Mit Schulferien"],
  [HolidayOptions.ONLY_SCHOOLHOLIDAYS, "Nur Schulferien"],
  [HolidayOptions.NO_SCHOOLHOLIDAYS, "Ohne Schulferien"],
]);

export const holidayOptionsInfo = new Map<string, KeyVal>([
  [HolidayOptions.WITH_SCHOOLHOLIDAYS, { value: HolidayOptions.WITH_SCHOOLHOLIDAYS, title: "Mit Schulferien" }],
  [HolidayOptions.ONLY_SCHOOLHOLIDAYS, { value: HolidayOptions.ONLY_SCHOOLHOLIDAYS, title: "Nur Schulferien" }],
  [HolidayOptions.NO_SCHOOLHOLIDAYS, { value: HolidayOptions.NO_SCHOOLHOLIDAYS, title: "Ohne Schulferien" }],
]);

export default HolidayOptions;

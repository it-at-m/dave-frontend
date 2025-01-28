import AbstractHistoryItem from "@/types/history/AbstractHistoryItem";

export default class HistoryItemComperator {
  public static sortByTimeDesc(
    a: AbstractHistoryItem,
    b: AbstractHistoryItem
  ): number {
    if (a.viewtime < b.viewtime) {
      return 1;
    }
    if (a.viewtime > b.viewtime) {
      return -1;
    }
    return 0;
  }

  public static sortByTimeAsc(
    a: AbstractHistoryItem,
    b: AbstractHistoryItem
  ): number {
    if (a.viewtime < b.viewtime) {
      return -1;
    }
    if (a.viewtime > b.viewtime) {
      return 1;
    }
    return 0;
  }
}

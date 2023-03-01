import HistoryItem from "@/types/app/HistoryItem";

export default class HistoryItemComperator {

  public static sortByTime(a: HistoryItem, b: HistoryItem): number {
    if (a.viewtime < b.viewtime) {
      return -1
    }
    if (a.viewtime > b.viewtime) {
      return 1
    }
    return 0
  }
}
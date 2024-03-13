import HistoryItem from "@/types/app/HistoryItem";
import AbstractHistoryItem from "@/types/app/AbstractHistoryItem";

export default class HistoryItemComperator {
    public static sortByTime(a: HistoryItem, b: HistoryItem): number {
        if (a.viewtime < b.viewtime) {
            return -1;
        }
        if (a.viewtime > b.viewtime) {
            return 1;
        }
        return 0;
    }

    public static sortByTimeAbstract(
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

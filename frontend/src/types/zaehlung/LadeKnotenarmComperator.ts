import LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";

export default class LadeKnotenarmComperator {

  /**
   * Sortiert eine Liste von Knotenarmen nach der Nummer
   *
   * @param a
   * @param b
   */
  public static sortByNumber(a: LadeKnotenarmDTO, b: LadeKnotenarmDTO): number {
    if (a.nummer < b.nummer) {
      return -1
    }
    if (a.nummer > b.nummer) {
      return 1
    }
    return 0
  }
}
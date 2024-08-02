import BelastungsplanFahrbeziehung from "@/types/zaehlung/BelastungsplanFahrbeziehung";

export default class BelastungsplanFahrbeziehungComperator {
  public static sortByFahrtrichtungsart(
    a: BelastungsplanFahrbeziehung,
    b: BelastungsplanFahrbeziehung
  ): number {
    if (a.fahrbeziehungsTyp < b.fahrbeziehungsTyp) {
      return -1;
    }
    if (a.fahrbeziehungsTyp > b.fahrbeziehungsTyp) {
      return 1;
    }
    return 0;
  }
}

import BelastungsplanVerkehrsbeziehung from "@/types/zaehlung/BelastungsplanVerkehrsbeziehung";

export default class BelastungsplanVerkehrsbeziehungComperator {
  public static sortByFahrtrichtungsart(
    a: BelastungsplanVerkehrsbeziehung,
    b: BelastungsplanVerkehrsbeziehung
  ): number {
    if (a.verkehrsbeziehungsTyp < b.verkehrsbeziehungsTyp) {
      return -1;
    }
    if (a.verkehrsbeziehungsTyp > b.verkehrsbeziehungsTyp) {
      return 1;
    }
    return 0;
  }
}

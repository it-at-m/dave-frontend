import type BaseEntity from "@/types/common/BaseEntity";
import type Himmelsrichtung from "@/types/enum/Himmelsrichtung";

export default interface QuerungsverkehrDTO extends BaseEntity {
  knotenarm: number;

  richtung: Himmelsrichtung;
}

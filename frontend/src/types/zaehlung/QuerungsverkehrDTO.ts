import type { Himmelsrichtung } from "@/api/client";
import type BaseEntity from "@/types/common/BaseEntity";

export default interface QuerungsverkehrDTO extends BaseEntity {
  knotenarm: number;

  richtung: Himmelsrichtung;
}

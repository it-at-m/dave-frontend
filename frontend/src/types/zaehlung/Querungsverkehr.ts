import type { Himmelsrichtung } from "@/api/client";
import type BaseEntity from "@/types/common/BaseEntity";

export default interface Querungsverkehr extends BaseEntity {
  knotenarm: number;

  richtung: Himmelsrichtung;
}

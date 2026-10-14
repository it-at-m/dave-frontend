import type { Bewegungsrichtung, Himmelsrichtung } from "@/api/client";
import type BaseEntity from "@/types/common/BaseEntity";

export default interface LaengsverkehrDTO extends BaseEntity {
  knotenarm: number;

  richtung: Bewegungsrichtung;

  strassenseite: Himmelsrichtung;
}

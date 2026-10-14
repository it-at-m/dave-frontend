import type { Bewegungsrichtung } from "@/api/client";
import type BaseEntity from "@/types/common/BaseEntity";
import type Himmelsrichtung from "@/types/enum/Himmelsrichtung";

export default interface LaengsverkehrDTO extends BaseEntity {
  knotenarm: number;

  richtung: Bewegungsrichtung;

  strassenseite: Himmelsrichtung;
}

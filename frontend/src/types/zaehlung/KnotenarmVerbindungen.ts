import type { BearbeiteKnotenarmDTO } from "@/api/client";

export default interface KnotenarmVerbindungen {
  knotenarm: BearbeiteKnotenarmDTO;
  moeglicheVerbindungen: Array<BearbeiteKnotenarmDTO>;
  moeglicheVerbindungenIds: Array<number>;
}

import LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";

export default interface KnotenarmVerbindungen {

  knotenarm: LadeKnotenarmDTO
  moeglicheVerbindungen: Array<LadeKnotenarmDTO>
  moeglicheVerbindungenIds: Array<number>

}

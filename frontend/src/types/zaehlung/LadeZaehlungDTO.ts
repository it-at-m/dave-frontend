import type BaseEntity from "@/types/common/BaseEntity";
import type VerkehrsbeziehungenDTO from "@/types/zaehlung/VerkehrsbeziehungenDTO";
import type LadeVerkehrsbeziehungDTO from "@/types/zaehlung/LadeVerkehrsbeziehungDTO";
import type LadeKnotenarmDTO from "@/types/zaehlung/LadeKnotenarmDTO";
import type ZeitauswahlDTO from "@/types/zaehlung/ZeitauswahlDTO";

import Quelle from "@/types/enum/Quelle";
import Wetter from "@/types/enum/Wetter";
import Zaehldauer from "@/types/enum/Zaehldauer";

export default interface LadeZaehlungDTO extends BaseEntity {
  // Zeit
  datum: string;
  jahr: string;
  monat: string;
  jahreszeit: string;

  zaehlart: string;
  lat: string;
  lng: string;
  tagesTyp: string;
  projektNummer: string;
  projektName: string;
  kreuzungsname: string;
  sonderzaehlung: boolean;
  kreisverkehr: boolean;
  zaehlsituation: string;
  zaehlsituationErweitert: string;
  zaehlIntervall: string;
  wetter: Wetter;
  zaehldauer: Zaehldauer;
  quelle: Quelle;
  schulZeiten: string;
  kommentar: string;
  knotenarme: LadeKnotenarmDTO[];
  verkehrsbeziehungen: LadeVerkehrsbeziehungDTO[];
  auswaehlbareVerkehrsbeziehungen: VerkehrsbeziehungenDTO;
  zeitauswahl: ZeitauswahlDTO;
  kategorien: string[];
  pkwEinheit: string[];
}

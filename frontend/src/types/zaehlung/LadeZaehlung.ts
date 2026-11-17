import type { BearbeiteKnotenarmDTO, ZeitauswahlDTO } from "@/api/client";
import type BaseEntity from "@/types/common/BaseEntity";
import type LadeVerkehrsbeziehung from "@/types/zaehlung/LadeVerkehrsbeziehung";
import type Laengsverkehr from "@/types/zaehlung/Laengsverkehr";
import type Querungsverkehr from "@/types/zaehlung/Querungsverkehr";
import type Verkehrsbeziehungen from "@/types/zaehlung/Verkehrsbeziehungen";

import { Zaehldauer } from "@/api/client";
import Quelle from "@/types/enum/Quelle";
import Wetter from "@/types/enum/Wetter";

export default interface LadeZaehlung extends BaseEntity {
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
  kommentar: string;
  schulZeiten: string;
  pkwEinheit: string[];
  kategorien: string[];
  knotenarme: BearbeiteKnotenarmDTO[];
  laengsverkehr: Laengsverkehr[];
  querungsverkehr: Querungsverkehr[];
  verkehrsbeziehungen: LadeVerkehrsbeziehung[];
  auswaehlbareVerkehrsbeziehungen: Verkehrsbeziehungen;
  zeitauswahl: ZeitauswahlDTO;
}

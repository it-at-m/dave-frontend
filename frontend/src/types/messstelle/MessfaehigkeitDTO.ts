import Fahrzeugklasse from "@/types/enum/Fahrzeugklasse";
import ZaehldatenIntervall from "@/types/enum/ZaehldatenIntervall";

export default interface MessfaehigkeitDTO {
  gueltigAb: string;
  gueltigBis: string;
  intervall: ZaehldatenIntervall;
  fahrzeugklassen: Fahrzeugklasse;
}

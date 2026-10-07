import type { Fahrzeugklasse, ZaehldatenIntervall } from "@/api/client";

export default interface MessfaehigkeitDTO {
  gueltigAb: string;
  gueltigBis: string;
  intervall: ZaehldatenIntervall;
  fahrzeugklasse: Fahrzeugklasse;
}

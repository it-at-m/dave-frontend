import type { Fahrzeugklasse, ZaehldatenIntervall } from "@/api/client";

export default interface Messfaehigkeit {
  gueltigAb: string;
  gueltigBis: string;
  intervall: ZaehldatenIntervall;
  fahrzeugklasse: Fahrzeugklasse;
}

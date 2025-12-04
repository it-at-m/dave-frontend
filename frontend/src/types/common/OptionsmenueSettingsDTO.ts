import Fahrzeugklasse from "../enum/Fahrzeugklasse";
import ZaehldatenIntervall from "../enum/ZaehldatenIntervall";

export default interface OptionsmenueSettingsDTO {
  fahrzeugklasse: Fahrzeugklasse | undefined;

  intervall: ZaehldatenIntervall | undefined;

  kraftfahrzeugverkehrChoosableIntervals:
    | Array<ZaehldatenIntervall>
    | undefined;

  schwerverkehrChoosableIntervals: Array<ZaehldatenIntervall> | undefined;

  gueterverkehrChoosableIntervals: Array<ZaehldatenIntervall> | undefined;

  schwerverkehrsanteilProzentChoosableIntervals:
    | Array<ZaehldatenIntervall>
    | undefined;

  gueterverkehrsanteilProzentChoosableIntervals:
    | Array<ZaehldatenIntervall>
    | undefined;

  radverkehrChoosableIntervals: Array<ZaehldatenIntervall> | undefined;

  fussverkehrChoosableIntervals: Array<ZaehldatenIntervall> | undefined;

  lastkraftwagenChoosableIntervals: Array<ZaehldatenIntervall> | undefined;

  lastzuegeChoosableIntervals: Array<ZaehldatenIntervall> | undefined;

  busseChoosableIntervals: Array<ZaehldatenIntervall> | undefined;

  kraftraederChoosableIntervals: Array<ZaehldatenIntervall> | undefined;

  personenkraftwagenChoosableIntervals: Array<ZaehldatenIntervall> | undefined;

  lieferwagenChoosableIntervals: Array<ZaehldatenIntervall> | undefined;
}

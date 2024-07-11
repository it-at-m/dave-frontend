import LadeZaehldatumDTO from "@/types/zaehlung/zaehldaten/LadeZaehldatumDTO";

export default class DataManipulatorUtil {
    private static readonly TIME_VALUE_FOUND_END_OF_DAY: string = "23:59";

    private static readonly TIME_VALUE_FOUND_START_OF_DAY: string = "00:00";

    private static readonly TIME_VALUE_TARGET_END_OF_DAY: string = "24:00";

    public static manipulateEndeUhrzeit(zaehldatum: LadeZaehldatumDTO): string {
        let manipualtedEndeUrhzeit: string;
        if (
            zaehldatum.endeUhrzeit ===
                DataManipulatorUtil.TIME_VALUE_FOUND_END_OF_DAY ||
            (zaehldatum.endeUhrzeit < zaehldatum.startUhrzeit &&
                zaehldatum.endeUhrzeit ===
                    DataManipulatorUtil.TIME_VALUE_FOUND_START_OF_DAY)
        ) {
            manipualtedEndeUrhzeit =
                DataManipulatorUtil.TIME_VALUE_TARGET_END_OF_DAY;
        } else {
            manipualtedEndeUrhzeit = zaehldatum.endeUhrzeit;
        }
        return manipualtedEndeUrhzeit;
    }
}

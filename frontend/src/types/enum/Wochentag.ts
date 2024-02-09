enum Wochentag {
    WERKTAG_DI_MI_DO = "WERKTAG_DI_MI_DO",
    WERKTAG_MO_FR = "WERKTAG_MO_FR",
    SAMSTAG = "SAMSTAG",
    SONNTAG_FEIERTAG = "SONNTAG_FEIERTAG",
    WERKTAG_FERIEN = "WERKTAG_FERIEN",
    DTV = "DTV",
}

export const wochentagText = new Map<string, string>([
    [Wochentag.WERKTAG_DI_MI_DO, "DTVw3 (Di,Mi,Do - außerhalb Ferien)"],
    [Wochentag.WERKTAG_MO_FR, "DTVw5 (Mo-Fr - außerhalb Ferien)"],
    [Wochentag.SAMSTAG, "Samstag in/außerhalb Ferien"],
    [Wochentag.SONNTAG_FEIERTAG, "Sonntag/Feiertag in/außerhalb Ferien"],
    [Wochentag.WERKTAG_FERIEN, "Mo-Fr Ferien"],
    [Wochentag.DTV, "DTV (MO - SO)"],
]);

export default Wochentag;

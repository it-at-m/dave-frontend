enum TagesTyp {
    WERKTAG_DI_MI_DO = "WERKTAG_DI_MI_DO",
    WERKTAG_MO_FR = "WERKTAG_MO_FR",
    SAMSTAG = "SAMSTAG",
    SONNTAG_FEIERTAG = "SONNTAG_FEIERTAG",
    WERKTAG_FERIEN = "WERKTAG_FERIEN",
    DTV = "DTV",
}

export const tagesTypText = new Map<string, string>([
    [TagesTyp.WERKTAG_DI_MI_DO, "DTVw3 (Di,Mi,Do - außerhalb Ferien)"],
    [TagesTyp.WERKTAG_MO_FR, "DTVw5 (Mo-Fr - außerhalb Ferien)"],
    [TagesTyp.SAMSTAG, "Samstag in/außerhalb Ferien"],
    [TagesTyp.SONNTAG_FEIERTAG, "Sonntag/Feiertag in/außerhalb Ferien"],
    [TagesTyp.WERKTAG_FERIEN, "Mo-Fr Ferien"],
    [TagesTyp.DTV, "DTV (MO - SO)"],
]);

export default TagesTyp;

import type KeyVal from "@/types/common/KeyVal";

enum TagesTyp {
  WERKTAG_DI_MI_DO = "WERKTAG_DI_MI_DO",
  WERKTAG_MO_FR = "WERKTAG_MO_FR",
  SAMSTAG = "SAMSTAG",
  SONNTAG_FEIERTAG = "SONNTAG_FEIERTAG",
  WERKTAG_FERIEN = "WERKTAG_FERIEN",
  MO_SO = "MO_SO",
  UNSPECIFIED = "UNSPECIFIED",
}

export const tagesTypText = new Map<string, string>([
  [TagesTyp.WERKTAG_DI_MI_DO, "DTVw3 (Di,Mi,Do - außerhalb Ferien)"],
  [TagesTyp.WERKTAG_MO_FR, "DTVw5 (Mo-Fr - außerhalb Ferien)"],
  [TagesTyp.SAMSTAG, "Samstag in/außerhalb Ferien"],
  [TagesTyp.SONNTAG_FEIERTAG, "Sonntag/Feiertag in/außerhalb Ferien"],
  [TagesTyp.WERKTAG_FERIEN, "Mo-Fr Ferien"],
  [TagesTyp.MO_SO, "DTV (Mo - So)"],
  [TagesTyp.UNSPECIFIED, "unspecified"],
]);

export const tagesTypInfo = new Map<string, KeyVal>([
  [TagesTyp.WERKTAG_MO_FR, { value: TagesTyp.WERKTAG_MO_FR, title: "DTVw5 (Mo-Fr)" }],
  [TagesTyp.WERKTAG_DI_MI_DO, { value: TagesTyp.WERKTAG_DI_MI_DO, title: "DTVw3 (Di,Mi,Do)" }],
  [TagesTyp.MO_SO, { value: TagesTyp.MO_SO, title: "DTV (Mo - So)" }],
  [TagesTyp.SAMSTAG, { value: TagesTyp.SAMSTAG, title: "Samstag" }],
  [TagesTyp.SONNTAG_FEIERTAG, { value: TagesTyp.SONNTAG_FEIERTAG, title: "Sonntag" }]
]);

export default TagesTyp;

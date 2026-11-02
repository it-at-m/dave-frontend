import { TagesTyp } from "@/api/client";

export const tagesTypText = new Map<TagesTyp, string>([
  [TagesTyp.WerktagDiMiDo, "DTVw3 (Di,Mi,Do - außerhalb Ferien)"],
  [TagesTyp.WerktagMoFr, "DTVw5 (Mo-Fr - außerhalb Ferien)"],
  [TagesTyp.Samstag, "Samstag in/außerhalb Ferien"],
  [TagesTyp.SonntagFeiertag, "Sonntag/Feiertag in/außerhalb Ferien"],
  [TagesTyp.WerktagFerien, "Mo-Fr Ferien"],
  [TagesTyp.MoSo, "DTV (Mo - So)"],
  [TagesTyp.Unspecified, "unspecified"],
]);

export default tagesTypText;

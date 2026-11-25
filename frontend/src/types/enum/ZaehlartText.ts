import type KeyVal from "@/types/common/KeyVal";

import { Zaehlart } from "@/api/client/models/Zaehlart";

export const zaehlartText = new Map<string, string>([
  [Zaehlart.N, "Standardzählung"],
  [Zaehlart.H, "Hauptverkehrsrichtung/Oberfläche/Hoch"],
  [Zaehlart.Q, "Querschnitt"],
  [Zaehlart.Q2, "Querschnitt/Sonderzählung"],
  [Zaehlart.Qb, "Bahnschnitt"],
  [Zaehlart.Qh, "Querschnitt/Hauptverkehrsrichtung/ Oberfläche/Hoch"],
  [Zaehlart.Qi, "Isarschnitt"],
  [Zaehlart.Qs, "Stadtgrenzenzählung"],
  [Zaehlart.Qt, "Querschnitt Tunnel/Unterführung/Tief"],
  [Zaehlart.Qr, "Querschnitt Radverkehr"],
  [Zaehlart.R, "Radverkehrszählung"],
  [Zaehlart.Qjs, "Querschnitt je Straßenseite"],
  [Zaehlart.Fjs, "Fußverkehr/Radverkehr je Straßenseite"],
  [Zaehlart.Qu, "Querung"],
  [Zaehlart.T, "Tunnel / Unterführung / Tief"],
  [Zaehlart.Tk, "Teilknoten"],
]);

export const zaehlartenDropDown = new Array<KeyVal>(
  { value: Zaehlart.N, title: zaehlartText.get(Zaehlart.N)! },
  { value: Zaehlart.H, title: zaehlartText.get(Zaehlart.H)! },
  { value: Zaehlart.Q, title: zaehlartText.get(Zaehlart.Q)! },
  { value: Zaehlart.Q2, title: zaehlartText.get(Zaehlart.Q2)! },
  { value: Zaehlart.Qb, title: zaehlartText.get(Zaehlart.Qb)! },
  { value: Zaehlart.Qh, title: zaehlartText.get(Zaehlart.Qh)! },
  { value: Zaehlart.Qi, title: zaehlartText.get(Zaehlart.Qi)! },
  { value: Zaehlart.Qs, title: zaehlartText.get(Zaehlart.Qs)! },
  { value: Zaehlart.Qt, title: zaehlartText.get(Zaehlart.Qt)! },
  { value: Zaehlart.Qr, title: zaehlartText.get(Zaehlart.Qr)! },
  { value: Zaehlart.R, title: zaehlartText.get(Zaehlart.R)! },
  { value: Zaehlart.Qjs, title: zaehlartText.get(Zaehlart.Qjs)! },
  { value: Zaehlart.Fjs, title: zaehlartText.get(Zaehlart.Fjs)! },
  { value: Zaehlart.Qu, title: zaehlartText.get(Zaehlart.Qu)! },
  { value: Zaehlart.T, title: zaehlartText.get(Zaehlart.T)! },
  { value: Zaehlart.Tk, title: zaehlartText.get(Zaehlart.Tk)! }
);

import type KeyVal from "@/types/common/KeyVal";

enum Zaehlart {
  // Standardzählung
  N = "N",
  // Hauptverkehrsrichtung/Oberfläche/Hoch
  H = "H",
  //Querschnitt
  Q = "Q",
  //Querschnitt/Sonderzählung
  Q_ = "Q_",
  // Bahnschnitt
  QB = "QB",
  // Querschnitt/Hauptverkehrsrichtung/ Oberfläche/Hoch
  QH = "QH",
  //  Isarschnitt
  QI = "QI",
  // Stadtgrenzenzählung
  QS = "QS",
  // Querschnitt Tunnel/Unterführung/Tief
  QT = "QT",
  // Querschnitt Radverkehr,
  QR = "QR",
  // Radverkehrszählung
  R = "R",
  // Querschnitt je Straßenseite
  QJS = "QJS",
  // Fuß & Rad je Straßenseite
  FJS = "FJS",
  // Querung
  QU = "QU",
  // Tunnel / Unterführung / Tief
  T = "T",
  // Teilknoten
  TK = "TK",
}

export default Zaehlart;

export const zaehlartText = new Map<string, string>([
  [Zaehlart.N, "Standardzählung"],
  [Zaehlart.H, "Hauptverkehrsrichtung/Oberfläche/Hoch"],
  [Zaehlart.Q, "Querschnitt"],
  [Zaehlart.Q_, "Querschnitt/Sonderzählung"],
  [Zaehlart.QB, "Bahnschnitt"],
  [Zaehlart.QH, "Querschnitt/Hauptverkehrsrichtung/ Oberfläche/Hoch"],
  [Zaehlart.QI, "Isarschnitt"],
  [Zaehlart.QS, "Stadtgrenzenzählung"],
  [Zaehlart.QT, "Querschnitt Tunnel/Unterführung/Tief"],
  [Zaehlart.QR, "Querschnitt Radverkehr"],
  [Zaehlart.R, "Radverkehrszählung"],
  [Zaehlart.QJS, "Querschnitt je Straßenseite"],
  [Zaehlart.FJS, "Fußverkehr/Radverkehr je Straßenseite"],
  [Zaehlart.QU, "Querung"],
  [Zaehlart.T, "Tunnel / Unterführung / Tief"],
  [Zaehlart.TK, "Teilknoten"],
]);

export const zaehlartenDropDown = new Array<KeyVal>(
  { value: Zaehlart.N, title: zaehlartText.get(Zaehlart.N)! },
  { value: Zaehlart.H, title: zaehlartText.get(Zaehlart.H)! },
  { value: Zaehlart.Q, title: zaehlartText.get(Zaehlart.Q)! },
  { value: Zaehlart.Q_, title: zaehlartText.get(Zaehlart.Q_)! },
  { value: Zaehlart.QB, title: zaehlartText.get(Zaehlart.QB)! },
  { value: Zaehlart.QH, title: zaehlartText.get(Zaehlart.QH)! },
  { value: Zaehlart.QI, title: zaehlartText.get(Zaehlart.QI)! },
  { value: Zaehlart.QS, title: zaehlartText.get(Zaehlart.QS)! },
  { value: Zaehlart.QT, title: zaehlartText.get(Zaehlart.QT)! },
  { value: Zaehlart.QR, title: zaehlartText.get(Zaehlart.QR)! },
  { value: Zaehlart.R, title: zaehlartText.get(Zaehlart.R)! },
  { value: Zaehlart.QJS, title: zaehlartText.get(Zaehlart.QJS)! },
  { value: Zaehlart.FJS, title: zaehlartText.get(Zaehlart.FJS)! },
  { value: Zaehlart.QU, title: zaehlartText.get(Zaehlart.QU)! },
  { value: Zaehlart.T, title: zaehlartText.get(Zaehlart.T)! },
  { value: Zaehlart.TK, title: zaehlartText.get(Zaehlart.TK)! }
);

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
  [Zaehlart.T, "Tunnel / Unterführung / Tief"],
  [Zaehlart.TK, "Teilknoten"],
]);

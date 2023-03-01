export enum Quelle {
  // manuelle Erhebung
  MANUALLY = 'MANUALLY',
  // Detektorzählung
  DETECTOR = 'DETECTOR',
  // Seitenradar
  RADAR = 'RADAR',
  // Videoerhebung
  VIDEO = 'VIDEO',
}

export default Quelle;

export const quelleText = new Map<string, string>([
    [Quelle.MANUALLY, "manuelle Erhebung"],
    [Quelle.DETECTOR, "Detektorzählung"],
    [Quelle.RADAR, "Seitenradar"],
    [Quelle.VIDEO, "Videoerhebung"]
])
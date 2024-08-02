export const enum MessstelleStatus {
  IN_PLANUNG = "IN_PLANUNG",

  IN_BESTAND = "IN_BESTAND",

  AUSSER_BETRIEB = "AUSSER_BETRIEB",

  ABGEBAUT = "ABGEBAUT",

  UNBEKANNT = "UNBEKANNT",
}

export const messstelleStatusText = new Map<string, string>([
  [MessstelleStatus.IN_PLANUNG, "In Planung"],
  [MessstelleStatus.IN_BESTAND, "In Bestand"],
  [MessstelleStatus.AUSSER_BETRIEB, "Außer Betrieb"],
  [MessstelleStatus.ABGEBAUT, "Abgebaut"],
  [MessstelleStatus.UNBEKANNT, "unbekannt"],
]);

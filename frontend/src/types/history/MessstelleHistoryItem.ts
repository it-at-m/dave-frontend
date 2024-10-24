import type MessstelleOptionsDTO from "@/types/messstelle/MessstelleOptionsDTO";

import AbstractHistoryItem from "@/types/history/AbstractHistoryItem";

export default class MessstelleHistoryItem extends AbstractHistoryItem {
  id: string;
  mstId: string;
  standortMs: string;
  optionsEinstellungen?: MessstelleOptionsDTO;

  constructor(
    id: string,
    mstId: string,
    standortMs: string,
    options?: MessstelleOptionsDTO
  ) {
    super(id, "mdi-cards-diamond");
    this.id = id;
    this.mstId = mstId;
    this.standortMs = standortMs;
    if (options) {
      this.optionsEinstellungen = options;
    }
  }
}

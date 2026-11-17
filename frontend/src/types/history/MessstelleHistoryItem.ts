import type MessstelleOptions from "@/types/messstelle/MessstelleOptions";

import AbstractHistoryItem from "@/types/history/AbstractHistoryItem";

export default class MessstelleHistoryItem extends AbstractHistoryItem {
  id: string;
  mstId: string;
  standortMs: string;
  optionsEinstellungen?: MessstelleOptions;

  constructor(
    id: string,
    mstId: string,
    standortMs: string,
    options?: MessstelleOptions
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

export default class AbstractHistoryItem {
  identifier: string;
  icon: string;
  viewtime: Date;

  constructor(identifier: string, icon: string) {
    this.identifier = identifier;
    this.icon = icon;
    this.viewtime = new Date();
  }
}

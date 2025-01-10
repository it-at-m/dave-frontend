export default class StartAndEndDate {
  constructor(startDate: Date | undefined, endDate: Date | undefined) {
    this.startDate = startDate;
    this.endDate = endDate;
  }

  public startDate: Date | undefined;

  public endDate: Date | undefined;

  public isRange(): boolean {
    if (!(this.endDate && this.startDate))
      return false;
    return this.endDate.getTime() - this.startDate.getTime() > 0;
  }
}

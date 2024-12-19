export default class StartAndEndDate {
  constructor(startDate: Date | undefined, endDate: Date | undefined) {
    this.startDate = startDate;
    this.endDate = endDate;
  }

  public startDate: Date | undefined;

  public endDate: Date | undefined;
}

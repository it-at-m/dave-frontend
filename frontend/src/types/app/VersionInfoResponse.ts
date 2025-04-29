export default class VersionInfoResponse {
  public application: Application;

  constructor(application: Application) {
    this.application = application;
  }
}

export interface Application {
  name: string;
  version: string;
}

export default class SsoUserInfoResponse {

  public name: string;

  public email: string;

  public department: string;

  public authorities: Array<string>;

  constructor(name: string, email: string, department: string, authorities: Array<string>) {
    this.name = name;
    this.email = email;
    this.authorities = authorities;
    this.department = department;
  }

}

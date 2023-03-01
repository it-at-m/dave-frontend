import {ApiError, Levels} from '@/api/error';
import BaseUrlProvider from "@/api/util/BaseUrlProvider";
import SsoUserInfoResponse from "@/types/SsoUserInfoResponse";
import FetchUtils from "@/api/util/FetchUtils";

export default class SsoUserInfoService {

  private static readonly BASE: string = BaseUrlProvider.getBaseUrl();

  private static readonly ENDPOINT: string = "api/sso/userinfo";

  private static readonly NO_AUTHORITY: string = "no_authority";

  static getUserInfo(): Promise<SsoUserInfoResponse> {
    return fetch(`${this.BASE}/${this.ENDPOINT}`, FetchUtils.getGETConfig())
        .then(response => {
          if (!response.ok) {
            return new SsoUserInfoResponse(
                SsoUserInfoService.NO_AUTHORITY,
                SsoUserInfoService.NO_AUTHORITY,
                SsoUserInfoService.NO_AUTHORITY,
                []
            );
          }
          return response.json();
        }).catch(error => {
          throw new ApiError(Levels.ERROR, "Verbindung zum API-Gateway oder SSO-Dienst konnte nicht aufgebaut werden.", error);
        });
  }

}

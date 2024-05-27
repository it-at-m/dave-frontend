import BaseUrlProvider from "@/api/util/BaseUrlProvider";
import VersionInfoResponse from "@/types/app/VersionInfoResponse";
import { ApiError, Levels } from "@/api/error";
import FetchUtils from "@/api/util/FetchUtils";

export default class VersionInfoService {
    private static readonly BASE: string = BaseUrlProvider.getBaseUrl();

    private static readonly ENDPOINT_FRONTEND: string = "actuator/info";
    private static readonly ENDPOINT_BACKEND: string =
        "api/dave-backend-service/actuator/info";

    static getFrontendInfo(): Promise<VersionInfoResponse> {
        return VersionInfoService.getInfo(this.ENDPOINT_FRONTEND, "Frontend");
    }

    static getBackendInfo(): Promise<VersionInfoResponse> {
        return VersionInfoService.getInfo(this.ENDPOINT_BACKEND, "Backend");
    }

    private static getInfo(
        endpoint: string,
        type: string
    ): Promise<VersionInfoResponse> {
        return fetch(`${this.BASE}/${endpoint}`, FetchUtils.getGETConfig())
            .then((response) => {
                if (!response.ok) {
                    return new VersionInfoResponse({
                        name: type,
                        version: "unknown",
                    });
                }
                return response.json();
            })
            .catch((error) => {
                throw new ApiError(
                    Levels.ERROR,
                    `Verbindung zum ${type} konnte nicht aufgebaut werden.`,
                    error
                );
            });
    }
}

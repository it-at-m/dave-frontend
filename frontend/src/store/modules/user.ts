import SsoUserInfoResponse from "@/types/SsoUserInfoResponse";

const roleAnwender = "ROLE_ANWENDER";

const rolePoweruser = "ROLE_POWERUSER";

/**
 * Der UserStore wird benötigt, um die vom KeyCloak erhaltenen Nutzerdaten (Name, eMail und Authorities)
 * über alle Views hinweg verteilen zu können. Dies betrifft vor allem die Authorities, da einzelnen Elemente
 * der Oberfläche nur für bestimmte Rollen sichtbar sein sollen.
 */
export default {
    namespaced: true,
    state: {
        ssoUserInfoResponse: {} as SsoUserInfoResponse,
    },
    getters: {
        getName(state: any): string {
            return state.ssoUserInfoResponse.name;
        },
        getDepartment(state: any): string {
            return state.ssoUserInfoResponse.department;
        },
        isAnwender(state: any): boolean {
            return (
                state.ssoUserInfoResponse.authorities.includes(roleAnwender) &&
                !state.ssoUserInfoResponse.authorities.includes(rolePoweruser)
            );
        },
        isPoweruser(state: any): boolean {
            return state.ssoUserInfoResponse.authorities.includes(
                rolePoweruser
            );
        },
        hasAuthorities(state: any): boolean {
            return (
                state.ssoUserInfoResponse.authorities != undefined &&
                (state.ssoUserInfoResponse.authorities.includes(
                    rolePoweruser
                ) ||
                    state.ssoUserInfoResponse.authorities.includes(
                        roleAnwender
                    ))
            );
        },
    },
    mutations: {
        setSsoUserInfoResponse(state: any, payload: SsoUserInfoResponse) {
            state.ssoUserInfoResponse = payload;
        },
    },
    actions: {
        setSsoUserInfoResponse(context: any, payload: SsoUserInfoResponse) {
            context.commit("setSsoUserInfoResponse", payload);
        },
    },
};

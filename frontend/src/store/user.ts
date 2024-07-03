import SsoUserInfoResponse from "@/types/app/SsoUserInfoResponse";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

const roleAnwender = "ROLE_ANWENDER";
const rolePoweruser = "ROLE_POWERUSER";

/**
 * Der UserStore wird benötigt, um die vom KeyCloak erhaltenen Nutzerdaten (Name, eMail und Authorities)
 * über alle Views hinweg verteilen zu können. Dies betrifft vor allem die Authorities, da einzelnen Elemente
 * der Oberfläche nur für bestimmte Rollen sichtbar sein sollen.
 */
export const useUserStore = defineStore("userStore", () => {
    // ref()s become state properties
    const ssoUserInfoResponse = ref<SsoUserInfoResponse>(
        {} as SsoUserInfoResponse
    );
    // computed()s become getters
    const getName = computed(() => ssoUserInfoResponse.value.name);
    const getDepartment = computed(() => ssoUserInfoResponse.value.department);
    const isAnwender = computed(() => {
        return (
            ssoUserInfoResponse.value.authorities.includes(roleAnwender) &&
            !ssoUserInfoResponse.value.authorities.includes(rolePoweruser)
        );
    });
    const hasAuthorities = computed(() => {
        return (
            ssoUserInfoResponse.value.authorities &&
            ssoUserInfoResponse.value.authorities.length > 0
        );
    });
    // function()s become actions
    function setSsoUserInfoResponse(payload: SsoUserInfoResponse) {
        ssoUserInfoResponse.value = payload;
    }

    return {
        getName,
        getDepartment,
        isAnwender,
        hasAuthorities,
        setSsoUserInfoResponse,
    };
});

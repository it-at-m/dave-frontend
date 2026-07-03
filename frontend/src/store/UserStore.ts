import { toArray } from "lodash";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import SsoUserInfoResponse from "@/types/app/SsoUserInfoResponse";

const roleAnwender = "ROLE_ANWENDER";
const rolePoweruser = "ROLE_POWERUSER";
const roleFachadmin = "ROLE_FACHADMIN";

/**
 * Der UserStore wird benötigt, um die vom KeyCloak erhaltenen Nutzerdaten (Name, eMail und Authorities)
 * über alle Views hinweg verteilen zu können. Dies betrifft vor allem die Authorities, da einzelnen Elemente
 * der Oberfläche nur für bestimmte Rollen sichtbar sein sollen.
 */
export const useUserStore = defineStore("userStore", () => {
  const ssoUserInfoResponse = ref<SsoUserInfoResponse>(
    {} as SsoUserInfoResponse
  );

  const getName = computed(() => ssoUserInfoResponse.value.name);
  const getDepartment = computed(() => ssoUserInfoResponse.value.department);
  const isAnwender = computed(() => {
    return (
      ssoUserInfoResponse.value.authorities.includes(roleAnwender) &&
      !ssoUserInfoResponse.value.authorities.includes(rolePoweruser)
    );
  });
  const isSolelyAnwender = computed(() => {
    const authorities = toArray(ssoUserInfoResponse.value.authorities);
    return (
      authorities.includes(roleAnwender) &&
      !authorities.includes(rolePoweruser) &&
      !authorities.includes(roleFachadmin)
    );
  });
  const hasAuthorities = computed(() => {
    return (
      ssoUserInfoResponse.value.authorities &&
      ssoUserInfoResponse.value.authorities.length > 0
    );
  });

  function setSsoUserInfoResponse(payload: SsoUserInfoResponse) {
    ssoUserInfoResponse.value = payload;
  }

  return {
    getName,
    getDepartment,
    isAnwender,
    isSolelyAnwender,
    hasAuthorities,
    setSsoUserInfoResponse,
  };
});

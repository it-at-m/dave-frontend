<template>
    <div style="width: 150px">
        <v-select
            v-model="selectedUser"
            label="user"
            :items="['NoUser', 'Anwender', 'Poweruser']"
            height="20px"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import SsoUserInfoResponse from "@/types/app/SsoUserInfoResponse";
import { useUserStore } from "@/store/user";
const selectedUser = ref("NoUser");
const userStore = useUserStore();

watch(selectedUser, () => {
    switch (selectedUser.value) {
        case "NoUser":
            userStore.setSsoUserInfoResponse(getNoUser.value);
            break;
        case "Anwender":
            userStore.setSsoUserInfoResponse(getAnwender.value);
            break;
        case "Poweruser":
            userStore.setSsoUserInfoResponse(getPoweruser.value);
            break;
    }
});

const getAnwender = computed(() => {
    return new SsoUserInfoResponse(
        "Anwender",
        "testmail@muenchen.de",
        "Test81",
        ["ROLE_ANWENDER"]
    );
});

const getPoweruser = computed(() => {
    return new SsoUserInfoResponse(
        "Anwender",
        "testmail@muenchen.de",
        "Test81",
        ["ROLE_POWERUSER"]
    );
});

const getNoUser = computed(() => {
    return new SsoUserInfoResponse("no-security", "", "", []);
});
</script>


<style scoped>

</style>
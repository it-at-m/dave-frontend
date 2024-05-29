import { ApiError, Levels } from "@/api/error";
import { defineStore } from "pinia";
import { computed, ref, Ref } from "vue";

export const useSnackbarStore = defineStore("snackbar", () => {
    // ref()s become state properties
    const snackbarTextPart1: Ref<string | undefined> = ref(undefined);
    const snackbarTextPart2: Ref<string | undefined> = ref(undefined);
    const snackbarLevel: Ref<Levels> = ref(Levels.INFO);
    const displayTrigger: Ref<boolean> = ref(false);
    // computed()s become getters
    const trigger = computed(() => displayTrigger.value);
    const getTextPart1 = computed(() => snackbarTextPart1.value);
    const getTextPart2 = computed(() => snackbarTextPart2.value);
    const getLevel = computed(() => snackbarLevel.value);
    // function()s become actions
    function showInfo(textPart1: string, textPart2?: string) {
        showToast(Levels.INFO, textPart1, textPart2);
    }
    function showSuccess(textPart1: string, textPart2?: string) {
        showToast(Levels.SUCCESS, textPart1, textPart2);
    }
    function showWarning(textPart1: string, textPart2?: string) {
        showToast(Levels.WARNING, textPart1, textPart2);
    }
    function showError(textPart1: string, textPart2?: string) {
        showToast(Levels.ERROR, textPart1, textPart2);
    }
    function showApiError(apiError: ApiError) {
        const split = apiError.message.split("µ");
        showToast(
            apiError.level,
            split[0],
            split.length === 2 ? split[2] : undefined
        );
    }
    function showToast(level: Levels, textPart1: string, textPart2?: string) {
        snackbarTextPart1.value = textPart1;
        snackbarTextPart2.value = textPart2;
        snackbarLevel.value = level;
        displayTrigger.value = !displayTrigger.value;
    }

    return {
        trigger,
        getTextPart1,
        getTextPart2,
        getLevel,
        showInfo,
        showSuccess,
        showWarning,
        showError,
        showApiError,
    };
});

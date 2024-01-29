import { getCurrentInstance } from "vue";

export function useStore() {
    const instance = getCurrentInstance();
    if (!instance) {
        throw new Error(`useStore should be called in setup().`);
    }
    return instance.proxy.$store;
}

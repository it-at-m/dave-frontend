/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent<
    NonNullable<unknown>,
    NonNullable<unknown>,
    any
  >;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_VUE_APP_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // JavaScript
    "eslint:recommended",

    // Typescript
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-typescript/recommended",

    // Vue
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-strongly-recommended",
    "plugin:vue/vue3-recommended",

    // Vermeidung Kollision mit Prettier
    "@vue/eslint-config-prettier",
  ],
  rules: {
    "no-console": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "vue/component-name-in-template-casing": ["error", "kebab-case"],
  },
};

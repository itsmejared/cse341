import js from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

export default [
  js.configs.recommended,

  eslintConfigPrettier,

  {
    files: ["**/*.js"],
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "prettier/prettier": "error",

      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },

  {
    ignores: ["node_modules/", "pnpm-lock.yaml", ".env"],
  },
];

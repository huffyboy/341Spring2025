// eslint.config.js
const js = require("@eslint/js");
const prettierPlugin = require("eslint-plugin-prettier");
const globals = require("globals");

module.exports = [
  js.configs.recommended, // ESLint recommended rules

  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "warn",
      "no-unused-vars": "warn",
      "no-console": "warn",
    },
  },
];

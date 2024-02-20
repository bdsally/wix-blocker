import js from "@eslint/js"
import prettier from "eslint-config-prettier"
import globals from "globals"

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
        ecmaFeatures: { modules: true },
      },
    },
    ...js.configs.recommended,
    ...prettier,
    // for docs on a rule: https://eslint.org/docs/latest/rules/RULENAME
    rules: {
      //Possible problems
      "padding-line-between-statements": ["error", { blankLine: "always", prev: "*", next: "return" }],
      "prefer-const": ["error"],
      "no-duplicate-imports": ["error", { includeExports: true }],
      "no-template-curly-in-string": "error",
      // Suggestions
      curly: "error",
      eqeqeq: "error",
      "no-magic-numbers": "error",
    },
  },
]

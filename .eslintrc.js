/* eslint-env node */
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  env: {
    node: true,
  },
  plugins: ["node"],
  rules: {
    // Show error on no explicit return type to prevent from unexpected bugs
    // especially when there are early returns because it can enforce all the
    // return types aligned. It's sometimes tedious when the type is complicated
    // and relying on type inference is a good idea, so ignore no return types
    // for functions used as expressions.
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true,
      },
    ],
    "@typescript-eslint/array-type": [
      "error",
      {
        default: "array-simple",
        readonly: "array-simple",
      },
    ],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "off",
    // This is disbaled to not show an error for type puzzles.
    "@typescript-eslint/no-inferrable-types": "off",
    // This is disbaled to not show an error for type puzzles.
    "@typescript-eslint/prefer-as-const": "off",
  },
  ignorePatterns: ["out/"],
};

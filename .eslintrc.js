module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest": true,
    "node": true
  },
  "extends": ["prettier", "plugin:@typescript-eslint/recommended"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "typescript": true
  },
  "plugins": ["@typescript-eslint", "prettier"],
  "rules": {
    "@typescript-eslint/ban-ts-ignore": 0,
    "comma-dangle": ["warn", "only-multiline"],
    "eol-last": ["error", "always"],
    "no-extra-semi": "error",
    "indent": ["error", 2],
    "no-multiple-empty-lines": ["error", { "max": 1, "maxBOF": 0, "maxEOF": 0 }],
    "object-curly-spacing": ["error", "always"]
  }
}

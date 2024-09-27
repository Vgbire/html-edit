/**
 * @type {import('prettier').Options}
 */
export default {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: false,
  trailingComma: "none",
  bracketSpacing: true,
  bracketSameLine: true,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "^react(.*)$",
    "antd/(.*)",
    "<THIRD_PARTY_MODULES>",
    "^src/(.*)$",
    "^./",
    "^../"
  ]
}

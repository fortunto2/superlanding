/**
 * @see https://prettier.io/docs/configuration
 * @type {import('prettier').Config}
 */
module.exports = {
    arrowParens: "always",
    bracketSpacing: true,
    bracketSameLine: false,
    printWidth: 80,
    proseWrap: "always",
    semi: true,
    singleQuote: false,
    tabWidth: 4,
    trailingComma: "all",
    useTabs: false,
    singleAttributePerLine: true,
    plugins: ["prettier-plugin-tailwindcss"],
}; 
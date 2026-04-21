module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  coverageProvider: "v8",
  coveragePathIgnorePatterns: [
    "node_modules",
    "src/components/ui/icons/",
    "src/assets/",
  ],
}

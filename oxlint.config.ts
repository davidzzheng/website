import { defineConfig } from "oxlint"
import astro from "ultracite/oxlint/astro"
import core from "ultracite/oxlint/core"
import react from "ultracite/oxlint/react"

export default defineConfig({
  extends: [core, react, astro],
  ignorePatterns: core.ignorePatterns,
  overrides: [
    {
      // Astro components are PascalCase by convention.
      files: ["**/*.astro"],
      rules: {
        "unicorn/filename-case": "off",
      },
    },
    {
      // Frameworks (Astro/Vite/Vitest) re-export `defineConfig` as a named export.
      files: ["*.config.{mjs,js,ts}", "**/*.config.{mjs,js,ts}"],
      rules: {
        "import/no-named-as-default": "off",
      },
    },
  ],
})

import antfu from "@antfu/eslint-config";

export default antfu(
  {
    typescript: true,
    vue: true,
    ignores: ["**/*.d.ts"]
  },
  {
    files: ["**/*.vue"],
    rules: {
      "vue/first-attribute-linebreak": ["error", { singleline: "beside", multiline: "below" }],
      "vue/max-attributes-per-line": ["error", { singleline: { max: 3 }, multiline: { max: 1 } }],
      "vue/html-closing-bracket-newline": ["error", { singleline: "never", multiline: "never", selfClosingTag: { singleline: "never", multiline: "never" } }]
    }
  },
  {
    files: ["src/frontend/**/*.ts"],
    rules: {
      "node/prefer-global/process": "off"
    }
  },
  {
    files: ["packages/backend/**/*.ts"],
    rules: {
      "no-throw-literal": "off"
    }
  },
  {
    files: ["packages/backend/**/*.test.ts"],
    rules: {
      "no-unused-expressions": "off",
      "ts/no-unused-expressions": "off"
    }
  },
  {
    // Without `files`, they are general rules for all files
    rules: {
      "style/indent": ["error", 2],
      "style/semi": ["error", "always"],
      "style/quotes": ["error", "double"],
      "style/comma-dangle": ["error", "never"],
      "style/brace-style": ["error", "1tbs"]
    }
  }
);

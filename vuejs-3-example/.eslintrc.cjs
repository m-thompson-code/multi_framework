module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/vue3-recommended", "eslint:recommended", "@vue/typescript/recommended"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": "off",
    "vue/max-attributes-per-line": "off",
    "vue/html-self-closing": "off",
    "vue/singleline-html-element-content-newline": "off"
  }
};

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
  ],
  plugins: [
  ],
  ignorePatterns: ['public/vendor/vapor-ui/*'],
  rules: {
    // allow-dangle (syncs w/ laravel).
    'comma-dangle': ['error', 'always-multiline'],

    // Only allow curly braces of multi-line statements.
    curly: ['error', 'multi'],

    // for sanity - allow people to write console.log - DO NOT CHECK IN
    'no-console': 'off',
    'no-debugger': 'off',

    // do not require default for properties
    'vue/require-default-prop': 'off',

    // lets allow content on the same line for short html
    'vue/singleline-html-element-content-newline': 0,

    // under discussion - https://github.com/Rimsys/rimsys/discussions/545
    camelcase: 'off',

    // Allows for lexical declarations within case/default clauses.
    'no-case-declarations': 'off',

    // this restrictions functions and classes to be defined before they are used
    // this is impossible to have on with model-typer
    'no-use-before-define': 'off',

    // ref: https://github.com/eslint/eslint/issues/14118#issuecomment-779869306
    // note you must disable the base rule as it can report incorrect errors
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],

    // https://eslint.vuejs.org/rules/no-v-html.html
    // lets discuss
    'vue/no-v-html': 'off',

    // Enforces ban on using 'any' type to enforce best practices (╯°□°)╯︵ ┻━┻
    '@typescript-eslint/no-explicit-any': ['error'],

    // Newer ES-Lint rules we can skip for now
    'vue/multi-word-component-names': 'off',
    'nuxt/no-env-in-hooks': 'off',
    'import/no-named-as-default': 'off',
    'import/named': 'off',
    'func-call-spacing': 'off',
  },
}

module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'prettier'],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/require-default-prop': 'off',
        'no-undef': ['off'],
    },
    plugins: ['prettier'],
};

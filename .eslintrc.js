module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'prettier'],

    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/require-default-prop': 'off',
    },
    plugins: ['prettier'],
}

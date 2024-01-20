module.exports = {
    parser: 'espree',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2021,
    },
    env: {
        node: true,
    },
    plugins: ['import'],
    rules: {
        'no-undef': 'error',
        'import/no-unresolved': ['error', { commonjs: true, amd: true }],
        'import/named': 'error',
        'import/default': 'error',
        'import/namespace': 'error',
        'import/export': 'error',
    },
}

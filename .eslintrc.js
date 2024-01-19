module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'jest'],
    extends: [
        '@react-native-community',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ]
};

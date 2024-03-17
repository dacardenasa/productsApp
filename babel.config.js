module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    extensions: [
                        '.ios.js',
                        '.android.js',
                        '.ios.jsx',
                        '.android.jsx',
                        '.js',
                        '.jsx',
                        '.json',
                        '.ts',
                        '.tsx'
                    ],
                    root: ['.'],
                    alias: {
                        '@': './src',
                        '@adapters': './src/adapters',
                        '@components': './src/components',
                        '@context': './src/context',
                        '@helpers': './src/helpers',
                        '@hooks': './src/hooks',
                        '@interfaces': './src/interfaces',
                        '@navigation': './src/navigation',
                        '@providers': './src/providers',
                        '@screens': './src/screens',
                        '@services': './src/services',
                        '@theme': './src/theme',
                        '@utils': './src/utils'
                    }
                }
            ],
            'react-native-reanimated/plugin'
        ]
    };
};

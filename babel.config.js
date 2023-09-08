module.exports = function (api) {
    api.cache(true)
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
                    root: ['.'],
                    alias: {
                        '@src': './src',
                        '@components': './src/components',
                    },
                },
            ],
            'expo-router/babel',
            [
                'module:react-native-dotenv',
                {
                    envName: 'APP_ENV',
                    moduleName: '@env',
                    path: '.env',
                    blocklist: null,
                    allowlist: null,
                    blacklist: null, // DEPRECATED
                    whitelist: null, // DEPRECATED
                    safe: false,
                    allowUndefined: false,
                    verbose: false,
                },
            ],
        ],
    }
}

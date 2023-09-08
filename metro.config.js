// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)
config.resolver.sourceExts.push('cjs') /* for Firebase bundling */
//config.resolver.resolverMainFields = ['react-native', 'main']

module.exports = config

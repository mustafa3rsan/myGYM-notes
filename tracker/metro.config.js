/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // TypeScript dosyaları için gerekli uzantıları ekliyoruz
  config.resolver.sourceExts = [
    ...config.resolver.sourceExts,
    "ts",
    "tsx",
    "json"
  ];

  return config;
})();

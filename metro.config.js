const { getDefaultConfig } = require('expo/metro-config');
const { withNativewind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// تعطيل Package Exports لمنع تسرب أكواد ESM التي تحتوي على import.meta
config.resolver.unstable_enablePackageExports = false;

// تحديد أولويات البحث لتفضيل CommonJS
config.resolver.unstable_conditionNames = ['browser', 'require', 'react-native'];

module.exports = withNativewind(config);

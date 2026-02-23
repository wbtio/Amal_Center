const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const { withNativeWind } = require('nativewind/metro');

// استخدمنا withNativeWind سابقاً وهو الطريقة الرسمية في التوثيق الجديد
// ولكن سأجرب الإعداد اليدوي إذا كان هذا ما تريده، ولكن withNativeWind هو الأفضل عادةً.
// سألتزم بـ withNativeWind لأنه يغلف كل التعقيدات، ولكن سأضيف input بشكل صريح.

module.exports = withNativeWind(config, { input: './global.css' });

import { ExpoConfig, ConfigContext } from "@expo/config";

const androidVersionCode = Number(process.env.ANDROID_VERSION_CODE);

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: process.env.EXPO_PUBLIC_APP_NAME || "Al-Amal Hypermarket",
    slug: "al-amal-hypermarket",
    version: process.env.EXPO_PUBLIC_APP_VERSION || config.version || "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
        image: "./assets/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: "#2E7D32",
    },
    ios: {
        supportsTablet: true,
        bundleIdentifier: "com.alamal.center",
        buildNumber: process.env.IOS_BUILD_NUMBER || "1",
        appleTeamId: "NY6P4YM6M9",
        infoPlist: {
            NSCameraUsageDescription: "This app needs camera access to take a profile photo / يحتاج التطبيق إلى الكاميرا لالتقاط صورة الملف الشخصي",
            NSPhotoLibraryUsageDescription: "This app needs photo library access to select a profile photo / يحتاج التطبيق إلى معرض الصور لاختيار صورة الملف الشخصي",
            NSLocationWhenInUseUsageDescription: "This app needs your location to show it on the map and provide accurate delivery address / يحتاج التطبيق إلى موقعك لعرضه على الخريطة وتوفير عنوان توصيل دقيق",
        },
        config: {
            usesNonExemptEncryption: false,
        },
    },
    android: {
        package: "com.alamal.center",
        versionCode:
            (Number.isInteger(androidVersionCode) && androidVersionCode > 0
                ? androidVersionCode
                : config.android?.versionCode) ?? 7,
        adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#2E7D32",
        },
    },
    web: {
        favicon: "./assets/favicon.png",
        bundler: "metro",
    },
    plugins: [
        "expo-router",
        "expo-font",
        "expo-secure-store",
        [
            "expo-image-picker",
            {
                cameraPermission: "This app needs camera access to take a profile photo / يحتاج التطبيق إلى الكاميرا لالتقاط صورة الملف الشخصي",
                photosPermission: "This app needs photo library access to select a profile photo / يحتاج التطبيق إلى معرض الصور لاختيار صورة الملف الشخصي",
            },
        ],
        [
            "expo-location",
            {
                locationWhenInUsePermission: "This app needs your location to show it on the map and provide accurate delivery address / يحتاج التطبيق إلى موقعك لعرضه على الخريطة وتوفير عنوان توصيل دقيق",
            },
        ],
    ],
    experiments: {
        typedRoutes: true,
    },
    extra: {
        // Environment variables are automatically available via process.env.EXPO_PUBLIC_*
        // But you can also expose them here for use with expo-constants
        supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
        supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
        defaultCurrency: process.env.EXPO_PUBLIC_DEFAULT_CURRENCY,
        enableReviews: process.env.EXPO_PUBLIC_ENABLE_REVIEWS === "true",
        enableWishlist: process.env.EXPO_PUBLIC_ENABLE_WISHLIST !== "false",
        enableNotifications: process.env.EXPO_PUBLIC_ENABLE_NOTIFICATIONS !== "false",
        debugMode: process.env.EXPO_PUBLIC_DEBUG_MODE === "true",
        // eas block restored with valid ID
        eas: {
            projectId: "5fc7c19f-3577-4e1c-9e50-ae7c4b7a8d47",
        },
    },
    scheme: "al-amal-center",
});

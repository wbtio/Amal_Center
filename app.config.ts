import { ExpoConfig, ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: process.env.EXPO_PUBLIC_APP_NAME || "Al-Amal Hypermarket",
    slug: "al-amal-hypermarket",
    version: process.env.EXPO_PUBLIC_APP_VERSION || config.version || "0.53",
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
    },
    android: {
        package: "com.alamal.center",
        versionCode: config.android?.versionCode ?? 5,
        adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#2E7D32",
        },
    },
    web: {
        favicon: "./assets/favicon.png",
        bundler: "metro",
    },
    plugins: ["expo-router", "expo-font", "expo-secure-store"],
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
        enableWishlist: process.env.EXPO_PUBLIC_ENABLE_WISHLIST === "true",
        enableNotifications: process.env.EXPO_PUBLIC_ENABLE_NOTIFICATIONS === "true",
        debugMode: process.env.EXPO_PUBLIC_DEBUG_MODE === "true",
        // eas block restored with valid ID
        eas: {
            projectId: "5fc7c19f-3577-4e1c-9e50-ae7c4b7a8d47",
        },
    },
    scheme: "al-amal-center",
});

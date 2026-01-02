import { I18n } from 'i18n-js/dist/require';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';

import ar from '../locales/ar.json';
import en from '../locales/en.json';

// Create i18n instance
const i18n = new I18n({
    ar,
    en,
});

// Storage key for language preference
const LANGUAGE_KEY = '@app_language';

// Set default locale based on device
i18n.defaultLocale = 'ar';
i18n.locale = 'ar'; // Default to Arabic
i18n.enableFallback = true;

// Initialize language from storage or device
export async function initializeLanguage(): Promise<string> {
    try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);

        if (savedLanguage) {
            i18n.locale = savedLanguage;
            return savedLanguage;
        }

        // Use device language if no saved preference
        const deviceLocale = Localization.getLocales()[0]?.languageCode || 'ar';
        const supportedLocale = ['ar', 'en'].includes(deviceLocale) ? deviceLocale : 'ar';

        i18n.locale = supportedLocale;
        return supportedLocale;
    } catch (error) {
        console.error('Error loading language:', error);
        return 'ar';
    }
}

// Get current language
export function getCurrentLanguage(): string {
    return i18n.locale;
}

// Check if current language is RTL
export function isRTL(): boolean {
    return i18n.locale === 'ar';
}

// Set language and save to storage
export async function setLanguage(language: 'ar' | 'en'): Promise<boolean> {
    try {
        await AsyncStorage.setItem(LANGUAGE_KEY, language);
        i18n.locale = language;

        // Just set allowRTL, don't force RTL change at runtime
        // The Stack component with key prop will handle the remount
        const shouldBeRTL = language === 'ar';
        I18nManager.allowRTL(shouldBeRTL);

        // Return false - no restart needed, key prop handles remount
        return false;
    } catch (error) {
        console.error('Error saving language:', error);
        return false;
    }
}

// Translation function
export function t(key: string, options?: object): string {
    return i18n.t(key, options);
}

// Export the i18n instance for advanced usage
export default i18n;

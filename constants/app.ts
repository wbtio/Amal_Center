/**
 * App-wide Constants
 * Contains configuration values used throughout the application
 */

export const APP_CONFIG = {
    VERSION: '0.50',
    WHATSAPP_NUMBER: '9647801234567',
    WHATSAPP_URL: 'https://wa.me/9647801234567',

    // Support & Help
    SUPPORT_EMAIL: 'support@al-amal-center.iq',
    HELP_CENTER_URL: 'https://help.al-amal-center.iq',
    PLAY_STORE_URL: 'https://play.google.com/store/apps/details?id=com.alamal.center',
    APP_STORE_URL: 'https://www.apple.com/app-store/',
    APK_URL: '',
    BRANCH_LOCATIONS: [
        {
            label_ar: 'الأمل 1',
            label_en: 'Al Amal 1',
            href: 'https://maps.google.com/maps?q=30.426891326904297%2C47.7881965637207&z=17&hl=en',
        },
        {
            label_ar: 'الأمل 2',
            label_en: 'Al Amal 2',
            href: 'https://maps.google.com/maps?q=30.52410888671875%2C47.75685119628906&z=17&hl=en',
        },
        {
            label_ar: 'الأمل 3',
            label_en: 'Al Amal 3',
            href: 'https://maps.google.com/maps?q=30.527002334594727%2C47.76530456542969&z=17&hl=en',
        },
        {
            label_ar: 'الأمل 4',
            label_en: 'Al Amal 4',
            href: 'https://maps.google.com/maps?q=30.538890838623047%2C47.800296783447266&z=17&hl=en',
        },
    ],

    // Social Media
    FACEBOOK_URL: 'https://facebook.com/alamalcenter',
    INSTAGRAM_URL: 'https://instagram.com/alamalcenter',

} as const;

export const COLORS = {
    PRIMARY: '#2E7D32',
    SECONDARY: '#FFB300',
    ACCENT: '#4CAF50',
    DANGER: '#D32F2F',
    SUCCESS: '#4CAF50',
    WARNING: '#FF9800',
    INFO: '#2196F3',

    // Text Colors
    TEXT_PRIMARY: '#212121',
    TEXT_SECONDARY: '#757575',
    TEXT_DISABLED: '#9E9E9E',

    // Background Colors
    BG_PRIMARY: '#FFFFFF',
    BG_SECONDARY: '#F5F5F5',
    BG_TERTIARY: '#F6F8F6',
} as const;

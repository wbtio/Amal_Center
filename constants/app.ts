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
    BRANCH_LOCATIONS: [
        {
            label_ar: 'الفرع 2',
            label_en: 'Branch 2',
            href: 'https://www.google.com/maps/search/?api=1&query=Al-Amal%20residential%20complex',
        },
        {
            label_ar: 'الفرع 3',
            label_en: 'Branch 3',
            href: 'https://www.google.com/maps/search/?api=1&query=%D8%A7%D9%84%D8%A7%D9%85%D9%84%20%D8%B3%D9%86%D8%AA%D8%B1%204',
        },
        {
            label_ar: 'الفرع 4',
            label_en: 'Branch 4',
            href: 'https://www.google.com/maps/search/?api=1&query=%D8%B3%D9%86%D8%AA%D8%B1%20%D8%A7%D9%84%D8%A7%D9%85%D9%84',
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

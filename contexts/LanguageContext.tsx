import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    initializeLanguage,
    setLanguage as setI18nLanguage,
    getCurrentLanguage,
    isRTL as checkRTL,
    t as translate
} from '../lib/i18n';

type Language = 'ar' | 'en';

interface LanguageContextType {
    language: Language;
    isRTL: boolean;
    isLoading: boolean;
    t: (key: string, options?: object) => string;
    changeLanguage: (lang: Language) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
    const [language, setLanguage] = useState<Language>('ar');
    const [isRTL, setIsRTL] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadLanguage() {
            const savedLanguage = await initializeLanguage();
            setLanguage(savedLanguage as Language);
            setIsRTL(checkRTL());
            setIsLoading(false);
        }
        loadLanguage();
    }, []);

    const changeLanguage = async (newLanguage: Language) => {
        if (newLanguage === language) return;

        try {
            await setI18nLanguage(newLanguage);
            setLanguage(newLanguage);
            setIsRTL(newLanguage === 'ar');
        } catch (error) {
            console.error('Error changing language:', error);
        }
    };

    const t = (key: string, options?: object): string => {
        return translate(key, options);
    };

    return (
        <LanguageContext.Provider value={{ language, isRTL, isLoading, t, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        // Return default values if not in provider (fallback)
        return {
            language: 'ar' as const,
            isRTL: true,
            isLoading: false,
            t: (key: string) => key,
            changeLanguage: async () => { },
        };
    }
    return context;
}

// Shortcut hook for just the translation function
export function useTranslation() {
    const { t, language, isRTL } = useLanguage();
    return { t, language, isRTL };
}

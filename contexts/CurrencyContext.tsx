
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Currency = 'IQD' | 'USD';

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    toggleCurrency: () => void;
    formatPrice: (amountIQD: number) => string;
    exchangeRate: number; // USD to IQD
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

interface CurrencyProviderProps {
    children: ReactNode;
}

const EXCHANGE_RATE = 1500; // 1 USD = 1500 IQD (Example rate)

export function CurrencyProvider({ children }: CurrencyProviderProps) {
    const [currency, setCurrency] = useState<Currency>('IQD');

    useEffect(() => {
        loadCurrency();
    }, []);

    const loadCurrency = async () => {
        try {
            const saved = await AsyncStorage.getItem('user-currency');
            if (saved === 'USD' || saved === 'IQD') {
                setCurrency(saved);
            }
        } catch (e) {
            console.error('Failed to load currency', e);
        }
    };

    const changeCurrency = async (newCurrency: Currency) => {
        setCurrency(newCurrency);
        try {
            await AsyncStorage.setItem('user-currency', newCurrency);
        } catch (e) {
            console.error('Failed to save currency', e);
        }
    };

    const toggleCurrency = async () => {
        const newCurrency = currency === 'IQD' ? 'USD' : 'IQD';
        await changeCurrency(newCurrency);
    };

    const formatPrice = (amountIQD: number): string => {
        if (currency === 'IQD') {
            return new Intl.NumberFormat('ar-IQ', {
                style: 'currency',
                currency: 'IQD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(amountIQD);
        } else {
            // Convert to USD
            const amountUSD = amountIQD / EXCHANGE_RATE;
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(amountUSD);
        }
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency: changeCurrency, toggleCurrency, formatPrice, exchangeRate: EXCHANGE_RATE }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (!context) {
        // Return default values if not in provider (fallback for navigation setup)
        return {
            currency: 'IQD' as Currency,
            setCurrency: async () => { },
            toggleCurrency: async () => { },
            formatPrice: (amountIQD: number) => `${amountIQD.toLocaleString()} د.ع`,
            exchangeRate: 1500,
        };
    }
    return context;
}

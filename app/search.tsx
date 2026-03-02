import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect, useRef } from 'react';
import { Image } from 'expo-image';
import { supabase } from '../lib/supabase';
import { Product } from '../hooks/useSupabase';
import { formatIQD } from '../store/cartStore';
import { useLanguage } from '../contexts/LanguageContext';

export default function SearchScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t, isRTL, language } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const searchProducts = async () => {
      if (query.trim().length === 0) {
        setResults([]);
        setHasSearched(false);
        return;
      }

      setLoading(true);
      setHasSearched(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .or(`name.ilike.%${query}%,name_ar.ilike.%${query}%`)
          .eq('is_active', true)
          .limit(20);

        if (error) throw error;
        setResults(data as Product[] || []);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header Container */}
      <View 
        className="bg-white border-b border-gray-100"
        style={{ 
          paddingTop: insets.top + 8,
          paddingBottom: 12,
        }}
      >
        <View className={`px-4 flex-row items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Back Button */}
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
            activeOpacity={0.7}
          >
            <Ionicons 
              name={isRTL ? "arrow-forward" : "arrow-back"} 
              size={20} 
              color="#374151" 
            />
          </TouchableOpacity>

          {/* Search Input Box */}
          <View 
            className={`flex-1 h-11 bg-gray-50 rounded-xl flex-row items-center px-3 border border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <Ionicons 
              name="search" 
              size={18} 
              color="#9CA3AF" 
            />
            <TextInput
              ref={inputRef}
              className={`flex-1 font-ibm text-text-primary text-sm h-full ${isRTL ? 'text-right mr-2' : 'text-left ml-2'}`}
              placeholder={t('common.searchPlaceholder')}
              placeholderTextColor="#9CA3AF"
              value={query}
              onChangeText={setQuery}
              autoFocus
              returnKeyType="search"
              style={{ verticalAlign: 'middle', includeFontPadding: false }}
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => { setQuery(''); inputRef.current?.focus(); }}>
                <Ionicons name="close-circle" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Results count */}
        {hasSearched && !loading && results.length > 0 && (
          <Text className={`px-5 mt-2 font-ibm text-xs text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>
            {language === 'ar' ? `${results.length} نتيجة` : `${results.length} results`}
          </Text>
        )}
      </View>

      {/* Results */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator color="#2E7D32" size="large" />
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          ListEmptyComponent={
            hasSearched ? (
              <View className="flex-1 justify-center items-center mt-16">
                <View className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center mb-5">
                  <Ionicons name="search-outline" size={36} color="#D1D5DB" />
                </View>
                <Text className="font-ibm-bold text-gray-700 text-base mb-2">
                  {isRTL ? 'لا توجد نتائج' : 'No results found'}
                </Text>
                <Text className="font-ibm text-gray-400 text-sm text-center max-w-[250px] leading-5">
                  {isRTL ? `لم نجد منتجات تطابق "${query}"` : `No products match "${query}"`}
                </Text>
              </View>
            ) : (
              <View className="flex-1 justify-center items-center mt-16">
                <View className="w-20 h-20 rounded-full bg-green-50 items-center justify-center mb-5">
                  <Ionicons name="search" size={36} color="#A5D6A7" />
                </View>
                <Text className="font-ibm-bold text-gray-700 text-base mb-2">
                  {isRTL ? 'ابحث عن منتجاتك' : 'Find your products'}
                </Text>
                <Text className="font-ibm text-gray-400 text-sm text-center max-w-[250px] leading-5">
                  {isRTL ? 'اكتب اسم المنتج للبحث السريع' : 'Type a product name to search instantly'}
                </Text>
              </View>
            )
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`flex-row items-center bg-white p-3 rounded-2xl mb-2.5 border border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}
              onPress={() => router.push({ pathname: '/product/[id]', params: { id: item.id } })}
              activeOpacity={0.7}
            >
              <View className="bg-gray-50 rounded-xl overflow-hidden">
                <Image
                  source={{ uri: item.image_url }}
                  style={{ width: 64, height: 64, borderRadius: 10, backgroundColor: 'transparent' }}
                  contentFit="contain"
                />
              </View>
              <View className={`flex-1 ${isRTL ? 'mr-3' : 'ml-3'}`}>
                <Text 
                  className={`font-ibm-bold text-gray-800 text-[14px] ${isRTL ? 'text-right' : 'text-left'}`} 
                  numberOfLines={1}
                >
                  {isRTL ? item.name_ar : item.name}
                </Text>
                <Text 
                  className={`text-primary font-ibm-bold text-base mt-0.5 ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  {formatIQD(item.price_iqd)}
                </Text>
              </View>
              <View className="w-8 h-8 rounded-full bg-gray-50 items-center justify-center">
                <Ionicons 
                  name={isRTL ? "chevron-back" : "chevron-forward"} 
                  size={16} 
                  color="#D1D5DB" 
                />
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

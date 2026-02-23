import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import { supabase } from '../lib/supabase';
import { Product } from '../hooks/useSupabase';
import { formatIQD } from '../store/cartStore';
import { useLanguage } from '../contexts/LanguageContext';

export default function SearchScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t, isRTL } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchProducts = async () => {
      if (query.trim().length === 0) {
        setResults([]);
        return;
      }

      setLoading(true);
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

    const debounce = setTimeout(searchProducts, 500);
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
            className="w-11 h-11 bg-gray-50 rounded-xl items-center justify-center border border-gray-200"
            activeOpacity={0.7}
          >
            <Ionicons 
              name={isRTL ? "arrow-forward" : "arrow-back"} 
              size={22} 
              color="#212121" 
            />
          </TouchableOpacity>

          {/* Search Input Box */}
          <View 
            className={`flex-1 h-11 bg-gray-50 rounded-xl flex-row items-center px-4 border border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <Ionicons 
              name="search" 
              size={20} 
              color="#757575" 
            />
            <TextInput
              className={`flex-1 font-cairo text-text-primary text-sm h-full ${isRTL ? 'text-right mr-2' : 'text-left ml-2'}`}
              placeholder={t('common.searchPlaceholder')}
              placeholderTextColor="#757575"
              value={query}
              onChangeText={setQuery}
              autoFocus
              style={{ verticalAlign: 'middle', includeFontPadding: false }}
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery('')}>
                <Ionicons name="close-circle" size={18} color="#757575" />
              </TouchableOpacity>
            )}
          </View>
        </View>
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
          ListEmptyComponent={
            query.length > 0 ? (
              <View className="flex-1 justify-center items-center mt-20">
                <Ionicons name="search-outline" size={64} color="#e0e0e0" />
                <Text className="font-cairo text-gray-400 mt-4 text-center">
                  {isRTL ? 'لا توجد نتائج مطابقة لبحثك' : 'No results found for your search'}
                </Text>
              </View>
            ) : (
              <View className="flex-1 justify-center items-center mt-20">
                <Ionicons name="search-outline" size={64} color="#f5f5f5" />
                <Text className="font-cairo text-gray-300 mt-4 text-center">
                  {isRTL ? 'ابدأ البحث عن المنتجات المفضلة لديك' : 'Start searching for your favorite products'}
                </Text>
              </View>
            )
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`flex-row items-center bg-white p-4 rounded-2xl mb-3 border border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}
              onPress={() => router.push({ pathname: '/product/[id]', params: { id: item.id } })}
              activeOpacity={0.7}
            >
              <View className="bg-gray-50 rounded-xl p-1">
                <Image
                  source={{ uri: item.image_url }}
                  style={{ width: 60, height: 60, borderRadius: 8, backgroundColor: 'transparent' }}
                  contentFit="contain"
                />
              </View>
              <View className={`flex-1 ${isRTL ? 'mr-4' : 'ml-4'}`}>
                <Text 
                  className={`font-cairo-bold text-text-primary text-base ${isRTL ? 'text-right' : 'text-left'}`} 
                  numberOfLines={1}
                >
                  {isRTL ? item.name_ar : item.name}
                </Text>
                <Text 
                  className={`text-primary font-cairo-bold text-lg mt-1 ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  {formatIQD(item.price_iqd)}
                </Text>
              </View>
              <Ionicons 
                name={isRTL ? "chevron-back" : "chevron-forward"} 
                size={20} 
                color="#e0e0e0" 
              />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useMainCategories } from '../../hooks/useSupabase';
import { useLanguage } from '../../contexts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Category } from '../../shared/types';

export default function CategoriesScreen() {
  const router = useRouter();
  const { data: categories, isLoading } = useMainCategories();
  const { language, isRTL } = useLanguage();
  const insets = useSafeAreaInsets();

  const getCategoryName = (item: Category) => {
    return language === 'ar' ? item.name_ar : (item.name || item.name_ar);
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white" style={{ paddingTop: insets.top }}>
        <ActivityIndicator size="large" color="#3F51B5" />
      </View>
    );
  }

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => router.push(`/(tabs)/category/${item.id}` as any)}
      className="flex-row items-center bg-white"
      style={{
        height: 60,
        paddingHorizontal: 16,
        flexDirection: isRTL ? 'row' : 'row-reverse',
      }}
    >
      {/* سهم التنقل */}
      <Ionicons 
        name={isRTL ? "chevron-back" : "chevron-forward"} 
        size={20} 
        color="#BDBDBD" 
      />

      {/* نص التصنيف */}
      <View className="flex-1 px-3">
        <Text
          className="font-ibm-semibold text-[15px]"
          style={{ 
            color: '#212121',
            textAlign: isRTL ? 'right' : 'left',
          }}
          numberOfLines={1}
        >
          {getCategoryName(item)}
        </Text>
      </View>

      {/* الأيقونة/الصورة */}
      <View 
        className="items-center justify-center"
        style={{ width: 50, height: 50 }}
      >
        {item.image_url ? (
          <Image
            source={{ uri: item.image_url }}
            style={{ width: 45, height: 45 }}
            contentFit="contain"
            transition={200}
          />
        ) : (
          <Ionicons name="grid-outline" size={28} color="#3F51B5" />
        )}
      </View>
    </TouchableOpacity>
  );

  const ItemSeparator = () => (
    <View style={{ height: 1, backgroundColor: '#F0F0F0', marginLeft: isRTL ? 0 : 70, marginRight: isRTL ? 70 : 0 }} />
  );

  return (
    <View className="flex-1 bg-white">
      
      {/* قائمة التصنيفات */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        ItemSeparatorComponent={ItemSeparator}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 32,
        }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="folder-open-outline" size={60} color="#E0E0E0" />
            <Text className="font-ibm text-gray-400 mt-4">
              {language === 'ar' ? 'لا توجد تصنيفات' : 'No categories'}
            </Text>
          </View>
        }
      />
    </View>
  );
}
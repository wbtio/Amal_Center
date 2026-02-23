import { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TrashIcon, MinusIcon, PlusIcon } from 'react-native-heroicons/outline';
import { Image } from 'expo-image';

interface CartItemProps {
    item: {
        id: string;
        product_id: string;
        name: string;
        name_ar?: string;
        price_iqd: number;
        quantity: number;
        stock_quantity?: number;
        image_url?: string;
    };
    onRemove: (productId: string, productName: string) => void;
    onUpdateQuantity: (productId: string, quantity: number) => void;
    isRTL: boolean;
    language: string;
    formatPrice: (price: number) => string;
    t: (key: string) => string;
}

const CartItem = memo(({ item, onRemove, onUpdateQuantity, isRTL, language, formatPrice, t }: CartItemProps) => {
    const getProductName = (): string => {
        return language === 'ar' ? (item.name_ar || item.name) : (item.name || item.name_ar || '');
    };

    const handleQuantityChange = (newQuantity: number) => {
        onUpdateQuantity(item.product_id, newQuantity);
    };

    const handleRemove = () => {
        onRemove(item.product_id, getProductName());
    };

    const productName = getProductName();

    return (
        <View
            className={`flex-row bg-white rounded-xl mb-2.5 border border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}
            style={{
                padding: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.03,
                shadowRadius: 3,
                elevation: 1,
            }}
        >
            {/* Product Image */}
            <View
                className="bg-gray-50 rounded-lg overflow-hidden border border-gray-100"
                style={{ 
                    width: 70, 
                    height: 70,
                    marginRight: isRTL ? 0 : 10, 
                    marginLeft: isRTL ? 10 : 0 
                }}
            >
                {item.image_url ? (
                    <Image
                        source={{ uri: item.image_url }}
                        style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                        contentFit="contain"
                        transition={200}
                        cachePolicy="memory-disk"
                    />
                ) : (
                    <View className="flex-1 justify-center items-center bg-gray-100 rounded-lg">
                        <Text className="text-gray-400 text-xs font-cairo">صورة</Text>
                    </View>
                )}
            </View>

            {/* Product Details */}
            <View className="flex-1 justify-between">
                {/* Name & Remove Button */}
                <View className={`flex-row justify-between items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Text
                        className={`font-cairo-semibold text-text-primary flex-1 ${isRTL ? 'text-right' : 'text-left'}`}
                        numberOfLines={2}
                        style={{ 
                            fontSize: 13,
                            lineHeight: 18,
                            marginRight: isRTL ? 0 : 6, 
                            marginLeft: isRTL ? 6 : 0 
                        }}
                    >
                        {productName}
                    </Text>
                    <TouchableOpacity
                        onPress={handleRemove}
                        className="p-0.5"
                        activeOpacity={0.7}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        accessibilityLabel={t('cart.removeItem')}
                        accessibilityRole="button"
                        accessibilityHint={`${t('cart.removeItemConfirm')} ${productName}`}
                    >
                        <TrashIcon size={17} color="#D32F2F" />
                    </TouchableOpacity>
                </View>

                {/* Price & Quantity */}
                <View className={`flex-row justify-between items-center mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {/* Quantity Controls */}
                    <View className="flex-row items-center bg-gray-50 rounded-lg border border-gray-200">
                        <TouchableOpacity
                            className="justify-center items-center"
                            style={{ width: 28, height: 28 }}
                            onPress={() => handleQuantityChange(item.quantity - 1)}
                            activeOpacity={0.7}
                            disabled={item.quantity <= 1}
                            accessibilityLabel={t('common.decrease')}
                            accessibilityRole="button"
                        >
                            <MinusIcon
                                size={14}
                                color={item.quantity <= 1 ? "#BDBDBD" : "#2E7D32"}
                            />
                        </TouchableOpacity>

                        <View className="justify-center items-center border-x border-gray-200" style={{ width: 32, height: 28 }}>
                            <Text 
                                className="font-cairo-bold text-text-primary" 
                                style={{ fontSize: 12 }}
                                accessibilityLabel={`${t('product.quantity')}: ${item.quantity}`}
                            >
                                {item.quantity}
                            </Text>
                        </View>

                        <TouchableOpacity
                            className="justify-center items-center"
                            style={{ width: 28, height: 28 }}
                            onPress={() => handleQuantityChange(item.quantity + 1)}
                            activeOpacity={0.7}
                            disabled={item.quantity >= (item.stock_quantity || 99)}
                            accessibilityLabel={t('common.increase')}
                            accessibilityRole="button"
                        >
                            <PlusIcon
                                size={14}
                                color={item.quantity >= (item.stock_quantity || 99) ? "#BDBDBD" : "#2E7D32"}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Price */}
                    <View className={isRTL ? 'items-end' : 'items-start'}>
                        <Text className="font-cairo-bold text-primary" style={{ fontSize: 14 }}>
                            {formatPrice(item.price_iqd * item.quantity)}
                        </Text>
                        <Text className="font-cairo text-text-secondary" style={{ fontSize: 10, marginTop: 1 }}>
                            {formatPrice(item.price_iqd)} / {t('cart.perUnit')}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
});

CartItem.displayName = 'CartItem';

export default CartItem;

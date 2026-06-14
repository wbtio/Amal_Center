import { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TrashIcon, MinusIcon, PlusIcon } from 'react-native-heroicons/outline';
import { CachedImage as Image } from '../ui/CachedImage';

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
    const totalPrice = item.price_iqd * item.quantity;
    const atMin = item.quantity <= 1;
    const atMax = item.quantity >= (item.stock_quantity || 99);

    return (
        <View
            className={`bg-white rounded-2xl mb-3 ${isRTL ? '' : ''}`}
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.07,
                shadowRadius: 8,
                elevation: 3,
                overflow: 'hidden',
            }}
        >
            <View className={`flex-row ${isRTL ? 'flex-row-reverse' : ''}`} style={{ padding: 12 }}>

                {/* Product Image */}
                <View
                    style={{
                        width: 90,
                        height: 90,
                        borderRadius: 14,
                        backgroundColor: '#F9FAFB',
                        overflow: 'hidden',
                        marginRight: isRTL ? 0 : 12,
                        marginLeft: isRTL ? 12 : 0,
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
                        <View className="flex-1 justify-center items-center">
                            <Text className="text-gray-300 font-ibm" style={{ fontSize: 24 }}>📦</Text>
                        </View>
                    )}
                </View>

                {/* Product Details */}
                <View className="flex-1" style={{ justifyContent: 'space-between' }}>

                    {/* Top row: name + trash */}
                    <View className={`flex-row justify-between items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Text
                            className={`font-ibm-semibold text-text-primary flex-1 ${isRTL ? 'text-right' : 'text-left'}`}
                            numberOfLines={2}
                            style={{
                                fontSize: 14,
                                lineHeight: 20,
                                marginRight: isRTL ? 0 : 8,
                                marginLeft: isRTL ? 8 : 0,
                            }}
                        >
                            {productName}
                        </Text>
                        <TouchableOpacity
                            onPress={handleRemove}
                            activeOpacity={0.7}
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                            accessibilityLabel={t('cart.removeItem')}
                            accessibilityRole="button"
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: 8,
                                backgroundColor: 'rgba(211,47,47,0.08)',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <TrashIcon size={15} color="#D32F2F" />
                        </TouchableOpacity>
                    </View>

                    {/* Unit price */}
                    <Text
                        className={`font-ibm text-text-secondary ${isRTL ? 'text-right' : 'text-left'}`}
                        style={{ fontSize: 11, marginTop: 4 }}
                    >
                        {formatPrice(item.price_iqd)} / {t('cart.perUnit')}
                    </Text>

                    {/* Bottom row: quantity + total */}
                    <View
                        className={`flex-row justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}
                        style={{ marginTop: 10 }}
                    >
                        {/* Pill quantity control */}
                        <View
                            className={`flex-row items-center rounded-full ${isRTL ? 'flex-row-reverse' : ''}`}
                            style={{
                                backgroundColor: 'rgba(46,125,50,0.08)',
                                paddingHorizontal: 2,
                            }}
                        >
                            <TouchableOpacity
                                style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => handleQuantityChange(item.quantity - 1)}
                                activeOpacity={0.7}
                                disabled={atMin}
                                accessibilityLabel={t('common.decrease')}
                                accessibilityRole="button"
                            >
                                <MinusIcon size={13} color={atMin ? '#BDBDBD' : '#2E7D32'} />
                            </TouchableOpacity>

                            <Text
                                className="font-ibm-bold text-primary"
                                style={{ fontSize: 14, minWidth: 22, textAlign: 'center' }}
                                accessibilityLabel={`${t('product.quantity')}: ${item.quantity}`}
                            >
                                {item.quantity}
                            </Text>

                            <TouchableOpacity
                                style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => handleQuantityChange(item.quantity + 1)}
                                activeOpacity={0.7}
                                disabled={atMax}
                                accessibilityLabel={t('common.increase')}
                                accessibilityRole="button"
                            >
                                <PlusIcon size={13} color={atMax ? '#BDBDBD' : '#2E7D32'} />
                            </TouchableOpacity>
                        </View>

                        {/* Total price */}
                        <Text className="font-ibm-bold text-primary" style={{ fontSize: 16 }}>
                            {formatPrice(totalPrice)}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
});

CartItem.displayName = 'CartItem';

export default CartItem;

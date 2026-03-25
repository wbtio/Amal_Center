import { useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../contexts';
import { showToast } from './Toast';

interface WishlistButtonProps {
  productId: string;
  size?: number;
  iconSize?: number;
  backgroundColor?: string;
  activeBackgroundColor?: string;
  color?: string;
  activeColor?: string;
}

export function WishlistButton({
  productId,
  size = 38,
  iconSize = 20,
  backgroundColor = 'rgba(255,255,255,0.92)',
  activeBackgroundColor = '#FEE2E2',
  color = '#6B7280',
  activeColor = '#DC2626',
}: WishlistButtonProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [wishlistId, setWishlistId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadWishlistStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.user?.id) {
          if (mounted) {
            setWishlistId(null);
            setLoading(false);
          }
          return;
        }

        const { data, error } = await supabase
          .from('wishlist')
          .select('id')
          .eq('user_id', session.user.id)
          .eq('product_id', productId)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        if (mounted) {
          setWishlistId(data?.id || null);
        }
      } catch (error) {
        console.error('Error loading wishlist status:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadWishlistStatus();

    return () => {
      mounted = false;
    };
  }, [productId]);

  const handleToggleWishlist = async () => {
    try {
      setLoading(true);

      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user?.id) {
        Alert.alert(
          language === 'ar' ? 'تسجيل الدخول مطلوب' : 'Login required',
          language === 'ar' ? 'سجل الدخول أولاً لإضافة المنتج إلى المفضلة' : 'Please log in to save products to your wishlist',
          [
            { text: language === 'ar' ? 'إلغاء' : 'Cancel', style: 'cancel' },
            { text: language === 'ar' ? 'تسجيل الدخول' : 'Login', onPress: () => router.push('/auth/login') },
          ]
        );
        return;
      }

      if (wishlistId) {
        const { error } = await supabase.from('wishlist').delete().eq('id', wishlistId);
        if (error) throw error;

        setWishlistId(null);
        showToast(language === 'ar' ? 'تمت إزالة المنتج من المفضلة' : 'Removed from wishlist');
        return;
      }

      const { data, error } = await supabase
        .from('wishlist')
        .insert({
          user_id: session.user.id,
          product_id: productId,
        })
        .select('id')
        .single();

      if (error) throw error;

      setWishlistId(data.id);
      showToast(language === 'ar' ? 'تمت إضافة المنتج إلى المفضلة' : 'Added to wishlist');
    } catch (error: any) {
      console.error('Error toggling wishlist:', error);

      showToast(
        error?.message || (language === 'ar' ? 'تعذر تحديث المفضلة' : 'Failed to update wishlist'),
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const isActive = !!wishlistId;

  return (
    <TouchableOpacity
      onPress={handleToggleWishlist}
      disabled={loading}
      activeOpacity={0.8}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isActive ? activeBackgroundColor : backgroundColor,
        opacity: loading ? 0.7 : 1,
      }}
    >
      <Ionicons
        name={isActive ? 'heart' : 'heart-outline'}
        size={iconSize}
        color={isActive ? activeColor : color}
      />
    </TouchableOpacity>
  );
}

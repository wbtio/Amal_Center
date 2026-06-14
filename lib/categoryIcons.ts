import { MaterialCommunityIcons } from '@expo/vector-icons';

type MCIName = keyof typeof MaterialCommunityIcons.glyphMap;

export function getCategoryIcon(name: string, nameAr: string): MCIName {
  const n = (name || '').toLowerCase();
  const a = nameAr || '';

  if (n.includes('baby') || n.includes('paper') || a.includes('اطفال') || a.includes('ورق'))
    return 'baby-carriage';
  if (n.includes('clean') || a.includes('تنظيف'))
    return 'spray-bottle';
  if (n.includes('personal care') || (a.includes('عناية') && a.includes('شخصية')))
    return 'hand-heart';
  if (n.includes('dental') || a.includes('اسنان'))
    return 'tooth';
  if (n.includes('diaper') || a.includes('حفاض'))
    return 'baby';
  if (n.includes('hair') || a.includes('شعر'))
    return 'hair-dryer';
  if (n.includes('body care') || (a.includes('عناية') && a.includes('جسم')))
    return 'lotion';
  if (n.includes('tea') || n.includes('coffee') || a.includes('شاي') || a.includes('قهوة'))
    return 'coffee';
  if (n.includes('canned') || n.includes('sauce') || a.includes('معلب') || a.includes('صلصة'))
    return 'food-variant';
  if (n.includes('cereal') || n.includes('healthy') || a.includes('حبوب') || a.includes('صحية'))
    return 'grain';
  if (n.includes('cheese') || n.includes('dairy') || a.includes('جبن') || a.includes('ألبان'))
    return 'cheese';
  if (n.includes('juice') || n.includes('soft drink') || n.includes('beverage') || a.includes('عصير') || a.includes('غازية'))
    return 'cup-water';
  if (n.includes('water') || a.includes('مياه'))
    return 'water';
  if (n.includes('baker') || a.includes('مخبوز'))
    return 'bread-slice';
  if (n.includes('sweet') || n.includes('chip') || n.includes('candy') || a.includes('حلوى') || a.includes('شيبسي'))
    return 'candy';
  if (n.includes('powder') || n.includes('milk') || a.includes('حليب مجفف') || a.includes('نشوي'))
    return 'baby-bottle';
  if (n.includes('ghee') || n.includes('oil') || a.includes('سمن') || a.includes('زيت'))
    return 'bottle-wine';
  if (n.includes('rice') || n.includes('pasta') || a.includes('أرز') || a.includes('مكرونة'))
    return 'rice';
  if (n.includes('frozen') || a.includes('مجمد'))
    return 'snowflake';
  if (n.includes('egg') || n.includes('meat') || a.includes('بيض') || a.includes('لحم'))
    return 'egg';
  if (n.includes('vegetable') || a.includes('خضروات'))
    return 'carrot';
  if (n.includes('cosmetic') || n.includes('beauty') || a.includes('تجميل'))
    return 'lipstick';

  return 'grid';
}

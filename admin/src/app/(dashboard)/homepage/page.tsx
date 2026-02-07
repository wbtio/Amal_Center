'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
    Plus, Image as ImageIcon, Trash2, Save, MoveUp, MoveDown, 
    Eye, EyeOff, Loader2, Smartphone, GripVertical, ChevronDown, ChevronUp,
    Layout, Layers, ImagePlus
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Header } from '@/components/layout/Header';

// Types
type Banner = {
    id: string;
    image_url: string;
    title: string;
    subtitle: string;
    discount: string;
    active: boolean;
    link?: string;
    isNew?: boolean;
};

type HomeSection = {
    id: string;
    type: string;
    title: string;
    active: boolean;
    order_index: number;
    category_id?: string;
    icon?: string;
    description?: string;
    isNew?: boolean;
};

type Category = {
    id: string;
    name: string;
    name_ar: string;
    image_url?: string;
};

type PromoBanner = {
    id: string;
    slot: string;
    position: number;
    size: 'full' | 'half' | 'square';
    image_url: string;
    link?: string;
    title?: string;
    active: boolean;
    isNew?: boolean;
};

// Unified content item for the preview
type ContentItem = {
    id: string;
    type: 'main_banner' | 'section' | 'promo_banner';
    order: number;
    data: Banner | HomeSection | PromoBanner;
    afterSection?: string; // For promo banners - which section they appear after
};

const SECTION_TYPES: Record<string, { name: string; description: string }> = {
    'categories': { 
        name: 'التصنيفات', 
        description: 'يعرض الأقسام الرئيسية للمتجر' 
    },
    'special_offers': { 
        name: 'العروض الخاصة', 
        description: 'يعرض منتجات العروض النشطة. إذا لم توجد عروض، يعرض منتجات عشوائية كـ "عروض اليوم"' 
    },
    'best_sellers': { 
        name: 'الأكثر مبيعاً', 
        description: 'يعرض المنتجات الأكثر مبيعاً. إذا لم توجد مبيعات بعد، يعرض منتجات عشوائية' 
    },
    'new_arrivals': { 
        name: 'وصل حديثاً', 
        description: 'يعرض أحدث المنتجات المضافة للمتجر' 
    },
    'trending': { 
        name: 'الرائج', 
        description: 'يعرض المنتجات الرائجة. إذا لم توجد بيانات، يعرض منتجات عشوائية' 
    },
    'category_products': { 
        name: 'قسم منتجات', 
        description: 'يعرض منتجات من قسم معين تختاره' 
    },
    'custom': { 
        name: 'مخصص', 
        description: 'قسم مخصص' 
    }
};

const PROMO_SLOTS = [
    { id: 'slot_1', name: 'بعد التصنيفات', afterSection: 'categories' },
    { id: 'slot_2', name: 'بعد العروض الخاصة', afterSection: 'special_offers' },
    { id: 'slot_3', name: 'بعد الأكثر مبيعاً', afterSection: 'best_sellers' },
    { id: 'slot_4', name: 'بعد وصل حديثاً', afterSection: 'new_arrivals' },
    { id: 'slot_5', name: 'نهاية الصفحة', afterSection: 'end' },
];

const BANNER_SIZES = [
    { id: 'full', name: 'عرض كامل' },
    { id: 'half', name: 'نصف عرض' },
    { id: 'square', name: 'مربع' },
];

export default function HomepageManagementPage() {
    const [activePanel, setActivePanel] = useState<'preview' | 'sections' | 'banners'>('preview');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [banners, setBanners] = useState<Banner[]>([]);
    const [sections, setSections] = useState<HomeSection[]>([]);
    const [promoBanners, setPromoBanners] = useState<PromoBanner[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    // Expanded states for accordion
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
    const [expandedSlots, setExpandedSlots] = useState<Record<string, boolean>>({});

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            setIsLoading(true);

            const [bannersRes, sectionsRes, promoRes, categoriesRes] = await Promise.all([
                supabase.from('banners').select('*').order('created_at', { ascending: false }),
                supabase.from('home_sections').select('*').order('order_index', { ascending: true }),
                supabase.from('promo_banners').select('*').order('slot').order('position'),
                supabase.from('categories').select('id, name, name_ar, image_url').eq('is_active', true).order('sort_order')
            ]);

            if (bannersRes.data) setBanners(bannersRes.data);
            if (sectionsRes.data) setSections(sectionsRes.data);
            if (promoRes.data) setPromoBanners(promoRes.data);
            if (categoriesRes.data) setCategories(categoriesRes.data);

        } catch (error) {
            console.error('Error fetching content:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);

            const promises = [];

            // Save Banners
            const bannersToInsert = banners.filter(b => b.isNew).map(({ id, isNew, ...rest }) => rest);
            const bannersToUpdate = banners.filter(b => !b.isNew).map(({ isNew, ...rest }) => rest);

            if (bannersToInsert.length > 0) {
                promises.push(supabase.from('banners').insert(bannersToInsert));
            }
            if (bannersToUpdate.length > 0) {
                promises.push(supabase.from('banners').upsert(bannersToUpdate));
            }

            // Save Sections with order
            const sectionsToInsert = sections.filter(s => s.isNew).map(({ id, isNew, ...rest }, idx) => ({
                ...rest,
                order_index: sections.findIndex(sec => sec.id === id)
            }));
            const sectionsToUpdate = sections.filter(s => !s.isNew).map(({ isNew, ...rest }) => ({
                ...rest,
                order_index: sections.findIndex(sec => sec.id === rest.id)
            }));

            if (sectionsToInsert.length > 0) {
                promises.push(supabase.from('home_sections').insert(sectionsToInsert));
            }
            if (sectionsToUpdate.length > 0) {
                promises.push(supabase.from('home_sections').upsert(sectionsToUpdate));
            }

            // Save Promo Banners
            const promoToInsert = promoBanners.filter(b => b.isNew).map(({ id, isNew, ...rest }) => rest);
            const promoToUpdate = promoBanners.filter(b => !b.isNew).map(({ isNew, ...rest }) => rest);

            if (promoToInsert.length > 0) {
                promises.push(supabase.from('promo_banners').insert(promoToInsert));
            }
            if (promoToUpdate.length > 0) {
                promises.push(supabase.from('promo_banners').upsert(promoToUpdate));
            }

            const results = await Promise.all(promises);
            const errors = results.filter(r => r.error);

            if (errors.length > 0) {
                throw new Error(errors.map(e => e.error?.message).join(', '));
            }

            await fetchContent();
            alert('تم حفظ التغييرات بنجاح!');

        } catch (error: any) {
            console.error('Error saving:', error);
            alert('حدث خطأ أثناء الحفظ: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    // Banner Handlers
    const addBanner = () => {
        const newBanner: Banner = {
            id: Math.random().toString(),
            image_url: '',
            title: '',
            subtitle: '',
            discount: '',
            active: true,
            link: '',
            isNew: true
        };
        setBanners([newBanner, ...banners]);
    };

    const removeBanner = async (id: string, isNew?: boolean) => {
        if (!confirm('هل أنت متأكد من حذف هذا البنر؟')) return;
        if (!isNew) {
            await supabase.from('banners').delete().eq('id', id);
        }
        setBanners(banners.filter(b => b.id !== id));
    };

    const updateBanner = (id: string, field: keyof Banner, value: any) => {
        setBanners(banners.map(b => b.id === id ? { ...b, [field]: value } : b));
    };

    // Section Handlers
    const moveSection = (index: number, direction: 'up' | 'down') => {
        const newSections = [...sections];
        if (direction === 'up' && index > 0) {
            [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
        } else if (direction === 'down' && index < newSections.length - 1) {
            [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
        }
        setSections(newSections);
    };

    const toggleSection = (id: string) => {
        setSections(sections.map(s => s.id === id ? { ...s, active: !s.active } : s));
    };

    const updateSection = (id: string, field: keyof HomeSection, value: any) => {
        setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const addCategorySection = () => {
        const newSection: HomeSection = {
            id: Math.random().toString(),
            type: 'category_products',
            title: 'قسم جديد',
            active: true,
            order_index: sections.length,
            category_id: categories[0]?.id || '',
            isNew: true
        };
        setSections([...sections, newSection]);
    };

    const removeSection = async (id: string, isNew?: boolean) => {
        if (!confirm('هل أنت متأكد من حذف هذا القسم؟')) return;
        if (!isNew) {
            await supabase.from('home_sections').delete().eq('id', id);
        }
        setSections(sections.filter(s => s.id !== id));
    };

    // Promo Banner Handlers
    const addPromoBanner = (slot: string) => {
        const slotBanners = promoBanners.filter(b => b.slot === slot);
        const newPromo: PromoBanner = {
            id: Math.random().toString(),
            slot,
            position: slotBanners.length,
            size: 'full',
            image_url: '',
            link: '',
            title: '',
            active: true,
            isNew: true
        };
        setPromoBanners([...promoBanners, newPromo]);
    };

    const removePromoBanner = async (id: string, isNew?: boolean) => {
        if (!confirm('هل أنت متأكد من حذف هذا البنر؟')) return;
        if (!isNew) {
            await supabase.from('promo_banners').delete().eq('id', id);
        }
        setPromoBanners(promoBanners.filter(b => b.id !== id));
    };

    const updatePromoBanner = (id: string, field: keyof PromoBanner, value: any) => {
        setPromoBanners(promoBanners.map(b => b.id === id ? { ...b, [field]: value } : b));
    };

    // Image Upload
    const handleImageUpload = async (file: File, id: string, type: 'banner' | 'promo') => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const bucket = type === 'banner' ? 'banners' : 'promo-banners';

            const { error: uploadError } = await supabase.storage.from(bucket).upload(fileName, file);
            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);

            if (type === 'banner') {
                updateBanner(id, 'image_url', publicUrl);
            } else {
                updatePromoBanner(id, 'image_url', publicUrl);
            }
        } catch (error: any) {
            alert('فشل رفع الصورة: ' + error.message);
        }
    };

    // Build preview content with full banner arrays
    const previewContent = useMemo(() => {
        const items: { 
            type: string; 
            title: string; 
            active: boolean; 
            images?: string[]; 
            banners?: (Banner | PromoBanner)[];
            slotName?: string;
        }[] = [];

        // Main banners - include all active banners
        const activeBanners = banners.filter(b => b.active);
        if (activeBanners.length > 0) {
            items.push({
                type: 'main_banners',
                title: `البنرات الرئيسية`,
                active: true,
                images: activeBanners.map(b => b.image_url),
                banners: activeBanners
            });
        }

        // Sections with promo banners after each
        sections.forEach(section => {
            items.push({
                type: 'section',
                title: section.title || SECTION_TYPES[section.type]?.name || section.type,
                active: section.active
            });

            // Find promo banners for this section
            const slot = PROMO_SLOTS.find(s => s.afterSection === section.type);
            if (slot) {
                const slotPromos = promoBanners.filter(p => p.slot === slot.id && p.active);
                if (slotPromos.length > 0) {
                    items.push({
                        type: 'promo',
                        title: slot.name,
                        active: true,
                        images: slotPromos.map(p => p.image_url),
                        banners: slotPromos,
                        slotName: slot.name
                    });
                }
            }
        });

        // End slot promo banners
        const endPromos = promoBanners.filter(p => p.slot === 'slot_5' && p.active);
        if (endPromos.length > 0) {
            items.push({
                type: 'promo',
                title: 'نهاية الصفحة',
                active: true,
                images: endPromos.map(p => p.image_url),
                banners: endPromos,
                slotName: 'نهاية الصفحة'
            });
        }

        return items;
    }, [banners, sections, promoBanners]);

    // State for preview sliders
    const [previewSliderIndexes, setPreviewSliderIndexes] = useState<Record<string, number>>({});

    if (isLoading) {
        return (
            <>
                <Header title="الصفحة الرئيسية" />
                <div className="p-10 flex justify-center items-center min-h-[400px]">
                    <Loader2 className="animate-spin text-primary" size={40} />
                </div>
            </>
        );
    }

    return (
        <>
        <Header title="الصفحة الرئيسية" />
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-3 md:py-4 sticky top-0 z-10">
                <div className="flex justify-between items-center gap-3">
                    <div className="min-w-0">
                        <h1 className="text-lg md:text-2xl font-bold text-gray-800">الصفحة الرئيسية</h1>
                        <p className="text-xs md:text-sm text-gray-500 mt-0.5">إدارة محتوى الصفحة الرئيسية للتطبيق</p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-primary text-white px-3 py-2 md:px-6 md:py-2.5 rounded-lg flex items-center gap-1.5 md:gap-2 hover:bg-primary/90 disabled:opacity-50 font-medium shadow-sm text-xs md:text-base flex-shrink-0"
                    >
                        {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        <span className="hidden sm:inline">{isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}</span>
                        <span className="sm:hidden">{isSaving ? 'حفظ...' : 'حفظ'}</span>
                    </button>
                </div>
            </div>

            {/* Main Content - 3 Panels */}
            <div className="flex flex-col md:flex-row h-[calc(100vh-70px)] md:h-[calc(100vh-80px)]">
                {/* Panel Tabs */}
                <div className="flex md:flex-col md:w-16 bg-gray-100 border-b md:border-b-0 md:border-l border-gray-200 items-center justify-center md:justify-start px-2 py-2 md:py-4 gap-2">
                    <button
                        onClick={() => setActivePanel('preview')}
                        className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                            activePanel === 'preview' 
                                ? 'bg-primary text-white shadow-md' 
                                : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
                        }`}
                        title="المعاينة"
                    >
                        <Smartphone size={20} />
                        <span className="text-[10px]">معاينة</span>
                    </button>
                    <button
                        onClick={() => setActivePanel('sections')}
                        className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                            activePanel === 'sections' 
                                ? 'bg-primary text-white shadow-md' 
                                : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
                        }`}
                        title="الأقسام"
                    >
                        <Layers size={20} />
                        <span className="text-[10px]">الأقسام</span>
                    </button>
                    <button
                        onClick={() => setActivePanel('banners')}
                        className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                            activePanel === 'banners' 
                                ? 'bg-primary text-white shadow-md' 
                                : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
                        }`}
                        title="البنرات"
                    >
                        <ImagePlus size={20} />
                        <span className="text-[10px]">البنرات</span>
                    </button>
                </div>

                {/* Panel Content */}
                <div className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">
                    {/* Preview Panel */}
                    {activePanel === 'preview' && (
                        <div className="max-w-md mx-auto">
                            <div className="bg-white rounded-3xl shadow-xl border-8 border-gray-800 overflow-hidden">
                                {/* Phone Notch */}
                                <div className="bg-gray-800 h-6 flex justify-center items-end pb-1">
                                    <div className="w-20 h-4 bg-black rounded-b-xl"></div>
                                </div>
                                
                                {/* Phone Screen */}
                                <div className="bg-gray-100 min-h-[600px] max-h-[700px] overflow-y-auto">
                                    {/* Status Bar */}
                                    <div className="bg-white px-4 py-2 flex justify-between items-center text-xs text-gray-600 border-b">
                                        <span>9:41</span>
                                        <span className="font-bold text-primary">الأمل ماركت</span>
                                        <span>100%</span>
                                    </div>

                                    {/* Content Preview */}
                                    <div className="p-3 space-y-3">
                                        {previewContent.map((item, index) => {
                                            const sliderKey = `${item.type}_${index}`;
                                            const currentIndex = previewSliderIndexes[sliderKey] || 0;
                                            const images = item.images || [];
                                            const bannersCount = images.length;

                                            return (
                                                <div 
                                                    key={index}
                                                    className={`rounded-xl overflow-hidden transition-all ${
                                                        !item.active ? 'opacity-40' : ''
                                                    }`}
                                                >
                                                    {/* Main Banners with Slider */}
                                                    {item.type === 'main_banners' && (
                                                        <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-3 rounded-2xl border border-primary/20">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="text-xs font-bold text-primary">{item.title}</span>
                                                                <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">
                                                                    {bannersCount} بنر
                                                                </span>
                                                            </div>
                                                            
                                                            {/* Banner Slider */}
                                                            <div className="relative">
                                                                {images.length > 0 && images[currentIndex] ? (
                                                                    <img 
                                                                        src={images[currentIndex]} 
                                                                        alt="" 
                                                                        className="w-full h-36 object-cover rounded-xl shadow-md" 
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-36 bg-primary/10 rounded-xl flex items-center justify-center">
                                                                        <ImageIcon className="text-primary/40" size={40} />
                                                                    </div>
                                                                )}
                                                                
                                                                {/* Navigation Arrows */}
                                                                {bannersCount > 1 && (
                                                                    <>
                                                                        <button
                                                                            onClick={() => setPreviewSliderIndexes({
                                                                                ...previewSliderIndexes,
                                                                                [sliderKey]: (currentIndex - 1 + bannersCount) % bannersCount
                                                                            })}
                                                                            className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                                                                        >
                                                                            <ChevronUp className="rotate-[-90deg]" size={14} />
                                                                        </button>
                                                                        <button
                                                                            onClick={() => setPreviewSliderIndexes({
                                                                                ...previewSliderIndexes,
                                                                                [sliderKey]: (currentIndex + 1) % bannersCount
                                                                            })}
                                                                            className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                                                                        >
                                                                            <ChevronDown className="rotate-[-90deg]" size={14} />
                                                                        </button>
                                                                    </>
                                                                )}
                                                            </div>
                                                            
                                                            {/* Dots Indicator */}
                                                            {bannersCount > 1 && (
                                                                <div className="flex justify-center gap-1.5 mt-2">
                                                                    {images.map((_, dotIndex) => (
                                                                        <button
                                                                            key={dotIndex}
                                                                            onClick={() => setPreviewSliderIndexes({
                                                                                ...previewSliderIndexes,
                                                                                [sliderKey]: dotIndex
                                                                            })}
                                                                            className={`h-1.5 rounded-full transition-all ${
                                                                                dotIndex === currentIndex 
                                                                                    ? 'w-4 bg-primary' 
                                                                                    : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                                                                            }`}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            )}
                                                            
                                                            {/* Thumbnails Strip */}
                                                            {bannersCount > 1 && (
                                                                <div className="flex gap-1 mt-2 overflow-x-auto pb-1">
                                                                    {images.map((img, thumbIndex) => (
                                                                        <button
                                                                            key={thumbIndex}
                                                                            onClick={() => setPreviewSliderIndexes({
                                                                                ...previewSliderIndexes,
                                                                                [sliderKey]: thumbIndex
                                                                            })}
                                                                            className={`flex-shrink-0 w-12 h-8 rounded-md overflow-hidden border-2 transition-all ${
                                                                                thumbIndex === currentIndex 
                                                                                    ? 'border-primary shadow-md' 
                                                                                    : 'border-transparent opacity-60 hover:opacity-100'
                                                                            }`}
                                                                        >
                                                                            {img ? (
                                                                                <img src={img} alt="" className="w-full h-full object-cover" />
                                                                            ) : (
                                                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                                                    <ImageIcon size={12} className="text-gray-400" />
                                                                                </div>
                                                                            )}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Section */}
                                                    {item.type === 'section' && (
                                                        <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <div className="w-1 h-4 bg-primary rounded-full"></div>
                                                                <span className="font-bold text-gray-800 text-sm">{item.title}</span>
                                                            </div>
                                                            <div className="flex gap-2 overflow-hidden">
                                                                {[1, 2, 3].map(i => (
                                                                    <div key={i} className="w-20 h-24 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                                                                        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Promo Banners with Slider */}
                                                    {item.type === 'promo' && (
                                                        <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-xl border border-orange-200/50">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="text-xs font-bold text-orange-700">{item.slotName || item.title}</span>
                                                                <span className="text-[10px] bg-orange-200 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                                                                    {bannersCount} بنر
                                                                </span>
                                                            </div>
                                                            
                                                            {/* Promo Banner Slider */}
                                                            <div className="relative">
                                                                {images.length > 0 && images[currentIndex] ? (
                                                                    <img 
                                                                        src={images[currentIndex]} 
                                                                        alt="" 
                                                                        className="w-full h-24 object-cover rounded-lg shadow-sm" 
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-24 bg-orange-100 rounded-lg flex items-center justify-center">
                                                                        <ImageIcon className="text-orange-300" size={24} />
                                                                    </div>
                                                                )}
                                                                
                                                                {/* Navigation Arrows */}
                                                                {bannersCount > 1 && (
                                                                    <>
                                                                        <button
                                                                            onClick={() => setPreviewSliderIndexes({
                                                                                ...previewSliderIndexes,
                                                                                [sliderKey]: (currentIndex - 1 + bannersCount) % bannersCount
                                                                            })}
                                                                            className="absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors"
                                                                        >
                                                                            <ChevronUp className="rotate-[-90deg]" size={12} />
                                                                        </button>
                                                                        <button
                                                                            onClick={() => setPreviewSliderIndexes({
                                                                                ...previewSliderIndexes,
                                                                                [sliderKey]: (currentIndex + 1) % bannersCount
                                                                            })}
                                                                            className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors"
                                                                        >
                                                                            <ChevronDown className="rotate-[-90deg]" size={12} />
                                                                        </button>
                                                                    </>
                                                                )}
                                                            </div>
                                                            
                                                            {/* Dots Indicator */}
                                                            {bannersCount > 1 && (
                                                                <div className="flex justify-center gap-1 mt-2">
                                                                    {images.map((_, dotIndex) => (
                                                                        <button
                                                                            key={dotIndex}
                                                                            onClick={() => setPreviewSliderIndexes({
                                                                                ...previewSliderIndexes,
                                                                                [sliderKey]: dotIndex
                                                                            })}
                                                                            className={`h-1 rounded-full transition-all ${
                                                                                dotIndex === currentIndex 
                                                                                    ? 'w-3 bg-orange-500' 
                                                                                    : 'w-1 bg-orange-200 hover:bg-orange-300'
                                                                            }`}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            )}
                                                            
                                                            {/* Thumbnails for multiple banners */}
                                                            {bannersCount > 1 && (
                                                                <div className="flex gap-1 mt-2 overflow-x-auto pb-1">
                                                                    {images.map((img, thumbIndex) => (
                                                                        <button
                                                                            key={thumbIndex}
                                                                            onClick={() => setPreviewSliderIndexes({
                                                                                ...previewSliderIndexes,
                                                                                [sliderKey]: thumbIndex
                                                                            })}
                                                                            className={`flex-shrink-0 w-10 h-6 rounded overflow-hidden border-2 transition-all ${
                                                                                thumbIndex === currentIndex 
                                                                                    ? 'border-orange-500 shadow' 
                                                                                    : 'border-transparent opacity-50 hover:opacity-100'
                                                                            }`}
                                                                        >
                                                                            {img ? (
                                                                                <img src={img} alt="" className="w-full h-full object-cover" />
                                                                            ) : (
                                                                                <div className="w-full h-full bg-orange-100 flex items-center justify-center">
                                                                                    <ImageIcon size={10} className="text-orange-300" />
                                                                                </div>
                                                                            )}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}

                                        {previewContent.length === 0 && (
                                            <div className="text-center py-20 text-gray-400">
                                                <Smartphone size={48} className="mx-auto mb-3 opacity-50" />
                                                <p>لا يوجد محتوى للعرض</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Phone Bottom */}
                                <div className="bg-gray-800 h-4"></div>
                            </div>

                            <p className="text-center text-sm text-gray-500 mt-4">
                                معاينة حية للصفحة الرئيسية - اضغط على الأسهم أو النقاط للتنقل بين البنرات
                            </p>
                        </div>
                    )}

                    {/* Sections Panel */}
                    {activePanel === 'sections' && (
                        <div className="max-w-3xl mx-auto space-y-4">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 md:mb-6">
                                <div>
                                    <h2 className="text-base md:text-xl font-bold text-gray-800">أقسام الصفحة</h2>
                                    <p className="text-xs md:text-sm text-gray-500">رتب الأقسام واختر ما يظهر في الصفحة الرئيسية</p>
                                </div>
                                <button
                                    onClick={addCategorySection}
                                    disabled={categories.length === 0}
                                    className="bg-primary text-white px-3 py-2 md:px-4 md:py-2 rounded-lg flex items-center gap-1.5 md:gap-2 hover:bg-primary/90 disabled:opacity-50 text-xs md:text-base font-bold w-full sm:w-auto justify-center"
                                >
                                    <Plus size={18} />
                                    <span className="hidden sm:inline">إضافة قسم منتجات</span>
                                    <span className="sm:hidden">إضافة قسم</span>
                                </button>
                            </div>

                            <div className="space-y-2">
                                {sections.map((section, index) => (
                                    <div 
                                        key={section.id} 
                                        className={`bg-white rounded-xl border shadow-sm overflow-hidden ${
                                            section.type === 'category_products' 
                                                ? 'border-primary/30' 
                                                : 'border-gray-200'
                                        }`}
                                    >
                                        <div className="p-4 flex items-center gap-4">
                                            {/* Drag Handle & Move */}
                                            <div className="flex flex-col gap-1">
                                                <button
                                                    disabled={index === 0}
                                                    onClick={() => moveSection(index, 'up')}
                                                    className="p-1 text-gray-400 hover:text-primary disabled:opacity-30"
                                                >
                                                    <MoveUp size={16} />
                                                </button>
                                                <button
                                                    disabled={index === sections.length - 1}
                                                    onClick={() => moveSection(index, 'down')}
                                                    className="p-1 text-gray-400 hover:text-primary disabled:opacity-30"
                                                >
                                                    <MoveDown size={16} />
                                                </button>
                                            </div>

                                            {/* Order Number */}
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500">
                                                {index + 1}
                                            </div>

                                            {/* Section Info */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                                        section.type === 'category_products'
                                                            ? 'bg-primary/10 text-primary'
                                                            : 'bg-gray-100 text-gray-500'
                                                    }`}>
                                                        {SECTION_TYPES[section.type]?.name || section.type}
                                                    </span>
                                                    {!section.active && (
                                                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-500">مخفي</span>
                                                    )}
                                                </div>
                                                <input
                                                    type="text"
                                                    value={section.title}
                                                    onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                                                    className="font-bold text-gray-800 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary focus:outline-none w-full"
                                                    placeholder="عنوان القسم"
                                                />
                                                {SECTION_TYPES[section.type]?.description && (
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        {SECTION_TYPES[section.type].description}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => toggleSection(section.id)}
                                                    className={`p-2 rounded-lg transition-colors ${
                                                        section.active
                                                            ? 'bg-green-50 text-green-600'
                                                            : 'bg-gray-100 text-gray-400'
                                                    }`}
                                                >
                                                    {section.active ? <Eye size={18} /> : <EyeOff size={18} />}
                                                </button>

                                                {section.type === 'category_products' && (
                                                    <>
                                                        <button
                                                            onClick={() => setExpandedSections({
                                                                ...expandedSections,
                                                                [section.id]: !expandedSections[section.id]
                                                            })}
                                                            className="p-2 text-gray-400 hover:text-primary rounded-lg"
                                                        >
                                                            {expandedSections[section.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                                        </button>
                                                        <button
                                                            onClick={() => removeSection(section.id, section.isNew)}
                                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Expanded Content for category_products */}
                                        {section.type === 'category_products' && expandedSections[section.id] && (
                                            <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-gray-50">
                                                <label className="text-xs text-gray-500 block mb-2">اختر القسم</label>
                                                <select
                                                    value={section.category_id || ''}
                                                    onChange={(e) => updateSection(section.id, 'category_id', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
                                                >
                                                    <option value="">-- اختر قسم --</option>
                                                    {categories.map(cat => (
                                                        <option key={cat.id} value={cat.id}>
                                                            {cat.name_ar || cat.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {sections.length === 0 && (
                                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                                        <Layers className="mx-auto text-gray-300 mb-3" size={48} />
                                        <p className="text-gray-500">لا توجد أقسام</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Banners Panel */}
                    {activePanel === 'banners' && (
                        <div className="max-w-4xl mx-auto space-y-8">
                            {/* Main Banners */}
                            <div>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                                    <div>
                                        <h2 className="text-base md:text-xl font-bold text-gray-800">البنرات الرئيسية</h2>
                                        <p className="text-xs md:text-sm text-gray-500">تظهر في أعلى الصفحة كـ Slider</p>
                                    </div>
                                    <button
                                        onClick={addBanner}
                                        className="bg-primary text-white px-3 py-2 md:px-4 md:py-2 rounded-lg flex items-center gap-1.5 md:gap-2 hover:bg-primary/90 text-xs md:text-base font-bold w-full sm:w-auto justify-center"
                                    >
                                        <Plus size={18} />
                                        إضافة بنر
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {banners.map((banner) => (
                                        <div key={banner.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                                            {/* Image */}
                                            <div className="h-40 bg-gray-100 relative group cursor-pointer">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="absolute inset-0 opacity-0 z-10 cursor-pointer"
                                                    onChange={(e) => {
                                                        if (e.target.files?.[0]) handleImageUpload(e.target.files[0], banner.id, 'banner');
                                                    }}
                                                />
                                                {banner.image_url ? (
                                                    <>
                                                        <img src={banner.image_url} alt="" className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <span className="text-white font-medium">تغيير الصورة</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                                        <ImageIcon size={32} />
                                                        <span className="text-sm mt-2">اضغط لرفع صورة</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Controls */}
                                            <div className="p-3 flex items-center justify-between">
                                                <input
                                                    type="text"
                                                    value={banner.link || ''}
                                                    onChange={(e) => updateBanner(banner.id, 'link', e.target.value)}
                                                    placeholder="رابط التوجيه (اختياري)"
                                                    className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-1.5 ml-2"
                                                    style={{ direction: 'ltr' }}
                                                />
                                                <div className="flex gap-1">
                                                    <button
                                                        onClick={() => updateBanner(banner.id, 'active', !banner.active)}
                                                        className={`p-2 rounded-lg ${banner.active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}
                                                    >
                                                        {banner.active ? <Eye size={18} /> : <EyeOff size={18} />}
                                                    </button>
                                                    <button
                                                        onClick={() => removeBanner(banner.id, banner.isNew)}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {banners.length === 0 && (
                                        <div className="col-span-2 text-center py-12 bg-white rounded-xl border border-gray-200">
                                            <ImageIcon className="mx-auto text-gray-300 mb-3" size={48} />
                                            <p className="text-gray-500">لا توجد بنرات رئيسية</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Promo Banners */}
                            <div>
                                <div className="mb-4">
                                    <h2 className="text-base md:text-xl font-bold text-gray-800">البنرات الترويجية</h2>
                                    <p className="text-xs md:text-sm text-gray-500">تظهر بين أقسام الصفحة الرئيسية</p>
                                </div>

                                <div className="space-y-3">
                                    {PROMO_SLOTS.map((slot) => {
                                        const slotBanners = promoBanners.filter(b => b.slot === slot.id);
                                        const isExpanded = expandedSlots[slot.id];

                                        return (
                                            <div key={slot.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                                <div 
                                                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                                                    onClick={() => setExpandedSlots({ ...expandedSlots, [slot.id]: !isExpanded })}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                                            slotBanners.length > 0 ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'
                                                        }`}>
                                                            <ImagePlus size={20} />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-gray-800">{slot.name}</h3>
                                                            <p className="text-xs text-gray-500">
                                                                {slotBanners.length > 0 ? `${slotBanners.length} بنر` : 'لا توجد بنرات'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); addPromoBanner(slot.id); }}
                                                            className="p-2 text-primary hover:bg-primary/10 rounded-lg"
                                                        >
                                                            <Plus size={18} />
                                                        </button>
                                                        {isExpanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                                                    </div>
                                                </div>

                                                {isExpanded && slotBanners.length > 0 && (
                                                    <div className="border-t border-gray-100 p-4 bg-gray-50 space-y-3">
                                                        {slotBanners.map((promo) => (
                                                            <div key={promo.id} className="flex gap-3 bg-white p-3 rounded-lg border border-gray-200">
                                                                {/* Image */}
                                                                <div className="w-24 h-16 bg-gray-100 rounded-lg overflow-hidden relative group cursor-pointer flex-shrink-0">
                                                                    <input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        className="absolute inset-0 opacity-0 z-10 cursor-pointer"
                                                                        onChange={(e) => {
                                                                            if (e.target.files?.[0]) handleImageUpload(e.target.files[0], promo.id, 'promo');
                                                                        }}
                                                                    />
                                                                    {promo.image_url ? (
                                                                        <img src={promo.image_url} alt="" className="w-full h-full object-cover" />
                                                                    ) : (
                                                                        <div className="flex items-center justify-center h-full text-gray-400">
                                                                            <ImageIcon size={20} />
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Fields */}
                                                                <div className="flex-1 flex items-center gap-3">
                                                                    <select
                                                                        value={promo.size}
                                                                        onChange={(e) => updatePromoBanner(promo.id, 'size', e.target.value)}
                                                                        className="text-sm border border-gray-200 rounded-lg px-2 py-1.5"
                                                                    >
                                                                        {BANNER_SIZES.map(size => (
                                                                            <option key={size.id} value={size.id}>{size.name}</option>
                                                                        ))}
                                                                    </select>
                                                                    <input
                                                                        type="text"
                                                                        value={promo.link || ''}
                                                                        onChange={(e) => updatePromoBanner(promo.id, 'link', e.target.value)}
                                                                        placeholder="رابط"
                                                                        className="flex-1 text-sm border border-gray-200 rounded-lg px-2 py-1.5"
                                                                        style={{ direction: 'ltr' }}
                                                                    />
                                                                </div>

                                                                {/* Actions */}
                                                                <div className="flex items-center gap-1">
                                                                    <button
                                                                        onClick={() => updatePromoBanner(promo.id, 'active', !promo.active)}
                                                                        className={`p-2 rounded-lg ${promo.active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}
                                                                    >
                                                                        {promo.active ? <Eye size={16} /> : <EyeOff size={16} />}
                                                                    </button>
                                                                    <button
                                                                        onClick={() => removePromoBanner(promo.id, promo.isNew)}
                                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                                                    >
                                                                        <Trash2 size={16} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {isExpanded && slotBanners.length === 0 && (
                                                    <div className="border-t border-gray-100 p-6 bg-gray-50 text-center text-gray-400">
                                                        <p className="text-sm">لا توجد بنرات في هذا الموضع</p>
                                                        <button
                                                            onClick={() => addPromoBanner(slot.id)}
                                                            className="mt-2 text-primary text-sm font-medium hover:underline"
                                                        >
                                                            + إضافة بنر
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}

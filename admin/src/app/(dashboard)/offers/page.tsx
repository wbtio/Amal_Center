'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { BadgePlus, Search, Tags, CalendarClock, Percent, TimerOff, SquarePen, Trash2, EyeIcon, EyeOff, SlidersHorizontal, CircleDot, Inbox, CalendarDays, CircleCheck, ShieldAlert } from 'lucide-react';
import { format, formatDistanceToNow, isPast, isFuture } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Header } from '@/components/layout/Header';

interface Offer {
  id: string;
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  image_url: string;
  created_at: string;
  product_count?: number;
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'upcoming' | 'expired'>('all');

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);

      // Fetch offers with product count
      const { data: offersData, error } = await supabase
        .from('offers')
        .select(`
          *,
          offer_products(count)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const offersWithCount = (offersData || []).map(offer => ({
        ...offer,
        product_count: offer.offer_products?.[0]?.count || 0
      }));

      setOffers(offersWithCount);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleOfferStatus = async (offerId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('offers')
        .update({ is_active: !currentStatus, updated_at: new Date().toISOString() })
        .eq('id', offerId);

      if (error) throw error;

      setOffers(prev => prev.map(offer =>
        offer.id === offerId ? { ...offer, is_active: !currentStatus } : offer
      ));
    } catch (error) {
      console.error('Error toggling offer status:', error);
    }
  };

  const deleteOffer = async (offerId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا العرض؟')) return;

    try {
      const { error } = await supabase
        .from('offers')
        .delete()
        .eq('id', offerId);

      if (error) throw error;

      setOffers(prev => prev.filter(offer => offer.id !== offerId));
    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  };

  const getOfferStatus = (offer: Offer) => {
    const now = new Date();
    const startDate = new Date(offer.start_date);
    const endDate = new Date(offer.end_date);

    if (!offer.is_active) {
      return { label: 'غير مفعل', color: 'bg-gray-50 text-gray-600 border border-gray-100', icon: EyeOff };
    }
    if (isPast(endDate)) {
      return { label: 'منتهي', color: 'bg-red-50 text-red-600 border border-red-100', icon: TimerOff };
    }
    if (isFuture(startDate)) {
      return { label: 'قادم', color: 'bg-blue-50 text-blue-600 border border-blue-100', icon: CalendarClock };
    }
    return { label: 'نشط', color: 'bg-emerald-50 text-emerald-600 border border-emerald-100', icon: CircleDot };
  };

  const getTimeRemaining = (endDate: string) => {
    const end = new Date(endDate);
    if (isPast(end)) return 'انتهى';
    return formatDistanceToNow(end, { locale: ar, addSuffix: true });
  };

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.name_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.name.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    const now = new Date();
    const startDate = new Date(offer.start_date);
    const endDate = new Date(offer.end_date);

    switch (filterStatus) {
      case 'active':
        return offer.is_active && !isPast(endDate) && !isFuture(startDate);
      case 'upcoming':
        return offer.is_active && isFuture(startDate);
      case 'expired':
        return isPast(endDate);
      default:
        return true;
    }
  });

  const formatIQD = (amount: number) => {
    return new Intl.NumberFormat('ar-IQ', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount) + ' د.ع';
  };

  if (loading) {
    return (
      <>
        <Header title="إدارة العروض" />
        <div className="p-3 sm:p-4 md:p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="إدارة العروض" />
      <div className="p-3 sm:p-4 md:p-6" dir="rtl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 md:mb-6">
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-gray-800">إدارة العروض</h1>
            <p className="text-xs md:text-sm text-gray-500 mt-0.5">إنشاء وإدارة العروض الخاصة والخصومات</p>
          </div>
          <Link
            href="/offers/new"
            className="flex items-center gap-1.5 md:gap-2 bg-primary text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-primary/90 transition-colors text-xs md:text-base font-bold shadow-md w-full sm:w-auto justify-center"
          >
            <BadgePlus size={18} />
            <span className="hidden sm:inline">إضافة عرض جديد</span>
            <span className="sm:hidden">إضافة عرض</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 md:p-3 bg-primary/10 rounded-lg">
                <Tags className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-lg md:text-2xl font-bold text-gray-800">{offers.length}</p>
                <p className="text-[10px] md:text-sm text-gray-500">إجمالي العروض</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 md:p-3 bg-green-100 rounded-lg">
                <EyeIcon className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-lg md:text-2xl font-bold text-gray-800">
                  {offers.filter(o => o.is_active && !isPast(new Date(o.end_date)) && !isFuture(new Date(o.start_date))).length}
                </p>
                <p className="text-[10px] md:text-sm text-gray-500">عروض نشطة</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 md:p-3 bg-blue-100 rounded-lg">
                <CalendarClock className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-lg md:text-2xl font-bold text-gray-800">
                  {offers.filter(o => o.is_active && isFuture(new Date(o.start_date))).length}
                </p>
                <p className="text-[10px] md:text-sm text-gray-500">عروض قادمة</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 md:p-3 bg-red-100 rounded-lg">
                <TimerOff className="text-red-600" size={20} />
              </div>
              <div>
                <p className="text-lg md:text-2xl font-bold text-gray-800">
                  {offers.filter(o => isPast(new Date(o.end_date))).length}
                </p>
                <p className="text-[10px] md:text-sm text-gray-500">عروض منتهية</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 md:p-4 mb-4 md:mb-6">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="البحث عن عرض..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              />
            </div>
            <div className="flex gap-1.5 md:gap-2 overflow-x-auto">
              {(['all', 'active', 'upcoming', 'expired'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${filterStatus === status
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {status === 'all' ? 'الكل' :
                    status === 'active' ? 'نشط' :
                      status === 'upcoming' ? 'قادم' : 'منتهي'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Offers List */}
        {filteredOffers.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12 text-center">
            <Tags className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد عروض</h3>
            <p className="text-gray-400 mb-4">ابدأ بإنشاء عرض جديد لجذب المزيد من العملاء</p>
            <Link
              href="/offers/new"
              className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <BadgePlus size={20} />
              <span>إضافة عرض جديد</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {filteredOffers.map((offer) => {
              const status = getOfferStatus(offer);
              const StatusIcon = status.icon;

              return (
                <div
                  key={offer.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Offer Image or Gradient */}
                  <div className="h-32 bg-gradient-to-br from-primary/80 to-primary relative">
                    {offer.image_url && (
                      <img
                        src={offer.image_url}
                        alt={offer.name_ar}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${status.color}`}>
                        <StatusIcon size={14} />
                        {status.label}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-primary">
                        {offer.discount_type === 'percentage'
                          ? `${offer.discount_value}% خصم`
                          : `${formatIQD(offer.discount_value)} خصم`
                        }
                      </span>
                    </div>
                  </div>

                  {/* Offer Details */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-lg mb-1">{offer.name_ar}</h3>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{offer.description_ar || 'بدون وصف'}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <CalendarDays size={16} />
                        <span>يبدأ: {format(new Date(offer.start_date), 'yyyy/MM/dd HH:mm')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <TimerOff size={16} />
                        <span>ينتهي: {getTimeRemaining(offer.end_date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Tags size={16} />
                        <span>{offer.product_count || 0} منتج</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                      <Link
                        href={`/offers/${offer.id}`}
                        className="flex-1 text-center py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
                      >
                        <SquarePen size={16} className="inline ml-1" />
                        تعديل
                      </Link>
                      <button
                        onClick={() => toggleOfferStatus(offer.id, offer.is_active)}
                        className={`p-2 rounded-lg transition-colors ${offer.is_active
                          ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-600 hover:bg-green-200'
                          }`}
                        title={offer.is_active ? 'تعطيل' : 'تفعيل'}
                      >
                        {offer.is_active ? <EyeOff size={16} /> : <EyeIcon size={16} />}
                      </button>
                      <button
                        onClick={() => deleteOffer(offer.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        title="حذف"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

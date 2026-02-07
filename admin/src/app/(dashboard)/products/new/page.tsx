'use client';

import { useState } from 'react';
import { ArrowRight, Sparkles, Edit3 } from 'lucide-react';
import Link from 'next/link';
import ManualProductForm from '@/components/products/ManualProductForm';
import AIProductForm from '@/components/products/AIProductForm';
import { Header } from '@/components/layout/Header';

export default function NewProductPage() {
  const [selectedMode, setSelectedMode] = useState<'manual' | 'ai' | null>(null);

  if (selectedMode === 'manual') {
    return (
      <>
        <Header title="إضافة منتج جديد" />
        <ManualProductForm onBack={() => setSelectedMode(null)} />
      </>
    );
  }

  if (selectedMode === 'ai') {
    return (
      <>
        <Header title="إضافة منتج جديد" />
        <AIProductForm onBack={() => setSelectedMode(null)} />
      </>
    );
  }

  return (
    <>
    <Header title="إضافة منتج جديد" />
    <div className="p-3 sm:p-4 md:p-6">
      <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-6">
        <Link href="/products" className="p-1.5 md:p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
          <ArrowRight size={20} className="text-gray-600" />
        </Link>
        <h1 className="text-lg md:text-2xl font-bold text-gray-800">إضافة منتج جديد</h1>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-base md:text-xl font-bold text-gray-800 mb-1 md:mb-2">اختر طريقة الإضافة</h2>
          <p className="text-xs md:text-base text-gray-600">يمكنك إضافة المنتج يدوياً أو باستخدام الذكاء الاصطناعي</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* AI Mode */}
          <button
            onClick={() => setSelectedMode('ai')}
            className="group relative bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-5 md:p-8 text-white hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute top-4 right-4">
              <span className="bg-yellow-400 text-purple-900 text-xs font-bold px-3 py-1 rounded-full">جديد</span>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-white/20 p-4 rounded-full group-hover:bg-white/30 transition-colors">
                <Sparkles size={48} />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-2">إضافة ذكية</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  صور المنتج فقط وسيقوم الذكاء الاصطناعي باستخراج جميع المعلومات تلقائياً
                </p>
              </div>

              <div className="bg-white/10 rounded-lg p-4 w-full text-right text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-300">✓</span>
                  <span>استخراج الاسم والوصف تلقائياً</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-300">✓</span>
                  <span>تحديد القسم المناسب</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-300">✓</span>
                  <span>إزالة خلفية الصورة</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-300">✓</span>
                  <span>سريع وسهل</span>
                </div>
              </div>

              <div className="mt-4 bg-white text-purple-600 px-6 py-3 rounded-lg font-bold group-hover:bg-purple-50 transition-colors">
                ابدأ الآن
              </div>
            </div>
          </button>

          {/* Manual Mode */}
          <button
            onClick={() => setSelectedMode('manual')}
            className="group relative bg-white border-2 border-gray-200 rounded-2xl p-5 md:p-8 hover:border-primary hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-gray-100 p-4 rounded-full group-hover:bg-primary/10 transition-colors">
                <Edit3 size={48} className="text-gray-600 group-hover:text-primary transition-colors" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">إضافة يدوية</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  أدخل جميع معلومات المنتج بنفسك بشكل تفصيلي
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 w-full text-right text-sm space-y-2 text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  <span>تحكم كامل في البيانات</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  <span>إدخال يدوي للاسم والوصف</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  <span>اختيار القسم يدوياً</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  <span>رفع الصورة مباشرة</span>
                </div>
              </div>

              <div className="mt-4 bg-primary text-white px-6 py-3 rounded-lg font-bold group-hover:bg-green-700 transition-colors">
                ابدأ الآن
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

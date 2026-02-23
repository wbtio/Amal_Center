'use client';

import { useState } from 'react';
import { ArrowRight, Wand2, PenLine, Camera, Type, Layers, Eraser, Zap, Settings2, Keyboard, Grid3X3, Upload, TriangleAlert, CircleCheck } from 'lucide-react';
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
          <Link href="/products" className="p-1.5 md:p-2 hover:bg-gray-100 rounded-xl transition-colors flex-shrink-0">
            <ArrowRight size={20} className="text-gray-600" />
          </Link>
          <h1 className="text-lg md:text-2xl font-bold text-gray-800">إضافة منتج جديد</h1>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-base md:text-xl font-bold text-gray-800 mb-1 md:mb-2">اختر طريقة الإضافة</h2>
            <p className="text-xs md:text-base text-gray-600">يمكنك إضافة المنتج يدوياً أو باستخدام الإضافة السريعة بالذكاء الاصطناعي</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* AI Mode */}
            <button
              onClick={() => setSelectedMode('ai')}
              className="group relative bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl p-5 md:p-8 text-white hover:shadow-2xl hover:shadow-purple-200 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="absolute top-4 right-4">
                <span className="bg-amber-400 text-purple-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Zap size={12} />
                  جديد
                </span>
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-white/20 p-4 rounded-2xl group-hover:bg-white/30 transition-colors backdrop-blur-sm">
                  <Wand2 size={48} />
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-2">الإضافة السريعة</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    صوّر المنتج فقط وسيقوم الذكاء الاصطناعي باستخراج جميع المعلومات تلقائياً
                  </p>
                </div>

                <div className="bg-white/10 rounded-xl p-4 w-full text-right text-sm space-y-3 backdrop-blur-sm">
                  <p className="text-white/80 font-semibold text-xs mb-1 text-center flex items-center justify-center gap-1.5">
                    <TriangleAlert size={14} />
                    تعليمات مهمة قبل الاستخدام
                  </p>
                  <div className="flex items-start gap-2">
                    <TriangleAlert size={14} className="text-amber-300 mt-0.5 flex-shrink-0" />
                    <span>يجب أن يكون مقاس الصورة <strong>1:1</strong> (مربعة)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <TriangleAlert size={14} className="text-amber-300 mt-0.5 flex-shrink-0" />
                    <span>الصورة يجب أن تحتوي على <strong>منتج واحد فقط</strong></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Camera size={14} className="text-amber-300 mt-0.5 flex-shrink-0" />
                    <span>تأكد من وضوح المنتج وحدة الإضاءة في الصورة</span>
                  </div>
                  <div className="border-t border-white/20 pt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <CircleCheck size={14} className="text-emerald-300 flex-shrink-0" />
                      <span>استخراج الاسم والوصف والسعر تلقائياً</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CircleCheck size={14} className="text-emerald-300 flex-shrink-0" />
                      <span>تحديد القسم المناسب</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CircleCheck size={14} className="text-emerald-300 flex-shrink-0" />
                      <span>إزالة خلفية الصورة</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CircleCheck size={14} className="text-emerald-300 flex-shrink-0" />
                      <span>سريع وسهل</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-white text-purple-600 px-6 py-3 rounded-xl font-bold group-hover:bg-purple-50 transition-colors shadow-lg">
                  ابدأ الآن
                </div>
              </div>
            </button>

            {/* Manual Mode */}
            <button
              onClick={() => setSelectedMode('manual')}
              className="group relative bg-white border-2 border-gray-200 rounded-2xl p-5 md:p-8 hover:border-primary hover:shadow-xl hover:shadow-emerald-100 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-gray-100 p-4 rounded-2xl group-hover:bg-primary/10 transition-colors">
                  <PenLine size={48} className="text-gray-600 group-hover:text-primary transition-colors" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">إضافة يدوية</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    أدخل جميع معلومات المنتج بنفسك بشكل تفصيلي
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 w-full text-right text-sm space-y-2 text-gray-700">
                  <div className="flex items-center gap-2">
                    <Settings2 size={14} className="text-primary flex-shrink-0" />
                    <span>تحكم كامل في البيانات</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Keyboard size={14} className="text-primary flex-shrink-0" />
                    <span>إدخال يدوي للاسم والوصف</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Grid3X3 size={14} className="text-primary flex-shrink-0" />
                    <span>اختيار القسم يدوياً</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Upload size={14} className="text-primary flex-shrink-0" />
                    <span>رفع الصورة مباشرة</span>
                  </div>
                </div>

                <div className="mt-4 bg-primary text-white px-6 py-3 rounded-xl font-bold group-hover:bg-green-700 transition-colors shadow-lg">
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


'use client';

import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { supabase } from '@/lib/supabase';
import { FileUp, Loader2, X, CheckCircle2, AlertCircle, Download } from 'lucide-react';

interface ExcelProduct {
  name_ar: string;
  name_en: string;
  category: string;
  price: number;
  stock: number;
  image_url: string;
  description_ar?: string;
  description_en?: string;
}

interface ImportStatus {
  total: number;
  current: number;
  success: number;
  errors: string[];
  isImporting: boolean;
}

export default function ExcelUploadModal({ 
  onClose, 
  onSuccess,
  categories 
}: { 
  onClose: () => void; 
  onSuccess: () => void;
  categories: any[];
}) {
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<ExcelProduct[]>([]);
  const [status, setStatus] = useState<ImportStatus>({
    total: 0,
    current: 0,
    success: 0,
    errors: [],
    isImporting: false
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const isCSV = selectedFile.name.endsWith('.csv');
      parseFile(selectedFile, isCSV);
    }
  };

  const parseFile = (file: File, isCSV: boolean) => {
    const reader = new FileReader();
    
    if (isCSV) {
      reader.onload = (e) => {
        let text = e.target?.result as string;
        // Remove UTF-8 BOM if present
        if (text.charCodeAt(0) === 0xFEFF) {
          text = text.substring(1);
        }
        const workbook = XLSX.read(text, { type: 'string', codepage: 65001 });
        processWorkbook(workbook);
      };
      reader.readAsText(file, 'UTF-8');
    } else {
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        processWorkbook(workbook);
      };
      reader.readAsBinaryString(file);
    }
  };

  const processWorkbook = (workbook: XLSX.WorkBook) => {
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(worksheet) as any[];
    console.log('Raw JSON from file:', json[0]);

    const formattedData: ExcelProduct[] = json.map((item, index) => {
      const rowNum = index + 2;
      
      const getValue = (keys: string[]) => {
        const foundKey = Object.keys(item).find(k => {
          const cleanKey = k.trim().replace(/^\uFEFF/, '');
          return keys.some(key => key === cleanKey || key.toLowerCase() === cleanKey.toLowerCase());
        });
        return foundKey ? item[foundKey] : null;
      };

      const name_ar = String(getValue(['اسم المنتج', 'الاسم بالعربي', 'name_ar', 'Name', 'product_name']) || '').trim();
      const name_en = String(getValue(['الاسم بالانجليزي', 'name_en', 'English Name']) || name_ar).trim();
      
      const rawPrice = getValue(['السعر', 'price', 'Price']);
      // Clean price: remove currency, symbols, and keep only numbers
      const cleanPrice = typeof rawPrice === 'string' 
        ? rawPrice.replace(/[^\d.]/g, '') 
        : rawPrice;
      const price = parseFloat(cleanPrice || 0);

      const image_url = getValue(['رابط الصورة', 'رابط الصوره', 'image_url', 'Image URL', 'image']);
      const category = String(getValue(['القسم', 'category', 'Category']) || 'عام').trim();
      
      const rawStock = getValue(['الكمية', 'stock', 'Stock', 'quantity']);
      const cleanStock = typeof rawStock === 'string' 
        ? rawStock.replace(/[^\d]/g, '') 
        : rawStock;
      const stock = parseInt(cleanStock || 100);

      if (!name_ar) {
        console.error(`Row ${rowNum} details:`, item);
      }

      return {
        name_ar: name_ar,
        name_en: name_en,
        category: String(category).trim(),
        price: isNaN(price) ? 0 : price,
        stock: isNaN(stock) ? 100 : stock,
        image_url: image_url || '',
        description_ar: String(getValue(['الوصف بالعربي', 'description_ar']) || '').trim(),
        description_en: String(getValue(['الوصف بالانجليزي', 'description_en']) || '').trim(),
      };
    });

    setPreviewData(formattedData);
  };

  const downloadImageAndUpload = async (url: string, productName: string) => {
    try {
      // 1. Safe filename: remove Arabic characters and special symbols for Supabase Storage
      const fileExt = url.split('.').pop()?.split('?')[0] || 'jpg';
      const safeName = Math.random().toString(36).substring(2, 10);
      const fileName = `${Date.now()}-${safeName}.${fileExt}`;
      const filePath = `products/${fileName}`;

      // 2. Try download with proxy for CORS
      let response;
      try {
        const proxyUrl = `https://images.weserv.nl/?url=${encodeURIComponent(url)}&output=webp`;
        response = await fetch(proxyUrl);
      } catch (e) {
        console.error('Fetch error:', e);
        return null;
      }

      if (!response.ok) throw new Error('فشل تحميل الصورة من الرابط');
      const blob = await response.blob();
      
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, blob, {
          contentType: blob.type || 'image/jpeg',
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error processing image:', error);
      return null;
    }
  };

  const handleStartImport = async () => {
    if (previewData.length === 0) return;

    setStatus({
      ...status,
      total: previewData.length,
      isImporting: true,
      current: 0,
      success: 0,
      errors: []
    });

    for (let i = 0; i < previewData.length; i++) {
      const product = previewData[i];
      setStatus(prev => ({ ...prev, current: i + 1 }));

      try {
        // 1. Find category ID
        const categoryName = product.category.trim();
        const categoryObj = categories.find(c => {
          const nameAr = String(c.name_ar || '').trim();
          const nameEn = String(c.name || '').trim();
          return nameAr === categoryName || nameEn === categoryName;
        });

        if (!categoryObj) {
          console.warn(`القسم "${categoryName}" غير موجود في قاعدة البيانات. سيتم وضعه في قسم "عام"`);
        }

        const finalCategoryId = categoryObj?.id || categories.find(c => c.name_ar === 'عام' || c.name === 'عام')?.id || categories[0]?.id;

        // 2. Check if product already exists
        const { data: existingProduct } = await supabase
          .from('products')
          .select('id, name_ar, name')
          .or(`name_ar.eq.${product.name_ar},name.eq.${product.name_en || product.name_ar}`)
          .limit(1)
          .single();

        if (existingProduct) {
          throw new Error(`المنتج موجود مسبقاً (${existingProduct.name_ar})`);
        }

        // 3. Process image
        let finalImageUrl = null;
        if (product.image_url) {
          finalImageUrl = await downloadImageAndUpload(product.image_url, product.name_en || product.name_ar);
        }

        // 4. Insert into Supabase
        const { error } = await supabase.from('products').insert({
          name_ar: product.name_ar,
          name: product.name_en || product.name_ar,
          description_ar: product.description_ar || '',
          description: product.description_en || product.description_ar || '',
          price_iqd: Math.round(product.price),
          price_usd: parseFloat((product.price / 1500).toFixed(2)),
          category_id: finalCategoryId,
          stock_quantity: Math.max(0, product.stock),
          image_url: finalImageUrl,
          is_active: true
        });

        if (error) throw error;

        setStatus(prev => ({ ...prev, success: prev.success + 1 }));
      } catch (err: any) {
        setStatus(prev => ({ 
          ...prev, 
          errors: [...prev.errors, `المنتج (${product.name_ar}): ${err.message}`] 
        }));
      }
    }

    setStatus(prev => ({ ...prev, isImporting: false }));
    if (status.success > 0) {
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">رفع المنتجات من Excel</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {!file ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-gray-50 transition-all"
            >
              <FileUp size={48} className="text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-700">اختر ملف Excel أو CSV</p>
              <p className="text-sm text-gray-500 mt-2">اسحب الملف هنا أو اضغط للاختيار (.xlsx, .csv)</p>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".xlsx, .xls, .csv"
                className="hidden" 
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center gap-3">
                  <FileUp className="text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">{file.name}</p>
                    <p className="text-sm text-blue-700">{previewData.length} منتج مكتشف</p>
                  </div>
                </div>
                <button 
                  onClick={() => { setFile(null); setPreviewData([]); }}
                  className="text-sm font-bold text-blue-600 hover:underline"
                >
                  تغيير الملف
                </button>
              </div>

              {status.isImporting && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>جاري الرفع... {status.current} من {status.total}</span>
                    <span>{Math.round((status.current / status.total) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${(status.current / status.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {status.errors.length > 0 && (
                <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-red-700 mb-2">
                    <AlertCircle size={18} />
                    <span className="font-bold">حدثت أخطاء ({status.errors.length}):</span>
                  </div>
                  <ul className="text-sm text-red-600 space-y-1 max-h-32 overflow-y-auto">
                    {status.errors.map((err, idx) => (
                      <li key={idx}>• {err}</li>
                    ))}
                  </ul>
                </div>
              )}

              {!status.isImporting && status.total > 0 && status.current === status.total && (
                <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-center gap-3 text-green-700">
                  <CheckCircle2 size={24} />
                  <div>
                    <p className="font-bold">اكتملت العملية بنجاح!</p>
                    <p className="text-sm">تم رفع {status.success} منتج بنجاح.</p>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full text-right text-sm">
                  <thead className="bg-gray-50 text-gray-600 font-medium">
                    <tr>
                      <th className="px-4 py-2">الاسم (عربي)</th>
                      <th className="px-4 py-2">القسم</th>
                      <th className="px-4 py-2">السعر</th>
                      <th className="px-4 py-2">الكمية</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {previewData.slice(0, 5).map((p, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2">{p.name_ar}</td>
                        <td className="px-4 py-2">{p.category}</td>
                        <td className="px-4 py-2 font-bold text-primary">{p.price} د.ع</td>
                        <td className="px-4 py-2">{p.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {previewData.length > 5 && (
                  <p className="p-2 text-center text-xs text-gray-500 bg-gray-50">
                    وغيرها من المنتجات...
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-between bg-gray-50">
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <span>تحتاج مساعدة؟</span>
            <button className="text-primary hover:underline font-medium">تحميل قالب Excel</button>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg font-medium hover:bg-white transition-colors"
            >
              إلغاء
            </button>
            <button 
              disabled={!file || status.isImporting || (status.total > 0 && status.current === status.total)}
              onClick={handleStartImport}
              className="px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {status.isImporting ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
              <span>بدء الرفع</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

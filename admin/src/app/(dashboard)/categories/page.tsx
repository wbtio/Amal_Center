'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { FolderPlus, SquarePen, Trash2, MoveUp, MoveDown, ImageOff, ImagePlus, LinkIcon, Loader2, GripVertical, X } from 'lucide-react';
import { format } from 'date-fns';
import { Header } from '@/components/layout/Header';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', name_ar: '', image_url: '', parent_id: '' });
  const [editFormData, setEditFormData] = useState({ name: '', name_ar: '', image_url: '', is_active: true, parent_id: '' });
  const [mainCategories, setMainCategories] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [editUploading, setEditUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [editUrlInput, setEditUrlInput] = useState('');
  const [uploadTab, setUploadTab] = useState<'file' | 'url'>('file');
  const [editUploadTab, setEditUploadTab] = useState<'file' | 'url'>('file');

  useEffect(() => {
    fetchCategories();
    fetchMainCategories();
  }, []);

  const fetchMainCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .is('parent_id', null)
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (!error) {
      setMainCategories(data || []);
    }
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true }); // Ordered by sort_order

    if (!error) {
      setCategories(data || []);
    }
    setLoading(false);
  };

  const processUrlImage = async (url: string, isEdit: boolean) => {
    if (!url) return;

    const setUploadingState = isEdit ? setEditUploading : setUploading;

    setUploadingState(true);
    try {
      const res = await fetch('/api/proxy-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) throw new Error('Failed to fetch image');

      const blob = await res.blob();
      const fileExt = blob.type.split('/')[1] || 'png';
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('categories')
        .upload(fileName, blob, {
          contentType: blob.type
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('categories')
        .getPublicUrl(fileName);

      if (isEdit) {
        setEditFormData(prev => ({ ...prev, image_url: publicUrl }));
        setEditUrlInput('');
      } else {
        setFormData(prev => ({ ...prev, image_url: publicUrl }));
        setUrlInput('');
      }

    } catch (error) {
      console.error('Error processing URL:', error);
      alert('فشل تحميل الصورة من الرابط. تأكد من صحة الرابط.');
    } finally {
      setUploadingState(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    if (file.type !== 'image/png') {
      alert('يرجى اختيار صورة بصيغة PNG فقط');
      return;
    }

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('categories')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('categories')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('حدث خطأ أثناء رفع الصورة');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get max sort_order to append to end
    const maxSortOrder = categories.length > 0 ? Math.max(...categories.map(c => c.sort_order || 0)) : 0;

    const { error } = await supabase.from('categories').insert([
      {
        name: formData.name,
        name_ar: formData.name_ar,
        image_url: formData.image_url || null,
        parent_id: formData.parent_id || null,
        is_active: true,
        sort_order: maxSortOrder + 1
      }
    ]);

    if (!error) {
      setIsModalOpen(false);
      setFormData({ name: '', name_ar: '', image_url: '', parent_id: '' });
      setUploadTab('file');
      setUrlInput('');
      fetchMainCategories();
      fetchCategories();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا القسم؟')) {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (!error) {
        setCategories(categories.filter(c => c.id !== id));
      }
    }
  };

  const openEditModal = (category: any) => {
    setEditingCategory(category);
    setEditFormData({
      name: category.name || '',
      name_ar: category.name_ar || '',
      image_url: category.image_url || '',
      is_active: category.is_active ?? true,
      parent_id: category.parent_id || ''
    });
    setEditUploadTab('file');
    setEditUrlInput('');
    setIsEditModalOpen(true);
  };

  const handleEditImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    if (file.type !== 'image/png') {
      alert('يرجى اختيار صورة بصيغة PNG فقط');
      return;
    }

    setEditUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('categories')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('categories')
        .getPublicUrl(filePath);

      setEditFormData({ ...editFormData, image_url: publicUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('حدث خطأ أثناء رفع الصورة');
    } finally {
      setEditUploading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    const { error } = await supabase
      .from('categories')
      .update({
        name: editFormData.name,
        name_ar: editFormData.name_ar,
        image_url: editFormData.image_url || null,
        is_active: editFormData.is_active,
        parent_id: editFormData.parent_id || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', editingCategory.id);

    if (!error) {
      setIsEditModalOpen(false);
      setEditingCategory(null);
      fetchCategories();
      fetchMainCategories();
    } else {
      alert('حدث خطأ أثناء التحديث');
    }
  };

  const moveCategory = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === categories.length - 1)
    ) {
      return;
    }

    const newCategories = [...categories];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    // Swap in local state for instant feedback
    [newCategories[index], newCategories[targetIndex]] = [newCategories[targetIndex], newCategories[index]];
    setCategories(newCategories);

    try {
      // Re-normalize all to ensure consistent 0-based indexing
      // This handles cases where existing data might have duplicates or nulls
      const updates = newCategories.map((cat, idx) => ({
        id: cat.id,
        sort_order: idx
      }));

      // Execute queries in parallel
      await Promise.all(
        updates.map(update =>
          supabase.from('categories').update({ sort_order: update.sort_order }).eq('id', update.id)
        )
      );

    } catch (error) {
      console.error("Error reordering:", error);
      fetchCategories(); // Revert on error
    }
  };

  return (
    <>
      <Header title="إدارة الأقسام" />
      <div className="p-3 sm:p-4 md:p-6">
        <div className="flex justify-between items-center gap-3 mb-4 md:mb-6">
          <h1 className="text-lg md:text-2xl font-bold text-gray-800">إدارة الأقسام</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white px-3 py-2 md:px-4 md:py-2 rounded-lg flex items-center gap-1.5 md:gap-2 hover:bg-green-700 transition-colors text-xs md:text-base font-bold shadow-md"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">إضافة قسم</span>
            <span className="sm:hidden">إضافة</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50 text-gray-600 text-sm font-medium">
                <tr>
                  <th className="px-6 py-4">الترتيب</th>
                  <th className="px-6 py-4">الصورة</th>
                  <th className="px-6 py-4">الاسم (عربي)</th>
                  <th className="px-6 py-4">الاسم (إنجليزي)</th>
                  <th className="px-6 py-4">القسم الرئيسي</th>
                  <th className="px-6 py-4">تاريخ الإضافة</th>
                  <th className="px-6 py-4">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categories.map((category, index) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => moveCategory(index, 'up')}
                          disabled={index === 0}
                          className={`p-1 rounded hover:bg-gray-200 ${index === 0 ? 'text-gray-300' : 'text-gray-600'}`}
                        >
                          <ArrowUp size={16} />
                        </button>
                        <button
                          onClick={() => moveCategory(index, 'down')}
                          disabled={index === categories.length - 1}
                          className={`p-1 rounded hover:bg-gray-200 ${index === categories.length - 1 ? 'text-gray-300' : 'text-gray-600'}`}
                        >
                          <ArrowDown size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        {category.image_url ? (
                          <img src={category.image_url} alt={category.name_ar} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="text-gray-400" size={24} />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-800">{category.name_ar}</td>
                    <td className="px-6 py-4 text-gray-600">{category.name}</td>
                    <td className="px-6 py-4">
                      {category.parent_id ? (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {mainCategories.find(c => c.id === category.parent_id)?.name_ar || 'قسم فرعي'}
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">رئيسي</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {format(new Date(category.created_at), 'yyyy/MM/dd')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          onClick={() => openEditModal(category)}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          onClick={() => handleDelete(category.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-gray-100">
            {categories.map((category, index) => (
              <div key={category.id} className="p-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                    {category.image_url ? (
                      <img src={category.image_url} alt={category.name_ar} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="text-gray-400" size={20} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-bold text-gray-800 text-sm truncate">{category.name_ar}</p>
                        <p className="text-xs text-gray-500 truncate">{category.name}</p>
                      </div>
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        <button
                          onClick={() => moveCategory(index, 'up')}
                          disabled={index === 0}
                          className={`p-1 rounded hover:bg-gray-200 ${index === 0 ? 'text-gray-300' : 'text-gray-500'}`}
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          onClick={() => moveCategory(index, 'down')}
                          disabled={index === categories.length - 1}
                          className={`p-1 rounded hover:bg-gray-200 ${index === categories.length - 1 ? 'text-gray-300' : 'text-gray-500'}`}
                        >
                          <ArrowDown size={14} />
                        </button>
                        <button
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          onClick={() => openEditModal(category)}
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          onClick={() => handleDelete(category.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      {category.parent_id ? (
                        <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px]">
                          {mainCategories.find(c => c.id === category.parent_id)?.name_ar || 'قسم فرعي'}
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px]">رئيسي</span>
                      )}
                      <span className="text-[10px] text-gray-400">
                        {format(new Date(category.created_at), 'yyyy/MM/dd')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {categories.length === 0 && !loading && (
            <div className="p-8 md:p-12 text-center text-gray-500 text-sm md:text-base">
              لا توجد أقسام
            </div>
          )}
        </div>

        {/* Modal for Add Category logic updated */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 md:p-4">
            <div className="bg-white rounded-xl p-4 md:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-lg md:text-xl font-bold mb-4">إضافة قسم جديد</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم (عربي)</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                    value={formData.name_ar || ''}
                    onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم (إنجليزي)</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">القسم الرئيسي (اختياري)</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none bg-white"
                    value={formData.parent_id || ''}
                    onChange={(e) => setFormData({ ...formData, parent_id: e.target.value })}
                  >
                    <option value="">قسم رئيسي (بدون أب)</option>
                    {mainCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name_ar}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">اتركه فارغاً إذا كان هذا قسم رئيسي، أو اختر القسم الأب ليكون قسم فرعي</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الصورة</label>

                  <div className="flex gap-2 mb-3 bg-gray-100 p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setUploadTab('file')}
                      className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${uploadTab === 'file'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Upload size={16} />
                        <span>رفع من الجهاز</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadTab('url')}
                      className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${uploadTab === 'url'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <LinkIcon size={16} />
                        <span>رابط خارجي</span>
                      </div>
                    </button>
                  </div>

                  {uploadTab === 'file' ? (
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/png"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 bg-white w-full justify-center"
                      >
                        <Upload size={20} className="text-gray-500" />
                        <span className="text-sm text-gray-600">اختر صورة (PNG)</span>
                      </label>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://example.com/image.png"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none text-left"
                        dir="ltr"
                        value={urlInput || ''}
                        onChange={(e) => setUrlInput(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => processUrlImage(urlInput, false)}
                        disabled={uploading || !urlInput}
                        className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                      >
                        {uploading ? 'جاري التحميل...' : 'تحميل'}
                      </button>
                    </div>
                  )}

                  {formData.image_url && (
                    <div className="mt-3 w-full h-40 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center relative group">
                      <img src={formData.image_url} alt="Preview" className="max-w-full max-h-full object-contain" />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image_url: '' })}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    حفظ
                  </button>
                </div>
              </form>
            </div>
          </div >
        )}

        {/* Modal for Edit Category */}
        {isEditModalOpen && editingCategory && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 md:p-4">
            <div className="bg-white rounded-xl p-4 md:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-lg md:text-xl font-bold mb-4">تعديل القسم</h2>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم (عربي)</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                    value={editFormData.name_ar || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, name_ar: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم (إنجليزي)</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                    value={editFormData.name || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">القسم الرئيسي (اختياري)</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none bg-white"
                    value={editFormData.parent_id || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, parent_id: e.target.value })}
                  >
                    <option value="">قسم رئيسي (بدون أب)</option>
                    {mainCategories.filter(cat => cat.id !== editingCategory?.id).map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name_ar}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">اتركه فارغاً إذا كان هذا قسم رئيسي</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الصورة</label>

                  <div className="flex gap-2 mb-3 bg-gray-100 p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setEditUploadTab('file')}
                      className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${editUploadTab === 'file'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Upload size={16} />
                        <span>رفع من الجهاز</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditUploadTab('url')}
                      className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${editUploadTab === 'url'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <LinkIcon size={16} />
                        <span>رابط خارجي</span>
                      </div>
                    </button>
                  </div>

                  {editUploadTab === 'file' ? (
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/png"
                        onChange={handleEditImageUpload}
                        className="hidden"
                        id="edit-image-upload"
                      />
                      <label
                        htmlFor="edit-image-upload"
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 bg-white w-full justify-center"
                      >
                        <Upload size={20} className="text-gray-500" />
                        <span className="text-sm text-gray-600">تغيير الصورة (PNG)</span>
                      </label>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://example.com/image.png"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none text-left"
                        dir="ltr"
                        value={editUrlInput || ''}
                        onChange={(e) => setEditUrlInput(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => processUrlImage(editUrlInput, true)}
                        disabled={editUploading || !editUrlInput}
                        className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                      >
                        {editUploading ? 'جاري التحميل...' : 'تحميل'}
                      </button>
                    </div>
                  )}

                  {editFormData.image_url && (
                    <div className="mt-3 w-full h-40 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center relative group">
                      <img src={editFormData.image_url} alt="Preview" className="max-w-full max-h-full object-contain" />
                      <button
                        type="button"
                        onClick={() => setEditFormData({ ...editFormData, image_url: '' })}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editFormData.is_active ?? true}
                      onChange={(e) => setEditFormData({ ...editFormData, is_active: e.target.checked })}
                      className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-gray-700">القسم نشط (يظهر في التطبيق)</span>
                  </label>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditingCategory(null);
                    }}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    disabled={editUploading}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    حفظ التغييرات
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

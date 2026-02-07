'use client';

import { useState, useEffect } from 'react';
import { supabase, type Profile } from '@/lib/supabase';
import { Search, User } from 'lucide-react';
import { format } from 'date-fns';
import { Header } from '@/components/layout/Header';

export default function UsersPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  // Since we can't easily list auth users without service role key on client, 
  // we might check a public profile table if it exists, or just use a placeholder
  // For this demo, we'll assume we are fetching from a 'profiles' or 'users' table in public schema if available,
  // OR we just mock it since real auth user listing is restricted.

  // Actually, we can fetch unique users from 'orders' table as a proxy for active customers

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching profiles:', error);
    }

    if (data) {
      setUsers(data);
    }
    setLoading(false);
  };

  return (
    <>
    <Header title="المستخدمين" />
    <div className="p-3 sm:p-4 md:p-6">
      <div className="flex justify-between items-center gap-3 mb-4 md:mb-6">
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-gray-800">المستخدمين (العملاء)</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5">
            إجمالي: <strong className="text-primary">{users.length}</strong> مستخدم
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 text-gray-600 text-sm font-medium">
              <tr>
                <th className="px-6 py-4">المستخدم</th>
                <th className="px-6 py-4">تاريخ التسجيل</th>
                <th className="px-6 py-4">رقم الهاتف</th>
                <th className="px-6 py-4">الصلاحية</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user, index) => (
                <tr key={user.id || index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-3">
                    {user.avatar_url ? (
                      <img src={user.avatar_url || ''} alt={user.full_name || ''} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                        <User size={20} />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-gray-800">{user.full_name || 'مستخدم بدون اسم'}</p>
                      <p className="text-xs text-gray-500">{user.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {format(new Date(user.created_at), 'yyyy/MM/dd')}
                  </td>
                  <td className="px-6 py-4 font-mono text-sm">{user.phone || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                      {user.role === 'admin' ? 'مدير' : 'عميل'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-100">
          {users.map((user, index) => (
            <div key={user.id || index} className="p-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                {user.avatar_url ? (
                  <img src={user.avatar_url || ''} alt={user.full_name || ''} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold flex-shrink-0">
                    <User size={18} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-gray-800 text-sm truncate">{user.full_name || 'مستخدم بدون اسم'}</p>
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] flex-shrink-0 ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                      {user.role === 'admin' ? 'مدير' : 'عميل'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    {user.phone && (
                      <span className="text-xs text-gray-500 font-mono">{user.phone}</span>
                    )}
                    <span className="text-[10px] text-gray-400">
                      {format(new Date(user.created_at), 'yyyy/MM/dd')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {users.length === 0 && !loading && (
          <div className="p-8 md:p-12 text-center">
            <div className="text-gray-300 mb-3">
              <User size={48} className="mx-auto" />
            </div>
            <p className="text-gray-500 text-sm md:text-base">لا يوجد مستخدمين نشطين بعد</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

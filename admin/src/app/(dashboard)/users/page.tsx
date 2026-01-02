'use client';

import { useState, useEffect } from 'react';
import { supabase, type Profile } from '@/lib/supabase';
import { Search, User } from 'lucide-react';
import { format } from 'date-fns';

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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">المستخدمين (العملاء)</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
            {users.length === 0 && !loading && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">لا يوجد مستخدمين نشطين بعد</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

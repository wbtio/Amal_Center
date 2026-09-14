'use client';

import { useState, useEffect, useMemo } from 'react';
import { supabase, type Profile } from '@/lib/supabase';
import { Search, User, ShieldCheck, Users as UsersIcon, Loader2, Check, TriangleAlert } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';
import { Header } from '@/components/layout/Header';
import { SkeletonRows } from '@/components/ui/Skeleton';
import { ASSIGNABLE_ROLES, roleDef, isAdminRole, type Role } from '@/lib/roles';

type UserRow = Pick<Profile, 'id' | 'full_name' | 'phone' | 'avatar_url' | 'role' | 'created_at'> & {
  branch_id?: string | null;
};

interface BranchOption { id: string; name_ar: string }

const fmtDate = (value?: string | null) => {
  if (!value) return '—';
  const d = new Date(value);
  return isNaN(d.getTime()) ? '—' : format(d, 'yyyy/MM/dd');
};

export default function UsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [branches, setBranches] = useState<BranchOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [myRole, setMyRole] = useState<string | null>(null);
  const [myId, setMyId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void init();
  }, []);

  const init = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setMyId(session.user.id);
      const { data: me } = await supabase
        .from('profiles').select('role').eq('id', session.user.id).single();
      setMyRole(me?.role ?? null);
    }
    await fetchUsers();
  };

  const fetchUsers = async () => {
    // branch_id قد لا يكون موجوداً قبل تشغيل ملف المرحلة ٢ — نحاول ثم نتراجع
    const withBranch = await supabase
      .from('profiles')
      .select('id, full_name, phone, avatar_url, role, created_at, branch_id')
      .order('created_at', { ascending: false });

    let rows: UserRow[] = (withBranch.data ?? []) as UserRow[];

    if (withBranch.error) {
      const fallback = await supabase
        .from('profiles')
        .select('id, full_name, phone, avatar_url, role, created_at')
        .order('created_at', { ascending: false });

      if (fallback.error) console.error('Error fetching profiles:', fallback.error);
      rows = (fallback.data ?? []) as UserRow[];
    }

    setUsers(rows);

    const { data: branchData } = await supabase
      .from('branches')
      .select('id, name_ar')
      .eq('is_active', true)
      .order('sort_order');
    setBranches((branchData ?? []) as BranchOption[]);

    setLoading(false);
  };

  const changeBranch = async (userId: string, branchId: string) => {
    setSavingId(userId);
    const next = branchId || null;
    const previous = users.find((u) => u.id === userId)?.branch_id ?? null;
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, branch_id: next } : u)));

    const { error: err } = await supabase
      .from('profiles').update({ branch_id: next }).eq('id', userId);

    setSavingId(null);

    if (err) {
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, branch_id: previous } : u)));
      setError('لم يُحفظ الفرع. تأكد أن ملف المرحلة ٢ قد شُغّل في Supabase.');
      return;
    }

    setSavedId(userId);
    setTimeout(() => setSavedId((c) => (c === userId ? null : c)), 2000);
  };

  const changeRole = async (userId: string, nextRole: Role) => {
    setSavingId(userId);
    setError(null);

    const previous = users.find((u) => u.id === userId)?.role;
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: nextRole } : u)));

    const { error: err } = await supabase
      .from('profiles')
      .update({ role: nextRole })
      .eq('id', userId);

    setSavingId(null);

    if (err) {
      // إرجاع القيمة القديمة عند الفشل — حتى لا تُظهر الواجهة شيئاً غير محفوظ
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: previous ?? 'customer' } : u)));
      setError('لم يُحفظ التغيير. تأكد أن صلاحيتك مدير عام، وأن ملف قاعدة البيانات قد شُغّل.');
      return;
    }

    setSavedId(userId);
    setTimeout(() => setSavedId((c) => (c === userId ? null : c)), 2000);
  };

  const canManage = isAdminRole(myRole);

  const { staff, customers } = useMemo(() => {
    const q = query.trim().toLowerCase();
    const match = (u: UserRow) =>
      !q ||
      (u.full_name ?? '').toLowerCase().includes(q) ||
      (u.phone ?? '').includes(q);

    const filtered = users.filter(match);
    return {
      staff: filtered.filter((u) => roleDef(u.role).isStaff),
      customers: filtered.filter((u) => !roleDef(u.role).isStaff),
    };
  }, [users, query]);

  return (
    <>
      <Header title="الفريق والصلاحيات" />
      <div className="p-3 sm:p-4 md:p-6">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-gray-800">الفريق والصلاحيات</h1>
            <p className="text-xs md:text-sm text-gray-500 mt-0.5">
              كل موظف يشوف ما يخصّه فقط — والتعديلات كلها مسجّلة باسمه
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث باسم أو رقم هاتف..."
              className="w-full pr-9 pl-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
              <ShieldCheck size={15} className="text-indigo-500" /> فريق العمل
            </div>
            <p className="text-2xl font-bold text-gray-800">{staff.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
              <UsersIcon size={15} className="text-gray-400" /> الزبائن
            </div>
            <p className="text-2xl font-bold text-gray-800">{customers.length}</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            <TriangleAlert size={16} className="mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {!canManage && !loading && (
          <div className="mb-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-sm">
            تقدر تشوف الفريق، بس تغيير الصلاحيات للمدير العام فقط.
          </div>
        )}

        {/* فريق العمل */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-5">
          <div className="px-4 md:px-6 py-3 border-b border-gray-100 bg-gray-50/60">
            <h2 className="font-bold text-gray-800 text-sm">فريق العمل</h2>
          </div>

          {staff.length === 0 && !loading && (
            <p className="px-4 md:px-6 py-8 text-center text-sm text-gray-500">لا يوجد موظفون بعد</p>
          )}

          <div className="divide-y divide-gray-100">
            {staff.map((user) => {
              const def = roleDef(user.role);
              return (
                <div key={user.id} className="px-4 md:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {user.avatar_url ? (
                      <Image src={user.avatar_url} alt={user.full_name ?? ''} width={40} height={40}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                        <User size={18} />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-bold text-gray-800 text-sm truncate">
                        {user.full_name || 'موظف بدون اسم'}
                        {user.id === myId && <span className="text-[10px] text-gray-400 font-normal mr-1.5">(أنت)</span>}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user.phone || 'بلا رقم'} · انضم {fmtDate(user.created_at)}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{def.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {savingId === user.id && <Loader2 size={15} className="animate-spin text-gray-400" />}
                    {savedId === user.id && <Check size={15} className="text-emerald-600" />}

                    {canManage ? (
                      <>
                        {branches.length > 0 && (
                          <select
                            value={user.branch_id ?? ''}
                            onChange={(e) => changeBranch(user.id, e.target.value)}
                            disabled={savingId === user.id}
                            className="text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50"
                            title="الفرع"
                          >
                            <option value="">كل الفروع</option>
                            {branches.map((b) => (
                              <option key={b.id} value={b.id}>{b.name_ar}</option>
                            ))}
                          </select>
                        )}
                        <select
                          value={ASSIGNABLE_ROLES.includes(user.role as Role) ? user.role : 'viewer'}
                          onChange={(e) => changeRole(user.id, e.target.value as Role)}
                          disabled={savingId === user.id}
                          className="text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50"
                        >
                          {ASSIGNABLE_ROLES.map((r) => (
                            <option key={r} value={r}>{roleDef(r).label}</option>
                          ))}
                        </select>
                      </>
                    ) : (
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${def.badge}`}>
                        {def.label}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* الزبائن */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 md:px-6 py-3 border-b border-gray-100 bg-gray-50/60 flex items-center justify-between">
            <h2 className="font-bold text-gray-800 text-sm">الزبائن</h2>
            <span className="text-xs text-gray-500">{customers.length}</span>
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50 text-gray-600 text-sm font-medium">
                <tr>
                  <th className="px-6 py-3">الزبون</th>
                  <th className="px-6 py-3">رقم الهاتف</th>
                  <th className="px-6 py-3">تاريخ التسجيل</th>
                  {canManage && <th className="px-6 py-3">الصلاحية</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {customers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 flex items-center gap-3">
                      {user.avatar_url ? (
                        <Image src={user.avatar_url} alt={user.full_name ?? ''} width={36} height={36}
                          className="w-9 h-9 rounded-full object-cover" />
                      ) : (
                        <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                          <User size={17} />
                        </div>
                      )}
                      <span className="font-medium text-gray-800 text-sm">{user.full_name || 'بدون اسم'}</span>
                    </td>
                    <td className="px-6 py-3 font-mono text-sm text-gray-600">{user.phone || '—'}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{fmtDate(user.created_at)}</td>
                    {canManage && (
                      <td className="px-6 py-3">
                        <select
                          value="customer"
                          onChange={(e) => changeRole(user.id, e.target.value as Role)}
                          disabled={savingId === user.id}
                          className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                        >
                          {ASSIGNABLE_ROLES.map((r) => (
                            <option key={r} value={r}>{roleDef(r).label}</option>
                          ))}
                        </select>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden divide-y divide-gray-100">
            {customers.map((user) => (
              <div key={user.id} className="p-3 flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 flex-shrink-0">
                  <User size={17} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 text-sm truncate">{user.full_name || 'بدون اسم'}</p>
                  <p className="text-xs text-gray-500 font-mono">{user.phone || '—'}</p>
                </div>
                <span className="text-[10px] text-gray-400">{fmtDate(user.created_at)}</span>
              </div>
            ))}
          </div>

          {customers.length === 0 && !loading && (
            <p className="px-6 py-8 text-center text-sm text-gray-500">لا يوجد زبائن مطابقون</p>
          )}
        </section>

        {loading && (
          <SkeletonRows rows={4} />
        )}
      </div>
    </>
  );
}

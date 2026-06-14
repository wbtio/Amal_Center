import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Roles allowed to use the product-management API routes (AI analysis, image upload).
const ALLOWED_ROLES = ['admin', 'products_manager'] as const;

export type ApiAuthResult =
  | { ok: true; userId: string; role: string }
  | { ok: false; status: 401 | 403; error: string };

/**
 * Verifies that the incoming request carries a valid admin/products_manager
 * session cookie. Used to guard the /api/ai/* routes, which are NOT covered by
 * middleware (the matcher excludes /api/) and otherwise trigger paid third-party
 * APIs (Replicate, OpenRouter) and Storage writes for any anonymous caller.
 */
export async function requireAdmin(): Promise<ApiAuthResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return { ok: false, status: 401, error: 'إعدادات المصادقة غير مكتملة على الخادم' };
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      // Route handlers don't refresh tokens here; reading the session is enough.
      setAll() {},
    },
  });

  // getUser() validates the JWT with the auth server (more secure than getSession()).
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    return { ok: false, status: 401, error: 'يجب تسجيل الدخول' };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  const role = profile?.role;
  if (!role || !ALLOWED_ROLES.includes(role as (typeof ALLOWED_ROLES)[number])) {
    return { ok: false, status: 403, error: 'ليس لديك صلاحية لهذا الإجراء' };
  }

  return { ok: true, userId: user.id, role };
}

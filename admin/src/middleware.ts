import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { canAccess, homePathFor } from '@/lib/roles'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  const PUBLIC_PATHS = ['/login', '/forgot-password', '/update-password']
  const isPublicPath = PUBLIC_PATHS.some((path) => request.nextUrl.pathname.startsWith(path))

  // Protect routes that require auth
  if (!session && !isPublicPath) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/login'
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect to dashboard if already logged in and trying to access login
  if (session && request.nextUrl.pathname.startsWith('/login')) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/'
    return NextResponse.redirect(redirectUrl)
  }

  // Role-based access control — الأدوار معرّفة في lib/roles.ts
  if (session && !isPublicPath) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    const userRole = profile?.role
    const pathname = request.nextUrl.pathname

    if (!canAccess(userRole, pathname)) {
      const fallback = homePathFor(userRole)

      // الزبون ليس له مكان في اللوحة — يُخرج لصفحة الدخول
      if (fallback === '/login') {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/login'
        return NextResponse.redirect(redirectUrl)
      }

      // تفادي حلقة إعادة توجيه لو كان المسار البديل نفسه ممنوعاً
      if (pathname !== fallback) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = fallback
        return NextResponse.redirect(redirectUrl)
      }
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

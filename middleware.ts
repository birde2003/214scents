import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { getToken } from 'next-auth/jwt'

const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'always'
})

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Apply internationalization middleware first
  const response = intlMiddleware(request)
  
  // Extract locale from pathname
  const locale = pathname.split('/')[1]
  
  // Get the token to check authentication
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  
  // Protected routes that require authentication
  const accountRoutes = [`/${locale}/account`, `/${locale}/checkout`, `/${locale}/wishlist`]
  const isAccountRoute = accountRoutes.some(route => pathname.startsWith(route))
  
  if (isAccountRoute && !token) {
    // Redirect to sign in if not authenticated
    const signInUrl = new URL(`/${locale}/auth/signin`, request.url)
    signInUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(signInUrl)
  }
  
  // Admin routes that require admin/manager role
  const isAdminRoute = pathname.includes('/admin')
  
  if (isAdminRoute) {
    if (!token) {
      const signInUrl = new URL(`/${locale}/auth/signin`, request.url)
      signInUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(signInUrl)
    }
    
    const role = (token as any).role
    if (role !== 'ADMIN' && role !== 'MANAGER') {
      // Redirect non-admin users to home
      return NextResponse.redirect(new URL(`/${locale}`, request.url))
    }
  }
  
  return response
}

export const config = {
  matcher: ['/', '/(ar|en)/:path*']
}

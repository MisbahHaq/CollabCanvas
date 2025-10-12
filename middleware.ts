import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/enterprise', '/pricing', '/products', '/resources', '/solutions'])

export default clerkMiddleware(async (auth, req) => {
  console.log('Middleware hit for path:', req.nextUrl.pathname)
  if (!isPublicRoute(req)) {
    console.log('Path is not public, checking auth')
    await auth.protect()
    console.log('Auth check passed')
  } else {
    console.log('Path is public, allowing')
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
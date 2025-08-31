import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

// esegue il controllo di autenticazione ad ogni pagina
// salta i file statici e le risorse interne di Next.js
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/dashboard(.*)',
    '/welcome',
  ],
};
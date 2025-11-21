import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { checkServerSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  
  if (isPrivateRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  
  if (isPublicRoute && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  
  if (!accessToken && refreshToken) {
    try {
      const sessionResponse = await checkServerSession();
      
      if (sessionResponse.data?.success) {
        
        return NextResponse.next();
      }
    } catch (error) {
      console.error('Session refresh failed:', error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};




// import { NextRequest, NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import { checkServerSession } from './lib/api/serverApi';

// const privateRoutes = ['/profile', '/notes'];
// const publicRoutes = ['/sign-in', '/sign-up'];

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get('accessToken')?.value;
//   const refreshToken = cookieStore.get('refreshToken')?.value;

//   const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
//   const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

//   if (!accessToken) {
//     if (refreshToken) {
//       try {
//         const sessionResult = await checkServerSession();
        
//         if (sessionResult.success) {
//           if (isPublicRoute) {
//             return NextResponse.redirect(new URL('/', request.url));
//           }
//           if (isPrivateRoute) {
//             return NextResponse.next();
//           }
//         }
//       } catch (error) {
//         console.error('Session check failed:', error);
//       }
//     }

//     if (isPublicRoute) {
//       return NextResponse.next();
//     }

//     if (isPrivateRoute) {
//       return NextResponse.redirect(new URL('/sign-in', request.url));
//     }
//   }

//   if (isPublicRoute) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   if (isPrivateRoute) {
//     return NextResponse.next();
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
// };


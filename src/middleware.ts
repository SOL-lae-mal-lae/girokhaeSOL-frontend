import { NextResponse } from 'next/server';

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/', '/community', '/auth-required']);

export default clerkMiddleware(async (auth, req) => {
	if (!isPublicRoute(req)) {
		const { userId } = await auth();

		if (!userId) {
			// 로그인되지 않은 경우 커스텀 페이지로 리다이렉트
			return NextResponse.redirect(new URL('/auth-required', req.url));
		}
	}
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api)/v1(.*)',
	],
};

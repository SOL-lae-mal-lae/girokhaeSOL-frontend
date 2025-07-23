import { NextResponse } from 'next/server';

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isApiRoute = createRouteMatcher(['/api(.*)']);
const isPublicRoute = createRouteMatcher([
	'/',
	'/community',
	'/my-page',
	'/auth-required',
]);

export default clerkMiddleware(async (auth, req) => {
	const { userId } = await auth();

	if (isApiRoute(req)) {
		return NextResponse.next();
	}
	if (!isPublicRoute(req)) {
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
		'/(api)(.*)',
	],
};

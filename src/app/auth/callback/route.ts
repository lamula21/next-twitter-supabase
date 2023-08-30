import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

// option in Next.jsm to prevent route static cache
// and always execute in server-side
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
	// get req.query
	// e.g /auth/callback?code=[...]
	const requestURL = new URL(request.url)
	const code = requestURL.searchParams.get('code')

	// validate
	if (code !== null) {
		const supabase = createRouteHandlerClient({ cookies })
		// using 'code' from url, returns user's session
		const userSession = await supabase.auth.exchangeCodeForSession(code)
	}

	// normally, return to the same page that user was previously
	return NextResponse.redirect(requestURL.origin)
}

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers' // to access the request, headers, sessions, etc that supabase creates
import { redirect } from 'next/navigation'

import { AuthButtonServer } from '@/components/auth-button-server'
import { PostList } from '@/components/post-list'
import { Database } from '@/types/database'
import ComposePost from '@/components/compose-post'

// question? why not local-storage than cookies
// - cookies are bit more secure than local-storage.
// - can't read local-storage from server component

export default async function HomePage() {
	const supabase = createServerComponentClient<Database>({ cookies }) // pass cookies so supabase has access to cookies

	// protected route: Redirection a page level
	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (session === null) {
		redirect('/login')
	}

	const { data: posts } = await supabase
		.from('posts')
		.select('*, users(name, avatar_url, user_name)') // query all posts and its users (JOIN)
		.order('created_at', { ascending: false }) // newest post to older posts
	// users(*)
	// users(id)
	// users(name, avatar_url, user_name)

	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<section className="max-w-[650px] w-full mx-auto border-l border-r border-white/20 min-h-screen">
				<ComposePost userAvatarUrl={session.user?.user_metadata?.avatar_url} />
				<PostList posts={posts} />
			</section>
			<AuthButtonServer />
		</main>
	)
}

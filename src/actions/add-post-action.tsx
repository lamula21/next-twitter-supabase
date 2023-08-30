'use server'
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'

export async function addPost(formData: FormData) {
	const content = formData.get('content')

	if (content === null) return

	const supabase = createServerActionClient({ cookies })

	// check if user is authenticated
	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (user === null) return

	// post to database
	await supabase.from('posts').insert({ content, user_id: user.id })

	revalidatePath('/')
}

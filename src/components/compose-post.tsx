'use client' // if this is a client component
//import { cookies } from 'next/headers' // only works in server component
//import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import ComposePostTextArea from './compose-post-textarea'
import ComposePostButton from './compose-post-button'
import { addPost } from '@/actions/add-post-action' // server action
import { useRef } from 'react'

export default function ComposePost({
	userAvatarUrl,
}: {
	userAvatarUrl: string
}) {
	// server action/function
	// function must be async
	// async function addPost(formData: FormData) {
	// 	'use server'
	// 	const content = formData.get('content')

	// 	if (content === null) return

	// 	const supabase = createServerActionClient({ cookies })

	// 	// check if user is authenticated
	// 	const {
	// 		data: { user },
	// 	} = await supabase.auth.getUser()
	// 	if (user === null) return

	// 	// post to database
	// 	await supabase.from('posts').insert({ content, user_id: user.id })

	// 	revalidatePath('/')
	// }

	const formRef = useRef<HTMLFormElement>(null)

	return (
		<form
			ref={formRef}
			action={async (formData) => {
				await addPost(formData)
				formRef.current?.reset()
			}}
			//action={addPost} // server action
			className="flex flex-row p-4 border-b border-white/20"
		>
			<img
				className="rounded-full w-10 h-10 object-contain mr-2"
				src={userAvatarUrl}
			/>
			{/* <Avatar radius="full" size="md" src={userAvatarUrl} /> */}
			<div className="flex flex-1 flex-col gap-y-4 ">
				{/* <ComposePostTextArea /> */}

				<textarea
					name="content"
					rows={4}
					className="w-full text-xl bg-black placeholder-gray-500 p-2"
					placeholder="What is happening?!"
				/>
				<ComposePostButton />
			</div>
		</form>
	)
}

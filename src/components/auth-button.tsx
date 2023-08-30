'use client'
// --------- dependencies ---------
import {
	type Session,
	createClientComponentClient,
} from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
// --------- components ---------
import { GitHubIcon, LoadingSpinner } from '@/components/icons'
import { Button } from '@nextui-org/button'

// Renders in client
export function AuthButton({ session }: { session: Session | null }) {
	// connection to supabase
	const supabase = createClientComponentClient()

	// No longer need state. we created auth-button-server.tsx that handles session
	// const [session, setSession] = useState<Session | null>(null) // user session state

	const router = useRouter() // refresh page when logout

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const handleSignIn = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: 'http://localhost:3000/auth/callback', // redirects to this url once authenticated
			},
		})
	}

	const handleSignOut = async () => {
		setIsLoading(true)
		await supabase.auth.signOut()
		router.refresh()
	}

	// No longer need useffect. we created auth-button-server.tsx that handles session
	// // save session in a react state
	// useEffect(() => {
	// 	async function getSession() {
	// 		const { data } = await supabase.auth.getSession()
	// 		setSession(data.session)
	// 	}

	// 	getSession()
	// }, []) // run when mounted first time

	return (
		<header>
			{session === null ? (
				<button
					className="text-white bg-[#24292F] focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 hover:bg-[#050708]/30 mr-2 mb-2"
					onClick={() => handleSignIn()}
					type="button"
				>
					<GitHubIcon />
					Sign in with Github
				</button>
			) : (
				<Button
					className="text-white bg-[#24292F] focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 hover:bg-[#050708]/30 mr-2 mb-2"
					disabled={isLoading}
					onClick={() => {
						handleSignOut()
					}}
				>
					{isLoading ? (
						<>
							<LoadingSpinner /> <span className="opacity-20">Loading...</span>
						</>
					) : (
						'Sign Out'
					)}
				</Button>
			)}
		</header>
	)
}

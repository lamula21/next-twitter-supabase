import { AuthButtonServer } from '@/components/auth-button-server'

export default function LoginPage() {
	return (
		<section className="grid place-content-center min-h-screen">
			<h1 className="text-xl font-bold mb-4">Login to Twitter</h1>
			<AuthButtonServer />
		</section>
	)
}

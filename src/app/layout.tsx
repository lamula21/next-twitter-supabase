import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/app/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Twitter Clone',
	description: 'A Next.js app router with Supabase Auth',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className="dark">
			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}

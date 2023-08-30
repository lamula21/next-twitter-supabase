'use client'
// ------- dependencies -------
import Link from 'next/link'
// ------- components -------
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Avatar,
	Button,
} from '@nextui-org/react'
import { IconMessageCircle, IconHeart, IconRepeat } from '@tabler/icons-react'

export function PostCard({
	userFullName,
	userName,
	avatarUrl,
	content,
}: {
	userFullName: string
	userName: string
	avatarUrl: string
	content: string
}) {
	return (
		<Card className="bg-transparent shadow-none hover:bg-zinc-950 border-b border-white/20 rounded-none cursor-pointer">
			<CardHeader className="justify-between">
				<div className="flex gap-2">
					<Link href={`/${userName}`}>
						<Avatar radius="full" size="md" src={avatarUrl} />
					</Link>
					<div className="flex flex-col gap-1 items-start justify-center">
						<h4 className="text-small font-semibold leading-none text-default-600">
							{userFullName}
						</h4>
						<h5 className="text-small tracking-tight text-default-400">
							@{userName}
						</h5>
					</div>
				</div>
			</CardHeader>
			<CardBody className="px-3 py-0 text-xs text-white">
				<p>{content}</p>
			</CardBody>
			<CardFooter className="gap-3">
				<IconMessageCircle className="w-4" />
				<IconHeart className="w-4" />
				<IconRepeat className="w-4" />
			</CardFooter>
		</Card>
	)
}

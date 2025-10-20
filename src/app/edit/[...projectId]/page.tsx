import type { PixelModifyItem } from 'dotting'
import type { InputJsonValue } from '@prisma/client/runtime/library'

// redirect extracted from https://nextjs.org/docs/app/api-reference/functions/redirect
import { RedirectType, redirect } from 'next/navigation'

import Editor from '@/app/_components/Editor/Editor'
import createEmptySquareData from '@/utils/createEmptySquareData'
import { db } from '@/server/db'
import { auth } from '@/server/auth'

const Project = async ({
	params,
}: {
	params: Promise<{ projectId: string | string[] | null }>
}) => {
	const session = await auth()

	if (!session?.user) redirect('/api/auth/signin', RedirectType.replace)

	// Params managment extracted from https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes
	const { projectId: id } = await params

	if (!id) return null

	const normalizedId = Array.isArray(id) ? id[0] : id

	if (normalizedId === 'new') {
		const { id: newId } = await db.project.create({
			data: {
				userId: session.user.id,
				data: createEmptySquareData(30) as unknown as InputJsonValue,
			},
		})

		redirect(`/edit/${newId}`, RedirectType.replace)
	}

	const project = await db.project.findUnique({
		where: {
			id: normalizedId,
		},
	})

	const data = project
		? (project.data as unknown as PixelModifyItem[][])
		: createEmptySquareData(30)

	return <Editor id={normalizedId} initialData={data} />
}

export default Project

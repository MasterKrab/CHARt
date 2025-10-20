// notFound extracted from https://nextjs.org/docs/app/api-reference/functions/not-found
import { notFound } from 'next/navigation'

import { db } from '@/server/db'
import { auth } from '@/server/auth'

import Cards from '@/app/_components/Project/Cards'
import getProjectsForView from '@/server/getProjectsForView'

const Projects = async ({
	params,
}: {
	params: Promise<{ userId: string | string[] | null }>
}) => {
	const { userId } = await params

	if (!userId) {
		const projects = await getProjectsForView()

		return <Cards projects={projects} />
	}

	const normalizedUserId = Array.isArray(userId) ? userId[0] : userId

	const user = await db.user.findUnique({
		where: {
			id: normalizedUserId,
		},
	})

	if (!user) notFound()

	const projects = await getProjectsForView(normalizedUserId)

	const session = await auth()

	return (
		<Cards
			projects={projects}
			isEditMode={session?.user.id === normalizedUserId}
		/>
	)
}

export default Projects

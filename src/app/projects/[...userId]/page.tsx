// notFound extracted from https://nextjs.org/docs/app/api-reference/functions/not-found
import { notFound } from 'next/navigation'

import { db } from '@/server/db'

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

	return <Cards projects={projects} />
}

export default Projects

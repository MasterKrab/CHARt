import { db } from '@/server/db'
import getProjectSize from '@/utils/getProjectSize'
import type { PixelModifyItem } from 'dotting'

const getProjectsForView = async (userId?: string) => {
	const projects = await db.project.findMany({
		where: userId ? { userId } : {},
	})

	const promises = projects.map(async ({ id, userId, data }) => ({
		id,
		user: await db.user.findUnique({
			where: { id: userId },
			select: { name: true, image: true, id: true },
		}),
		...getProjectSize(data as unknown as PixelModifyItem[][]),
	}))

	return Promise.all(promises)
}

export default getProjectsForView

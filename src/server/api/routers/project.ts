import { z } from 'zod'

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from '@/server/api/trpc'

import { db } from '@/server/db'
import { TRPCError } from '@trpc/server'

const DataPixelArt = z.array(
	z.array(
		z.object({
			rowIndex: z.number(),
			columnIndex: z.number(),
			color: z.string(),
		}),
	),
)

export const projectRouter = createTRPCRouter({
	get: publicProcedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.query(async ({ input }) => {
			const project = await db.project.findUnique({
				where: {
					id: input.id,
				},
			})

			return project
		}),
	create: protectedProcedure
		.input(
			z.object({
				data: DataPixelArt,
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const project = await db.project.create({
				data: {
					userId: ctx.session.user.id,
					data: input.data,
				},
			})

			return project
		}),
	update: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				data: DataPixelArt,
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const project = await db.project.findUnique({
				where: {
					id: input.id,
				},
			})

			if (!project) throw new TRPCError({ code: 'NOT_FOUND' })

			if (project.userId !== ctx.session.user.id) {
				throw new TRPCError({ code: 'FORBIDDEN' })
			}

			const updatedProject = await db.project.update({
				where: {
					id: input.id,
				},
				data: {
					data: input.data,
				},
			})

			return updatedProject
		}),
	delete: protectedProcedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const project = await db.project.findUnique({
				where: {
					id: input.id,
				},
			})

			if (!project) throw new TRPCError({ code: 'NOT_FOUND' })

			if (project.userId !== ctx.session.user.id) {
				throw new TRPCError({ code: 'FORBIDDEN' })
			}

			await db.project.delete({
				where: {
					id: input.id,
				},
			})
		}),
})

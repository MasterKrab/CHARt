import type { PixelModifyItem } from 'dotting'

import { db } from '@/server/db'
import { ImageResponse } from 'next/og'

const DEFAULT_PIXEL_SIZE = 50

export const GET = async (
	request: Request,
	{
		params,
	}: {
		params: Promise<{
			id: string[]
		}>
	},
) => {
	// Extracted from https://nextjs.org/docs/messages/sync-dynamic-apis
	const { id } = await params

	const normalizedId = id[0]

	const size = Number.parseInt(
		new URL(request.url).searchParams.get('pixel-size') ||
			`${DEFAULT_PIXEL_SIZE}`,
	)

	const project = await db.project.findUnique({
		where: {
			id: normalizedId,
		},
	})

	if (!project)
		return new Response('Failed to find the image', {
			status: 404,
		})

	const data = (project.data || [[]]) as unknown as PixelModifyItem[][]

	const width =
		data
			.flat()
			.reduce((max, { columnIndex }) => Math.max(max, columnIndex), 0) + 1

	const height =
		data.flat().reduce((max, { rowIndex }) => Math.max(max, rowIndex), 0) + 1

	const scaledWidth = width * size
	const scaledHeight = height * size

	return new ImageResponse(
		<div
			style={{
				display: 'flex',
				position: 'relative',
				width: `${scaledWidth}px`,
				height: `${scaledHeight}px`,
			}}
		>
			{data.map((row, i) =>
				row.map(({ color, rowIndex, columnIndex }, j) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={`${id}-${i}-${j}`}
						style={{
							display: 'flex',
							position: 'absolute',
							width: `${size}px`,
							height: `${size}px`,
							top: rowIndex * size,
							left: columnIndex * size,
							backgroundColor: color,
						}}
					/>
				)),
			)}
		</div>,
		{
			width: scaledWidth,
			height: scaledHeight,
		},
	)
}

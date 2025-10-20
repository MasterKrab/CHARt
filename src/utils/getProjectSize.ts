import type { PixelModifyItem } from 'dotting'

const getProjectSize = (data: PixelModifyItem[][]) => {
	const width =
		data.flat().reduce((max, { rowIndex }) => Math.max(max, rowIndex), 0) + 1

	const height =
		data
			.flat()
			.reduce((max, { columnIndex }) => Math.max(max, columnIndex), 0) + 1

	return { width, height }
}

export default getProjectSize

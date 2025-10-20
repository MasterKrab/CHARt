// Extracted from https://github.com/hunkim98/dotting/blob/main/stories/utils/dataCreator.ts

import type { PixelModifyItem } from 'dotting'

const createEmptySquareData = (size: number) => {
	const data: PixelModifyItem[][] = []

	for (let i = 0; i < size; i++) {
		const row: PixelModifyItem[] = []

		for (let j = 0; j < size; j++)
			row.push({ rowIndex: i, columnIndex: j, color: '' })

		data.push(row)
	}

	return data
}

export default createEmptySquareData

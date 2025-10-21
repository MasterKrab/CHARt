'use client'

import { useEffect } from 'react'

const useBodyClassNames = (classNames: string[]) => {
	const reset = () => {
		for (const className of classNames)
			document.body.classList.remove(className)
	}

	useEffect(() => {
		for (const className of classNames) document.body.classList.add(className)

		return reset
	}, [classNames])
}

export default useBodyClassNames

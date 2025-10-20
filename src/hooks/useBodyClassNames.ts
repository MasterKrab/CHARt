'use client'

import { useEffect } from 'react'

const useBodyClassNames = (classNames: string[], disabled = false) => {
	const reset = () => {
		for (const className of classNames)
			document.body.classList.remove(className)
	}

	useEffect(() => {
		if (disabled) return

		for (const className of classNames) document.body.classList.add(className)

		return reset
	}, [classNames, disabled])
}

export default useBodyClassNames

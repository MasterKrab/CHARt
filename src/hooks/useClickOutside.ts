import type { RefObject } from 'react'

import useWindowEvent from '@/hooks/useWindowEvent'

const useClickOutside = (
	ref: RefObject<HTMLElement | null>,
	handler: CallableFunction,
	disabled = false,
) => {
	const handleClick = (event: Event) => {
		if (disabled) return

		const target = event.target as HTMLElement

		console.log(target, disabled)

		if (
			ref.current?.contains(target) &&
			!target.closest('a[href],button:not(:disabled)')
		)
			return

		handler()
	}

	useWindowEvent('click', disabled ? undefined : handleClick)
}

export default useClickOutside

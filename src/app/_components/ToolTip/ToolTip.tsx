// Extracted from https://github.com/MasterKrab/tweeter/blob/main/styles/resetButton.ts

'use client'

import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useContext } from 'react'
import useWindowEvent from '@/hooks/useWindowEvent'
import GlobalStyles from './GlobalStyles'
import { ThemeContext } from '@/styles/ThemeProvider'
import { themes } from '@/styles/theme'

interface ToolTipProps {
	isOpen: boolean
	onClose?: () => void
	children: ReactNode
}

const ToolTip = ({ isOpen, onClose = () => {}, children }: ToolTipProps) => {
	const { theme } = useContext(ThemeContext)
	const tooltip = useRef<HTMLUListElement>(null)

	const handleClick = (e: Event) => {
		const target = e.target as HTMLElement

		if (
			tooltip.current?.contains(target) &&
			!target.closest('a[href],button:not(:disabled)')
		)
			return

		onClose()
	}

	useWindowEvent('click', isOpen ? handleClick : undefined)

	return (
		<>
			<GlobalStyles {...themes[theme]} />
			<AnimatePresence>
				{isOpen && (
					<motion.ul
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0 }}
						className="tooltip"
						ref={tooltip}
					>
						{children}
					</motion.ul>
				)}
			</AnimatePresence>
		</>
	)
}

export default ToolTip

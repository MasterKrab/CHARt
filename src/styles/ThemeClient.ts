'use client'

import { useEffect, createContext } from 'react'
import { type ThemeValue, THEMES } from '@/styles/theme'
import useMatchMedia from '@/hooks/useMatchMedia'

export const ThemeContext = createContext<{
	theme: ThemeValue
	setTheme?: (theme: ThemeValue) => void
}>({
	theme: THEMES.DARK,
})

const ThemeCLient = ({
	children,
	setTheme,
}: {
	children: React.ReactNode
	theme: ThemeValue
	setTheme: (theme: ThemeValue) => void
}) => {
	const prefersDarkMode = useMatchMedia('(prefers-color-scheme: dark)')

	useEffect(() => {
		const storedTheme = window.localStorage.getItem('theme') as ThemeValue

		if (Object.values(THEMES).includes(storedTheme)) setTheme(storedTheme)
		else setTheme(prefersDarkMode ? THEMES.DARK : THEMES.LIGHT)
	}, [])

	return children
}

export default ThemeCLient

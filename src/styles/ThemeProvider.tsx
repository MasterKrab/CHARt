'use client'

import { useState, createContext, useEffect } from 'react'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import { themes, type ThemeValue, THEMES } from '@/styles/theme'
import GlobalStyles from '@/styles/globals'
import useMatchMedia from '@/hooks/useMatchMedia'

export const ThemeContext = createContext<{
	theme: ThemeValue
	setTheme?: (theme: ThemeValue) => void
}>({
	theme: THEMES.DARK,
})

const ThemeProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const prefersDarkMode = useMatchMedia('(prefers-color-scheme: dark)')
	const [theme, setTheme] = useState<ThemeValue>(THEMES.LIGHT)

	useEffect(() => {
		const storedTheme = window.localStorage.getItem('theme') as ThemeValue

		if (Object.values(THEMES).includes(storedTheme)) setTheme(storedTheme)
		else setTheme(prefersDarkMode ? THEMES.DARK : THEMES.LIGHT)
	}, [])

	const changeTheme = (theme: ThemeValue) => {
		setTheme(theme)
		window.localStorage.setItem('theme', theme)
	}

	return (
		<ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
			<StyledComponentsThemeProvider theme={themes[theme]}>
				<GlobalStyles {...themes[theme]} />
				{children}
			</StyledComponentsThemeProvider>
		</ThemeContext.Provider>
	)
}

export default ThemeProvider

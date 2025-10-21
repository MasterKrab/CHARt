'use client'

import { useState, createContext } from 'react'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import { themes, type ThemeValue, THEMES } from '@/styles/theme'
import GlobalStyles from '@/styles/globals'

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
	const [theme, setTheme] = useState<ThemeValue>(
		(window.localStorage.getItem('theme') as ThemeValue) || THEMES.LIGHT,
	)

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

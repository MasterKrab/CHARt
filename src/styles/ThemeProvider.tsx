'use client'

import { useState, createContext } from 'react'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'

import { themes, type ThemeValue, THEMES } from '@/styles/theme'
import GlobalStyles from '@/styles/globals'
import ThemeClient from '@/styles/ThemeClient'

export const ThemeContext = createContext<{
	theme: ThemeValue
	setTheme?: (theme: ThemeValue) => void
}>({
	theme: THEMES.DARK,
})

const ThemeProvider = ({
	children,
	initialTheme = THEMES.LIGHT,
}: {
	children: React.ReactNode
	initialTheme?: ThemeValue | null
}) => {
	const [theme, setTheme] = useState<ThemeValue>(initialTheme || THEMES.LIGHT)

	const changeTheme = async (theme: ThemeValue) => {
		setTheme(theme)
		window.localStorage.setItem('theme', theme)

		await fetch(`/api/theme?value=${theme}`, {
			method: 'POST',
		})
	}

	return (
		<ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
			<ThemeClient setTheme={changeTheme}>
				<StyledComponentsThemeProvider theme={themes[theme]}>
					<GlobalStyles {...themes[theme]} />
					{children}
				</StyledComponentsThemeProvider>
			</ThemeClient>
		</ThemeContext.Provider>
	)
}

export default ThemeProvider

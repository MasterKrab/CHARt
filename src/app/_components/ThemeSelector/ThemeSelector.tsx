'use client'

import { AnimatePresence } from 'framer-motion'
import { useContext } from 'react'
import { ThemeContext } from '@/styles/ThemeProvider'
import { THEMES, type ThemeValue } from '@/styles/theme'
import { nanoid } from 'nanoid'

import SunIcon from '@/assets/icons/sun.svg'
import MoonIcon from '@/assets/icons/moon.svg'

import { StyledButton, StyledIconContainer } from './styles'

const ICONS = {
	[THEMES.DARK]: MoonIcon,
	[THEMES.LIGHT]: SunIcon,
}

const ThemeSelector = () => {
	const { theme, setTheme } = useContext(ThemeContext)

	const themes = Object.values(THEMES) as ThemeValue[]

	const toggleTheme = async () => {
		const newTheme = themes[
			(themes.indexOf(theme) + 1) % themes.length
		] as ThemeValue

		setTheme!(newTheme)
	}

	return (
		<StyledButton
			type="button"
			aria-label="Cambiar Tema"
			onClick={toggleTheme}
			$active={true}
		>
			<AnimatePresence>
				{Object.entries(ICONS).map(([key, Icon]) => {
					if (key !== theme) return null

					return (
						<StyledIconContainer
							key={nanoid()}
							initial={{ scale: 0, rotate: '260deg' }}
							animate={{ scale: 1, rotate: 0 }}
						>
							<Icon width="100%" height="100%" />
						</StyledIconContainer>
					)
				})}
			</AnimatePresence>
		</StyledButton>
	)
}

export default ThemeSelector

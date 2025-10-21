export const lightTheme = {
	background: '#fff',
	primary: '#282A36',
	secondary: '#111',
	tertiary: '#fff',
	elementColor: '#282A36',
	active: '#50FA7B',
	danger: '#FF5555',
	shadowColor: 'rgba(0, 0, 0, 0.25)',
	gridStroke: 'rgba(0, 0, 0, 0.1)',
}

export const darkTheme = {
	background: '#111',
	primary: '#fff',
	secondary: '#ccc',
	tertiary: '#282A36',
	elementColor: '#282A36',
	active: '#50FA7B',
	danger: '#FF5555',
	shadowColor: 'rgba(255, 255, 255, 0.15)',
	gridStroke: 'rgba(255, 255, 255, 0.1)',
}

export const themes = {
	light: lightTheme,
	dark: darkTheme,
}

export type Theme = (typeof themes)[keyof typeof themes]

export const THEMES: {
	DARK: 'dark'
	LIGHT: 'light'
} = {
	DARK: 'dark',
	LIGHT: 'light',
}

export type ThemeValue = keyof typeof themes

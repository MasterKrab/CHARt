import { cookies } from 'next/headers'

import { THEMES, type ThemeValue } from '@/styles/theme'

export const POST = async (request: Request) => {
	const cookieStore = await cookies()

	const theme = new URL(request.url).searchParams.get('value')

	if (!Object.values(THEMES).includes(theme as ThemeValue))
		return new Response('Invalid Value', { status: 400 })

	cookieStore.set('theme', theme as string)

	return new Response('Value updated sucessfully', { status: 200 })
}

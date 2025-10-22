import '@/styles/modern-normalize.css'

import { Pixelify_Sans } from 'next/font/google'

import StyledComponentsRegistry from '@/app/registry'
import { TRPCReactProvider } from '@/trpc/react'
import { SessionProvider } from 'next-auth/react'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from 'react-hot-toast'
import { cookies } from 'next/headers'

import ThemeProvider from '@/styles/ThemeProvider'
import Header from '@/app/_components/Header/Header'
import WelcomeMessage from '@/app/_components/WelcomeMessage'
import type { ThemeValue } from '@/styles/theme'

const pixelify = Pixelify_Sans({
	subsets: ['latin'],
})

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const cookieStore = await cookies()

	// Cookies use from https://nextjs.org/docs/app/api-reference/functions/cookies
	const theme = cookieStore.get('theme')?.value as ThemeValue | undefined

	return (
		<ThemeProvider initialTheme={theme}>
			<html lang="en">
				<body className={pixelify.className}>
					{/* NextTopLoader Configuration extracted from https://medium.com/@ahmadreys/how-to-add-toploader-in-next-js-with-typescript-13e2f833eb19 */}
					<NextTopLoader
						color="#2299DD"
						initialPosition={0.08}
						crawlSpeed={200}
						height={3}
						showSpinner={false}
						crawl={true}
						easing="ease"
						speed={200}
						zIndex={100000000}
						shadow="0 0 10px #2299DD,0 0 5px #2299DD"
					/>
					<StyledComponentsRegistry>
						<NextTopLoader />
						<SessionProvider>
							<TRPCReactProvider>
								<Header />
								<main className="main">{children}</main>
								<Toaster
									position="bottom-center"
									reverseOrder={false}
									containerStyle={{
										zIndex: 100000000,
									}}
								/>
								<WelcomeMessage />
							</TRPCReactProvider>
						</SessionProvider>
					</StyledComponentsRegistry>
				</body>
			</html>
		</ThemeProvider>
	)
}

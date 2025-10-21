'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

const WelcomeMessage = () => {
	const { data: session } = useSession()

	useEffect(() => {
		if (!session) return

		const { name } = session.user

		toast(`¡Bienvenido, ${name}!`, { icon: '👏' })
	}, [session])

	return null
}

export default WelcomeMessage

'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const WelcomeMessage = () => {
	const { data: session } = useSession()
	const [alreadyWelcomed, setAlreadyWelcomed] = useState(false)

	useEffect(() => {
		if (!session || alreadyWelcomed) return

		const { name } = session.user

		toast(`¡Bienvenido, ${name}!`, { icon: '👏' })
		setAlreadyWelcomed(true)
	}, [session])

	return null
}

export default WelcomeMessage

'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { api } from '@/trpc/react'

import { StyledButton } from './styles'

const ButtonDelete = ({
	id,
}: {
	id: string
}) => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const deleteProjectMutation = api.project.delete.useMutation()

	const handleClickDelete = async () => {
		setIsLoading(true)
		await deleteProjectMutation.mutateAsync({ id })
		router.refresh()
	}

	return (
		<StyledButton
			type="button"
			onClick={handleClickDelete}
			disabled={isLoading}
		>
			{isLoading ? 'Borrando' : 'Borrar'}
		</StyledButton>
	)
}

export default ButtonDelete

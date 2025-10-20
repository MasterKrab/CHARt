'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { api } from '@/trpc/react'

import { StyledButton } from './styles'
import TrashIcon from '@/assets/icons/trash.svg'

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
			aria-label="Borrar proyecto"
			onClick={handleClickDelete}
			disabled={isLoading}
		>
			<TrashIcon color="#FF5555" width={24} height={24} />
			{isLoading ? 'Borrando' : 'Borrar'}
		</StyledButton>
	)
}

export default ButtonDelete

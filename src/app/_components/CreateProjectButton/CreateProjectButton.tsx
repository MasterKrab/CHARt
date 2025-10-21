import type { InputJsonValue } from '@prisma/client/runtime/library'

import { useState } from 'react'
import { api } from '@/trpc/react'
import { toast } from 'react-hot-toast'

import createEmptySquareData from '@/utils/createEmptySquareData'

import { StyledButton } from './styles'
import { useRouter } from 'next/navigation'

const CreateProjectButton = () => {
	const router = useRouter()
	const createProjectMutation = api.project.create.useMutation()
	const [isLoading, setIsLoading] = useState(false)

	const handleClick = async () => {
		setIsLoading(true)

		const promise = createProjectMutation.mutateAsync({
			data: createEmptySquareData(30) as unknown as InputJsonValue,
		})

		toast.promise(promise, {
			loading: 'Creando proyecto...',
			success: <strong>Proyecto creado</strong>,
			error: <strong>Error creando proyecto</strong>,
		})

		const { id } = await promise

		router.push(`/edit/${id}`)
	}

	return (
		<StyledButton onClick={handleClick} disabled={isLoading}>
			Nuevo proyecto
		</StyledButton>
	)
}

export default CreateProjectButton

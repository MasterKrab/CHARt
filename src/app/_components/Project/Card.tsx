'use client'

import type { Project } from './types'

import Image from 'next/image'

import User from '@/app/_components/User/User'
import DeleteButton from '@/app/_components/DeleteProjectButton/DeleteProjectButton'
import createRectanglesPatterns from '@/utils/createRectanglesPatterns'

import { useTopLoader } from 'nextjs-toploader'
import { useRouter } from 'next/navigation'

import { StyledContainer, StyledBottomContainer } from './cardStyles'

interface CardProps extends Project {
	isEditMode?: boolean
}

const Card = ({ id, width, height, user, isEditMode = false }: CardProps) => {
	const loader = useTopLoader()
	const router = useRouter()

	const handleClickEdit = async () => {
		if (!isEditMode) return

		loader.start()
		router.push(`/edit/${id}`)
	}

	const handleClickProjects = () => {
		if (isEditMode) return

		loader.start()
		router.push(`/projects/${user.id}`, {})
	}

	return (
		<StyledContainer
			initial={{ scale: 0.75, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			$isClickable={isEditMode}
		>
			<Image
				sizes="100vw"
				src={`/api/image/${id}`}
				alt={`Proyecto ${id}`}
				style={{
					width: '100%',
					height: 'auto',
					...createRectanglesPatterns({}),
				}}
				width={width * 50}
				height={height * 50}
				unoptimized={true}
				onClick={handleClickEdit}
			/>
			<StyledBottomContainer
				onClick={handleClickProjects}
				$isClickable={!isEditMode}
			>
				<User name={user.name} image={user.image} />
				{isEditMode && <DeleteButton id={id} />}
			</StyledBottomContainer>
		</StyledContainer>
	)
}

export default Card

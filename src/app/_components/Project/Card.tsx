'use client'

import type { Project } from './types'

import Image from 'next/image'

import User from '@/app/_components/User/User'
import DeleteButton from '@/app/_components/DeleteProjectButton/DeleteProjectButton'
import createRectanglesPatterns from '@/utils/createRectanglesPatterns'

import { StyledContainer, StyledBottomContainer } from './cardStyles'

import { useRouter } from 'next/navigation'

interface CardProps extends Project {
	isEditMode?: boolean
}

const Card = ({ id, width, height, user, isEditMode = false }: CardProps) => {
	const router = useRouter()

	const handleClickEdit = () => {
		if (!isEditMode) return
		router.push(`/edit/${id}`)
	}

	const handleClickProjects = () => {
		if (isEditMode) return
		router.push(`/projects/${user.id}`)
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

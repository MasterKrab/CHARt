import type { Project } from './types'

import Image from 'next/image'

import User from '@/app/_components/User/User'
import { StyledContainer } from './cardStyles'

interface CardProps extends Project {
	isEditMode?: boolean
}

const Card = ({ id, width, height, user, isEditMode = false }: CardProps) => {
	return (
		<StyledContainer
			initial={{ scale: 0.75, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
		>
			<Image
				sizes="100vw"
				src={`/api/image/${id}`}
				alt={`Proyecto ${id}`}
				style={{
					width: '100%',
					height: 'auto',
					border: '2px solid #ccc',
				}}
				width={width * 50}
				height={height * 50}
				unoptimized={true}
			/>
			<div>
				<User name={user.name} image={user.image} />
			</div>
		</StyledContainer>
	)
}

export default Card

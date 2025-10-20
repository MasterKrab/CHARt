import type { Project } from './types'

import Masonry from '@/app/_components/Masonry/Masonry'
import Card from './Card'
import { StyledCardsContainer } from './cardsStyles'

interface CardsProps {
	projects: Project[]
	isEditMode?: boolean
}

const Cards = ({ projects, isEditMode = false }: CardsProps) => {
	return (
		<StyledCardsContainer>
			<Masonry>
				{projects.map(({ id, width, height, user }) => (
					<Card
						key={id}
						id={id}
						width={width}
						height={height}
						user={user}
						isEditMode={isEditMode}
					/>
				))}
			</Masonry>
		</StyledCardsContainer>
	)
}

export default Cards

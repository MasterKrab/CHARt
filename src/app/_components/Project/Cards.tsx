import type { Project } from './types'

import Masonry from '@/app/_components/Masonry/Masonry'
import Card from './Card'

interface CardsProps {
	projects: Project[]
	isEditMode?: boolean
}

const Cards = ({ projects, isEditMode = false }: CardsProps) => {
	return (
		<article>
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
		</article>
	)
}

export default Cards

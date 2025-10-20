'use client'

import './styles.css'
import ReactMasonryCSS from 'react-masonry-css'

const Masonry = ({
	children,
	breakpointCols = {
		default: 4,
		1100: 3,
		700: 2,
		500: 1,
	},
}: {
	children: React.ReactNode
	breakpointCols?: { [key: string]: number } | number
}) => (
	<ReactMasonryCSS
		className="masonry-grid"
		columnClassName="masonry-grid_column"
		breakpointCols={breakpointCols}
	>
		{children}
	</ReactMasonryCSS>
)

export default Masonry

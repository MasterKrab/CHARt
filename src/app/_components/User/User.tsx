'use client'

import { StyledImage, StyledName, StyledSection } from './styles'

const UserClient = ({
	name,
	image,
}: {
	name: string
	image: string
}) => (
	<StyledSection>
		<StyledName>{name}</StyledName>
		<StyledImage src={image} alt={name} />
	</StyledSection>
)

export default UserClient

import type { Theme } from '@/styles/theme'
import styled from 'styled-components'
import { motion } from 'framer-motion'

export const StyledButton = styled.button<{
	theme: Theme
	$active?: boolean
}>`
    position: relative;
    display: grid;
    place-content: center;
    width: 2.5rem;
    height: 2.5rem;
    transform: ${({ $active }) => ($active ? 'rotate(0) scale(1)' : 'rotate(240deg) scale(0)')};
    transition: transform 0.5s ease-in-out;
    color:  ${({ theme }) => theme.primary};
`

export const StyledIconContainer = styled(motion.span)`
    position: absolute;
`

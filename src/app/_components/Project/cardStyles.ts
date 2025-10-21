'use client'

import styled from 'styled-components'

import { motion } from 'framer-motion'

export const StyledContainer = styled(motion.article)<{
	$isClickable: boolean
}>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 1rem;
    padding: 1rem;
    cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'default')};
`

export const StyledBottomContainer = styled.div<{
	$isClickable: boolean
}>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'default')};
`

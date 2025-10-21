'use client'

import type { Theme } from '@/styles/theme'
import styled from 'styled-components'

export const StyledSection = styled.section<{
	theme: Theme
}>`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.primary};
  `

export const StyledName = styled.p`
  margin-top: 0;
  margin-bottom: 0;
`

export const StyledImage = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`

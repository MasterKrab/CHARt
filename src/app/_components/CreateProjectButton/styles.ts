'use client'

import type { Theme } from '@/styles/theme'

import styled from 'styled-components'

export const StyledButton = styled.button<{
	theme: Theme
}>`
  background-color: ${({ theme }) => theme.active};
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  transition: transform 0.25s;

  &:hover{
    transform: scale(1.1);
  }
`

'use client'

import type { Theme } from '@/styles/theme'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Link from 'next/link'

export const StyledHeader = styled.header<{
	theme: Theme
}>` 
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  gap: 1rem;
  background-color: ${({ theme }) => theme.background};
  box-shadow: 0 0 1rem ${({ theme }) => theme.shadowColor};
  color: ${({ theme }) => theme.primary};
  transition: var(--transition-theme);
`

export const StyledNavigation = styled.nav<{
	theme: Theme
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  font-size: 1.25rem;
  margin-right: auto;
  transition: var(--transition-theme);

  @media (max-width: 768px) {
    font-size: 2.25rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
  }
`

export const StyledList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-left: 0;
  margin-top: 0; 
  margin-bottom: 0;


  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem;
  }
`

// Extracted styles for this component from https://github.com/MasterKrab/ajpc-webpage/blob/main/src/components/Header.astro
export const StyledButtonMenu = styled.button<{
	theme: Theme
	$isOpen: string
}>`
  position: relative;
  z-index: 100000;
  display: block;
  justify-self: end;
  width: 2rem;
  height: 1.5rem;
  border-top: 0.25rem solid ${({ theme }) => theme.primary};
  transition: border-top-color 0.2s ease-in-out;
  border-top-color:  ${({ $isOpen, theme }) => ($isOpen === 'true' ? 'transparent' : theme.primary)};
  margin-right: auto;

  &::before,
  &::after {
    position: absolute;
    content: '';
    left: 0;
    display: block;
    width: 2rem;
    height: 0.2rem;
    background-color: ${({ theme }) => theme.primary};
    transition: transform 0.3s ease-in-out;
  }

  &::before {
    top: 0.45rem;
    transform: ${({ $isOpen }) => ($isOpen === 'true' ? 'rotate(45deg)' : 'none')};
    }
    
  &::after {
    bottom: 0;
    transform: ${({ $isOpen }) => ($isOpen === 'true' ? 'translateY(-0.6rem) rotate(-45deg)' : 'none')};
  }

`

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;
  line-height: 1;

`

export const StyledToolTipContainer = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: min-content;
  --tooltip-bottom: -5.25rem;

`

export const StyledToolTipButton = styled.button<{ theme: Theme }>`
  text-align: center;
  width: 100%;
  color: ${({ theme }) => theme.primary};
`

export const StyledOpenToolTipButton = styled.button<{ theme: Theme }>`
  display: grid;
  place-content: center;
  color: ${({ theme }) => theme.primary};
`

export const StyledRightHeaderContainer = styled.div`
  display: flex;
  gap: 1rem;
`

export const StyledLoginButton = styled.button<{
	theme: Theme
}>`
  background-color: ${({ theme }) => theme.active};
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  transition: transform 0.25s;
  width: max-content;

  &:hover{
    transform: scale(1.1);
  }
`

'use client'

import styled from 'styled-components'

import { motion } from 'framer-motion'

import Link from 'next/link'

export const StyledHeader = styled.header` 
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 10000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);
`

export const StyledNavigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  font-size: 1.25rem;

  @media (max-width: 768px) {
    font-size: 2.25rem;
    position: absolute;
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
export const StyledButtonMenu = styled.button<{ $isOpen: string }>`
  position: relative;
  z-index: 100000;
  display: block;
  justify-self: end;
  width: 2rem;
  height: 1.5rem;
  border-top: 0.25rem solid black;
  transition: border-top-color 0.2s ease-in-out;
  border-top-color:  ${({ $isOpen }) => ($isOpen === 'true' ? 'transparent' : 'black')};;

  &::before,
  &::after {
    position: absolute;
    content: '';
    left: 0;
    display: block;
    width: 2rem;
    height: 0.2rem;
    background-color: black;
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
  --tooltip-bottom: -3.25rem;
`

export const StyledToolTipButton = styled.button`
  text-align: center;
  width: 100%;
`

export const StyledOpenToolTipButton = styled.button`
  display: grid;
  place-content: center;
`

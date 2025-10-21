'use client'

import type { Theme } from '@/styles/theme'
import styled, { keyframes } from 'styled-components'

export const StyledEditorContainer = styled.section`
    height: 100%;
    overflow-x: hidden;
    position: relative;
`

export const StyledToolsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
`

export const StyledTopLeftContainer = styled.section`
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    display: flex;
    gap: 1rem;
`

export const StyledColorButton = styled.button<{
	theme: Theme
	color: string
}>`
    position: absolute;
    left: 0.5rem;
    bottom: 0.5rem;
    width: 2rem;
    height: 2rem;
    background-color: ${({ color }) => color};    
    border: 0.25rem solid white;
    box-shadow: 0 0 1rem ${({ theme }) => theme.shadowColor};
`

export const StyledColorPickerContainer = styled.div`
    position: absolute;
    bottom: 3.5rem;
    left: 0.5rem;
`

export const StyledButtonTool = styled.button<{
	theme: Theme
	$isSelected: boolean
}>`
    position: relative;
    display: grid;
    place-items: center;
    background-color: ${({ theme }) => theme.primary};
    width: 2.15rem;
    height: 2.15rem;
    border-radius: 50%;
    border:  ${({ $isSelected, theme }) => ($isSelected ? theme.tertiary : 'transparent')}  solid 0.15rem;
    transition: transform 0.5s;
    color: ${({ theme }) => theme.tertiary};

    &:hover{
        transform: scale(1.2);
    }
`

const savingAnimation = keyframes`
    0% { transform: scale(1);  }
    50% { transform: scale(1.25);  }
    100% { transform: scale(1);  }
`

export const StyledSaveButton = styled.button<{
	theme: Theme
	$animate: boolean
}>`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: ${({ theme }) => theme.primary};
    border: none;
    border-radius: 50%;
    padding: 0.3rem;
    width: 2.5rem;
    height: 2.5rem;
    animation: ${({ $animate }) => ($animate ? savingAnimation : 'none')} 1s infinite;
    transition: opacity 0.5s ease-in-out;
    color: ${({ theme }) => theme.active};
    border: 0.25rem solid ${({ theme }) => theme.active};
    
    &:hover{
        transform: ${({ $animate }) => ($animate ? 'none' : 'scale(1.1)')};
    }

    &:disabled{
        opacity: 0;
    }
`

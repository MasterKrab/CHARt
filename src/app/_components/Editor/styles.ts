'use client'

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

export const StyledColorButton = styled.button<{ color: string }>`
    position: absolute;
    left: 0.5rem;
    bottom: 0.5rem;
    width: 2rem;
    height: 2rem;
    background-color: ${({ color }) => color};    
    border: 0.25rem solid white;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);
`

export const StyledColorPickerContainer = styled.div`
    position: absolute;
    bottom: 3.5rem;
    left: 0.5rem;
`

export const StyledButtonTool = styled.button<{
	$isSelected: boolean
}>`
    position: relative;
    display: grid;
    place-content: center;
    background-color: #eee;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border:  ${({ $isSelected }) => ($isSelected ? 'black' : 'transparent')}  solid 0.15rem;
    transition: transform 0.5s;
    color: black;

    &:hover{
        transform: scale(1.2);
    }
`

const savingAnimation = keyframes`
    0% { transform: scale(1);  }
    50% { transform: scale(1.25);  }
    100% { transform: scale(1);  }
`

export const StyledSaveButton = styled.button<{ $animate: string }>`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #eee;
    border: none;
    border-radius: 50%;
    padding: 0.5rem;
    width: 2.5rem;
    height: 2.5rem;
    animation: ${({ $animate }) => ($animate === 'true' ? savingAnimation : 'none')} 1s infinite;
    transition: opacity 0.5s ease-in-out;
    color: black;
    
    &:hover{
        transform: ${({ $animate }) => ($animate === 'true' ? 'none' : 'scale(1.1)')};
    }

    &:disabled{
        opacity: 0;
    }
`

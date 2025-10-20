'use client'

import styled from 'styled-components'

export const StyledButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: opacity 0.3s;
    color: #FF5555;
    font-size: 1.15rem;
    font-weight: bold;

    &:disabled {
        opacity: 0.6;
    }

    @media (max-width: 768px) {
        font-size: 1rem;
    }        
`

'use client'

import styled from 'styled-components'

export const StyledButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    transition: opacity 0.3s;
    color: #FF5555;
    font-size: 1.15rem;
    font-weight: bold;

    &:disabled {
        opacity: 0.6;
    }
`

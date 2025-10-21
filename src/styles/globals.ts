'use client'

import { createGlobalStyle } from 'styled-components'
import type { Theme } from '@/styles/theme'

// Transition extracted from https://github.com/MasterKrab/ajpc-webpage/blob/main/src/styles/global.css

const GlobalStyles = createGlobalStyle<Theme>`
    :root {
        --transition-theme: background-color 0.3s ease-in-out, color 0.2s ease-in-out;
    }    

* {
        box-sizing: inherit;
    }

    html {
        box-sizing: border-box;
    }

    body {
        display: grid;
        grid-template-rows: 4rem 1fr;
        min-height: max(650px, 100vh);
        background-color: ${({ background }) => background};
        color: ${({ secondary }) => secondary};
        transition: var(--transition-theme);
        }
        
    .main {
        height: 100%;
        padding: 1rem;
    }

    img {
        display: block;
        width: 100%;
    }

    button {
        background-color: transparent;
        border: none;
        font-weight: normal;
    }GlobalStyles
`

export default GlobalStyles

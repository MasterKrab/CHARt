import type { Theme } from '@/styles/theme'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle<{
	theme: Theme
}>`
.tooltip {
  position: absolute;
  bottom: var(--tooltip-bottom);
  right: 0;
  z-index: 100000;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.tertiary};
  list-style: none;
  width: 12rem;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0.75rem;
  border-radius: 0.75rem;
  transform-origin: top right;
  box-shadow: 0 0.188rem 0.25rem rgba(0, 0, 0, 0.05);
}
`

export default GlobalStyles

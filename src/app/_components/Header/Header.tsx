'use client'

import Image from 'next/image'
import { useState, type MouseEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'

import User from '@/app/_components/User/User'
import ToolTip from '@/app/_components/ToolTip/ToolTip'
import ChevronDownIcon from '@/assets/icons/chevron-down.svg'
import useProviders from '@/hooks/useProviders'
import useMatchMedia from '@/hooks/useMatchMedia'

import {
	StyledHeader,
	StyledNavigation,
	StyledList,
	StyledLink,
	StyledToolTipContainer,
	StyledToolTipButton,
	StyledOpenToolTipButton,
	StyledButtonMenu,
} from './styles'

const Header = () => {
	const { data: session } = useSession()

	const providers = useProviders()

	const [isOpenTooltip, setIsOpenTooltip] = useState(false)
	const [isOpenMenu, setIsOpenMenu] = useState(false)
	const isDesktop = useMatchMedia('(min-width: 768px)')

	const handleClickToggleToolTip: MouseEventHandler = (event) => {
		event.stopPropagation()
		setIsOpenTooltip(!isOpenTooltip)
	}

	const closeToolTip = () => {
		if (isOpenTooltip) setIsOpenTooltip(false)
	}

	const closeMenu = () => setIsOpenMenu(false)

	return (
		<AnimatePresence>
			<StyledHeader>
				{(isDesktop || isOpenMenu) && (
					<StyledNavigation>
						<StyledList>
							<li>
								<StyledLink href="/" onClick={closeMenu}>
									<Image
										src="/assets/logo.svg"
										width={30}
										height={30}
										alt="Inicio"
									/>
									CHARt
								</StyledLink>
							</li>
							{session && (
								<>
									<li>
										<StyledLink
											href={`/projects/${session.user.id}`}
											onClick={closeMenu}
										>
											Mis projectos
										</StyledLink>
									</li>
									<li>
										<StyledLink href="/edit/new" onClick={closeMenu}>
											Nuevo proyecto
										</StyledLink>
									</li>
								</>
							)}
						</StyledList>
					</StyledNavigation>
				)}

				{!isDesktop && (
					<StyledButtonMenu
						onClick={() => setIsOpenMenu(!isOpenMenu)}
						$isOpen={`${isOpenMenu}`}
					/>
				)}

				{session?.user ? (
					<StyledToolTipContainer
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0 }}
						onClick={handleClickToggleToolTip}
					>
						<User name={session.user.name!} image={session.user.image!} />
						<StyledOpenToolTipButton
							type="button"
							aria-label="Abrir menu"
							onClick={handleClickToggleToolTip}
						>
							<ChevronDownIcon width={24} height={24} />
						</StyledOpenToolTipButton>
						<ToolTip isOpen={isOpenTooltip} onClose={closeToolTip}>
							<StyledToolTipButton type="button" onClick={() => signOut()}>
								Cerrar sesión
							</StyledToolTipButton>
						</ToolTip>
					</StyledToolTipContainer>
				) : (
					<StyledToolTipContainer
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0 }}
					>
						<motion.span
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0 }}
						>
							<button type="button" onClick={handleClickToggleToolTip}>
								Iniciar sesión
							</button>
						</motion.span>
						<ToolTip isOpen={isOpenTooltip} onClose={closeToolTip}>
							{Object.values(providers).map(({ id, name }) => (
								<li key={id}>
									<StyledToolTipButton type="button" onClick={() => signIn(id)}>
										{name}
									</StyledToolTipButton>
								</li>
							))}
						</ToolTip>
					</StyledToolTipContainer>
				)}
			</StyledHeader>
		</AnimatePresence>
	)
}

export default Header

import React, { useState, useCallback, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Translateable } from 'components/Translateable'
import { useHistory } from 'react-router-dom'
import breakpoint from 'styled-components-breakpoint'
import routes from 'routes'
import theme from 'theme'
import Ripples from 'react-ripples'

const {
	timing: {
		desktopNav: { navigateDelay, toggleNavbarOpen, toggleNavbarItemOpen }
	},
	colors
} = theme

const CLOSED_NAV_WIDTH = 40
const TOGGLE_NAVBAR_OPEN_CLOSE_DELAY = toggleNavbarOpen.getCloseDelay()

const ICON_WIDTH = 20
const ICON_HEIGHT = 15
const ICON_BAR_OPEN_WIDTH = Math.pow(
	Math.pow(ICON_HEIGHT, 2) + Math.pow(ICON_WIDTH, 2),
	0.5
)
const ICON_BAR_OPEN_OFFSET = ICON_HEIGHT / 3 / 2

const NAVIGATE_DELAY =
	TOGGLE_NAVBAR_OPEN_CLOSE_DELAY + toggleNavbarOpen.duration + navigateDelay

const transitionProps = (props, transition) =>
	props.map(prop => `${prop} ${transition}`).join(', ')

const setNavTransform = ({ open }) =>
	open ? '0' : `calc(-100% + ${CLOSED_NAV_WIDTH}px)`
const setNavTransition = ({ open }) => {
	const { timing, duration } = toggleNavbarOpen
	const delay = open ? 0 : TOGGLE_NAVBAR_OPEN_CLOSE_DELAY
	return `transform ${duration}ms ${timing} ${delay}ms`
}

const Nav = styled.nav`
	z-index: 200;
	background-color: black;
	overflow: hidden;
	display: none;
	justify-content: center;
	align-items: center;
	${breakpoint('desktop')`
		display: flex;	
	`}
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	width: 100vw;
	transition: ${setNavTransition};
	transform: translateX(${setNavTransform});
	& .react-ripples {
		cursor: pointer;
		transition: background-color 250ms ease;
		&:hover {
			background-color: rgba(255, 255, 255, 0.15);
		}
		position: absolute !important;
		top: 0;
		right: 0;
		height: 100%;
		width: ${CLOSED_NAV_WIDTH}px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`
const NavList = styled.ul``

const NavListItem = styled.li`
	color: white;
	font-size: 72px;
	line-height: 1.1;
	margin-bottom: 42px;
	overflow: hidden;
`

const setSelectedNavItemTextOpacity = ({ open }) => (open ? '1' : '0')
const setSelectedNavItemTextTransform = ({ open }) => (open ? '0' : '110%')
const setSelectedNavItemPointerEvents = ({ selected }) =>
	selected ? 'none' : 'all'
const setSelectedNavItemTextColor = ({ selected }) =>
	selected ? colors.font.red : colors.font.white
const setSelectedNavItemTransition = ({ open, index }) => {
	const { timing, duration, delayInterval } = toggleNavbarItemOpen
	const { duration: baseDelay } = toggleNavbarOpen

	const delay = (open ? baseDelay : 0) + index * delayInterval

	return transitionProps(
		[ 'opacity', 'transform' ],
		`${duration}ms ${timing} ${delay}ms`
	)
}

const NavItemText = styled.span`
	cursor: pointer;
	font-weight: 200;
	font-family: Raleway;
	color: ${setSelectedNavItemTextColor};
	opacity: ${setSelectedNavItemTextOpacity};
	&:hover {
		color: ${colors.font.red};
		transition: color 500ms ease;
	}
	display: inline-block;
	pointer-events: ${setSelectedNavItemPointerEvents};
	transform: translateY(${setSelectedNavItemTextTransform});
	transition: ${setSelectedNavItemTransition};
`

const setNavIconBarTransition = open => {
	const { duration } = toggleNavbarOpen
	const delay = open ? 0 : TOGGLE_NAVBAR_OPEN_CLOSE_DELAY
	return transitionProps(
		[ 'width', 'bottom', 'top', 'transform', 'opacity' ],
		`${duration}ms ease ${delay}ms`
	)
}

const setNavIconBarWidth = ({ open }) =>
	open ? ICON_BAR_OPEN_WIDTH + 'px' : '100%'

const NavIcon = styled.div`
	position: relative;
	right: ${({ open }) => (open ? -ICON_BAR_OPEN_OFFSET * 2 : 0)}px;
	height: ${ICON_HEIGHT}px;
	width: ${ICON_WIDTH}px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	& > .bar {
		height: 20%;
		position: relative;
		background-color: white;
		width: ${setNavIconBarWidth};
		${({ open }) => {
			const rotateDeg = open ? 45 : 0
			const offsetPx = open ? ICON_BAR_OPEN_OFFSET : 0
			const middleOpacity = open ? 0 : 1
			return `
				&:nth-child(1) {
					transform: rotate(${rotateDeg}deg);
					bottom: ${offsetPx}px;
				}
				&:nth-child(2) {
					opacity: ${middleOpacity};
				}
				&:nth-child(3) {
					transform: rotate(${-rotateDeg}deg);
					top: ${offsetPx}px;
				}
			`
		}}
		transform-origin: left center;
		transition: ${setNavIconBarTransition};
	}
`

const DesktopNav = props => {
	const { children, className } = props
	const [ open, setOpen ] = useState(false)
	const { push, location } = useHistory()

	const handleToggle = useCallback(() => setOpen(prev => !prev), [])

	useEffect(() => {
		window.addEventListener('resize', function() {
			if (!open) return
			this.innerWidth < theme.breakpoints.desktop && setOpen(false)
		})
	}, [ open ])

	return (
		<Nav
			className={className}
			open={open}
		>
			<NavList open={open}>
				{routes.map((view, i) => {
					const isSelectedNavItem = `/${view.path}` === location.pathname
					const navigateToItemPath = () => {
						setOpen(false)
						setTimeout(
							() => push(`/${view.path}${location.search}`),
							NAVIGATE_DELAY
						)
					}
					return (
						<NavListItem key={view.title.en}>
							<NavItemText
								index={i}
								open={open}
								selected={isSelectedNavItem}
								onClick={navigateToItemPath}
							>
								<Translateable {...view.title} />
							</NavItemText>
						</NavListItem>
					)
				})}
			</NavList>
			<Ripples
				className="ripples"
				color="white"
				onClickCapture={handleToggle}
			>
				<NavIcon open={open}>
					<div className="bar" />
					<div className="bar" />
					<div className="bar" />
				</NavIcon>
			</Ripples>
		</Nav>
	)
}

DesktopNav.propTypes = {
	className: PropTypes.string
}
export default DesktopNav

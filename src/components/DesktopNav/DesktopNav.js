import React, { useState, useCallback, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Translateable } from 'components/Translateable'
import { useHistory } from 'react-router-dom'
import breakpoint from 'styled-components-breakpoint'
import routes from 'routes'
import theme from 'theme'
import clsx from 'clsx'
import { Drawer, ButtonBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

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

const useStyles = makeStyles(muiTheme => ({
	drawer: {
		'& .MuiDrawer-paperAnchorDockedLeft': {
			width: '100vw',
			backgroundColor: 'black',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		}
	},
	drawerClosed: {
		'& .MuiDrawer-paperAnchorDockedLeft': {
			transform: `translateX(calc(-100vw + ${CLOSED_NAV_WIDTH}px)) !important`,
			visibility: 'visible !important',
			transition:
				muiTheme.transitions.create('transform', {
					easing: muiTheme.transitions.easing.easeInOut,
					duration: toggleNavbarOpen.duration,
					delay: TOGGLE_NAVBAR_OPEN_CLOSE_DELAY
				}) + '!important'
		}
	},
	drawerOpen: {
		'& .MuiDrawer-paperAnchorDockedLeft': {
			transition:
				muiTheme.transitions.create('transform', {
					easing: muiTheme.transitions.easing.easeInOut,
					duration: toggleNavbarOpen.duration
				}) + '!important'
		}
	}
}))

const transitionProps = (props, transition) =>
	props.map(prop => `${prop} ${transition}`).join(', ')

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
	}
	display: inline-block;
	pointer-events: ${setSelectedNavItemPointerEvents};
	transform: translateY(${setSelectedNavItemTextTransform});
	transition: ${setSelectedNavItemTransition}, color 500ms ease 0ms;
`

const getRippleStyles = makeStyles({
	child: {
		opacity: 1,
		backgroundColor: 'white'
	}
})
const ButtonBaseWithModifiedRipples = ({ ...props }) => {
	const rippleClasses = getRippleStyles()
	return (
		<ButtonBase
			centerRipple={false}
			{...props}
			TouchRippleProps={{ classes: rippleClasses }}
		/>
	)
}

const NavIconRipplePanel = styled(ButtonBaseWithModifiedRipples)`
	cursor: pointer;
	transition: background-color 250ms ease;
	&:hover {
		background-color: rgba(255, 255, 255, 0.15);
		& .bar {
			/* background-color: black; */
		}
	}
	position: absolute !important;
	top: 0;
	right: 0;
	height: 100%;
	width: ${CLOSED_NAV_WIDTH}px;
	display: flex;
	justify-content: center;
	align-items: center;
	pointer-events: ${({ cancelPointers }) => (cancelPointers ? 'none' : 'all')};
`

const setNavIconBarTransition = ({ open }) => {
	const { duration } = toggleNavbarOpen
	const delay = open ? duration : TOGGLE_NAVBAR_OPEN_CLOSE_DELAY + duration
	return transitionProps(
		[ 'width', 'bottom', 'top', 'transform', 'opacity', 'left' ],
		`${duration}ms ease ${delay}ms`
	)
}

const setNavIconBarWidth = ({ open }) =>
	open ? ICON_BAR_OPEN_WIDTH + 'px' : '100%'

const NavIcon = styled.div`
	position: relative;
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
				left: ${open ? ICON_WIDTH / 5 : 0}px;
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
	const { className } = props
	const [ open, setOpen ] = useState(false)
	const [ moving, setMoving ] = useState(false)
	const { push, location } = useHistory()

	const handleToggle = useCallback(() => {
		setMoving(true)
		setOpen(prev => !prev)
		setTimeout(
			() => setMoving(false),
			toggleNavbarOpen.duration + TOGGLE_NAVBAR_OPEN_CLOSE_DELAY
		)
	}, [])

	useEffect(() => {
		window.addEventListener('resize', function() {
			if (!open) return
			if (this.innerWidth < theme.breakpoints.desktop) setOpen(false)
		})
	}, [ open ])

	const classes = useStyles({ open })

	return (
		<Drawer
			anchor="left"
			classes={{
				root: clsx({
					[classes.drawer]: true,
					[classes.drawerOpen]: open,
					[classes.drawerClosed]: !open
				}),
				paper: className
			}}
			open={open}
			variant="persistent"
		>
			<NavList open={open}>
				{routes.map((view, i) => (
					<NavListItem key={view.title.en}>
						<NavItemText
							index={i}
							open={open}
							selected={`/${view.path}` === location.pathname}
							onClick={e => {
								e.stopPropagation()
								setOpen(false)
								setTimeout(
									() => push(`/${view.path}${location.search}`),
									NAVIGATE_DELAY
								)
							}}
						>
							<Translateable {...view.title} />
						</NavItemText>
					</NavListItem>
				))}
				<NavIconRipplePanel
					cancelPointers={moving && !open}
					centerRipple={false}
					onClick={handleToggle}
				>
					<NavIcon open={open}>
						<div className="bar" />
						<div className="bar" />
						<div className="bar" />
					</NavIcon>
				</NavIconRipplePanel>
			</NavList>
		</Drawer>
	)
}

DesktopNav.propTypes = {
	className: PropTypes.string
}
export default DesktopNav

import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Translateable } from 'components/Translateable'
import { useHistory } from 'react-router-dom'
import breakpoint from 'styled-components-breakpoint'
import routes from 'routes'
import theme from 'theme'
import clsx from 'clsx'
import { ButtonBase, Drawer } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { HamburgerSpinReverse } from 'react-animated-burgers'
import { animated, useTrail, config } from 'react-spring'
const { colors } = theme

const CLOSED_NAV_WIDTH = 40

const useStyles = makeStyles(muiTheme => ({
	drawer: {
		display: 'none',
		'& .MuiDrawer-paperAnchorDockedLeft': {
			visibility: 'visible !important',
			width: '100vw',
			backgroundColor: 'black',
			justifyContent: 'center',
			alignItems: 'center'
		}
	},
	drawerClosed: {
		'& .MuiDrawer-paperAnchorDockedLeft': {
			transform: `translateX(calc(-100vw + ${CLOSED_NAV_WIDTH}px)) !important`,
			transition: () => {
				return (
					muiTheme.transitions.create('transform', {
						easing: muiTheme.transitions.easing.easeIn,
						duration: muiTheme.transitions.duration.leavingScreen,
						delay: 500
					}) + ' !important'
				)
			}
		}
	},
	drawerOpen: {
		'& .MuiDrawer-paperAnchorDockedLeft': {
			transition:
				muiTheme.transitions.create('transform', {
					easing: muiTheme.transitions.easing.Out,
					duration: muiTheme.transitions.duration.enteringScreen,
					delay: 0
				}) + ' !important'
		}
	}
}))

const DrawerWithBreakpoint = styled(Drawer)`
	${breakpoint('desktop')`
		display: flex !important;
	`}
`

const NavIconRipplePanel = styled(ButtonBase)`
	transition: background-color 250ms ease;
	overflow: hidden;
	position: absolute !important;
	top: 0;
	right: 0;
	height: 100%;
	width: ${CLOSED_NAV_WIDTH}px;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	& > button:first-child {
		padding: 0;
	}
	& > button:first-child {
		& span {
			background-color: white !important;
			&:before,
			&:after {
				background-color: white !important;
			}
		}
	}
	&:hover {
		background-color: white !important;
		& > button:first-child {
			& span {
				background-color: black !important;
				&:before,
				&:after {
					background-color: black !important;
				}
			}
		}
		border-left: solid 2px black;
		border-right: solid 2px black;
	}
`

const NavListItem = styled(animated.li)`
	cursor: pointer;
	font-weight: 200;
	font-family: Raleway;
	color: ${({ selected }) => (selected ? colors.font.red : colors.font.white)};
	pointer-events: ${({ selected }) => (selected ? 'none' : 'all')};
	font-size: 72px;
	line-height: 1.1;
	margin-bottom: 42px;
	overflow: hidden;
	&:hover {
		transition: color 250ms ease;
		color: rgba(231, 76, 60, 1);
	}
`

const DesktopNav = () => {
	const [ open, setOpen ] = useState(false)

	const { push, location } = useHistory()

	const handleToggle = useCallback(() => {
		setOpen(open => !open)
	}, [])

	const classes = useStyles()

	useEffect(() => {
		window.addEventListener('resize', () => {
			if (window.innerWidth < theme.breakpoints.desktop) {
				setOpen(false)
			}
		})
	}, [])

	const opacitySpring = useTrail(routes.length, {
		from: {
			opacity: 0
		},
		to: {
			opacity: open ? 1 : 0
		},
		delay: open ? 500 : 0,
		config: {
			...config.wobbly,
			clamp: true
		}
	})

	const NavItemSprings = useTrail(routes.length, {
		from: {
			transform: 'translateY(100%)'
		},
		to: {
			transform: open ? 'translateY(0)' : 'translateY(100%)'
		},
		delay: open ? 500 : 0,
		config: config.wobbly
	})

	return (
		<DrawerWithBreakpoint
			anchor="left"
			className={clsx(classes.drawer, {
				[classes.drawerClosed]: !open,
				[classes.drawerOpen]: open
			})}
			open={open}
			variant="persistent"
		>
			<ul>
				{NavItemSprings.map((props, i) => (
					<NavListItem
						key={routes[i].path}
						selected={`/${routes[i].path}` === location.pathname}
						style={{ ...props, ...opacitySpring[i] }}
						onClick={() => {
							setOpen(false)
							push(`/${routes[i].path}${location.search}`)
						}}
					>
						<Translateable {...routes[i].title} />
					</NavListItem>
				))}
			</ul>
			<NavIconRipplePanel
				component="div"
				onClick={handleToggle}
			>
				<HamburgerSpinReverse
					buttonWidth={CLOSED_NAV_WIDTH * 0.75}
					isActive={open}
				/>
			</NavIconRipplePanel>
		</DrawerWithBreakpoint>
	)
}

DesktopNav.propTypes = {
	className: PropTypes.string
}
export default DesktopNav

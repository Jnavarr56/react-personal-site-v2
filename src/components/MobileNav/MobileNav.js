import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { FaTimes, FaPlus } from 'react-icons/fa'
import { Translateable } from 'components/Translateable'
import theme from 'theme'
import { useHistory, useLocation } from 'react-router-dom'
import Ripples from 'react-ripples'
import { useTrail, config, animated } from 'react-spring'
import routes from 'routes'

const calcDimensions = (open, size) => {
	const dimensions = {
		small: `
            border-radius: 100%;
            height: 54px;
            width: 54px;
            right: 32px;
            bottom: 32px;
        `,
		large: `
            border-radius: 100%;
            height: 72px;
            width: 72px;
            right: 64px;
            bottom: 64px;
        `
	}

	const openSizing = {
		small: `
            padding: 128px 56px;
            & * {
                font-size: 32px;
            }
        `,
		medium: `
            padding: 128px 64px;
            & li {
                & * {
                    font-size: 42px;
                }
            }
		`,
		large: `
			padding: 156px 72px;
			& li {
				& * {
					font-size: 56px;
				}
			}	
		`
	}

	return open
		? `
            border-radius: 0;
            padding: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            ${openSizing[size]}
        `
		: dimensions[size]
}

const openDuration = 500
const openQualities = [
	'border-radius',
	'height',
	'width',
	'right',
	'padding',
	'bottom'
]
const genWillChange = qualities => qualities.join(', ')
const genTransitions = (qualities, duration, open) =>
	qualities
		.map(q => `${q} ${duration}ms cubic-bezier(0.645, 0.045, 0.355, 1)`)
		.join(', ')

const Nav = styled.nav`
	z-index: 1000;
	position: fixed;
	overflow: hidden;
	box-sizing: border-box;
	background-color: black;
	will-change: ${genWillChange(openQualities)}, background-color;
	transition: ${genTransitions(
		openQualities,
		openDuration
	)}, background-color 2500ms ease;
	${({ open }) => calcDimensions(open, 'small')}
	${breakpoint('phone')`
        ${({ open }) => calcDimensions(open, 'medium')}
	`}
	${breakpoint('tablet')`
		${({ open }) => calcDimensions(open, 'large')}
	`}

	${breakpoint('phone')`
        ${({ open }) => calcDimensions(open, 'medium')}
	`}
    display: flex;
	justify-content: center;
	align-items: center;
	${breakpoint('desktop')`
        display: none;
	`}
	& .ripples {
		cursor: pointer;
		position: absolute !important;
		border-radius: 100%;
		padding: 16px 18px;
		overflow: hidden !important;
		${({ open }) => {
			if (!open) {
				return `
					height: 100%;
					width: 100%;
				`
			} else {
				return `
					${calcIconPosition('small')}
					${breakpoint('tablet')`
						${calcIconPosition('large')}
					`}
				`
			}
		}}
	}
`

const NavList = styled.ul`
	box-sizing: border-box;
	max-height: 600px;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`
const NavListItemText = styled(animated.span)`
	cursor: pointer;
	display: inline-block;
	color: white;
	font-weight: 200;
	font-family: Raleway;
	pointer-events: ${({ selected }) => (selected ? 'none' : 'all')};
	color: ${({ selected }) => (selected ? 'red' : 'white')};
	transition: 0.15s color ease;
`

const calcIconPosition = size => {
	const iconPosition = {
		small: `
            top: 16px;
            left: 16px;
        `,
		large: `
            top: 18px;
            left: 24px;
        `
	}
	return iconPosition[size]
}

const Icon = styled.span`
	z-index: 101;
	color: white;
	display: inline-block;
	transition: all 0.3s;
	will-change: top, left, transform;
	font-size: 16px;
	${breakpoint('tablet')`
        font-size: 28px;
    `}
	${({ open }) => {
		if (!open) {
			return `
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			`
		}
	}}
`

const RIPPLE_DELAY = 250

const MobileNav = () => {
	const history = useHistory()
	const location = useLocation()
	const [ open, setOpen ] = useState(false)
	const [ showItems, setShowItems ] = useState(false)

	const handleToggleNav = () => {
		if (open) {
			setShowItems(false)
			setTimeout(() => {
				setTimeout(() => setOpen(false), 500)
			}, RIPPLE_DELAY)
		} else {
			setOpen(true)
			setTimeout(() => {
				setTimeout(() => setShowItems(true), 500)
			}, RIPPLE_DELAY)
		}
	}

	useEffect(() => {
		window.addEventListener('resize', e => {
			if (e.target.innerWidth >= theme.breakpoints.desktop) {
				setOpen(false)
			}
		})
	}, [])

	const opacitySpring = useTrail(routes.length, {
		from: {
			opacity: 0
		},
		to: {
			opacity: showItems ? 1 : 0
		},
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
			transform: showItems ? 'translateY(0)' : 'translateY(100%)'
		},
		config: config.wobbly
	})

	return (
		<Nav open={open}>
			<NavList>
				{routes.map((view, i) => {
					return (
						<li key={view.title.en}>
							<NavListItemText
								selected={`/${view.path}` === location.pathname}
								style={{ ...opacitySpring[i], ...NavItemSprings[i] }}
								onClick={() => {
									history.push(`${view.path}${location.search}`)
									setShowItems(false)
									setTimeout(() => {
										setTimeout(() => setOpen(false), 500)
									}, RIPPLE_DELAY)
								}}
							>
								<Translateable
									en={view.title.en}
									es={view.title.es}
								/>
							</NavListItemText>
						</li>
					)
				})}
			</NavList>
			<Ripples
				className="ripples"
				color="white"
				onClick={handleToggleNav}
			>
				<Icon open={open}>{open ? <FaTimes /> : <FaPlus />}</Icon>
			</Ripples>
		</Nav>
	)
}

export default MobileNav

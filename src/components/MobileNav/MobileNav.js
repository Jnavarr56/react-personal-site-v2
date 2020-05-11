import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { FaTimes, FaPlus } from 'react-icons/fa'
import PropTypes from 'prop-types'
import { Translateable } from 'components/Translateable'
import theme from 'theme'
import { useHistory, useLocation } from 'react-router-dom'
import Ripples from 'react-ripples'

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

const Nav = styled.nav`

	overflow: hidden;
	box-sizing: border-box;
	background-color: black;
	@media (hover: hover) {
		&:hover {
			${({ open }) => {
				if (!open) {
					return `
						background-color: rgba(0, 0, 0, .75);
					`
				}
			}}
		}
	}


	z-index: 100;
	position: fixed;
	cursor: ${({ open }) => (open ? 'auto' : 'pointer')};
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
	transition: 
		border-radius .5s cubic-bezier(0.645, 0.045, 0.355, 1),
		height .5s cubic-bezier(0.645, 0.045, 0.355, 1),
		width .5s cubic-bezier(0.645, 0.045, 0.355, 1),
		right .5s cubic-bezier(0.645, 0.045, 0.355, 1),
		padding .5s cubic-bezier(0.645, 0.045, 0.355, 1),
		bottom .5s cubic-bezier(0.645, 0.045, 0.355, 1),
		background-color .25s ease;
	${({ open }) => calcDimensions(open, 'small')}
	${breakpoint('phone')`
        ${({ open }) => calcDimensions(open, 'medium')}
	`}
	${breakpoint('tablet')`
		${({ open }) => calcDimensions(open, 'large')}
	`}
    display: flex;
	justify-content: center;
	align-items: center;
	${breakpoint('desktop')`
        display: none;
	`}

	& .ripples {
		position: absolute !important;
		border-radius: 100%;
		padding: 16px 18px;
		overflow: hidden !important;
		

		${({ open }) => {
			if (!open) {
				return `height: 100%;
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
	height: 100%;
	max-height: 600px;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	box-sizing: border-box;
`
const NavListItem = styled.li`
	overflow: hidden;
`
const NavListItemText = styled.span`
	display: inline-block;

	transform: translateY(${({ open }) => (open ? '0' : '200%')});
	${({ open, delay }) => {
		return open
			? `transition: 0.35s transform ${delay}ms cubic-bezier(0.645, 0.045, 0.355, 1);`
			: ''
	}}
	color: white;
	font-weight: 200;
	font-family: Raleway;
	${({ selected }) => {
		if (!selected) {
			return `
				cursor: pointer;
				&:hover * {
					color: #ff726f;
					transition: .15s color ease;
				}
			`
		} else {
			return 'color: red;'
		}
	}}
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
	cursor: pointer;
	font-size: 16px;
	${breakpoint('tablet')`
        font-size: 28px;
    `}
`

const RIPPLE_DELAY = 250

const MobileNav = props => {
	const { children: views, className } = props
	const location = useLocation()
	const history = useHistory()
	const [ open, setOpen ] = useState(false)
	const handleOpenNav = useCallback(() => {
		if (!open) setTimeout(() => setOpen(true), RIPPLE_DELAY)
	}, [ open ])
	const handleCloseNav = useCallback(() => {
		if (open) setTimeout(() => setOpen(false), RIPPLE_DELAY)
	}, [ open ])

	useEffect(() => {
		window.addEventListener('resize', e => {
			if (e.target.innerWidth >= theme.breakpoints.desktop) {
				setOpen(false)
			}
		})
	}, [])
	return (
		<Nav
			className={className}
			open={open}
		>
			<NavList>
				{views.map((view, i) => {
					const selected = `/${view.path}` === location.pathname
					return (
						<NavListItem key={view.title.en}>
							<NavListItemText
								delay={500 + i * 100}
								open={open}
								selected={selected}
								onClick={() => {
									if (!selected) {
										setOpen(false)
										history.push(`${view.path}${location.search}`)
									}
								}}
							>
								<Translateable
									en={view.title.en}
									es={view.title.es}
								/>
							</NavListItemText>
						</NavListItem>
					)
				})}
			</NavList>
			<Ripples
				className="ripples"
				color="white"
				onClick={open ? handleCloseNav : handleOpenNav}
			>
				<Icon open={open}>{open ? <FaTimes /> : <FaPlus />}</Icon>
			</Ripples>
		</Nav>
	)
}

MobileNav.propTypes = {
	children: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.shape({ en: PropTypes.string, es: PropTypes.string }),
			showTitle: PropTypes.bool,
			showParticles: PropTypes.bool,
			component: PropTypes.node,
			path: PropTypes.string
		})
	)
}

export default MobileNav

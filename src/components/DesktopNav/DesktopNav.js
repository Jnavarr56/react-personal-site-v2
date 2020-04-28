import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Translateable } from 'components/Translateable'
import { useHistory } from 'react-router-dom'
import breakpoint from 'styled-components-breakpoint'
import theme from 'theme'
import Ripples from 'react-ripples'
const CLOSED_NAV_WIDTH = 40
const ICON_WIDTH = 20
const ICON_HEIGHT = 15

const Nav = styled.nav`
	overflow: hidden;
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	background-color: black;
	transition: 0.5s width cubic-bezier(0.645, 0.045, 0.355, 1);
	cursor: ${({ open }) => (open ? 'auto' : 'pointer')};
	width: ${({ open }) => (open ? '100%' : `${CLOSED_NAV_WIDTH}px`)};
	z-index: 200;
	display: none;
	justify-content: center;
	align-items: center;
	${breakpoint('desktop')`
		display: flex;
	`}
	opacity: 0;
	filter: blur(10px);
	animation: FadeIn 1s linear 1 forwards;
	@keyframes FadeIn {
		100%: {
			opacity: 1;
			filter: blur(0px);
		}
	}
`
const NavList = styled.ul`
	height: 100%;
	width: 100%;
	padding: 128px;
	& li {
		color: white;
		font-size: 72px;
		overflow: hidden;
		margin-bottom: 56px;
	}
`
const NavListItem = styled.li`
	font-size: 72px;
	overflow: hidden;
	margin-bottom: 56px;
`
const NavItemText = styled.span`
	& * {
		color: ${({ selected }) => (selected ? 'red' : 'white')};
	}
	${({ selected }) => {
		if (!selected) {
			return `&:hover * {
                color: #ff726f;
                transition: .15s color ease;
            }`
		}
	}}
	font-family: Raleway;
	font-weight: 200;
	position: relative;
	cursor: ${({ selected }) => (selected ? 'auto' : 'pointer')};
	bottom: ${({ open }) => (open ? '0' : '-128')}px;
	opacity: ${({ open }) => (open ? '1' : '0')};
	transition: 0.35s bottom
			${({ open, index }) => (open ? 0.5 + index * 0.1 : 0)}s
			cubic-bezier(0.645, 0.045, 0.355, 1),
		0.35s opacity ${({ open, index }) => (open ? 0.5 + index * 0.1 : 0)}s
			cubic-bezier(0.645, 0.045, 0.355, 1);
`

const NavIcon = styled.div`
    transform: translateY(-50%);
    position: absolute;
    top: 50%;
    right: ${(CLOSED_NAV_WIDTH - ICON_WIDTH) / 2}px;
    height: ${ICON_HEIGHT}px;
    width: ${ICON_WIDTH}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    & > .bar {
        height: 20%;
        width: 100%;
        position: relative;
        background-color: white;
        flex-shrink;
        &:nth-child(1) {
            transition: 0.5s width ease, 0.5s bottom ease, 0.5s top ease, 0.5s transform ease;
        }
        &:nth-child(3) {
            transition: 0.5s width ease, 0.5s bottom ease, 0.5s top ease, 0.5s transform ease;
        }
    }
    ${({ open }) => {
			if (open) {
				return `
                & > div:nth-child(1) {
                    transform: rotate(45deg);
                    transform-origin: left center;
                    width:${Math.pow(
											Math.pow(ICON_HEIGHT, 2) + Math.pow(ICON_WIDTH, 2),
											0.5
										)}px;
                    bottom: ${ICON_HEIGHT / 3 / 2}px;
                }
                & > div:nth-child(2) {
                    display: none;
                }
                & > div:nth-child(3) {
                    transform: rotate(-45deg);
                    transform-origin: left center;
                    width: ${Math.pow(
											Math.pow(ICON_HEIGHT, 2) + Math.pow(ICON_WIDTH, 2),
											0.5
										)}px;
                    top: ${ICON_HEIGHT / 3 / 2}px;
                }
            `
			}
		}}
`

const RippleArea = styled.div`
	transition: background-color 0.25s ease;
	&:hover {
		background-color: rgba(255, 255, 255, 0.15);
	}
	cursor: pointer;
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	width: ${ICON_WIDTH * 2.25}px;
	& .ripples {
		height: 100%;
		width: 100%;
	}
`

const DesktopNav = props => {
	const { children } = props
	const [ open, setOpen ] = useState(false)
	const { push, location } = useHistory()

	const handleToggle = useCallback(() => setOpen(prev => !prev), [])

	useEffect(() => {
		window.addEventListener('resize', e => {
			if (e.target.innerWidth < theme.breakpoints.desktop) {
				setOpen(false)
			}
		})
	}, [])

	return (
		<Nav open={open}>
			<NavList open={open}>
				{children.map((view, i) => (
					<NavListItem key={view.title.en}>
						<NavItemText
							index={i}
							open={open}
							selected={`/${view.path}` === location.pathname}
							onClick={e => {
								if (`/${view.path}` !== location.pathname) {
									setOpen(false)
									push(`/${view.path}${location.search}`)
								}
							}}
						>
							<Translateable {...view.title} />
						</NavItemText>
					</NavListItem>
				))}
			</NavList>
			<RippleArea>
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
			</RippleArea>
		</Nav>
	)
}

DesktopNav.propTypes = {
	children: PropTypes.arrayOf(
		PropTypes.shape({
			title: { en: PropTypes.string, es: PropTypes.string },
			showTitle: PropTypes.bool,
			showParticles: PropTypes.bool,
			component: PropTypes.node,
			path: PropTypes.string
		})
	)
}
export default DesktopNav

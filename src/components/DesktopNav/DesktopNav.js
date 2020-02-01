import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Translateable } from 'components/Translateable'
import { useHistory, useRouteMatch } from 'react-router-dom'
const Nav = styled.nav`
	overflow: hidden;
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	background-color: black;
	transition: 0.5s width cubic-bezier(0.645, 0.045, 0.355, 1);
	cursor: ${({ open }) => (open ? 'auto' : 'pointer')};
	width: ${({ open }) => (open ? '100%' : '32px')};
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 200;
`
const NavList = styled.ul`
	height: 100%;
	width: 100%;
	padding-top: 256px;
	padding-left: 128px;
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
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 16px;
    height: 15px;
    width: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    & > div {
        height: 20%;
        width: 100%;
        position: relative;
        background-color: white;
        flex-shrink;
        &:nth-child(1) {
            transition: 0.5s all ease;
        }
        &:nth-child(3) {
            transition: 0.5s all ease;
        }
    }
    ${({ open }) => {
			if (open) {
				return `
                & > div:nth-child(1) {
                    transform: rotate(45deg);
                    transform-origin: left center;
                    width:16.7332005307px;
                }
                & > div:nth-child(2) {
                    display: none;
                }
                & > div:nth-child(3) {
                    transform: rotate(-45deg);
                    transform-origin: left center;
                    width: 16.7332005307px;
                }
            `
			}
		}}
`

const DesktopNav = props => {
	const { children } = props
	const [ open, setOpen ] = useState(false)
	const { push, location } = useHistory()

	const handleOpen = useCallback(() => {
		if (!open) setOpen(true)
	}, [ open ])

	const handleClose = useCallback(() => {
		if (open) setOpen(false)
	}, [ open ])

	return (
		<Nav
			open={open}
			onClick={handleOpen}
		>
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
			<NavIcon
				open={open}
				onClick={handleClose}
			>
				<div />
				<div />
				<div />
			</NavIcon>
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
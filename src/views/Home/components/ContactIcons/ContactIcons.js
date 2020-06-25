import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import {
	IconButton as IconButtonImport,
	Tooltip as ToolTipImport,
	withStyles
} from '@material-ui/core'
import { useTrail, useSprings, animated } from 'react-spring'
import { FaAngellist, FaCodepen, FaGithub, FaLinkedin } from 'react-icons/fa'
import PropTypes from 'prop-types'

const icons = [
	{
		platform: 'Angellist',
		icon: <FaAngellist />,
		link: 'https://angel.co/u/jorge-navarro'
	},
	{
		platform: 'Codepen',
		icon: <FaCodepen />,
		link: 'https://codepen.io/jnavarr56'
	},
	{
		platform: 'Github',
		icon: <FaGithub />,
		link: 'https://github.com/Jnavarr56'
	},
	{
		platform: 'LinkedIn',
		icon: <FaLinkedin />,
		link: 'https://www.linkedin.com/in/jnavarr5'
	}
]

const Container = styled.div`
	display: none;
	position: absolute;
	top: -32px;
	left: 40px;
	${breakpoint('tablet')`
		display: flex;
	`}
`

const IconButton = styled(animated(IconButtonImport))`
	&:not(:last-child) {
		margin: 0 10px 0 0 !important;
	}
	& .MuiIconButton-label {
		font-size: 64px;
	}
	color: black !important;
	&:hover {
		color: red !important;
	}
`

const Tooltip = withStyles(() => ({
	tooltip: {
		backgroundColor: 'black',
		'& *': {
			fontFamily: 'Raleway'
		}
	}
}))(props => {
	return <ToolTipImport {...props} />
})

const GROW_FACTOR = 0.33
const formatSpringVals = (offset = 0, scale = 1) =>
	`translateX(${offset}%) scale(${scale})`
const adjustedGrowFactor = diff =>
	GROW_FACTOR - (diff - 1) * (GROW_FACTOR / icons.length)
const calcTooltipPlacement = index => {
	let placement = 'bottom'
	const mid = (icons.length - 1) / 2

	if (index < mid) placement += '-start'
	else if (index > mid) placement += '-end'

	return placement
}

const SpringIcons = () => {
	const [ hoveringIndex, setHoveringIndex ] = useState(null)
	const handleMouseLeave = useCallback(() => setHoveringIndex(null), [])

	const springs = useSprings(
		icons.length,
		icons.map((icon, springIndex) => {
			let transform
			if (hoveringIndex === null) {
				transform = formatSpringVals()
			} else if (springIndex === hoveringIndex) {
				transform = formatSpringVals(0, 1 + GROW_FACTOR)
			} else {
				const diff = Math.abs(springIndex - hoveringIndex)
				const adjFactor = adjustedGrowFactor(diff)
				if (springIndex < hoveringIndex) {
					transform = formatSpringVals(-100 * adjFactor, 1)
				} else if (springIndex > hoveringIndex) {
					transform = formatSpringVals(100 * adjFactor, 1)
				}
			}
			return {
				to: { transform },
				config: {
					mass: 2,
					tension: 500,
					friction: 20
				}
			}
		})
	)

	return springs.map((springProps, index) => {
		const { platform, link, icon } = icons[index]
		const placement = calcTooltipPlacement(index)
		const onClick = () => setTimeout(() => window.open(link, '_blank'), 250)
		const onMouseEnter = () => setHoveringIndex(index)

		return (
			<Tooltip
				enterDelay={1000}
				enterNextDelay={500}
				key={platform}
				leaveDelay={0}
				placement={placement}
				title={platform}
			>
				<IconButton
					key={platform + index}
					style={springProps}
					onClick={onClick}
					onMouseEnter={onMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					{icon}
				</IconButton>
			</Tooltip>
		)
	})
}

const TrailIcons = () => {
	const OpacityTrails = useTrail(icons.length, {
		from: {
			opacity: 0
		},
		to: {
			opacity: 1
		}
	})

	const TransformTrails = useTrail(icons.length, {
		from: {
			transform: 'translateY(100%)'
		},
		to: {
			transform: `translateY(0%)`
		},
		config: {
			mass: 4,
			tension: 410,
			friction: 30
		}
	})

	return icons.map((icon, index) => (
		<IconButton
			disabled
			key={icon.platform + index}
			style={{ ...TransformTrails[index], ...OpacityTrails[index] }}
		>
			{icon.icon}
		</IconButton>
	))
}

const HomeIcons = ({ inView }) => {
	const [ fadedIn, setFadedIn ] = useState(false)

	useEffect(() => {
		let timer
		if (inView) {
			timer = setTimeout(() => {
				setFadedIn(true)
			}, 3000)
		} else {
			setFadedIn(false)
		}

		return () => clearTimeout(timer)
	}, [ inView ])

	return (
		<Container>
			{inView && (fadedIn ? <SpringIcons /> : <TrailIcons />)}
		</Container>
	)
}

HomeIcons.propTypes = {
	inView: PropTypes.bool
}

export default HomeIcons

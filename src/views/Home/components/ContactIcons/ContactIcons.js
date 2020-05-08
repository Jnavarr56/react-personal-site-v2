import React, { useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { Waypoint } from 'react-waypoint'
import {
	IconButton as MuiIconButton,
	useTheme,
	Tooltip as ToolTipImport,
	withStyles
} from '@material-ui/core'
import { useTrail, useSprings, animated } from 'react-spring'
import { FaAngellist, FaCodepen, FaGithub, FaLinkedin } from 'react-icons/fa'
import theme from 'theme'

// add links and navigating
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
	display: flex;
	position: absolute;
	top: -32px;
	left: 40px;
`

const IconButton = styled(animated(MuiIconButton))`
	&:not(:last-child) {
		margin: 0 10px 0 0 !important;
	}
	& .MuiIconButton-label {
		font-size: 48px;
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

const SpringIcons = props => {
	const [ hoveringIndex, setHoveringIndex ] = useState(null)
	const handleMouseLeave = useCallback(() => setHoveringIndex(null), [])

	const muiTheme = useTheme()

	const springs = useSprings(
		icons.length,
		icons.map((icon, springIndex) => {
			let transform,
				boxShadow = muiTheme.shadows[0],
				color = 'black'

			if (hoveringIndex === null) {
				transform = formatSpringVals()
				boxShadow = muiTheme.shadows[0]
			} else if (springIndex === hoveringIndex) {
				transform = formatSpringVals(0, 1 + GROW_FACTOR)
				boxShadow = muiTheme.shadows[icons.length]
				color = 'red'
			} else {
				const diff = Math.abs(springIndex - hoveringIndex)
				const adjFactor = adjustedGrowFactor(diff)

				if (springIndex < hoveringIndex) {
					transform = formatSpringVals(-100 * adjFactor, 1)
				} else if (springIndex > hoveringIndex) {
					transform = formatSpringVals(100 * adjFactor, 1)
				}

				boxShadow = muiTheme.shadows[Math.max(icons.length - diff, 0)]
			}

			const to = { transform, color }

			return {
				to: {
					transform,
					color
				},
				config: {
					mass: 2,
					tension: 500,
					friction: 20
				}
			}
		})
	)

	return springs.map((iconProps, index) => (
		<Tooltip
			enterDelay={1000}
			enterNextDelay={500}
			key={icons[index].platform}
			leaveDelay={0}
			placement={calcTooltipPlacement(index)}
			title={icons[index].platform}
		>
			<IconButton
				key={icons[index].platform + index}
				style={iconProps}
				onClick={() =>
					setTimeout(() => window.open(icons[index].link, '_blank'), 250)}
				onMouseEnter={() => setHoveringIndex(index)}
				onMouseLeave={handleMouseLeave}
			>
				{icons[index].icon}
			</IconButton>
		</Tooltip>
	))
}

const TrailIcons = props => {
	const { onEnd, delay } = props

	const config = {
		mass: 3,
		tension: 400,
		friction: 30
	}

	const trails = useTrail(icons.length, {
		from: {
			color: 'black',
			opacity: 0,
			filter: 'blur(2.5px)',
			transform: 'translateY(100%)'
		},
		to: {
			color: 'black',
			opacity: 1,
			filter: 'blur(0px)',
			transform: 'translateY(0%)'
		},
		config,
		delay: delay,
		onRest: onEnd
	})

	return trails.map((iconProps, index) => (
		<IconButton
			disabled
			key={icons[index].platform + index}
			style={iconProps}
		>
			{icons[index].icon}
		</IconButton>
	))
}

const HomeIcons = () => {
	const [ inView, setInView ] = useState(false)
	const [ fadedIn, setFadedIn ] = useState(false)
	const [ delay, setDelay ] = useState(500)

	const handleEndTrailIn = useCallback(() => {
		setTimeout(() => {
			setFadedIn(true)
			setDelay(0)
		}, 750)
	}, [])

	return (
		<Container>
			{fadedIn ? (
				<SpringIcons />
			) : (
				inView && <TrailIcons
					delay={delay}
					onEnd={handleEndTrailIn}
				          />
			)}
			<Waypoint
				fireOnRapidScroll={false}
				scrollableAncestor={window}
				onEnter={() => setInView(true)}
				onLeave={() => {
					setInView(false)
					setFadedIn(false)
				}}
			/>
		</Container>
	)
}

export default HomeIcons

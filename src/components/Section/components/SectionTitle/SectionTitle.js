import React, { useState, useCallback } from 'react'
import { Waypoint } from 'react-waypoint'
import styled from 'styled-components'
import { Translateable } from 'components/Translateable'

const Title = styled.h3`
	display: flex;
	overflow: hidden;
	font-family: Raleway;
	font-size: 24px;
	position: absolute;
	top: 16px;
	left: 38px;
	color: ${({ fontColor }) => fontColor};
`

const Letter = styled.span`
	display: block;
	transition: all 0.25s ease;
	transition-delay: ${({ delay }) => delay + 250}ms;
	transform: translate(
		${({ scrolledIntoView }) => (scrolledIntoView ? '0,0' : '0, -150%')}
	);
`

const SectionTitle = props => {
	const { title, fontColor } = props

	const [ scrolledIntoView, setScrolledIntoView ] = useState(false)

	const handleEnter = useCallback(() => setScrolledIntoView(true), [])
	const handleLeave = useCallback(() => setScrolledIntoView(false), [])

	return (
		<Waypoint
			onEnter={handleEnter}
			onLeave={handleLeave}
		>
			<Title fontColor={fontColor}>
				{title.split('').map((letter, i) => (
					<Letter
						delay={i * 75}
						key={`${title}-${i}`}
						scrolledIntoView={scrolledIntoView}
					>
						{letter === ' ' ? <span>&nbsp;</span> : letter}
					</Letter>
				))}
			</Title>
		</Waypoint>
	)
}

export default SectionTitle

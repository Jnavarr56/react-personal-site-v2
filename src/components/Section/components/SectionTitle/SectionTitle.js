import React, { useState, useCallback } from 'react'
import { Waypoint } from 'react-waypoint'
import styled from 'styled-components'

const Title = styled.h3`
	display: flex;
	font-family: Raleway;
	font-size: 24px;
	position: absolute;
	top: 16px;
	left: 16px;
	color: ${({ fontColor }) => fontColor};
`

const Letter = styled.span`
	display: inline-block;
	transition: all 0.25s ease;
	transition-delay: ${({ delay }) => delay + 1000}ms;
	transform: translate(
		${({ scrolledIntoView }) => (scrolledIntoView ? '0,0' : '0, -150%')}
	);
`

const SectionTitle = props => {
	const { children: text, fontColor } = props

	const [ scrolledIntoView, setScrolledIntoView ] = useState(false)

	const handleEnter = useCallback(() => setScrolledIntoView(true), [])
	const handleLeave = useCallback(() => setScrolledIntoView(false), [])

	return (
		<Waypoint
			onEnter={handleEnter}
			onLeave={handleLeave}
		>
			<Title fontColor={fontColor}>
				{text.split('').map((letter, i) => (
					<Letter
						delay={i * 100}
						key={`${text}-${i}`}
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

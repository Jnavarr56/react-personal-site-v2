import React, { useState, useCallback, useContext, useEffect } from 'react'
import { Waypoint } from 'react-waypoint'
import styled from 'styled-components'
import context from './context'

const Title = styled.h3`
	display: flex;
	overflow: hidden;
	font-family: Raleway;
	font-size: 24px;
	position: absolute;
	top: 16px;
	left: 56px;
	color: ${({ fontColor }) => fontColor};
	transition: all 1s ease;
	opacity: ${({ fadeIn }) => (fadeIn ? 1 : 0)};
	filter: blur(${({ fadeIn }) => (fadeIn ? 0 : 10)}px);
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

	const { lang } = useContext(context)

	const [ scrolledIntoView, setScrolledIntoView ] = useState(false)
	const [ fadeIn, setFadeIn ] = useState(false)
	const [ text, setText ] = useState(title[lang])

	const handleEnter = useCallback(() => setScrolledIntoView(true), [])
	const handleLeave = useCallback(() => setScrolledIntoView(false), [])

	useEffect(() => {
		setFadeIn(false)
		setTimeout(() => {
			setText(title[lang])
			setFadeIn(true)
		}, 1000)
	}, [ lang, title ])

	return (
		<Waypoint
			onEnter={handleEnter}
			onLeave={handleLeave}
		>
			<Title
				fadeIn={fadeIn}
				fontColor={fontColor}
			>
				{text.split('').map((letter, i) => (
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

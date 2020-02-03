import React, { useState, useCallback, useContext, useEffect } from 'react'
import { Waypoint } from 'react-waypoint'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import context from './context'
import PropTypes from 'prop-types'

const Title = styled.h3`
	display: flex;
	overflow: hidden;
	font-family: Raleway;
	position: absolute;
	top: 16px;
	left: 32px;
	color: ${({ fontColor }) => fontColor};
	transition: opacity 1s ease, filter 1s ease;
	opacity: ${({ fadeIn }) => (fadeIn ? 1 : 0)};
	filter: blur(${({ fadeIn }) => (fadeIn ? 0 : 10)}px);
	flex-wrap: wrap;
	word-wrap: break-word;
	font-size: 18px;
	max-width: 40%;
	${breakpoint('phone')`
		font-size: 24px;
	`}
	${breakpoint('tablet')`
		font-size: 32px;
	`}
	${breakpoint('desktop')`
		font-size: 36px;
		left: 56px;
	`}	
`

const Letter = styled.span`
	display: block;
	transition: transform 0.25s ease;
	transition-delay: ${({ delay }) => delay + 250}ms;
	transform: translate(
		${({ scrolledIntoView }) => (scrolledIntoView ? '0,0' : '0, -200%')}
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

SectionTitle.propTypes = {
	fontColor: PropTypes.string,
	title: PropTypes.string
}

export default SectionTitle

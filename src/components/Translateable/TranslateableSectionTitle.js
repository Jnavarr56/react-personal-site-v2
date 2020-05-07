import React, { useState, useCallback, useContext, useEffect } from 'react'
import { Waypoint } from 'react-waypoint'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import context from './context'
import PropTypes from 'prop-types'
import theme from 'theme'

const { fadeTiming, fadeDuration } = theme.timing.translateable

const TitleContainer = styled.div`
	z-index: 1000;
	overflow: hidden;
	position: absolute;
	top: 0;
	padding-top: 16px;
	left: 32px;
	color: ${({ fontColor }) => fontColor};
	max-width: 40%;
	${breakpoint('desktop')`
		left: 56px;
	`}
`

const Title = styled.h3`
	display: flex;
	font-family: Raleway;
	color: ${({ fontColor }) => fontColor};
	flex-wrap: wrap;
	word-wrap: break-word;
	font-size: 18px;
	line-height: 1.15;
	opacity: ${({ fadeIn }) => (fadeIn ? 1 : 0)};
	filter: blur(${({ fadeIn }) => (fadeIn ? 0 : 10)}px);
	transition: opacity ${fadeDuration}ms ${fadeTiming} 0ms, filter ${fadeDuration}ms ${fadeTiming} 0ms;
	${breakpoint('phone')`
		font-size: 24px;
	`}
	${breakpoint('tablet')`
		font-size: 32px;
	`}
	${breakpoint('desktop')`
		font-size: 42px;
	`}	
`

const Letter = styled.span`
	display: block;
	transition: transform 500ms cubic-bezier(0.645, 0.045, 0.355, 1)
		${({ delay }) => delay}ms;
	transform: translateY(
		${({ inView }) => (inView ? '0' : 'calc(-105% - 16px)')}
	);
`

const SectionTitle = props => {
	const { title, fontColor } = props

	const { lang } = useContext(context)

	const [ inView, setInView ] = useState(false)
	const [ fadeIn, setFadeIn ] = useState(false)
	const [ text, setText ] = useState(title[lang])

	useEffect(() => {
		setFadeIn(false)
		setTimeout(() => {
			setText(title[lang])
			setFadeIn(true)
		}, fadeDuration)
	}, [ lang, title ])

	const renderLetters = () => {
		let accDelay = 0
		let lastLetter = null
		return text.split('').map((letter, i) => {
			let currentDelay

			if (!inView) {
				currentDelay = 0
			} else {
				if (i === 0) {
					currentDelay = 0
					accDelay = 0
				} else {
					if (letter === ' ') {
						currentDelay = 0
					} else {
						accDelay += 100
						currentDelay = accDelay
					}
				}

				lastLetter = letter
			}

			return (
				<Letter
					delay={currentDelay}
					inView={inView}
					key={`${title}-${i}`}
				>
					{letter === ' ' ? <div>&nbsp;</div> : letter}
				</Letter>
			)
		})
	}

	return (
		<TitleContainer>
			<Title
				fadeIn={fadeIn}
				fontColor={fontColor}
			>
				{renderLetters()}
			</Title>
			<Waypoint
				fireOnRapidScroll={false}
				scrollableAncestor={window}
				onEnter={() => {
					setInView(true)
				}}
				onLeave={() => {
					setInView(false)
				}}
			/>
		</TitleContainer>
	)
}

SectionTitle.propTypes = {
	fontColor: PropTypes.string,
	title: PropTypes.object
}

export default SectionTitle

import React, { useState, useContext, useEffect, useMemo } from 'react'
import { Waypoint } from 'react-waypoint'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import context from './context'
import PropTypes from 'prop-types'
import theme from 'theme'
import { useTrail, animated, config } from 'react-spring'

const { fadeTiming, fadeDuration } = theme.timing.translateable

const TitleContainer = styled.div`
	z-index: 999;
	/* overflow: hidden; */
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
	/* filter: blur(${({ fadeIn }) => (fadeIn ? 0 : 10)}px); */
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
	& > p {
		display: inline-block;
	}
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

	const opacityTrail = useTrail(text.length, {
		from: {
			opacity: 0
		},
		to: {
			opacity: inView ? 1 : 0
		},
		config: {
			...config.wobbly,
			clamp: true
		}
	})

	const VertTrail = useTrail(text.length, {
		from: {
			transform: `translateY(-100%)`
		},
		to: {
			transform: `translateY(${inView ? 0 : -100}%)`
		},
		config: {
			mass: 1,
			tension: 400,
			friction: 27
		}
	})

	const letters = useMemo(
		() =>
			text.split('').map((l, i) => (
				<animated.p
					key={text + '-' + l + i}
					style={{ ...opacityTrail[i], ...VertTrail[i] }}
				>
					{l === ' ' ? <span>&nbsp;</span> : l}
				</animated.p>
			)),
		[ VertTrail, opacityTrail, text ]
	)

	return (
		<TitleContainer>
			<Title
				fadeIn={fadeIn}
				fontColor={fontColor}
			>
				{letters}
			</Title>
			<Waypoint
				fireOnRapidScroll={false}
				scrollableAncestor={window}
				onEnter={() => setInView(true)}
				onLeave={() => setInView(false)}
			/>
		</TitleContainer>
	)
}

SectionTitle.propTypes = {
	fontColor: PropTypes.string,
	title: PropTypes.shape({
		en: PropTypes.string,
		es: PropTypes.string
	})
}

export default SectionTitle

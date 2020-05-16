import React, { useEffect, useState, useCallback, useContext } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import context from 'components/Translateable/context'
import { ContactIcons } from './components'
import Typist from 'react-typist'
import 'react-typist/dist/Typist.css'

import { useSpring, animated, useTrail } from 'react-spring'
import { Waypoint } from 'react-waypoint'
import PropTypes from 'prop-types'

const Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
`

const Title = styled(animated.h1)`
	margin-bottom: 16px;
	font-family: Raleway;
	color: black;
	font-size: 28px;
	display: flex;
	${breakpoint('phone')`
		font-size: 46px;
	`}
	${breakpoint('tablet')`
		font-size: 64px;
		margin-bottom: 24px;
	`}
	${breakpoint('desktop')`
		font-size: 82px;
		margin-bottom: 32px;
	`}
	${breakpoint('large-desktop')`
		font-size: 110px;
		margin-bottom: 48px;
	`}
	

`
const Subtitle = styled(animated.h2)`
	text-transform: uppercase;
	font-weight: 200;
	font-family: Raleway;
	color: black;
	text-align: center;
	font-size: .75rem;
	${breakpoint('phone')`
		font-size: 1rem;
	`}
	${breakpoint('tablet')`
		font-size: 2rem;
		letter-spacing: 2px;
	`}
	${breakpoint('desktop')`
		font-size: 3rem;
		letter-spacing: 3px;
	`}
	${breakpoint('large-desktop')`
		font-size: 4rem;
		letter-spacing: 4px;

	`}
	word-break: break-word;
	white-space: break-spaces;
	overflow-wrap: break-word;

	/* display: flex; */
	/* justify-content: space-between; */
	& > span {
		display: inline-block;
	}
	opacity: 0;
	transition: opacity 250ms ease-in-out;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	text-align: center;

`

const Toggler = styled.div`
	position: relative;
	width: 100%;
	& .${({ lang }) => lang}-sub {
		opacity: 1 !important;
	}
`

const phrases = [
	{
		en: 'Full Stack Developer',
		es: 'Desarollador Full Stack'
	},
	{
		en: 'Seeking Junior Dev Roles!',
		es: 'Buscando Trabajos de Desarollo'
	},
	{
		en: 'Energy Drink Enthusiast',
		es: 'Amante de Bebidas de Energia'
	},
	{
		en: 'Hispanophone',
		es: 'Hablohispante'
	}
]

const HomeSubText = ({ lang }) => {
	const [ phraseIndex, setPhraseIndex ] = useState(0)
	const [ reversing, setReversing ] = useState(false)

	useEffect(() => {
		let timer = setTimeout(() => {
			setReversing(true)
		}, 2000)

		return () => clearTimeout(timer)
	}, [])

	useEffect(() => {
		let timer
		if (reversing) {
			timer = setTimeout(() => {
				setReversing(false)
				setPhraseIndex(i => (i === phrases.length - 1 ? 0 : i + 1))
			}, 2000)
		} else {
			timer = setTimeout(() => setReversing(true), 2000)
		}

		return () => clearTimeout(timer)
	}, [ reversing ])

	const phrase = phrases[phraseIndex][lang]
	const mid = Math.ceil((phrase.length - 1) / 2)
	const leftLetters = phrase.slice(0, mid).split('')
	const rightLetters = phrase.slice(mid).split('')

	const TransformTrail = useTrail(phrase.length, {
		from: {
			transform: `translateY(-100%)`
		},
		to: {
			transform: `translateY(0%)`
		},
		reverse: reversing,
		config: {
			mass: 1,
			tension: 500,
			friction: 27
		}
	})

	const OpacityPhaseTrail = useTrail(phrase.length, {
		from: {
			opacity: 0
		},
		to: {
			opacity: 1
		},
		reverse: reversing,
		config: {
			clamp: true,
			mass: 1,
			tension: 500,
			friction: 27
		}
	})

	return (
		<Subtitle className={lang + '-sub'}>
			{leftLetters.map((l, i) => {
				const propIndex = leftLetters.length - 1 - i

				if (l === ' ') {
					return <span key={'left' + i}>&nbsp;</span>
				}

				return (
					<animated.span
						key={'left' + i}
						style={{
							...OpacityPhaseTrail[propIndex],
							...TransformTrail[propIndex]
						}}
					>
						{l}
					</animated.span>
				)
			})}
			{rightLetters.map((l, i) => {
				const propIndex = i
				if (l === ' ') {
					return <span key={'right' + i}>&nbsp;</span>
				}

				return (
					<animated.span
						key={'right' + i}
						style={{
							...OpacityPhaseTrail[propIndex],
							...TransformTrail[propIndex]
						}}
					>
						{l}
					</animated.span>
				)
			})}
		</Subtitle>
	)
}

const typistOptions = { show: true, blink: true }

const HomeText = ({ inView }) => {
	const { lang } = useContext(context)

	const [ startSubtitles, setStartSubtitles ] = useState(false)

	const handleTypingDone = useCallback(() => setStartSubtitles(true), [])

	const OpacitySpring = useSpring({
		from: {
			opacity: 0
		},
		to: {
			opacity: inView ? 1 : 0
		}
	})

	useEffect(() => {
		setStartSubtitles(false)
	}, [ inView ])

	return (
		<>
			<Title style={OpacitySpring}>
				{inView && (
					<Typist
						cursor={typistOptions}
						onTypingDone={handleTypingDone}
					>
						Jorge Navarro
					</Typist>
				)}
			</Title>
			{startSubtitles && (
				<Toggler lang={lang}>
					<HomeSubText lang="en" />
					<HomeSubText lang="es" />
				</Toggler>
			)}
		</>
	)
}

const Home = () => {
	const [ inView, setInView ] = useState(false)

	return (
		<Container>
			<ContactIcons inView={inView} />
			<HomeText inView={inView} />
			<Waypoint
				fireOnRapidScroll={false}
				scrollableAncestor={window}
				onEnter={() => setInView(true)}
				onLeave={() => setInView(false)}
			/>
		</Container>
	)
}

Home.propTypes = {
	lang: PropTypes.string
}

export default Home

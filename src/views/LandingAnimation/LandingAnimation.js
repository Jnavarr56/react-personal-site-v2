import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import CONFIG from './ParticleConfig.json'

const Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1000;
	transition: all ${({ fadeOutDuration }) => fadeOutDuration}ms ease
		${({ fadeOutDelay }) => fadeOutDelay}ms;
	opacity: ${({ pct }) => (pct < 100 ? 1 : 0)};
	filter: blur(${({ pct }) => (pct < 100 ? 0 : 10)}px);
`

const ParticleDiv = styled.div`
	height: 100%;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
`

const setSpeed = speed => (window.pJSDom[0].pJS.particles.move.speed = speed)
const getSpeed = () => window.pJSDom[0].pJS.particles.move.speed

const LandingAnimation = props => {
	const { onAnimationEnd, interval, fadeOutDelay, fadeOutDuration } = props

	const [ pct, setPct ] = useState(0)
	const handleIncrement = useCallback(() => {
		setTimeout(() => setPct(prev => prev + 1), interval)
	}, [ interval ])

	useEffect(() => {
		window.particlesJS('loading-particles', CONFIG)
		handleIncrement()
	}, [ handleIncrement ])

	useEffect(() => {
		if (pct === 0) return
		if (pct < 100) {
			if (pct < 50) setSpeed(pct * 2)
			else setSpeed(getSpeed() - getSpeed() / (100 - pct))
			handleIncrement()
		} else {
			onAnimationEnd()
		}
	}, [ pct, interval, onAnimationEnd, handleIncrement ])

	return (
		<Container
			fadeOutDelay={fadeOutDelay}
			fadeOutDuration={fadeOutDuration}
			pct={pct}
		>
			<ParticleDiv id="loading-particles" />
			<p>{pct}%</p>
		</Container>
	)
}

LandingAnimation.propTypes = {
	fadeOutDelay: PropTypes.number,
	fadeOutDuration: PropTypes.number,
	interval: PropTypes.number,
	onAnimationEnd: PropTypes.func
}

LandingAnimation.defaultProps = {
	fadeOutDelay: 1000,
	fadeOutDuration: 1000,
	interval: 1000,
	onAnimationEnd: () => null
}

export default LandingAnimation

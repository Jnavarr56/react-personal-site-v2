import React, { useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import PieChart from 'react-minimal-pie-chart'

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
	z-index: 998;
`

const PercentCount = styled.p`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-family: Raleway;
	font-size: 40px;
	font-weight: 200;
	z-index: 999;
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

	const loadingIndicatorData = useMemo(
		() => [ { value: 1, key: 1, color: 'red' } ],
		[]
	)
	return (
		<Container
			fadeOutDelay={fadeOutDelay}
			fadeOutDuration={fadeOutDuration}
			pct={pct}
		>
			<ParticleDiv id="loading-particles" />
			<PieChart
				animate
				animationEasing="ease"
				data={loadingIndicatorData}
				lineWidth={2.5}
				reveal={pct}
			/>
			<PercentCount>{pct}%</PercentCount>
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

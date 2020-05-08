import React, { useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import PieChart from 'react-minimal-pie-chart'
import PropTypes from 'prop-types'
import CONFIG from './ParticleConfig.json'
import { useSpring, animated, config } from 'react-spring'

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
	transition: ${({ fadeOutDuration, fadeOutDelay }) => {
		return `
				opacity ${fadeOutDuration}ms ${'ease'} ${fadeOutDelay}ms,
				filter ${fadeOutDuration}ms ${'ease'} ${fadeOutDelay}ms
			`
	}};
	opacity: ${({ pct }) => (pct < 100 ? 1 : 0)};
	filter: blur(${({ pct }) => (pct < 100 ? 0 : 10)}px);
`

const AnimatedContainer = animated(Container)

const ParticleDiv = styled.div`
	height: 100%;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 998;
`

const PercentCountStyled = styled.p`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-family: Poppins;
	font-size: 72px;
	font-weight: 100;
	z-index: 999;
`
const PercentCount = animated(PercentCountStyled)

const setSpeed = speed => (window.pJSDom[0].pJS.particles.move.speed = speed)
const getSpeed = () => window.pJSDom[0].pJS.particles.move.speed

const LandingAnimation = props => {
	const { onAnimationEnd, duration, fadeOutDelay, fadeOutDuration } = props

	const [ pct, setPct ] = useState(0)

	useEffect(() => {
		window.particlesJS('loading-particles', CONFIG)
	}, [])

	useEffect(() => {
		if (pct === 0) return
		if (pct < 100) {
			if (pct < 50) setSpeed(pct * 2)
			else setSpeed(getSpeed() - getSpeed() / (100 - pct))
		} else {
			onAnimationEnd()
		}
	}, [ onAnimationEnd, pct ])

	const loadingIndicatorData = useMemo(
		() => [ { value: 1, key: 1, color: 'red' } ],
		[]
	)

	const pctProps = useSpring({
		number: 100,
		from: { number: 0 },
		config: {
			duration
		},
		onFrame: ({ number }) => setPct(Math.floor(number))
	})

	const containerProps = useSpring({
		opacity: pct === 100 ? 0 : 1,
		filter: `blur(${pct === 100 ? 10 : 0}px)`,
		delay: fadeOutDelay
	})

	return (
		<AnimatedContainer
			pct={pct}
			style={containerProps}
		>
			<ParticleDiv id="loading-particles" />
			<PieChart
				animate
				animationEasing="ease"
				background="white"
				data={loadingIndicatorData}
				lineWidth={3}
				reveal={pct}
			/>
			<PercentCount>
				<animated.span>
					{pctProps.number.interpolate(number => Math.floor(number))}
				</animated.span>
				%
			</PercentCount>
		</AnimatedContainer>
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

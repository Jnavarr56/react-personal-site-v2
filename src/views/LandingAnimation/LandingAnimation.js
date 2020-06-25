import React, { useEffect } from 'react'
import styled from 'styled-components'
import ParticleConfig from './ParticleConfig.json'
import { CircularProgress } from '@material-ui/core'
import { animated } from 'react-spring'
import PropTypes from 'prop-types'
import { useCountUp } from 'use-count-up'

const Container = styled(animated.div)`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1000;
	& .MuiCircularProgress-colorPrimary {
		z-index: 998;
		color: rgba(0, 0, 0, 0.75) !important;
	}
`

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

const setSpeed = speed => (window.pJSDom[0].pJS.particles.move.speed = speed)

function easeInOutExpo(t, b, c, d) {
	t /= d / 2
	if (t < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b
	t--
	return (c / 2) * (-Math.pow(2, -10 * t) + 2) + b
}

const LandingAnimation = props => {
	const { onLoadingEnd, style } = props
	useEffect(() => {
		window.particlesJS('loading-particles', ParticleConfig)
		return () => {
			window.pJSDom[0].pJS.fn.vendors.destroypJS()
		}
	}, [])

	const value = useCountUp(true, {
		start: 0,
		end: 100,
		duration: 5,
		easing: easeInOutExpo
	})

	useEffect(() => {
		setSpeed(value < 50 ? value * 1.5 : (100 - value) * 1.5)
		if (value === 100) onLoadingEnd()
	}, [ onLoadingEnd, value ])

	return (
		<Container style={style}>
			<ParticleDiv id="loading-particles" />
			<CircularProgress
				size={300}
				thickness={1}
				value={value}
				variant="determinate"
			/>
			<PercentCountStyled>{value}%</PercentCountStyled>
		</Container>
	)
}

LandingAnimation.propTypes = {
	onLoadingEnd: PropTypes.func,
	style: PropTypes.shape({
		opacity: PropTypes.number
	})
}

LandingAnimation.defaultProps = {
	onLoadingEnd: () => null
}

export default LandingAnimation

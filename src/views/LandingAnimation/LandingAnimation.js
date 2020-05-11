import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import ParticleConfig from './ParticleConfig.json'
import { CircularProgress } from '@material-ui/core'
import { useSpring, animated, config } from 'react-spring'
import PropTypes from 'prop-types'
import ParticleField from 'react-particles-webgl'
import { useCountUp } from 'use-count-up'
import TextTransition, { presets } from 'react-text-transition'

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
	background-color: rgba(255, 255, 255, 0.4);
`

const setSpeed = speed => (window.pJSDom[0].pJS.particles.move.speed = speed)
const getSpeed = () => window.pJSDom[0].pJS.particles.move.speed

const testConfig = {
	// Display reference cube, useful for orienting the field
	showCube: true,
	// '2D' or '3D' particle field
	dimension: '3D',
	// 'bounce' or 'passthru'
	// 'bounce' will make particles behave like balls thrown at a wall when hitting canvas boundaries
	// 'passthru' particles will disappear after hitting canvas boundaries and be added back into the scene elsewhere
	boundaryType: 'bounce',
	// Maximum velocity of particles
	velocity: 2,
	// Toggles antialiasing -- must be set during construction, cannot be changed after initial render
	// Slight performance optimization to set false, although lines will appear more jagged
	antialias: false,
	// Min/Max multipliers which constraint how particles move in each direction
	// The default values here allow for particles to move in completely random x, y, z directions
	// See the "Snowfall" preset for an example of how to use these values
	direction: {
		xMin: -1,
		xMax: 1,
		yMin: -1,
		yMax: 1,
		zMin: -1,
		zMax: 1
	},
	lines: {
		// 'rainbow' or 'solid' color of lines
		colorMode: 'solid',
		// Color of lines if colorMode: 'solid', must be hex color
		color: '#351CCB',
		// Transparency of lines
		transparency: 0.9,
		// true/false limit the maximum number of line connections per particle
		limitConnections: true,
		maxConnections: 20,
		// Minimum distance needed to draw line between to particles
		minDistance: 150,
		// true/false render lines
		visible: true
	},
	particles: {
		// 'rainbow' or 'solid' color of particles
		colorMode: 'solid',
		// Color of lines if colorMode: 'solid', must be hex color
		color: '#FF0000',
		// Transparency of particles
		transparency: 0.9,
		// 'square' or 'circle' shape of particles
		shape: 'square',
		// The exact number of particles to render
		count: 10,
		// The minimum particle size
		minSize: 10,
		// The maximum particle size
		maxSize: 75,
		// true/false render particles
		visible: true
	},
	/*
	 * The camera rig is comprised of Three.js OrbitControls
	 * Pass any valid OrbitControls properties, consult docs for more info
	 *
	 * https://threejs.org/docs/#examples/controls/OrbitControls
	 */
	cameraControls: {
		// Enable or disable all camera interaction (click, drag, touch etc)
		enabled: true,
		// Enable or disable smooth dampening of camera movement
		enableDamping: true,
		dampingFactor: 0.2,
		// Enable or disable zooming in/out of camera
		enableZoom: true,
		// Enable or disable constant rotation of camera around scene
		autoRotate: true,
		// Rotation speed -- higher is faster
		autoRotateSpeed: 0.5,
		// If true, camera position will be reset whenever any option changes (including this one)
		// Useful when turning off autoRotate, the camera will return to FOV where scene fits to canvas
		resetCameraFlag: false
	}
}

const Wrapper = () => <ParticleField config={testConfig} />

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
		duration: 10,
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
	onLoadingEnd: PropTypes.func
}

LandingAnimation.defaultProps = {
	onLoadingEnd: () => null
}

export default LandingAnimation

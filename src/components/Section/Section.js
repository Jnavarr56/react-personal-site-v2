import React, {
	useEffect,
	useMemo,
	cloneElement,
	useState,
	useCallback
} from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import PropTypes from 'prop-types'
import { TranslateableSectionTitle } from 'components/Translateable'
import getParticleConfig from './getParticleConfig'
import { Waypoint } from 'react-waypoint'

import { useSpring, animated, config } from 'react-spring'
import ParticleField from 'react-particles-webgl'

const SectionComp = styled.section`
	height: 100vh;
	width: 100vw;
	position: relative;
	overflow: hidden;
	background: ${({ backgroundColor }) => backgroundColor};
	${({ ignorePadding }) => `padding: ${ignorePadding ? 0 : '32px 24px'};`}
	${breakpoint('tablet')`
		${({ ignorePadding }) => `padding: ${ignorePadding ? 0 : 56}px;`}  
	`}
	& .particles {
		height: 100%;
		width: 100%;
		z-index: 50;
		position: absolute;
		top: 0;
		left: 0;
	}
`

const ChildrenContainer = styled(animated.div)`
	height: 100%;
	width: 100%;
	position: relative;
	z-index: 100;
`

const ParticleBackground = styled.div`
	height: 100%;
	width: 100%;
	z-index: 50;
	position: absolute;
	top: 0;
	left: 0;
`

const config2 = {
	showCube: true,
	dimension: '3D',
	velocity: 2.5,
	boundaryType: 'bounce',
	antialias: true,
	direction: {
		xMin: -1,
		xMax: 1,
		yMin: -1,
		yMax: 1,
		zMin: -1,
		zMax: 1
	},
	lines: {
		colorMode: 'solid',
		color: '#FF0000',
		transparency: 0.9,
		limitConnections: true,
		maxConnections: 20,
		minDistance: 60,
		visible: true
	},
	particles: {
		colorMode: 'solid',
		color: '#FF0000',
		transparency: 0.9,
		shape: 'circle',
		boundingBox: 'canvas',
		count: 300,
		minSize: 20,
		maxSize: 50,
		visible: true
	},
	cameraControls: {
		enabled: false,
		enableDamping: true,
		dampingFactor: 0.2,
		enableZoom: true,
		autoRotate: true,
		autoRotateSpeed: 5,
		resetCameraFlag: true
	}
}

const Section = props => {
	const {
		children,
		title,
		fontColor,
		backgroundColor,
		showTitle,
		showParticles,
		id,
		fadeInContent,
		ignorePadding
	} = props

	const [ fadeIn, setFadeIn ] = useState(false)

	const titleKey = useMemo(() => title.en.replace(/ /g, '-'), [ title.en ])

	useEffect(() => {
		if (showParticles)
			window.particlesJS(`${titleKey}-background`, getParticleConfig(fontColor))
	}, [ titleKey, fontColor, showParticles ])

	const FadeSpring = useSpring({
		from: {
			opacity: 0,
			transform: 'scale(0.85) translateY(15%)'
		},
		to: {
			opacity: fadeIn ? 1 : 0,
			transform: fadeIn
				? 'scale(1) translateY(0%)'
				: 'scale(0.85) translateY(15%)'
		},
		config: {
			mass: 1,
			tension: 500,
			friction: 100
		}
	})

	const childProps = {}
	if (fadeInContent) childProps.style = FadeSpring

	return (
		<SectionComp
			backgroundColor={backgroundColor}
			id={id}
			ignorePadding={ignorePadding}
		>
			{fadeInContent && (
				<Waypoint
					fireOnRapidScroll={false}
					scrollableAncestor={window}
					onEnter={() => setFadeIn(true)}
					onLeave={() => setFadeIn(false)}
				/>
			)}
			{showTitle && (
				<TranslateableSectionTitle
					fontColor={fontColor}
					title={title}
				/>
			)}
			<ChildrenContainer {...childProps}>
				{children && cloneElement(children, { fontColor, backgroundColor })}
			</ChildrenContainer>
			{showParticles && <ParticleBackground id={`${titleKey}-background`} />}
		</SectionComp>
	)
}

Section.propTypes = {
	backgroundColor: PropTypes.string,
	children: PropTypes.node,
	fadeInContent: PropTypes.bool,
	fontColor: PropTypes.string,
	id: PropTypes.string,
	ignorePadding: PropTypes.bool,
	showParticles: PropTypes.bool,
	showTitle: PropTypes.bool,
	title: PropTypes.shape({
		en: PropTypes.string,
		es: PropTypes.string
	})
}

export default Section

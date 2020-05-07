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
const SectionComp = styled.section`
	height: 100vh;
	width: 100vw;
	position: relative;
	background: ${({ backgroundColor }) => backgroundColor};
	${({ ignorePadding }) => `padding: ${ignorePadding ? 0 : '32px 24px'};`}
	${breakpoint('tablet')`
		${({ ignorePadding }) => `padding: ${ignorePadding ? 0 : 56}px;`}  
	`}
`

const ChildrenContainer = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
	z-index: 100;
	transition: all 750ms ease-in-out;
	${({ fadeable, fadeIn }) => {
		if (fadeable) {
			return fadeIn
				? 'transform: scale(1); opacity: 1; filter: blur(0px)'
				: 'transform: scale(.75); opacity: 0; filter: blur(10px);'
		}
	}}
`

const ParticleBackground = styled.div`
	height: 100%;
	width: 100%;
	z-index: 50;
	position: absolute;
	top: 0;
	left: 0;
`

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

	return (
		<SectionComp
			backgroundColor={backgroundColor}
			id={id}
			ignorePadding={ignorePadding}
		>
			{fadeInContent && (
				<Waypoint
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
			<ChildrenContainer
				fadeable={fadeInContent}
				fadeIn={fadeIn}
			>
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
	ignorePadding: PropTypes.bool,
	showParticles: PropTypes.bool,
	showTitle: PropTypes.bool,
	title: PropTypes.shape({
		en: PropTypes.string,
		es: PropTypes.string
	})
}

export default Section

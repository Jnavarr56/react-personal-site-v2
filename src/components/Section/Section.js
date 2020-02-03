import React, { useEffect, useMemo, cloneElement } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { TranslateableSectionTitle } from 'components/Translateable'
import getParticleConfig from './getParticleConfig'

const SectionDiv = styled.div`
	height: 100vh;
	width: 100vw;
	position: relative;
	background: ${({ backgroundColor }) => backgroundColor};
	padding: 56px;
`

const ChildrenContainer = styled.div`
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

const Section = props => {
	const {
		children,
		title,
		fontColor,
		backgroundColor,
		showTitle,
		showParticles
	} = props

	const titleKey = useMemo(() => title.en.replace(/ /g, '-'), [ title.en ])

	useEffect(() => {
		if (showParticles)
			window.particlesJS(`${titleKey}-background`, getParticleConfig(fontColor))
	}, [ titleKey, fontColor, showParticles ])

	return (
		<SectionDiv backgroundColor={backgroundColor}>
			{showTitle && (
				<TranslateableSectionTitle
					fontColor={fontColor}
					title={title}
				/>
			)}
			<ChildrenContainer>
				{cloneElement(children, { fontColor, backgroundColor })}
			</ChildrenContainer>
			{showParticles && <ParticleBackground id={`${titleKey}-background`} />}
		</SectionDiv>
	)
}

Section.propTypes = {
	backgroundColor: PropTypes.string,
	children: PropTypes.node,
	fontColor: PropTypes.string,
	showParticles: PropTypes.bool,
	showTitle: PropTypes.bool,
	title: PropTypes.shape({
		en: PropTypes.string,
		es: PropTypes.string
	})
}

export default Section

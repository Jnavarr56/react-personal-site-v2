import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Section } from 'components'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import theme from 'theme'

const RootDiv = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
	overflow: ${({ disableScroll }) => (disableScroll ? 'hidden' : 'auto')};
	opacity: 0;
	filter: blur(10px);
	animation: FadeIn ${({ fadeInDuration }) => fadeInDuration}ms ease
		${({ fadeInDelay }) => fadeInDelay}ms 1 forwards;
	@keyframes FadeIn {
		100% {
			opacity: 1;
			filter: blur(0px);
		}
	}
`

const getSectionColors = index => {
	const { font, background } = theme.colors
	const even = index % 2 === 0
	const fontColor = even ? font.red : font.white
	const backgroundColor = even ? background.white : background.red
	return { fontColor, backgroundColor }
}

const getVH = () =>
	Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

const getSectionNameFromPath = path => {
	return path
		.replace(/-/g, ' ')
		.split(' ')
		.map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
		.join(' ')
}

Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
const ViewsContainer = props => {
	const { children, fadeInDelay, fadeInDuration } = props

	const [ scrolling, setScrolling ] = useState(false)

	const { view: viewPath } = useParams()
	const containerRef = useRef(null)

	useEffect(() => {
		const scrollToCurrentSection = resizeResponse => {
			if (scrolling) return
			const { current: containerEl } = containerRef
			const sectionIndex = children.findIndex(({ path }) => path === viewPath)
			if (sectionIndex >= 0) {
				const top = getVH() * sectionIndex
				if (!resizeResponse) {
					setTimeout(() => {
						setScrolling(true)
						containerEl.scrollTo({ top, behavior: 'smooth' })
						const doneCheck = setInterval(() => {
							if (containerEl.scrollTop === top) {
								clearInterval(doneCheck)
								setScrolling(false)
							}
						}, 100)
					}, 1000)
				} else {
					containerEl.scrollTo({ top })
				}
			}
		}
		scrollToCurrentSection()
		window.addEventListener('resize', () => scrollToCurrentSection(true))
		/* eslint-disable-next-line */
	}, [children, viewPath])

	return (
		<>
			<Helmet>
				<title>{getSectionNameFromPath(viewPath)}</title>
			</Helmet>
			<RootDiv
				disableScroll={!scrolling}
				fadeInDelay={fadeInDelay}
				fadeInDuration={fadeInDuration}
				ref={containerRef}
			>
				{children.map((view, i) => (
					<Section
						key={`${view.title.en}-i`}
						showParticles={view.showParticles}
						showTitle={view.showTitle}
						title={view.title}
						{...getSectionColors(i)}
					>
						{view.component}
					</Section>
				))}
			</RootDiv>
		</>
	)
}

ViewsContainer.propTypes = {
	children: PropTypes.arrayOf(
		PropTypes.shape({
			title: { en: PropTypes.string, es: PropTypes.string },
			showTitle: PropTypes.bool,
			showParticles: PropTypes.bool,
			component: PropTypes.node,
			path: PropTypes.string
		})
	),
	fadeInDelay: PropTypes.number,
	fadeInDuration: PropTypes.number
}

export default ViewsContainer

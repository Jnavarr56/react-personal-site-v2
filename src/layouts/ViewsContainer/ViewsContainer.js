import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Section } from 'components'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import theme from 'theme'
import { scroller, Events } from 'react-scroll'

const RootDiv = styled.div`
	height: 100%;
	width: 100vw;
	position: relative;
	overflow: ${({ isScrolling }) => (isScrolling ? 'auto' : 'hidden')};
	&::-webkit-scrollbar {
		height: 0 !important;
		width: 0 !important;
	}
`

const getSectionColors = index => {
	const { font, background } = theme.colors
	const even = index % 2 === 0
	const fontColor = even ? font.red : font.white
	const backgroundColor = even ? background.white : background.red
	return { fontColor, backgroundColor }
}

const getSectionNameFromPath = path => {
	return path
		.replace(/-/g, ' ')
		.split(' ')
		.map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
		.join(' ')
}

const ViewsContainer = props => {
	const { children, className } = props

	const { view: providedPath } = useParams()

	const containerRef = useRef(null)

	const [ scrolling, setScrolling ] = useState(false)
	const [ lastSectionIndex, setLastSectionIndex ] = useState(null)

	useEffect(() => {
		Events.scrollEvent.register('begin', () => setScrolling(true))
		window.addEventListener('resize', () => {
			if (window.resizeHandler) {
				setTimeout(() => window.resizeHandler(true), 100)
			}
		})
	}, [])

	useEffect(() => {
		const scrollToSection = resizeResponse => {
			const currentScrollIndex = children.findIndex(
				({ path }) => path === providedPath
			)

			if (currentScrollIndex === null && lastSectionIndex === 0) return

			let delay, duration
			if (resizeResponse) {
				delay = 0
				duration = 10
			} else {
				delay = lastSectionIndex === null ? 2250 : 750
				duration = 1000
			}

			Events.scrollEvent.register('end', () => {
				setScrolling(false)
				setLastSectionIndex(currentScrollIndex)
				Events.scrollEvent.remove('end')
			})

			scroller.scrollTo(providedPath, {
				duration,
				delay,
				smooth: true,
				containerId: 'view-container',
				ignoreCancelEvents: true
			})
		}

		scrollToSection()

		window.resizeHandler = scrollToSection
		/*eslint-disable-next-line */
	}, [providedPath])

	return (
		<>
			<Helmet>
				<title>{getSectionNameFromPath(providedPath)}</title>
			</Helmet>
			<RootDiv
				className={className}
				id="view-container"
				isScrolling={scrolling}
				ref={containerRef}
			>
				{children.map((view, i) => (
					<Section
						id={view.path}
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
	className: PropTypes.string
}

export default ViewsContainer

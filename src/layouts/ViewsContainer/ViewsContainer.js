import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Section } from 'components'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import routes from 'routes'
import theme from 'theme'
import { scroller, Events } from 'react-scroll'

const SCROLL_FROM_LANDING_DELAY = 2000
const SCROLL_FROM_PAGE_DELAY = 500

const RootDiv = styled.div`
	height: 100%;
	width: 100vw;
	position: relative;
	overflow: hidden;
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

const ViewsContainer = () => {
	const { view: providedPath } = useParams()

	const [ lastSectionIndex, setLastSectionIndex ] = useState(null)

	useEffect(() => {
		window.addEventListener(
			'resize',
			() =>
				window.resizeHandler &&
				setTimeout(() => window.resizeHandler(true), 100)
		)
	}, [])

	useEffect(() => {
		const scrollToSection = isResizeResponse => {
			const currentScrollIndex = routes.findIndex(
				({ path }) => path === providedPath
			)

			let delay, duration
			if (isResizeResponse) {
				delay = 0
				duration = 0
			} else {
				delay =
					lastSectionIndex === null
						? SCROLL_FROM_LANDING_DELAY
						: SCROLL_FROM_PAGE_DELAY

				const numSectionsToScroll = Math.abs(
					currentScrollIndex - lastSectionIndex
				)
				duration = 500 + numSectionsToScroll * 250
			}

			Events.scrollEvent.register('end', () => {
				setLastSectionIndex(currentScrollIndex)
				Events.scrollEvent.remove('end')
			})

			scroller.scrollTo(providedPath, {
				duration,
				delay,
				smooth: 'easeInOutQuart',
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
			<RootDiv id="view-container">
				{routes.map((view, i) => {
					return (
						<Section
							fadeInContent={view.fadeInContent}
							id={view.path}
							ignorePadding={view.ignorePadding}
							key={`${view.title.en}-i`}
							showParticles={view.showParticles}
							showTitle={view.showTitle}
							title={view.title}
							{...getSectionColors(i)}
						>
							{view.component}
						</Section>
					)
				})}
			</RootDiv>
		</>
	)
}

export default ViewsContainer

import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Section } from 'components'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { DesktopNav } from 'components'
const RootDiv = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
	overflow-y: ${({ disableScroll }) => (disableScroll ? 'hidden' : 'auto')};
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

const getSectionColors = index => ({
	fontColor: index % 2 === 0 ? '#ff0000' : '#ffffff',
	backgroundColor: index % 2 === 0 ? '#ffffff' : '#ff0000'
})

const getVH = () =>
	Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

const ViewsContainer = props => {
	const { children, fadeInDelay, fadeInDuration } = props

	const [ scrolling, setScrolling ] = useState(false)

	const { view: viewPath = '' } = useParams()
	const containerRef = useRef(null)

	useEffect(() => {
		const sectionIndex = children.findIndex(({ path }) => path === viewPath)

		if (sectionIndex >= 0) {
			const top = getVH() * sectionIndex
			const { current: containerEl } = containerRef
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
		}
	}, [ children, viewPath ])

	return (
		<RootDiv
			disableScroll={!scrolling}
			fadeInDelay={fadeInDelay}
			fadeInDuration={fadeInDuration}
			ref={containerRef}
		>
			<DesktopNav>{children}</DesktopNav>
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

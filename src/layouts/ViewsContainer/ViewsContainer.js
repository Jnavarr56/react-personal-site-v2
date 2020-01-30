import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Section } from 'components'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

const RootDiv = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
	overflow-y: ${({ disableScroll }) => (disableScroll ? 'hidden' : 'auto')};
	transition: all ms ease ${({ fadeInDelay }) => fadeInDelay}ms;
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
	titleColor: index % 2 === 0 ? 'red' : 'white',
	backgroundColor: index % 2 === 0 ? 'white' : 'red'
})

const getVH = () =>
	Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

const ViewsContainer = props => {
	const { children, fadeInDelay, fadeInDuration } = props

	const [ scrolling, setScrolling ] = useState(false)

	const { view: viewPath } = useParams()
	const containerRef = useRef(null)

	useEffect(() => {
		const sectionIndex = children.findIndex(({ path }) => path === viewPath)

		if (sectionIndex > 0) {
			const top = getVH() * sectionIndex

			const { current: containerEl } = containerRef
			setTimeout(() => {
				setScrolling(true)
				containerEl.scrollBy({ top, behavior: 'smooth' })
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
			{children.map((view, i) => (
				<Section
					key={`${view.title}-i`}
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
	children: PropTypes.node,
	fadeInDelay: PropTypes.number,
	fadeInDuration: PropTypes.number
}

export default ViewsContainer

import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Section } from 'components'
import { useParams, useLocation } from 'react-router-dom'

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

const ViewsContainer = props => {
	const { children, fadeInDelay, fadeInDuration } = props

	const params = useParams()
	const location = useLocation()

	const [ disableScroll, setDisableScroll ] = useState(true)

	const containerRef = useRef(null)

	useEffect(() => {
		const index = children.findIndex(view => view.path === params.view)
		if (index > 0) {
			const vh = Math.max(
				document.documentElement.clientHeight,
				window.innerHeight || 0
			)
			setTimeout(() => {
				containerRef.current.scrollBy({
					top: vh * index,
					behavior: 'smooth'
				})
			}, 1000)
		}
	}, [ children, params.view ])

	return (
		<RootDiv
			disableScroll={disableScroll}
			fadeInDelay={fadeInDelay}
			fadeInDuration={fadeInDuration}
			ref={containerRef}
		>
			{children.map((view, i) => (
				<Section
					className="pp"
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

export default ViewsContainer

import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { Translateable } from 'components/Translateable'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { useParams } from 'react-router-dom'
import { Text } from '../'

const MobileWrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	& > div:first-child {
		height: 90%;
		width: 100%;
		& > div {
			height: 100%;
			width: 100%;
		}
	}
	${breakpoint(`tablet`)`
		display: none;
	`}
`
const Slide = styled.div`
	height: 100%;
	overflow-y: auto;
	cursor: ${({ switching }) => (switching ? 'grabbing' : 'grab')};
`

const SwipeableBubbles = styled.div`
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Bubble = styled.div`
	flex-shrink: 0;
	border-radius: 100%;
	cursor: pointer;
	background-color: ${({ bubbleColor, selected }) =>
		selected ? bubbleColor : 'rgba(0, 0, 0, .5)'};
	&:not(:first-child),
	&:not(:last-child) {
		margin: 0 8px;
	}
	height: 15px;
	width: 15px;
	${breakpoint(`phone`)`
		margin: 0 12px;
	`}
	${breakpoint(`tablet`)`
		height: 20px;
		width: 20px;
		margin: 0 16px;
	`}
`

const MobileText = props => {
	const { fontColor, englishText, spanishText } = props

	const [ index, setIndex ] = useState(0)
	const handleChangeIndex = useCallback(i => setIndex(i), [])

	const [ switching, setSwitching ] = useState(false)
	const handleStartSwitching = useCallback(() => setSwitching(true), [])
	const handleStopSwitching = useCallback(() => setSwitching(false), [])

	const { view } = useParams()
	useEffect(() => {
		if (index > 0) setTimeout(() => setIndex(0), 1500)
		/* eslint-disable-next-line */
	}, [view])

	return (
		<MobileWrapper>
			<SwipeableViews
				enableMouseEvents
				index={index}
				onChangeIndex={handleChangeIndex}
			>
				{englishText.map((engPar, i) => (
					<Slide
						key={engPar}
						switching={switching}
						onMouseDown={handleStartSwitching}
						onMouseUp={handleStopSwitching}
					>
						<Text fontColor={fontColor}>
							<Translateable
								en={engPar}
								es={spanishText[i]}
							/>
						</Text>
					</Slide>
				))}
			</SwipeableViews>
			<SwipeableBubbles>
				{englishText.map((par, i) => (
					<Bubble
						bubbleColor={fontColor}
						key={par}
						selected={i === index}
						onClick={() => setIndex(i)}
					/>
				))}
			</SwipeableBubbles>
		</MobileWrapper>
	)
}

MobileText.propTypes = {
	bubbleColor: PropTypes.string,
	englishText: PropTypes.arrayOf(PropTypes.string),
	spanishText: PropTypes.arrayOf(PropTypes.string)
}

export default MobileText

import React, { useState } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import {
	MdNavigateBefore as PrevIcon,
	MdNavigateNext as NextIcon
} from 'react-icons/md'
import { IconButton } from 'components'

const CardContainer = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
`

const Card = styled.div`
	height: 60%;
	transition: all 100ms ease-in-out;
	width: ${({ width }) => width};
	position: absolute;
	top: ${({ top }) => top};
	left: 50%;
	transform: translate(-50%, 0);
	box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.5);
	border-radius: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${({ backgroundColor }) => backgroundColor};
	& .title {
		color: ${({ fontColor }) => fontColor};
	}
	${({ nexting }) => nexting && `animation: scaleDown 500ms;`}
	@keyframes scaleDown {
		100% {
			transform: scale(1.2) translate(-40%, 100%);
			opacity: 0;
			filter: blur(10px);
		}
	}
`
const ButtonsContainer = styled.div`
	position: absolute;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 90%;
	bottom: 13.75%;
	left: 50%;
	transform: translateX(-50%);
	& .icon-btn {
		background-color: rgba(0, 0, 0, 0.1);
	}
	& .icon {
		color: white;
		& * {
			display: inline;
			font-family: Raleway;
		}
		// font-size: 48px;
	}
`

const TOP_OFFSET_PCT = 6.25
const calcTopPct = (numCards, index) => {
	if (index === 0) {
		return TOP_OFFSET_PCT
	} else {
		const topInterval = 100 / numCards
		return TOP_OFFSET_PCT + (topInterval / numCards) * index
	}
}

const WIDTH_START_PCT = 40
const calcWidthPct = (numCards, index) => {
	if (index === 0) {
		return WIDTH_START_PCT
	} else {
		return WIDTH_START_PCT + (WIDTH_START_PCT / numCards) * index
	}
}

const MobileCards = props => {
	const { cards: cardsProp } = props

	const [ cards, setCards ] = useState(cardsProp)
	const [ nexting, setNexting ] = useState(false)

	const handleNext = () => {
		setNexting(true)
		const lastCard = cards[cards.length - 1]
		const sliced = cards.slice(0, cards.length - 1)

		setTimeout(() => {
			setNexting(false)
			setCards([ ...sliced ])
			setCards([ lastCard, ...sliced ])
		}, 500)
	}

	return (
		<CardContainer>
			{cards.map((card, i) => {
				const shouldNextAnimate = nexting && i === cards.length - 1
				return (
					<Card
						backgroundColor="white"
						fontColor="red"
						key={card}
						nexting={shouldNextAnimate}
						top={`${calcTopPct(cards.length, i)}%`}
						width={`${calcWidthPct(cards.length, i)}%`}
					>
						<h1 className="title">{card}</h1>
					</Card>
				)
			})}
			<ButtonsContainer>
				<IconButton
					rippleColor="white"
					onClick={handleNext}
				>
					<span className="icon">
						{/* <PrevIcon/> */}
						<p>Next</p>
					</span>
				</IconButton>
				<IconButton rippleColor="white">
					{/* <NextIcon  className={'icon'}/> */}
					<span className="icon">
						<p>Details</p>
					</span>
				</IconButton>
			</ButtonsContainer>
		</CardContainer>
	)
}

export default MobileCards

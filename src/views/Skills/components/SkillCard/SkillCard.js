import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import Ripples from 'react-ripples'
import Tilt from 'react-tilt'
import { animated } from 'react-spring'
import { FullScreenModal } from 'components'
import { Translateable } from 'components/Translateable'
import theme from 'theme'

// const getTransitionMSLong = ({ fadeDuration }) => fadeDuration
// const getTransitionMSShort = ({ fadeDuration }) => fadeDuration / 2

const BASE_SHADOW =
	'0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)'
const SKILL_CARD_HOVER_TRANSITION_DURATION = 500
const TILT_OPTIONS = {
	max: 30,
	scale: 1.15
}

const getSelectedBgColor = ({ backgroundColor }) => {
	const { colors } = theme
	return backgroundColor === colors.background.white
		? 'rgba(255, 0, 0, .75)'
		: colors.background.white
}

const getSelectedFontColor = ({ backgroundColor }) => {
	const { colors } = theme
	return backgroundColor === colors.background.white
		? colors.font.white
		: colors.font.red
}

const TiltWrapper = styled.div`
	width: 75%;
	pointer-events: ${({ hoverable }) => (hoverable ? 'all' : 'none')};
`

const SkillCardDiv = styled(animated.div)`
	cursor: pointer;
	border-radius: 8px;
	box-shadow: ${BASE_SHADOW};
	& .skill-card-ripple {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 12px 0px;
	}
	& .skillCategory {
		color: black;
		font-size: 12px;
		transition: color ${SKILL_CARD_HOVER_TRANSITION_DURATION}ms ease;
		&:after {
			bottom: -8px;
			content: '';
			display: block;
			height: 2px;
			left: 50%;
			position: relative;
			background: #fff;
			transition: width ${SKILL_CARD_HOVER_TRANSITION_DURATION}ms ease 0s,
				left ${SKILL_CARD_HOVER_TRANSITION_DURATION}ms ease 0s;
			width: 0;
		}
	}
	&:hover {
		background-color: ${getSelectedBgColor};
		& .skillCategory {
			color: ${getSelectedFontColor};
			&:after {
				width: 125%;
				left: -12.5%;
			}
		}
	}
	transition: background-color ${SKILL_CARD_HOVER_TRANSITION_DURATION}ms ease;
	margin: 5px 0;
	${breakpoint('phone')`
        margin: 7.5px 0;
        & .skillCategory { 
            font-size: 16px;
        }
        & .skill-card-ripple {
            padding: 0px 0px;
        }
    `}
	${breakpoint('tablet')`
        margin: 10px 0;
        & .skillCategory { 
            font-size: 18px;
        }
        & .skill-card-ripple {
            padding: 32px 0px;
		}
    `}
`

const ScrollableListContainer = styled.div`
	height: 100%;
	width: 100%;
	padding: 3.5rem 1rem 1rem 3rem;
	${breakpoint('tablet')`
        padding: 3.5rem 2rem 2rem 3.5rem;
    `}
`

const ScrollableList = styled.ul`
	height: 100%;
	width: 100%;
	overflow: auto;
	padding: 32px 16px 8px 0px;
	${breakpoint('tablet')`
        padding: 64px 20px 16px 0px;
    `}
	&::-webkit-scrollbar {
		border-radius: 4px;
		background-color: black;
	}
	&::-webkit-scrollbar-thumb {
		border-radius: 6px;
		background-color: white;
		border: 2px solid black;
	}
`

const ScrollableListItem = styled.li`
    display: flex;
    justify-content: space-between;
    width: 100%;
    ${({ marginIndex }) => `margin: ${marginIndex ? '2rem 0' : '0 0 2rem 0'};`}
    & > p { font-size: 14px; }
    & > img { height: 26px; }
    ${breakpoint('phone')`
        & > p { font-size: 16px; }
        & > img { height: 32px; }
    `}
    ${breakpoint('tablet')`
        & > p { font-size: 18px; }
        & > img { height: 42px; }
    `}
    ${breakpoint('desktop')`
        & > p { font-size: 22px; }
        & > img { height: 52px; }
    `}

`

const ListPlaceholder = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    & h1 {
        font-size: 14px;
    }
    ${breakpoint('phone')`
    & > h1 { font-size: 16px; }

    `}
${breakpoint('tablet')`
    & > h1 { font-size: 18px; }

    `}
${breakpoint('desktop')`
    & > h1 { font-size: 22px; }

    `}
`

const SkillCard = props => {
	const {
		backgroundColor,
		esCategory,
		engCategory,
		fadeIn: fadeInCard,
		fadeDelay,
		fadeDuration,
		hoverable,
		skills,
		style
	} = props

	const [ open, setOpen ] = useState(false)
	const handleOpenModal = useCallback(() => {
		setOpen(true)
	}, [])
	const handleCloseModal = useCallback(() => {
		setOpen(false)
	}, [])

	const skillCard = (
		<SkillCardDiv
			backgroundColor={backgroundColor}
			style={style}
			onClickCapture={handleOpenModal}
		>
			<Ripples className="skill-card-ripple">
				<span className="skillCategory">
					<Translateable
						en={engCategory}
						es={esCategory}
					/>
				</span>
			</Ripples>
		</SkillCardDiv>
	)

	return (
		<>
			{/* <TiltWrapper 
				hoverable={hoverable}
			> */}
			{/* <Tilt options={TILT_OPTIONS}>{skillCard}</Tilt> */}
			{skillCard}
			{/* </TiltWrapper> */}
			<FullScreenModal
				open={open}
				onClose={handleCloseModal}
			>
				<ScrollableListContainer>
					{skills && skills.length > 0 ? (
						<ScrollableList>
							{skills.map(({ label, src }, i) => {
								return (
									<ScrollableListItem
										key={label + i}
										marginIndex={i}
									>
										<p>{label}</p>
										{src && <img
											alt={label}
											src={src}
										        />}
									</ScrollableListItem>
								)
							})}
						</ScrollableList>
					) : (
						<ListPlaceholder>
							<h1>Coming Soon!</h1>
						</ListPlaceholder>
					)}
				</ScrollableListContainer>
			</FullScreenModal>
		</>
	)
}

export default SkillCard

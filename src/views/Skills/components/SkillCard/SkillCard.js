import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import theme from 'theme'
import breakpoint from 'styled-components-breakpoint'
import Modal from 'styled-react-modal'
import { Translateable } from 'components/Translateable'
import { IoMdCloseCircle } from 'react-icons/io'
import Ripples from 'react-ripples'
import { FullScreenModal } from 'components'

const baseShadow =
	'0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(63, 63, 68, 0.15)'
const selectedShadow =
	'0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)'
const getTransitionMSLong = ({ fadeDuration }) => fadeDuration
const getTransitionMSShort = ({ fadeDuration }) => fadeDuration / 2

const getSelectedBgColor = ({ backgroundColor }) => {
	const {
		colors: {
			background: { red, white }
		}
	} = theme
	return backgroundColor === white ? 'rgba(255,0,0, .75)' : white
}
const getSelectedFontColor = ({ backgroundColor }) => {
	const {
		colors: {
			background: { red, white }
		}
	} = theme
	return backgroundColor === white ? white : 'red'
}
const fadeIn = ({ fadeIn }) => {
	return fadeIn
		? `filter: blur(0px); opacity: 1;`
		: `filter: blur(10px); opacity: 0;`
}

const SkillCardDiv = styled.div`
    cursor: pointer;
    border-radius: 4px;
    & .skill-card-ripple {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 32px 0px;
    }
    ${fadeIn} 
    box-shadow: ${baseShadow};
    & .skillCategory {
        color: black;
        &:after {    
            bottom: -8px;
            content: "";
            display: block;
            height: 2px;
            left: 50%;
            position: relative;
            background: #fff;
            transition: width 0.3s ease 0s, left 0.3s ease 0s;
            width: 0;
        }
    }
    &:hover {
        background-color: ${getSelectedBgColor};
        box-shadow: ${selectedShadow};
        & .skillCategory { 
            color: ${getSelectedFontColor}; 
            &:after { 
                width: 125%; 
                left: -12.5%; 
            }
        }
    }
    ${({ hoverable }) => (hoverable ? '' : 'pointer-events: none;')}
    transition: 
        opacity ${getTransitionMSLong}ms ease ${({ fadeDelay }) => fadeDelay}ms,
        filter ${getTransitionMSLong}ms ease ${({ fadeDelay }) => fadeDelay}ms, 
        background-color ${getTransitionMSLong}ms ease,
        box-shadow ${getTransitionMSLong}ms ease;
    & .skillCategory { 
        font-size: 12px;
        transition: color ${getTransitionMSShort}ms ease; 
    }
    margin: 5px 0;
    ${breakpoint('phone')`
        margin: 7.5px 0;
        & .skillCategory { 
            font-size: 16px;
        }
        & .skill-card-ripple {
            padding: 44px 0px;
        }
    `}
    ${breakpoint('tablet')`
        margin: 10px 0;
        & .skillCategory { 
            font-size: 18px;
        }
        & .skill-card-ripple {
            padding: 64px 0px;
        }
    `}
`

const ScrollableListContainer = styled.div`
	height: 100%;
	width: 100%;
	padding: 3.5rem;
`

const ScrollableList = styled.ul`
	height: 100%;
	width: 100%;
	overflow-y: auto;
	padding: 24px 16px 8px 0px;
	${breakpoint('tablet')`
        padding: 24px 20px 16px 0px;
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
		skills
	} = props

	const [ open, setOpen ] = useState(false)
	const handleOpenModal = useCallback(() => {
		setOpen(true)
	}, [])
	const handleCloseModal = useCallback(() => {
		setOpen(false)
	}, [])
	return (
		<>
			<SkillCardDiv
				backgroundColor={backgroundColor}
				fadeDelay={fadeDelay}
				fadeDuration={fadeDuration}
				fadeIn={fadeInCard}
				hoverable={hoverable}
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
											{src && <img src={src} />}
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

// other:
// fade in sections?
// add ripples to menus?

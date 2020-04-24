import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import theme from 'theme'
import breakpoint from 'styled-components-breakpoint'
import { Translateable } from 'components/Translateable'

const baseShadow =
	'0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(63, 63, 68, 0.15)'
const selectedShadow =
	'0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)'
const getTransitionMSLong = ({ fadeDuration }) => fadeDuration
const getTransitionMSShort = ({ fadeDuration }) => fadeDuration / 2

const getSelectedBgColor = backgroundColor => {
	const {
		colors: {
			background: { red, white }
		}
	} = theme
	return backgroundColor === white ? 'rgba(255,0,0, .75)' : white
}
const getSelectedFontColor = backgroundColor => {
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
    display: flex;
    justify-content: center;
    align-items: center;
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
    ${({ hoverable, backgroundColor }) => {
			if (hoverable) {
				return `
                &:hover {
                    background-color: ${getSelectedBgColor(backgroundColor)};
                    box-shadow: ${selectedShadow};
                    & .skillCategory { 
                        color: ${getSelectedFontColor(backgroundColor)}; 
                        &:after { 
                            width: 125%; 
                            left: -12.5%; 
                        }
                    }
                }
            `
			}
		}}
    transition: 
        opacity ${getTransitionMSLong}ms ease ${({ fadeDelay }) => fadeDelay}ms,
        filter ${getTransitionMSLong}ms ease ${({ fadeDelay }) => fadeDelay}ms, 
        background-color ${getTransitionMSLong}ms ease,
        box-shadow ${getTransitionMSLong}ms ease;
    & .skillCategory { 
        transition: color ${getTransitionMSShort}ms ease; 
        font-size: 12px;
    }
    margin: 5px 0;
    padding: 32px 0px;
    ${breakpoint('phone')`
        margin: 7.5px 0;
        padding: 44px 0px;
        & .skillCategory { 
            font-size: 16px;
        }
    `}
    ${breakpoint('tablet')`
        margin: 10px 0;
        padding: 64px 0px;
        & .skillCategory { 
            font-size: 18px;
        }
    `}
`

const SkillCard = props => {
	const {
		backgroundColor,
		esCategory,
		engCategory,
		fadeIn,
		fadeDelay,
		fadeDuration,
		hoverable
	} = props
	return (
		<SkillCardDiv
			backgroundColor={backgroundColor}
			fadeDelay={fadeDelay}
			fadeDuration={fadeDuration}
			fadeIn={fadeIn}
			hoverable={hoverable}
		>
			<span className="skillCategory">
				<Translateable
					en={engCategory}
					es={esCategory}
				/>
			</span>
		</SkillCardDiv>
	)
}

export default SkillCard

// add underline
// create modal (black background white font)
// separate skills

// other:
// fade in

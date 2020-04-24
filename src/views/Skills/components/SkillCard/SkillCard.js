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
const transitionMSLong = 750
const transitionMSShort = transitionMSLong / 2
const getMSDelay = ({ index }) => `${250 + index * 250}`

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
    display: flex;
    justify-content: center;
    align-items: center;
    ${fadeIn} 
    box-shadow: ${baseShadow};
    &:hover {
        background-color: ${getSelectedBgColor};
        box-shadow: ${selectedShadow};
        & .skillCategory { color: ${getSelectedFontColor}; }
    }
    transition: 
        opacity ${transitionMSLong}ms ease ${getMSDelay}ms,
        filter ${transitionMSLong}ms ease ${getMSDelay}ms, 
        background-color ${transitionMSLong}ms ease,
        box-shadow ${transitionMSLong}ms ease;
    & .skillCategory { 
        transition: color ${transitionMSShort}ms ease; 
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
	const { backgroundColor, esCategory, engCategory, fadeIn, index } = props

	return (
		<SkillCardDiv
			backgroundColor={backgroundColor}
			fadeIn={fadeIn}
			index={index}
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

// hover permission
// add underline
// create modal (black background white font)
// separate skills

// other:
// fade in

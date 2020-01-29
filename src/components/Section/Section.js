import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
const SectionDiv = styled.div`
	height: 100vh;
	width: 100vw;
	position: relative;
	background-color: ${({ backgroundColor }) => backgroundColor};
`

const TitleH3 = styled.h3`
	position: absolute;
	top: 16px;
	left: 16px;
	color: ${({ fontColor }) => fontColor};
`

const Section = props => {
	const { children, title, titleColor, backgroundColor } = props

	return (
		<SectionDiv backgroundColor={backgroundColor}>
			<TitleH3 fontColor={titleColor}>{title}</TitleH3>
			{children}
		</SectionDiv>
	)
}

Section.propTypes = {
	backgroundColor: PropTypes.string,
	children: PropTypes.node,
	title: PropTypes.string,
	titleColor: PropTypes.string
}

export default Section

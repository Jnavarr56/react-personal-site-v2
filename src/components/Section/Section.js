/* eslint-disable no-console */

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Waypoint } from 'react-waypoint'
const SectionDiv = styled.div`
	height: 100vh;
	width: 100vw;
	position: relative;
	background-color: ${({ backgroundColor }) => backgroundColor};
`

const SectionTitle = styled.h3`
	font-family: Raleway;
	font-size: 24px;
	position: absolute;
	top: 16px;
	left: 16px;
	color: ${({ fontColor }) => fontColor};
`

const Section = props => {
	const { children, title, titleColor, backgroundColor } = props
	return (
		<SectionDiv backgroundColor={backgroundColor}>
			<Waypoint
				onEnter={() => console.log(title)}
				onLeave={() => console.log(title + ' leaving')}
			>
				<SectionTitle fontColor={titleColor}>{title}</SectionTitle>
			</Waypoint>
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

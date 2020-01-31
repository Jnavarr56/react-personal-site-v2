/* eslint-disable no-console */

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import SectionTitle from './components/SectionTitle'
import { Translateable } from 'components/Translateable'

const SectionDiv = styled.div`
	height: 100vh;
	width: 100vw;
	position: relative;
	background-color: ${({ backgroundColor }) => backgroundColor};
`

const Section = props => {
	const { children, title, titleColor, backgroundColor, showTitle } = props
	return (
		<SectionDiv backgroundColor={backgroundColor}>
			{showTitle && (
				<Translateable
					en={<SectionTitle fontColor={titleColor}>{title.en}</SectionTitle>}
					es={<SectionTitle fontColor={titleColor}>{title.es}</SectionTitle>}
				/>
			)}
			{children}
		</SectionDiv>
	)
}

Section.propTypes = {
	backgroundColor: PropTypes.string,
	children: PropTypes.node,
	showTitle: PropTypes.bool,
	title: PropTypes.string,
	titleColor: PropTypes.string
}

export default Section

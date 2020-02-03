import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Text = styled.p`
	font-weight: 200;
	font-family: Raleway;
	color: ${({ fontColor }) => fontColor};
	margin-bottom: 16px;
	font-size: 24px;
	line-height: 1.5;
	word-wrap: break-word;
`
Text.propTypes = {
	fontColor: PropTypes.string
}

export default Text

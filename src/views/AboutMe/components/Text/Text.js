import styled from 'styled-components'
import PropTypes from 'prop-types'
import breakpoint from 'styled-components-breakpoint'
const Text = styled.p`
	font-weight: 200;
	font-family: Raleway;
	color: ${({ fontColor }) => fontColor};
	margin-bottom: 16px;
	line-height: 1.5;
	word-wrap: break-word;
	font-size: 14px;
	${breakpoint('phone')`
		font-size: 16px;
	`}
	${breakpoint('tablet')`
		font-size: 20px;
	`}
	${breakpoint('desktop')`
		font-size: 24px;
	`}
`
Text.propTypes = {
	fontColor: PropTypes.string
}

export default Text

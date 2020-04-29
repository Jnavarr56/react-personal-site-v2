import React from 'react'
import styled from 'styled-components'
import { BaseModalBackground } from 'styled-react-modal'

const ModalBackground = () => {
	return styled(BaseModalBackground)`
		z-index: 9999;
	`
}

export default ModalBackground

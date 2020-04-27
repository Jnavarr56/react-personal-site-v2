import React, { useState, useEffect, useCallback } from 'react'
import Modal from 'styled-react-modal'
import { IconButton } from 'components'
import { IoMdCloseCircle } from 'react-icons/io'
import PropTypes from 'prop-types'

const StyledModal = Modal.styled`
    height: 100%;
    width: 100%;
    background-color: white;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-family: Raleway;
    opacity: ${({ fadeIn }) => (fadeIn ? 1 : 0)};
    filter: blur(${({ fadeIn }) => (fadeIn ? 0 : 10)}px);
    transition: 
        opacity ${({ fadeDuration }) => fadeDuration}ms ease, 
        filter ${({ fadeDuration }) => fadeDuration}ms ease;
    position: relative;
    & .close-modal-icon-btn {
        border-radius: 100%;
        position: absolute;
        top: 1rem;
        left: 1rem;
        & .close-modal-icon {
            color: black;
            font-size: 32px;
        }
    }
`

const FullScreenModal = props => {
	const { children, fadeDuration, onClose, open: openProp } = props

	const [ open, setOpen ] = useState(false)
	const [ fadeIn, setFadeIn ] = useState(false)

	const openModal = useCallback(() => {
		setOpen(true)
		setTimeout(() => setFadeIn(true), fadeDuration)
	})

	useEffect(() => {
		if (openProp) openModal()
	}, [ openModal, openProp ])

	useEffect(() => {
		if (openProp) {
			openModal()
		} else {
			setFadeIn(false)
			setTimeout(() => setOpen(false), fadeDuration)
		}
	}, [ fadeDuration, openModal, openProp ])

	return (
		<StyledModal
			fadeDuration={fadeDuration}
			fadeIn={fadeIn}
			isOpen={open}
		>
			<IconButton
				className="close-modal-icon-btn"
				onClick={onClose}
			>
				<IoMdCloseCircle className="close-modal-icon" />
			</IconButton>
			{children}
		</StyledModal>
	)
}

FullScreenModal.defaultProps = {
	fadeDuration: 350,
	open: false
}

FullScreenModal.propTypes = {
	children: PropTypes.node,
	fadeDuration: PropTypes.number,
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool
}

export default FullScreenModal

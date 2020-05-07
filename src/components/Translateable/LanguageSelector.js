import React, { useState, useCallback, useContext } from 'react'
import styled from 'styled-components'
import context from './context'
import englishIcon from './images/eng-icon.png'
import espanolIcon from './images/esp-icon.png'
import breakpoint from 'styled-components-breakpoint'
import Ripples from 'react-ripples'
import theme from 'theme'

const {
	timing: { translateableFadeDuration }
} = theme

const SELECTOR_WIDTH = '5rem'
const SELECTOR_HEIGHT = '2.5rem'
const BUTTON_DIMENSION = '2rem'

const Selector = styled.div`
	z-index: 10000;
	position: fixed;
	top: 12px;
	right: 32px;
	${breakpoint('tablet')`
		top: 32px;
		right: 56px;
	`}
	background-color: black;
	border-radius: 2rem;
	cursor: ${({ toggling }) => (toggling ? 'none' : 'pointer')};
	box-shadow: ${({ toggling, direction }) => {
		if (toggling) return 'none'
		else return `0 ${direction === 'up' ? '' : '-'}20px 20px rgba(0,0,0,.20)`
	}};
	transform: rotate(${({ direction: dir }) => (dir === 'up' ? '0' : '180')}deg);
	transition: transform ${translateableFadeDuration}ms ease-in-out;
	height: ${SELECTOR_HEIGHT};
	width: ${SELECTOR_WIDTH};
	border: white solid 1px;
	& .react-ripples {
		height: 100%;
		width: 100%;
	}
`

const Button = styled.div`
	width: ${BUTTON_DIMENSION};
	height: ${BUTTON_DIMENSION};
	position: absolute;
	top: 50%;
	left: calc((${SELECTOR_HEIGHT} - ${BUTTON_DIMENSION}) / 4);
	background-image: url($english-flag-icon-url);
	background-repeat: no-repeat;
	background-size: cover;
	transition: ${translateableFadeDuration}ms ease-in-out;
	transform: translateY(-50%)
		rotate(${({ direction: dir }) => (dir === 'up' ? '0' : '-360')}deg);
	transform-origin: 130%
		${({ direction: dir }) => (dir === 'up' ? '115%' : '-115%')};
	background-image: url(${({ direction: dir }) =>
		dir === 'up' ? englishIcon : espanolIcon});
	border-radius: 2rem;
`

const LanguageSelector = props => {
	const { className } = props
	const { lang, handleChangeLang } = useContext(context)
	const [ toggling, setToggling ] = useState(false)
	const [ direction, setDirection ] = useState(lang === 'en' ? 'up' : 'down')

	const handleToggle = useCallback(() => {
		if (toggling) return
		setToggling(true)
		handleChangeLang(lang === 'en' ? 'es' : 'en')
		setDirection(prev => (prev === 'up' ? 'down' : 'up'))
		setTimeout(() => setToggling(false), translateableFadeDuration)
	}, [ toggling, lang, handleChangeLang ])

	return (
		<Selector
			className={className}
			direction={direction}
			toggling={toggling}
			onClickCapture={handleToggle}
		>
			<Button
				direction={direction}
				toggling={toggling}
			/>
			<Ripples color="white" />
		</Selector>
	)
}

export default LanguageSelector

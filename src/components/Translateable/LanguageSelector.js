import React, { useState, useCallback, useContext } from 'react'
import styled from 'styled-components'
import context from './context'
import englishIcon from './images/eng-icon.png'
import espanolIcon from './images/esp-icon.png'
import breakpoint from 'styled-components-breakpoint'

const SELECTOR_WIDTH = '4.5rem'
const SELECTOR_HEIGHT = '2rem'
const BUTTON_DIMENSION = '1.5rem'

const Selector = styled.div`
	z-index: 10000;
	position: fixed;
	top: 12px;
	right: 32px;
	${breakpoint('tablet')`
		top: 16px;
		right: 42px;
	`}
	background-color: black;
	border-radius: 2rem;
	cursor: ${({ toggling }) => (toggling ? 'none' : 'pointer')};
	box-shadow: ${({ toggling, direction }) => {
		if (toggling) return 'none'
		else return `0 ${direction === 'up' ? '' : '-'}20px 20px rgba(0,0,0,.20)`
	}};
	transform: rotate(${({ direction: dir }) => (dir === 'up' ? '0' : '180')}deg);
	transition: transform 1.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
	height: ${SELECTOR_HEIGHT};
	width: ${SELECTOR_WIDTH};
	border: white solid 2px;
`

const Button = styled.div`
	width: ${BUTTON_DIMENSION};
	height: ${BUTTON_DIMENSION};
	position: absolute;
	top: calc(50% - ${BUTTON_DIMENSION} / 2);
	left: calc(27% - ${BUTTON_DIMENSION} / 2);
	background-image: url($english-flag-icon-url);
	background-repeat: no-repeat;
	background-size: cover;
	transition: 1.5s cubic-bezier(0.68, -0.15, 0.265, 1.35);
	transform: rotate(
		${({ direction: dir }) => (dir === 'up' ? '0' : '-360')}deg
	);
	transform-origin: 130%
		${({ direction: dir }) => (dir === 'up' ? '115%' : '-150%')};
	background-image: url(${({ direction: dir }) =>
		dir === 'up' ? englishIcon : espanolIcon});
	border-radius: 2rem;
	opacity: 0;
	filter: blur(10px);
	animation: FadeIn 1s linear 1 forwards;
	@keyframes FadeIn {
		100%: {
			opacity: 1;
			filter: blur(0px);
		}
	}
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
		setTimeout(() => setToggling(false), 1500)
	}, [ toggling, lang, handleChangeLang ])

	return (
		<Selector
			className={className}
			direction={direction}
			toggling={toggling}
			onClick={handleToggle}
		>
			<Button
				direction={direction}
				toggling={toggling}
			/>
		</Selector>
	)
}

export default LanguageSelector

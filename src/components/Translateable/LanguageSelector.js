import React, { useState, useCallback, useContext } from 'react'
import styled from 'styled-components'
import context from './context'
import englishIconSrc from './images/eng-icon.png'
import espanolIconSrc from './images/esp-icon.png'
import breakpoint from 'styled-components-breakpoint'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import theme from 'theme'

const TRANSLATEABLE_FADE_DURATION = theme.timing.translateable.fadeDuration
const SELECTOR_WIDTH = '5rem'
const SELECTOR_HEIGHT = '2.5rem'
const BUTTON_DIMENSION = '2rem'
const SELECTOR_BORDER_RADIUS = '2rem'

const getRippleStyles = makeStyles({
	rippleVisible: {
		opacity: 1
	},
	child: {
		opacity: 1,
		backgroundColor: props => {
			return props.rippleColor || 'white'
		}
	},
	'@keyframes enter': {
		'0%': {
			transform: 'scale(0)',
			opacity: 0.1
		},
		'100%': {
			transform: 'scale(1)',
			opacity: 1
		}
	}
})

const ButtonWithModifiedRipples = ({ rippleColor, ...rest }) => {
	const rippleClasses = getRippleStyles({ rippleColor })
	return (
		<Button
			{...rest}
			TouchRippleProps={{ classes: rippleClasses }}
		/>
)
}

const SelectorContainer = styled(ButtonWithModifiedRipples)`
	z-index: 10000;
	position: fixed !important;
	top: 4px;
	right: 26px;
	${breakpoint('tablet')`
		top: 24px;
		right: 48px;
	`}
	border-radius: ${SELECTOR_BORDER_RADIUS} !important;
	padding: 12px !important;
`

const setSelectorBoxShadow = ({ toggling, direction }) => {
	if (toggling) {
		return 'none'
	} else {
		const shadowDirection = direction === 'up' ? '' : '-'
		return `0 ${shadowDirection}20px 20px rgba(0, 0, 0, .20)`
	}
}

const setSelectorTransformRotate = ({ direction }) =>
	direction === 'up' ? 0 : 180

const Selector = styled.div`
	background-color: black;
	border-radius: ${SELECTOR_BORDER_RADIUS};
	box-shadow: ${setSelectorBoxShadow};
	transform: rotate(${setSelectorTransformRotate}deg);
	transition: transform ${TRANSLATEABLE_FADE_DURATION}ms ease;
	height: ${SELECTOR_HEIGHT};
	width: ${SELECTOR_WIDTH};
	border: white solid 1px;
`

const setToggleButtonBackgroundImage = ({ lang }) => {
	if (lang === 'en') return englishIconSrc
	if (lang === 'es') return espanolIconSrc
}

const setToggleButtonRotate = ({ direction }) =>
	direction === 'up' ? '0' : '-360'
const setToggleButtonTransformOrigin = ({ direction }) => {
	const volatility = 60
	const yOrigin = 60
	const xOrigin = direction === 'up' ? 100 + volatility : 0 - volatility
	return `${yOrigin}% ${xOrigin}%`
}

const ToggleButton = styled.div`
	height: ${BUTTON_DIMENSION};
	width: ${BUTTON_DIMENSION};
	position: absolute;
	top: 50%;
	left: calc((${SELECTOR_HEIGHT} - ${BUTTON_DIMENSION}) / 4);
	background: transparent url("${setToggleButtonBackgroundImage}") no-repeat;
	background-size: cover;
	transition: transform ${TRANSLATEABLE_FADE_DURATION}ms ease-in-out;
	transform: translateY(-50%) rotate(${setToggleButtonRotate}deg);
	transform-origin: ${setToggleButtonTransformOrigin};
	border-radius: 100%;
`

const LanguageSelector = props => {
	const { className } = props
	const { lang, handleChangeLang } = useContext(context)
	const [ toggling, setToggling ] = useState(false)
	const [ direction, setDirection ] = useState(lang === 'en' ? 'up' : 'down')

	const handleToggle = useCallback(() => {
		if (!toggling) {
			setToggling(true)

			const newLang = lang === 'en' ? 'es' : 'en'
			const newDirection = direction === 'down' ? 'up' : 'down'

			handleChangeLang(newLang)
			setDirection(newDirection)

			setTimeout(() => setToggling(false), TRANSLATEABLE_FADE_DURATION)
		}
	}, [ toggling, lang, direction, handleChangeLang ])

	return (
		<SelectorContainer
			center=""
			centerRipple={false}
			className={className}
			rippleColor={lang === 'en' ? 'blue' : 'red'}
			onClick={handleToggle}
		>
			<Selector
				direction={direction}
				toggling={toggling}
			>
				<ToggleButton
					direction={direction}
					lang={lang}
					toggling={toggling}
				/>
			</Selector>
		</SelectorContainer>
	)
}

export default LanguageSelector

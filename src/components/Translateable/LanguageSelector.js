import React, { useState, useCallback, useContext } from 'react'
import styled from 'styled-components'
import langContext from './context'
import breakpoint from 'styled-components-breakpoint'
import { Button as ButtonBaseImport } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import animContext from '../../initialAnimContext'
import { animated, useSpring } from 'react-spring'

const SELECTOR_WIDTH = '5rem'
const SELECTOR_HEIGHT = '2.5rem'
const BUTTON_DIMENSION = '2rem'
const SELECTOR_BORDER_RADIUS = '2rem'

const SelectorContainer = styled(animated.div)`
	z-index: 10000;
	position: fixed !important;
	top: 4px;
	right: 26px;
	${breakpoint('tablet')`
		top: 24px;
		right: 48px;
	`}
	border-radius: ${SELECTOR_BORDER_RADIUS};
	padding: 12px !important;
`

const ButtonBaseContainer = styled.div`
	z-index: ${10000 - 4};
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	border-radius: ${SELECTOR_BORDER_RADIUS};
	overflow: hidden;
`

const getRippleClasses = makeStyles({
	rippleVisible: {
		opacity: 1
	},
	child: {
		opacity: 1,
		backgroundColor: ({ rippleColor }) => rippleColor
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

const getButtonBaseClasses = makeStyles({
	root: {
		zIndex: `${10000 - 4}`,
		position: 'absolute',
		top: 0,
		left: 0,
		height: '100%',
		width: '100%'
	}
})

const ButtonBase = ({ rippleColor, ...rest }) => {
	const rippleClasses = getRippleClasses({ rippleColor })
	const buttonClasses = getButtonBaseClasses()
	return (
		<ButtonBaseImport
			{...rest}
			classes={buttonClasses}
			TouchRippleProps={{ classes: rippleClasses }}
		/>
	)
}

const Selector = styled(animated.div)`
	position: relative;
	background-color: black;
	border-radius: ${SELECTOR_BORDER_RADIUS};

	height: ${SELECTOR_HEIGHT};
	width: ${SELECTOR_WIDTH};
	border: white solid 1px;
`

const ToggleButton = styled(animated.div)`
	height: ${BUTTON_DIMENSION};
	width: ${BUTTON_DIMENSION};
	position: absolute;
	top: 50%;
	left: calc((${SELECTOR_HEIGHT} - ${BUTTON_DIMENSION}) / 4);
	background-size: cover !important;
	border-radius: 100%;
`

const LANGS = {
	en: {
		color: 'blue',
		direction: 'up',
		deg: 0
	},
	es: {
		color: 'red',
		direction: 'down',
		deg: 180
	}
}

const getNewLangData = currLang => {
	const newLangKey = Object.keys(LANGS).find(l => currLang !== l)
	return { ...LANGS[newLangKey], newLang: newLangKey }
}
const formatAssetUrl = lang => `url("/flags-images/${lang}-icon.png") no-repeat`
const getDegFromDir = direction => (direction === 'up' ? 0 : 360)

const LanguageSelector = () => {
	const FadeInDelay = useContext(animContext)
	const { lang, handleChangeLang } = useContext(langContext)

	const [ changed, setChanged ] = useState(false)
	const [ hover, setHover ] = useState(false)
	const [ direction, setDirection ] = useState(LANGS[lang].direction)

	const handleToggle = useCallback(() => {
		setChanged(true)
		const { newLang, direction } = getNewLangData(lang)
		handleChangeLang(newLang)
		setDirection(direction)
	}, [ handleChangeLang, lang ])

	const handleHoverIn = useCallback(() => setHover(true), [])
	const handleHoverOut = useCallback(() => setHover(false), [])

	const FadeInOpacitySpring1 = useSpring({
		from: {
			opacity: 0
			// filter: 'blur(10px)'
		},
		to: {
			opacity: 1
			// filter: 'blur(0px)'
		},
		delay: FadeInDelay * 1.5
	})

	const FadeInTransformSpring1 = useSpring({
		from: {
			transform: 'translateY(100%)'
		},
		to: {
			transform: 'translateY(0%)'
		},
		config: {
			mass: 6,
			tension: 400,
			friction: 10
		},
		delay: FadeInDelay * 1.5
	})

	const SelectorInteractSpring = useSpring({
		to: {
			transform: `rotate(${LANGS[lang].deg}deg) scale(${hover ? 1.2 : 1})`
		},
		config: {
			mass: 8,
			tension: 450,
			friction: 35
		}
	})

	const OpacitySpring2 = useSpring({
		from: {
			opacity: 0
			// filter: 'blur(10px)'
		},
		to: {
			opacity: 1
			// filter: 'blur(0px)'
		},
		delay: FadeInDelay * 1.75
	})

	let toggleButtonProps

	if (changed) {
		toggleButtonProps = {
			to: {
				transform: `rotate(${getDegFromDir(direction)}deg) translateY(-50%)`,
				background: formatAssetUrl(lang)
			},
			config: {
				mass: 15,
				tension: 300,
				friction: 40
			}
		}
	} else {
		toggleButtonProps = {
			from: {
				transform: `rotate(${getDegFromDir(direction)}deg) translateY(-150%)`,
				background: formatAssetUrl(lang)
			},
			to: {
				transform: `rotate(${getDegFromDir(direction)}deg) translateY(-50%)`,
				background: formatAssetUrl(lang)
			},
			config: {
				mass: 4,
				tension: 500,
				friction: 6
			},
			delay: FadeInDelay * 1.75
		}
	}

	const ToggleButtonSpringProps = useSpring(toggleButtonProps)

	return (
		<SelectorContainer
			style={{ ...FadeInTransformSpring1, ...FadeInOpacitySpring1 }}
			onClick={handleToggle}
			onMouseEnter={handleHoverIn}
			onMouseLeave={handleHoverOut}
		>
			<ButtonBaseContainer>
				<ButtonBase rippleColor={LANGS[lang].color}>
					<div />
				</ButtonBase>
			</ButtonBaseContainer>
			<Selector style={SelectorInteractSpring}>
				<ToggleButton
					style={{ ...OpacitySpring2, ...ToggleButtonSpringProps }}
				/>
			</Selector>
		</SelectorContainer>
	)
}

export default LanguageSelector

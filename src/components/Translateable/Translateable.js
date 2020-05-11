import React, { useContext, useEffect, useState } from 'react'
import Context from './context'
import styled from 'styled-components'
import theme from 'theme'

const {
	timing: { translateableFadeTiming, translateableFadeDuration }
} = theme

const TranslateableWrapper = styled.span`
	transition: opacity ${translateableFadeDuration}ms ${translateableFadeTiming};
		/* filter ${translateableFadeDuration}ms ${translateableFadeTiming}; */
	opacity: ${({ fadeIn }) => (fadeIn ? 1 : 0)};
	/* filter: blur(${({ fadeIn }) => (fadeIn ? 0 : 10)}px); */
`
const Translateable = props => {
	const { lang, changed } = useContext(Context)
	const [ text, setText ] = useState(props[lang])
	const [ fadeIn, setFadeIn ] = useState(true)
	useEffect(() => {
		if (!changed) return
		setFadeIn(false)
		setTimeout(() => {
			setText(props[lang])
			setFadeIn(true)
		}, translateableFadeDuration)
		/* eslint-disable-next-line */
	}, [lang])

	return <TranslateableWrapper fadeIn={fadeIn}>{text}</TranslateableWrapper>
}

export default Translateable

import React, { useContext, useEffect, useState } from 'react'
import Context from './context'
import styled from 'styled-components'

const TranslateableWrapper = styled.span`
	transition: all 1s ease;
	opacity: ${({ fadeIn }) => (fadeIn ? 1 : 0)};
	filter: blur(${({ fadeIn }) => (fadeIn ? 0 : 10)}px);
`
const Translateable = props => {
	const { lang } = useContext(Context)
	const [ text, setText ] = useState(props[lang])
	const [ fadeIn, setFadeIn ] = useState(true)
	useEffect(() => {
		setFadeIn(false)
		setTimeout(() => {
			setText(props[lang])
			setFadeIn(true)
		}, 1000)
		/* eslint-disable-next-line */
	}, [lang])

	return <TranslateableWrapper fadeIn={fadeIn}>{text}</TranslateableWrapper>
}

export default Translateable

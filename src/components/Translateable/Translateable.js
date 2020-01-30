import React, { useContext, useEffect, useState } from 'react'
import Context from './context'
import styled from 'styled-components'

const TranslateableWrapper = styled.span`
	transition: all 0.5s ease;
	opacity: ${({ fadeIn }) => (fadeIn ? 1 : 0)};
	filter: blur(${({ fadeIn }) => (fadeIn ? 0 : 10)}px);
`
const Translateable = props => {
	const { lang, handleChangeLang } = useContext(Context)
	const [ text, setText ] = useState(props[lang])
	const [ fadeIn, setFadeIn ] = useState(true)
	useEffect(() => {
		setFadeIn(false)
		setTimeout(() => {
			setText(props[lang])
			setFadeIn(true)
		}, 500)
	}, [ lang, props ])

	return (
		<TranslateableWrapper
			fadeIn={fadeIn}
			onClick={() => handleChangeLang(lang === 'en' ? 'es' : 'en')}
		>
			{text}
		</TranslateableWrapper>
	)
}

export default Translateable

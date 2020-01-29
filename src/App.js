import React, { useState, useEffect, useCallback } from 'react'
import { useCookies } from 'react-cookie'
import styled from 'styled-components'
import { LandingAnimation } from './components'

const COOKIE_CONFIG = { path: '/', maxAge: 60 * 60 }

const Main = styled.main`
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	position: relative;
`

const App = () => {
	const [ animationEnded, setAnimationEnded ] = useState(false)
	const handleAnimationOver = useCallback(() => setAnimationEnded(true), [])

	const [ cookies, setCookie ] = useCookies([])
	const { visited } = cookies

	useEffect(() => {
		if (!visited) setCookie('visited', Date.now(), COOKIE_CONFIG)
		/*eslint-disable-next-line */
	}, [])

	return (
		<Main>
			{!visited && !animationEnded && (
				<LandingAnimation onAnimationEnd={handleAnimationOver} />
			)}
			{(visited || animationEnded) && (
				<h1>hi</h1>
				// <LandingAnimation onAnimationEnd={handleAnimationOver} />
			)}
		</Main>
	)
}

export default App

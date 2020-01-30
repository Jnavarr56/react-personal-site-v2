import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useCookies } from 'react-cookie'
import styled from 'styled-components'
import { LandingAnimation } from 'views'
import { ViewsContainer } from 'layouts'
import { BrowserRouter, Route } from 'react-router-dom'

const COOKIE_CONFIG = { path: '/', maxAge: 60 * 60 }

const Main = styled.main`
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	position: relative;
`

const App = () => {
	const [ showViews, setShowViews ] = useState(false)
	const [ animationEnded, setAnimationEnded ] = useState(false)
	const handleAnimationEnd = useCallback(() => {
		setShowViews(true)
		setTimeout(() => setAnimationEnded(true), 2000)
	}, [])

	const [ cookies, setCookie ] = useCookies([])
	const { visited } = cookies

	useEffect(() => {
		if (!visited) setCookie('visited', Date.now(), COOKIE_CONFIG)
		/*eslint-disable-next-line */
	}, [])

	const displayLoadingAnimation = !visited && !animationEnded
	const displayViews = visited || showViews

	const views = useMemo(
		() => [
			{ title: 'Home', component: 'hey', path: '' },
			{ title: 'About Me', component: 'hey', path: 'about-me' },
			{ title: 'Skills', component: 'hey', path: 'skills' }
		],
		[]
	)

	const renderApp = useCallback(
		() => (
			<Main>
				{displayLoadingAnimation && (
					<LandingAnimation
						fadeOutDelay={1000}
						fadeOutDuration={1000}
						interval={50}
						onAnimationEnd={handleAnimationEnd}
					/>
				)}
				{displayViews && (
					<ViewsContainer
						fadeInDelay={1000}
						fadeInDuration={1000}
					>
						{views}
					</ViewsContainer>
				)}
			</Main>
		),
		[ views, displayViews, displayLoadingAnimation, handleAnimationEnd ]
	)

	return (
		<BrowserRouter>
			<Route
				path="/:view?"
				render={renderApp}
			/>
		</BrowserRouter>
	)
}

export default App

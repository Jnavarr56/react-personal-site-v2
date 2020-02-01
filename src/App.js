import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useCookies } from 'react-cookie'
import styled from 'styled-components'
import { LandingAnimation, Home } from 'views'
import { ViewsContainer } from 'layouts'
import { Redirect } from 'react-router-dom'
import qs from 'querystring'
import { DesktopNav } from 'components'
import {
	TranslateableContext,
	LanguageSelector
} from 'components/Translateable'

const VIEWS = [
	{
		title: { en: 'Home', es: 'Página de Inicio' },
		showTitle: false,
		showParticles: true,
		component: <Home />,
		path: 'home'
	},
	{
		title: { en: 'About Me', es: 'Sobre Mí' },
		showTitle: true,
		showParticles: false,
		component: 'hey',
		path: 'about-me'
	},
	{
		title: { en: 'Skills', es: 'Habilidades' },
		showTitle: true,
		showParticles: false,
		component: 'hey',
		path: 'skills'
	},
	{
		title: { en: 'Portfolio', es: 'Portafolio' },
		showTitle: true,
		showParticles: false,
		component: 'hey',
		path: 'portfolio'
	},
	{
		title: { en: 'Contact', es: 'Información de Contacto' },
		showTitle: true,
		showParticles: false,
		component: 'hey',
		path: 'contact'
	}
]

const isInViews = urlParam =>
	urlParam ? VIEWS.find(({ path }) => path === urlParam) : false
const getLang = query => qs.parse(query.slice(1)).lang

const Main = styled.main`
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	position: relative;
`

const App = props => {
	const { search: query } = props.location
	const { view } = props.match.params

	const [ showViews, setShowViews ] = useState(false)
	const [ animationEnded, setAnimationEnded ] = useState(false)
	const handleAnimationEnd = useCallback(() => {
		setShowViews(true)
		setTimeout(() => setAnimationEnded(true), 2000)
	}, [])

	const [ cookies, setCookie ] = useCookies([])
	const { visited } = cookies
	useEffect(() => {
		if (!visited)
			setCookie('visited', Date.now(), { path: '/', maxAge: 60 * 60 })
		/*eslint-disable-next-line */
	}, [])

	if (!isInViews(view)) return <Redirect to="/home?lang=en" />

	const lang = getLang(query)
	if (!lang) return <Redirect to="/home?lang=en" />
	else if (![ 'en', 'es' ].includes(lang))
		return <Redirect to={`/${view}?lang=en`} />

	return (
		<Main>
			{!visited && !animationEnded && (
				<LandingAnimation
					fadeOutDelay={1000}
					fadeOutDuration={1000}
					interval={50}
					onAnimationEnd={handleAnimationEnd}
				/>
			)}
			{(visited || showViews) && (
				<TranslateableContext lang={lang}>
					<LanguageSelector />
					<DesktopNav
						fadeInDelay={1000}
						fadeInDuration={1000}
					>
						{VIEWS}
					</DesktopNav>
					<ViewsContainer
						fadeInDelay={1000}
						fadeInDuration={1000}
					>
						{VIEWS}
					</ViewsContainer>
				</TranslateableContext>
			)}
		</Main>
	)
}

export default App

import React, { useState, useEffect, useCallback } from 'react'
import { useCookies } from 'react-cookie'
import styled from 'styled-components'
import { LandingAnimation, Home, AboutMe, Skills } from 'views'
import { ViewsContainer } from 'layouts'
import { Redirect } from 'react-router-dom'
import qs from 'querystring'
import { DesktopNav, MobileNav } from 'components'
import {
	TranslateableContext,
	LanguageSelector
} from 'components/Translateable'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import { ModalProvider, BaseModalBackground } from 'styled-react-modal'

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
		component: <AboutMe />,
		path: 'about-me'
	},
	{
		title: { en: 'Skills', es: 'Habilidades' },
		showTitle: true,
		showParticles: false,
		component: <Skills />,
		path: 'skills'
	},
	{
		title: { en: 'Projects', es: 'Proyectos' },
		showTitle: true,
		showParticles: false,
		component: <h1>hey</h1>,
		path: 'projects'
	},
	{
		title: { en: 'Contact', es: 'Información de Contacto' },
		showTitle: true,
		showParticles: false,
		component: <h1>hey</h1>,
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
const ModalBackground = styled(BaseModalBackground)`
	z-index: 9999;
	opacity: 0;
	filter: blur(10px);
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
				<ThemeProvider theme={theme}>
					<ModalProvider backgroundComponent={ModalBackground}>
						<TranslateableContext lang={lang}>
							<LanguageSelector />
							<MobileNav>{VIEWS}</MobileNav>
							<DesktopNav>{VIEWS}</DesktopNav>
							<ViewsContainer
								fadeInDelay={1000}
								fadeInDuration={1000}
							>
								{VIEWS}
							</ViewsContainer>
						</TranslateableContext>
					</ModalProvider>
				</ThemeProvider>
			)}
		</Main>
	)
}

App.defaultProps = {
	location: PropTypes.shape({
		search: PropTypes.string
	}),
	match: PropTypes.shape({
		params: PropTypes.shape({
			view: PropTypes.string
		})
	})
}
export default App

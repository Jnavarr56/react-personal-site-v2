import React, { useState, useEffect, useCallback } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { ModalProvider } from 'styled-react-modal'
import { useCookies } from 'react-cookie'
import qs from 'querystring'
import { Redirect } from 'react-router-dom'
import { ViewsContainer } from 'layouts'
import { LandingAnimation } from 'views'
import { DesktopNav, MobileNav, ModalBackground } from 'components'
import {
	TranslateableContext,
	LanguageSelector
} from 'components/Translateable'
import theme from 'theme'
import routes from 'routes'
import PropTypes from 'prop-types'

const {
	timing: {
		loadingAnimation: { fadeOutTiming, fadeOutDelay, fadeOutDuration }
	}
} = theme

const VISTED_COOKIE_AGE_MINS = 60 * 30
const LANGUAGES = [ 'en', 'es' ]
const DEFAULT_REDIRECT = <Redirect to={`/${routes[0].path}?lang=en`} />

const Main = styled.main`
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	position: relative;
	& .loading-animation-fade-in {
		opacity: 0;
		filter: blur(10px);
		animation: FadeIn ${fadeOutDuration}ms ${fadeOutTiming} ${fadeOutDuration}ms
			1 forwards;
	}
	@keyframes FadeIn {
		100% {
			opacity: 1;
			filter: blur(0px);
		}
	}
`

const App = props => {
	const { location, match } = props

	const { search: query } = location
	const { view: providedPath } = match.params

	const [ showViews, setShowViews ] = useState(false)
	const [ animationEnded, setAnimationEnded ] = useState(false)
	const handleAnimationEnd = useCallback(() => {
		setShowViews(true)
		setTimeout(() => setAnimationEnded(true), fadeOutDelay + fadeOutDuration)
	}, [])

	const [ cookies, setCookie ] = useCookies([])
	useEffect(() => {
		if (!cookies.visited) {
			setCookie('visited', Date.now(), {
				path: '/',
				maxAge: VISTED_COOKIE_AGE_MINS
			})
		}

		/*eslint-disable-next-line */
	}, [])

	const isInViews =
		providedPath && routes.find(({ path }) => path === providedPath)
	if (!isInViews) return DEFAULT_REDIRECT

	const lang = qs.parse(query.slice(1)).lang
	if (!lang) return DEFAULT_REDIRECT
	else if (!LANGUAGES.includes(lang))
		return <Redirect to={`/${providedPath}?lang=en`} />

	const shouldRenderAnimation = !cookies.visited && !animationEnded
	const shouldRenderViews = cookies.visited || showViews

	return (
		<Main>
			{shouldRenderAnimation && (
				<LandingAnimation
					duration={5000}
					fadeOutDelay={fadeOutDelay}
					fadeOutDuration={fadeOutDuration}
					onAnimationEnd={handleAnimationEnd}
				/>
			)}
			{shouldRenderViews && (
				<ThemeProvider theme={theme}>
					<ModalProvider backgroundComponent={ModalBackground}>
						<TranslateableContext lang={lang}>
							<LanguageSelector className="loading-animation-fade-in" />
							<MobileNav className="loading-animation-fade-in">
								{routes}
							</MobileNav>
							<DesktopNav className="loading-animation-fade-in" />
							<ViewsContainer className="loading-animation-fade-in">
								{routes}
							</ViewsContainer>
						</TranslateableContext>
					</ModalProvider>
				</ThemeProvider>
			)}
		</Main>
	)
}

App.propTypes = {
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

import React, { useState, useEffect, useCallback } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { useCookies } from 'react-cookie'
import qs from 'querystring'
import { Redirect } from 'react-router-dom'
import { ViewsContainer } from 'layouts'
import { LandingAnimation as LoadingAnimation } from 'views'
import { DesktopNav, MobileNav } from 'components'
import {
	TranslateableContext,
	LanguageSelector
} from 'components/Translateable'
import theme from 'theme'
import routes from 'routes'
import PropTypes from 'prop-types'
import {
	ThemeProvider as MuiThemeProvider,
	createMuiTheme
} from '@material-ui/core/styles'
import { useSpring, animated } from 'react-spring'
import InitialAnimContext from './initialAnimContext'

const VISTED_COOKIE_AGE_MINS = 60 * 30
const LANGUAGES = [ 'en', 'es' ]
const DEFAULT_REDIRECT = <Redirect to={`/${routes[0].path}?lang=en`} />

const Main = styled.main`
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	position: relative;
`

const Div = styled(animated.main)`
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	position: relative;
`

const muiTheme = createMuiTheme({})

const App = props => {
	const { location, match } = props

	const { search: query } = location
	const { view: providedPath } = match.params

	const [ renderViews, setRenderViews ] = useState(false)
	const [ renderLoading, setRenderLoading ] = useState(false)
	const [ cookies, setCookie ] = useCookies([])

	const handleLoadingEnd = useCallback(() => setRenderViews(true), [])

	const [ FadeInViewsSpring, SetFadeInViewsSpring ] = useSpring(() => ({
		opacity: 0
	}))

	const [ FadeOutLoadingSpring, SetFadeOutLoadingSpring ] = useSpring(() => ({
		opacity: 1
	}))

	useEffect(() => {
		if (!cookies.visited) {
			setCookie('visited', Date.now(), {
				path: '/',
				maxAge: VISTED_COOKIE_AGE_MINS
			})
			setRenderLoading(true)
		} else {
			setRenderViews(true)
		}
		/* eslint-disable-next-line */
	}, [setCookie])

	useEffect(() => {
		if (renderViews) {
			SetFadeInViewsSpring({
				opacity: 1
			})

			SetFadeOutLoadingSpring({
				opacity: 0,
				onRest: () => setRenderLoading(false)
			})
		}
	}, [ SetFadeInViewsSpring, SetFadeOutLoadingSpring, renderViews ])

	const isInViews =
		providedPath && routes.find(({ path }) => path === providedPath)
	if (!isInViews) return DEFAULT_REDIRECT

	const lang = qs.parse(query.slice(1)).lang
	if (!lang) return DEFAULT_REDIRECT
	else if (!LANGUAGES.includes(lang))
		return <Redirect to={`/${providedPath}?lang=en`} />
	return (
		<Main>
			<MuiThemeProvider theme={muiTheme}>
				<ThemeProvider theme={theme}>
					<TranslateableContext lang={lang}>
						{renderLoading && (
							<LoadingAnimation
								style={FadeOutLoadingSpring}
								onLoadingEnd={handleLoadingEnd}
							/>
						)}
						{renderViews && (
							<Div style={FadeInViewsSpring}>
								<InitialAnimContext.Provider value={0}>
									<LanguageSelector />
									<DesktopNav />
									<MobileNav />
									<ViewsContainer />
								</InitialAnimContext.Provider>
							</Div>
						)}
					</TranslateableContext>
				</ThemeProvider>
			</MuiThemeProvider>
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

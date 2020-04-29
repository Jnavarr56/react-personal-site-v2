import React, { useCallback } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import App from './App'

const AppRouter = () => {
	const renderApp = useCallback(routeProps => <App {...routeProps} />, [])

	return (
		<BrowserRouter>
			<Route
				path="/:view?"
				render={renderApp}
			/>
		</BrowserRouter>
	)
}

export default AppRouter

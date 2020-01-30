import React, { useCallback, useMemo } from 'react'
import Context from './context'
import { useHistory, useRouteMatch } from 'react-router-dom'

const TranslateableContext = props => {
	const { lang, children } = props
	const { push } = useHistory()
	const { params } = useRouteMatch()

	const handleChangeLang = useCallback(
		newLang => {
			push({ pathname: `/${params.view}`, search: `?lang=${newLang}` })
		},
		[ push, params.view ]
	)

	const value = useMemo(
		() => ({
			lang,
			handleChangeLang
		}),
		[ lang, handleChangeLang ]
	)

	return <Context.Provider value={value}>{children}</Context.Provider>
}

export default TranslateableContext
